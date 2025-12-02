"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Zap, BarChart, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ApplicationSubSectionProps {
  title: string;
  bullets?: string[];
  background: 'blue' | 'white';
}

const icons = [Zap, BarChart, ShieldCheck];

const ApplicationSubSection: React.FC<ApplicationSubSectionProps> = ({
  title,
  bullets,
  background,
}) => {
  const isBlueBg = background === 'blue';

  const sectionClasses = cn(
    'py-20 sm:py-28 relative overflow-hidden',
    isBlueBg ? 'bg-[#3B9ACB]' : 'bg-white'
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.3,
      },
    },
  };

  const bulletVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
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
      {isBlueBg && (
        <div 
          className="absolute inset-0 bg-center opacity-20"
          style={{
            backgroundImage: "url('/grid.svg')",
            maskImage: 'linear-gradient(180deg,white,rgba(255,255,255,0))'
          }}
        ></div>
      )}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <motion.div className="lg:col-span-1" variants={titleVariants}>
            <h2 className={cn(
              "text-4xl md:text-5xl font-bold tracking-tighter",
              isBlueBg ? 'text-white' : 'text-gray-900'
            )}>
              {title}
            </h2>
            <motion.div
              className={cn(
                "w-32 h-1.5 mt-6",
                isBlueBg ? 'bg-blue-400' : 'bg-[#3B9ACB]'
              )}
              style={{ originX: 0 }}
              variants={lineVariants}
            />
          </motion.div>
          
          {bullets && bullets.length > 0 && (
            <motion.div 
              className="lg:col-span-2 grid sm:grid-cols-2 gap-x-8 gap-y-10"
              variants={containerVariants}
            >
              {bullets.map((bullet, index) => {
                const Icon = icons[index % icons.length];
                return (
                  <motion.div key={index} className="flex items-start space-x-4" variants={bulletVariants}>
                    <div className={cn(
                      "shrink-0 w-12 h-12 rounded-full flex items-center justify-center",
                      isBlueBg ? 'bg-white/10' : 'bg-blue-50'
                    )}>
                      <Icon className={cn(
                        "w-6 h-6",
                        isBlueBg ? 'text-blue-300' : 'text-[#3B9ACB]'
                      )} />
                    </div>
                    <div className="pt-1">
                      <p className={cn(
                        "text-lg font-medium",
                        isBlueBg ? 'text-white' : 'text-gray-800'
                      )}>
                        {bullet}
                      </p>
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