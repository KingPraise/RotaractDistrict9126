'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ChevronDown, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import CountUp from '@/components/ui/CountUp';

const heroImages = [
  "https://images.unsplash.com/photo-1584789873389-48e7320e350a?w=1920&h=1080&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1604212561903-5ca7f041c58b?w=1920&h=1080&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=1080&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1598335624134-5bceb5de202d?w=1920&h=1080&fit=crop&auto=format"
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between bg-[#111111] pt-20">
      
      {/* Background Cross-fading Carousel */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((src, idx) => (
          <div 
            key={idx}
            className="absolute inset-0 overflow-hidden transition-opacity duration-[1400ms] ease-in-out"
            style={{ opacity: currentSlide === idx ? 1 : 0 }}
          >
            <img 
              src={src} 
              alt="Hero Background" 
              className="w-full h-full object-cover transition-transform duration-[7000ms] ease-out"
              style={{ 
                opacity: 0.42, 
                transform: currentSlide === idx ? 'scale(1.14)' : 'scale(1)' 
              }} 
            />
          </div>
        ))}

        {/* DOM Gradients */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ background: 'linear-gradient(to top, rgb(17, 17, 17) 0%, rgb(17, 17, 17) 12%, rgba(17, 17, 17, 0.72) 55%, rgba(17, 17, 17, 0.28) 100%)' }}
        />
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ background: 'radial-gradient(120% 90%, transparent 40%, rgba(17, 17, 17, 0.55) 100%)' }}
        />
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ background: 'radial-gradient(70% 40% at 50% -5%, rgba(152, 17, 50, 0.12) 0%, transparent 65%)' }}
        />
      </div>

      {/* Grid Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[16.666, 33.332, 49.998, 66.664, 83.33, 99.996].map((left, idx) => (
          <div 
            key={idx} 
            className="absolute top-0 bottom-0 border-l border-white/[0.03]" 
            style={{ left: `${left}%` }} 
          />
        ))}
      </div>

      {/* Right Slider Indicators */}
      <div className="absolute top-28 right-6 z-20 flex flex-col gap-1.5 hidden md:flex">
        {heroImages.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className="w-[3px] rounded-full transition-all duration-300"
            style={{
              height: currentSlide === idx ? '22px' : '8px',
              background: currentSlide === idx ? 'rgb(152, 17, 50)' : 'rgba(255, 255, 255, 0.35)'
            }}
          />
        ))}
      </div>

      {/* Unmute Button */}
      <button 
        title="Unmute" 
        className="absolute bottom-28 right-6 z-20 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 hidden md:flex active:scale-95" 
        style={{ 
          background: 'rgba(255, 255, 255, 0.07)', 
          backdropFilter: 'blur(12px)', 
          border: '1px solid rgba(255, 255, 255, 0.12)', 
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 4px 16px' 
        }}
      >
        <VolumeX color="rgba(255,255,255,0.55)" size={15} strokeWidth={2} />
      </button>

      {/* Main Content with Entrance Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20 pb-10 sm:pb-12 text-center max-w-6xl mx-auto w-full my-auto"
      >
        
        <h1 className="font-black tracking-tighter mb-4 sm:mb-6 mt-4 sm:mt-8 font-sans leading-[1] w-full">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="block" 
            style={{ fontSize: 'clamp(2.2rem, 7.5vw, 7.5rem)', lineHeight: 0.95, color: 'rgb(255, 255, 255)', textShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 40px' }}
          >
            Fellowship. Service.
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="block" 
            style={{ fontSize: 'clamp(1.4rem, 4.5vw, 4.2rem)', lineHeight: 1.1, color: 'rgb(248, 113, 113)', textShadow: 'rgba(0, 0, 0, 0.35) 0px 2px 30px' }}
          >
            Impact.
          </motion.span>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="max-w-2xl leading-relaxed mb-8 sm:mb-10 font-sans px-2" 
          style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)', color: 'rgb(255, 255, 255)' }}
        >
          Rotaract District 9126 unites thousands of young leaders across Ondo, Ekiti, Osun, Oyo, Kogi, Niger, and Kwara in a relentless pursuit of community transformation — from grassroots action to global connection.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto justify-center"
        >
          <div style={{ animation: 'ctaPulse 3s ease-in-out infinite', borderRadius: '999px' }} className="w-full sm:w-auto">
            <Link 
              href="/join" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-[26px] py-[12px] sm:py-[10px] rounded-full bg-[#981132] font-sans text-[15px] sm:text-[16px] font-bold text-white tracking-[0.02em] whitespace-nowrap transition-all duration-200 hover:scale-105 active:scale-95 group shadow-lg" 
              style={{ boxShadow: 'rgba(152, 17, 50, 0.32) 0px 4px 20px, rgba(152, 17, 50, 0.18) 0px 1px 6px' }}
            >
              Discover More
              <span className="w-[30px] h-[30px] rounded-full bg-black/35 backdrop-blur-[4px] inline-flex items-center justify-center shrink-0 border border-white/15 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
          </div>
          
          <Link 
            href="/projects" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-200 hover:bg-white/5 font-sans text-[0.95rem] sm:text-[1rem] hover:scale-105 active:scale-95"
          >
            <Heart size={16} strokeWidth={2} className="text-[#F87171]" />
            Our Impact
          </Link>
        </motion.div>

        <div 
          className="mt-8 sm:mt-10 flex flex-col items-center gap-2 text-white/30 cursor-pointer hover:text-white/60 transition-colors" 
          onClick={() => {
            const impact = document.getElementById('impact');
            if (impact) impact.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-xs tracking-widest uppercase font-sans">Scroll</span>
          <ChevronDown className="animate-bounce" size={16} strokeWidth={2} />
        </div>
      </motion.div>

      {/* Verified Stats Ribbon with CountUp Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px overflow-hidden rounded-2xl bg-white shadow-[0_8px_40px_rgba(0,0,0,0.25)] border border-black/5">
          
          <div className="flex flex-col items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-5 sm:py-6 hover:bg-gray-50/80 transition-all duration-300 md:border-r border-black/5 group">
            <span className="font-black tabular-nums font-sans text-[#D4A520] transition-transform duration-300 group-hover:scale-105" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1, textShadow: 'rgba(212, 165, 32, 0.35) 0px 0px 30px' }}>
              <CountUp end={77} duration={2200} />
            </span>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-sans text-black font-bold">Active Clubs</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-5 sm:py-6 hover:bg-gray-50/80 transition-all duration-300 md:border-r border-black/5 group">
            <span className="font-black tabular-nums font-sans text-[#D4A520] transition-transform duration-300 group-hover:scale-105" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1, textShadow: 'rgba(212, 165, 32, 0.35) 0px 0px 30px' }}>
              <CountUp end={700} suffix="+" duration={2400} />
            </span>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-sans text-black font-bold">Rotaractors</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-5 sm:py-6 hover:bg-gray-50/80 transition-all duration-300 group">
            <span className="font-black tabular-nums font-sans text-[#D4A520] transition-transform duration-300 group-hover:scale-105" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1, textShadow: 'rgba(212, 165, 32, 0.35) 0px 0px 30px' }}>
              <CountUp end={50000} suffix="+" duration={2600} />
            </span>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-sans text-black font-bold">Beneficiaries</span>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
