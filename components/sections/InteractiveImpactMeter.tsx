'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Users, 
  Clock, 
  HeartHandshake, 
  DollarSign, 
  Award,
  Sparkles,
  TrendingUp,
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
  angle: number; // visual direction
}

const SEPT_METRICS: MetricSlice[] = [
  {
    id: 'projects',
    label: 'Projects Executed',
    valueDisplay: '21',
    numericVal: 21,
    subtext: 'High-impact community initiatives completed across D9126',
    color: '#D91B5C',
    accentBg: 'rgba(217, 27, 92, 0.1)',
    icon: CheckCircle2,
    angle: 330,
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
    angle: 30,
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
    angle: 90,
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
    angle: 180,
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
    angle: 240,
  },
];

const SO_FAR_METRICS = [
  {
    val: '38',
    num: 38,
    label: 'Projects Executed',
    color: '#D91B5C',
    bg: '#D91B5C',
  },
  {
    val: '₦7,348,125',
    num: 7348125,
    prefix: '₦',
    label: 'Spent on Projects',
    color: '#005DAA',
    bg: '#005DAA',
  },
  {
    val: '4,519.45',
    num: 4519,
    suffix: ' hrs',
    label: 'Man Hours Volunteered',
    color: '#981132',
    bg: '#981132',
  },
  {
    val: '6,027',
    num: 6027,
    label: 'Beneficiaries Reached',
    color: '#F7A81B',
    bg: '#F7A81B',
  },
  {
    val: '$1,154 / ₦1,491,156',
    num: 1491156,
    prefix: '₦',
    label: 'Donated to TRF',
    color: '#009688',
    bg: '#009688',
  },
  {
    val: '3',
    num: 3,
    label: 'New Clubs Chartered',
    color: '#111827',
    bg: '#111827',
  },
];

export default function InteractiveImpactMeter() {
  const [activeSlice, setActiveSlice] = useState<string>('projects');
  const [selectedMonth, setSelectedMonth] = useState<'july' | 'august' | 'september'>('september');
  const [showFullPoster, setShowFullPoster] = useState(false);

  const current = SEPT_METRICS.find((m) => m.id === activeSlice) || SEPT_METRICS[0];

  return (
    <div className="w-full">
      {/* Month Selector Pills */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {(['july', 'august', 'september'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setSelectedMonth(m)}
            className={`px-5 py-2 rounded-full text-xs font-bold font-sans uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              selectedMonth === m
                ? 'bg-[#981132] text-white shadow-[0_4px_16px_rgba(152,17,50,0.35)] scale-105'
                : 'bg-white/80 hover:bg-white text-black/60 hover:text-black border border-black/10'
            }`}
          >
            {m === 'september' ? '★ September 2026' : m === 'august' ? 'August 2026' : 'July 2026'}
          </button>
        ))}
      </div>

      {/* When July or August is selected, show their official report image */}
      {selectedMonth !== 'september' ? (
        <motion.div
          key={selectedMonth}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-black/10 bg-white"
        >
          <img
            src={`/images/reports/${selectedMonth}-impact-meter.png`}
            alt={`${selectedMonth} Impact Meter`}
            className="w-full h-auto object-contain"
          />
        </motion.div>
      ) : (
        /* SEPTEMBER: COOL INTERACTIVE ANIMATED METER */
        <motion.div
          key="september"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl lg:rounded-[36px] bg-gradient-to-br from-white via-[#FCF9F7] to-[#F5ECE8] border border-[#981132]/15 shadow-[0_24px_70px_rgba(152,17,50,0.12)] p-6 sm:p-10 lg:p-12 overflow-hidden"
        >
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D91B5C]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F7A81B]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Banner with DRR Seal */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 mb-8 border-b border-black/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#981132] to-[#D91B5C] flex items-center justify-center text-white shadow-md shadow-[#981132]/30">
                <Sparkles size={22} className="animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#981132] font-sans">
                  Official District Metric
                </span>
                <h4 className="text-xl sm:text-2xl font-black font-sans text-[#1C1C1E] tracking-tight">
                  September Impact Meter
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFullPoster(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#981132] bg-[#981132]/10 hover:bg-[#981132]/15 border border-[#981132]/20 transition-all cursor-pointer"
              >
                <Maximize2 size={13} />
                <span>View Full Poster</span>
              </button>
              <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Quarter 1 Verified ✓
              </span>
            </div>
          </div>

          {/* MAIN INTERACTIVE DISPLAY: Dial + Telemetry Card */}
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
                  style={{ backgroundColor: current.color }}
                />

                {/* SVG Segment Rings for the 5 Metrics */}
                <svg className="w-full h-full -rotate-90 relative z-10" viewBox="0 0 200 200">
                  {SEPT_METRICS.map((slice, i) => {
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
                    key={current.id}
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="flex flex-col items-center"
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center mb-1 transition-colors"
                      style={{ backgroundColor: current.accentBg, color: current.color }}
                    >
                      <current.icon size={18} />
                    </div>

                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-black/50 font-sans">
                      Sept Impact
                    </span>

                    <div
                      className="text-2xl sm:text-3xl font-black font-sans leading-none my-1 tracking-tight"
                      style={{ color: current.color }}
                    >
                      {current.id === 'hours' ? (
                        '666.45'
                      ) : current.id === 'trf' ? (
                        '$318'
                      ) : (
                        <CountUp
                          end={current.numericVal}
                          prefix={current.prefix || ''}
                          suffix={current.suffix || ''}
                          duration={1400}
                        />
                      )}
                    </div>

                    <span className="text-[10px] font-bold text-black/70 font-sans max-w-[130px] line-clamp-1">
                      {current.label}
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Helper Caption */}
              <p className="text-[11px] font-medium text-black/50 mt-4 text-center font-sans">
                Tap any segment or metric below to explore individual verified impact.
              </p>
            </div>

            {/* RIGHT: Active Metric Dossier & Quick Selector List (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {SEPT_METRICS.map((slice) => {
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

          {/* LOWER SECTION: "OUR 2026/2027 SO FAR" Cumulative Tracker */}
          <div className="mt-12 pt-8 border-t border-black/[0.08]">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-[#981132]" />
                <h5 className="text-sm sm:text-base font-black font-sans text-[#1C1C1E] uppercase tracking-wider">
                  Our 2026/2027 So Far (Cumulative Progress)
                </h5>
              </div>
              <span className="text-[11px] font-semibold text-black/50 font-sans">
                District 9126 Year-to-Date
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {SO_FAR_METRICS.map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06 }}
                  className="rounded-2xl p-4 text-white text-center flex flex-col justify-between shadow-md transition-transform hover:-translate-y-1"
                  style={{ backgroundColor: metric.bg }}
                >
                  <div className="text-lg sm:text-xl font-black font-sans tracking-tight mb-1">
                    {metric.num >= 1000 ? (
                      <CountUp
                        end={metric.num}
                        prefix={metric.prefix || ''}
                        suffix={metric.suffix || ''}
                        duration={1800}
                      />
                    ) : (
                      metric.val
                    )}
                  </div>
                  <div className="text-[9.5px] font-bold uppercase tracking-wider leading-tight text-white/85 font-sans">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* DRR Signature Footer Strip */}
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

      {/* FULL POSTER MODAL (LIGHTBOX) */}
      <AnimatePresence>
        {showFullPoster && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFullPoster(false)}
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
                onClick={() => setShowFullPoster(false)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
              <div className="overflow-auto p-2">
                <img
                  src="/images/reports/september-impact-meter.png"
                  alt="September 2026 Official Impact Meter Poster"
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
