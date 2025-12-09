"use client";

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
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
      duration: 0.7, 
      ease: [0.23, 0.86, 0.39, 0.96] 
    } 
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.23, 0.86, 0.39, 0.96],
      staggerChildren: 0.12
    }
  },
};

const bulletVariants: Variants = {
    hidden: { opacity: 0, x: -15, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.5 } },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, rotateY: 10 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    rotateY: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.23, 0.86, 0.39, 0.96] 
    } 
  },
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

  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0.5, -0.5]);

  const sectionClasses = cn(
    'relative w-full overflow-hidden py-20 md:py-28 lg:py-32',
    isBlue ? 'bg-gradient-to-br from-[#3B9ACB] via-[#2a7aa6] to-[#1f5a85] text-white' : 'bg-gradient-to-b from-white via-gray-50 to-white text-gray-900'
  );

  const textOrderClass = mediaLeft ? 'md:order-2' : 'md:order-1';
  const imageOrderClass = mediaLeft ? 'md:order-1' : 'md:order-2';

  return (
    <motion.section
      ref={ref}
      className={sectionClasses}
      aria-labelledby={title ? title.replace(/\s+/g, '-').toLowerCase() : undefined}
    >
      {/* Background decorative elements */}
      {isBlue && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-1/4 -left-1/3 w-80 h-80 rounded-full bg-white/8 blur-3xl" />
        </div>
      )}

      <div className="container mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className={cn("grid gap-12 md:gap-16 lg:gap-20 items-center", image ? "md:grid-cols-12" : "grid-cols-1")}>
          
          {/* Text Content */}
          <motion.div 
            className={cn(textOrderClass, image ? 'md:col-span-6 lg:col-span-6' : 'md:col-span-12 text-center')}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {eyebrow && (
              <motion.div variants={textVariants} className="inline-flex items-center gap-2 mb-4">
                <Sparkles className={cn('w-4 h-4', isBlue ? 'text-blue-200' : 'text-blue-500')} />
                <p className={cn(
                  'text-xs md:text-sm font-bold uppercase tracking-widest',
                  isBlue ? 'text-blue-100' : 'text-blue-600'
                )}>
                  {eyebrow}
                </p>
              </motion.div>
            )}
            
            <motion.h2 variants={textVariants} className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-5 leading-tight",
              isBlue ? 'text-white' : 'text-[#3B9ACB]'
            )}>
              {title}
            </motion.h2>
            
            {subtitle && (
              <motion.p variants={textVariants} className={cn(
                'text-lg md:text-xl leading-relaxed mb-6',
                isBlue ? 'text-blue-100' : 'text-gray-700'
              )}>
                {subtitle}
              </motion.p>
            )}

            {body && (
              <motion.p variants={textVariants} className={cn(
                'text-base md:text-lg leading-relaxed mb-8',
                isBlue ? 'text-blue-50/90' : 'text-gray-600'
              )}>
                {body}
              </motion.p>
            )}
            
            {bullets && bullets.length > 0 && (
              <motion.ul 
                className="space-y-3 md:space-y-4 mt-10"
                variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                }}
              >
                {bullets.map((b, i) => (
                  <motion.li key={i} className="flex items-start gap-3 group" variants={bulletVariants}>
                    <div className={cn(
                      'shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1 group-hover:scale-110 transition-transform',
                      isBlue ? 'bg-green-400/20' : 'bg-green-100'
                    )}>
                      <CheckCircle className={cn('w-5 h-5', isBlue ? 'text-green-300' : 'text-green-600')} />
                    </div>
                    <span className={cn(
                      'text-base leading-relaxed font-medium',
                      isBlue ? 'text-blue-50' : 'text-gray-800'
                    )}>
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
              className={cn('md:col-span-6 lg:col-span-6', imageOrderClass)}
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="relative group">
                {/* Main image container with glass effect */}
                <div className="relative aspect-4/3 rounded-2xl shadow-2xl overflow-hidden">
                  <motion.div 
                    className="absolute inset-0" 
                    style={{ y: imageY, rotateX: imageRotate }}
                  >
                    <Image 
                      src={image.src ?? image} 
                      alt={image.alt ?? title ?? 'feature'} 
                      fill 
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </motion.div>
                  
                  {/* Gradient overlay */}
                  <div className={cn(
                    'absolute inset-0',
                    isBlue 
                      ? 'bg-linear-to-t from-black/30 via-transparent to-black/10' 
                      : 'bg-linear-to-t from-black/20 via-transparent to-transparent'
                  )} />
                  
                  {/* Animated border glow */}
                  <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/30 transition-all duration-500" />
                  
                  {/* Corner accent lights */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-white/10 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -ml-10 -mb-10 group-hover:bg-white/10 transition-all duration-500" />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}