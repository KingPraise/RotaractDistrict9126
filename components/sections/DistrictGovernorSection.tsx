'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Compass, ShieldCheck, HeartHandshake, ChevronLeft, ChevronRight, Quote, Sparkles, Building2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DG_PHOTOS = [
  {
    id: 1,
    src: '/images/leaders/dg-1.jpg',
    caption: 'Official Gubernatorial Portrait',
    context: 'District Governor · Rotary International District 9126'
  },
  {
    id: 2,
    src: '/images/leaders/dg-2.jpg',
    caption: 'District Executive Inspection',
    context: 'Supervising High-Impact Community Projects across 7 States'
  },
  {
    id: 3,
    src: '/images/leaders/dg-3.jpg',
    caption: 'Rotaract Mentorship & Youth Address',
    context: 'Fostering Leadership Succession and Inter-Generational Fellowship'
  },
  {
    id: 4,
    src: '/images/leaders/dg-4.jpg',
    caption: 'District Humanitarian Assembly',
    context: 'Championing Maternal Health, Disease Prevention, and Clean Water'
  },
  {
    id: 5,
    src: '/images/leaders/dg-5.jpg',
    caption: 'District Fellowship & Awards',
    context: 'Celebrating Excellence in Community Service Across 77 Clubs'
  }
];

export default function DistrictGovernorSection() {
  const pathname = usePathname();
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto rotate photo every 6 seconds unless user manually interacts
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActivePhotoIdx((prev) => (prev + 1) % DG_PHOTOS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNextPhoto = () => {
    setIsAutoPlaying(false);
    setActivePhotoIdx((prev) => (prev + 1) % DG_PHOTOS.length);
  };

  const handlePrevPhoto = () => {
    setIsAutoPlaying(false);
    setActivePhotoIdx((prev) => (prev - 1 + DG_PHOTOS.length) % DG_PHOTOS.length);
  };

  return (
    <section id="district-governor" className="relative py-20 lg:py-28 overflow-hidden bg-[#0A0E1A] text-white">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4A520]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-[#981132]/15 blur-[140px] rounded-full pointer-events-none" />

      {/* Decorative top gold hairline */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-12">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4A520]/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Top Header Badge & Tagline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4A520]/15 border border-[#D4A520]/35 text-[#F59E0B] text-xs font-black uppercase tracking-[0.2em] mb-4 shadow-sm">
            <Award className="text-[#D4A520]" size={14} />
            <span>District Leadership & Patronage</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-sans leading-tight">
            The District Governor
          </h2>
          
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed font-sans">
            Our Head, Supervisor, Father & Mentor — steering Rotary International District 9126 with wisdom, dedication, and transformative vision.
          </p>
        </motion.div>

        {/* 2-Column Split: Interactive Photo Gallery (Left) & Governor Profile (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT: 5-Photo Interactive Gallery Canvas */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex flex-col items-center"
          >
            {/* Main Stage Image Frame */}
            <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden border-2 border-[#D4A520]/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-[#0F1624] group">
              
              {/* Rotating Photo Display */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activePhotoIdx}
                  src={DG_PHOTOS[activePhotoIdx].src}
                  alt={DG_PHOTOS[activePhotoIdx].caption}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover object-top"
                />
              </AnimatePresence>

              {/* Bottom Gradient Shade & Context Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-5 text-white flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#D4A520] text-black text-[9.5px] font-black uppercase tracking-wider">
                    Photo {activePhotoIdx + 1} of {DG_PHOTOS.length}
                  </span>
                  <span className="text-[10px] text-slate-300 font-mono truncate">
                    {DG_PHOTOS[activePhotoIdx].caption}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-sans line-clamp-2">
                  {DG_PHOTOS[activePhotoIdx].context}
                </p>
              </div>

              {/* Navigation Arrows on Canvas */}
              <button
                onClick={handlePrevPhoto}
                aria-label="Previous Photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-10 backdrop-blur-sm"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNextPhoto}
                aria-label="Next Photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-10 backdrop-blur-sm"
              >
                <ChevronRight size={16} />
              </button>

              {/* Official Seal Watermark Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 border border-[#D4A520]/50 backdrop-blur-md flex items-center gap-1.5 z-10">
                <img src="/images/rotary-wheel.png" alt="Rotary" className="w-3.5 h-3.5 object-contain" />
                <span className="text-[9px] font-bold text-[#F59E0B] tracking-wider uppercase">Rotary D9126</span>
              </div>
            </div>

            {/* 5-Thumbnail Selector Strip */}
            <div className="flex items-center justify-center gap-2.5 mt-5 w-full max-w-md">
              {DG_PHOTOS.map((photo, idx) => (
                <button
                  key={photo.id}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActivePhotoIdx(idx);
                  }}
                  aria-label={`Select photo ${idx + 1}`}
                  className={`relative w-14 sm:w-16 h-16 sm:h-18 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    activePhotoIdx === idx 
                      ? 'border-[#D4A520] scale-105 shadow-[0_0_15px_rgba(212,165,32,0.6)]' 
                      : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/50'
                  }`}
                >
                  <img 
                    src={photo.src} 
                    alt={`Thumbnail ${idx + 1}`} 
                    className="w-full h-full object-cover object-top" 
                  />
                  {activePhotoIdx === idx && (
                    <div className="absolute inset-0 bg-[#D4A520]/15" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Governor Biography, Mentorship Role & Goodwill Quote */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Title & Official Title */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D4A520] mb-1">
                <span>Rotary International District 9126</span>
                <span>·</span>
                <span>2026/2027</span>
              </div>
              
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-sans">
                Rtn. Olaniyi Amoo Okin
              </h3>
              
              <div className="text-sm font-semibold text-rose-400 mt-1 font-sans">
                District Governor · Rotary International District 9126
              </div>
            </div>

            {/* Inspiring Goodwill Quote Block */}
            <div className="relative p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/15 backdrop-blur-md shadow-xl">
              <Quote className="absolute top-4 right-4 text-[#D4A520]/30 w-10 h-10" />
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed italic font-sans relative z-10">
                "Our Rotaractors are the dynamic heartbeat of community transformation across our seven states. In every project, every outreach, and every fellowship, you embody the timeless ideal of Service Above Self. As your District Governor, mentor, and father, I stand with you to build lasting impact and create enduring hope."
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#D4A520] font-semibold">
                <span>— Rtn. Olaniyi Amoo Okin</span>
                <span className="text-slate-400 font-normal">District Governor 2026/2027</span>
              </div>
            </div>

            {/* 3 Pillars of Gubernatorial Supervision */}
            <div className="space-y-3.5">
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D4A520]/40 transition-colors">
                <div className="p-2 rounded-lg bg-[#D4A520]/15 text-[#D4A520] shrink-0 mt-0.5">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Chief Guardian & District Supervisor</div>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    Provides overall constitutional leadership, executive guidance, and governance supervision for all Rotary and Rotaract entities across District 9126.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D91B5C]/40 transition-colors">
                <div className="p-2 rounded-lg bg-[#D91B5C]/15 text-rose-400 shrink-0 mt-0.5">
                  <HeartHandshake size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Father & Mentor of Rotaract 9126</div>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    Nurtures youth leadership, champions student and professional empowerment, and bridges mentorship between senior Rotary clubs and Rotaract chapters.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-colors">
                <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400 shrink-0 mt-0.5">
                  <Compass size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">7-State Strategic Alignment</div>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    Harmonizes flagship humanitarian outreaches across Osun, Oyo, Ogun, Ondo, Ekiti, Kwara, and Edo states to guarantee lasting community impact.
                  </p>
                </div>
              </div>
            </div>

            {/* Context-Aware Action Links */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {pathname === '/about' ? (
                <>
                  <a 
                    href="#lineage" 
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4A520] to-[#F59E0B] text-black font-bold text-xs tracking-wide shadow-lg shadow-[#D4A520]/25 hover:opacity-95 transition-all cursor-pointer"
                  >
                    <span>Explore DRR Lineage</span>
                    <ArrowRight size={14} />
                  </a>
                  <Link 
                    href="/projects" 
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-xs transition-colors"
                  >
                    <span>Explore Flagship Projects</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    href="/about" 
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4A520] to-[#F59E0B] text-black font-bold text-xs tracking-wide shadow-lg shadow-[#D4A520]/25 hover:opacity-95 transition-all"
                  >
                    <span>Read District Heritage & Lineage</span>
                    <Compass size={14} />
                  </Link>
                  <Link 
                    href="/clubs" 
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-xs transition-colors"
                  >
                    <span>Find Chartered Clubs</span>
                  </Link>
                </>
              )}
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
