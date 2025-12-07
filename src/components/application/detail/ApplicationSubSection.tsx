"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Lightbulb, TrendingUp, Award, Zap, Target, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ApplicationSubSectionProps {
  title: string;
  bullets?: string[];
  background: 'blue' | 'white';
}

const icons = [Lightbulb, TrendingUp, Award, Zap, Target, Lock];

const ApplicationSubSection: React.FC<ApplicationSubSectionProps> = ({
  title,
  bullets,
  background,
}) => {
  const isBlueBg = background === 'blue';

  const sectionClasses = cn(
    'py-24 sm:py-32 relative overflow-hidden',
    isBlueBg ? 'bg-gradient-to-br from-[#3B9ACB] via-[#2a7aa6] to-[#1f5a85]' : 'bg-gradient-to-b from-white via-gray-50 to-white'
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, x: -40, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.23, 0.86, 0.39, 0.96],
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: 'easeOut',
        delay: 0.3,
      },
    },
  };

  const bulletVariants: Variants = {
    hidden: { opacity: 0, scale: 0.85, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 0.86, 0.39, 0.96],
      },
    },
  };

  return (
    <motion.section
      className={sectionClasses}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Background decorative elements */}
      {isBlueBg && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/3 -left-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-1/4 right-0 w-80 h-80 rounded-full bg-white/8 blur-3xl" />
        </div>
      )}

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Left side - Title */}
          <motion.div className="lg:col-span-4 xl:col-span-3" variants={titleVariants}>
            <h2 className={cn(
              "text-4xl md:text-5xl font-black tracking-tight leading-tight",
              isBlueBg ? 'text-white' : 'text-[#3B9ACB]'
            )}>
              {title}
            </h2>
            <motion.div
              className={cn(
                "w-16 h-1.5 mt-6 rounded-full",
                isBlueBg ? 'bg-blue-300' : 'bg-[#3B9ACB]'
              )}
              style={{ originX: 0 }}
              variants={lineVariants}
            />
          </motion.div>
          
          {/* Right side - Bullets Grid */}
          {bullets && bullets.length > 0 && (
            <motion.div 
              className="lg:col-span-8 xl:col-span-9 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              variants={containerVariants}
            >
              {bullets.map((bullet, index) => {
                const Icon = icons[index % icons.length];
                return (
                  <motion.div 
                    key={index} 
                    className="group relative"
                    variants={bulletVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    {/* Card container */}
                    <div className={cn(
                      "h-full p-6 md:p-7 rounded-2xl backdrop-blur-sm border transition-all duration-300",
                      "group-hover:scale-105 group-hover:shadow-2xl",
                      isBlueBg 
                        ? 'bg-white/8 border-white/15 group-hover:bg-white/15 group-hover:border-white/30' 
                        : 'bg-white/60 border-white group-hover:bg-white group-hover:border-blue-300 group-hover:shadow-blue-100'
                    )}>
                      {/* Gradient accent on hover */}
                      <div className={cn(
                        "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                        isBlueBg
                          ? 'bg-linear-to-br from-white/10 to-white/5'
                          : 'bg-linear-to-br from-blue-50 to-white'
                      )} />

                      {/* Icon container */}
                      <div className={cn(
                        "relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300",
                        isBlueBg 
                          ? 'bg-white/15 group-hover:bg-white/25 text-white' 
                          : 'bg-blue-100 group-hover:bg-[#3B9ACB] text-[#3B9ACB] group-hover:text-white'
                      )}>
                        <Icon className="w-6 h-6" />
                      </div>

                      {/* Text content */}
                      <div className="relative z-10">
                        <p className={cn(
                          "text-base md:text-lg font-bold leading-snug group-hover:text-opacity-100 transition-all duration-300",
                          isBlueBg ? 'text-white' : 'text-gray-900'
                        )}>
                          {bullet}
                        </p>
                      </div>

                      {/* Decorative corner accent */}
                      <div className={cn(
                        "absolute top-2 right-2 w-20 h-20 rounded-full opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500",
                        isBlueBg ? 'bg-white' : 'bg-blue-400'
                      )} />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default ApplicationSubSection;