// src/components/application/listing/ApplicationsHero.tsx
"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Button from "@/components/common/Button";
import { Atom, Radar, ScanLine } from "lucide-react";

type HeroProps = {
  title?: string;
  tagline?: string;
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const floatVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-4, 4, -4],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const ApplicationsHero: React.FC<HeroProps> = ({ title, tagline }) => {
  const heroTitle =
    title ?? "Where Single-Frequency Fiber Lasers Create Real-World Impact";
  const heroTagline =
    tagline ??
    "Explore how our ultra-stable fiber lasers power LiDAR, quantum technology, sensing, spectroscopy, satellite links and more.";

  return (
    <section className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden bg-[#3B9ACB] text-white mt-16 md:mt-20">
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.16) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
        }}
      />

      {/* Radial glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-80 w-80 rounded-full bg-white/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-sky-900/60 blur-3xl" />

      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-[#3B9ACB]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pt-14 pb-16 md:pt-20 md:pb-20 lg:pt-20 lg:pb-24">
        <motion.div
          className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left: text */}
          <div>
            {/* tiny breadcrumb / label */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.22em] uppercase"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              <span>Applications</span>
              <span className="text-white/70">
                LiDAR • Quantum • Sensing • Spectroscopy
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mt-4 text-[2rem] leading-tight md:text-[2.5rem] lg:text-[2.8rem] font-semibold"
            >
              {heroTitle}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-4 text-sm md:text-base text-slate-100/90 max-w-2xl leading-relaxed"
            >
              {heroTagline}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <Link href="/contact">
                <Button
                  variant="secondary"
                  className="px-5 py-2.5 text-sm md:text-[0.95rem] bg-white text-[#3B9ACB] border-white hover:bg-white/95"
                >
                  Talk to our expert
                </Button>
              </Link>

              <Button
                as="a"
                href="#applications-grid"
                variant="secondary"
                className="text-sm md:text-[0.95rem] bg-white text-[#3B9ACB] border-white hover:bg-white/95"
              >
                Browse all applications
              </Button>
            </motion.div>

            {/* mini stats row */}
            <motion.div
              variants={itemVariants}
              className="mt-7 grid gap-4 sm:grid-cols-3 text-[11px] md:text-[13px]"
            >
              <div className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                <div>
                  <p className="font-semibold text-white">
                    Ultra-narrow linewidth
                  </p>
                  <p className="mt-1 text-slate-100/80">
                    Single-frequency performance optimized for metrology, sensing and
                    quantum optics.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                <div>
                  <p className="font-semibold text-white">
                    Application-engineered platforms
                  </p>
                  <p className="mt-1 text-slate-100/80">
                    Tuned for LiDAR, OCT, spectroscopy, satellite links and more.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-200" />
                <div>
                  <p className="font-semibold text-white">Lab to field ready</p>
                  <p className="mt-1 text-slate-100/80">
                    From research benches to rugged industrial & aerospace platforms.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: floating application tiles */}
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md">
              {/* Outer glow ring */}
              <div className="pointer-events-none absolute -inset-6 rounded-[2.2rem] border border-white/25 bg-gradient-to-b from-white/10 to-transparent blur-[2px]" />

              {/* Glow card background */}
              <div className="absolute inset-0 rounded-3xl bg-white/7 backdrop-blur-[3px] border border-white/25" />

              <div className="relative grid gap-4 p-4 sm:p-5">
                <motion.div
                  variants={floatVariants}
                  initial="initial"
                  animate="animate"
                  className="flex items-center gap-3 rounded-2xl bg-white text-slate-900 px-4 py-3 shadow-[0_20px_45px_rgba(15,23,42,0.45)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#3B9ACB]/10 border border-[#3B9ACB33]">
                    <Radar className="h-5 w-5 text-[#3B9ACB]" strokeWidth={1.7} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 tracking-wide">
                      LiDAR & Remote Sensing
                    </p>
                    <p className="text-[11px] text-slate-600">
                      Long-range coherent ranging, wind profiling and 3D mapping.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={floatVariants}
                  initial="initial"
                  animate="animate"
                  className="ml-6 flex items-center gap-3 rounded-2xl bg-slate-950 text-slate-50 px-4 py-3 shadow-[0_18px_40px_rgba(15,23,42,0.9)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#3B9ACB]/20 border border-[#3B9ACB66]">
                    <Atom className="h-5 w-5 text-[#3B9ACB]" strokeWidth={1.7} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wide">
                      Quantum & Cold Atom
                    </p>
                    <p className="text-[11px] text-slate-200">
                      Narrow-linewidth sources for quantum optics, clocks and sensing.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={floatVariants}
                  initial="initial"
                  animate="animate"
                  className="mr-4 flex items-center gap-3 rounded-2xl bg-white text-slate-900 px-4 py-3 shadow-[0_16px_36px_rgba(15,23,42,0.4)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#3B9ACB]/10 border border-[#3B9ACB33]">
                    <ScanLine className="h-5 w-5 text-[#3B9ACB]" strokeWidth={1.7} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wide">
                      Sensing & Spectroscopy
                    </p>
                    <p className="text-[11px] text-slate-600">
                      Low-noise fiber sources for distributed sensing & spectral
                      analytics.
                    </p>
                  </div>
                </motion.div>

                <div className="mt-1 flex flex-col gap-1 text-[11px] text-white sm:flex-row sm:items-center sm:justify-between">
                  <span>10+ defined application domains</span>
                  <span className="hidden sm:block h-[1px] flex-1 mx-3 bg-gradient-to-r from-white/40 to-transparent" />
                  <span>Single-frequency fiber laser platform</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* White wave bottom to blend into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-white" />
    </section>
  );
};

export default ApplicationsHero;
