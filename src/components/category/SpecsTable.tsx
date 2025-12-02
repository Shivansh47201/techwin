"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Copy, Check } from "lucide-react";

export type SpecRow = {
  name: string;
  value: string;
};

export type SpecGroup = {
  label: string;
  rows: SpecRow[];
};

type Props = { specGroups: SpecGroup[] };

/* Animation variants */
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.36, ease: "easeOut" } },
};

export default function SpecsTable({ specGroups }: Props) {
  // track which cell was recently copied: `${groupIndex}-${rowIndex}`
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1600);
    } catch {
      // ignore failures (clipboard permission), could add fallback if needed
    }
  };

  return (
    <section aria-labelledby="specs-heading" className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <span
              className="w-12 h-0.5 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-primary), var(--color-primary-light))",
              }}
            />
            <h2
              id="specs-heading"
              className="text-2xl font-semibold text-slate-900"
            >
              <span
                className="inline-block px-4 py-2 rounded-full"
                style={{
                  background: "var(--color-primary)",
                  color: "white",
                  boxShadow: "0 10px 30px rgba(48,135,192,0.14)",
                }}
              >
                Technical Specifications
              </span>
            </h2>
          </div>

          {/* optional small legend / help */}
          <div className="text-sm text-slate-600 hidden sm:block">
            Click copy icon to copy a spec value.
          </div>
        </div>

        {/* Groups */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="space-y-8"
        >
          {specGroups.map((group, gIdx) => (
            <div
              key={gIdx}
              className="
                rounded-2xl
                border border-[rgba(48,135,192,0.10)]
                bg-white/70
                backdrop-blur-md
                shadow-[0_6px_30px_rgba(48,135,192,0.06)]
                overflow-hidden
              "
            >
              {/* Group heading */}
              <div
                className="
                  px-6 py-4
                  bg-[rgba(48,135,192,0.04)]
                  border-b border-[rgba(48,135,192,0.12)]
                  text-lg font-medium text-slate-800
                "
              >
                {group.label}
              </div>

              {/* Desktop table */}
              <div className="hidden md:block">
                <motion.table className="w-full" aria-label={group.label}>
                  <tbody>
                    {group.rows.map((row, rIdx) => {
                      const key = `${gIdx}-${rIdx}`;
                      const isCopied = copiedKey === key;
                      return (
                        <motion.tr
                          key={rIdx}
                          variants={rowVariants}
                          className={`group border-b last:border-b-0 border-[rgba(48,135,192,0.06)] hover:bg-white`}
                        >
                          <td className="py-4 px-6 text-slate-700 font-medium w-1/3 align-top">
                            {row.name}
                          </td>
                          <td className="py-4 px-6 text-slate-900 align-top">
                            <div className="flex items-start gap-3">
                              <div className="flex-1 break-words">{row.value}</div>

                              {/* copy button (appears on hover or always visible on touch) */}
                              <button
                                onClick={() => handleCopy(row.value, key)}
                                aria-label={`Copy ${row.name}`}
                                className="ml-2 flex items-center justify-center p-2 rounded-md transition-opacity duration-150 opacity-0 group-hover:opacity-100 focus:opacity-100"
                                title="Copy"
                                type="button"
                                style={{ background: "rgba(15,23,42,0.02)" }}
                              >
                                {isCopied ? (
                                  <span className="flex items-center gap-1 text-[--color-primary]">
                                    <Check className="w-4 h-4" />
                                    <span className="text-xs">Copied</span>
                                  </span>
                                ) : (
                                  <Copy className="w-4 h-4 text-slate-600" />
                                )}
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </motion.table>
              </div>

              {/* Mobile: stacked cards (better readibility) */}
              <div className="md:hidden px-4 py-4 space-y-3">
                {group.rows.map((row, rIdx) => {
                  const key = `${gIdx}-${rIdx}`;
                  const isCopied = copiedKey === key;
                  return (
                    <motion.div
                      key={rIdx}
                      variants={rowVariants}
                      className="group bg-white rounded-xl p-4 border border-[rgba(48,135,192,0.06)] shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-slate-700">{row.name}</div>
                          <div className="mt-2 text-sm text-slate-900 break-words">{row.value}</div>
                        </div>

                        <div className="flex-shrink-0 ml-2">
                          <button
                            onClick={() => handleCopy(row.value, key)}
                            aria-label={`Copy ${row.name}`}
                            className="p-2 rounded-md"
                            type="button"
                            style={{ background: "rgba(15,23,42,0.03)" }}
                          >
                            {isCopied ? <Check className="w-5 h-5 text-[--color-primary]" /> : <Copy className="w-5 h-5 text-slate-600" />}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
