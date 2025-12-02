// src/components/category/DatasheetGallery.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { FileText, FileDown, File, Copy, ExternalLink, X } from "lucide-react";
import Link from "next/link";

export type DownloadItem = {
  label: string;
  href: string;
  type?: string;
  size?: string;
  preview?: boolean;
};

type Props = {
  downloads: DownloadItem[];
  heading?: string;
  columns?: 1 | 2 | 3;
};

const gridCols = (cols = 3) =>
  cols === 1 ? "grid-cols-1" : cols === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.995 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.46, ease: "easeOut" } },
};

export default function DatasheetGallery({ downloads, heading = "Datasheets & Brochures", columns = 3 }: Props) {
  const [preview, setPreview] = useState<DownloadItem | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [loadingIframe, setLoadingIframe] = useState(false);
  const previewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreview(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (preview) {
      // focus trap start
      previewRef.current?.focus();
    }
  }, [preview]);

  const openPreview = (item: DownloadItem) => {
    const isPdf = (item.type ?? "pdf").toLowerCase().includes("pdf");
    if (item.preview && isPdf) {
      setPreview(item);
    } else {
      // fallback open
      window.open(item.href, "_blank", "noopener,noreferrer");
    }
  };

  const handleCopy = async (href: string) => {
    try {
      await navigator.clipboard.writeText(href);
      setCopied(href);
      setTimeout(() => setCopied((h) => (h === href ? null : h)), 1600);
    } catch {
      // ignore
    }
  };

  function renderIcon(type?: string) {
    const t = (type || "").toLowerCase();
    if (t.includes("pdf") || t.includes("datasheet") || t.includes("brochure")) return <FileText className="w-6 h-6 text-[--color-primary]" aria-hidden />;
    if (t.includes("zip")) return <File className="w-6 h-6 text-[--color-primary]" aria-hidden />;
    return <FileDown className="w-6 h-6 text-[--color-primary]" aria-hidden />;
  }

  return (
    <section aria-labelledby="datasheets-heading" className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-6">
          <div className="flex items-center gap-4">
            <span className="w-12 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg,var(--color-primary),var(--color-primary-light))" }} />
            <h2 id="datasheets-heading" className="text-xl md:text-2xl font-semibold text-slate-900">
              <span className="inline-block px-3 py-1 rounded-full" style={{ background: "var(--color-primary)", color: "white" }}>
                {heading}
              </span>
            </h2>
          </div>
          <p className="mt-3 text-slate-600 max-w-3xl">
            Download datasheets, brochures and technical reports. Use <strong>Preview</strong> for supported PDFs, or Download to save files locally.
          </p>
        </header>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={containerVariants}>
          <div className={`grid ${gridCols(columns)} gap-6`}>
            {downloads.map((d, i) => (
              <motion.article
                key={d.href + i}
                variants={cardVariants}
                className="relative bg-white rounded-2xl p-5 border border-[rgba(15,23,42,0.04)] shadow-[0_12px_36px_rgba(16,24,40,0.06)] hover:shadow-[0_18px_50px_rgba(48,135,192,0.12)] transform-gpu transition-transform"
                whileHover={{ translateY: -8, scale: 1.01 }}
                role="group"
              >
                {/* left accent stripe */}
                <div
                  aria-hidden
                  className="absolute -left-1 top-4 bottom-4 w-1 rounded-r-full"
                  style={{ background: "linear-gradient(180deg,var(--color-primary),var(--color-primary-light))", opacity: 0.14 }}
                />

                <div className="relative z-10 flex gap-4">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(180deg,rgba(48,135,192,0.06),rgba(91,183,225,0.03))" }}
                    aria-hidden
                  >
                    {renderIcon(d.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-base font-semibold text-slate-900 truncate">{d.label}</h3>

                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                      {d.size && <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-[rgba(15,23,42,0.03)]">{d.size}</span>}
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-[rgba(15,23,42,0.03)]">{(d.type ?? "PDF").toUpperCase()}</span>
                    </div>

                    <p className="sr-only">{d.href}</p>

                    {/* action overlay (visible on hover & focus) */}
                    <div className="mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => openPreview(d)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[--color-primary] text-white text-sm font-medium focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(48,135,192,0.14)] transition"
                          aria-label={`Preview ${d.label}`}
                          title={d.preview ? "Preview in browser" : "Open in new tab"}
                        >
                          <FileText className="w-4 h-4" />
                          <span>Preview</span>
                        </button>

                        <Link href={d.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-[rgba(15,23,42,0.06)] text-[--color-primary] text-sm font-medium hover:bg-[--color-primary]/6 transition">
                          <FileDown className="w-4 h-4" />
                          <span>Download</span>
                        </Link>

                        <button
                          onClick={() => handleCopy(d.href)}
                          className="ml-auto inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm border border-transparent hover:border-[rgba(15,23,42,0.06)] transition"
                          aria-label={`Copy link for ${d.label}`}
                        >
                          {copied === d.href ? (
                            <span className="flex items-center gap-2 text-[--color-primary]"><Copy className="w-4 h-4 rotate-12" />Copied</span>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 text-slate-600" />
                              <span className="text-slate-700">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* full-cover overlay with big centered actions for mouse users */}
                <div className="pointer-events-none">
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "linear-gradient(180deg, rgba(48,135,192,0.02), rgba(91,183,225,0.02))" }}
                  />
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Preview modal */}
      {preview && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          onClick={() => setPreview(null)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <motion.div
            ref={previewRef}
            tabIndex={-1}
            className="relative z-10 w-full max-w-5xl h-[84vh] bg-white rounded-2xl shadow-2xl overflow-hidden focus:outline-none"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 p-3 border-b border-[rgba(15,23,42,0.04)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[rgba(48,135,192,0.06)]">
                  <FileText className="w-5 h-5 text-[--color-primary]" />
                </div>
                <div>
                  <h3 id="preview-title" className="text-sm md:text-base font-semibold text-slate-900">{preview.label}</h3>
                  <p className="text-xs text-slate-600">{preview.size ?? preview.type}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a href={preview.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-white border border-[rgba(15,23,42,0.06)] hover:bg-slate-50">
                  <ExternalLink className="w-4 h-4" /> Open
                </a>
                <a href={preview.href} download className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-white border border-[rgba(15,23,42,0.06)] hover:bg-slate-50">
                  <FileDown className="w-4 h-4" /> Download
                </a>
                <button onClick={() => setPreview(null)} aria-label="Close preview" className="w-10 h-10 rounded-lg inline-flex items-center justify-center text-slate-700 hover:bg-slate-50">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* viewer */}
            <div className="flex-1 bg-slate-50 relative">
              {loadingIframe && (
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <div className="rounded-full w-12 h-12 border-4 border-[rgba(48,135,192,0.12)] border-t-[--color-primary] animate-spin" />
                </div>
              )}

              <iframe
                src={preview.href}
                title={preview.label}
                className="w-full h-full"
                onLoad={() => setLoadingIframe(false)}
                loading="lazy"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
