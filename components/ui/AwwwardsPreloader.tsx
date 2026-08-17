'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function AwwwardsPreloader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    // Check session storage to avoid annoying repeated long preloaders
    const hasLoaded = sessionStorage.getItem('d9126_preloader_seen');
    
    if (hasLoaded) {
      setIsFirstLoad(false);
      setIsLoading(false);
      return;
    }

    // Fast, rhythmic counter increment
    let current = 0;
    const interval = setInterval(() => {
      // Non-linear realistic progress speed
      const step = Math.floor(Math.random() * 12) + 6;
      current = Math.min(current + step, 100);
      setCounter(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem('d9126_preloader_seen', 'true');
        }, 350);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="awwwards-preloader"
          initial={{ y: 0 }}
          exit={{ 
            y: '-100%',
            transition: { 
              duration: 0.85, 
              ease: [0.76, 0, 0.24, 1] 
            }
          }}
          className="fixed inset-0 z-[99999] flex flex-col justify-between p-6 sm:p-12 bg-[#070A12] text-white selection:bg-[#D91B5C] select-none pointer-events-auto"
        >
          {/* Top Row: Brand Monogram & Coordinates */}
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-slate-400 font-sans">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#D91B5C] animate-ping" />
              <span className="font-bold text-white tracking-widest">D9126</span>
              <span className="text-slate-500">· NIGERIA</span>
            </div>
            <div className="hidden sm:block text-slate-500 font-mono text-[10px]">
              7.3775° N, 3.9470° E
            </div>
          </div>

          {/* Center: Dynamic Emblem & Typography */}
          <div className="flex flex-col items-center justify-center text-center my-auto">
            {/* Pulsing Rotating District Ring */}
            <div className="relative mb-8">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-dashed border-[#D91B5C]/40 flex items-center justify-center"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/images/rotaract-logo.png"
                  alt="Rotaract Logo"
                  className="w-14 h-14 object-contain drop-shadow-[0_0_20px_rgba(217,27,92,0.6)]"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#981132]/20 to-transparent blur-xl pointer-events-none" />
            </div>

            {/* Editorial Title reveal */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
                className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase font-sans"
              >
                ROTARACT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D91B5C] via-[#FF4D8D] to-[#D4A520]">DISTRICT 9126</span>
              </motion.div>
            </div>

            <div className="overflow-hidden mt-2">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                className="text-xs sm:text-sm tracking-[0.3em] uppercase text-slate-400 font-medium"
              >
                FELLOWSHIP · SERVICE · LEADERSHIP
              </motion.div>
            </div>
          </div>

          {/* Bottom Row: Percentage Counter & Progress Line */}
          <div className="flex flex-col gap-3">
            <div className="flex items-end justify-between">
              <span className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest font-mono">
                Initializing District Node…
              </span>
              <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white flex items-baseline gap-0.5">
                <span>{counter.toString().padStart(2, '0')}</span>
                <span className="text-sm sm:text-lg text-[#D91B5C]">%</span>
              </div>
            </div>

            {/* High Precision Progress Bar */}
            <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#981132] via-[#D91B5C] to-[#D4A520]"
                style={{ width: `${counter}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
