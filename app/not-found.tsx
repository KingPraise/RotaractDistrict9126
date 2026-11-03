'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Home, Compass, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8F5F2] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-[96px] pb-16 relative overflow-hidden font-sans">
        
        {/* Ambient Brand Mesh Glows */}
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-30 blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(152,17,50,0.35) 0%, rgba(212,165,32,0.15) 70%, transparent 100%)' }}
        />

        {/* Rotary Wheel Watermark */}
        <div className="absolute right-[-80px] bottom-[-80px] sm:right-[-40px] sm:bottom-[-40px] opacity-[0.04] pointer-events-none select-none">
          <img
            src="/images/rotary-wheel.png"
            alt="Rotary Wheel Watermark"
            className="w-[320px] sm:w-[480px] h-auto animate-[spin_120s_linear_infinite]"
          />
        </div>

        {/* Centered Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative z-10 max-w-xl w-full text-center"
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#981132]/10 border border-[#981132]/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#981132] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#981132]">
              404 // Route Not Found
            </span>
          </div>

          {/* Numeric Display */}
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tight leading-none mb-3 bg-gradient-to-r from-[#981132] via-[#D91B5C] to-[#D4A520] bg-clip-text text-transparent select-none">
            404
          </h1>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-black text-[#1C1C1E] tracking-tight mb-3">
            This Path Has No Charter
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto mb-8">
            The page or district resource you are looking for has been relocated, renamed, or is unavailable across our 7 constituent states.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#981132] hover:bg-[#A70C43] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              <Home size={16} />
              <span>Return to Homepage</span>
            </Link>

            <Link
              href="/clubs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-black/[0.03] text-[#1C1C1E] border border-black/10 text-sm font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              <Compass size={16} className="text-[#D4A520]" />
              <span>Find a Local Club (78)</span>
            </Link>
          </div>

          {/* Instant Search Hint Box */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-black/[0.08] p-4 text-left shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-black/[0.04] flex items-center justify-center text-[#981132] shrink-0">
                <Search size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-[#1C1C1E]">Looking for something specific?</div>
                <div className="text-[11px] text-gray-500">Search clubs, leadership, projects & news</div>
              </div>
            </div>
            <div className="hidden sm:inline-flex items-center gap-1 font-mono text-[11px] text-gray-400 bg-black/[0.04] px-2 py-1 rounded-md border border-black/[0.06]">
              <span>Ctrl</span>
              <span>+</span>
              <span>K</span>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
