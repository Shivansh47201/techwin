'use client';

import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ExpertiseAndProducts() {
  return (
    <section className="relative py-24 overflow-hidden bg-white text-[#08263b]">
      
      {/* 🔵 Blue Glow Background Accent */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#3087C0]/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-20">

        {/* ========== BLOCK 1 – EXPERTISE ========== */}
        <div className="relative">
          {/* Glow border wrapper */}
          <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-[#3087C0]/30 to-transparent blur-xl opacity-40"></div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative bg-white/70 backdrop-blur-xl border border-[#3087C0]/20 shadow-xl rounded-3xl p-6 sm:p-10"
          >
            {/* Header */}
            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3087C0] text-center"
            >
              Our Expertise in Optoelectronic Technology
            </motion.h2>

            <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">

              {/* LEFT DESCRIPTION */}
              <motion.div variants={fadeUp}>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  Techwin is a forward-thinking optoelectronic technology manufacturer integrating
                  research, development, and production into one streamlined process. With advanced
                  optical simulation tools, precision fiber components, and world-class engineering,
                  every system meets international laboratory and industrial standards.
                </p>

                <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-700">
                  Our engineering team specializes in photonics, optoelectronics, and laser physics.
                  From R&D to testing to after-sales support, every stage is handled with strict
                  quality control — ensuring sub-Hz stability, narrow linewidth, and long-term
                  reliability.
                </p>
              </motion.div>

              {/* RIGHT TECH HIGHLIGHT CARD */}
              <motion.div
                variants={fadeUp}
                className="relative bg-white/60 rounded-2xl border border-[#3087C0]/30 p-6 shadow-lg"
              >
                <div className="absolute -top-5 -left-5 w-20 h-20 bg-[#3087C0]/20 rounded-full blur-2xl"></div>

                <h3 className="text-xl font-semibold text-[#3087C0] mb-4">
                  Why This Expertise Matters
                </h3>

                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="w-2 h-2 mt-2 rounded-full bg-[#3087C0]"></span>
                    <p>Sub-Hz linewidth single-frequency laser engineering</p>
                  </li>

                  <li className="flex gap-3">
                    <span className="w-2 h-2 mt-2 rounded-full bg-[#3087C0]"></span>
                    <p>Ultra-stable cavity design & low-noise electronics</p>
                  </li>

                  <li className="flex gap-3">
                    <span className="w-2 h-2 mt-2 rounded-full bg-[#3087C0]"></span>
                    <p>Precision fiber component manufacturing & QA</p>
                  </li>

                  <li className="flex gap-3">
                    <span className="w-2 h-2 mt-2 rounded-full bg-[#3087C0]"></span>
                    <p>Long-term reliability testing under harsh conditions</p>
                  </li>
                </ul>
              </motion.div>

            </div>
          </motion.div>
        </div>

        {/* ======================================================= */}
        {/* ========== BLOCK 2 – PRODUCT LINE GRID ========== */}
        {/* ======================================================= */}

        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-[#3087C0]/25 to-transparent blur-xl opacity-40"></div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative bg-white/70 backdrop-blur-xl border border-[#3087C0]/20 shadow-xl rounded-3xl p-6 sm:p-10"
          >
            {/* Header */}
            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3087C0] text-center"
            >
              Our Core Product Line
            </motion.h2>

            {/* Grid */}
            <motion.div
              variants={fadeUp}
              className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
            >

              {/* CARD 1 */}
              <div className="group bg-white/70 hover:bg-white border border-[#3087C0]/20 rounded-2xl p-6 transition-all shadow-md hover:shadow-xl">
                <h3 className="text-xl font-semibold text-[#3087C0] mb-2">
                  Single Frequency Fiber Lasers
                </h3>
                <p className="text-slate-700">
                  Designed for narrow-linewidth, ultra-low-noise scientific applications.
                </p>
              </div>

              {/* CARD 2 */}
              <div className="group bg-white/70 hover:bg-white border border-[#3087C0]/20 rounded-2xl p-6 transition-all shadow-md hover:shadow-xl">
                <h3 className="text-xl font-semibold text-[#3087C0] mb-2">
                  High Power Fiber Lasers
                </h3>
                <p className="text-slate-700">
                  Ideal for materials processing, communications, and defense-grade systems.
                </p>
              </div>

              {/* CARD 3 */}
              <div className="group bg-white/70 hover:bg-white border border-[#3087C0]/20 rounded-2xl p-6 transition-all shadow-md hover:shadow-xl">
                <h3 className="text-xl font-semibold text-[#3087C0] mb-2">
                  Custom Laser Systems
                </h3>
                <p className="text-slate-700">
                  Fully customized laser sources designed to match complex project requirements.
                </p>
              </div>

              {/* CARD 4 */}
              <div className="group bg-white/70 hover:bg-white border border-[#3087C0]/20 rounded-2xl p-6 transition-all shadow-md hover:shadow-xl">
                <h3 className="text-xl font-semibold text-[#3087C0] mb-2">
                  Optical Components & Modules
                </h3>
                <p className="text-slate-700">
                  Precision fiber modules ensuring performance, reliability, and system stability.
                </p>
              </div>
            </motion.div>

            {/* Closing */}
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg mt-8 sm:mt-10 text-center text-slate-700"
            >
              Trusted worldwide for spectroscopy, coherent detection, LiDAR, atomic physics, and advanced sensing.
            </motion.p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
