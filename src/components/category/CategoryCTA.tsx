// src/components/category/CategoryCTA.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Send, ArrowRight } from "lucide-react";
import Button from "@/components/common/Button";
import { useRequestQuote } from "@/context/RequestQuoteContext";

export type CTAButton = { label: string; href: string; external?: boolean };

export type CategoryCTAProps = {
  cta: {
    heading?: string;
    primary: CTAButton;
    secondary?: CTAButton | null;
  };
  contactPhone?: string | null;
  contactEmail?: string | null;
  className?: string;
  headingLevel?: string;
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    // cast ease array to any to satisfy TS types for framer-motion Transition
    transition: { duration: 0.6, ease: ([0.32, 0.72, 0, 1] as unknown) as any, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ([0.32, 0.72, 0, 1] as unknown) as any } },
};

export default function CategoryCTA({
  cta,
  contactPhone,
  headingLevel = "h2",
  contactEmail,
  className = "",
}: CategoryCTAProps) {
  const { openModal } = useRequestQuote();
  
  const handleRequestQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    openModal();
  };
  return (
    <section aria-labelledby="category-cta-heading" className={`py-16 md:py-20 ${className}`}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="relative rounded-3xl p-10 md:p-16 bg-[#3B9ACB] overflow-hidden"
        >
          {/* Animated Gradient Blobs */}
          <div aria-hidden className="absolute inset-0 -z-10">
            <motion.div 
              className="hidden sm:block absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-blue-400/50 rounded-full filter blur-3xl opacity-50"
              aria-hidden
              animate={{
                x: [0, 100, 0, -100, 0],
                y: [0, -50, 100, -50, 0],
              }}
              transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div 
              className="hidden sm:block absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-sky-400/50 rounded-full filter blur-3xl opacity-50"
              aria-hidden
              animate={{
                x: [0, -100, 50, 100, 0],
                y: [0, 80, -50, 40, 0],
              }}
              transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut', delay: -10 }}
            />
          </div>

          {/* Glassmorphic card */}
          <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-10 text-center flex flex-col items-center border border-white/20">
            {/* Glowing Icon */}
            <motion.div variants={itemVariants} className="mb-6">
                <motion.div
                    className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center"
                    animate={{
                        boxShadow: [
                            '0 0 0px 0px rgba(255, 255, 255, 0.3)',
                            '0 0 50px 10px rgba(255, 255, 255, 0.4)',
                            '0 0 0px 0px rgba(255, 255, 255, 0.3)',
                        ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <Send size={32} className="text-white" />
                </motion.div>
            </motion.div>
            
            {/* Heading */}
            {React.createElement(
              motion[headingLevel as keyof typeof motion] as any,
              {
                variants: itemVariants,
                id: "category-cta-heading",
                className: "text-2xl md:text-4xl font-bold text-white"
              },
              cta.heading ?? "Let's Engineer Your Perfect Setup"
            )}

            {/* Description */}
            <motion.p variants={itemVariants} className="mt-4 text-sm md:text-base text-white/80 max-w-xl mx-auto">
              Contact our application specialists to get a detailed quote, complete with datasheets and custom options, usually within one business day.
            </motion.p>
            
            {/* Buttons */}
            <motion.div variants={itemVariants} className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
              <Button
                as="a"
                href="#"
                onClick={handleRequestQuote}
                size="lg"
                className="w-full sm:w-auto justify-center bg-white! text-[#3B9ACB]! font-semibold hover:bg-[#3B9ACB]! hover:text-white! transition-colors duration-200 group cursor-pointer"
              >
                <span>{cta.primary.label}</span>
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              {cta.secondary && (
                <Button
                  as="a"
                  href={cta.secondary.href}
                  size="lg"
                  className="w-full sm:w-auto justify-center bg-white/20! text-white! font-semibold hover:bg-white/30! transition-colors duration-200 group border border-white/30"
                  {...(cta.secondary.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span>{cta.secondary.label}</span>
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}
            </motion.div>

            {/* Contact Info
            <motion.div variants={itemVariants} className="mt-8 pt-6 border-t border-white/20 w-full max-w-xs flex flex-col items-center justify-center gap-3 text-sm">
                {contactPhone && (
                  <a href={`tel:${contactPhone}`} className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                    <Phone size={16} />
                    <span>{contactPhone}</span>
                  </a>
                )}
                {contactEmail && (
                  <a href={`mailto:${contactEmail}`} className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                    <Mail size={16} />
                    <span>{contactEmail}</span>
                  </a>
                )}
            </motion.div> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
