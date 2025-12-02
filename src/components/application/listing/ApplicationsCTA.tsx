// src/components/application/listing/ApplicationsCTA.tsx
"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Button from "@/components/common/Button";
import { PhoneCall, Sparkles } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const ApplicationsCTA: React.FC = () => {
  return (
    <section className="relative w-screen left-1/2 -translate-x-1/2 bg-white">
      {/* subtle blue gradient top to blend from blue grid section */}
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-16 bg- from-[#3B9ACB]/40 via-[#3B9ACB]/8 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pb-16 md:pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-[#3B9ACB] text-white shadow-[0_22px_70px_rgba(15,23,42,0.72)]"
        >
          {/* background accents */}
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at top left, rgba(59,154,203,0.25), transparent 55%), radial-gradient(circle at bottom right, rgba(15,23,42,0.9), transparent 55%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.14) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* inner layout */}
          <div className="relative flex flex-col gap-8 px-6 py-7 sm:px-8 sm:py-8 md:flex-row md:items-center md:justify-between lg:px-10 lg:py-9">
            {/* left column */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-[0.22em] uppercase">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span className="text-slate-100">Need Guidance?</span>
              </div>

              <h2 className="mt-4 text-[1.45rem] leading-snug md:text-[1.7rem] lg:text-[1.9rem] font-semibold">
                Unsure which laser fits your application?
              </h2>

              <p className="mt-3 text-xs md:text-sm text-slate-200/90 leading-relaxed">
                Share your target wavelength, power range and application domain — our
                photonics team will help map the right single-frequency fiber laser to your
                LiDAR, quantum, sensing, biomedical or satellite platform.
              </p>

              <div className="mt-4 grid gap-3 text-[11px] text-slate-100/85 sm:grid-cols-2 max-w-md">
                <div className="flex items-start gap-2.5">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  <p>Application review for LiDAR, quantum, sensing, biomedical & more.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-300" />
                  <p>Guidance on linewidth, power, package type and integration options.</p>
                </div>
              </div>
            </div>

            {/* right column */}
            <div className="w-full max-w-sm md:max-w-xs lg:max-w-sm">
              <div className="rounded-2xl bg-white border border-slate-500/40 px-4 py-4.5 sm:px-5 sm:py-5 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#3B9ACB]/20 border border-[#3B9ACB66]">
                    <PhoneCall className="h-5 w-5 text-[#3B9ACB]" strokeWidth={1.7} />
                  </div>
                  <div className="text-xs">
                    <p className="text-[#3B9ACB]">Direct application support</p>
                    <p className="font-semibold text-[#3B9ACB]">
                      +86-571-88284299
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2 text-[11px] text-black">
                  <p>Typical response time: within one business day.</p>
                  <p>Share your application notes, target specs or existing prototype.</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href="/contact">
                    <Button
                      className="px-4 py-2 text-xs md:text-[13px] bg-[#3B9ACB] text-white hover:brightness-95"
                      variant="primary"
                    >
                       Talk to Our Engineer
                    </Button>
                  </Link>

                  <Button
                    as="a"
                    href="tel:+8657188284299"
                    className="px-4 py-2 text-xs md:text-[13px] bg-[#3B9ACB] text-white hover:brightness-95"
                    variant="primary"
                  >
                    Call now
                  </Button>
                </div>


                <p className="mt-3 text-[10px] text-black">
                  We can map your application to suitable single-frequency models and
                  propose configurations for OEM integration, prototypes or lab evaluation.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationsCTA;
