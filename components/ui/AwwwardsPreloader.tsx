'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PRELOADER_WORDS = [
  { word: 'FELLOWSHIP', subtitle: '77 Chartered Clubs Across Nigeria', img: '/images/hero-bg.jpg', tag: 'D9126 FELLOWSHIP' },
  { word: 'LEADERSHIP', subtitle: '700+ Dynamic Young Changemakers', img: '/images/collage-leadership.jpg', tag: 'YOUTH LEADERSHIP' },
  { word: 'SERVICE', subtitle: 'Oyo · Osun · Ondo · Ekiti · Kwara · Kogi · Niger', img: '/images/impact-vaccination.jpg', tag: 'HUMANITARIAN SERVICE' },
  { word: 'IMPACT', subtitle: '50,000+ Documented Beneficiaries', img: '/images/project-water.jpg', tag: 'COMMUNITY TRANSFORMATION' },
  { word: 'ROTARACT 9126', subtitle: 'Rotary International District 9126', img: '/images/pillar-events.jpg', tag: 'ROTARY HERITAGE' },
];

export default function AwwwardsPreloader() {
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    // Only run the opening scene if not seen in current session
    const hasSeen = sessionStorage.getItem('d9126_opening_scene_seen');
    if (hasSeen) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const duration = 2800; // ms for crisp snappy intro
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
          sessionStorage.setItem('d9126_opening_scene_seen', 'true');
        }, 250);
      }
    }, 20);

    return () => clearInterval(timer);
  }, []);

  const handleSkip = () => {
    setIsLoading(false);
    sessionStorage.setItem('d9126_opening_scene_seen', 'true');
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
            className="absolute inset-0 flex flex-col justify-between p-4 sm:p-8 md:p-12 z-20 text-white overflow-y-auto"
          >
            {/* Top Bar: Live District Registry Info */}
            <div className="flex items-center justify-between text-xs tracking-widest uppercase text-slate-400 shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 p-1 flex items-center justify-center">
                  <img
                    src="/images/rotaract-logo.png"
                    alt="Rotaract Emblem"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="font-bold text-white tracking-widest text-[11px] sm:text-xs">ROTARACT 9126</span>
                  <span className="hidden sm:inline text-slate-500 ml-2 text-[10px]">· DISTRICT INITIALIZATION</span>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <span className="hidden md:inline font-mono text-[11px] text-slate-500">
                  LAT 7.3775° N · LNG 3.9470° E
                </span>
                <button
                  onClick={handleSkip}
                  className="px-3 sm:px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-[10px] sm:text-[11px] font-bold tracking-wider transition-all border border-white/15 cursor-pointer active:scale-95"
                >
                  SKIP INTRO ↵
                </button>
              </div>
            </div>

            {/* Middle Stage: Large Kinetic Image Frame & Responsive Typography */}
            <div className="relative flex flex-col items-center justify-center my-auto w-full max-w-5xl mx-auto py-4">
              
              {/* Expanding Ambient Background Glow */}
              <div className="absolute w-[280px] sm:w-[500px] md:w-[650px] h-[280px] sm:h-[500px] md:h-[650px] rounded-full bg-gradient-to-tr from-[#981132]/35 via-[#D91B5C]/20 to-transparent blur-3xl pointer-events-none" />

              {/* Large Responsive Photographic Stage */}
              <div className="relative w-[92vw] max-w-[360px] sm:max-w-[520px] md:max-w-[640px] lg:max-w-[740px] h-[210px] sm:h-[290px] md:h-[350px] lg:h-[390px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-white/20 mb-4 sm:mb-6 shrink-0">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeWord.img}
                    src={activeWord.img}
                    alt={activeWord.word}
                    initial={{ opacity: 0, scale: 1.12 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#FF4D8D]">
                  {activeWord.tag}
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-5 sm:right-5 flex items-center justify-between text-[10px] sm:text-xs text-white/90 font-mono tracking-wider">
                  <span className="truncate pr-2">{activeWord.subtitle}</span>
                  <span className="text-[#D4A520] font-bold shrink-0">D9126</span>
                </div>
              </div>

              {/* Giant Synchronized Kinetic Word Reveal */}
              <div className="overflow-hidden h-10 sm:h-16 md:h-20 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeWord.word}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase font-sans text-center"
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#D4A520]">
                      {activeWord.word}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Subtitle Line */}
              <div className="mt-1 sm:mt-2 text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-rose-300 text-center px-4">
                {activeWord.subtitle}
              </div>
            </div>

            {/* Bottom Row: Giant Digital Counter & Continuous Progress Bar */}
            <div className="flex flex-col gap-2.5 sm:gap-3 shrink-0 pt-2">
              <div className="flex items-end justify-between">
                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-slate-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#D91B5C] animate-ping" />
                  <span>PREPARING EXPERIENCE (5.0s)</span>
                </div>

                <div className="flex items-baseline gap-1 font-mono font-black text-3xl sm:text-5xl md:text-6xl text-white leading-none">
                  <span>{counter.toString().padStart(2, '0')}</span>
                  <span className="text-lg sm:text-2xl md:text-3xl text-[#D91B5C] font-sans font-bold">%</span>
                </div>
              </div>

              {/* Precision Laser Progress Rail */}
              <div className="w-full h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden relative">
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
