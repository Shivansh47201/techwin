// src/components/products/SpecCsvUploader.tsx
"use client";

import React from "react";
import Papa from "papaparse";
import ProductGraphsAndTableSection from "./ProductGraphsAndTableSection";

type TableData = {
  headersFlat: string[];
  headerRows?: string[][];
  rows: string[][];
  title?: string;
  caption?: string;
};

/* ---------- parsing + normalization (same logic as component) ---------- */

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

function normalizeParsedCsv_preserve(parsed: Papa.ParseResult<string[]>, opts: { preserveLeading?: boolean } = {}) : TableData | null {
  const rawRows: string[][] = (parsed?.data || []).map((r) =>
    Array.isArray(r) ? r.map((c) => fixMojibake(String(c ?? ""))) : []
  );

  // remove leading empty rows unless preserveLeading true
  let start = 0;
  if (!opts.preserveLeading) {
    while (start < rawRows.length && rawRows[start].every((c) => c === "")) start++;
  }
  if (start >= rawRows.length) return null;
  const rows = rawRows.slice(start);

  const maxCols = rows.reduce((m, r) => Math.max(m, r.length), 0);
  const normalizedRows = rows.map((r) => {
    const arr = new Array(maxCols).fill("").map((_, i) => (r[i] ?? "").trim());
    return arr;
  });

  // trim leading empty columns unless preserveLeading true
  let firstCol = 0;
  if (!opts.preserveLeading) {
    for (; firstCol < maxCols; firstCol++) {
      if (normalizedRows.some((r) => (r[firstCol] || "").trim() !== "")) break;
    }
  }
  const trimmed = normalizedRows.map((r) => r.slice(firstCol));
  if (trimmed.length === 0) return null;
  const cols = trimmed[0].length;

  const looksLikeSubheader = (row: string[]) =>
    row.some((cell) => /minimum|typical|maximum|min|typ|max|minimum value|typical value/i.test(cell));

  const topHeader = trimmed[0].map((c) => c || "");
  const secondRow = trimmed[1] ? trimmed[1].map((c) => c || "") : [];

  // left-fill top header
  const filledTop: string[] = [];
  let last = "";
  for (let i = 0; i < cols; i++) {
    if (topHeader[i] && topHeader[i].trim() !== "") {
      last = topHeader[i].trim();
      filledTop[i] = last;
    } else {
      filledTop[i] = last;
    }
  }

  const secondIsSub = secondRow.length > 0 && looksLikeSubheader(secondRow);

  if (secondIsSub) {
    const top = filledTop.map((c) => (c || "").trim());
    const sub = secondRow.map((c) => (c || "").trim());

    const headersFlat = new Array<string>(cols).fill("");
    for (let i = 0; i < cols; i++) {
      if (sub[i]) headersFlat[i] = `${top[i] ? top[i] + " — " : ""}${sub[i]}`.trim();
      else headersFlat[i] = top[i] || `Col${i + 1}`;
    }

    const headerRows = [top, sub];
    const dataRows = trimmed.slice(2).map((r) => {
      const out = new Array(cols).fill("");
      for (let i = 0; i < cols; i++) out[i] = (r[i] ?? "").trim();
      return out;
    });

    return { headersFlat, headerRows, rows: dataRows, title: "Technical Specifications" };
  } else {
    const headersFlat = topHeader.map((c, i) => (c && c.trim() !== "" ? c.trim() : `Col${i + 1}`));
    const dataRows = trimmed.slice(1).map((r) => {
      const out = new Array(cols).fill("");
      for (let i = 0; i < cols; i++) out[i] = (r[i] ?? "").trim();
      return out;
    });
    return { headersFlat, rows: dataRows, headerRows: [headersFlat], title: "Technical Specifications" };
  }
}

/* ---------- rowspan compute used for preview merging ---------- */

function computeRowSpans(rows: string[][], mergeCols: number[], blankAsContinuation: boolean) {
  const R = rows.length;
  const C = rows[0]?.length ?? 0;
  const mat = Array.from({ length: R }, () => Array.from({ length: C }, () => ({ text: "", rowSpan: 1, render: true as boolean })));

  for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) { mat[r][c].text = rows[r][c] ?? ""; mat[r][c].render = true; mat[r][c].rowSpan = 1; }

  const shouldMerge = (c: number) => mergeCols.length === 0 ? false : mergeCols.includes(c);

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
      if (base === "") { r++; continue; }
      let runLen = 1;
      let k = r + 1;
      while (k < R) {
        const nxt = (rows[k][c] ?? "").trim();
        if (nxt === base) { runLen++; k++; }
        else if (nxt === "" && blankAsContinuation) { runLen++; k++; }
        else break;
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

/* ---------- UI Component ---------- */

export default function SpecCsvUploader() {
  const [tableData, setTableData] = React.useState<TableData | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [mergeCols, setMergeCols] = React.useState<number[]>([0]);
  const [blankContinue, setBlankContinue] = React.useState(true);
  const [preserveLeading, setPreserveLeading] = React.useState(false);
  const [fileName, setFileName] = React.useState<string | null>(null);

  async function handleFile(file?: File) {
    if (!file) return;
    setLoading(true);
    setFileName(file.name);
    Papa.parse<string[]>(file, {
      complete: (parsed) => {
        const normalized = normalizeParsedCsv_preserve(parsed, { preserveLeading });
        if (!normalized) {
          setTableData(null);
          setLoading(false);
          return;
        }
        // compute rowspan matrix and then "expand" cells so ProductGraphsAndTableSection can still use headerRows+rows
        // (component supports mergeRowColumns prop; we'll just pass normalized and the merge props)
        setTableData(normalized);
        setLoading(false);
      },
      error: (err) => {
        console.error("CSV parse error", err);
        setLoading(false);
      },
      skipEmptyLines: false,
    });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  // UI to let user control merge columns (comma separated indexes)
  const onMergeColsChange = (v: string) => {
    const arr = v.split(",").map((s) => Number(s.trim())).filter((n) => Number.isFinite(n));
    setMergeCols(arr.length ? arr : [0]);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white p-4 rounded-lg shadow-md border">
        <h3 className="text-lg font-semibold mb-2">Upload / Preview specification CSV</h3>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <label className="inline-flex items-center gap-2">
            <input type="file" accept=".csv,text/csv" onChange={handleInputChange} className="block" />
          </label>

          <div className="flex gap-2 items-center">
            <label className="text-sm">
              Merge columns (comma indexes, default 0):{" "}
              <input
                type="text"
                defaultValue="0"
                onBlur={(e) => onMergeColsChange(e.target.value)}
                className="border px-2 py-1 rounded text-sm"
                placeholder="0 or 0,1"
              />
            </label>

            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={blankContinue} onChange={(e) => setBlankContinue(e.target.checked)} /> Blank = continuation
            </label>

            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={preserveLeading} onChange={(e) => setPreserveLeading(e.target.checked)} /> Preserve leading blanks
            </label>

            <button
              onClick={() => {
                // quick sample injection: useful for testing without file
                const csv = `Technical Parameter,Unit,Technical Indicator,,\n, ,Minimum Value,Typical Value,Maximum Value\nCenter Wavelength,nm,1550,,\nOptical Mode,/,Single-mode, Continuous Wave,,\nOutput Power,mW,50,,\nLinewidth,Hz,<25,,\nOptical Signal-to-Noise Ratio (OSNR),dB,$\\ge 55$,,\nFrequency Noise,Hz^2 / Hz @ 1 Hz,10000,,\n,Hz^2/Hz @ 10 Hz,1002,,\n,Hz^2/Hz @ 100 Hz,103,,\n,Hz^2/Hz @ 1 kHz,10,,\n`;
                Papa.parse<string[]>(csv, {
                  complete: (parsed) => {
                    const normalized = normalizeParsedCsv_preserve(parsed, { preserveLeading });
                    setTableData(normalized);
                  },
                });
              }}
              className="ml-2 bg-sky-600 text-white px-3 py-1 rounded text-sm"
            >
              Load sample
            </button>
          </div>
        </div>

        <div className="mt-3 text-xs text-gray-600">
          {fileName ? <>Loaded: <strong>{fileName}</strong></> : "No file loaded yet (or use Load sample)."}
        </div>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="p-6 bg-white rounded shadow-sm text-center">Parsing file…</div>
        ) : tableData ? (
          <ProductGraphsAndTableSection
            heading="Technical Specifications"
            tableData={tableData}
            // pass merge + blank options so component will compute rowspans as you want
            mergeRowColumns={mergeCols}
            blankAsContinuation={blankContinue}
            imageMaxWidth="1100px"
          />
        ) : (
          <div className="p-6 bg-white rounded shadow-sm text-center text-gray-500">No table to preview</div>
        )}
      </div>
    </div>
  );
}
