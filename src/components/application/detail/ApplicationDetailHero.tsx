"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Radar, Atom, Activity, ChevronRight, Zap, Download } from "lucide-react";

export type HeroProps = {
  title?: string;
  tagline?: string;
  kicker?: string;
  image?: any; // can be string or { src, alt }
  ctas?: { label: string; href?: string }[];
  headingLevel?: string;
};

// Animations
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

const floatSlow: Variants = {
  initial: { y: 0 },
  animate: { y: [-4, 4, -4], transition: { duration: 8, repeat: Infinity, ease: "easeInOut" } },
};

const pulse: Variants = {
  initial: { opacity: 0.6, scale: 1 },
  animate: { opacity: [0.6, 0.95, 0.6], scale: [1, 1.02, 1], transition: { duration: 3.5, repeat: Infinity } },
};

const StatItem = ({ icon: Icon, value, label }: { icon: React.ElementType, value: string, label: string }) => (
    <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-sm text-white/80 uppercase tracking-wider font-semibold">{label}</div>
        </div>
    </div>
);


const PrimaryHero: React.FC<HeroProps> = ({ title, tagline, kicker, image, ctas = [], headingLevel = "h1" }) => {
  const heroTitle = title ?? "Optical Fiber Sensing";
  const heroTagline =
    tagline ??
    "Next-generation stability for DAS, DTS, and structural health monitoring. Precision engineering for long-distance fiber links.";

  // normalize image src/alt
  const imgSrc = image?.src ?? image ?? null;
  const imgAlt = image?.alt ?? heroTitle;

  return (
    <section className="relative w-full overflow-hidden bg-[#3B9ACB] text-white selection:bg-white/30">
      {/* Reserve space equal to nav height so badge/content don't sit under nav */}
      <div className="pt-[115px]" />

      <div className="relative z-10 max-w-[1220px] mx-auto px-6">
        {/* fixed hero height */}
        <div className="relative min-h-[640px] w-full">

          {/* background glows & subtle grid */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-[18%] -left-[14%] w-[70vw] h-[70vw] rounded-full bg-white/8 blur-[88px] mix-blend-overlay" />
            <div className="absolute top-[8%] right-0 w-[46vw] h-[46vw] rounded-full bg-white/6 blur-[72px] mix-blend-overlay" />
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.14) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} />
          </div>

          {/* content grid */}
          <motion.div
            className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center h-full"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* LEFT: Text */}
            <motion.div className="lg:col-span-7 flex flex-col gap-6 justify-center text-center lg:text-left" variants={fadeInUp}>

              {/* Kicker / Badge */}
              <div className="flex justify-center lg:justify-start">
                <motion.div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/12 border border-white/20 backdrop-blur-md"
                  variants={pulse}
                >
                  <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.85)]" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-white">{kicker ?? "New Gen • Photonics Platform"}</span>
                </motion.div>
              </div>

              {/* Title */}
              {React.createElement(
                headingLevel,
                { className: "text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.06] text-white drop-shadow-md" },
                React.createElement("span", { className: "block opacity-95" }, heroTitle)
              )}

              {/* Tagline */}
              <p className="text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed text-white/90 font-medium">{heroTagline}</p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-2">
                {ctas && ctas.length ? (
                  ctas.map((c, i) => (
                    <Link key={i} href={c.href ?? "#"} className="inline-flex">
                      <button
                        className={`group relative px-6 py-3 rounded-xl font-semibold transition-shadow duration-300 ${i === 0 ? "bg-white text-[#3B9ACB] shadow-[0_10px_30px_rgba(0,0,0,0.12)]" : "bg-white/10 border border-white/25 text-white"}`}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {c.label}
                          {i === 0 ? <ChevronRight className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                        </span>
                      </button>
                    </Link>
                  ))
                ) : (
                  <>
                    <Link href="/contact">
                      <button className="group relative px-6 py-3 rounded-xl bg-white text-[#3B9ACB] font-bold shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
                        <span className="relative z-10 flex items-center gap-2">Talk to an Expert <ChevronRight className="w-4 h-4" /></span>
                      </button>
                    </Link>
                
                  </>
                )}
              </div>

              {/* Quick stats */}
              <div className="pt-8 mt-4 border-t border-white/18 flex flex-wrap justify-center lg:justify-start gap-8 md:gap-12">
                <StatItem icon={Zap} value="100+" label="Projects" />
                <StatItem icon={Activity} value="<1 kHz" label="Linewidth" />
                <StatItem icon={Radar} value="24/7" label="Monitoring" />
              </div>

            </motion.div>

            {/* RIGHT: Visual */}
            <motion.div 
              className="lg:col-span-5 relative mt-20 lg:mt-16" 
              initial="initial"
              animate="animate"
              variants={floatSlow}
            >
              <div className="relative rounded-3xl overflow-hidden bg-white/8 border border-white/20 backdrop-blur-xl shadow-2xl">
                <div className="relative h-[500px] w-full rounded-2xl overflow-hidden bg-linear-to-br from-[#2a8bc2] to-[#1e6fa0]">
                  {imgSrc ? (
                    <Image src={imgSrc} alt={imgAlt} width={1220} height={640} className="object-cover w-full h-full" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white/80">Visual</div>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 to-transparent text-center">
                    <h3 className="text-white font-bold text-3xl">Sense Series X1</h3>
                    <p className="text-white/90 text-lg font-medium">Industrial Grade Optical Interrogator</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>

      {/* soft vignette at edges */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#0b4f71] to-transparent opacity-60" />
    </section>
  );
};

export default PrimaryHero;
