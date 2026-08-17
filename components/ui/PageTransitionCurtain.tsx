'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PageTransitionCurtain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.45, 
            ease: [0.22, 1, 0.36, 1] 
          }
        }}
        exit={{ 
          opacity: 0, 
          y: -10,
          transition: { 
            duration: 0.25, 
            ease: [0.76, 0, 0.24, 1] 
          }
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
