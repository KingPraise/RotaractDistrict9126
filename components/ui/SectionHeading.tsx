'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}

export default function SectionHeading({ children, light = false, className = '' }: SectionHeadingProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`text-3xl sm:text-4xl md:text-[47.8px] font-black tracking-tight leading-tight ${
        light ? 'text-white' : 'text-[#D4A520] drop-shadow-sm'
      } ${className}`}
    >
      {children}
    </motion.h2>
  );
}
