// src/components/category/SubCategoryGrid.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { PRODUCT_MAP } from "@/data/products";

export type SubCategoryItem = {
  id?: string; // slug
  name: string;
  shortDescription: string;
  details?: string;
  image?: string; // optional hero/thumb image under /public/
  imageAlt?: string;
  datasheet?: string; // optional /downloads/... pdf
  tag?: string; // e.g. "1.5 µm" or "PM"
};

type Props = {
  items: SubCategoryItem[];
  categorySlug?: string; // used to build links: /${categorySlug}/${id}
  columns?: number; // default 3 (desktop)
  fallbackImage?: string;
  heading?: string;
  subtitle?: string;
  compact?: boolean;
};

const WRAPPER = "max-w-7xl mx-auto px-6 md:px-8 lg:px-12";
const SECTION_PADDING = "py-14 md:py-20";

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.48, ease: "easeOut" },
  },
};

function normalizeSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/--+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function SubCategoryGrid({
  items,
  categorySlug = "",
  columns = 3,
  fallbackImage = "/techwin-company/card-thumb-default.webp",
  heading = "Products",
  subtitle = "Explore product families and models — quick specs, datasheets, and deep dive.",
  compact = false,
}: Props) {
  const [openItem, setOpenItem] = useState<SubCategoryItem | null>(null);

  const gridCols =
    columns === 1
      ? "grid-cols-1"
      : columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  const cardPadding = compact ? "p-4" : "p-5";

  return (
    <section
      aria-label="Products and subcategories"
      className={`
        relative
        overflow-hidden
        ${SECTION_PADDING}
        w-screen left-1/2 -translate-x-1/2
        bg-[#3B9ACB]
      `}
    >
      {/* BACKGROUND GRID + GLOWS (same family as FAQ / CategoryIntro) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* grid lines */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.14) 1px, transparent 1px),linear-gradient(to bottom, rgba(255,255,255,0.14) 1px, transparent 1px)",
            backgroundSize: "46px 46px",
          }}
        />
        {/* top-left glow */}
        <div
          className="absolute -top-40 left-[-15%] w-[520px] h-[520px] rounded-full blur-3xl"
          style={{ background: "rgba(255,255,255,0.32)" }}
        />
        {/* bottom-right glow */}
        <div
          className="absolute -bottom-40 right-[-10%] w-[460px] h-[460px] rounded-full blur-3xl"
          style={{ background: "rgba(0,0,0,0.25)" }}
        />
      </div>

      <div className={WRAPPER}>
        {/* Header strip */}
        <header className="mb-6 sm:mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-1.5 w-10 rounded-full bg-white/80" />
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">
              Product families
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-4">
            <div>
              {/* heading primary blue on white card theme → yahan white, neeche cards white */}
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.3rem] font-semibold leading-tight tracking-[-0.02em] text-white">
                {heading}
              </h2>
              {/* subtitle light */}
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-blue-50/95 max-w-3xl">
                {subtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs md:text-sm">
              {/* product families pill – white bg, primary text */}
              <span className="inline-flex items-center gap-2 rounded-full bg-white border border-white/60 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[#3B9ACB]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>{items.length} product families</span>
              </span>

              {/* Datasheets pill */}
              <span className="inline-flex items-center gap-2 rounded-full bg-white border border-white/60 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[#3B9ACB]">
                <span className="h-1 w-6 rounded-full bg-[#3B9ACB]/25" />
                <span>Datasheets &amp; quick specs available</span>
              </span>
            </div>
          </div>
        </header>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={listVariants}
        >
          <div className={`grid ${gridCols} gap-4 sm:gap-5 md:gap-6`}>
            {items.map((item, idx) => {
              const slug = item.id ?? normalizeSlug(item.name);
              // try to find a matching product object (some product entries live under src/data/products)
              const productData = PRODUCT_MAP[slug];
              const productSlug = productData?.slug ?? slug;
              const href = categorySlug
                ? `/products/${categorySlug.replace(/^\//, "")}/${productSlug}`
                : `#${productSlug}`;

              return (
                <motion.article
                  key={item.id ?? idx}
                  className="relative"
                  variants={cardVariants}
                >
                  <div
                    className={`
                      group h-full rounded-2xl overflow-hidden ${cardPadding}
                      bg-white
                      border border-slate-200/90
                      shadow-[0_24px_60px_rgba(2,20,38,0.55)]
                      transition-all
                      hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(2,20,38,0.7)]
                    `}
                    role="article"
                  >
                    <div className="flex flex-col h-full">
                      {/* Thumb */}
                      <div className="relative w-full h-32 sm:h-40 md:h-44 rounded-xl overflow-hidden mb-4">
                        <Image
                          src={
                            // prefer a product hero image (if available), else fall back to item.image or fallbackImage
                            productData?.heroImage?.src ?? item.image ?? fallbackImage
                          }
                          alt={
                            productData?.heroImage?.alt ?? item.imageAlt ?? `${item.name} — Techwin`
                          }
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          style={{ objectFit: "cover" }}
                          placeholder="blur"
                          blurDataURL="/techwin-company/blur-placeholder.png"
                        />
                        <div
                          aria-hidden
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.35))",
                          }}
                        />
                        {item.tag && (
                          <div className="absolute left-4 top-4 px-3 py-1 rounded-full bg-white/95 text-[11px] font-semibold text-[#3B9ACB] shadow-lg border border-slate-200">
                            {item.tag}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-900 tracking-[-0.01em]">
                          {item.name}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-slate-600 flex-1">
                          {item.shortDescription}
                        </p>

                        {/* CTAs */}
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          {categorySlug ? (
                            <Link
                              href={href}
                              className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-[#3B9ACB] text-white text-sm font-semibold shadow-md hover:shadow-lg hover:brightness-105 transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B9ACB]/40"
                              aria-label={`View details for ${item.name}`}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden
                                stroke="currentColor"
                                strokeWidth="1.8"
                              >
                                <path
                                  d="M5 12h14M13 5l7 7-7 7"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span>View details</span>
                            </Link>
                          ) : (
                            <button
                              onClick={() => setOpenItem(item)}
                              className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-[#3B9ACB] text-white text-sm font-semibold shadow-md hover:shadow-lg hover:brightness-105 transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B9ACB]/40"
                              aria-label={`View details for ${item.name}`}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden
                                stroke="currentColor"
                                strokeWidth="1.8"
                              >
                                <path
                                  d="M5 12h14M13 5l7 7-7 7"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span>View details</span>
                            </button>
                          )}
                        </div>

                        {/* bottom meta row */}
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                          <span>Family #{idx + 1}</span>
                          <span className="inline-flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            <span>Ready for integration</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>

        {/* Micro footer chips */}

      </div>

      {/* Modal */}
      <AnimatePresence>
        {openItem && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={() => setOpenItem(null)}
          >
            <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />

            <motion.div
              className="relative z-10 max-w-4xl w-full mx-auto bg-white rounded-2xl shadow-[0_32px_80px_rgba(15,23,42,0.6)] overflow-hidden max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.26 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-max">
                {(() => {
                  const openSlug = openItem.id ?? normalizeSlug(openItem.name);
                  const openProduct = PRODUCT_MAP[openSlug];
                  const modalImageSrc = openProduct?.heroImage?.src ?? openItem.image ?? fallbackImage;
                  const modalImageAlt = openProduct?.heroImage?.alt ?? openItem.imageAlt ?? `${openItem.name} — Techwin`;

                  return (
                    <div className="relative h-48 sm:h-56 md:h-auto md:min-h-80">
                      <Image
                        src={modalImageSrc}
                        alt={modalImageAlt}
                        fill
                        style={{ objectFit: "cover" }}
                        placeholder="blur"
                        blurDataURL="/techwin-company/blur-placeholder.png"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0.3), transparent)",
                        }}
                      />
                      {openItem.tag && (
                        <div className="absolute left-5 top-5 px-3 py-1.5 rounded-full bg-white/95 text-[11px] font-semibold text-[#3B9ACB] shadow-lg border border-slate-200">
                          {openItem.tag}
                        </div>
                      )}
                    </div>
                  );
                })()}
                <div className="p-4 sm:p-6 md:p-8 flex flex-col">
                  <h3
                    id="modal-title"
                    className="text-base sm:text-lg md:text-xl font-semibold text-slate-900 tracking-[-0.01em]"
                  >
                    {openItem.name}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-slate-700">
                    {openItem.details ?? openItem.shortDescription}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    {openItem.datasheet ? (
                      <a
                        href={openItem.datasheet}
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-[#3B9ACB] text-white text-sm font-semibold shadow-md hover:brightness-105 transition"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>Download datasheet</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            d="M12 3v12m0 0l-4-4m4 4 4-4M5 19h14"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    ) : (
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-[#3B9ACB] text-white text-sm font-semibold shadow-md hover:brightness-105 transition"
                      >
                        <span>Request configuration</span>
                      </a>
                    )}

                    <button
                      onClick={() => setOpenItem(null)}
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 border border-slate-200 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Close
                    </button>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
                    Ideal for quickly evaluating whether this family matches
                    your wavelength, power and stability requirements before
                    diving into full specifications.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
