// src/components/application/detail/ApplicationTestimonialsStrip.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, ChevronsLeft, ChevronsRight } from "lucide-react";

export type Testimonial = {
  id?: string;
  quote: string;
  author: string;
  role?: string;
  company?: string;
  logo?: { src: string; alt?: string };
  caseStudyHref?: string;
  rating?: number; // 1-5
};

type TestimonialsProps = {
  testimonials: Testimonial[];
  logos?: { src: string; alt?: string }[];
  autoplay?: boolean;
  autoplayInterval?: number;
  background?: "blue" | "white";
};

export default function ApplicationTestimonialsStrip({
  testimonials = [],
  logos = [],
  autoplay = true,
  autoplayInterval = 4500,
  background = "white",
}: TestimonialsProps) {
  const isBlue = background === "blue";
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(autoplay && testimonials.length > 1);
  const tickerRef = useRef<HTMLDivElement | null>(null);
  const autoplayRef = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
      return;
    }
    autoplayRef.current = window.setInterval(() => setIndex((i) => (i + 1) % testimonials.length), autoplayInterval);
    return () => { if (autoplayRef.current) window.clearInterval(autoplayRef.current); };
  }, [playing, autoplayInterval, testimonials.length]);

  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;
    const onEnter = () => setPlaying(false);
    const onLeave = () => setPlaying(autoplay && testimonials.length > 1);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [autoplay, testimonials.length]);

  if (!testimonials || testimonials.length === 0) return null;

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  return (
    <section className={`w-full ${isBlue ? "bg-[#3B9ACB] text-white" : "bg-white text-slate-900"} py-12 md:py-16`} aria-label="Testimonials">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className={`text-xs font-semibold uppercase tracking-wider ${isBlue ? "text-white/90" : "text-[--primary]"}`}>Trusted by</div>
            <h3 className={`text-2xl md:text-3xl lg:text-4xl font-extrabold ${isBlue ? "text-white" : "text-slate-900"}`}>Integrators & case studies</h3>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause testimonials" : "Play testimonials"} className={`p-2 rounded-lg ${isBlue ? "bg-white/10 text-white" : "bg-slate-100 text-slate-700"}`}>
              {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <div className={`text-sm ${isBlue ? "text-white/90" : "text-slate-600"}`}>Auto-play • pause on hover</div>
          </div>
        </div>

        {/* Logo marquee */}
        {logos && logos.length > 0 && (
          <div className="mb-6 overflow-hidden">
            <div ref={tickerRef} className="relative w-full">
              <div className="flex items-center gap-8 animate-marquee will-change-transform">
                {logos.concat(logos).map((l, i) => (
                  <div key={i} className="flex items-center opacity-90 min-w-[120px]">
                    <div className="w-28 h-12 relative opacity-100 contrast-125">
                      <Image src={encodeURI(l.src)} alt={l.alt || `logo-${i}`} fill sizes="120px" style={{ objectFit: "contain" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <style jsx>{`
              @keyframes marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee { animation: marquee 18s linear infinite; }
            `}</style>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Spotlight quote */}
          <div className="md:col-span-7">
            <div className={`relative rounded-3xl p-6 md:p-10 ${isBlue ? "bg-white/6" : "bg-white shadow-md"}`}>
              <AnimatePresence initial={false} mode="wait">
                <motion.blockquote
                  key={testimonials[index].id ?? index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.36 }}
                  className="relative text-lg md:text-xl leading-relaxed"
                >
                  <svg className="absolute -left-4 -top-4 w-12 h-12 opacity-10" viewBox="0 0 64 64" fill="none">
                    <path d="M16 32c0-8.837 7.163-16 16-16v32C23.163 48 16 40.837 16 32z" fill="currentColor" />
                    <path d="M48 32c0-8.837 7.163-16 16-16v32C55.163 48 48 40.837 48 32z" fill="currentColor" />
                  </svg>

                  <p className={`${isBlue ? "text-white" : "text-slate-900"}`}>{testimonials[index].quote}</p>

                  <footer className="mt-6 flex items-center gap-4">
                    {testimonials[index].logo ? (
                      <div className="w-14 h-14 relative rounded-md overflow-hidden bg-black/5">
                        <Image src={encodeURI(testimonials[index].logo!.src)} alt={testimonials[index].logo!.alt || testimonials[index].author} fill sizes="64px" style={{ objectFit: "contain" }} />
                      </div>
                    ) : (
                      <div className={`w-12 h-12 rounded-full ${isBlue ? "bg-white/8" : "bg-slate-100"}`} />
                    )}

                    <div>
                      <div className={`font-semibold ${isBlue ? "text-white" : "text-slate-900"}`}>{testimonials[index].author}</div>
                      <div className={`text-sm opacity-90 ${isBlue ? "text-white/90" : "text-slate-600"}`}>{testimonials[index].role} {testimonials[index].company ? `• ${testimonials[index].company}` : ""}</div>
                    </div>

                    <div className="ml-auto flex items-center gap-2">
                      {testimonials[index].rating ? (
                        <div className="flex items-center gap-1">
                          {Array.from({ length: Math.max(0, Math.round(testimonials[index].rating)) }).map((_, s) => (
                            <svg key={s} className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .587l3.668 7.431L24 9.748l-6 5.845 1.417 8.268L12 18.896 4.583 23.861 6 15.593 0 9.748l8.332-1.73L12 .587z"/></svg>
                          ))}
                        </div>
                      ) : null}

                      {testimonials[index].caseStudyHref && (
                        <a href={testimonials[index].caseStudyHref} className={`text-xs font-semibold ${isBlue ? "text-white/90" : "text-[--primary]"}`}>Read case study</a>
                      )}
                    </div>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>

              {/* nav dots */}
              <div className="mt-6 flex items-center gap-2">
                {testimonials.map((t, i) => (
                  <button key={t.id ?? i} onClick={() => setIndex(i)} aria-label={`Go to testimonial ${i + 1}`} className={`w-2 h-2 rounded-full ${i === index ? "bg-white" : "bg-white/40"}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Side mini-cards */}
          <div className="md:col-span-5 grid grid-cols-1 gap-4">
            {testimonials.map((t, i) => (
              <motion.button
                key={t.id ?? i}
                onClick={() => setIndex(i)}
                initial={false}
                whileHover={{ scale: 1.02 }}
                className={`relative text-left rounded-2xl p-4 transition-shadow shadow ${i === index ? (isBlue ? "bg-white/8 shadow-lg" : "bg-white shadow-lg") : (isBlue ? "bg-white/6" : "bg-slate-50")}`}
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-12 h-12 relative rounded-md overflow-hidden bg-black/5">
                        {t.logo ? <Image src={encodeURI(t.logo.src)} alt={t.logo.alt || t.author} fill sizes="48px" style={{ objectFit: "contain" }} /> : <div className="w-full h-full" />}
                  </div>

                  <div className="flex-1">
                    <div className={`text-sm font-semibold ${i === index ? (isBlue ? "text-white" : "text-slate-900") : (isBlue ? "text-white/90" : "text-slate-700")}`}>{t.author}</div>
                    <div className={`text-xs opacity-80 ${isBlue ? "text-white/90" : "text-slate-500"}`}>{t.role} {t.company ? `• ${t.company}` : ""}</div>

                    {/* replaced line-clamp-3 class with inline WebKit clamp style for compatibility */}
                    <p
                      className={`mt-2 text-xs ${i === index ? (isBlue ? "text-white" : "text-slate-700") : (isBlue ? "text-white/90" : "text-slate-600")}`}
                      style={{ display: "-webkit-box", WebkitLineClamp: 3 as any, WebkitBoxOrient: "vertical" as any, overflow: "hidden" }}
                    >
                      {t.quote}
                    </p>
                  </div>
                </div>

                <div className="absolute right-3 top-3 flex items-center gap-2">
                  <span className={`text-xs ${isBlue ? "text-white/90" : "text-slate-500"}`}>{i + 1}</span>
                </div>
              </motion.button>
            ))}

            {/* CTA strip */}
            <div className={`rounded-2xl p-4 ${isBlue ? "bg-white/8" : "bg-white shadow-md"}`}>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className={`font-semibold ${isBlue ? "text-white" : "text-slate-900"}`}>Want results like these?</div>
                  <div className={`text-xs opacity-90 ${isBlue ? "text-white/90" : "text-slate-600"}`}>Talk to our integration team and get a custom plan.</div>
                </div>
                <div>
                  <a href="#contact" className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${isBlue ? "bg-white text-[--primary]" : "bg-[--primary] text-white"}`}>Talk to sales</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
