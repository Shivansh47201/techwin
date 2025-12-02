// src/components/application/detail/ApplicationUseCasesGrid.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Layers, ChevronRight } from "lucide-react";

export type UseCase = {
  id?: string;
  title: string;
  summary?: string;
  stat?: string;
  icon?: string;
  image?: { src: string; alt?: string; width?: number; height?: number } | null;
  href?: string;
};

type UseCasesGridProps = {
  useCases: UseCase[];
  columns?: number;
  background?: "blue" | "white";
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const card: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] } },
};

export default function ApplicationUseCasesGrid({
  useCases,
  columns = 3,
  background = "white",
}: UseCasesGridProps) {
  const isBlue = background === "blue";
  const gridCols = columns === 3 ? "md:grid-cols-3" : columns === 2 ? "md:grid-cols-2" : "md:grid-cols-4";

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={container}
      className={`py-16 md:py-24 ${isBlue ? "bg-[#3B9ACB] text-white" : "bg-white text-[#0f172a]"}`}
      aria-label="use-cases"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
            <div className={`text-sm font-semibold uppercase tracking-wider mb-2 ${isBlue ? "text-white/90" : "text-blue-600"}`}>
              Use Cases
            </div>
            <h3 className={`text-3xl md:text-4xl font-extrabold ${isBlue ? "text-white" : "text-gray-900"}`}>
              Real-World Applications
            </h3>
            <p className={`mt-3 max-w-2xl mx-auto text-lg ${isBlue ? "text-white/80" : "text-gray-600"}`}>
                Explore how our technology is applied in various fields to achieve groundbreaking results.
            </p>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-8 ${gridCols}`}>
          {useCases.map((u, i) => (
            <motion.div
              key={u.id ?? `${u.title}-${i}`}
              variants={card}
              whileHover={{ y: -8, scale: 1.03 }}
              className={`relative group block rounded-2xl p-6 overflow-hidden transition-transform ${
                isBlue ? "bg-gradient-to-br from-white/10 to-white/5 border border-white/20" : "bg-gradient-to-br from-gray-50 to-white border border-gray-100"
              }`}
            >
              {/* Glowing border effect */}
              <div className="absolute inset-[-1px] rounded-2xl border-2 border-transparent group-hover:border-blue-500/50 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-blue-500/20"></div>

              {/* Decorative blobs */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-3xl opacity-50 transform-gpu group-hover:scale-125 transition-transform duration-500" />
              </div>

              <div className="relative z-10">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-inner ${isBlue ? "bg-white/10 text-white" : "bg-blue-100 text-blue-600"}`}
                    >
                      {u.icon ? <span className="text-3xl" dangerouslySetInnerHTML={{ __html: u.icon }} /> : <Layers className="w-8 h-8" />}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h4 className={`text-xl font-bold mb-2 ${isBlue ? "text-white" : "text-gray-900"}`}>{u.title}</h4>
                    <p className={`text-sm leading-relaxed ${isBlue ? "text-white/80" : "text-gray-600"} line-clamp-3`}>{u.summary}</p>
                  </div>
                </div>
                
                <div className="mt-5 flex items-center justify-between">
                    <Link
                      href={u.href ?? "#"}
                      className={`group/link inline-flex items-center gap-2 text-sm font-semibold transition ${
                        isBlue ? "text-white hover:text-white" : "text-blue-600 hover:text-blue-700"
                      }`}
                    >
                      <span>Learn More</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>

                    {u.stat && <div className={`text-sm font-medium py-1 px-3 rounded-full ${isBlue ? "bg-white/10" : "bg-blue-100 text-blue-800"}`}>{u.stat}</div>}
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
