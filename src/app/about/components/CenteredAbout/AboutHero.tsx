'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { useRequestQuote } from '@/context/RequestQuoteContext';

type Props = {
  backgroundImage?: string;
  backgroundVideo?: string;
  overlayDarkness?: number;
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55 },
  },
};

export default function AboutHero({
  backgroundImage = '/techwin-company/techwin-building.jpg',
  backgroundVideo = '/videos/about-hero-video.webm',
  overlayDarkness = 0.45, // darker overlay for readable white text
}: Props) {
  const { openModal } = useRequestQuote();

  return (
    <header
      className="relative overflow-hidden text-white"
      aria-labelledby="about-title"
    >
      {/* -------------------- BACKGROUND LAYER -------------------- */}
      <div className="absolute inset-0 -z-10">

        {/* Desktop Video */}
        <div className="hidden sm:block w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={backgroundImage}
            className="w-full h-full object-cover"
            aria-hidden="true"
          >
            <source src={backgroundVideo.replace('.mp4', '.webm')} type="video/webm" />
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </div>

        {/* Mobile Fallback */}
        <div className="block sm:hidden w-full h-full">
          <img
            src={backgroundImage}
            alt="Techwin photonics background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Darker overlay for contrast */}
        <div
          className="absolute inset-0"
          style={{
            background: `rgba(0,0,0,${overlayDarkness})`, // switched to black overlay
            backdropFilter: 'blur(2px)', // reduced blur
          }}
        />
      </div>

      {/* -------------------- CONTENT -------------------- */}
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 pt-20 pb-16 sm:pt-28 md:pt-36 md:pb-32">

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.22 }}
          className="space-y-6"
        >
          {/* H1 */}
          <motion.h1
            id="about-title"
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-5"
          >
            About Us — Techwin
          </motion.h1>

          {/* H2 */}
          <motion.h2
            variants={fadeUp}
            className="text-base sm:text-lg md:text-xl font-semibold mt-2"
          >
            Leading Fiber Laser Manufacturer
          </motion.h2>

          {/* Paragraph */}
          <motion.p
            variants={fadeUp}
            className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white/90 leading-relaxed"
          >
            Techwin is a trusted Fiber Laser Manufacturer based in Hangzhou City, China, specializing in advanced optical and photonic technologies. With years of industry expertise, Techwin has become one of the most respected names in high-precision laser solutions, providing innovative, reliable, and energy-efficient systems for clients across the globe.
          </motion.p>

          {/* Highlights */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-6"
          >
            {[
              'Serving 30+ countries',
              'Sub-Hz linewidth performance',
              'In-house R&D in Hangzhou',
            ].map((t) => (
              <div
                key={t}
                className="px-3 py-2 text-xs sm:text-sm font-medium bg-white/10 backdrop-blur-sm border border-white/20 rounded-full shadow-md"
              >
                {t}
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-3">
            <button
              onClick={openModal}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#3087C0] text-white font-medium shadow-lg hover:brightness-110 focus:ring-2 focus:ring-white"
            >
              Request Quote
            </button>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
