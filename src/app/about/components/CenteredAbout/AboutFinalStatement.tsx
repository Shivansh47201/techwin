'use client';

import { motion } from "framer-motion";
import { useRequestQuote } from "@/context/RequestQuoteContext";
import { useEffect, useState } from "react";
import React from "react";

type Props = {
  headingLevel?: string;
};

export default function AboutFinalStatement({ headingLevel = 'h3' }: Props) {
  const { openModal } = useRequestQuote();
  const [title, setTitle] = useState("Techwin — Advancing Precision Through Innovation & Reliability");
  const [content, setContent] = useState("Techwin continues to uphold its reputation as a reliable optoelectronic technology manufacturer — combining innovation, precision, and quality into every laser system. With advanced R&D and global outreach, we support professionals seeking dependable optical solutions.");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/admin/pages/about');
        const data = await res.json();
        if (data.finalStatement) {
          setTitle(data.finalStatement.title || title);
          setContent(data.finalStatement.content || content);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching final statement:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <section className="py-8 sm:py-14 bg-white">
      <div className="max-w-[1100px] mx-auto px-3 sm:px-4">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="
            relative rounded-3xl 
            p-6 md:p-8 
            bg-white/95 backdrop-blur-sm
            border border-[#dff1ff]
            shadow-[0_15px_45px_rgba(48,135,192,0.12)]
          "
        >
          {/* Top color line */}
          <div className="absolute top-0 left-0 w-full h-[3px] rounded-t-3xl bg-linear-to-r from-[#5BB7E1] to-[#3087C0]" />

          {/* TEXT */}
          <div className="text-center space-y-3">
            {React.createElement(
              headingLevel,
              {
                className: "text-xl sm:text-2xl md:text-3xl font-bold text-[#08263b]"
              },
              title
            )}

            <div className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed max-w-[85%] mx-auto whitespace-pre-line">
              {content}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="mt-5 flex flex-col sm:flex-row flex-wrap justify-center gap-3">
            <a
              href="/contact"
              className="
                w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#3087C0] 
                text-white text-sm md:text-base font-semibold text-center
                shadow hover:shadow-lg hover:brightness-110 
                transition duration-200
              "
            >
              Contact Sales
            </a>

            <button
              onClick={openModal}
              className="
                w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#3087C0]
                text-[#3087C0] bg-white 
                text-sm md:text-base font-medium text-center
                hover:bg-[#f0f8ff]
                transition duration-200
              "
            >
              Request Quote
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
