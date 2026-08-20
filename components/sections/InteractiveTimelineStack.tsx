'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, Shield, Award, Sparkles, ChevronDown, Flag, History } from 'lucide-react';

interface EraCardData {
  index: number;
  year: string;
  badge: string;
  title: string;
  desc: string;
  theme?: string;
  leader?: string;
  stats?: string;
  accentColor: string;
  bgGradient: string;
  glowColor: string;
  isSitting?: boolean;
}

const TIMELINE_ERAS: EraCardData[] = [
  {
    index: 0,
    year: '2009 – 2024',
    badge: '15-Year Legacy',
    title: 'The Era of District 9125',
    desc: 'For 15 years, Rotaract District 9125 served as a unified powerhouse comprising 23 states plus the Federal Capital Territory (FCT), nurturing generations of leaders across Nigeria.',
    theme: 'Foundational Powerhouse',
    leader: 'Pan-Nigerian Joint Council',
    stats: '23 States + FCT · 150+ Clubs',
    accentColor: '#4361EE',
    bgGradient: 'from-[#0C1222] via-[#080D1A] to-[#050811]',
    glowColor: 'rgba(67, 97, 238, 0.25)'
  },
  {
    index: 1,
    year: '8 April 2022',
    badge: 'Provisional Charter',
    title: 'Rotary International Provisional Approval',
    desc: 'The Rotary International Board officially approved the strategic plan to reorganize expansive District 9125 into two sovereign, localized districts upon meeting growth criteria.',
    theme: 'Strategic Resolution',
    leader: 'RI Board of Directors',
    stats: 'Bifurcation Roadmap Passed',
    accentColor: '#7C3AED',
    bgGradient: 'from-[#140E26] via-[#0E0A1D] to-[#070510]',
    glowColor: 'rgba(124, 58, 237, 0.25)'
  },
  {
    index: 2,
    year: 'April 2024',
    badge: 'Final Ratification',
    title: 'Full RI Board Ratification',
    desc: 'During the "Create Hope in the World" Rotary year led by 15th DRR Rtr. PP Adebayo Sodiq Babatunde (PHF+1), the RI Board granted final approval creating District 9126 and District 9127.',
    theme: 'Create Hope in the World',
    leader: 'Rtr. PP Adebayo Sodiq (15th DRR)',
    stats: 'Sovereign Ratification Achieved',
    accentColor: '#6366F1',
    bgGradient: 'from-[#0E1528] via-[#0A0F1E] to-[#060914]',
    glowColor: 'rgba(99, 102, 241, 0.25)'
  },
  {
    index: 3,
    year: '1 July 2024',
    badge: 'Historic Inception',
    title: 'Official Birth of District 9126',
    desc: 'District 9126 officially began its sovereign journey, establishing autonomous governance over 7 constituent states: Osun, Oyo, Ondo, Ekiti, Kwara, Niger, and Kogi.',
    theme: 'The Sovereign Inception',
    leader: 'Autonomous District Assembly',
    stats: '7 Constituent States Demarcated',
    accentColor: '#D91B5C',
    bgGradient: 'from-[#220B15] via-[#16070E] to-[#0B0307]',
    glowColor: 'rgba(217, 27, 92, 0.25)'
  },
  {
    index: 4,
    year: '2024 – 2025',
    badge: 'Inaugural Year',
    title: 'Foundation Era (DRR Oyewumi Kamaldeen)',
    desc: 'The 1st administration under "The Magic of Rotary" established district infrastructure, governance protocols, constitution drafting, and inter-state club alignment.',
    theme: 'The Magic of Rotary',
    leader: 'Rtr. PP Oyewumi Kamaldeen Adeshina',
    stats: '77 Clubs Aligned · First Assembly',
    accentColor: '#981132',
    bgGradient: 'from-[#200A13] via-[#15060C] to-[#0A0306]',
    glowColor: 'rgba(152, 17, 50, 0.25)'
  },
  {
    index: 5,
    year: '2026 – 2027',
    badge: 'Sitting Era',
    title: 'Creating Lasting Impact (DRR Adaramoye Iyanuoluwa)',
    desc: 'Today, the 3rd administration coordinates 77 chartered clubs and ~700 Rotaractors with verified sovereign digital IDs, automated dues, maternal health outreach, and flagship innovation institutes.',
    theme: 'Creating Lasting Impact',
    leader: 'Rtr. PP Adaramoye Iyanuoluwa (Sitting DRR)',
    stats: '700+ Verified Members · 7 States',
    accentColor: '#D4A520',
    bgGradient: 'from-[#21180A] via-[#161006] to-[#0C0803]',
    glowColor: 'rgba(212, 165, 32, 0.35)',
    isSitting: true
  }
];

function StackingEraCard({
  era,
  index,
  total,
  scrollYProgress
}: {
  era: EraCardData;
  index: number;
  total: number;
  scrollYProgress: any;
}) {
  const topOffset = 110 + index * 24;

  return (
    <div 
      className="sticky w-full"
      style={{
        top: `${topOffset}px`,
        marginBottom: index === total - 1 ? '0px' : '40px'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, margin: '-50px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`relative w-full rounded-[28px] p-7 sm:p-9 lg:p-11 border transition-all duration-300 backdrop-blur-2xl shadow-[0_24px_60px_rgba(0,0,0,0.45)] overflow-hidden bg-gradient-to-br ${era.bgGradient}`}
        style={{
          borderColor: era.isSitting ? 'rgba(212, 165, 32, 0.4)' : 'rgba(255, 255, 255, 0.1)',
          boxShadow: `0 24px 60px rgba(0,0,0,0.5), 0 0 40px ${era.glowColor}`
        }}
      >
        {/* Subtle Ambient Watermark Glow */}
        <div 
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-40"
          style={{ background: era.accentColor }}
        />

        {/* Rotary Watermark on Sitting Era */}
        {era.isSitting && (
          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none hidden md:block">
            <img src="/images/rotaract-logo.png" alt="Rotary" className="w-72 h-72 object-contain" />
          </div>
        )}

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Left Column: Era Index, Badge & Narrative */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Top Badge & Era Number */}
            <div className="flex items-center gap-3 flex-wrap">
              <span 
                className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-[0.16em] border shadow-sm flex items-center gap-1.5"
                style={{
                  color: era.accentColor,
                  borderColor: `${era.accentColor}40`,
                  backgroundColor: `${era.accentColor}18`
                }}
              >
                {era.isSitting && <Sparkles size={13} className="animate-spin" style={{ animationDuration: '6s' }} />}
                {era.badge}
              </span>

              <span className="text-xs font-bold text-white/50 font-mono tracking-wider">
                {era.year}
              </span>

              {era.isSitting && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40 animate-pulse">
                  Current Administration
                </span>
              )}
            </div>

            {/* Era Title */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              {era.title}
            </h3>

            {/* Narrative Description */}
            <p className="text-white/70 text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
              {era.desc}
            </p>

            {/* Official Record Seal */}
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold" style={{ color: era.accentColor }}>
              <CheckCircle2 size={15} />
              <span>Official Rotary International District 9126 Archive</span>
            </div>

          </div>

          {/* Right Column: Key Details Matrix Card */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md space-y-3.5">
              
              <div>
                <div className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-0.5">
                  Rotary Year Theme
                </div>
                <div className="text-sm font-black text-white">
                  &quot;{era.theme}&quot;
                </div>
              </div>

              <div className="w-full h-px bg-white/[0.08]" />

              <div>
                <div className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-0.5">
                  Leadership Key
                </div>
                <div className="text-xs font-bold text-white/80">
                  {era.leader}
                </div>
              </div>

              <div className="w-full h-px bg-white/[0.08]" />

              <div>
                <div className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-0.5">
                  Territorial / Metric Milestone
                </div>
                <div className="text-xs font-bold text-[#F7A81B]">
                  {era.stats}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Step Progress Tracker at Card Bottom */}
        <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-white/40">
          <span className="font-mono">
            Milestone {index + 1} of {total}
          </span>
          <span className="flex items-center gap-1 font-semibold" style={{ color: era.accentColor }}>
            {index < total - 1 ? 'Scroll down for next era' : 'Sitting Sovereign Administration'} 
            {index < total - 1 ? <ChevronDown size={13} className="animate-bounce" /> : <Award size={13} />}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default function InteractiveTimelineStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={containerRef} className="relative py-16 max-w-5xl mx-auto px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#981132]/10 border border-[#981132]/25 text-[#981132] text-xs font-black uppercase tracking-[0.2em] mb-4">
          <History size={14} />
          <span>Interactive Chronological Journey</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#1C1C1E] leading-tight">
          The Journey Towards <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#981132] via-[#D91B5C] to-[#D4A520]">
            Redistricting & Sovereignty
          </span>
        </h2>

        <p className="text-gray-600 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
          Scroll down through our evolutionary history. Watch each era slide and stack on top of each other until arriving at the Sitting 3rd Administration.
        </p>
      </div>

      {/* Interactive Sticky Stacking Cards Container */}
      <div className="relative space-y-12 pb-24">
        {TIMELINE_ERAS.map((era, index) => (
          <StackingEraCard
            key={era.index}
            era={era}
            index={index}
            total={TIMELINE_ERAS.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
