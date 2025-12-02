"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gray-900">
      <motion.div
        className="absolute top-0 -left-1/4 w-full h-full bg-gradient-to-r from-blue-500/30 to-transparent blur-3xl"
        animate={{
          x: ['-25%', '25%', '-25%'],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-0 -right-1/4 w-full h-full bg-gradient-to-l from-indigo-500/30 to-transparent blur-3xl"
        animate={{
          x: ['25%', '-25%', '25%'],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
       <motion.div
        className="absolute -bottom-1/2 w-full h-1/2 bg-gradient-to-t from-purple-500/20 to-transparent blur-3xl"
        animate={{
          y: ['-25%', '25%', '-25%'],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
