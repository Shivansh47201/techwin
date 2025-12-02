"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { safeImageSrc } from "@/lib/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { applications as originalApplications } from "@/data/applications";

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
};

function truncateWords(str: string, numWords: number) {
  if (!str) return "";
  const words = str.split(" ");
  if (words.length > numWords) {
    return words.slice(0, numWords).join(" ") + "...";
  }
  return str;
}

const adaptedApplications: AppCard[] = originalApplications.map((app: any) => {
  const rawIcon = (app.heroImage && (typeof app.heroImage === "string" ? app.heroImage : app.heroImage.src)) || app.image || `/applications/${app.slug}.jpg`;
  const iconSrc = rawIcon;
  return {
    id: app.slug,
    name: app.name || app.title || app.heroTitle || app.slug,
    icon: iconSrc,
    short: truncateWords(app.heading || app.tagline || app.heroIntro || "", 12),
    ctaHref: `/application/${app.slug}`,
  } as AppCard;
});

export default function Applications({
  heading = "Applications & Solutions",
  subheading = "Real-world use cases where Techwin lasers deliver measurable impact",
}: Props) {
  const cards = adaptedApplications;
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
    <section className="w-full bg-linear-to-b from-white via-blue-50/30 to-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-primary/80 uppercase tracking-widest">
              Proven Solutions
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
            {heading}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {subheading}
          </p>
        </div>

        {/* Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 "
        >
          {cards.map((c, idx) => (
            <Link
              key={c.id}
              href={c.ctaHref || `/products?application=${encodeURIComponent(c.id)}`}
              className="block h-full"
            >
              <article
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
                <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                    {c.icon && !imageErrors.has(c.id) ? (
                    <Image
                      src={safeImageSrc(c.icon)}
                      alt={`${c.name} icon`}
                      width={400}
                      height={192}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      priority={false}
                      onError={() => handleImageError(c.id)}
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <div className="text-6xl font-bold text-primary/20">
                        {c.name.charAt(0)}
                      </div>
                    </div>
                  )}
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Section */}
                <div className="relative p-6 flex flex-col h-full">
                  {/* Title and Badge */}
                  <div className="mb-3">
                    <h3
                      id={`app-${c.id}-title`}
                      className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors"
                    >
                      {c.name}
                    </h3>
                  </div>

                  {/* Short Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 grow">
                    {c.short}
                  </p>

                  {/* Categories */}
                  {c.categories && c.categories.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {c.categories.slice(0, 2).map((cat) => (
                        <span
                          key={cat.slug}
                          className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium"
                        >
                          {cat.title}
                        </span>
                      ))}
                      {c.categories.length > 2 && (
                        <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                          +{c.categories.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                  
                  {/* View More button (anchored to card bottom) */}
                  <div className="mt-auto z-10">
                    <span className="inline-block rounded-full bg-primary text-white text-sm px-4 py-2 font-medium shadow-sm">
                      View More
                    </span>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-1 h-12 bg-linear-to-b from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </article>
            </Link>
          ))}
        </div>

  
      </div>

      <style>{`\n        @keyframes slideUp {\n          from {\n            opacity: 0;\n            transform: translateY(20px);\n          }\n          to {\n            opacity: 1;\n            transform: translateY(0);\n          }\n        }\n\n        [data-app-card].app-card--visible {\n          animation: slideUp 0.6s ease-out forwards;\n        }\n      `}</style>
    </section>
  );
}

