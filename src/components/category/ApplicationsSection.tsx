// src/components/category/ApplicationsSection.tsx
"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Cpu,
  Radar,
  Scan,
  Microscope,
  Atom,
  Satellite,
  Waves,
  Activity,
  Aperture,
  Cog,
} from "lucide-react";

export type Hero = {
  title?: string;
  tagline?: string;
  image?: string;
  imageAlt?: string;
};

type Props = {
  hero?: Hero;
  applications: string[];
  headingLevel?: string;
};

const iconMap: Record<string, any> = {
  lidar: Radar,
  lidar_systems: Radar,
  remote_sensing: Satellite,
  spectroscopy: Microscope,
  metrology: Activity,
  oct: Scan,
  "optical coherence tomography": Scan,
  "fiber sensing": Waves,
  sensing: Waves,
  quantum: Atom,
  atomic: Atom,
  imaging: Aperture,
  industrial: Cog,
  processing: Cog,
};

function getIconFor(name: string) {
  const key = name.toLowerCase().replace(/\s+/g, "_");
  const Icon = iconMap[key] || Cpu;
  return <Icon className="w-7 h-7 text-[#3B9ACB]" strokeWidth={1.6} />;
}

/* motion variants */
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function ApplicationsSection({ hero, applications, headingLevel = "h2" }: Props) {
  const tagline =
    hero?.tagline ??
    "Explore where our advanced laser technologies make a real impact across scientific, industrial, and communication fields.";

  return (
    <section
      aria-labelledby="applications-heading"
      className="
        relative
        w-screen left-1/2 -translate-x-1/2
        overflow-hidden
        py-16 md:py-20
        bg-[#3B9ACB]
      "
    >
      {/* BACKGROUND GRID + GLOWS (same visual family as FAQ/SubCategory) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* grid lines */}
        <div
          className="absolute inset-0 opacity-55"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.14) 1px, transparent 1px),linear-gradient(to bottom, rgba(255,255,255,0.14) 1px, transparent 1px)",
            backgroundSize: "46px 46px",
          }}
        />
        {/* top-left glow */}
        <div
          className="absolute -left-40 -top-10 rounded-full"
          style={{
            width: 420,
            height: 420,
            background: "rgba(255,255,255,0.45)",
            filter: "blur(130px)",
          }}
        />
        {/* bottom-right glow */}
        <div
          className="absolute -right-40 top-24 rounded-full"
          style={{
            width: 380,
            height: 380,
            background: "rgba(0,0,0,0.28)",
            filter: "blur(140px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* TITLE */}
        <div className="flex flex-col items-center text-center mb-10">
          {/* white pill with primary text */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center rounded-full px-7 py-3 bg-white shadow-[0_12px_35px_rgba(0,0,0,0.22)]"
          >
            {React.createElement(
              headingLevel,
              {
                id: "applications-heading",
                className: "text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight text-[#3B9ACB]"
              },
              "Applications"
            )}
          </motion.div>

          <p className="mt-6 max-w-3xl text-center text-sm md:text-base leading-relaxed text-white">
            {tagline}
          </p>
        </div>

        {/* GRID */}
        <div className="mx-auto" style={{ transform: "translateY(-10px)" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="w-full"
          >
            <div
              className="
                grid
                grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                gap-6 md:gap-7 lg:gap-8
                px-1 md:px-0
                items-stretch
              "
            >
              {applications.map((app, idx) => (
                <motion.button
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ translateY: -10, scale: 1.02 }}
                  whileTap={{ scale: 0.985 }}
                  className="
                    group
                    relative
                    bg-white
                    rounded-2xl
                    border border-[#3B9ACB26]
                    p-6 md:p-7
                    flex flex-col items-center gap-4
                    shadow-[0_18px_45px_rgba(0,0,0,0.20)]
                    hover:shadow-[0_24px_60px_rgba(0,0,0,0.28)]
                    transition-all duration-300
                    cursor-pointer
                    min-h-[220px]
                    overflow-hidden
                  "
                  aria-label={app}
                >
                  {/* subtle primary halo behind icon */}
                  <div
                    aria-hidden
                    className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-[#3B9ACB1A] blur-2xl"
                  />

                  {/* floating icon tile */}
                  <motion.div
                    className="
                      relative z-10
                      w-16 h-16 rounded-xl flex items-center justify-center
                      bg-white
                      border border-[#3B9ACB33]
                      shadow-[0_10px_25px_rgba(59,154,203,0.40)]
                      shrink-0
                    "
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
                  >
                    {getIconFor(app)}
                  </motion.div>

                  <div className="relative z-10 text-center px-2 flex-1 flex items-center">
                    <span
                      className="text-sm md:text-base font-medium leading-snug text-black"
                      style={{ maxWidth: 200, wordBreak: "break-word" }}
                    >
                      {app}
                    </span>
                  </div>

                  {/* bottom glow bar */}
                  <div
                    aria-hidden
                    className="
                      absolute bottom-4 left-1/2 -translate-x-1/2
                      w-28 h-1.5 rounded-full
                      opacity-0 group-hover:opacity-100
                    "
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(59,154,203,0.1), rgba(59,154,203,0.9), rgba(59,154,203,0.1))",
                      transition: "opacity 220ms",
                    }}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
