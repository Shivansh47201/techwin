// src/components/application/detail/ApplicationComparisonMatrix.tsx
"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Save, Filter, ArrowDownUp, Star } from "lucide-react";

export type ComparisonCell = string | number | boolean | React.ReactNode;
export type ComparisonRow = {
  id: string;
  title: string;
  subtitle?: string;
  cells: ComparisonCell[]; // matches columns length
  best?: boolean; // optional marker to highlight best-in-class
};

type ComparisonMatrixProps = {
  columns: string[]; // column titles (first col is the feature/product name)
  rows: ComparisonRow[];
  background?: "blue" | "white";
  stickyHeader?: boolean;
};

export default function ApplicationComparisonMatrix({
  columns,
  rows,
  background = "white",
  stickyHeader = true,
}: ComparisonMatrixProps) {
  const isBlue = background === "blue";
  const [query, setQuery] = useState("");
  const [sortCol, setSortCol] = useState<number | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => {
      if (r.title.toLowerCase().includes(q)) return true;
      if ((r.subtitle || "").toLowerCase().includes(q)) return true;
      return r.cells.some((c) => String(c).toLowerCase().includes(q));
    });
  }, [rows, query]);

  const sorted = useMemo(() => {
    if (sortCol == null) return filtered;
    const idx = sortCol;
    const sortedRows = [...filtered].sort((a, b) => {
      const av = a.cells[idx];
      const bv = b.cells[idx];
      const an = Number(String(av).replace(/[^0-9.-]+/g, ""));
      const bn = Number(String(bv).replace(/[^0-9.-]+/g, ""));
      if (!isNaN(an) && !isNaN(bn)) return sortDir === "asc" ? an - bn : bn - an;
      const as = String(av).toLowerCase();
      const bs = String(bv).toLowerCase();
      if (as < bs) return sortDir === "asc" ? -1 : 1;
      if (as > bs) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return sortedRows;
  }, [filtered, sortCol, sortDir]);

  const exportCSV = () => {
    const header = ["Feature/Product", ...columns.slice(1)].join(",");
    const body = rows
      .map((r) => [escapeCSV(r.title), ...r.cells.map((c) => escapeCSV(String(c)))].join(","))
      .join("\n");
    const csv = `${header}\n${body}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `comparison-matrix.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  function escapeCSV(s: string) {
    if (s.includes(",") || s.includes('"') || s.includes("\n")) return `"${s.replace(/"/g, '""')}"`;
    return s;
  }

  // gridTemplateColumns: first column wider, rest minmax
  const gridStyle: React.CSSProperties = {
    gridTemplateColumns: `minmax(220px, 1fr) repeat(${Math.max(0, columns.length - 1)}, minmax(160px, 1fr))`,
  };

  return (
    <section
      className={`w-full ${isBlue ? "bg-[#3B9ACB] text-white" : "bg-white text-slate-900"} py-12 md:py-16`}
      aria-label="Comparison matrix"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between mb-6 gap-4">
          <div>
            <div className={`text-xs font-semibold uppercase tracking-wider ${isBlue ? "text-white/90" : "text-[--primary]"}`}>
              Compare
            </div>
            <h3 className={`text-2xl md:text-3xl font-extrabold ${isBlue ? "text-white" : "text-slate-900"}`}>
              Comparison matrix
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`relative rounded-full px-3 py-1 flex items-center gap-2 ${
                isBlue ? "bg-white/6 text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              <Filter className="w-4 h-4" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search features, specs..."
                className={`bg-transparent outline-none text-sm placeholder:${isBlue ? "text-white/70" : "text-slate-400"}`}
                aria-label="Search matrix"
              />
            </div>

            <button
              onClick={() => {
                setSortCol(null);
                setSortDir("desc");
              }}
              className={`px-3 py-2 rounded-lg ${isBlue ? "bg-white/10 text-white" : "bg-slate-100 text-slate-700"}`}
              title="Reset sort"
              aria-label="Reset sort"
            >
              <ArrowDownUp className="w-4 h-4" />
            </button>

            <button
              onClick={exportCSV}
              className={`px-3 py-2 rounded-lg ${isBlue ? "bg-white text-[--primary]" : "bg-[--primary] text-white"}`}
              title="Export CSV"
              aria-label="Export CSV"
            >
              <Save className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className={`relative overflow-auto rounded-2xl shadow-lg ${isBlue ? "border border-white/10" : "border border-gray-100"}`}>
          <div style={{ minWidth: "100%" }}>
            <div className="grid" style={gridStyle}>
              {/* header row */}
              {columns.map((col, ci) => (
                <div
                  key={ci}
                  className={`sticky top-0 px-4 py-3 border-b ${isBlue ? "border-white/8" : "border-gray-100"} ${
                    ci === 0 ? (isBlue ? "bg-[#3B9ACB]/95 text-white" : "bg-white text-slate-700") : (isBlue ? "bg-[#3B9ACB]/92 text-white" : "bg-white text-slate-700")
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex-1 font-semibold">{col}</div>
                    {ci > 0 && (
                      <button
                        onClick={() => {
                          // sort columns map to cells index = ci - 1
                          const colIdx = ci - 1;
                          if (sortCol === colIdx) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
                          else {
                            setSortCol(colIdx);
                            setSortDir("desc");
                          }
                        }}
                        className={`p-1 rounded-md ${isBlue ? "bg-white/8 text-white" : "bg-slate-100 text-slate-700"}`}
                        title="Sort"
                        aria-label={`Sort by ${col}`}
                      >
                        <ArrowDownUp className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* rows */}
              {sorted.map((r) => (
                // each row renders first cell then rest of cells
                <React.Fragment key={r.id}>
                  <div className={`px-4 py-4 border-b ${isBlue ? "border-white/6" : "border-gray-100"} bg-transparent`}>
                    <div>
                      <div className="flex items-center gap-2">
                        <div className={`text-sm font-semibold ${isBlue ? "text-white" : "text-slate-900"}`}>{r.title}</div>
                        {r.subtitle && <div className={`text-xs opacity-80 ${isBlue ? "text-white/90" : "text-slate-500"}`}>{r.subtitle}</div>}
                      </div>

                      {r.best && (
                        <div className="mt-2 inline-flex items-center gap-2 px-2 py-1 rounded-md bg-gradient-to-r from-yellow-300 to-yellow-400 text-black text-xs font-semibold shadow-md">
                          <Star className="w-3 h-3" />
                          Best-in-class
                        </div>
                      )}
                    </div>
                  </div>

                  {r.cells.map((c, ci) => (
                    <div
                      key={ci}
                      className={`px-4 py-4 border-b ${isBlue ? "border-white/6" : "border-gray-100"} ${r.best ? (isBlue ? "bg-white/6" : "bg-gradient-to-r from-white/6 to-transparent") : ""}`}
                    >
                      <div className="text-sm md:text-base break-words">{c}</div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :root {
          --primary: #3b9acb;
        }
      `}</style>
    </section>
  );
}
