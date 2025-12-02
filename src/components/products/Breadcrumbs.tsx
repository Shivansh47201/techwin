// src/components/products/Breadcrumbs.tsx
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export type Crumb = {
  label: string;
  href?: string;
};

export type BreadcrumbsProps = {
  items: Crumb[];
  className?: string;
};

const PRIMARY = "#3B9ACB";

export default function Breadcrumbs({ items = [], className = "" }: BreadcrumbsProps) {
  if (!items.length) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`w-full py-3 ${className}`}
    >
      <motion.ol
        className="flex flex-wrap items-center gap-1 text-sm"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li key={idx} className="flex items-center gap-1">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="font-medium"
                  style={{ color: PRIMARY }}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="font-semibold"
                  style={{ color: PRIMARY }}
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <ChevronRight
                  size={16}
                  style={{ color: PRIMARY, opacity: 0.6 }}
                />
              )}
            </li>
          );
        })}
      </motion.ol>
    </nav>
  );
}
