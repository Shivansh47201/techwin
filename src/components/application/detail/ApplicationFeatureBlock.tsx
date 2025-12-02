"use client";

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type FeatureProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  body?: string;
  bullets?: string[];
  image?: any;
  variant?: 'media-left' | 'media-right';
  background?: 'blue' | 'white';
  reverseOnMobile?: boolean;
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.4, 0, 0.2, 1] 
    } 
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6, 
      ease: 'easeOut',
      staggerChildren: 0.1
    }
  },
};

const bulletVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
};

export default function ApplicationFeatureBlock({
  eyebrow,
  title,
  subtitle,
  body,
  bullets = [],
  image,
  variant = 'media-left',
  background = 'white',
  reverseOnMobile = false,
}: FeatureProps) {
  const isBlue = background === 'blue';
  const mediaLeft = variant === 'media-left';
  
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const sectionClasses = cn(
    'relative w-full overflow-hidden py-16 md:py-24',
    isBlue ? 'bg-[#3B9ACB] text-white' : 'bg-gray-50 text-gray-900'
  );

  const textOrderClass = mediaLeft ? 'md:order-2' : 'md:order-1';
  const imageOrderClass = mediaLeft ? 'md:order-1' : 'md:order-2';

  return (
    <motion.section
      ref={ref}
      className={sectionClasses}
      aria-labelledby={title ? title.replace(/\s+/g, '-').toLowerCase() : undefined}
    >
      <div className="container mx-auto px-4">
        <div className={cn("grid gap-8 md:gap-12 lg:gap-16 items-center", image ? "md:grid-cols-12" : "grid-cols-1")}>
          
          {/* Text Content */}
          <motion.div 
            className={cn(textOrderClass, image ? 'md:col-span-7' : 'md:col-span-12 text-center')}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {eyebrow && (
              <motion.p variants={textVariants} className={cn(
                'mb-3 text-sm font-semibold uppercase tracking-wider',
                isBlue ? 'text-blue-200' : 'text-blue-600'
              )}>
                {eyebrow}
              </motion.p>
            )}
            
            <motion.h2 variants={textVariants} className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              {title}
            </motion.h2>
            
            {subtitle && (
              <motion.p variants={textVariants} className={cn(
                'text-lg md:text-xl',
                isBlue ? 'text-blue-100' : 'text-gray-600'
              )}>
                {subtitle}
              </motion.p>
            )}

            {body && (
              <motion.p variants={textVariants} className={cn(
                'mt-4 text-base',
                isBlue ? 'text-blue-100/90' : 'text-gray-600'
              )}>
                {body}
              </motion.p>
            )}
            
            {bullets && bullets.length > 0 && (
              <motion.ul 
                className="mt-8 space-y-4"
                variants={{
                    visible: { transition: { staggerChildren: 0.15 } }
                }}
              >
                {bullets.map((b, i) => (
                  <motion.li key={i} className="flex items-start gap-3" variants={bulletVariants}>
                    <CheckCircle className={cn('w-6 h-6 flex-shrink-0 mt-1', isBlue ? 'text-green-300' : 'text-green-500')} aria-hidden />
                    <span className={cn('text-base', isBlue ? 'text-blue-50' : 'text-gray-700')}>
                      {b}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </motion.div>

          {/* Media Content */}
          {image && (
            <motion.div 
              className={cn('md:col-span-5', imageOrderClass)}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="relative aspect-[4/3] rounded-xl shadow-xl overflow-hidden">
                <motion.div className="absolute inset-0" style={{ y: imageY }}>
                  <Image 
                    src={image.src ?? image} 
                    alt={image.alt ?? title ?? 'feature'} 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </motion.div>
                <div className={cn(
                  'absolute inset-0',
                  isBlue 
                    ? 'bg-gradient-to-t from-black/20 to-transparent' 
                    : 'bg-gradient-to-t from-black/10 to-transparent'
                )} />
              </div>
              <div className={cn(
                "hidden md:block absolute -bottom-8 -right-8 w-40 h-40 rounded-full opacity-20",
                isBlue ? "bg-blue-300/50" : "bg-blue-200"
              )} style={{ filter: 'blur(60px)' }}></div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}