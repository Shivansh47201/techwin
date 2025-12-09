'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type Section = {
  id: string;
  title: string;
  body: string;
  image: string;
};

const DEFAULT_SECTIONS: Section[] = [
  {
    id: 'commitment',
    title: 'Commitment to Quality and Reliability',
    body:
      'As a responsible Fiber Laser Manufacturer, Techwin follows rigorous production standards and testing protocols to ensure every unit performs consistently under challenging conditions. Each system undergoes detailed evaluation before shipment, ensuring customers receive products that exceed performance expectations. We invest heavily in our testing laboratories, using advanced metrology equipment to validate power stability, spectral purity, and frequency accuracy. This commitment to precision makes Techwin a trusted partner for institutions and enterprises that depend on accuracy and reliability.',
    image: '/images/commitment.jpg',
  },
  {
    id: 'global',
    title: 'Global Presence as a China Fiber Laser Exporter',
    body:
      'Techwin has established itself as a dependable china fiber laser exporter, serving customers in more than 30 countries. Our international distribution network ensures timely delivery, technical support, and responsive after-sales assistance. Whether serving universities, research centers, or industrial enterprises, Techwin’s products are recognized for consistent performance and reliability. We maintain strong relationships with our global partners, ensuring every client experiences seamless integration and continued technical guidance.',
    image: '/images/global-presence.jpg',
  },
  {
    id: 'innovation',
    title: 'Innovation and Research',
    body:
      'Research and innovation are the foundation of Techwin’s growth. As a leading single frequency laser company, we continuously develop next-generation laser systems designed to address the evolving demands of photonics and optical communication. Our dedicated R&D team collaborates with universities and research institutions to drive breakthroughs in optical coherence, beam quality, and noise suppression. Every year, we allocate a significant portion of our revenue toward research projects and facility upgrades. This dedication ensures that Techwin remains at the forefront of technological advancement in the fiber laser industry.',
    image: '/images/innovation.jpg',
  },
];

type Props = {
  sections?: Section[];
  usePageScroll?: boolean;
};

export default function StickyScrollReveal({
  sections = DEFAULT_SECTIONS,
  usePageScroll = false,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const tickingRef = useRef(false);
  const [viewportHeight, setViewportHeight] = useState<number>(0);

  const computeActiveByHeading = useCallback(() => {
    const container = contentRef.current;
    if (!container) return activeIndex;

    const containerRect = container.getBoundingClientRect();
    const children = Array.from(container.querySelectorAll<HTMLElement>('[data-idx]'));

    let newActive = activeIndex;

    const maxScroll = container.scrollHeight - container.clientHeight;
    if (maxScroll <= 0 || Math.abs(container.scrollTop - maxScroll) <= 6) {
      newActive = Math.max(0, sections.length - 1);
      return newActive;
    }

    const threshold = 8;
    for (let i = 0; i < children.length; i++) {
      const el = children[i];
      const idx = Number(el.getAttribute('data-idx'));
      const rect = el.getBoundingClientRect();
      const topDistance = rect.top - containerRect.top;

      if (topDistance <= threshold) {
        newActive = idx;
      } else break;
    }

    return newActive;
  }, [activeIndex, sections.length]);

  const onContainerScroll = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;

    window.requestAnimationFrame(() => {
      const newActive = computeActiveByHeading();
      if (newActive !== activeIndex) setActiveIndex(newActive);
      tickingRef.current = false;
    });
  }, [activeIndex, computeActiveByHeading]);

  const onWindowScroll = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;

    window.requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) {
        tickingRef.current = false;
        return;
      }
      const rect = container.getBoundingClientRect();
      const start = rect.top - window.innerHeight * 0.15;
      const end = rect.bottom - window.innerHeight * 0.45;
      const total = end - start;
      const topOffset = -rect.top + window.innerHeight * 0.15;
      const progress = total <= 0 ? 0 : Math.max(0, Math.min(1, topOffset / total));
      const idx = Math.min(sections.length - 1, Math.floor(progress * sections.length));
      setActiveIndex(idx);
      tickingRef.current = false;
    });
  }, [sections.length]);

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    handleResize();
    
    const el = contentRef.current;

    if (!usePageScroll) {
      el?.addEventListener('scroll', onContainerScroll, { passive: true });
      onContainerScroll();
      window.addEventListener('resize', handleResize);
      return () => {
        el?.removeEventListener('scroll', onContainerScroll);
        window.removeEventListener('resize', handleResize);
      };
    } else {
      window.addEventListener('scroll', onWindowScroll, { passive: true });
      window.addEventListener('resize', handleResize);
      onWindowScroll();
      return () => {
        window.removeEventListener('scroll', onWindowScroll);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [usePageScroll, onContainerScroll, onWindowScroll]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = Math.min(sections.length - 1, activeIndex + 1);
        setActiveIndex(next);
        el.querySelector<HTMLElement>(`[data-idx='${next}']`)?.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = Math.max(0, activeIndex - 1);
        setActiveIndex(prev);
        el.querySelector<HTMLElement>(`[data-idx='${prev}']`)?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [activeIndex, sections.length]);

  useEffect(() => {
    const onResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const scrollToIndex = useCallback((idx: number) => {
    const el = contentRef.current;
    if (!el) return;
    el.querySelector<HTMLElement>(`[data-idx='${idx}']`)?.scrollIntoView({ behavior: 'smooth' });
    setActiveIndex(idx);
  }, []);

  return (
    <section className="py-12 sm:py-24 bg-[#3087C0] text-white" ref={containerRef}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* 🔵 OUTER GLOW + BORDER WRAPPER */}
        <div className="relative rounded-3xl p-3">
          <div className="absolute inset-0 rounded-3xl bg-[#3087C0]/15 blur-2xl -z-10"></div>

          <div className="rounded-3xl border border-[#3087C0]/25 bg-white shadow-xl backdrop-blur-sm p-4 sm:p-6">

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">

              {/* Sticky image */}
              <div className="hidden md:block md:col-span-5">
                <div className="sticky top-28">
                  <div className="rounded-2xl overflow-hidden bg-[#f8fbfd] border border-[#e6f8ff] shadow-lg">
                    <div className="relative aspect-4/5 w-full h-[400px] sm:h-[560px]">
                      {sections.map((s, i) => (
                        <motion.div
                          key={s.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: i === activeIndex ? 1 : 0, y: i === activeIndex ? 0 : 8 }}
                          transition={{ duration: 0.45 }}
                          className="absolute inset-0"
                        >
                          <Image src={encodeURI(s.image)} alt={s.title} fill sizes="(max-width: 1024px) 100vw, 40vw" style={{ objectFit: 'cover' }} />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="mt-4 text-sm text-slate-600 font-semibold">
                    {sections[activeIndex].title}
                  </div>

                  {/* Nav dots */}
                  <div className="mt-4 flex gap-3 justify-center">
                    {sections.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => scrollToIndex(i)}
                        className={`w-3 h-3 rounded-full ${i === activeIndex ? 'bg-[#3087C0]' : 'bg-slate-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Text scroll area */}
              <div
                ref={contentRef}
                tabIndex={0}
                className="md:col-span-7"
                style={{
                  maxHeight: usePageScroll ? undefined : Math.min(viewportHeight - 160, 880),
                  overflowY: usePageScroll ? 'visible' : 'auto',
                  paddingRight: 12,
                }}
              >
                <div className="space-y-20 py-6">
                  {sections.map((s, idx) => (
                    <article key={s.id} data-idx={idx} className="scroll-mt-28">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#3087C0] mb-6">
                        {s.title}
                      </h3>
                      <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-[70ch]">
                        {s.body}
                      </p>
                    </article>
                  ))}

                  <div style={{ height: 160 }} />
                </div>
              </div>

              {/* MOBILE Image */}
              <div className="md:hidden col-span-12 mt-6">
                <div className="rounded-2xl overflow-hidden bg-[#f8fbfd] border border-[#e6f8ff] shadow-lg">
                  <div className="relative aspect-video w-full h-[200px] sm:h-[260px]">
                    <Image
                      src={sections[activeIndex].image}
                      alt={sections[activeIndex].title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
                <div className="mt-3 text-sm text-slate-600 text-center">
                  {sections[activeIndex].title}
                </div>
              </div>
            </div>
            {/* END GRID */}

          </div>
        </div>
        {/* END OUTER GLOW WRAPPER */}
      </div>
    </section>
  );
}
