"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Sparkles, ArrowRight, Zap, TrendingUp, Award } from "lucide-react";

export type WhiteHeroProps = {
  title?: string;
  description?: string;
  stats?: Array<{
    label: string;
    value: string;
  }>;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 0.86, 0.39, 0.96],
    },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.23, 0.86, 0.39, 0.96],
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.23, 0.86, 0.39, 0.96],
    },
  },
};

const icons = [Zap, TrendingUp, Award];

export default function ApplicationWhiteHero({
  title = "Why Fiber Lasers Fit Your Requirements",
  description = "Fiber-based platforms have become standard due to stability, compactness, and immunity to alignment issues compared to bulk lasers. They support long-term operation without frequent adjustments.",
  stats,
}: WhiteHeroProps) {
  return (
    <section className="relative w-full bg-gradient-to-b from-white via-white to-blue-50/30 overflow-hidden">
      {/* Premium background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/15 rounded-full blur-3xl -ml-40 -mb-40" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-50/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10">
        {/* Top accent bar with gradient */}
        <div className="h-1.5 bg-linear-to-r from-[#3B9ACB] via-[#2a8bc2] to-transparent shadow-lg" />

        <motion.div
          className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-32 lg:py-40"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Eyebrow / Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
            <Sparkles className="w-5 h-5 text-[#3B9ACB]" />
            <span className="text-sm font-bold uppercase tracking-widest text-[#3B9ACB]">
              Key Advantages
            </span>
          </motion.div>

          {/* Main Title - PRIMARY BLUE COLOR */}
          <motion.h2
            variants={titleVariants}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight mb-8 leading-tight max-w-4xl"
            style={{ color: "#3B9ACB" }}
          >
            {title}
          </motion.h2>

          {/* Description with better styling */}
          <motion.div variants={itemVariants} className="max-w-3xl mb-16">
            <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-4">
              {description}
            </p>
            <div className="h-1 w-20 bg-linear-to-r from-[#3B9ACB] to-transparent rounded-full" />
          </motion.div>

          {/* Stats Grid - Premium Cards */}
          {stats && stats.length > 0 && (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16"
            >
              {stats.map((stat, idx) => {
                const Icon = icons[idx % icons.length];
                return (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-[#3B9ACB]/10 to-blue-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative p-8 md:p-10 rounded-2xl bg-white border-2 border-blue-100 group-hover:border-[#3B9ACB] transition-all duration-300 shadow-md group-hover:shadow-2xl">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 rounded-xl bg-blue-50 group-hover:bg-[#3B9ACB]/10 transition-all duration-300">
                          <Icon className="w-6 h-6 text-[#3B9ACB]" />
                        </div>
                        <div className="text-3xl md:text-4xl font-black text-[#3B9ACB]">
                          {stat.value}
                        </div>
                      </div>
                      <div className="text-base md:text-lg font-bold text-gray-900">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* CTA Button */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 md:py-6 bg-[#3B9ACB] text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-blue-300 hover:scale-105 transition-all duration-300 group"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom accent bar with glow */}
      <div className="h-1.5 bg-linear-to-r from-transparent via-[#3B9ACB] to-transparent shadow-lg" />
    </section>
  );
}
