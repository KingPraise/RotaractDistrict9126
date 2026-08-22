'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  History, 
  Building2, 
  MapPin, 
  ShieldCheck, 
  HeartHandshake, 
  ArrowRight,
  Sparkles,
  Layers,
  FileText,
  Activity,
  Users,
  Compass,
  Zap
} from 'lucide-react';
import Link from 'next/link';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_CHIPS = [
  { label: 'Oyo State clubs', icon: MapPin },
  { label: 'Vaccination project', icon: Zap },
  { label: 'Executive HQ', icon: Activity },
  { label: 'Leadership Summit', icon: Users },
  { label: 'Dues Clearance', icon: ShieldCheck },
];

const SEARCH_DIRECTORIES = [
  {
    title: 'Clubs Directory & Meeting Places',
    category: 'District Clubs',
    href: '/clubs',
    icon: Building2,
    desc: 'Browse 77 chartered clubs across 7 constituent states',
    badge: '77 Clubs',
    color: 'from-[#981132] to-[#D91B5C]',
  },
  {
    title: 'Prospective Member Registration',
    category: 'Membership',
    href: '/join',
    icon: ShieldCheck,
    desc: 'Submit your intake application to join a local club',
    badge: 'Direct WhatsApp',
    color: 'from-[#D91B5C] to-[#E11D48]',
  },
  {
    title: 'District Executive HQ Dashboard',
    category: 'Executive Portal',
    href: '/portal/executive',
    icon: Activity,
    desc: 'Club performance, fund aggregate telemetry & newsletter deployer',
    badge: 'Live Analytics',
    color: 'from-[#981132] to-[#7A0C27]',
  },
  {
    title: 'President Administration Console',
    category: 'Governance',
    href: '/portal/president',
    icon: MapPin,
    desc: '1-click dues clearance & candidate Kanban pipeline',
    badge: 'President Portal',
    color: 'from-[#D4A520] to-[#B8860B]',
  },
  {
    title: 'Flagship Humanitarian Projects',
    category: 'Impact',
    href: '/projects',
    icon: HeartHandshake,
    desc: 'Operation Vaccinate 500, Clean Water Offa, Digital Skills Academy',
    badge: 'Active Drives',
    color: 'from-[#0891B2] to-[#0284C7]',
  },
  {
    title: 'District Heritage & DRR Lineage',
    category: 'Archives',
    href: '/heritage',
    icon: History,
    desc: 'Explore historical leadership succession from 2023 to 2027',
    badge: 'Lineage',
    color: 'from-[#9333EA] to-[#7E22CE]',
  },
];

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');

  // Handle ESC & Cmd/Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
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
        <div className="fixed inset-0 z-[3000] flex items-start justify-center pt-14 sm:pt-20 px-4">
          {/* Backdrop with Cranberry Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#090A0F]/80 backdrop-blur-xl transition-all"
          />

          {/* Modal Card (Luxury Cranberry Glassmorphic Theme) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-gradient-to-b from-[#131722]/95 via-[#0D101A]/95 to-[#090B12]/98 border border-[#981132]/30 rounded-[28px] shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(152,17,50,0.22)] overflow-hidden z-10 flex flex-col backdrop-blur-2xl"
          >
            {/* Ambient Cranberry Top Glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[350px] h-[150px] bg-[#981132]/30 blur-[70px] pointer-events-none rounded-full" />
            <div className="absolute -bottom-20 right-10 w-[250px] h-[120px] bg-[#D4A520]/15 blur-[60px] pointer-events-none rounded-full" />

            {/* Search Input Bar */}
            <div className="relative flex items-center px-7 py-5 border-b border-white/[0.08] gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#981132] to-[#D91B5C] flex items-center justify-center text-white shadow-[0_4px_12px_rgba(152,17,50,0.4)] shrink-0">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                autoFocus
                placeholder="Search members, clubs, projects, or district resources..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base font-medium text-white placeholder-white/35 focus:outline-none caret-[#D91B5C]"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white/50 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-lg bg-white/[0.06] text-[10.5px] font-mono font-bold text-white/40 border border-white/[0.08] shadow-inner">
                ESC
              </kbd>
            </div>

            {/* Quick Filter Chips */}
            {!query && (
              <div className="px-7 py-3.5 border-b border-white/[0.06] bg-black/20 flex items-center gap-2.5 overflow-x-auto text-xs scrollbar-none">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4A520] flex items-center gap-1 shrink-0 mr-1">
                  <Sparkles size={12} /> Quick:
                </span>
                {QUICK_CHIPS.map((chip) => {
                  const ChipIcon = chip.icon;
                  return (
                    <button
                      key={chip.label}
                      onClick={() => setQuery(chip.label)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#981132]/15 hover:bg-[#981132]/30 text-white/80 hover:text-white text-[11.5px] font-semibold shrink-0 border border-[#981132]/30 hover:border-[#981132]/60 transition-all shadow-xs"
                    >
                      <ChipIcon size={11} className="text-[#D91B5C]" />
                      <span>{chip.label}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Results Directory Feed */}
            <div className="p-5 max-h-[430px] overflow-y-auto space-y-3">
              {filteredItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-4.5 p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04] hover:border-[#981132]/40 transition-all duration-200 group text-left relative overflow-hidden"
                  >
                    {/* Hover Left Accent Indicator */}
                    <div className="absolute left-0 inset-y-0 w-1 bg-gradient-to-b from-[#981132] to-[#D91B5C] opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shrink-0 shadow-md shadow-black/30 group-hover:scale-105 transition-transform`}>
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm sm:text-[15px] font-bold text-white group-hover:text-[#F87171] transition truncate">
                          {item.title}
                        </h4>
                        <span className="text-[9.5px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#981132]/20 border border-[#981132]/30 text-[#F43F5E] uppercase tracking-wider shrink-0">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-white/50 mt-1 leading-relaxed truncate">{item.desc}</p>
                    </div>

                    <div className="w-8 h-8 rounded-xl bg-white/[0.04] group-hover:bg-[#981132] text-white/30 group-hover:text-white flex items-center justify-center shrink-0 transition-all">
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                );
              })}

              {filteredItems.length === 0 && (
                <div className="py-16 text-center text-white/40 text-xs space-y-2.5">
                  <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto text-white/30">
                    <Search size={20} />
                  </div>
                  <div>No district resources found matching &ldquo;<span className="text-white font-semibold">{query}</span>&rdquo;</div>
                  <div className="text-[10.5px] text-white/30">Try searching for club names, state names, or leadership resources.</div>
                </div>
              )}
            </div>

            {/* Keyboard Shortcuts & District Registry Status Footer */}
            <div className="px-7 py-4 bg-black/40 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-white/40 flex-wrap gap-3">
              <div className="flex items-center gap-3.5">
                <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[9.5px] font-mono text-white/60">↑↓</kbd> Navigate</span>
                <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[9.5px] font-mono text-white/60">↵</kbd> Select</span>
                <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[9.5px] font-mono text-white/60">ESC</kbd> Close</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[10.5px] font-bold text-white/60">District 9126 Live Sync</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
