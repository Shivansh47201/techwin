// src/components/common/WhyChooseUs.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";

type LogoItem = { src: string; alt?: string; href?: string };
type CounterItem = { label: string; value: number | string };

type Props = {
  trustLogos?: LogoItem[]; // images under /public/
  counters?: CounterItem[]; // e.g. [{label: "Years", value: 20}]
  bullets?: string[]; // QA bullets or process bullets
  className?: string;
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function useCountUp(target: number, duration = 1200) {
  // returns animated number (integer)
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    startRef.current = start;

    const tick = (now: number) => {
      const elapsed = now - (startRef.current ?? start);
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuad
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = Math.round(target * eased);
      setValue(current);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

export default function WhyChooseUs({
  trustLogos = [],
  counters = [
    { label: "Years", value: 20 },
    { label: "Countries", value: 30 },
    { label: "Patents", value: 12 },
  ],
  bullets = [
    "Strict optical QC & linewidth verification",
    "Factory calibration & traceable test reports",
    "Customizable OEM & integration support",
  ],
  className = "",
}: Props) {
  // convert numeric counters to animated values
  const numericCounters = counters.map((c) => (typeof c.value === "number" ? c : { ...c, value: Number(c.value) || 0 }));
  
  // Memoize animated values calculation outside of render
  const animatedValues = React.useMemo(
    () => numericCounters.map((c, i) => useCountUp(Number(c.value), 1200 + i * 150)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [numericCounters]
  );

  return (
    <section
      className={`py-12 md:py-16 ${className}`}
      aria-labelledby="why-choose-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Trust Strip */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="rounded-3xl overflow-hidden"
        >
          <div
            className="w-full rounded-3xl p-6 md:p-8"
            style={{
              background: "linear-gradient(90deg, rgba(48,135,192,0.14), rgba(91,183,225,0.06))",
              boxShadow: "inset 0 -6px 30px rgba(48,135,192,0.03)",
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Left: Heading + bullets */}
              <motion.div className="flex-1" variants={itemVariants}>
                <h2 id="why-choose-heading" className="text-xl md:text-2xl font-semibold text-[--color-primary]">
                  Trusted by research labs and industry partners
                </h2>
                <p className="mt-2 text-slate-700 max-w-2xl">
                  Techwin provides high-stability laser systems and optical subsystems with rigorous QC and global support. Our engineering workflows are tuned for precision and repeatability.
                </p>

                <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-800">
                      <span
                        className="mt-0.5 inline-flex items-center justify-center w-7 h-7 rounded-md"
                        style={{
                          background: "rgba(255,255,255,0.6)",
                          border: "1px solid rgba(48,135,192,0.06)",
                        }}
                        aria-hidden
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M5 12.5L10 17L20 7" stroke="#3087C0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Right: Counters + logos */}
              <div className="flex-1">
                <div className="flex items-center gap-6">
                  {/* Counters */}
                  <div className="flex gap-4 flex-wrap">
                    {numericCounters.map((c, i) => (
                      <motion.div
                        key={c.label}
                        className="bg-white/90 rounded-2xl p-4 min-w-[120px] text-center shadow-[0_8px_20px_rgba(48,135,192,0.04)] border border-[rgba(48,135,192,0.06)]"
                        variants={itemVariants}
                      >
                        <div className="text-2xl md:text-3xl font-extrabold text-slate-900">
                          {typeof c.value === "number" ? animatedValues[i] : c.value}
                          {typeof c.value === "number" && (c.value >= 1000 ? "+" : "")}
                        </div>
                        <div className="mt-1 text-sm text-slate-700">{c.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Logos grid (below counters on small screens) */}
                <motion.div className="mt-6" variants={itemVariants}>
                  <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-4 items-center">
                    {trustLogos && trustLogos.length > 0 ? (
                      trustLogos.map((logo, i) => (
                        <a
                          key={i}
                          href={logo.href ?? "#"}
                          target={logo.href ? "_blank" : undefined}
                          rel={logo.href ? "noopener noreferrer" : undefined}
                          className="flex items-center justify-center p-2 bg-white rounded-lg border border-[rgba(48,135,192,0.04)] shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(48,135,192,0.08)]"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={logo.src} alt={logo.alt ?? `Trusted logo ${i + 1}`} className="max-h-10 object-contain" />
                        </a>
                      ))
                    ) : (
                      <>
                        {/* Placeholder logos if none provided */}
                        <div className="flex items-center justify-center p-2 bg-white rounded-lg border border-[rgba(48,135,192,0.04)] shadow-sm">
                          <svg width="48" height="24" viewBox="0 0 48 24" fill="none" aria-hidden>
                            <rect x="0" y="4" width="10" height="16" rx="2" fill="#E6F4FB" />
                            <rect x="14" y="2" width="6" height="20" rx="2" fill="#DFF2FB" />
                            <rect x="24" y="6" width="18" height="12" rx="2" fill="#E6F4FB" />
                          </svg>
                        </div>
                        <div className="flex items-center justify-center p-2 bg-white rounded-lg border border-[rgba(48,135,192,0.04)] shadow-sm">
                          <svg width="48" height="24" viewBox="0 0 48 24" fill="none" aria-hidden>
                            <rect x="0" y="4" width="10" height="16" rx="2" fill="#E6F4FB" />
                            <rect x="14" y="2" width="6" height="20" rx="2" fill="#DFF2FB" />
                          </svg>
                        </div>
                        <div className="flex items-center justify-center p-2 bg-white rounded-lg border border-[rgba(48,135,192,0.04)] shadow-sm">
                          <svg width="48" height="24" viewBox="0 0 48 24" fill="none" aria-hidden>
                            <rect x="0" y="4" width="18" height="16" rx="2" fill="#E6F4FB" />
                          </svg>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
