'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const rawKey = acronym || term || '';
  const targetKey = rawKey.toUpperCase();
  const info = ROTARY_ACRONYMS[targetKey] || {
    term: rawKey,
    definition: 'Rotary International & District 9126 Leadership Designation',
    category: 'Rotary Standard',
  };

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
      role="tooltip"
      aria-label={`${rawKey}: ${info.term}`}
    >
      <span className="border-b border-dotted border-current cursor-help hover:text-[#D91B5C] transition-colors">
        {children || rawKey}
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 sm:w-72 p-3.5 rounded-2xl bg-[#0F1624] border border-white/20 text-white shadow-2xl backdrop-blur-xl z-50 text-left pointer-events-none"
            style={{
              boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.7), 0 0 15px rgba(217, 27, 92, 0.25)',
            }}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#D91B5C]/20 text-[#FF4D8D] border border-[#D91B5C]/30">
                {info.category || 'Rotary Acronym'}
              </span>
              <span className="text-[10px] font-mono text-[#D4A520] font-bold">{rawKey}</span>
            </div>

            <div className="font-bold text-xs text-white leading-tight mb-1">{info.term}</div>
            <p className="text-[11px] text-slate-300 leading-snug font-normal">{info.definition}</p>

            {/* Triangle pointer */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-[#0F1624]" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

/**
 * Helper component to automatically parse and wrap recognized Rotary acronyms inside text strings.
 */
export function FormatRotaryText({ text, className = '' }: { text: string; className?: string }) {
  const regex = /\b(IPDRR|DRR|PHF\+1|PHF|PP|CB|DISCON|FEIPA)\b/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const token = match[0];
    parts.push(
      <RotaryTooltip key={match.index} acronym={token}>
        {token}
      </RotaryTooltip>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return <span className={className}>{parts}</span>;
}
