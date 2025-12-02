// src/components/common/Breadcrumbs.tsx
"use client";

import React from "react";
import Link from "next/link";

export type BreadcrumbItem = { label: string; href?: string };

type Props = {
  items: BreadcrumbItem[];
  className?: string;
  showSchema?: boolean;
};

export default function Breadcrumbs({ items, className = "", showSchema = false }: Props) {
  if (!items || items.length === 0) return null;

  const jsonLd = showSchema
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.label,
          item: it.href ?? undefined,
        })),
      }
    : null;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}

      <ol className="flex items-center gap-2 text-sm text-slate-600">
        {items.map((it, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="inline-flex items-center">
              {!isLast && it.href ? (
                <Link href={it.href} className="hover:underline text-slate-600">
                  {it.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={isLast ? "text-slate-900 font-medium" : ""}>
                  {it.label}
                </span>
              )}

              {!isLast && <span className="mx-2 text-slate-300" aria-hidden>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
