'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Shield, Sparkles, Award, History, Users, Globe } from 'lucide-react';
import RotaryTooltip from '@/components/ui/RotaryTooltip';

const pastLeaders = [
  {
    tenure: '2023–2024',
    title: '15th DRR (District 9125 Transition Era)',
    name: 'Rtr. PP Adebayo Sodiq Babatunde',
    credentials: 'PHF+1, Past President',
    theme: 'Create Hope in the World',
    roleNote: 'Guided the transitional phase leading to the official charter of District 9126.',
    image: '/images/leaders/drr-adebayo-sodiq.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1602009786436-96b827675d32?w=480&h=580&fit=crop&auto=format',
    badge: 'D9125 Lineage'
  },
  {
    tenure: '2024–2025',
    title: 'Inaugural 1st DRR (District 9126 Foundation)',
    name: 'Rtr. PP Oyewumi Kamaldeen',
    credentials: 'PHF, IPDRR',
    theme: 'The Magic of Rotary',
    roleNote: 'Pioneered the foundation of District 9126 across the 7 constituent states.',
    image: '/images/leaders/drr-oyewumi-kamaldeen.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1533108344127-a586d2b02479?w=480&h=580&fit=crop&auto=format',
    badge: 'Inaugural Era'
  },
  {
    tenure: '2025–2026',
    title: '2nd DRR (Consolidation Era)',
    name: 'Rtr. PP Folake Adesanya',
    credentials: 'PP, Paul Harris Fellow',
    theme: 'Unite for Impact',
    roleNote: 'Consolidated district infrastructure, digital intake, and cross-state programs.',
    image: '/images/leader-finance.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1629145810320-aec9e63dd798?w=480&h=580&fit=crop&auto=format',
    badge: 'Consolidation Era'
  },
  {
    tenure: '2026–2027',
    title: 'Sitting 3rd DRR (Current Administration)',
    name: 'Rtr. PP Adaramoye Iyanuoluwa',
    credentials: 'DRR, Past President',
    theme: 'Empower. Elevate. Excel.',
    roleNote: 'Current executive leadership driving expansion and member digital identity.',
    image: '/images/leaders/drr-adaramoye-iyanuoluwa.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1644152993066-9b9ee687930d?w=480&h=580&fit=crop&auto=format',
    badge: 'Current DRR'
  }
];

const currentTeam = [
  {
    name: 'Rtr. PP Adaramoye Iyanuoluwa',
    role: 'District Rotaract Representative',
    tooltip: 'DRR',
    image: '/images/leaders/drr-adaramoye-iyanuoluwa.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1644152993066-9b9ee687930d?w=480&h=580&fit=crop&auto=format',
    dept: 'Executive Office'
  },
  {
    name: 'Rtr. PP Oyewumi Kamaldeen',
    role: 'Immediate Past DRR',
    tooltip: 'IPDRR',
    image: '/images/leaders/drr-oyewumi-kamaldeen.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1533108344127-a586d2b02479?w=480&h=580&fit=crop&auto=format',
    dept: 'Advisory Council'
  },
  {
    name: 'Rtr. PP Faleye Ifeoluwa',
    role: 'District Secretary',
    tooltip: 'PP',
    image: '/images/leaders/leader-secretary-faleye.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1629145810320-aec9e63dd798?w=480&h=580&fit=crop&auto=format',
    dept: 'Secretariat'
  },
  {
    name: 'Rtr. PP Odufuwa Omotoke',
    role: 'District Treasurer',
    tooltip: 'PP',
    image: '/images/leaders/leader-treasurer-odufuwa.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1650490323009-96fc950a959c?w=480&h=580&fit=crop&auto=format',
    dept: 'Finance & Accounts'
  },
  {
    name: 'Rtr. Chukwuemeka Obi',
    role: 'Director of Service Projects',
    tooltip: null,
    image: '/images/leaders/leader-service.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?w=480&h=580&fit=crop&auto=format',
    dept: 'Service Projects'
  },
  {
    name: 'Rtr. PP Adebayo Sodiq',
    role: 'Strategic Advisor',
    tooltip: 'PHF+1',
    image: '/images/leaders/drr-adebayo-sodiq.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1602009786436-96b827675d32?w=480&h=580&fit=crop&auto=format',
    dept: 'Strategy & Governance'
  }
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'team' | 'past-leaders'>('overview');

  return (
    <div className="min-h-screen bg-[#F8F5F2] text-[#111111]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      
      {/* HERO HEADER */}
      <section className="relative pt-[120px] pb-16 overflow-hidden bg-[#111111] text-white">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(70% 55% at 50% 0%, rgba(217, 27, 92, 0.22) 0%, transparent 70%)' }}
        />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#D91B5C]">
              About District 9126
            </span>
            <div className="h-px w-12 bg-gradient-to-r from-[#D91B5C] to-transparent" />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6">
            Our Heritage. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F87171] to-[#D91B5C]">Our Leadership.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-300 text-base md:text-lg leading-relaxed">
            Uniting 77 chartered clubs and thousands of servant leaders across Ondo, Ekiti, Osun, Oyo, Kogi, Niger, and Kwara states.
          </p>

          {/* Quick Navigation Tabs */}
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'history', label: '9125 → 9126 Transition' },
              { id: 'team', label: 'Current Team' },
              { id: 'past-leaders', label: 'DRR Lineage' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#981132] text-white shadow-lg shadow-[#981132]/40'
                    : 'bg-white/10 hover:bg-white/20 text-white/80 border border-white/15'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: 9125 -> 9126 EVOLUTION & HISTORY */}
      {(activeTab === 'overview' || activeTab === 'history') && (
        <section className="py-20 max-w-7xl mx-auto px-6 lg:px-10 border-b border-black/[0.06]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#981132]">
                  The Evolution
                </span>
                <div className="h-px w-12 bg-[#981132]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#1C1C1E] leading-tight mb-6">
                From District 9125 to the Birth of 9126
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  For over 15 years, Rotaract clubs across South-West and North-Central Nigeria operated under the historic banner of <strong>Rotary District 9125</strong>. As our grassroots impact, club count, and community commitments expanded, Rotary International initiated the redistricting process to optimize administrative efficiency and empower localized leadership.
                </p>
                <p>
                  Between <strong>2022 and 2024</strong>, the foundational architecture of <strong>District 9126</strong> was chartered, establishing a sovereign district governing 7 constituent states: <em>Oyo, Osun, Ondo, Ekiti, Kwara, Kogi, and Niger</em>.
                </p>
                <p>
                  Today, District 9126 stands as an autonomous powerhouse of community development, educational support, water sanitation, and youthful innovation.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex flex-col justify-between">
                <History className="text-[#981132] mb-4" size={28} />
                <div>
                  <div className="text-2xl font-black text-[#1C1C1E] mb-1">15+ Years</div>
                  <div className="text-xs text-gray-500 font-medium">Foundational Legacy under District 9125</div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex flex-col justify-between">
                <Globe className="text-[#981132] mb-4" size={28} />
                <div>
                  <div className="text-2xl font-black text-[#1C1C1E] mb-1">7 States</div>
                  <div className="text-xs text-gray-500 font-medium">Constituent Regional Territory</div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex flex-col justify-between">
                <Shield className="text-[#981132] mb-4" size={28} />
                <div>
                  <div className="text-2xl font-black text-[#1C1C1E] mb-1">77 Clubs</div>
                  <div className="text-xs text-gray-500 font-medium">Active Campus & Community Units</div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex flex-col justify-between">
                <Sparkles className="text-[#981132] mb-4" size={28} />
                <div>
                  <div className="text-2xl font-black text-[#1C1C1E] mb-1">50K+</div>
                  <div className="text-xs text-gray-500 font-medium">Documented Community Beneficiaries</div>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* SECTION: CURRENT EXECUTIVE COUNCIL */}
      {(activeTab === 'overview' || activeTab === 'team') && (
        <section className="py-20 max-w-7xl mx-auto px-6 lg:px-10 border-b border-black/[0.06]">
          <div className="text-center mb-14">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#981132]">
              Executive Council 2026/2027
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#1C1C1E] mt-2 mb-3">
              The Sitting Leadership Team
            </h2>
            <p className="max-w-xl mx-auto text-gray-600 text-sm md:text-base">
              The executive board coordinating the strategy, service programs, and member support across all 77 clubs.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {currentTeam.map((member, idx) => (
              <div key={idx} className="group">
                <div className="rounded-2xl overflow-hidden bg-[#0F1624] border border-white/10 shadow-lg transition-transform duration-200 group-hover:-translate-y-1">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img 
                      src={member.image} 
                      onError={(e) => { e.currentTarget.src = member.fallbackImage; }}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-transparent to-transparent" />
                  </div>
                  <div className="p-3.5">
                    <div className="text-[13px] font-bold text-white leading-tight truncate">
                      {member.name}
                    </div>
                    <div className="text-[10px] text-[#D91B5C] font-semibold tracking-wide mt-1">
                      {member.tooltip ? (
                        <RotaryTooltip term={member.tooltip}>
                          <span className="border-b border-dotted border-[#D91B5C]/60 cursor-help">{member.role}</span>
                        </RotaryTooltip>
                      ) : (
                        member.role
                      )}
                    </div>
                    <div className="text-[9px] text-white/40 uppercase tracking-wider mt-1">
                      {member.dept}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION: DRR LINEAGE & PAST LEADERS TIMELINE */}
      {(activeTab === 'overview' || activeTab === 'past-leaders') && (
        <section className="py-20 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#981132]">
              Leadership Succession
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#1C1C1E] mt-2 mb-3">
              Hall of Past & Sitting Leaders
            </h2>
            <p className="max-w-xl mx-auto text-gray-600 text-sm md:text-base">
              Chronological lineage of District Rotaract Representatives steering the transition and expansion of our movement.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {pastLeaders.map((leader, idx) => (
              <div 
                key={idx}
                className="p-6 md:p-8 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6 hover:shadow-md transition-shadow"
              >
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden shrink-0 border border-black/10">
                  <img 
                    src={leader.image} 
                    onError={(e) => { e.currentTarget.src = leader.fallbackImage; }}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-1 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#981132]/10 text-[#981132]">
                      {leader.badge}
                    </span>
                    <span className="text-xs font-semibold text-gray-500">
                      {leader.tenure}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-[#1C1C1E] mt-1">
                    {leader.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#D91B5C] mb-2">
                    {leader.title} · <span className="text-gray-500">{leader.credentials}</span>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {leader.roleNote}
                  </p>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-100 text-[11px] font-medium text-gray-700 italic">
                    <Award className="text-[#981132]" size={12} /> Theme: "{leader.theme}"
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
