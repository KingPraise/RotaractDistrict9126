'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

export const ROTARY_ACRONYMS: Record<string, { term: string; definition: string; category?: string }> = {
  DRR: {
    term: 'District Rotaract Representative',
    definition: 'The chief executive and presiding officer of Rotaract District 9126, coordinating all 77 clubs.',
    category: 'District Leadership',
  },
  IPDRR: {
    term: 'Immediate Past DRR',
    definition: 'The immediate preceding District Rotaract Representative serving as chief executive advisor to the current administration.',
    category: 'District Leadership',
  },
  PHF: {
    term: 'Paul Harris Fellow',
    definition: 'Prestigious Rotary Foundation recognition awarded for substantial contributions and distinguished service to humanity.',
    category: 'Rotary Recognition',
  },
  'PHF+1': {
    term: 'Paul Harris Fellow (+1 Sapphire)',
    definition: 'Distinguished multi-tier recognition acknowledging extended exceptional contributions to The Rotary Foundation.',
    category: 'Rotary Recognition',
  },
  PP: {
    term: 'Past President',
    definition: 'A Rotaractor who has successfully completed a full tenure as president of a chartered Rotaract club.',
    category: 'Club Governance',
  },
  CB: {
    term: 'Community Based',
    definition: 'A community-based Rotaract club serving young professionals and non-campus residents across a municipality.',
    category: 'Club Classification',
  },
  DISCON: {
    term: 'District Conference',
    definition: 'The flagship annual gathering and convention uniting members and leaders across all constituent states of District 9126.',
    category: 'District Event',
  },
  FEIPA: {
    term: 'Fellow, Emergency & Crisis Risk Management',
    definition: 'Professional fellowship and leadership credential in crisis risk reduction and institutional disaster response.',
    category: 'Professional Honor',
  },
};

interface RotaryTooltipProps {
  acronym?: keyof typeof ROTARY_ACRONYMS | string;
  term?: keyof typeof ROTARY_ACRONYMS | string;
  children?: React.ReactNode;
  className?: string;
}

export default function RotaryTooltip({ acronym, term, children, className = '' }: RotaryTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const rawKey = (acronym || term || '').trim();
  const targetKey = rawKey.toUpperCase();
  const info = ROTARY_ACRONYMS[targetKey] || {
    term: rawKey,
    definition: 'Rotary International & District 9126 Leadership Designation',
    category: 'Rotary Standard',
  };

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  return (
    <span
      ref={containerRef}
      className={`relative inline-flex items-center gap-1 cursor-pointer ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
      }}
      tabIndex={0}
      role="button"
      aria-label={`${rawKey}: ${info.term}`}
    >
      <span className="border-b border-dotted border-current hover:text-[#D91B5C] transition-colors leading-tight">
        {children || rawKey}
      </span>
      <Info size={11} className="opacity-60 hover:opacity-100 transition-opacity text-[#D91B5C] shrink-0" />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-60 sm:w-68 p-3 rounded-xl bg-[#0A0E1A]/98 border border-white/20 text-white shadow-2xl backdrop-blur-2xl z-[9999] text-left pointer-events-auto"
            style={{
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(217, 27, 92, 0.3)',
            }}
          >
            {/* Downward Caret Arrow */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0A0E1A] border-r border-b border-white/20 rotate-45" />

            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#D91B5C]/25 text-[#FF4D8D] border border-[#D91B5C]/40">
                {info.category || 'Rotary Title'}
              </span>
              <span className="text-[10px] font-mono text-[#D4A520] font-bold">{rawKey}</span>
            </div>

            <div className="font-bold text-xs text-white leading-snug mb-1">{info.term}</div>

            <p className="text-[11px] text-slate-300 leading-relaxed font-normal">{info.definition}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

export function FormatRotaryText({ text }: { text: string }) {
  const parts = text.split(/\b(DRR|IPDRR|PHF\+1|PHF|PP|DISCON|FEIPA)\b/g);
  return (
    <>
      {parts.map((part, index) => {
        if (ROTARY_ACRONYMS[part]) {
          return (
            <RotaryTooltip key={index} acronym={part}>
              {part}
            </RotaryTooltip>
          );
        }
        return part;
      })}
    </>
  );
}
