'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Users, 
  Clock, 
  HeartHandshake, 
  DollarSign, 
  Sparkles,
  TrendingUp,
  BarChart3,
  Image as ImageIcon,
  Maximize2,
  X
} from 'lucide-react';
import CountUp from '@/components/ui/CountUp';

interface MetricSlice {
  id: string;
  label: string;
  valueDisplay: string;
  numericVal: number;
  suffix?: string;
  prefix?: string;
  subtext: string;
  color: string;
  accentBg: string;
  icon: React.ElementType;
}

interface MonthData {
  id: 'july' | 'august' | 'september';
  title: string;
  tag: string;
  image: string;
  metrics: MetricSlice[];
  soFar: {
    projects: { val: string; num: number };
    spent: { val: string; num: number; prefix?: string };
    hours: { val: string; num: number; suffix?: string };
    beneficiaries: { val: string; num: number };
    trf: { val: string; num: number; prefix?: string };
    clubs: { val: string; num: number };
  };
}

const MONTH_DATA: Record<'july' | 'august' | 'september', MonthData> = {
  july: {
    id: 'july',
    title: 'July Impact Meter',
    tag: 'Month 01 - Foundation',
    image: '/images/reports/july-impact-meter.png',
    metrics: [
      {
        id: 'projects',
        label: 'Projects Executed',
        valueDisplay: '10',
        numericVal: 10,
        subtext: 'Kickoff community initiatives launched across District 9126',
        color: '#D91B5C',
        accentBg: 'rgba(217, 27, 92, 0.1)',
        icon: CheckCircle2,
      },
      {
        id: 'beneficiaries',
        label: 'Beneficiaries Reached',
        valueDisplay: '516',
        numericVal: 516,
        subtext: 'Direct individuals supported through initial maternal & youth outreach',
        color: '#F7A81B',
        accentBg: 'rgba(247, 168, 27, 0.1)',
        icon: Users,
      },
      {
        id: 'spent',
        label: 'Spent on Projects',
        valueDisplay: '₦1,394,100',
        numericVal: 1394100,
        prefix: '₦',
        subtext: 'Capital deployed into direct grassroots community projects',
        color: '#005DAA',
        accentBg: 'rgba(0, 93, 170, 0.1)',
        icon: DollarSign,
      },
      {
        id: 'hours',
        label: 'Man-Hours Volunteered',
        valueDisplay: '590',
        numericVal: 590,
        suffix: ' hrs',
        subtext: '590 hours donated by Rotaractors on the ground',
        color: '#981132',
        accentBg: 'rgba(152, 17, 50, 0.1)',
        icon: Clock,
      },
      {
        id: 'trf',
        label: 'Donated to TRF',
        valueDisplay: '$590 / ₦720,000',
        numericVal: 720000,
        prefix: '₦',
        subtext: '$590 USD contributed directly to The Rotary Foundation',
        color: '#009688',
        accentBg: 'rgba(0, 150, 136, 0.1)',
        icon: HeartHandshake,
      },
    ],
    soFar: {
      projects: { val: '10', num: 10 },
      spent: { val: '₦1,394,100', num: 1394100, prefix: '₦' },
      hours: { val: '590', num: 590, suffix: ' hrs' },
      beneficiaries: { val: '516', num: 516 },
      trf: { val: '$590 / ₦720,000', num: 720000, prefix: '₦' },
      clubs: { val: '78', num: 78 },
    },
  },
  august: {
    id: 'august',
    title: 'August Impact Meter',
    tag: 'Month 02 - Acceleration',
    image: '/images/reports/august-impact-meter.png',
    metrics: [
      {
        id: 'projects',
        label: 'Projects Executed',
        valueDisplay: '7',
        numericVal: 7,
        subtext: 'Multi-club collaborative initiatives executed across zones',
        color: '#D91B5C',
        accentBg: 'rgba(217, 27, 92, 0.1)',
        icon: CheckCircle2,
      },
      {
        id: 'beneficiaries',
        label: 'Beneficiaries Reached',
        valueDisplay: '2,922',
        numericVal: 2922,
        subtext: 'Broad community reach through health, water & education campaigns',
        color: '#F7A81B',
        accentBg: 'rgba(247, 168, 27, 0.1)',
        icon: Users,
      },
      {
        id: 'spent',
        label: 'Spent on Projects',
        valueDisplay: '₦5,154,275',
        numericVal: 5154275,
        prefix: '₦',
        subtext: 'Substantial community capital mobilized across the 7 states',
        color: '#005DAA',
        accentBg: 'rgba(0, 93, 170, 0.1)',
        icon: DollarSign,
      },
      {
        id: 'hours',
        label: 'Man-Hours Volunteered',
        valueDisplay: '3,263',
        numericVal: 3263,
        suffix: ' hrs',
        subtext: '3,263 dedicated hours by youth leaders and volunteers',
        color: '#981132',
        accentBg: 'rgba(152, 17, 50, 0.1)',
        icon: Clock,
      },
      {
        id: 'trf',
        label: 'Donated to TRF',
        valueDisplay: '$246 / ₦344,400',
        numericVal: 344400,
        prefix: '₦',
        subtext: '$246 USD donated to TRF funds and Polio eradication',
        color: '#009688',
        accentBg: 'rgba(0, 150, 136, 0.1)',
        icon: HeartHandshake,
      },
    ],
    soFar: {
      projects: { val: '17', num: 17 },
      spent: { val: '₦6,548,375', num: 6548375, prefix: '₦' },
      hours: { val: '3,853', num: 3853, suffix: ' hrs' },
      beneficiaries: { val: '3,514', num: 3514 },
      trf: { val: '$836 / ₦1,064,400', num: 1064400, prefix: '₦' },
      clubs: { val: '3', num: 3 },
    },
  },
  september: {
    id: 'september',
    title: 'September Impact Meter',
    tag: 'Quarter 1 Verified',
    image: '/images/reports/september-impact-meter.png',
    metrics: [
      {
        id: 'projects',
        label: 'Projects Executed',
        valueDisplay: '21',
        numericVal: 21,
        subtext: 'Record-setting monthly projects executed across chartered clubs',
        color: '#D91B5C',
        accentBg: 'rgba(217, 27, 92, 0.1)',
        icon: CheckCircle2,
      },
      {
        id: 'beneficiaries',
        label: 'Beneficiaries Reached',
        valueDisplay: '2,513',
        numericVal: 2513,
        subtext: 'Direct lives impacted via healthcare, education & outreach',
        color: '#F7A81B',
        accentBg: 'rgba(247, 168, 27, 0.1)',
        icon: Users,
      },
      {
        id: 'spent',
        label: 'Spent on Projects',
        valueDisplay: '₦799,750',
        numericVal: 799750,
        prefix: '₦',
        subtext: 'Directly mobilized and deployed into community transformation',
        color: '#005DAA',
        accentBg: 'rgba(0, 93, 170, 0.1)',
        icon: DollarSign,
      },
      {
        id: 'hours',
        label: 'Man-Hours Volunteered',
        valueDisplay: '666.45',
        numericVal: 666,
        suffix: ' hrs',
        subtext: '666.45 recorded hours devoted selflessly by active Rotaractors',
        color: '#981132',
        accentBg: 'rgba(152, 17, 50, 0.1)',
        icon: Clock,
      },
      {
        id: 'trf',
        label: 'Donated to TRF',
        valueDisplay: '$318 / ₦426,756',
        numericVal: 426756,
        prefix: '₦',
        subtext: '$318 USD donated directly to The Rotary Foundation',
        color: '#009688',
        accentBg: 'rgba(0, 150, 136, 0.1)',
        icon: HeartHandshake,
      },
    ],
    soFar: {
      projects: { val: '38', num: 38 },
      spent: { val: '₦7,348,125', num: 7348125, prefix: '₦' },
      hours: { val: '4,519.45', num: 4519, suffix: ' hrs' },
      beneficiaries: { val: '6,027', num: 6027 },
      trf: { val: '$1,154 / ₦1,491,156', num: 1491156, prefix: '₦' },
      clubs: { val: '3', num: 3 },
    },
  },
};

export default function InteractiveImpactMeter() {
  const [selectedMonth, setSelectedMonth] = useState<'july' | 'august' | 'september'>('september');
  // viewMode controls whether the official poster image or interactive statistics dial is shown
  const [viewMode, setViewMode] = useState<'poster' | 'stats'>('poster');
  const [activeSlice, setActiveSlice] = useState<string>('projects');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const month = MONTH_DATA[selectedMonth];
  const currentMetric = month.metrics.find((m) => m.id === activeSlice) || month.metrics[0];

  return (
    <div className="w-full">
      {/* 1. TOP TOOLBAR: Month Selector Tabs + View Mode Toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        
        {/* Month Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-white/80 border border-black/10 shadow-sm">
          {(['july', 'august', 'september'] as const).map((m) => {
            const isSelected = selectedMonth === m;
            return (
              <button
                key={m}
                onClick={() => {
                  setSelectedMonth(m);
                  // Default to first metric when switching
                  setActiveSlice('projects');
                }}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold font-sans uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[#981132] text-white shadow-[0_4px_16px_rgba(152,17,50,0.35)] scale-105'
                    : 'text-black/60 hover:text-black hover:bg-black/5'
                }`}
              >
                {m === 'september' ? '★ September' : m === 'august' ? 'August' : 'July'}
              </button>
            );
          })}
        </div>

        {/* View Switcher: Official Poster vs Interactive Statistics */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/[0.04] border border-black/[0.08]">
          <button
            onClick={() => setViewMode('poster')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold font-sans transition-all cursor-pointer ${
              viewMode === 'poster'
                ? 'bg-white text-[#981132] shadow-md shadow-black/5'
                : 'text-black/60 hover:text-black'
            }`}
          >
            <ImageIcon size={14} />
            <span>Official Poster</span>
          </button>

          <button
            onClick={() => setViewMode('stats')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold font-sans transition-all cursor-pointer ${
              viewMode === 'stats'
                ? 'bg-gradient-to-r from-[#981132] to-[#D91B5C] text-white shadow-md shadow-[#981132]/25'
                : 'text-black/60 hover:text-black'
            }`}
          >
            <BarChart3 size={14} />
            <span>Interactive Statistics</span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          </button>
        </div>
      </div>

      {/* 2. MAIN DISPLAY CONTAINER */}
      <AnimatePresence mode="wait">
        {viewMode === 'poster' ? (
          /* ================= MODE A: OFFICIAL POSTER IMAGE DISPLAY ================= */
          <motion.div
            key={`poster-${selectedMonth}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="relative max-w-3xl mx-auto rounded-3xl lg:rounded-[36px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-black/10 bg-white p-4 sm:p-6"
          >
            {/* Header Strip with Zoom and Switch Action */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/[0.06]">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#981132] animate-pulse" />
                <h4 className="text-sm sm:text-base font-black font-sans text-[#1C1C1E]">
                  {month.title} (Official Infographic)
                </h4>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#981132]/10 text-[#981132]">
                  {month.tag}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLightboxImage(month.image)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-black/70 hover:text-black bg-black/[0.04] hover:bg-black/[0.08] transition-colors cursor-pointer"
                  title="Expand to Fullscreen"
                >
                  <Maximize2 size={13} />
                  <span className="hidden sm:inline">Fullscreen</span>
                </button>
                <button
                  onClick={() => setViewMode('stats')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-[#981132] hover:bg-[#7D0E29] shadow-sm transition-all cursor-pointer"
                >
                  <BarChart3 size={13} />
                  <span>Show Statistics</span>
                </button>
              </div>
            </div>

            {/* Poster Image Container */}
            <div 
              onClick={() => setLightboxImage(month.image)}
              className="group relative rounded-2xl overflow-hidden cursor-zoom-in bg-[#F8F5F2] flex items-center justify-center"
            >
              <img
                src={month.image}
                alt={month.title}
                className="w-full h-auto max-h-[720px] object-contain transition-transform duration-500 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="px-4 py-2 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-bold font-sans shadow-lg flex items-center gap-2">
                  <Maximize2 size={14} /> Click to Expand
                </span>
              </div>
            </div>

            {/* Quick Teaser Footer */}
            <div className="mt-4 pt-4 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <p className="text-xs text-black/60 font-sans">
                Want to interact with each metric individually?
              </p>
              <button
                onClick={() => setViewMode('stats')}
                className="text-xs font-black text-[#981132] hover:text-[#D91B5C] font-sans inline-flex items-center gap-1 cursor-pointer"
              >
                Launch {month.title.split(' ')[0]} Interactive Dial →
              </button>
            </div>
          </motion.div>
        ) : (
          /* ================= MODE B: ANIMATED INTERACTIVE STATISTICS ================= */
          <motion.div
            key={`stats-${selectedMonth}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45 }}
            className="relative rounded-3xl lg:rounded-[36px] bg-gradient-to-br from-white via-[#FCF9F7] to-[#F5ECE8] border border-[#981132]/15 shadow-[0_24px_70px_rgba(152,17,50,0.12)] p-6 sm:p-10 lg:p-12 overflow-hidden"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#D91B5C]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F7A81B]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 mb-8 border-b border-black/[0.08]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#981132] to-[#D91B5C] flex items-center justify-center text-white shadow-md shadow-[#981132]/30">
                  <Sparkles size={22} className="animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#981132] font-sans">
                    Official District Metrics
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black font-sans text-[#1C1C1E] tracking-tight">
                    {month.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('poster')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#981132] bg-[#981132]/10 hover:bg-[#981132]/15 border border-[#981132]/20 transition-all cursor-pointer"
                >
                  <ImageIcon size={13} />
                  <span>Show Poster Image</span>
                </button>
                <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {month.tag} ✓
                </span>
              </div>
            </div>

            {/* INTERACTIVE DISPLAY: 5-Segment Dial + Active Metric Dossier */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* LEFT / CENTER: Animated Radial Wheel Gauge (7 cols) */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
                <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] flex items-center justify-center">
                  
                  {/* Outer rotating pulse ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-[#981132]/20 pointer-events-none"
                  />

                  {/* Outer Glow Ring */}
                  <div 
                    className="absolute inset-3 rounded-full transition-all duration-700 blur-xl pointer-events-none opacity-40"
                    style={{ backgroundColor: currentMetric.color }}
                  />

                  {/* SVG Segment Rings for the 5 Metrics */}
                  <svg className="w-full h-full -rotate-90 relative z-10" viewBox="0 0 200 200">
                    {month.metrics.map((slice, i) => {
                      const strokeWidth = activeSlice === slice.id ? 14 : 9;
                      const radius = 78;
                      const circumference = 2 * Math.PI * radius;
                      const segmentLength = circumference / 5;
                      const strokeDasharray = `${segmentLength - 4} 4`;
                      const strokeDashoffset = -i * segmentLength;
                      const isSelected = activeSlice === slice.id;

                      return (
                        <circle
                          key={slice.id}
                          cx="100"
                          cy="100"
                          r={radius}
                          fill="transparent"
                          stroke={slice.color}
                          strokeWidth={strokeWidth}
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          className="transition-all duration-500 cursor-pointer"
                          style={{
                            filter: isSelected ? `drop-shadow(0 0 8px ${slice.color})` : 'none',
                            opacity: isSelected ? 1 : 0.45,
                          }}
                          onClick={() => setActiveSlice(slice.id)}
                        />
                      );
                    })}
                  </svg>

                  {/* Center Hub Display */}
                  <div className="absolute inset-[62px] sm:inset-[76px] rounded-full bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-black/10 flex flex-col items-center justify-center p-4 text-center z-20 overflow-hidden">
                    <motion.div
                      key={`${selectedMonth}-${currentMetric.id}`}
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="flex flex-col items-center"
                    >
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center mb-1 transition-colors"
                        style={{ backgroundColor: currentMetric.accentBg, color: currentMetric.color }}
                      >
                        <currentMetric.icon size={18} />
                      </div>

                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-black/50 font-sans">
                        {month.title.split(' ')[0]} Impact
                      </span>

                      <div
                        className="text-2xl sm:text-3xl font-black font-sans leading-none my-1 tracking-tight"
                        style={{ color: currentMetric.color }}
                      >
                        {currentMetric.id === 'hours' && selectedMonth === 'september' ? (
                          '666.45'
                        ) : currentMetric.id === 'trf' && selectedMonth === 'september' ? (
                          '$318'
                        ) : (
                          <CountUp
                            end={currentMetric.numericVal}
                            prefix={currentMetric.prefix || ''}
                            suffix={currentMetric.suffix || ''}
                            duration={1400}
                          />
                        )}
                      </div>

                      <span className="text-[10px] font-bold text-black/70 font-sans max-w-[130px] line-clamp-1">
                        {currentMetric.label}
                      </span>
                    </motion.div>
                  </div>
                </div>

                <p className="text-[11px] font-medium text-black/50 mt-4 text-center font-sans">
                  Tap any segment or list card to explore individual audited metrics.
                </p>
              </div>

              {/* RIGHT: Active Metric Dossier & Quick Selector List (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                {month.metrics.map((slice) => {
                  const isSelected = activeSlice === slice.id;
                  const IconComponent = slice.icon;

                  return (
                    <motion.div
                      key={slice.id}
                      onClick={() => setActiveSlice(slice.id)}
                      whileHover={{ x: 4 }}
                      className={`p-3.5 sm:p-4 rounded-2xl cursor-pointer transition-all duration-300 border flex items-center justify-between ${
                        isSelected
                          ? 'bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] scale-[1.02]'
                          : 'bg-white/50 hover:bg-white/90 border-black/[0.06] opacity-75 hover:opacity-100'
                      }`}
                      style={{
                        borderColor: isSelected ? slice.color : undefined,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                          style={{
                            backgroundColor: slice.accentBg,
                            color: slice.color,
                          }}
                        >
                          <IconComponent size={20} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#1C1C1E] font-sans">
                            {slice.label}
                          </div>
                          <div className="text-[11px] text-black/50 font-sans mt-0.5 max-w-[210px] sm:max-w-[260px] truncate">
                            {slice.subtext}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div
                          className="text-base sm:text-lg font-black font-sans leading-none"
                          style={{ color: slice.color }}
                        >
                          {slice.valueDisplay}
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-black/40 font-sans">
                          Verified
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* LOWER SECTION: CUMULATIVE TRACKER ("OUR 2026/2027 SO FAR") */}
            <div className="mt-12 pt-8 border-t border-black/[0.08]">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
                <div className="flex items-center gap-2">
                  <TrendingUp size={18} className="text-[#981132]" />
                  <h5 className="text-sm sm:text-base font-black font-sans text-[#1C1C1E] uppercase tracking-wider">
                    Our 2026/2027 So Far (Cumulative to {month.title.split(' ')[0]})
                  </h5>
                </div>
                <span className="text-[11px] font-semibold text-black/50 font-sans">
                  Audited District Milestone
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {/* 1. Projects */}
                <div className="rounded-2xl p-4 text-white text-center flex flex-col justify-between shadow-md bg-[#D91B5C]">
                  <div className="text-lg sm:text-xl font-black font-sans tracking-tight mb-1">
                    <CountUp end={month.soFar.projects.num} duration={1400} />
                  </div>
                  <div className="text-[9.5px] font-bold uppercase tracking-wider leading-tight text-white/85 font-sans">
                    Projects Executed
                  </div>
                </div>

                {/* 2. Spent */}
                <div className="rounded-2xl p-4 text-white text-center flex flex-col justify-between shadow-md bg-[#005DAA]">
                  <div className="text-lg sm:text-xl font-black font-sans tracking-tight mb-1">
                    <CountUp end={month.soFar.spent.num} prefix={month.soFar.spent.prefix || ''} duration={1600} />
                  </div>
                  <div className="text-[9.5px] font-bold uppercase tracking-wider leading-tight text-white/85 font-sans">
                    Spent on Projects
                  </div>
                </div>

                {/* 3. Hours */}
                <div className="rounded-2xl p-4 text-white text-center flex flex-col justify-between shadow-md bg-[#981132]">
                  <div className="text-lg sm:text-xl font-black font-sans tracking-tight mb-1">
                    {selectedMonth === 'september' ? '4,519.45' : (
                      <CountUp end={month.soFar.hours.num} suffix={month.soFar.hours.suffix || ''} duration={1500} />
                    )}
                  </div>
                  <div className="text-[9.5px] font-bold uppercase tracking-wider leading-tight text-white/85 font-sans">
                    Man Hours Volunteered
                  </div>
                </div>

                {/* 4. Beneficiaries */}
                <div className="rounded-2xl p-4 text-white text-center flex flex-col justify-between shadow-md bg-[#F7A81B]">
                  <div className="text-lg sm:text-xl font-black font-sans tracking-tight mb-1">
                    <CountUp end={month.soFar.beneficiaries.num} duration={1600} />
                  </div>
                  <div className="text-[9.5px] font-bold uppercase tracking-wider leading-tight text-white/85 font-sans">
                    Beneficiaries Reached
                  </div>
                </div>

                {/* 5. TRF */}
                <div className="rounded-2xl p-4 text-white text-center flex flex-col justify-between shadow-md bg-[#009688]">
                  <div className="text-lg sm:text-xl font-black font-sans tracking-tight mb-1">
                    {month.soFar.trf.val}
                  </div>
                  <div className="text-[9.5px] font-bold uppercase tracking-wider leading-tight text-white/85 font-sans">
                    Donated to TRF
                  </div>
                </div>

                {/* 6. Clubs */}
                <div className="rounded-2xl p-4 text-white text-center flex flex-col justify-between shadow-md bg-[#111827]">
                  <div className="text-lg sm:text-xl font-black font-sans tracking-tight mb-1">
                    {month.soFar.clubs.val}
                  </div>
                  <div className="text-[9.5px] font-bold uppercase tracking-wider leading-tight text-white/85 font-sans">
                    New Clubs Chartered
                  </div>
                </div>
              </div>

              {/* DRR Signature Footer */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-black/[0.06] text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/leaders/drr-adaramoye-iyanuoluwa.jpg"
                    alt="DRR Adaramoye Iyanuoluwa"
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#981132]"
                  />
                  <div>
                    <div className="text-xs font-black text-[#1C1C1E] font-sans">
                      Rtr. Adaramoye Iyanuoluwa AdukeAdee, PHF
                    </div>
                    <div className="text-[10px] text-black/60 font-sans">
                      District Rotaract Representative, District 9126
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-[#981132] font-sans">
                  <span className="w-2 h-2 rounded-full bg-[#981132] animate-ping" />
                  Create Lasting Impact 2026/2027
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-[1000] flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
              <div className="overflow-auto p-2">
                <img
                  src={lightboxImage}
                  alt="Official Impact Meter Poster"
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
