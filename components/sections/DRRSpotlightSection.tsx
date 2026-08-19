'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  Compass, 
  CheckCircle2, 
  Mail, 
  Users, 
  Sparkles, 
  HeartHandshake, 
  ShieldCheck,
  Building2 
} from 'lucide-react';
import Link from 'next/link';

const DRR_GALLERY = [
  {
    id: 1,
    src: '/images/leaders/drr-adaramoye-1.jpg',
    title: 'Official Executive Portrait',
    context: 'Sitting 3rd District Rotaract Representative · 2026/2027 Rotary Year',
    tag: 'Executive Office'
  },
  {
    id: 2,
    src: '/images/leaders/drr-adaramoye-2.jpg',
    title: 'District Council Assembly',
    context: 'Spearheading Digital Credentials & Sovereign Governance across 7 States',
    tag: 'Governance & Policy'
  },
  {
    id: 3,
    src: '/images/leaders/drr-adaramoye-3.jpg',
    title: 'Community Impact & Outreach',
    context: 'Leading Flagship Maternal Health & Youth Literacy Interventions',
    tag: 'Humanitarian Service'
  },
  {
    id: 4,
    src: '/images/leaders/drr-adaramoye-4.jpg',
    title: 'District Leadership & Fellowship',
    context: 'Uniting 77 Chartered Clubs & 700+ Changemakers Across South-West Nigeria',
    tag: 'Fellowship & Growth'
  }
];

export default function DRRSpotlightSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto rotate image every 5.5s unless paused by user interaction
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % DRR_GALLERY.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIdx((prev) => (prev + 1) % DRR_GALLERY.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIdx((prev) => (prev - 1 + DRR_GALLERY.length) % DRR_GALLERY.length);
  };

  return (
    <section id="drr-spotlight" className="py-16 lg:py-24 max-w-7xl mx-auto px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="rounded-3xl border border-black/[0.08] bg-gradient-to-br from-white via-white to-rose-50/30 p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden"
      >
        {/* Background ambient lighting */}
        <div className="absolute right-[-40px] top-[-40px] w-96 h-96 rounded-full bg-[#981132]/8 blur-3xl pointer-events-none" />
        <div className="absolute left-[-40px] bottom-[-40px] w-96 h-96 rounded-full bg-[#D4A520]/10 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
          
          {/* LEFT: 4-Photo Carousel Stage Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Main Active Photo Container */}
            <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden border-2 border-[#981132]/30 shadow-2xl bg-[#0F1624] group">
              
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIdx}
                  src={DRR_GALLERY[activeIdx].src}
                  alt={DRR_GALLERY[activeIdx].title}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="w-full h-full object-cover object-top"
                />
              </AnimatePresence>

              {/* Bottom Gradient Context Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-5 text-white flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#981132] text-white text-[9.5px] font-black uppercase tracking-wider">
                    {DRR_GALLERY[activeIdx].tag}
                  </span>
                  <span className="text-[10px] text-amber-300 font-mono">
                    Photo {activeIdx + 1} of {DRR_GALLERY.length}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white leading-snug">
                  {DRR_GALLERY[activeIdx].title}
                </h4>
                <p className="text-xs text-slate-300 mt-0.5 line-clamp-2">
                  {DRR_GALLERY[activeIdx].context}
                </p>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                aria-label="Previous Photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-10 backdrop-blur-sm shadow-md"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-10 backdrop-blur-sm shadow-md"
              >
                <ChevronRight size={16} />
              </button>

              {/* District 9126 Official Seal Tag */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center gap-1.5 z-10">
                <img src="/images/rotaract-logo.png" alt="Rotaract" className="w-3.5 h-3.5 object-contain" />
                <span className="text-[9px] font-bold text-white tracking-wider uppercase">Sitting DRR</span>
              </div>
            </div>

            {/* 4-Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-2.5 mt-4 w-full max-w-md">
              {DRR_GALLERY.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveIdx(idx);
                  }}
                  aria-label={`Select photo ${idx + 1}`}
                  className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeIdx === idx 
                      ? 'border-[#981132] scale-105 shadow-md shadow-[#981132]/30 ring-2 ring-[#981132]/20' 
                      : 'border-black/10 opacity-60 hover:opacity-100 hover:border-black/30'
                  }`}
                >
                  <img 
                    src={img.src} 
                    alt={`Thumbnail ${idx + 1}`} 
                    className="w-full h-full object-cover object-top" 
                  />
                  {activeIdx === idx && (
                    <div className="absolute inset-0 bg-[#981132]/15" />
                  )}
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT: DRR Biography, Theme & Strategic Vision */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Badge & Official Designation */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#981132]/10 text-[#981132] text-xs font-bold uppercase tracking-wider mb-3">
                <Award size={14} /> Theme: "Creating Lasting Impact"
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1C1C1E] tracking-tight leading-tight font-sans">
                Rtr. PP Adaramoye Iyanuoluwa
              </h3>

              <p className="text-xs sm:text-sm font-bold text-[#D91B5C] uppercase tracking-widest mt-1">
                Sitting 3rd District Rotaract Representative · District 9126
              </p>
            </div>

            {/* Inspiring Leadership Quote Card */}
            <div className="relative p-6 sm:p-7 rounded-2xl bg-white border border-black/[0.08] shadow-md text-left">
              <Quote className="absolute top-4 right-4 text-[#981132]/20 w-10 h-10" />
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed italic font-sans relative z-10">
                "Leadership is not measured by the titles we hold, but by the tangible impact we leave in the lives of our people. As we steer District 9126 in this 2026/2027 Rotary year, we are committed to empowering our youth, uniting our 77 clubs, and creating lasting solutions that uplift communities across our seven states."
              </p>
              <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between text-xs text-[#981132] font-bold">
                <span>— Rtr. PP Adaramoye Iyanuoluwa</span>
                <span className="text-gray-500 font-normal">District Rotaract Representative</span>
              </div>
            </div>

            {/* Strategic Priorities Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="p-3.5 rounded-xl bg-white/80 border border-black/[0.06] shadow-sm">
                <div className="text-[10px] font-black uppercase text-[#981132] mb-1">Pillar 1</div>
                <div className="text-xs font-bold text-[#1C1C1E]">Digital Identity</div>
                <p className="text-[11px] text-gray-500 mt-0.5">Verified credentials & automated dues reconciliation.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/80 border border-black/[0.06] shadow-sm">
                <div className="text-[10px] font-black uppercase text-[#D4A520] mb-1">Pillar 2</div>
                <div className="text-xs font-bold text-[#1C1C1E]">Maternal Health</div>
                <p className="text-[11px] text-gray-500 mt-0.5">High-impact medical outreaches across 7 states.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/80 border border-black/[0.06] shadow-sm">
                <div className="text-[10px] font-black uppercase text-purple-600 mb-1">Pillar 3</div>
                <div className="text-xs font-bold text-[#1C1C1E]">Youth Academy</div>
                <p className="text-[11px] text-gray-500 mt-0.5">Executive leadership institute & career fellowships.</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="mailto:drr@rotaractdistrict9126.com.ng"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#981132] text-white text-xs font-bold hover:bg-[#7D0E29] transition-all shadow-md shadow-[#981132]/30 hover:scale-105 cursor-pointer"
              >
                <Mail size={14} /> 
                <span>Contact Executive Office</span>
              </a>
              
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-black/5 text-[#1C1C1E] text-xs font-bold transition-all border border-black/10 shadow-sm hover:scale-105"
              >
                <Compass size={14} className="text-[#981132]" />
                <span>Explore Flagship Projects</span>
              </Link>
            </div>

          </div>

        </div>
      </motion.div>
    </section>
  );
}
