// src/components/common/FAQ.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";

export type FAQItem = { q: string; a: string };

type Props = {
  faqs: FAQItem[];
  heading?: string;
  className?: string;
};

export default function FAQ({
  faqs,
  heading = "Frequently asked questions",
  className = "",
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    btnRefs.current = btnRefs.current.slice(0, faqs.length);
  }, [faqs.length]);

  function onKeyNav(e: React.KeyboardEvent, idx: number) {
    const max = faqs.length - 1;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = idx >= max ? 0 : idx + 1;
      btnRefs.current[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = idx <= 0 ? max : idx - 1;
      btnRefs.current[prev]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      btnRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      btnRefs.current[max]?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleIndex(idx);
    }
  }

  function toggleIndex(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  const answerVariants: Variants = {
    hidden: { opacity: 0, maxHeight: 0, transition: ({ type: "spring", duration: 0.4, bounce: 0 } as any) },
    visible: {
      opacity: 1,
      maxHeight: "500px", // Adjust if answers can be longer
      transition: ({ type: "spring", duration: 0.4, bounce: 0 } as any),
    },
  };

  return (
    <section
      aria-labelledby="faq-heading"
      className={`
        relative w-screen left-1/2 -translate-x-1/2
        overflow-hidden
        py-14 md:py-20
        bg-[#3B9ACB]
        ${className}
      `}
    >
      {/* background grid + glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px),linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "46px 46px",
          }}
        />
        <div
          className="absolute -top-40 left-[-15%] w-[520px] h-[520px] rounded-full blur-3xl"
          style={{ background: "rgba(255,255,255,0.28)" }}
        />
        <div
          className="absolute -bottom-40 right-[-10%] w-[460px] h-[460px] rounded-full blur-3xl"
          style={{ background: "rgba(255,255,255,0.18)" }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-center mb-8 md:mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/10 border border-white/30 backdrop-blur-sm">
            <span className="h-1.5 w-8 rounded-full bg-white" />
            <span className="text-[11px] md:text-xs font-semibold tracking-[0.18em] uppercase text-white/90">
              Support & clarity
            </span>
          </div>

          <h2
            id="faq-heading"
            className="text-2xl md:text-3xl lg:text-[2.1rem] font-semibold tracking-[-0.03em] text-white"
          >
            {heading}
          </h2>

          <p className="mt-3 text-sm md:text-base text-white/90 max-w-3xl mx-auto leading-relaxed">
            Answers to common questions about our products, customization
            options, delivery and technical support.
          </p>
        </motion.div>

        {/* Outer glass container */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="
            relative rounded-3xl
            bg-white/95
            backdrop-blur-xl
            border border-white/70
            shadow-[0_24px_80px_rgba(0,0,0,0.28)]
            px-4 py-4 md:px-6 md:py-6
          "
        >
          {/* top accent line */}
          <div className="pointer-events-none absolute inset-x-6 -top-px h-px bg-linear-to-r from-transparent via-[#3B9ACB] to-transparent" />

          {/* FAQ Items */}
          <div className="space-y-3 md:space-y-4">
            {faqs.map((item, idx) => {
              const isOpen = openIndex === idx;
              const btnId = `faq-btn-${idx}`;
              const panelId = `faq-panel-${idx}`;

              return (
                <motion.div
                  key={idx}
                  className="
                    rounded-2xl
                    border border-[rgba(59,154,203,0.18)]
                    bg-white
                    data-[open=true]:bg-blue-50/50
                    shadow-[0_10px_30px_rgba(15,23,42,0.08)]
                    overflow-hidden
                    transition-colors duration-300
                  "
                  data-open={isOpen}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.3, ease: "easeOut", delay: idx * 0.03 }}
                  layout
                >
                  {/* FAQ Button */}
                  <button
                    id={btnId}
                    ref={(el) => {
                      btnRefs.current[idx] = el;
                    }}
                    aria-controls={panelId}
                    aria-expanded={isOpen}
                    onClick={() => toggleIndex(idx)}
                    onKeyDown={(e) => onKeyNav(e, idx)}
                    className="
                      w-full text-left px-4 md:px-5 py-4
                      flex items-center gap-4
                      focus:outline-none focus-visible:ring-4
                      focus-visible:ring-[#3B9ACB33]
                    "
                  >
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-sm md:text-base font-semibold text-slate-900 leading-snug">
                          {item.q}
                        </h3>
                        <span className="hidden md:inline text-[11px] text-slate-400">
                          {isOpen ? "Tap to collapse" : "Tap to expand"}
                        </span>
                      </div>
                    </div>

                    {/* Icon */}
                    <motion.span
                      className="
                        ml-2 shrink-0 w-8 h-8 rounded-full
                        border border-[#3B9ACB33]
                        bg-[#3B9ACB0F]
                        flex items-center justify-center
                      "
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
                      aria-hidden
                    >
                      <ChevronDown size={18} className="text-slate-800" />
                    </motion.span>
                  </button>

                  {/* Answer */}
                  <AnimatePresence initial={false} mode="wait">
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        variants={answerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="px-4 md:px-5 pb-4 overflow-hidden"
                      >
                        <div className="pt-1 text-sm text-slate-700 leading-relaxed">
                          <div dangerouslySetInnerHTML={{ __html: item.a }} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* bottom helper strip */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-[11px] md:text-xs text-slate-500">
            <span>
              Still unsure?{" "}
              <span className="font-semibold text-[#3B9ACB]">
                Reach out via the contact form – we respond within one business day.
              </span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3B9ACB]" />
              <span>Use ↑ ↓ Home End to navigate between questions.</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
