// src/components/products/ProductGraphsAndTableSection.tsx
"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import Papa from "papaparse";

type TableData = {
  headersFlat: string[]; // flat headers for exporting and indexing
  headerRows?: string[][]; // optional structured header rows for rendering (1 or 2 rows)
  rows: string[][];
  title?: string;
  caption?: string;
};

// Support both Product.tableData format and our internal TableData format
type TableDataInput =
  | TableData
  | {
      headers?: string[];
      headerStructure?: (string | { text: string; colspan: number })[][];
      rows: string[][];
      title?: string;
      caption?: string;
    };

type Props = {
  graphImageURL?: string;
  graphAlt?: string;
  heading?: string;
  subheading?: string;
  tableData?: TableDataInput | null;
  tableCsvUrl?: string;
  tableImageUrl?: string;
  imageMaxWidth?: string;
  className?: string;

  /**
   * Which columns should apply vertical merging (rowspan).
   * Default: [0] (first column — typically "Technical Parameter").
   */
  mergeRowColumns?: number[];

  /**
   * When true, treat blank cells under a non-empty cell as continuation for rowspan.
   * This helps when Google Sheets exported CSV shows only the first cell of a merged area and blanks below.
   */
  blankAsContinuation?: boolean;

  /**
   * If true, preserve leading empty rows and leading empty columns from exported CSV.
   * Default false (we trim leading empties to be robust), but set true if you need exact positional preservation.
   */
  preserveLeadingEmptyRowsAndCols?: boolean;

  /**
   * Column alignment overrides. If not provided, column 0 = left, others = center.
   * Example: ['left','center','center','right']
   */
  columnAlign?: ("left" | "center" | "right")[];
};

function safe(src?: string) {
  return src ? encodeURI(src) : undefined;
}

function fixMojibake(s: string) {
  if (!s) return "";
  return s
    .replace(/\u00A0/g, " ")
    .replace(/âˆ’|â€“|â€”|â€'|â€’/g, "-")
    .replace(/âˆ˜/g, "°")
    .replace(/â€‹/g, "")
    .replace(/\uFFFD/g, "")
    .trim();
}

/**
 * Normalize CSV exported from Google Sheets so that:
 * - Skip leading fully-empty rows
 * - Detect multi-row headers (typically 2-3 rows)
 * - Handle merged cells by left-filling blank cells in header
 * - Return headerRows and data rows
 */
function normalizeParsedCsv_preserve(
  parsed: Papa.ParseResult<string[]>,
  opts: { preserveLeading?: boolean }
): TableData | null {
  const rawRows: string[][] = (parsed?.data || []).map((r) =>
    Array.isArray(r) ? r.map((c) => fixMojibake(String(c ?? ""))) : []
  );

  // Skip leading fully-empty rows
  let start = 0;
  while (start < rawRows.length && rawRows[start].every((c) => c === ""))
    start++;

  if (start >= rawRows.length) return null;
  const rows = rawRows.slice(start);

  const maxCols = rows.reduce((m, r) => Math.max(m, r.length), 0);
  const normalizedRows = rows.map((r) => {
    const arr = new Array(maxCols).fill("").map((_, i) => (r[i] ?? "").trim());
    return arr;
  });

  // Trim leading empty columns
  let firstCol = 0;
  for (; firstCol < maxCols; firstCol++) {
    if (normalizedRows.some((r) => (r[firstCol] || "").trim() !== "")) break;
  }
  const trimmed = normalizedRows.map((r) => r.slice(firstCol));
  if (trimmed.length === 0) return null;
  const cols = trimmed[0].length;

  // Detect header rows - look for rows that look like column labels
  // A row is a header if it has many non-empty cells
  const looksLikeHeaderRow = (row: string[]) => {
    const nonEmpty = row.filter((c) => c.trim() !== "").length;
    return nonEmpty >= Math.max(cols * 0.3, 2);
  };

  let headerEndIdx = 0;
  for (let i = 0; i < Math.min(trimmed.length, 5); i++) {
    if (looksLikeHeaderRow(trimmed[i])) {
      headerEndIdx = i + 1;
    } else if (i > 0) {
      break;
    }
  }

  if (headerEndIdx === 0) {
    headerEndIdx = 1; // at least first row as header
  }

  const headerRows = trimmed.slice(0, headerEndIdx);
  const dataRows = trimmed.slice(headerEndIdx);

  // Left-fill merged cells in header rows (cells that are empty but should inherit from left)
  const filledHeaderRows = headerRows.map((row) => {
    const filled: string[] = [];
    let last = "";
    for (let i = 0; i < cols; i++) {
      const cell = (row[i] || "").trim();
      if (cell !== "") {
        last = cell;
        filled[i] = cell;
      } else {
        filled[i] = last;
      }
    }
    return filled;
  });

  // Create flat headers by combining multi-row headers
  const headersFlat = new Array<string>(cols).fill("");
  for (let i = 0; i < cols; i++) {
    const parts: string[] = [];
    for (let j = 0; j < filledHeaderRows.length; j++) {
      const cell = (filledHeaderRows[j][i] || "").trim();
      if (cell && !parts.includes(cell)) {
        parts.push(cell);
      }
    }
    headersFlat[i] = parts.join(" — ") || `Col${i + 1}`;
  }

  // Clean data rows
  const cleanedDataRows = dataRows.map((r) => {
    const out = new Array(cols).fill("");
    for (let i = 0; i < cols; i++) out[i] = (r[i] ?? "").trim();
    return out;
  });

  return {
    headersFlat,
    headerRows: filledHeaderRows,
    rows: cleanedDataRows,
    title: "Technical Specifications",
  };
}

/* ---------- rowspan helper ---------- */

/**
 * Compute a matrix telling for each cell whether it should render and with what rowspan.
 * Input:
 *  - rows: string[][] (N rows x M cols)
 *  - mergeCols: number[] columns to apply rowspan merging to
 *  - blankAsContinuation: boolean -> if true, blank cells under a non-empty cell are considered continuation (useful for CSV from merged sheet cells)
 * Output:
 *  - cellMatrix: { text: string; rowSpan: number; render: boolean }[][] same dims
 */
function computeRowSpans(
  rows: string[][],
  mergeCols: number[],
  blankAsContinuation: boolean
) {
  const R = rows.length;
  const C = rows[0]?.length ?? 0;
  const mat = Array.from({ length: R }, () =>
    Array.from(
      { length: C },
      () =>
        ({
          text: "",
          rowSpan: 1,
          colSpan: 1,
          render: true,
        } as {
          text: string;
          rowSpan: number;
          colSpan: number;
          render: boolean;
        })
    )
  );

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      mat[r][c].text = rows[r][c] ?? "";
      mat[r][c].render = true;
      mat[r][c].rowSpan = 1;
      mat[r][c].colSpan = 1;
    }
  }

  const shouldMerge = (c: number) =>
    mergeCols.length === 0 ? false : mergeCols.includes(c);

  // vertical merge (rowspan)
  for (let c = 0; c < C; c++) {
    if (!shouldMerge(c)) continue;
    let r = 0;
    while (r < R) {
      let base = (rows[r][c] ?? "").trim();

      if (base === "" && blankAsContinuation) {
        let up = r - 1;
        while (up >= 0 && (rows[up][c] ?? "").trim() === "") up--;
        if (up >= 0) base = (rows[up][c] ?? "").trim();
      }

      if (base === "") {
        r++;
        continue;
      }

      let runLen = 1;
      let k = r + 1;
      while (k < R) {
        const nxt = (rows[k][c] ?? "").trim();
        if (nxt === base) {
          runLen++;
          k++;
        } else if (nxt === "" && blankAsContinuation) {
          runLen++;
          k++;
        } else break;
      }

      if (runLen > 1) {
        mat[r][c].rowSpan = runLen;
        for (let x = r + 1; x < r + runLen; x++) mat[x][c].render = false;
      }

      r = r + runLen;
    }
  }

  return mat;
}

/**
 * Normalize input table data to internal TableData format
 */
function normalizeTableDataInput(input: TableDataInput): TableData {
  if ((input as any).headersFlat) {
    // Already in internal format
    return input as TableData;
  } else {
    // Convert from Product.tableData format
    const {
      headers = [],
      headerStructure,
      rows = [],
      title,
      caption,
    } = input as any;

    // If headerStructure is provided, convert it to headerRows (expanded without colspan)
    let headerRows: string[][] | undefined;
    if (headerStructure) {
      headerRows = headerStructure.map(
        (row: (string | { text: string; colspan: number })[]) => {
          const expandedRow: string[] = [];
          row.forEach((cell) => {
            if (typeof cell === "string") {
              expandedRow.push(cell);
            } else {
              // For colspan cells, add the text once and empty strings for the span
              expandedRow.push(cell.text);
              for (let i = 1; i < cell.colspan; i++) {
                expandedRow.push("");
              }
            }
          });
          return expandedRow;
        }
      );
    }

    return {
      headersFlat: headers,
      headerRows: headerRows || [headers],
      rows,
      title,
      caption,
    };
  }
}

/* ---------- Component ---------- */

export default function ProductGraphsAndTableSection({
  graphImageURL,
  graphAlt = "Performance graph",
  heading = "Product Information",
  subheading,
  tableData,
  tableCsvUrl,
  tableImageUrl,
  imageMaxWidth = "720px",
  className = "",
  mergeRowColumns = [0],
  blankAsContinuation = true,
  preserveLeadingEmptyRowsAndCols = false,
  columnAlign,
}: Props) {
  const [fetchedTableData, setFetchedTableData] = React.useState<
    TableData | null | undefined
  >(tableData ? normalizeTableDataInput(tableData) : undefined);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (tableData) setFetchedTableData(normalizeTableDataInput(tableData));
  }, [tableData]);

  React.useEffect(() => {
    if (fetchedTableData !== undefined) return; // already set
    if (!tableCsvUrl) {
      setFetchedTableData(null);
      return;
    }

    let mounted = true;
    setLoading(true);

    (async () => {
      try {
        let csvUrl = tableCsvUrl || "";
        let txt: string = "";

        // For Google Sheets URLs, use multiple strategies to fetch
        if (csvUrl && csvUrl.includes("docs.google.com")) {
          // Extract the spreadsheet ID and gid from the URL
          const match = csvUrl.match(
            /spreadsheets\/d\/([a-zA-Z0-9-_]+).*[?&]gid=(\d+)/
          );
          if (match) {
            const [, sheetId, gid] = match;
            const googleUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;

            // Try multiple methods to fetch the CSV
            const methods = [
              // Method 1: Direct fetch
              async () => {
                const res = await fetch(googleUrl);
                if (res.ok) return await res.text();
                return null;
              },
              // Method 2: Try with Origin header
              async () => {
                try {
                  const res = await fetch(googleUrl, {
                    headers: {
                      Origin:
                        typeof window !== "undefined"
                          ? window.location.origin
                          : "https://techwin.com",
                    },
                  });
                  if (res.ok) return await res.text();
                } catch {}
                return null;
              },
            ];

            // Try each method in sequence
            for (const method of methods) {
              try {
                const result = await method();
                if (
                  result &&
                  result.trim().length > 0 &&
                  !/^,+\n?$/.test(result)
                ) {
                  txt = result; // Success!
                  break;
                }
              } catch (err) {
                console.debug("Fetch method failed, trying next...", err);
                continue;
              }
            }
          }
        } else if (csvUrl) {
          // For local CSV files or other URLs
          const res = await fetch(csvUrl);
          if (res.ok) txt = await res.text();
        }

        // Check if response is empty or just commas
        if (!txt || /^,+\n?$/.test(txt)) {
          throw new Error(
            "CSV appears to be blocked or empty - please check sheet permissions"
          );
        }

        const parsed = Papa.parse<string[]>(txt, { skipEmptyLines: false });
        const normalized = normalizeParsedCsv_preserve(parsed as any, {
          preserveLeading: Boolean(preserveLeadingEmptyRowsAndCols),
        });
        if (mounted) setFetchedTableData(normalized ?? null);
      } catch (err) {
        console.error("Failed to fetch/parse CSV", err);
        if (mounted) {
          setFetchedTableData(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [tableCsvUrl, fetchedTableData, preserveLeadingEmptyRowsAndCols]);

  const activeTable = fetchedTableData ?? null;

  const buildCSV = React.useCallback((headers: string[], rows: string[][]) => {
    const esc = (s: string) => {
      const str = String(s ?? "");
      if (/[",\n\r]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
      return `"${str}"`;
    };
    const head = headers.map(esc).join(",");
    const body = rows
      .map((r) => r.map((c) => esc(c ?? "")).join(","))
      .join("\n");
    return `${head}\n${body}`;
  }, []);

  const downloadCSV = React.useCallback(() => {
    if (!activeTable) return;
    const csv = buildCSV(activeTable.headersFlat, activeTable.rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(activeTable.title || "specs")
      .replace(/\s+/g, "-")
      .toLowerCase()}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, [activeTable, buildCSV]);

  const copyCSV = React.useCallback(async () => {
    if (!activeTable) return;
    const csv = buildCSV(activeTable.headersFlat, activeTable.rows);
    try {
      await navigator.clipboard.writeText(csv);
      const msg = document.createElement("div");
      msg.textContent = "Table CSV copied to clipboard";
      Object.assign(msg.style, {
        position: "fixed",
        right: "18px",
        bottom: "18px",
        background: "#0f172a",
        color: "#fff",
        padding: "8px 12px",
        borderRadius: "8px",
        zIndex: "9999",
      });
      document.body.appendChild(msg);
      setTimeout(() => msg.remove(), 1400);
    } catch {
      alert("Copy failed — clipboard permission denied.");
    }
  }, [activeTable, buildCSV]);

  /* ---------- NEW THEAD RENDERER (rowspan + colspan + COL1/COL2 hide) ---------- */
  function renderThead(headerRows?: string[][]) {
    if (!headerRows || headerRows.length === 0) return null;

    const rowCount = headerRows.length;
    const colCount = headerRows.reduce((m, r) => Math.max(m, r.length), 0);

    // COL1, COL2, col3 ... ko placeholder maanenge
    const placeholderRe = /^col\d*$/i;

    type HCell = {
      text: string;
      rowSpan: number;
      colSpan: number;
      render: boolean;
    };

    const mat: HCell[][] = Array.from({ length: rowCount }, (_, r) =>
      Array.from({ length: colCount }, (_, c) => {
        const raw = (headerRows[r]?.[c] ?? "").trim();
        return {
          text: raw,
          rowSpan: 1,
          colSpan: 1,
          render: true,
        };
      })
    );

    // --- ROWSPAN: upar wale non-empty cells ko neeche ke blank/placeholder ke saath merge karo ---
    for (let c = 0; c < colCount; c++) {
      let r = 0;
      while (r < rowCount) {
        const txt = (headerRows[r]?.[c] ?? "").trim();
        const isPlaceholder = placeholderRe.test(txt);

        if (!txt || isPlaceholder) {
          r++;
          continue;
        }

        let span = 1;
        let k = r + 1;

        while (k < rowCount) {
          const txt2 = (headerRows[k]?.[c] ?? "").trim();
          const isPlaceholder2 = placeholderRe.test(txt2);
          if (!txt2 || isPlaceholder2) {
            span++;
            k++;
          } else {
            break;
          }
        }

        mat[r][c].rowSpan = span;
        for (let x = r + 1; x < r + span; x++) {
          mat[x][c].render = false;
        }

        r = r + span;
      }
    }

    // --- COLSPAN: same text wale consecutive headers ko merge karo (Technical Indicator -> 3 cols) ---
    for (let r = 0; r < rowCount; r++) {
      let c = 0;
      while (c < colCount) {
        const cell = mat[r][c];
        if (!cell.render) {
          c++;
          continue;
        }

        const txt = (cell.text || "").trim();
        if (!txt || placeholderRe.test(txt)) {
          cell.render = false;
          c++;
          continue;
        }

        let span = 1;
        let k = c + 1;
        while (k < colCount) {
          const cell2 = mat[r][k];
          if (!cell2.render) {
            k++;
            continue;
          }
          const t2 = (cell2.text || "").trim();
          if (t2 === txt) {
            span++;
            cell2.render = false;
            k++;
          } else {
            break;
          }
        }

        cell.colSpan = span;
        c = c + span;
      }
    }

    // last: COL1 / COL2 ko force hide
    for (let r = 0; r < rowCount; r++) {
      for (let c = 0; c < colCount; c++) {
        const cell = mat[r][c];
        if (placeholderRe.test((cell.text || "").trim())) {
          cell.render = false;
          cell.text = "";
        }
      }
    }

    return (
      <thead>
        {mat.map((row, rIdx) => (
          <tr key={rIdx}>
            {row.map((cell, cIdx) => {
              if (!cell.render) return null;
              return (
                <th
                  key={cIdx}
                  rowSpan={cell.rowSpan > 1 ? cell.rowSpan : undefined}
                  colSpan={cell.colSpan > 1 ? cell.colSpan : undefined}
                  className="px-4 py-3 text-center align-middle text-xs font-semibold uppercase tracking-wider border border-black bg-gray-50"
                >
                  {cell.text || `Col${cIdx + 1}`}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
    );
  }

  const defaultColumnAlign = (idx: number) => {
    if (columnAlign && columnAlign[idx]) return columnAlign[idx];
    return idx === 0 ? "left" : "center";
  };

  return (
    <section className={`py-8 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {heading}
          </h3>
          {subheading && (
            <p className="mt-2 text-sm text-gray-600 max-w-2xl mx-auto">
              {subheading}
            </p>
          )}
        </div>

        {/* Graph */}
        {graphImageURL && (
          <div className="flex justify-center mb-6 px-4">
            <div
              className="w-full bg-white rounded-xl shadow-md overflow-visible"
              style={{ maxWidth: imageMaxWidth ?? "820px" }}
            >
              <div className="px-3 py-2 border-b border-gray-100 bg-white">
                <div className="text-xs text-gray-500">
                  Performance overview
                </div>
              </div>

              <div className="w-full bg-white flex items-center justify-center px-4 py-4">
                <Image
                  src={safe(graphImageURL)!}
                  alt={graphAlt}
                  width={1600}
                  height={1200}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    display: "block",
                  }}
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  priority
                />
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="flex justify-center">
          <div className="w-full max-w-5xl">
            {loading ? (
              <div className="text-center py-6">Loading specifications...</div>
            ) : activeTable ? (
              <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {activeTable.title ?? "Technical Specifications"}
                    </div>
                    {activeTable.caption && (
                      <div className="text-xs text-gray-500">
                        {activeTable.caption}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={downloadCSV}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[#0f172a] text-white text-sm shadow-sm hover:brightness-95 transition"
                    >
                      <ArrowDown size={14} />
                      Download CSV
                    </button>
                    <button
                      onClick={copyCSV}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm hover:bg-gray-50 transition"
                    >
                      Copy CSV
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table
                    className="min-w-full text-sm border-collapse"
                    style={{ borderCollapse: "collapse" }}
                  >
                    {renderThead(activeTable.headerRows)}

<tbody>
  {activeTable.rows.length === 0 ? (
    <tr>
      <td
        className="px-4 py-6 text-center align-middle border border-black text-gray-500"
        colSpan={activeTable.headersFlat.length}
      >
        No data available
      </td>
    </tr>
  ) : (
    (() => {
      const rowsData = activeTable.rows;
      const mergeCols = (mergeRowColumns ?? [0]).filter(
        (n) => Number.isFinite(n) && n >= 0
      );

      // 1) vertical rowspan matrix
      const cellMatrix = computeRowSpans(
        rowsData,
        mergeCols,
        Boolean(blankAsContinuation)
      );

      // 2) header se groups (Technical Indicator => 3 cols)
      const headerRows = activeTable.headerRows ?? [];
      const topHeader = headerRows[0] ?? [];
      const colCount = activeTable.headersFlat.length;

      type ColGroup = { start: number; end: number; label: string };
      const groups: ColGroup[] = [];
      let c = 0;
      while (c < colCount) {
        const label = (topHeader[c] || "").trim();
        let end = c;
        let k = c + 1;
        while (k < colCount && (topHeader[k] || "").trim() === label) {
          end = k;
          k++;
        }
        groups.push({ start: c, end, label });
        c = end + 1;
      }

      // 3) horizontal colspan (Technical Indicator ke andar merge)
      groups.forEach((g) => {
        if (g.end <= g.start) return; // single col group skip

        for (let r = 0; r < rowsData.length; r++) {
          let firstIdx = -1;
          for (let cc = g.start; cc <= g.end; cc++) {
            const cell = cellMatrix[r][cc];
            if (!cell.render) continue;
            if ((cell.text || "").trim() !== "") {
              firstIdx = cc;
              break;
            }
          }
          if (firstIdx === -1) continue;
          if (firstIdx !== g.start) continue;

          let allRightEmpty = true;
          for (let cc = firstIdx + 1; cc <= g.end; cc++) {
            const cell = cellMatrix[r][cc];
            if (!cell.render) continue;
            if ((cell.text || "").trim() !== "") {
              allRightEmpty = false;
              break;
            }
          }
          if (!allRightEmpty) continue;

          cellMatrix[r][firstIdx].colSpan = g.end - firstIdx + 1;
          for (let cc = firstIdx + 1; cc <= g.end; cc++) {
            cellMatrix[r][cc].render = false;
          }
        }
      });

      // 4) banding per "Technical Parameter" group
      const rowBand: number[] = [];
      let band = -1;
      for (let r = 0; r < rowsData.length; r++) {
        const firstCell = cellMatrix[r][0]; // first column == Technical Parameter
        if (
          firstCell &&
          firstCell.render &&
          (firstCell.text || "").trim() !== ""
        ) {
          // naya parameter => naya band
          band++;
        }
        rowBand[r] = band;
      }

      return rowsData.map((row, rIdx) => {
        const bandIndex = rowBand[rIdx] < 0 ? 0 : rowBand[rIdx];
        const isShaded = bandIndex % 2 === 0; // 0,2,4... ek color; 1,3,5... doosra
        const rowClass = isShaded ? "bg-gray-50" : "bg-white";

        return (
          <tr key={rIdx} className={rowClass}>
            {activeTable.headersFlat.map((_, cIdx) => {
              const cell = cellMatrix[rIdx][cIdx];
              if (!cell.render) return null;

              const align = defaultColumnAlign(cIdx);

              let clsAlign =
                align === "left"
                  ? "text-left"
                  : align === "right"
                  ? "text-right"
                  : "text-center";

              // 👑 first column = Technical Parameter
              if (cIdx === 0) {
                clsAlign = "text-center font-semibold"; // bold + center
              }

              return (
                <td
                  key={cIdx}
                  rowSpan={cell.rowSpan > 1 ? cell.rowSpan : undefined}
                  colSpan={cell.colSpan > 1 ? cell.colSpan : undefined}
                  className={`px-4 py-3 align-middle border border-black text-gray-800 whitespace-pre-line ${clsAlign}`}
                >
                  {cell.text}
                </td>
              );
            })}
          </tr>
        );
      });
    })()
  )}
</tbody>

                  </table>
                </div>

                <div className="px-4 py-3 text-xs text-gray-500 border-t border-gray-100">
                  Values are representative. Contact sales for model-specific
                  datasheets and tolerances.
                </div>
              </div>
            ) : tableImageUrl ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div
                  className="relative w-full"
                  style={{ maxWidth: imageMaxWidth }}
                >
                  <Image
                    src={safe(tableImageUrl)!}
                    alt="Specification table"
                    width={1200}
                    height={800}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 p-6">
                No table data provided
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
