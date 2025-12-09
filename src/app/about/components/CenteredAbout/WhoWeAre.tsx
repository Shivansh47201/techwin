'use client';

import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

// Correct import for ShadCN Aceternity CometCard
import { CometCard } from "@/components/ui/comet-card";

type WhoWeAreProps = {
  imageSrc?: string;
  content?: React.ReactNode;
  imageAlt?: string;
  onTrigger?: () => void;
};

const cometVariants: Variants = {
  idle: { opacity: 0, x: -40, filter: 'blur(8px)' },
  play: {
    opacity: 1,
    x: 20,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: 'easeOut' },
  },
};

const imageGlowVariants: Variants = {
  idle: { scale: 1, boxShadow: '0 0 0 rgba(48,135,192,0)' },
  play: {
    scale: 1.02,
    boxShadow: `0 25px 50px rgba(48,135,192,0.15)`,
    transition: { duration: 1, ease: 'easeOut' },
  },
};

export default function WhoWeAre({
  imageSrc = '/images/who-we-are.jpg', 
  imageAlt = 'Techwin R&D and photonics lab',
  content,
  onTrigger,
}: WhoWeAreProps) {

  const [triggered, setTriggered] = useState(false);

  const handleTrigger = useCallback(() => {
    setTriggered(true);
    onTrigger?.();
    setTimeout(() => setTriggered(false), 1400);
  }, [onTrigger]);

  return (
    <section aria-labelledby="who-we-are-heading" className="py-8 sm:py-12 md:py-20 bg-[#3087C0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <CometCard className="rounded-2xl bg-white" hoverScale={1.0} hoverZ={0} rotateDepth={0} translateDepth={0} glareEnabled={false}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">

            {/* IMAGE COLUMN */}
            <div className="lg:col-span-6">
              <motion.div
                initial="idle"
                animate={triggered ? 'play' : 'idle'}
                variants={imageGlowVariants}
                className="relative rounded-xl overflow-hidden w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[480px]"
              >
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  priority={false}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />

                {/* Comet Light Sweep */}
                <motion.div
                  variants={cometVariants}
                  className="absolute -left-20 top-1/3 w-56 h-56 pointer-events-none"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <defs>
                      <linearGradient id="g" x1="0" x2="1">
                        <stop offset="0" stopColor="#5BB7E1" stopOpacity="0.9" />
                        <stop offset="1" stopColor="#3087C0" stopOpacity="0.3" />
                      </linearGradient>
                      <filter id="f" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="8" />
                      </filter>
                    </defs>
                    <g filter="url(#f)">
                      <ellipse cx="60" cy="90" rx="60" ry="18" fill="url(#g)" />
                    </g>
                  </svg>
                </motion.div>
              </motion.div>
            </div>

            {/* TEXT COLUMN */}
            <div className="lg:col-span-6">
              <div
                role="button"
                tabIndex={0}
                onClick={handleTrigger}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleTrigger();
                }}
                className="cursor-pointer select-none p-4 sm:p-6 md:p-8"
              >
                <h3
                  id="who-we-are-heading"
                  className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#3087C0]"
                >
                  Who We Are
                </h3>

                <div className="mt-4 text-slate-800 prose prose-sm max-w-none leading-relaxed">
                  {content ?? (
                    <>
                      <p>
                        As a professional single frequency laser company, Techwin focuses on the design,
                        development, and production of high-stability laser systems used in scientific
                        research, industrial manufacturing, communications, and sensing applications.
                      </p>

                      <p>
                        We deliver precision laser products that combine superior performance,
                        reliability, and cost efficiency — serving research labs, industries, and
                        photonics innovators worldwide.
                      </p>
                    </>
                  )}
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTrigger();
                    }}
                    className="px-4 py-2 rounded-md bg-[#3087C0] text-white font-medium text-center"
                  >
                    Learn More
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = '/contact';
                    }}
                    className="px-4 py-2 rounded-md border border-[#3087C0] text-[#3087C0] bg-white text-center"
                  >
                    Contact Sales
                  </button>
                </div>

                <div className="mt-3 text-xs text-slate-500">
                  Tap to activate the effect
                </div>
              </div>
            </div>
          </div>
        </CometCard>

      </div>
    </section>
  );
}
