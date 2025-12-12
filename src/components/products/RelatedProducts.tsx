'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

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

const PRIMARY = '#3B9ACB';

export default function RelatedProducts({
  items = [],
  title = 'You may also like',
}: RelatedProductsProps) {
  const fallback = { src: '/techwin-logo-rectangle.png', alt: 'Techwin product' };
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // hide native scrollbar
  const scrollbarHideCss = `
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `;

  // scroll by container width (one item per viewport on mobile because items are wide)
  const scrollByVisible = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const step = el.clientWidth; // move by visible width
    el.scrollBy({ left: dir === 'left' ? -step : step, behavior: 'smooth' });
  };

  // update whether scroll can go left/right
  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 8);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => updateScrollState();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [items]);

  // left / right button handlers
  const scrollLeft = () => scrollByVisible('left');
  const scrollRight = () => scrollByVisible('right');

  return (
    <section className="w-full py-16 bg-linear-to-b from-gray-50 to-white relative">
      <style>{scrollbarHideCss}</style>

      <div className="container mx-auto px-6 relative">
        <div className="flex items-center justify-between mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#3B9ACB] md:mb-7">{title}</h3>
          <Link
            href="/products"
            className="text-sm font-medium inline-flex items-center gap-1 text-gray-600 hover:text-[#3B9ACB] transition-colors"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* SCROLL BUTTONS (always visible on mobile+desktop) */}
        <button
          onClick={scrollLeft}
          aria-label="Scroll left"
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full shadow-lg transform-gpu`}
          style={{
            background: canScrollLeft ? PRIMARY : '#d1d5db',
            color: 'white',
          }}
          disabled={!canScrollLeft}
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={scrollRight}
          aria-label="Scroll right"
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full shadow-lg transform-gpu`}
          style={{
            background: canScrollRight ? PRIMARY : '#d1d5db',
            color: 'white',
          }}
          disabled={!canScrollRight}
        >
          <ChevronRight size={20} />
        </button>

        {/* SCROLL AREA */}
        <div className="w-full">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 no-scrollbar"
            // pad sides so the centered item is visually centered
            style={{ paddingLeft: '6px', paddingRight: '6px' }}
          >
            {items.length === 0 ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="snap-start shrink-0 w-[90%] sm:w-1/3 lg:w-1/4 mx-auto"
                >
                  <div className="w-full h-64 bg-gray-200 rounded-2xl animate-pulse" />
                </div>
              ))
            ) : (
              items.map((it) => (
                <motion.div
                  key={it.slug}
                  className="snap-start shrink-0 w-[90%] sm:w-1/3 lg:w-1/4 mx-auto"
                  whileHover={{ y: -6 }}
                >
                  <Link
                    href={it.href ?? `/products/${it.slug}`}
                    className="group block rounded-2xl overflow-hidden transition-all duration-300 h-full shadow-sm"
                  >
                    {/* full border in PRIMARY color */}
                    <div
                      className="rounded-2xl overflow-hidden border-2 h-full"
                      style={{ borderColor: PRIMARY }}
                    >
                      <div className="relative w-full h-48 bg-white">
                        <Image
                          src={it.image?.src ?? fallback.src}
                          alt={it.image?.alt ?? fallback.alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-4 sm:p-5 bg-white">
                        <h4 className="font-semibold text-lg text-gray-800 truncate">
                          {it.title}
                        </h4>

                        {it.shortDescription && (
                          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                            {it.shortDescription}
                          </p>
                        )}

                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-sm font-semibold" style={{ color: PRIMARY }}>
                            View Product
                          </span>
                          <ArrowRight
                            size={20}
                            className="text-gray-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#3B9ACB]"
                          />
                        </div>
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
