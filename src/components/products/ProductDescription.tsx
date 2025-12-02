"use client";

import React, { useRef, useMemo } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { ProductSection } from "@/types/categories";
import ProductComparisonTable from "./ProductComparisonTable";

type ProductDescriptionProps = {
  sections?: ProductSection[];
  accent?: string;
  previewImageSrc?: string | { src: string; alt?: string };
};

const DEFAULT_SECTIONS: ProductSection[] = [];

export default function ProductDescription({
  sections = DEFAULT_SECTIONS,
  accent = "#3B9ACB",
  previewImageSrc: propPreviewImageSrc,
}: ProductDescriptionProps) {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);

  // Normalize incoming sections into an array we can operate on
  const allSections = Array.isArray(sections) ? sections : [];

  // Helper: determine whether this section actually has displayable content
  const hasRenderableContent = (item?: ProductSection) => {
    if (!item) return false;

    const hasHeading = typeof item.heading === "string" && item.heading.trim().length > 0;
    const hasText = typeof item.content === "string" && item.content.trim().length > 0;
    const hasBullets = Array.isArray(item.bullets) && item.bullets.length > 0;

    // For specs: require specGroups with rows
    if ((item.type || "").toLowerCase() === "specs") {
      if (Array.isArray(item.specGroups) && item.specGroups.length > 0) {
        // require at least one group with rows
        return item.specGroups.some((g: any) => Array.isArray(g.rows) && g.rows.length > 0);
      }
      return false;
    }

    // For comparison: require some comparison data (rows or columns)
    if ((item.type || "").toLowerCase() === "comparison") {
      // accept either item.rows or item.columns or item.data (common shapes)
      if (Array.isArray((item as any).rows) && (item as any).rows.length > 0) return true;
      if (Array.isArray((item as any).columns) && (item as any).columns.length > 0) return true;
      if (Array.isArray((item as any).data) && (item as any).data.length > 0) return true;
      return false;
    }

    // For other types (text/features/etc), require heading+content or bullets or content
    return hasText || hasBullets || hasHeading;
  };

  // Build a list of visible sections only — this ensures headings without content are dropped
  const visibleSections = useMemo(() => allSections.filter(hasRenderableContent), [allSections]);

  // Scroll tracking: use visibleSections length
  const sectionCount = visibleSections.length;
  const denom = Math.max(1, sectionCount - 1);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (sectionCount === 0) {
      setActiveCard(0);
      return;
    }

    // Breakpoints for only visible sections
    const breakpoints = visibleSections.map((_, i) => i / denom);

    const closestIndex = breakpoints.reduce((acc, bp, i) => {
      const prevDistance = Math.abs(latest - breakpoints[acc]);
      const currentDistance = Math.abs(latest - bp);
      return currentDistance < prevDistance ? i : acc;
    }, 0);

    const idx = Math.max(0, Math.min(closestIndex, visibleSections.length - 1));
    setActiveCard(idx);
  });

  // Image selection: prefer provided previewImageSrc prop, else try to pick an image from the first visible section,
  // else fallback image
  const FALLBACK_IMAGE = "/techwin-logo.png";

  const { finalPreviewSrc, finalPreviewAlt } = useMemo(() => {
    let src: string | undefined;
    let alt = "Product Preview";

    if (propPreviewImageSrc) {
      if (typeof propPreviewImageSrc === "string") src = propPreviewImageSrc;
      else {
        src = propPreviewImageSrc.src;
        alt = propPreviewImageSrc.alt ?? alt;
      }
    } else {
      // search visibleSections for an image field (common names: image, previewImage, image.src)
      for (let i = 0; i < visibleSections.length; i++) {
        const it: any = visibleSections[i];
        if (!it) continue;
        if (typeof it.image === "string") {
          src = it.image;
          alt = it.imageAlt ?? alt;
          break;
        }
        if (it.image && typeof it.image.src === "string") {
          src = it.image.src;
          alt = it.image.alt ?? alt;
          break;
        }
        if (typeof it.previewImage === "string") {
          src = it.previewImage;
          alt = it.previewAlt ?? alt;
          break;
        }
        if (it.previewImage && typeof it.previewImage.src === "string") {
          src = it.previewImage.src;
          alt = it.previewImage.alt ?? alt;
          break;
        }
      }
    }

    return { finalPreviewSrc: src ?? FALLBACK_IMAGE, finalPreviewAlt: alt };
  }, [propPreviewImageSrc, visibleSections]);

  // stable text styles (no dimming)
  const headingClass = "text-3xl font-bold";
  const bodyClass = "text-lg text-black leading-relaxed";
  const bulletClass = "text-black font-medium";

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#3B9ACB] tracking-tight">Product Deep Dive</h2>
          <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto">
            Discover the innovative engineering and superior performance that define our laser systems.
          </p>
        </div>

        <div ref={ref} className="relative">
          <div className="relative flex flex-col md:flex-row md:space-x-12 rounded-3xl border border-gray-200 bg-white p-6 md:p-12 shadow-xl">
            {/* Left: sections (render only visibleSections) */}
            <div className="md:w-1/2 py-4">
              {visibleSections.length === 0 ? (
                <div className="py-12">
                  <p className={bodyClass}>No detailed content available for this product.</p>
                </div>
              ) : (
                visibleSections.map((item, idx) => {
                  // render each visible section
                  return (
                    <div key={`${item.heading ?? "section"}-${idx}`} className="my-16 first:mt-0 last:mb-0">
                      {/* Comparison */}
                      {((item.type || "").toLowerCase() === "comparison") && (
                        <ProductComparisonTable section={item as any} />
                      )}

                      {/* Specs */}
                      {((item.type || "").toLowerCase() === "specs") && item.specGroups && (
                        <div>
                          {item.heading && <h3 className={headingClass} style={{ color: accent }}>{item.heading}</h3>}
                          {item.specGroups.map((group: any, gIdx: number) => (
                            <div key={gIdx} className="mt-6">
                              {group.label && <h4 className="font-semibold text-lg text-black mb-3">{group.label}</h4>}
                              <div className="grid grid-cols-2 gap-y-2 text-sm">
                                {Array.isArray(group.rows) && group.rows.map((row: any, rIdx: number) => (
                                  <React.Fragment key={rIdx}>
                                    <div className="text-gray-600">{row.name}</div>
                                    <div className="text-black">{row.value}</div>
                                  </React.Fragment>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Generic text/features */}
                      {(!item.type || ["text", "features"].includes((item.type || "").toLowerCase())) && (
                        <div>
                          {item.heading && <h3 className={headingClass} style={{ color: accent }}>{item.heading}</h3>}
                          {item.content && <p className={`${bodyClass} mt-5`}>{item.content}</p>}

                          {Array.isArray(item.bullets) && item.bullets.length > 0 && (
                            <ul className="mt-6 space-y-3">
                              {item.bullets.map((b: string, i: number) => (
                                <li key={i} className="flex items-start">
                                  <span
                                    className="mt-1 inline-block w-2.5 h-2.5 rounded-full mr-3"
                                    style={{ backgroundColor: accent, boxShadow: `0 0 10px ${accent}77` }}
                                  />
                                  <span className={bulletClass}>{b}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Right: static preview image */}
            <div className="hidden md:block md:w-1/2 sticky top-24 h-[520px]">
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
                <Image
                  src={encodeURI(finalPreviewSrc)}
                  alt={finalPreviewAlt}
                  fill
                  sizes="70vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
