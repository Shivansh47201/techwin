// src/components/home/TechHighlights.tsx (copied from components/specs)
"use client";

import React, { useEffect, useRef } from "react";
import { Sparkles, Activity, Waves, Zap, Radio, Ruler } from "lucide-react";

type Spec = {
  id: string;
  title: string;
  desc: string;
  icon?: React.ReactNode;
};

type Props = {
  heading?: string;
  subheading?: string;
  specs?: Spec[];
};

export default function TechHighlights({
  heading = "Technical Highlights",
  subheading = "Key specifications that define Techwin’s high-performance laser excellence.",
  specs = [
    {
      id: "linewidth",
      title: "Ultra-narrow Linewidth",
      desc: "Sub-kHz spectral purity for precision optical coherence measurements.",
      icon: <Waves className="h-6 w-6" />,
    },
    {
      id: "noise",
      title: "Low Phase & Intensity Noise",
      desc: "Advanced design ensures industry-leading noise suppression.",
      icon: <Activity className="h-6 w-6" />,
    },
    {
      id: "bands",
      title: "Wavelength Bands",
      desc: "Available in 1.0 µm, 1.5 µm and 2.0 µm spectral regions.",
      icon: <Radio className="h-6 w-6" />,
    },
    {
      id: "power",
      title: "Power Range",
      desc: "Configurable output: mW to multi-Watt systems (0.05 – 500 W).",
      icon: <Zap className="h-6 w-6" />,
    },
    {
      id: "stability",
      title: "High Stability",
      desc: "Thermally controlled design for 24/7 operation in critical environments.",
      icon: <Ruler className="h-6 w-6" />,
    },
    {
      id: "innovation",
      title: "Continuous Innovation",
      desc: "20+ years of R&D in single-frequency fiber laser technology.",
      icon: <Sparkles className="h-6 w-6" />,
    },
  ],
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const items = Array.from(node.querySelectorAll<HTMLElement>(".tech-card"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("tech-card-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );
    items.forEach((it) => io.observe(it));
    return () => io.disconnect();
  }, []);

  return (
    <section className="w-full bg-gray-50 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#3087C0]">
            {heading}
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            {subheading}
          </p>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {specs.map((s, i) => (
            <article
              key={s.id}
              className="tech-card opacity-0 transform translate-y-6 bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-600"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-[#3087C0]/10 text-[#3087C0] flex items-center justify-center">
                  {s.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#08263b]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
