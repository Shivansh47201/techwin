'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRequestQuote } from '@/context/RequestQuoteContext';

interface SustainabilityTab {
  id: number;
  label: string;
  heading: string;
  body: string;
  rightCardTitle: string;
  rightCardItems: Array<{
    title: string;
    description: string;
  }>;
}

type Props = {
  headingLevel?: string;
};

export default function SustainabilityServiceVision({ headingLevel = 'h2' }: Props) {
  const { openModal } = useRequestQuote();
  const [active, setActive] = useState<number>(1);
  const [tabs, setTabs] = useState<SustainabilityTab[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/admin/pages/about');
        const data = await res.json();
        if (data.sustainabilityTabs && data.sustainabilityTabs.length > 0) {
          setTabs(data.sustainabilityTabs);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sustainability tabs:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tabsRowRef = useRef<HTMLDivElement | null>(null);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  useEffect(() => {
    btnRefs.current = btnRefs.current.slice(0, tabs.length);
  }, [tabs.length]);

  useLayoutEffect(() => {
    const update = () => {
      const idx = tabs.findIndex((t) => t.id === active);
      const activeBtn = btnRefs.current[idx];
      const containerRect = tabsRowRef.current?.getBoundingClientRect();

      if (activeBtn && containerRect) {
        const r = activeBtn.getBoundingClientRect();
        setUnderline({ left: r.left - containerRect.left, width: r.width });
      } else {
        setUnderline({ left: 0, width: 0 });
      }
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [active, tabs]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((prev) => (prev <= 1 ? tabs.length : prev - 1));
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((prev) => (prev >= tabs.length ? 1 : prev + 1));
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [tabs.length]);

  const contentAnim = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -6 },
  };

  if (loading || tabs.length === 0) {
    return null;
  }

  const activeTabData = tabs.find((t) => t.id === active) || tabs[0];

  return (
    <section className="py-12 sm:py-20 bg-[#3087C0] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="border border-slate-200/20 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 bg-white/10 backdrop-blur-sm">

          {/* MOBILE: active heading above tabs */}
          <div className="md:hidden">
            {React.createElement(
              headingLevel,
              {
                className: "text-xl sm:text-2xl font-extrabold text-white leading-tight"
              },
              activeTabData.heading
            )}
            <div className="mt-3 mb-4 text-gray-200 text-sm" />
          </div>

          {/* Tabs */}
          <div className="relative">
            <div className="flex justify-center">
              <div
                ref={tabsRowRef}
                className="inline-flex gap-2 sm:gap-4 flex-wrap sm:flex-nowrap justify-center relative"
              >
                {tabs.map((tab, idx) => (
                  <button
                    key={tab.id}
                    ref={(el) => { btnRefs.current[idx] = el; }}
                    onClick={() => setActive(tab.id)}
                    aria-pressed={active === tab.id}
                    className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-200 cursor-pointer whitespace-nowrap`}
                    style={
                      active === tab.id
                        ? {
                            background: 'white',
                            color: '#3087C0',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                          }
                        : {
                            background: 'transparent',
                            color: 'white',
                            border: '1px solid rgba(255,255,255,0.3)',
                          }
                    }
                  >
                    <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.15 }}>
                      {tab.label}
                    </motion.span>
                  </button>
                ))}

                <motion.div
                  animate={{ left: underline.left, width: underline.width }}
                  transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                  style={{ height: 4 }}
                  className="absolute -bottom-3 rounded-full bg-white shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Main grid */}
          <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
            <div className="md:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`left-${active}`}
                  initial={contentAnim.initial}
                  animate={contentAnim.animate}
                  exit={contentAnim.exit}
                  transition={{ duration: 0.38 }}
                >
                  <div className="hidden md:block">
                    {React.createElement(
                      headingLevel,
                      {
                        className: "text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight"
                      },
                      activeTabData.heading
                    )}
                  </div>

                  <div className="mt-5 text-gray-200 space-y-4 max-w-2xl text-sm sm:text-base">
                    <p>{activeTabData.body}</p>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-[#3087C0] font-medium shadow-sm hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      Contact Us
                    </a>
                    <button
                      onClick={openModal}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white text-white font-medium hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      Request Quote
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="md:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="rounded-2xl p-4 sm:p-6 bg-linear-to-br from-white to-[#f8fbfd] border border-[#eaf6ff] shadow-lg"
              >
                <div>
                  <h4 className="text-lg font-semibold text-[#3087C0]">{activeTabData.rightCardTitle}</h4>
                  <ul className="mt-4 space-y-3 text-slate-700">
                    {activeTabData.rightCardItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-1 w-2 h-6 rounded-full bg-[#3087C0]" />
                        <div>
                          <strong>{item.title}</strong>
                          <div className="text-sm text-slate-600">{item.description}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center">
            <div className="w-28 h-0.5 bg-white/20 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
