// src/components/application/detail/ApplicationUseCasesGrid.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Layers, ChevronRight, Sparkles } from "lucide-react";
import { cn } from '@/lib/utils';

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
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.23, 0.86, 0.39, 0.96] } },
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
      className={`py-24 md:py-32 relative overflow-hidden ${isBlue ? "bg-linear-to-br from-[#3B9ACB] via-[#2a7aa6] to-[#1f5a85] text-white" : "bg-linear-to-b from-white via-gray-50 to-white text-gray-900"}`}
      aria-label="use-cases"
    >
      {/* Background decorations */}
      {isBlue && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/3 -right-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-1/4 -left-1/3 w-80 h-80 rounded-full bg-white/8 blur-3xl" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <motion.div 
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className={cn('w-4 h-4', isBlue ? 'text-blue-200' : 'text-blue-500')} />
            <div className={`text-xs md:text-sm font-bold uppercase tracking-widest ${isBlue ? "text-blue-100" : "text-blue-600"}`}>
              Use Cases
            </div>
          </div>
          <h3 className={`text-4xl md:text-5xl font-black tracking-tight mb-4 ${isBlue ? "text-white" : "text-gray-950"}`}>
            Real-World Applications
          </h3>
          <p className={`mx-auto max-w-3xl text-lg md:text-xl leading-relaxed ${isBlue ? "text-blue-100" : "text-gray-700"}`}>
            Explore how our technology is applied in various fields to achieve groundbreaking results.
          </p>
        </motion.div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 lg:gap-12 ${gridCols}`}>
          {useCases.map((u, i) => (
            <motion.div
              key={u.id ?? `${u.title}-${i}`}
              variants={card}
              whileHover={{ y: -12, scale: 1.04 }}
              className="group relative h-full"
            >
              <div className={`relative h-full p-8 md:p-10 rounded-3xl overflow-hidden backdrop-blur-sm transition-all duration-300 border ${
                isBlue 
                  ? "bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/40 shadow-xl hover:shadow-2xl" 
                  : "bg-white border-gray-100 hover:border-blue-300 shadow-lg hover:shadow-2xl"
              }`}>
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl ${
                  isBlue
                    ? 'bg-linear-to-br from-white/5 to-white/2'
                    : 'bg-linear-to-br from-blue-50 to-white'
                }`} />

                {/* Decorative corner blobs */}
                <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden">
                  <div className={`absolute -right-12 -top-12 w-48 h-48 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 ${
                    isBlue ? 'bg-white/10' : 'bg-blue-200/30'
                  }`} />
                  <div className={`absolute -left-8 -bottom-8 w-40 h-40 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 ${
                    isBlue ? 'bg-white/8' : 'bg-blue-100/20'
                  }`} />
                </div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center font-bold text-2xl transition-all duration-300 group-hover:scale-110 ${
                      isBlue 
                        ? "bg-white/20 text-white group-hover:bg-white/30" 
                        : "bg-blue-100 text-[#3B9ACB] group-hover:bg-blue-200"
                    } shadow-lg`}>
                      {u.icon ? <span dangerouslySetInnerHTML={{ __html: u.icon }} /> : <Layers className="w-8 h-8 md:w-10 md:h-10" />}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <h4 className={`text-xl md:text-2xl font-black mb-3 leading-tight ${isBlue ? "text-white" : "text-gray-950"}`}>
                      {u.title}
                    </h4>
                    <p className={`text-sm md:text-base leading-relaxed ${isBlue ? "text-white/80" : "text-gray-700"}`}>
                      {u.summary}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                    <Link
                      href={u.href ?? "#"}
                      className={`inline-flex items-center gap-2 font-bold text-sm md:text-base transition-all duration-300 group/link ${
                        isBlue 
                          ? "text-white hover:gap-4" 
                          : "text-[#3B9ACB] hover:text-blue-700 hover:gap-4"
                      }`}
                    >
                      <span>Learn More</span>
                      <ChevronRight className="w-4 h-4 md:w-5 md:h-5 transition-all duration-300" />
                    </Link>

                    {u.stat && (
                      <div className={`text-xs md:text-sm font-bold py-2 px-4 rounded-full whitespace-nowrap transition-all duration-300 ${
                        isBlue 
                          ? "bg-white/20 text-white" 
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {u.stat}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
