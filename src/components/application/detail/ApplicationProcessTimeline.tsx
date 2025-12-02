"use client";

import React, { useRef } from "react";
import { motion, Variants, useInView, useAnimation } from "framer-motion";
import Image from "next/image";

export type TimelineStep = {
  id?: string;
  title: string;
  subtitle?: string;
  body?: string;
  eta?: string; // e.g. "2–4 weeks"
  icon?: string; // optional SVG markup
  image?: { src: string; alt?: string } | null;
};

type TimelineProps = {
  steps: TimelineStep[];
  orientation?: "vertical" | "horizontal"; // default vertical
  background?: "blue" | "white";
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.995 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] } },
};

export default function ApplicationProcessTimeline({ steps, orientation = "vertical", background = "white" }: TimelineProps) {
  const isBlue = background === "blue";
  const horizontal = orientation === "horizontal";
  const rootRef = useRef(null);
  const inView = useInView(rootRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  if (inView) controls.start("show");

  return (
    <section
      ref={rootRef}
      className={`w-full ${isBlue ? "bg-[#3B9ACB] text-white" : "bg-white text-slate-900"} py-12 md:py-20`}
      aria-label="Integration & process timeline"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className={`text-xs font-semibold uppercase tracking-wider ${isBlue ? "text-white/90" : "text-[--primary]"}`}>Process</div>
            <h3 className={`text-2xl md:text-3xl lg:text-4xl font-extrabold ${isBlue ? "text-white" : "text-slate-900"}`}>
              Integration & deployment timeline
            </h3>
          </div>
          <div className={`text-sm ${isBlue ? "text-white/90" : "text-slate-600"}`}>Hover or tap a step for details</div>
        </div>

        <motion.div initial="hidden" animate={controls} variants={containerVariants} className={`${horizontal ? "overflow-x-auto py-6" : ""}`}>
          <div className={`relative ${horizontal ? "min-w-[900px]" : ""}`}>
            {/* Dotted luminous line */}
            <div
              className={`absolute ${horizontal ? "left-4 right-4 top-16" : "left-8 md:left-12 top-0 bottom-0"} pointer-events-none z-0 flex items-center justify-center`}
              aria-hidden
            >
              {/* Line for horizontal/vertical */}
              {horizontal ? (
                <svg className="w-full h-2" viewBox="0 0 100 2" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="lgLine" x1="0" x2="1">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
                      <stop offset="50%" stopColor="#ffffff" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.06" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="1" x2="100" y2="1" stroke="url(#lgLine)" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 8" />
                </svg>
              ) : (
                <div className="w-[3px] h-full bg-gradient-to-b from-white/10 via-white/18 to-white/6 rounded-full" />
              )}

              {/* animated progress glow (when inView) */}
              <motion.div
                className={`absolute ${horizontal ? "top-0 left-0 h-2" : "left-6 md:left-10 w-2 rounded-full"} bg-gradient-to-r from-white/60 to-white/30 blur-sm opacity-80 z-10`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: inView ? 1 : 0 }}
                transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
                style={horizontal ? { transformOrigin: "left center" } : { transformOrigin: "center top", height: "100%" }}
              />
            </div>

            {/* steps container */}
            <div className={`relative z-10 ${horizontal ? "flex items-start gap-12 py-6" : "grid grid-cols-1 gap-8 md:grid-cols-12"}`}>
              {steps.map((s, idx) => {
                const key = s.id ?? `${idx}`;
                const isLast = idx === steps.length - 1;
                return (
                  <motion.div
                    key={key}
                    variants={stepVariants}
                    className={`${horizontal ? "flex-shrink-0 w-[260px]" : "md:col-span-4 col-span-12"} relative`}
                  >
                    <div className={`relative z-20 ${horizontal ? "pl-4" : "pl-0 md:pl-8"}`}>
                      {/* Step marker */}
                      <div className={`absolute ${horizontal ? "-top-6 left-1/2 transform -translate-x-1/2" : "-left-8 md:-left-12 top-2"}`} aria-hidden>
                        <div className="relative">
                          <div className={`w-6 h-6 rounded-full ${isBlue ? "bg-white" : "bg-[--primary]"} shadow-md flex items-center justify-center`} />
                          <div className="absolute inset-0 animate-pulse rounded-full" style={{ boxShadow: isBlue ? "0 0 18px rgba(255,255,255,0.08)" : "0 0 18px rgba(59,154,203,0.08)" }} />
                        </div>
                      </div>

                      {/* Card */}
                      <div
                        className={`relative bg-opacity-0 ${isBlue ? "bg-white/6" : "bg-white"} ${isBlue ? "text-white" : "text-slate-900"} rounded-2xl p-4 md:p-5 shadow-md hover:shadow-lg transition-shadow duration-300`}
                        tabIndex={0}
                        role="button"
                        aria-pressed="false"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isBlue ? "bg-white/8 text-white" : "bg-[--primary] text-white"}`}>{s.icon ? <span dangerouslySetInnerHTML={{ __html: s.icon }} /> : <span className="text-sm font-semibold">{idx + 1}</span>}</div>

                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <h4 className={`text-sm md:text-base font-semibold ${isBlue ? "text-white" : "text-slate-900"}`}>{s.title}</h4>
                              {s.eta && <div className={`text-xs font-mono opacity-90 ${isBlue ? "text-white/90" : "text-slate-500"}`}>{s.eta}</div>}
                            </div>

                            {s.subtitle && <div className={`text-xs mt-1 ${isBlue ? "text-white/90" : "text-slate-500"}`}>{s.subtitle}</div>}

                            {s.body && <p className={`mt-3 text-sm leading-snug ${isBlue ? "text-white/90" : "text-slate-700"}`}>{s.body}</p>}

                            {s.image && (
                              <div className="mt-3 w-full rounded-lg overflow-hidden" style={{ maxHeight: 140 }}>
                                <Image src={s.image.src} alt={s.image.alt ?? s.title} width={560} height={140} style={{ objectFit: "cover" }} />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* small micro-interaction footer */}
                        <div className="mt-3 flex items-center justify-between text-xs opacity-90">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${isBlue ? "bg-white" : "bg-[--primary]"}`} />
                            <div>{isLast ? "Final" : "Step"} • {idx + 1}/{steps.length}</div>
                          </div>

                          <div className="flex items-center gap-3">
                            <button className={`px-2 py-1 rounded-md ${isBlue ? "bg-white/8 text-white" : "bg-slate-100 text-slate-700"}`}>Details</button>
                            <button className={`px-2 py-1 rounded-md ${isBlue ? "bg-white/8 text-white" : "bg-slate-100 text-slate-700"}`}>Contact</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* connecting dashed line piece (for vertical) */}
                    {!horizontal && !isLast && (
                      <div className="absolute left-2 md:left-6 top-[120%] w-px h-8 flex items-start justify-center">
                        <div className={`w-px h-full bg-white/10 rounded-full`} />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        :root { --primary: #3b9acb; }
      `}</style>
    </section>
  );
}
