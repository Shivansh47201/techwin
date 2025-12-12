'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRequestQuote } from '@/context/RequestQuoteContext';

const TABS = [
  { id: 1, label: 'Sustainability & Responsibility' },
  { id: 2, label: 'Client Support & Service' },
  { id: 3, label: 'Our Vision & Mission' },
];

const contentById: Record<
  number,
  {
    heading?: React.ReactNode;
    body?: React.ReactNode;
    ctas?: React.ReactNode;
    rightCard?: React.ReactNode;
  }
> = {
  1: {
    heading: 'Sustainability & Responsibility',
    body: (
      <>
        <p>
          Techwin operates with a strong sense of environmental and corporate responsibility.
          We adhere to eco-conscious production standards, minimizing waste and promoting
          energy efficiency across our operations. Our products are designed to reduce power consumption
          while maintaining performance excellence.
        </p>
      </>
    ),
    rightCard: (
      <div>
        <h4 className="text-lg font-semibold text-[#3087C0]">Sustainability Focus</h4>
        <ul className="mt-4 space-y-3 text-slate-700">
          <li className="flex items-start gap-3">
            <span className="mt-1 w-2 h-6 rounded-full bg-[#3087C0]" />
            <div>
              <strong>Eco-conscious production</strong>
              <div className="text-sm text-slate-600">Minimizing waste and improving energy efficiency.</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 w-2 h-6 rounded-full bg-[#3087C0]" />
            <div>
              <strong>Energy-efficient designs</strong>
              <div className="text-sm text-slate-600">Products engineered for reduced power consumption.</div>
            </div>
          </li>
        </ul>
      </div>
    ),
  },

  2: {
    heading: 'Client Support & Service',
    body: (
      <>
        <p>
          Techwin’s service network ensures clients receive consistent support from consultation to installation.
          Our experts provide assistance with product selection, customization, and system integration.
        </p>
        <p className="mt-3">
          We offer long-term maintenance plans and technical training to ensure customers maximize system performance.
        </p>
      </>
    ),
    ctas: null,
    rightCard: (
      <div>
        <h4 className="text-lg font-semibold text-[#3087C0]">Service Highlights</h4>
        <ul className="mt-4 space-y-3 text-slate-700">
          <li className="flex items-start gap-3">
            <span className="mt-1 w-2 h-6 rounded-full bg-[#3087C0]" />
            <div>
              <strong>Global technical support</strong>
              <div className="text-sm text-slate-600">Responsive assistance across 30+ countries.</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 w-2 h-6 rounded-full bg-[#3087C0]" />
            <div>
              <strong>Training & calibration</strong>
              <div className="text-sm text-slate-600">Installation, calibration, and operator training packages.</div>
            </div>
          </li>
        </ul>
      </div>
    ),
  },

  3: {
    heading: 'Our Vision — Precision, Integrity, Innovation',
    body: (
      <>
        <p className="text-lg">
          We aim to be the trusted global partner for high-stability fiber laser solutions — delivering scientific-grade
          performance, dependable service, and continual innovation to enable breakthroughs across LiDAR, quantum research,
          and satellite communications.
        </p>
      </>
    ),
    ctas: null,
    rightCard: (
      <div>
        <h4 className="text-lg font-semibold text-[#3087C0]">Mission Pillars</h4>
        <ul className="mt-4 space-y-3 text-slate-700">
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block w-2 h-6 rounded-full bg-[#3087C0]" />
            <div>
              <strong>Precision Engineering</strong>
              <div className="text-sm text-slate-600">Delivering sub-Hz linewidth and long-term stability.</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block w-2 h-6 rounded-full bg-[#3087C0]" />
            <div>
              <strong>Reliability & QA</strong>
              <div className="text-sm text-slate-600">Rigorous testing, calibration, and lifetime validation.</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block w-2 h-6 rounded-full bg-[#3087C0]" />
            <div>
              <strong>Customer-focused Support</strong>
              <div className="text-sm text-slate-600">Global logistics and responsive technical assistance.</div>
            </div>
          </li>
        </ul>

        <div className="mt-6 rounded-lg p-4 bg-white/95 border border-[#eaf6ff] shadow-sm">
          <p className="text-sm text-slate-600">
            We invest in R&D partnerships and facility upgrades each year to ensure our technology remains at the forefront of photonics innovation.
          </p>
        </div>
      </div>
    ),
  },
};

export default function SustainabilityServiceVision() {
  const { openModal } = useRequestQuote();
  const [active, setActive] = useState<number>(1);

  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);
  // NOTE: moved ref to the exact wrapper around the inline-flex buttons
  const tabsRowRef = useRef<HTMLDivElement | null>(null);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  useEffect(() => {
    btnRefs.current = btnRefs.current.slice(0, TABS.length);
  }, []);

  useLayoutEffect(() => {
    const update = () => {
      const idx = TABS.findIndex((t) => t.id === active);
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
  }, [active]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((prev) => (prev <= 1 ? TABS.length : prev - 1));
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((prev) => (prev >= TABS.length ? 1 : prev + 1));
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const contentAnim = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -6 },
  };

  return (
    <section className="py-12 sm:py-20 bg-[#3087C0] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="border border-slate-200/20 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 bg-white/10 backdrop-blur-sm">

          {/* MOBILE: active heading above tabs */}
          <div className="md:hidden">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
              {contentById[active].heading}
            </h2>
            <div className="mt-3 mb-4 text-gray-200 text-sm" />
          </div>

          {/* Tabs: the underline is now positioned relative to the buttons row (tabsRowRef) */}
          <div className="relative">
            <div className="flex justify-center">
              <div
                // <- ref moved here to be exactly the inline-flex row containing the buttons
                ref={tabsRowRef}
                className="inline-flex gap-2 sm:gap-4 flex-wrap sm:flex-nowrap justify-center relative"
              >
                {TABS.map((tab, idx) => (
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

                {/* underline positioned relative to tabsRowRef */}
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
                  {/* desktop heading — hidden on mobile because mobile shows heading above tabs */}
                  <h2 className="hidden md:block text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                    {contentById[active].heading}
                  </h2>

                  <div className="mt-5 text-gray-200 space-y-4 max-w-2xl text-sm sm:text-base">
                    {contentById[active].body}
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
                {contentById[active].rightCard}
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
