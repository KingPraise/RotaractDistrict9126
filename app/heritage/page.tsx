import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { History, MapPin, Sparkles, ArrowRight, Crown } from 'lucide-react';
import { FormatRotaryText } from '@/components/ui/RotaryTooltip';

const DRR_LINEAGE = [
  {
    year: '2023/2024',
    designation: '15th District Rotaract Representative (D9125)',
    leaderName: 'Rtr. PP Adebayo Sodiq Babatunde, PHF+1',
    theme: 'Create Hope in the World',
    roleHighlight: 'Pre-Redistricting Anchor Era',
    description:
      'Steered the historic final consolidated year of District 9125, driving exponential membership engagement, continental youth delegations, and laying the strategic groundwork for the creation of District 9126.',
    avatarUrl: '/images/leaders/drr-adebayo-sodiq.jpg',
    isCurrent: false,
  },
  {
    year: '2024/2025',
    designation: 'Inaugural District Rotaract Representative (D9126)',
    leaderName: 'Rtr. PP Oyewumi Kamaldeen Adeshina, PHF, FEIPA',
    theme: 'The Magic of Rotary',
    roleHighlight: 'Inaugural Charter & Alignment',
    description:
      'Led the foundational chartering and operational launch of Rotaract District 9126, successfully uniting clubs across South-West and North-Central Nigeria into an integrated district governance architecture.',
    avatarUrl: '/images/leaders/drr-oyewumi-kamaldeen.jpg',
    isCurrent: false,
  },
  {
    year: '2025/2026',
    designation: '2nd District Rotaract Representative (D9126)',
    leaderName: 'Consolidation Leadership Assembly',
    theme: 'Unite for Good',
    roleHighlight: 'Consolidation & Regional Growth',
    description:
      'Strengthened inter-state club twinning, campus-to-community member transitions, and scaled high-impact joint community service initiatives throughout the 7 constituent states.',
    avatarUrl: '/images/leader-service.jpg',
    isCurrent: false,
  },
  {
    year: '2026/2027',
    designation: '3rd District Rotaract Representative (D9126)',
    leaderName: 'Rtr. PP Adaramoye Iyanuoluwa, PHF',
    theme: 'Creating Lasting Impact',
    roleHighlight: 'Current District Administration',
    description:
      'Championing digital transformation, verified digital ID credentials, automated dues tracking, and ambitious humanitarian projects across maternal health, education, and clean water.',
    avatarUrl: '/images/leaders/drr-adaramoye-iyanuoluwa.jpg',
    isCurrent: true,
  },
];

const SEVEN_STATES = [
  { name: 'Osun State', region: 'South-West', capital: 'Osogbo', landmark: 'Living Culture & Heritage' },
  { name: 'Oyo State', region: 'South-West', capital: 'Ibadan', landmark: 'Cradle of Higher Learning' },
  { name: 'Ondo State', region: 'South-West', capital: 'Akure', landmark: 'Sunshine Agricultural Hub' },
  { name: 'Ekiti State', region: 'South-West', capital: 'Ado-Ekiti', landmark: 'Land of Honor & Academics' },
  { name: 'Kwara State', region: 'North-Central', capital: 'Ilorin', landmark: 'State of Harmony & Commerce' },
  { name: 'Niger State', region: 'North-Central', capital: 'Minna', landmark: 'Power State & Innovation' },
  { name: 'Kogi State', region: 'North-Central', capital: 'Lokoja', landmark: 'Confluence of Opportunities' },
];

export default function HeritagePage() {
  return (
    <div className="min-h-screen bg-[#080C14] text-white flex flex-col selection:bg-[#D91B5C] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4A520]/10 border border-[#D4A520]/20 text-[#D4A520] text-xs font-semibold">
            <History className="h-3.5 w-3.5" />
            <span>District Heritage & Leadership Archive</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
            The Legacy & Lineage of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D91B5C] via-[#FF4D8D] to-[#D4A520]">
              Rotaract District 9126
            </span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            From the foundational heritage of District 9125 to the sovereign charter of District 9126 — uniting 77 active clubs and over 700 young leaders across 7 constituent states.
          </p>

          {/* Quick Metrics */}
          <div className="pt-4 grid grid-cols-3 gap-3 max-w-lg mx-auto">
            <div className="glass-card rounded-[16px] p-3 text-center bg-white/[0.04] border border-white/10">
              <div className="text-2xl font-black text-[#D91B5C]">77</div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Active Clubs</div>
            </div>
            <div className="glass-card rounded-[16px] p-3 text-center bg-white/[0.04] border border-white/10">
              <div className="text-2xl font-black text-[#D4A520]">700+</div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Rotaractors</div>
            </div>
            <div className="glass-card rounded-[16px] p-3 text-center bg-white/[0.04] border border-white/10">
              <div className="text-2xl font-black text-emerald-400">7</div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Constituent States</div>
            </div>
          </div>
        </div>

        {/* DRR Leadership Lineage */}
        <div className="glass-panel rounded-3xl p-6 sm:p-12 border border-white/15 relative overflow-hidden bg-white/[0.02]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D91B5C]">Executive Succession</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5 mt-1">
                <Crown className="h-6 w-6 text-[#D4A520]" />
                <span>
                  District Rotaract Representatives (<FormatRotaryText text="DRRs" />)
                </span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DRR_LINEAGE.map((leader) => (
              <div
                key={leader.year}
                className={`glass-card rounded-[20px] p-6 border transition-all duration-300 relative overflow-hidden ${
                  leader.isCurrent
                    ? 'border-[#D91B5C] bg-gradient-to-br from-[#0F1624] to-[#D91B5C]/15 shadow-2xl shadow-[#D91B5C]/20'
                    : 'border-white/10 bg-[#0F1624]/80 hover:border-white/25 hover:shadow-xl'
                }`}
              >
                {leader.isCurrent && (
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#D91B5C] text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                    Current DRR
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <img
                    src={leader.avatarUrl}
                    alt={leader.leaderName}
                    className="h-16 w-16 rounded-[14px] object-cover border-2 border-white/15 shrink-0"
                  />
                  <div>
                    <div className="text-xs font-mono font-bold text-[#D4A520]">{leader.year} Rotary Year</div>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      <FormatRotaryText text={leader.leaderName} />
                    </h3>
                    <p className="text-xs text-[#D91B5C] font-semibold">
                      <FormatRotaryText text={leader.designation} />
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400 font-medium">Presidential Theme:</span>
                    <span className="text-xs font-bold text-slate-200 italic">&ldquo;{leader.theme}&rdquo;</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    <FormatRotaryText text={leader.description} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The 7 Constituent States */}
        <div>
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D91B5C]">Geographic Architecture</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Our 7 Constituent States</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              South-West (Osun, Oyo, Ondo, Ekiti) & North-Central (Kwara, Niger, Kogi)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SEVEN_STATES.map((st) => (
              <div key={st.name} className="glass-card rounded-[16px] p-5 border border-white/10 bg-[#0F1624]/60 flex flex-col justify-between hover:border-white/20 transition">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-white/5 text-[#D4A520]">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {st.region}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">{st.name}</h3>
                  <p className="text-xs text-[#D91B5C] font-semibold mt-0.5">Capital: {st.capital}</p>
                  <p className="text-[11px] text-slate-400 mt-2">{st.landmark}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-bold text-emerald-400">
                  Active District Zone
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/15 text-center bg-gradient-to-br from-white/[0.04] to-[#D91B5C]/10 flex flex-col items-center">
          <Sparkles className="h-8 w-8 text-[#D4A520] mb-4" />
          <h2 className="text-2xl sm:text-3xl font-black text-white">Be Part of District 9126 History</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mt-2 mb-6">
            Join over 700 changemakers across 77 clubs creating lasting humanitarian impact in Nigeria.
          </p>
          <Link
            href="/join"
            className="px-8 py-3.5 rounded-full bg-[#981132] hover:bg-[#A70C43] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#981132]/40 flex items-center gap-2 transition"
          >
            <span>Register as a Prospect</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
