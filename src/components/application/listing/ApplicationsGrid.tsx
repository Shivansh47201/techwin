"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import ApplicationCard, { ApplicationSummary } from "./ApplicationCard";

type ApplicationsGridProps = {
  applications: ApplicationSummary[];
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const ApplicationsGrid: React.FC<ApplicationsGridProps> = ({ applications }) => {
  return (
    <section
      id="applications-grid"
      className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden bg-white"
    >
      {/* Subtle gradient & blur decorations */}
      <div className="pointer-events-none absolute -top-32 right-10 h-72 w-72 rounded-full bg-[#3B9ACB]/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-[#3B9ACB]/10 blur-3xl" />

      {/* Slight top blend */}
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-b from-[#3B9ACB]/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pb-16 pt-12 md:pt-16 md:pb-20">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#3B9ACB]/80">
              Applications Library
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-slate-900 leading-tight">
              Explore Real-World Deployment of Our Fiber Laser Technology
            </h2>
            <p className="mt-2 max-w-2xl text-sm md:text-[15px] text-slate-600 leading-relaxed">
              Discover how industries are using our single-frequency fiber lasers — spanning LiDAR, 
              biomedical, quantum, sensing, spectroscopy, satellite communication and more.
            </p>
          </div>

          {/* Feature Pills */}
          <div className="mt-3 md:mt-0 flex flex-wrap gap-2 text-[11px] text-[#3B9ACB]">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#3B9ACB]/10 px-3 py-1 border border-[#3B9ACB]/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Narrow Linewidth
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#3B9ACB]/10 px-3 py-1 border border-[#3B9ACB]/20">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" /> Ultra-Low Noise
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#3B9ACB]/10 px-3 py-1 border border-[#3B9ACB]/20">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-300" /> Research & Industrial Ready
            </span>
          </div>
        </div>

        {/* GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {applications.map((app) => (
            <ApplicationCard key={app.slug} app={app} />
          ))}
        </motion.div>

        {/* Bottom label */}
        <div className="mt-10 flex items-center justify-center text-[12px] text-slate-500">
          <span className="opacity-60">• Featuring all official Techwin application domains •</span>
        </div>
      </div>
    </section>
  );
};

export default ApplicationsGrid;
