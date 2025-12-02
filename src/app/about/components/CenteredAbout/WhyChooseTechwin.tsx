// src/app/about/components/CenteredAbout/WhyChooseTechwin.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const points = [
  {
    title: "Comprehensive R&D Capability",
    desc: "In-house design and development for fiber laser sources and high-precision optical systems.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="#3087C0" strokeWidth="1.5" />
        <path d="M12 7v5l3 2" stroke="#3087C0" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Advanced Manufacturing Facilities",
    desc: "State-of-the-art production lines and fiber-laser assembly units in Hangzhou City.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="#3087C0" strokeWidth="1.5" />
        <path d="M7 15h10M7 10h7" stroke="#3087C0" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Strict Quality Assurance",
    desc: "Multi-step optical testing and performance verification before every shipment.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M5 12l4 4L19 7" stroke="#3087C0" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="#3087C0" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Global Customer Support",
    desc: "Dedicated assistance for installation, integration, and international client needs.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 7h16M4 12h16M4 17h10" stroke="#3087C0" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Customization Options",
    desc: "Tailored fiber-laser solutions designed around specific wavelength, power, and noise requirements.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="#3087C0" strokeWidth="1.5" />
        <path d="M9 12h6" stroke="#3087C0" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Competitive Lead Times & Pricing",
    desc: "Optimized production workflows and logistics to offer competitive lead times and pricing for volume and custom orders.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 3v4" stroke="#3087C0" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 7v10a5 5 0 0010 0V7" stroke="#3087C0" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },

];

export default function WhyChooseTechwin() {
  return (
    <section className="py-20 bg-white text-[#08263b]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#3087C0]">Why Choose Techwin</h2>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            Choosing Techwin means partnering with a Fiber Laser Manufacturer that values precision,
            stability, and reliability. Our client-first approach ensures every project is handled with technical precision and professional integrity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="relative"
            >
              {/* Plain Tailwind card — no library overlay */}
              <div
                className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm transition-transform transform hover:-translate-y-1 hover:shadow-lg"
                role="group"
                aria-labelledby={`why-${idx}-title`}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 text-[#3087C0]" aria-hidden>
                    {item.icon}
                  </div>
                  <div>
                    <h3 id={`why-${idx}-title`} className="text-lg font-semibold text-[#08263b]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
