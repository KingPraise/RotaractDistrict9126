'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PRELOADER_WORDS = [
  { word: 'FELLOWSHIP', subtitle: '77 Chartered Clubs Across Nigeria', img: '/images/hero-bg.jpg' },
  { word: 'LEADERSHIP', subtitle: '700+ Dynamic Young Changemakers', img: '/images/collage-leadership.jpg' },
  { word: 'SERVICE', subtitle: 'Oyo · Osun · Ondo · Ekiti · Kwara · Kogi · Niger', img: '/images/impact-vaccination.jpg' },
  { word: 'IMPACT', subtitle: '50,000+ Documented Beneficiaries', img: '/images/project-water.jpg' },
  { word: 'ROTARACT 9126', subtitle: 'Rotary International District 9126', img: '/images/pillar-events.jpg' },
];

export default function AwwwardsPreloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    // 5-Second Total Duration Timeline
    // 0s to 4.5s = Counter & Word Carousel
    // 4.5s to 5.2s = Curtain Split Exit

    const duration = 4600; // ms
    const startTime = performance.now();

    // Smooth Eased Counter
    const timer = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Cubic easing for luxury feel
      const easedProgress = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const currentCount = Math.floor(easedProgress * 100);
      setCounter(currentCount);

      // Map progress to word sequence
      const wordIdx = Math.min(Math.floor(progress * PRELOADER_WORDS.length), PRELOADER_WORDS.length - 1);
      setCurrentWordIndex(wordIdx);

      if (progress >= 1) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoading(false);
        }, 350);
      }
    }, 20);

    return () => clearInterval(timer);
  }, []);

  const handleSkip = () => {
    setIsLoading(false);
  };

  const activeWord = PRELOADER_WORDS[currentWordIndex] || PRELOADER_WORDS[0];

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <div className="fixed inset-0 z-[999999] pointer-events-auto select-none overflow-hidden font-sans">
          
          {/* ================= 5-SLAT AWWWARDS CURTAIN REVEAL ================= */}
          <div className="absolute inset-0 flex">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ y: 0 }}
                exit={{ 
                  y: '-100%',
                  transition: { 
                    duration: 0.85, 
                    delay: i * 0.05, 
                    ease: [0.85, 0, 0.15, 1] 
                  }
                }}
                className="flex-1 h-full bg-[#070A12] border-r border-white/[0.03]"
              />
            ))}
          </div>

          {/* ================= FOREGROUND PRELOADER CONTENT ================= */}
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 0.96,
              transition: { duration: 0.45, ease: 'easeIn' }
            }}
            className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12 z-20 text-white"
          >
            {/* Top Bar: Live District Registry Info */}
            <div className="flex items-center justify-between text-xs tracking-widest uppercase text-slate-400">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 p-1 flex items-center justify-center">
                  <img
                    src="/images/rotaract-logo.png"
                    alt="Rotaract Emblem"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="font-bold text-white tracking-widest">ROTARACT 9126</span>
                  <span className="hidden sm:inline text-slate-500 ml-2">· DISTRICT INITIALIZATION</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="hidden md:inline font-mono text-[11px] text-slate-500">
                  LAT 7.3775° N · LNG 3.9470° E
                </span>
                <button
                  onClick={handleSkip}
                  className="px-3.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold tracking-wider transition-all border border-white/15 cursor-pointer"
                >
                  SKIP INTRO ↵
                </button>
              </div>
            </div>

            {/* Middle Stage: Kinetic Image Frame & Giant Typography */}
            <div className="relative flex flex-col items-center justify-center my-auto w-full max-w-5xl mx-auto">
              
              {/* Expanding Ambient Background Glow */}
              <div className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-gradient-to-tr from-[#981132]/35 via-[#D91B5C]/20 to-transparent blur-3xl pointer-events-none" />

              {/* Floating Image Preview Window */}
              <div className="relative w-48 h-32 sm:w-72 sm:h-44 rounded-2xl overflow-hidden shadow-2xl border border-white/20 mb-6 sm:mb-8">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeWord.img}
                    src={activeWord.img}
                    alt={activeWord.word}
                    initial={{ opacity: 0, scale: 1.15 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="absolute bottom-2 left-3 right-3 text-[10px] text-white/75 uppercase tracking-wider font-mono truncate">
                  {activeWord.subtitle}
                </div>
              </div>

              {/* Giant Synchronized Kinetic Word Reveal */}
              <div className="overflow-hidden h-14 sm:h-24 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeWord.word}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase font-sans text-center"
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#D4A520]">
                      {activeWord.word}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Subtitle Line */}
              <div className="mt-2 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-rose-300">
                {activeWord.subtitle}
              </div>
            </div>

            {/* Bottom Row: Giant Digital Counter & Continuous Progress Bar */}
            <div className="flex flex-col gap-3">
              <div className="flex items-end justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#D91B5C] animate-ping" />
                  <span>PREPARING EXPERIENCE (5.0s)</span>
                </div>

                <div className="flex items-baseline gap-1 font-mono font-black text-4xl sm:text-7xl text-white">
                  <span>{counter.toString().padStart(2, '0')}</span>
                  <span className="text-xl sm:text-3xl text-[#D91B5C] font-sans font-bold">%</span>
                </div>
              </div>

              {/* Precision Laser Progress Rail */}
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#981132] via-[#D91B5C] to-[#D4A520] shadow-[0_0_12px_rgba(217,27,92,0.8)]"
                  style={{ width: `${counter}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
