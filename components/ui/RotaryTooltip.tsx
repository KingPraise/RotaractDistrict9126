'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Award } from 'lucide-react';
import { createPortal } from 'react-dom';

export const ROTARY_ACRONYMS: Record<string, { term: string; definition: string; category?: string }> = {
  DRR: {
    term: 'District Rotaract Representative',
    definition: 'The chief executive and presiding officer of Rotaract District 9126, coordinating all 77 chartered clubs across the 7 constituent states.',
    category: 'District Leadership',
  },
  IPDRR: {
    term: 'Immediate Past DRR',
    definition: 'The immediate preceding District Rotaract Representative who provides institutional memory, strategic counsel, and executive guidance to the sitting administration.',
    category: 'Executive Advisory',
  },
  PHF: {
    term: 'Paul Harris Fellow',
    definition: 'Prestigious Rotary Foundation recognition awarded to individuals who contribute $1,000+ or demonstrate substantial, life-changing service to humanity.',
    category: 'Rotary Recognition',
  },
  'PHF+1': {
    term: 'Paul Harris Fellow (+1 Sapphire)',
    definition: 'Distinguished multi-tier recognition acknowledging extended exceptional contributions and sustained service to The Rotary Foundation.',
    category: 'Rotary Recognition',
  },
  PP: {
    term: 'Past President',
    definition: 'A Rotaractor who has successfully led a chartered club for a full Rotary year, possessing seasoned executive and community governance experience.',
    category: 'Club Governance',
  },
  CB: {
    term: 'Community Based',
    definition: 'A community-based Rotaract club serving young professionals and non-campus residents across a municipality or city.',
    category: 'Club Classification',
  },
  DISCON: {
    term: 'District Conference',
    definition: 'The flagship annual gathering and convention uniting members and leaders across all constituent states of District 9126 for training, awards, and fellowship.',
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const rawKey = (acronym || term || '').trim();
  const targetKey = rawKey.toUpperCase();
  const info = ROTARY_ACRONYMS[targetKey] || {
    term: rawKey,
    definition: 'Rotary International & District 9126 Leadership Designation',
    category: 'Rotary Standard',
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }}
        className={`inline-flex items-center text-left cursor-pointer group/btn ${className}`}
        title={`Click for Rotary designation details: ${info.term}`}
      >
        <span className="border-b border-dotted border-[#D91B5C]/70 group-hover/btn:border-[#FF4D8D] group-hover/btn:text-[#FF4D8D] transition-colors leading-snug">
          {children || rawKey}
        </span>
      </button>

      {/* Clean Centered Modal Portal — Never clipped, never obscures card */}
      {mounted && isOpen && createPortal(
        <AnimatePresence>
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-md bg-[#0F1624] border border-white/20 rounded-2xl shadow-2xl p-6 text-white z-10 overflow-hidden"
              style={{
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 30px rgba(217, 27, 92, 0.25)',
              }}
            >
              {/* Header Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#981132] via-[#D91B5C] to-[#D4A520]" />
              
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              {/* Badges */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-[#D91B5C]/20 text-[#FF4D8D] border border-[#D91B5C]/40">
                  {info.category || 'Rotary Designation'}
                </span>
                <span className="text-xs font-mono font-bold text-[#D4A520] px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                  {rawKey}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-black text-white mb-2 leading-snug font-sans">
                {info.term}
              </h3>

              {/* Definition */}
              <p className="text-sm text-slate-300 leading-relaxed font-sans mb-5 bg-white/[0.04] p-3.5 rounded-xl border border-white/10">
                {info.definition}
              </p>

              {/* Footer Note */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-slate-400 font-sans">
                <span className="flex items-center gap-1.5 text-[#D4A520] font-medium">
                  <Shield size={13} /> Rotary District 9126 Protocol
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
                >
                  Dismiss
                </button>
              </div>

            </motion.div>
          </div>
        </AnimatePresence>,
        document.body
      )}
    </>
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
