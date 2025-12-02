// src/app/Applications.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { safeImageSrc } from "@/lib/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type AppCard = {
  id: string;
  name: string;
  icon?: string;
  short: string;
  long?: string;
  categories?: { slug: string; title: string }[];
  ctaHref?: string;
};

type Props = {
  heading?: string;
  subheading?: string;
  cards: AppCard[];
};

export default function Applications({
  heading = "Applications & Solutions",
  subheading = "Real-world use cases where Techwin lasers deliver measurable impact",
  cards,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const items = Array.from(node.querySelectorAll<HTMLElement>("[data-app-card]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add("app-card--visible");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.16 }
    );
    items.forEach((it) => io.observe(it));
    return () => io.disconnect();
  }, []);

  const handleImageError = (id: string) => {
    setImageErrors((prev) => new Set(prev).add(id));
  };

  return (
    <section className="w-full bg-linear-to-b from-white via-blue-50/30 to-white py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs sm:text-sm font-semibold text-primary/80 uppercase tracking-widest">
              Proven Solutions
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-4">
            {heading}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            {subheading}
          </p>
        </div>

        {/* Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 "
        >
          {cards.map((c, idx) => (
            <article
              key={c.id}
              data-app-card
              aria-labelledby={`app-${c.id}-title`}
              className="app-card group relative h-full rounded-2xl bg-white border border-gray-200 cursor-pointer overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              style={{ transitionDelay: `${idx * 60}ms` }}
              onMouseEnter={() => setHoveredId(c.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Decorative gradient background */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Image Section */}
              <div className="relative h-44 sm:h-48 w-full bg-gray-100 overflow-hidden">
                  {c.icon && !imageErrors.has(c.id) ? (
                  <Image
                    src={safeImageSrc(c.icon)}
                    alt={`${c.name} icon`}
                    width={400}
                    height={192}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    className="group-hover:scale-110 transition-transform duration-500"
                    priority={false}
                    onError={() => handleImageError(c.id)}
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <div className="text-5xl sm:text-6xl font-bold text-primary/20">
                      {c.name.charAt(0)}
                    </div>
                  </div>
                )}
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content Section */}
              <div className="relative p-5 sm:p-6 flex flex-col flex-grow">
                {/* Title and Badge */}
                <div className="mb-3">
                  <h3
                    id={`app-${c.id}-title`}
                    className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors"
                  >
                    {c.name}
                  </h3>
                </div>

                {/* Short Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                  {c.short}
                </p>

                {/* Categories */}
                {c.categories && c.categories.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {c.categories.slice(0, 2).map((cat) => (
                      <span
                        key={cat.slug}
                        className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium"
                      >
                        {cat.title}
                      </span>
                    ))}
                    {c.categories.length > 2 && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                        +{c.categories.length - 2}
                      </span>
                    )}
                  </div>
                )}

                {/* CTA Button */}
                <Link
                  href={c.ctaHref || `/products?application=${encodeURIComponent(c.id)}`}
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 sm:py-3 rounded-lg bg-linear-to-r from-primary to-primary/80 text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:from-primary hover:to-primary transform transition-all duration-300 group/btn"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-1 h-12 bg-linear-to-b from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </article>
          ))}
        </div>

  
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        [data-app-card].app-card--visible {
          animation: slideUp 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
