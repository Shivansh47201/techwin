// src/components/products/ProductDetailHero.tsx
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";

export type Crumb = {
  label: string;
  href?: string;
};

export type HeroProps = {
  title?: string;
  description?: string;
  image?: string | { src: string; alt?: string };
  ctas?: { label: string; href: string }[];
  breadcrumbs?: Crumb[];
};

const ProductDetailHero: React.FC<HeroProps> = ({
  title = "Ultra-Narrow Linewidth Single-Frequency Fiber Laser",
  description = "Precision optics for long-distance sensing, coherent detection and quantum experiments.",
  image,
  ctas = [],
  breadcrumbs = [],
}) => {
  // Normalize image path
  const imageData = React.useMemo(() => {
    if (!image) return null;
    return typeof image === "string" ? { src: image, alt: "" } : image;
  }, [image]);

  const imageSrc = imageData?.src || "";

  return (
    <>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div
          className="w-full bg-white border-b border-slate-100 relative z-20"
          style={{ paddingTop: "var(--site-header-height, 72px)" }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-8 py-10 md:py-10">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-sm"
            >
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <div key={idx} className="flex items-center gap-2">
                    {crumb.href && !isLast ? (
                      <Link
                        href={crumb.href}
                        className="text-slate-600 hover:text-[#3B9ACB] transition-colors"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span
                        className="font-semibold"
                        style={{ color: isLast ? "#3B9ACB" : "#6b7280" }}
                      >
                        {crumb.label}
                      </span>
                    )}
                    {!isLast && (
                      <ChevronRight size={16} className="text-slate-400" />
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative w-full bg-white overflow-hidden">
        <div className="py-10 md:py-10">
          <div className="max-w-7xl mx-auto px-6 md:px-8 py-10 md:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* LEFT: Text Content */}
              <div className="space-y-8">
                <h1
                  className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight"
                  style={{ color: "#3B9ACB" }}
                >
                  {title}
                </h1>

                <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-2xl">
                  {description}
                </p>

                {ctas.length > 0 && (
                  <div className="flex flex-wrap gap-4 pt-6">
                    {ctas.map((cta, idx) => (
                      <Link
                        key={idx}
                        href={cta.href}
                        className={`inline-flex items-center gap-2 px-7 py-3 rounded-lg font-semibold transition-all duration-300 ${
                          idx === 0
                            ? "bg-[#3B9ACB] text-white shadow-md hover:shadow-lg hover:bg-[#2a8bc2]"
                            : "bg-white text-[#3B9ACB] border-2 border-[#3B9ACB] hover:bg-slate-50"
                        }`}
                      >
                        {cta.label}
                        <ArrowRight size={18} />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT: Image */}
              {imageSrc && (
                <div className="flex items-center justify-center">
                  <div className="relative w-full max-w-md">
                    <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg border border-slate-200 mt-10">
                      {imageSrc && (
                        <div className="flex items-center justify-center mt-8 lg:mt-0">
                          <div className="relative w-full max-w-[533px]">
                            {/* Perfect fixed height similar to 533×548 */}
                            <div className="relative w-full h-[380px] md:h-[560px] rounded-2xl overflow-hidden bg-white shadow-lg border border-slate-200">
                              <Image
                                src={imageSrc}
                                alt={imageData?.alt || "Product image"}
                                fill
                                className="object-cover" // keeps ratio, no stretch
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailHero;
