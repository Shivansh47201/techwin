// src/components/application/listing/ApplicationCard.tsx
"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

export type ApplicationSummary = {
  name: string;
  slug: string;
  heading: string; // short description or heroTitle
  keywords?: string[];
};

type ApplicationCardProps = {
  app: ApplicationSummary;
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const ApplicationCard: React.FC<ApplicationCardProps> = ({ app }) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ translateY: -10, scale: 1.02 }}
      whileTap={{ scale: 0.985 }}
      className="group"
    >
      <Link
        href={`/application/${app.slug}`}
        className="flex h-full flex-col rounded-2xl bg-white/95 text-left border border-[#3B9ACB26] shadow-[0_18px_45px_rgba(15,23,42,0.32)] hover:shadow-[0_22px_60px_rgba(15,23,42,0.45)] transition-shadow duration-300 overflow-hidden"
      >
        {/* Top accent strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#3B9ACB] via-sky-400 to-emerald-300" />

        <div className="flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-4.5">
          {/* Tiny label chip */}
          <div className="inline-flex items-center gap-1 rounded-full bg-[#3B9ACB0D] px-2 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3B9ACB]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3B9ACB]">
              Application
            </span>
          </div>

          <h3 className="mt-3 text-sm md:text-[15px] font-semibold text-slate-900 group-hover:text-[#3B9ACB] transition-colors">
            {app.name}
          </h3>

          <p className="mt-2 text-xs md:text-[13px] text-slate-600 leading-relaxed line-clamp-3">
            {app.heading}
          </p>

          {app.keywords && app.keywords.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {app.keywords.slice(0, 3).map((kw) => (
                <span
                  key={kw}
                  className="rounded-full border border-[#3B9ACB1F] bg-[#3B9ACB0A] px-2 py-0.5 text-[10px] font-medium text-[#3B9ACB]"
                >
                  {kw}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              <span>View details</span>
            </span>
            <span className="translate-x-0 transform text-[#3B9ACB] group-hover:translate-x-0.5 transition-transform">
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ApplicationCard;
