"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

export type MiniStat = {
  id?: string;
  icon?: string; // optional inline SVG path or emoji
  label: string;
  value?: string;
  hint?: string;
};

type OverviewStripProps = {
  stats?: MiniStat[]; // typically 3 items
  ctaLabel?: string;
  ctaHref?: string;
  badge?: string; // small left badge like "Application"
  background?: "blue" | "white";
  image?: { src: string; alt?: string; width?: number; height?: number } | null;
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.36, ease: [0.2, 0.8, 0.2, 1] } },
};

export default function ApplicationOverviewStrip({
  stats = [],
  ctaLabel = "Talk to expert",
  ctaHref = "#",
  badge,
  background = "blue",
  image,
}: OverviewStripProps) {
  const isBlue = background === "blue";

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={container}
      className="relative mx-auto max-w-7xl px-6 md:px-8 lg:px-12 -mt-8 md:-mt-12"
      aria-label="Application summary strip"
    >
      <div
        className={`relative z-10 flex items-center gap-8 rounded-3xl p-8 transform-gpu ${
          isBlue
            ? "bg-black/5 backdrop-blur-xl border border-white/20 shadow-2xl text-[#3B9ACB]"
            : "bg-white border border-gray-100 text-[#3B9ACB] shadow-lg"
        }`}
        role="region"
      >
        {/* left badge / image */}
        <motion.div variants={item} className="flex-shrink-0 hidden md:block">
          {image ? (
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-white/30 border border-white/50 shadow-md">
              <Image src={image.src} alt={image.alt || "overview"} fill sizes="80px" style={{ objectFit: "cover" }} priority />
            </div>
          ) : (
            <div
              className={`flex items-center justify-center w-20 h-20 rounded-2xl ${
                isBlue ? "bg-white/40" : "bg-gray-50"
              } border ${isBlue ? "border-white/50" : "border-gray-100"} shadow-sm`}
            >
              <span className="text-sm opacity-95 font-semibold text-[#3B9ACB] text-center leading-tight">{badge ?? "Application"}</span>
            </div>
          )}
        </motion.div>

        {/* stats */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
          {stats.length > 0 &&
            stats.map((s, i) => (
              <motion.div
                key={s.id || `${s.label}-${i}`}
                variants={item}
                className="flex items-center gap-4"
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                    isBlue ? "bg-white/50 text-[#3B9ACB]" : "bg-white text-[#0f172a]"
                  } border ${isBlue ? "border-white/50" : "border-gray-200"} shadow-sm`}
                  aria-hidden
                >
                  {s.icon ? (
                    <span className="text-xl" dangerouslySetInnerHTML={{ __html: s.icon }} />
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <circle cx="6" cy="6" r="5" fill={"currentColor"} opacity="0.5"/>
                    </svg>
                  )}
                </div>

                <div className="leading-tight">
                  <div className={`text-lg md:text-xl font-bold ${isBlue ? "text-[#3B9ACB]" : "text-[--primary]"}`}>{s.value ?? s.label}</div>
                  {s.hint && <div className={`text-sm ${isBlue ? "text-sky-700" : "text-gray-500"}`}>{s.hint}</div>}
                </div>
              </motion.div>
            ))}
        </div>

        {/* CTA */}
        <motion.div variants={item} className="flex-shrink-0 hidden lg:block">
          <a
            href={ctaHref}
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-full font-bold text-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isBlue
                ? "bg-white text-[#3B9ACB] shadow-lg"
                : "bg-[--primary] text-white hover:brightness-110 shadow-lg"
            }`}
          >
            <span>{ctaLabel}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* decorative bottom glow */}
      <div
        aria-hidden
        className={`absolute left-1/2 transform -translate-x-1/2 w-[60%] h-12 -bottom-8 rounded-full blur-3xl opacity-50 pointer-events-none ${
          isBlue ? "bg-cyan-300/10" : "bg-blue-500/10"
        }`}
      />

      <style jsx>{`
        :root { --primary: #3b9acb; }
      `}</style>
    </motion.section>
  );
}
