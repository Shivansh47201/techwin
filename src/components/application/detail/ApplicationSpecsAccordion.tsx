"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Copy } from "lucide-react";

export type SpecItem = {
  id?: string;
  title: string;
  description?: string;
  values?: { label: string; value: string }[]; // key numeric specs
  inlineVisual?: React.ReactNode; // small icon or mini-graph
};

type SpecsAccordionProps = {
  groups?: { heading?: string; items: SpecItem[] }[];
  downloadHref?: string | null;
  background?: "blue" | "white";
};

export default function ApplicationSpecsAccordion({ groups = [], downloadHref = null, background = "white" }: SpecsAccordionProps) {
  const isBlue = background === "blue";
  const [open, setOpen] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const toggle = (id?: string) => setOpen((prev) => (prev === id ? null : id ?? null));

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    } catch (e) {
      // ignore
    }
  };

  return (
    <section className={`w-full ${isBlue ? "bg-[#3B9ACB] text-white" : "bg-white text-slate-900"} py-12 md:py-16`} aria-label="Technical specifications">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className={`text-xs font-semibold uppercase tracking-wider ${isBlue ? "text-white/90" : "text-[--primary]"}`}>Specifications</div>
            <h3 className={`text-2xl md:text-3xl font-extrabold ${isBlue ? "text-white" : "text-slate-900"}`}>Technical specs & datasheets</h3>
          </div>

          <div className="flex items-center gap-3">
            {downloadHref && (
              <a
                href={downloadHref}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold transition ${isBlue ? "bg-white text-[--primary]" : "bg-[--primary] text-white"}`}
                download
              >
                Download datasheet
              </a>
            )}

            <div className={`text-sm ${isBlue ? "text-white/90" : "text-slate-600"}`}>Expandable specs with handy tools</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {groups.length === 0 && (
            <div className={`p-6 rounded-2xl ${isBlue ? "bg-white/6" : "bg-slate-50"}`}>No technical specs available.</div>
          )}

          {groups.map((g, gi) => (
            <div key={gi} className="space-y-3">
              {g.heading && <div className={`text-sm font-semibold ${isBlue ? "text-white/90" : "text-slate-700"}`}>{g.heading}</div>}

              {g.items.map((item, idx) => {
                const id = item.id ?? `${gi}-${idx}`;
                const isOpen = open === id;
                return (
                  <div key={id} className={`rounded-2xl overflow-hidden border ${isBlue ? "border-white/8" : "border-gray-100"} bg-opacity-0`}>
                    <button
                      type="button"
                      onClick={() => toggle(id)}
                      className={`w-full px-4 py-4 flex items-center justify-between gap-4 text-left ${isBlue ? "bg-white/6 text-white" : "bg-white text-slate-900"}`}
                      aria-expanded={isOpen}
                      aria-controls={`spec-${id}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isBlue ? "bg-white/8 text-white" : "bg-gray-50 text-slate-900"}`}>
                          {item.inlineVisual ?? <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 12h18" stroke={isBlue ? "#fff" : "#94a3b8"} strokeWidth="1.8" strokeLinecap="round"/></svg>}
                        </div>

                        <div>
                          <div className={`text-sm font-semibold ${isBlue ? "text-white" : "text-slate-900"}`}>{item.title}</div>
                          {item.description && <div className={`text-xs mt-1 ${isBlue ? "text-white/90" : "text-slate-500"}`}>{item.description}</div>}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {item.values && item.values.length > 0 && (
                          <div className={`hidden md:flex flex-col items-end text-xs ${isBlue ? "text-white/90" : "text-slate-500"}`}>
                            {item.values.slice(0, 2).map((v, vi) => (
                              <div key={vi} className="flex items-center gap-2">
                                <span className="font-mono font-semibold">{v.value}</span>
                                <span className="opacity-80">{v.label}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.35 }}>
                            <ChevronDown className={`${isBlue ? "text-white" : "text-slate-600"} w-5 h-5`} />
                          </motion.span>
                        </div>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key={`panel-${id}`}
                          id={`spec-${id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.36, ease: [0.2, 0.8, 0.2, 1] }}
                          className={`${isBlue ? "bg-white/4" : "bg-white"} px-4 pb-4 pt-0`}
                        >
                          <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                            <div className="md:col-span-2">
                              {item.values && item.values.length > 0 ? (
                                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {item.values.map((v, k) => (
                                    <div key={k} className="flex items-center justify-between gap-3 p-3 rounded-lg bg-opacity-0">
                                      <dt className={`text-xs ${isBlue ? "text-white/90" : "text-slate-500"}`}>{v.label}</dt>
                                      <dd className="flex items-center gap-3">
                                        <div className={`font-mono font-semibold ${isBlue ? "text-white" : "text-slate-900"}`}>{v.value}</div>
                                        <button
                                          type="button"
                                          onClick={(e) => { e.stopPropagation(); copyToClipboard(v.value, `${id}-${k}`); }}
                                          className={`p-1 rounded-md border ${isBlue ? "border-white/8 text-white/90" : "border-gray-100 text-slate-700"}`}
                                          title="Copy value"
                                        >
                                          <Copy className="w-4 h-4" />
                                        </button>
                                        {copied === `${id}-${k}` && <span className="text-xs ml-2 text-green-400">Copied</span>}
                                      </dd>
                                    </div>
                                  ))}
                                </dl>
                              ) : (
                                <div className={`text-sm ${isBlue ? "text-white/90" : "text-slate-700"}`}>No numeric specs available.</div>
                              )}

                              {/* long form content area (if any) */}
                              {item.description && <div className={`mt-4 text-sm ${isBlue ? "text-white/90" : "text-slate-700"}`}>{item.description}</div>}
                            </div>

                            <div className="md:col-span-1 flex items-start justify-end">
                              {/* small illustrative visual / mini-graph */}
                              <div className={`w-40 h-24 rounded-lg p-2 ${isBlue ? "bg-white/6" : "bg-slate-50"} flex items-center justify-center`}>{item.inlineVisual ?? <svg width="90" height="40" viewBox="0 0 90 40" fill="none"><path d="M5 30 L25 10 L45 20 L65 5 L85 25" stroke={isBlue ? "#fff" : "#0f172a"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}</div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        :root { --primary: #3b9acb; }
      `}</style>
    </section>
  );
}
