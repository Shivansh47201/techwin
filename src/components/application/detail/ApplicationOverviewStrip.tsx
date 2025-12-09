"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export type MiniStat = {
  id?: string;
  icon?: string;
  label: string;
  value?: string;
  hint?: string;
};

type OverviewStripProps = {
  stats?: MiniStat[];
  ctaLabel?: string;
  ctaHref?: string;
  badge?: string;
  background?: "blue" | "white";
  image?: { src: string; alt?: string; width?: number; height?: number } | null;
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 0.86, 0.39, 0.96] } },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.6, ease: [0.23, 0.86, 0.39, 0.96] } },
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
      className="relative mx-auto max-w-7xl px-6 md:px-8 lg:px-12 -mt-10 md:-mt-16 z-20"
      aria-label="Application summary strip"
    >
      <div
        className={`relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-10 lg:gap-12 rounded-3xl p-8 md:p-10 lg:p-12 transform-gpu transition-all duration-500 ${
          isBlue
            ? "bg-white/10 backdrop-blur-2xl border border-white/25 shadow-2xl text-white hover:bg-white/15"
            : "bg-linear-to-br from-white via-gray-50 to-white border border-gray-100 text-gray-900 shadow-2xl hover:shadow-3xl"
        }`}
        role="region"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div className={`absolute top-0 right-0 w-40 h-40 ${isBlue ? 'bg-white/5' : 'bg-blue-100/30'} rounded-full blur-3xl`} />
          <div className={`absolute bottom-0 left-0 w-32 h-32 ${isBlue ? 'bg-white/5' : 'bg-blue-50/50'} rounded-full blur-3xl`} />
        </div>

        {/* Left badge / image */}
        <motion.div variants={badgeVariants} className="shrink-0">
          {image ? (
            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden bg-white/30 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <Image 
                src={image.src} 
                alt={image.alt || "overview"} 
                fill 
                sizes="120px" 
                style={{ objectFit: "cover" }} 
                priority 
              />
              <div className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-white/50 transition-all duration-300" />
            </div>
          ) : (
            <motion.div
              className={`flex items-center justify-center w-24 h-24 md:w-28 md:h-28 rounded-2xl border-2 backdrop-blur-sm transition-all duration-300 ${
                isBlue 
                  ? "bg-white/15 border-white/30 text-white hover:bg-white/25" 
                  : "bg-[#3B9ACB]/15 border-[#3B9ACB]/30 text-[#3B9ACB] hover:bg-[#3B9ACB]/25"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-xs font-bold text-center leading-tight px-3">{badge ?? "Application"}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Center stats */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-center w-full md:w-auto">
          {stats.length > 0 &&
            stats.map((s, i) => (
              <motion.div
                key={s.id || `${s.label}-${i}`}
                variants={item}
                className="group"
              >
                <div className="flex items-start gap-4 p-4 rounded-xl transition-all duration-300 group-hover:bg-white/5">
                  <div
                    className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                      isBlue 
                        ? "bg-white/20 text-white group-hover:bg-white/30 shadow-lg" 
                        : "bg-blue-100 text-[#3B9ACB] group-hover:bg-blue-200 shadow-md"
                    }`}
                    aria-hidden
                  >
                    {s.icon ? (
                      <span className="text-xl" dangerouslySetInnerHTML={{ __html: s.icon }} />
                    ) : (
                      <Sparkles className="w-5 h-5" />
                    )}
                  </div>

                  <div className="leading-tight flex-1">
                    <div className={`text-lg md:text-xl font-bold leading-tight mb-1 ${isBlue ? "text-white" : "text-gray-900"}`}>
                      {s.value ?? s.label}
                    </div>
                    {s.hint && <div className={`text-xs md:text-sm ${isBlue ? "text-white/70" : "text-gray-600"}`}>{s.hint}</div>}
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Right CTA */}
        <motion.div variants={item} className="shrink-0 w-full sm:w-auto">
          <a
            href={ctaHref}
            className={`inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg transition-all duration-300 group hover:gap-3 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isBlue
                ? "bg-white text-[#3B9ACB] shadow-2xl hover:shadow-3xl hover:scale-105 focus:ring-white"
                : "bg-[#3B9ACB] text-white shadow-lg hover:shadow-xl hover:scale-105 hover:brightness-110 focus:ring-blue-500"
            }`}
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* Decorative bottom glow */}
      <div
        aria-hidden
        className={`absolute left-1/2 transform -translate-x-1/2 w-[80%] max-w-xl h-16 -bottom-8 rounded-full blur-3xl opacity-60 pointer-events-none ${
          isBlue ? "bg-white/20" : "bg-blue-300/20"
        }`}
      />
    </motion.section>
  );
}
