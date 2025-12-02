"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export type RelatedProduct = {
  slug: string;
  title: string;
  shortDescription?: string;
  image?: { src: string; alt?: string };
  href?: string;
};

export type RelatedProductsProps = {
  items: RelatedProduct[];
  title?: string;
};

const PRIMARY = "#3B9ACB";

export default function RelatedProducts({ items = [], title = "You may also like" }: RelatedProductsProps) {
  const fallback = { src: "/techwin-logo-rectangle.png", alt: "Techwin product" };
  
  const scrollbarHideCss = `
    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }
    .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
  `;

  return (
    <section className="w-full py-16 bg-linear-to-b from-gray-50 to-white">
      <style>{scrollbarHideCss}</style>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-bold text-gray-800">{title}</h3>
          <Link href="/products" className="text-sm font-medium inline-flex items-center gap-1 text-gray-600 hover:text-[#3B9ACB] transition-colors">
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="w-full">
            <div className="flex space-x-6 overflow-x-auto snap-x snap-mandatory pb-6 no-scrollbar">
            {items.length === 0 ? (
                // Placeholder skeletons
                Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="snap-start shrink-0 w-4/5 sm:w-1/3 lg:w-1/4">
                    <div className="w-full h-80 bg-gray-200 rounded-2xl animate-pulse" />
                </div>
                ))
            ) : (
                items.map((it) => (
                <motion.div
                    key={it.slug}
                    className="snap-start shrink-0 w-4/5 sm:w-1/3 lg:w-1/4"
                    whileHover={{ y: -5 }}
                >
                    <Link href={it.href ?? `/products/${it.slug}`} className="group block bg-gray-100/50 hover:bg-white rounded-2xl overflow-hidden transition-all duration-300 border hover:border-gray-200 h-full shadow-sm hover:shadow-xl">
                    <div className="relative w-full h-48 overflow-hidden">
                        <Image
                        src={it.image?.src ?? fallback.src}
                        alt={it.image?.alt ?? fallback.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                    <div className="p-5">
                        <h4 className="font-semibold text-lg text-gray-800 truncate">{it.title}</h4>
                        {it.shortDescription && (
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{it.shortDescription}</p>
                        )}
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-sm font-semibold" style={{ color: PRIMARY }}>View Product</span>
                            <ArrowRight size={20} className="text-gray-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#3B9ACB]" />
                        </div>
                    </div>
                    </Link>
                </motion.div>
                ))
            )}
            </div>
        </div>
      </div>
    </section>
  );
}

