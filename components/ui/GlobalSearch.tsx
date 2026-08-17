'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, History, Building2, MapPin, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_CHIPS = [
  'Oyo State clubs',
  'Vaccination project',
  'District Directory',
  'Leadership Summit',
  'Dues Clearance',
];

const SEARCH_DIRECTORIES = [
  {
    title: 'Clubs Directory & Meeting Places',
    category: 'District Clubs',
    href: '/clubs',
    icon: Building2,
    desc: 'Browse 77 chartered clubs across 7 constituent states',
  },
  {
    title: 'Prospective Member Registration',
    category: 'Membership',
    href: '/join',
    icon: ShieldCheck,
    desc: 'Submit your intake application to join a local club',
  },
  {
    title: 'District Heritage & DRR Lineage',
    category: 'Archives',
    href: '/heritage',
    icon: History,
    desc: 'Explore historical leadership succession from 2023 to 2027',
  },
  {
    title: 'Flagship Humanitarian Projects',
    category: 'Impact',
    href: '/projects',
    icon: HeartHandshake,
    desc: 'Operation Vaccinate 500, Clean Water Offa, Digital Skills',
  },
  {
    title: 'President Administration Console',
    category: 'Governance',
    href: '/portal/president',
    icon: MapPin,
    desc: '1-click dues clearance & candidate Kanban pipeline',
  },
];

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');

  // Handle ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Toggle modal
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredItems = SEARCH_DIRECTORIES.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[3000] flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#080C14]/80 backdrop-blur-md"
          />

          {/* Modal Card (Figma Node 2:281) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-[#0A0E1A]/95 border border-white/15 rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden z-10 flex flex-col"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-5 py-4 border-b border-white/10 gap-3">
              <Search className="h-5 w-5 text-slate-400 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search members, clubs, projects, or district resources..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded-md text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-mono text-slate-400 border border-white/10">
                ESC
              </kbd>
            </div>

            {/* Quick Chips */}
            {!query && (
              <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2 overflow-x-auto text-xs">
                <span className="text-[11px] text-slate-500 font-semibold shrink-0">Recent:</span>
                {QUICK_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setQuery(chip)}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-[11px] shrink-0 border border-white/5 transition"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Results Feed */}
            <div className="p-3 max-h-[380px] overflow-y-auto space-y-1.5">
              {filteredItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-white/[0.06] transition group text-left"
                  >
                    <div className="h-9 w-9 rounded-xl bg-white/5 group-hover:bg-[#981132] text-slate-300 group-hover:text-white flex items-center justify-center shrink-0 transition">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#F87171] transition truncate">
                          {item.title}
                        </h4>
                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider ml-2">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 truncate">{item.desc}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-white shrink-0 mt-2 transition" />
                  </Link>
                );
              })}

              {filteredItems.length === 0 && (
                <div className="py-12 text-center text-slate-500 text-xs">
                  No district resources found matching &ldquo;{query}&rdquo;
                </div>
              )}
            </div>

            {/* Keyboard Footer */}
            <div className="px-5 py-3 bg-white/[0.02] border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-4">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold text-slate-400">District 9126 Live Sync</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
