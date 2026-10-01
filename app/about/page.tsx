'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Shield, 
  Award, 
  History, 
  Users, 
  Globe, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  HeartHandshake,
  BookOpen,
  Milestone,
  Building2,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LeadershipSection from '@/components/sections/LeadershipSection';
import RotaryTooltip from '@/components/ui/RotaryTooltip';
import CountUp from '@/components/ui/CountUp';
import InteractiveTimelineStack from '@/components/sections/InteractiveTimelineStack';

const redistrictingTimeline = [
  {
    year: '2009 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ 2024',
    badge: '15-Year Legacy',
    title: 'The Era of District 9125',
    desc: 'For 15 years, Rotaract District 9125 served as a unified powerhouse comprising 23 states plus the Federal Capital Territory (FCT), nurturing generations of leaders across Nigeria.'
  },
  {
    year: '8 April 2022',
    badge: 'Provisional Charter',
    title: 'Rotary International Provisional Approval',
    desc: 'The Rotary International Board officially approved the strategic plan to reorganize expansive District 9125 into two sovereign, localized districts upon meeting growth criteria.'
  },
  {
    year: 'April 2024',
    badge: 'Final Ratification',
    title: 'Full RI Board Ratification',
    desc: 'During the "Create Hope in the World" Rotary year led by 15th DRR Rtr. PP Adebayo Sodiq Babatunde (PHF+1), the RI Board granted final approval creating District 9126 and District 9127.'
  },
  {
    year: '1 July 2024',
    badge: 'Historic Inception',
    title: 'Official Birth of District 9126',
    desc: 'District 9126 officially began its sovereign journey, establishing autonomous governance over 7 constituent states: Osun, Oyo, Ondo, Ekiti, Kwara, Niger, and Kogi.'
  },
  {
    year: '2024 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ 2025',
    badge: 'Inaugural Year',
    title: 'Foundation Era (DRR Oyewumi Kamaldeen)',
    desc: 'The 1st administration under "The Magic of Rotary" established district infrastructure, governance protocols, and inter-state club alignment.'
  },
  {
    year: '2026 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ 2027',
    badge: 'Sitting Era',
    title: 'Creating Lasting Impact (DRR Adaramoye Iyanuoluwa)',
    desc: 'Today, the 3rd administration coordinates 77 chartered clubs and ~700 Rotaractors with verified digital IDs, automated dues, and flagship humanitarian programs.'
  }
];

const pastLeaders = [
  {
    tenure: '2023ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“2024',
    order: 'Transition Architect',
    eraNumber: '00',
    title: '15th & Final DRR (District 9125 Transition Era)',
    name: 'Rtr. PP Adebayo Sodiq Babatunde',
    credentials: 'PHF+1, Past President',
    theme: 'Create Hope in the World',
    roleNote: '15th and final DRR of District 9125 who architected the historic transition, spearheaded the 7-state territorial demarcation, and secured Rotary International Board approval for the creation of District 9126.',
    highlights: ['RI Board Approval of D9126', '7-State Boundary Demarcation', 'The Genesis Bridge Administration'],
    image: '/images/leaders/drr-adebayo-sodiq.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1602009786436-96b827675d32?w=480&h=580&fit=crop&auto=format',
    badge: 'The Genesis Ãƒâ€šÃ‚Â· Transition Architect',
    accentColor: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.25)'
  },
  {
    tenure: '2024ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“2025',
    order: '1st DRR',
    eraNumber: '01',
    title: 'Inaugural 1st District Rotaract Representative',
    name: 'Rtr. PP Oyewumi Kamaldeen Adeshina',
    credentials: 'PHF, FEIPA, Past President',
    theme: 'The Magic of Rotary',
    roleNote: 'Inaugural Founding DRR who established the sovereign governance structure, codified district bylaws, inaugurated the executive council, and organized the first 77-club district assembly.',
    highlights: ['Inaugural District Bylaws', 'First 77-Club Assembly', 'Foundational Secretariat Setup'],
    image: '/images/leaders/drr-oyewumi-kamaldeen.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1533108344127-a586d2b02479?w=480&h=580&fit=crop&auto=format',
    badge: '1st DRR Ãƒâ€šÃ‚Â· Inaugural Foundation Era',
    accentColor: '#981132',
    glowColor: 'rgba(152, 17, 50, 0.25)'
  },
  {
    tenure: '2025ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“2026',
    order: '2nd DRR',
    eraNumber: '02',
    title: '2nd District Rotaract Representative',
    name: 'Rtr. PP Raji Abeeb Adekola',
    credentials: 'Past President, Paul Harris Fellow',
    theme: 'Unite for Greater Impact',
    roleNote: '2nd DRR who consolidated district operations, institutionalized youth leadership institutes, automated financial dues reconciliation, and deepened inter-club fellowship across 7 states.',
    highlights: ['Youth Leadership Institutes', 'Automated Financial Reconciliation', 'District Membership Expansion'],
    image: '/images/leaders/drr-raji-abeeb.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1629145810320-aec9e63dd798?w=480&h=580&fit=crop&auto=format',
    badge: '2nd DRR Ãƒâ€šÃ‚Â· Consolidation Era',
    accentColor: '#D91B5C',
    glowColor: 'rgba(217, 27, 92, 0.25)'
  },
  {
    tenure: '2026ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“2027',
    order: '3rd DRR (Sitting)',
    eraNumber: '03',
    title: 'Sitting 3rd District Rotaract Representative',
    name: 'Rtr. PP Adaramoye Iyanuoluwa',
    credentials: 'DRR, Past President',
    theme: 'Creating Lasting Impact',
    roleNote: 'Presiding District Rotaract Representative driving verified sovereign digital membership credentials, 7-state maternal health missions, and sustainable community empowerment.',
    highlights: ['Verified Digital Member IDs', '7-State Maternal Health Outreach', 'Youth Innovation Academy'],
    image: '/images/leaders/drr-adaramoye-iyanuoluwa.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1644152993066-9b9ee687930d?w=480&h=580&fit=crop&auto=format',
    badge: '3rd DRR Ãƒâ€šÃ‚Â· Sitting Administration',
    accentColor: '#D4A520',
    glowColor: 'rgba(212, 165, 32, 0.25)',
    isCurrent: true
  }
];

interface LeaderMember {
  id: string;
  name: string;
  role: string;
  tooltip: string | null;
  image: string;
  fallbackImage: string;
  dept: string;
  email: string;
  phone: string;
  bio: string;
}

const sevenStates = [
  {
    name: 'Osun State',
    region: 'South-West Nigeria',
    clubs: 'Osogbo, Ile-Ife, Ilesa, Ede, Ikirun',
    focus: 'Cultural Heritage & Youth Entrepreneurship',
    landmark: 'Living Culture & Heritage'
  },
  {
    name: 'Oyo State',
    region: 'South-West Nigeria',
    clubs: 'Ibadan, Ogbomoso, Oyo, Saki',
    focus: 'Higher Education Hubs & Digital Literacy',
    landmark: 'Cradle of Higher Learning'
  },
  {
    name: 'Ondo State',
    region: 'South-West Nigeria',
    clubs: 'Akure, Ondo, Owo, Ikare',
    focus: 'Agricultural Innovation & Maternal Health',
    landmark: 'Sunshine Agricultural Hub'
  },
  {
    name: 'Ekiti State',
    region: 'South-West Nigeria',
    clubs: 'Ado-Ekiti, Ikole, Ijero',
    focus: 'Scholastic Mentorship & Civic Leadership',
    landmark: 'Land of Honor & Academics'
  },
  {
    name: 'Kwara State',
    region: 'North-Central Nigeria',
    clubs: 'Ilorin, Offa, Omu-Aran',
    focus: 'WASH (Clean Water) & Commercial Development',
    landmark: 'State of Harmony & Commerce'
  },
  {
    name: 'Niger State',
    region: 'North-Central Nigeria',
    clubs: 'Minna, Bida, Suleja, Kontagora',
    focus: 'Rural Health Outreach & Food Security',
    landmark: 'Power State & Agriculture'
  },
  {
    name: 'Kogi State',
    region: 'North-Central Nigeria',
    clubs: 'Lokoja, Okene, Kabba, Anyigba',
    focus: 'Youth Skills Training & Community Welfare',
    landmark: 'Confluence State'
  }
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'states' | 'team' | 'past-leaders'>('overview');

  return (
    <div className="min-h-screen bg-[#F8F5F2] text-[#111111]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      
      {/* ================= HERO HEADER WITH HAND-DRAWN ACCENT & AMBIENT GLOW ================= */}
      <section className="relative pt-[140px] sm:pt-[160px] pb-20 overflow-hidden bg-[#0C101A] text-white">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(70% 60% at 50% 0%, rgba(217, 27, 92, 0.28) 0%, transparent 75%)' }}
        />
        
        {/* Subtle geometric dot grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 text-center">
          
          {/* Cursive Accent Tag Inspired by D3141 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex flex-col items-center mb-3"
          >
            <span className="text-sm font-semibold tracking-wider text-[#FF4D8D] font-sans">
              Meet the People Behind District 9126
            </span>
            <svg viewBox="0 0 180 18" className="h-2.5 w-36 text-[#D91B5C] mt-0.5">
              <path d="M2 11C18 7 35 12 52 9C69 6 88 9 105 8C123 7 142 10 178 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
            </svg>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6 font-sans"
          >
            A Legacy of Service.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F87171] via-[#FF4D8D] to-[#D4A520]">
              A New Era of Impact.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto text-slate-300 text-base md:text-lg leading-relaxed mb-10 font-sans"
          >
            One District. One Leadership Team. One Shared Vision ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Uniting 77 chartered clubs and ~700 young changemakers across Oyo, Osun, Ondo, Ekiti, Kwara, Kogi, and Niger states.
          </motion.p>

          {/* Quick Navigation Segmented Control */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center p-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 shadow-2xl flex-wrap justify-center gap-1"
          >
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'history', label: 'History & Redistricting' },
              { id: 'states', label: '7 Constituent States' },
              { id: 'team', label: 'Executive Team' },
              { id: 'past-leaders', label: 'DRR Lineage' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold tracking-wide transition-all z-10 ${
                    isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="aboutActiveTabPill"
                      className="absolute inset-0 rounded-full bg-[#981132] shadow-lg shadow-[#981132]/50 -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================= SECTION -1: DISTRICT GOVERNOR PATRON SECTION ================= */}


      {/* ================= SECTION 1: DETAILED HISTORY & REDISTRICTING ================= */}
      {(activeTab === 'overview' || activeTab === 'history') && (
        <section id="history" className="py-20 max-w-7xl mx-auto px-6 lg:px-10 border-b border-black/[0.06] scroll-mt-24">
          
          {/* Top Intro Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#981132] font-sans">
                  Foundational Legacy
                </span>
                <div className="h-px w-12 bg-[#981132]" />
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[#1C1C1E] leading-tight mb-6 font-sans">
                The Legacy of District 9125 & The Redistricting Milestone
              </h2>
              
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base font-sans">
                <p>
                  Although <strong>Rotaract District 9126</strong> officially came into existence on <strong>1 July 2024</strong>, its roots are deeply connected to the rich history and legacy of <strong>Rotaract District 9125</strong>. For 15 years, District 9125 served as a unified district comprising <strong>23 states in Nigeria, including the Federal Capital Territory (FCT)</strong>.
                </p>
                <p>
                  Throughout its 15-year existence, District 9125 provided opportunities for leadership development, professional networks, fellowship, and expansive community service. The final chapter of District 9125 arrived during the 2023/2024 Rotary Year under the theme <em>"Create Hope in the World"</em>, led by <strong>Rtr. PP Adebayo Sodiq Babatunde, PHF+1</strong>, who served as the 15th and last District Rotaract Representative (DRR) of District 9125.
                </p>
                <p>
                  His administration presided over the most historic transition in Nigerian Rotaract: the strategic redistricting of District 9125 and the sovereign emergence of <strong>Districts 9126 and 9127</strong>.
                </p>
              </div>
            </motion.div>

            {/* 4 Animated Metric Cards */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {[
                { icon: History, value: 15, suffix: '+ Years', label: 'Legacy under District 9125' },
                { icon: Globe, value: 7, suffix: ' States', label: 'Constituent Regional Scope' },
                { icon: Shield, value: 77, suffix: ' Clubs', label: 'Active Chartered Units' },
                { icon: HeartHandshake, value: 50000, suffix: '+', label: 'Documented Beneficiaries' }
              ].map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="p-5 sm:p-6 rounded-2xl bg-white border border-black/[0.08] shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#981132]/10 flex items-center justify-center mb-3 text-[#981132] transition-transform group-hover:scale-110">
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-[#1C1C1E] mb-1 font-sans">
                        <CountUp end={card.value} suffix={card.suffix} duration={2000} />
                      </div>
                      <div className="text-xs text-gray-500 font-medium leading-snug font-sans">{card.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Interactive Stacking Chronological Roadmap */}
          <div className="mt-12">
            <InteractiveTimelineStack />
          </div>

        </section>
      )}

      {/* ================= SECTION 2: 7 CONSTITUENT STATES ================= */}
      {(activeTab === 'overview' || activeTab === 'states') && (
        <section className="py-20 max-w-7xl mx-auto px-6 lg:px-10 border-b border-black/[0.06]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#981132] font-sans">
              Territorial Scope
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#1C1C1E] mt-2 mb-3 font-sans">
              Seven States. One Movement.
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 text-sm md:text-base font-sans">
              District 9126 unites young changemakers across 4 South-Western and 3 North-Central Nigerian states, bringing leadership closer to grassroots communities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {sevenStates.map((st, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className="p-6 rounded-2xl bg-white border border-black/[0.08] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D91B5C] font-sans">
                      {st.region}
                    </span>
                    <MapPin size={14} className="text-[#981132]" />
                  </div>

                  <h3 className="text-xl font-black text-[#1C1C1E] mb-1 font-sans group-hover:text-[#981132] transition-colors">
                    {st.name}
                  </h3>

                  <div className="text-[11px] font-semibold text-[#D4A520] mb-3 font-sans">
                    {st.landmark}
                  </div>

                  <div className="text-xs text-slate-500 font-medium mb-3 font-sans">
                    <strong>Major Hubs:</strong> {st.clubs}
                  </div>

                  <p className="text-xs text-slate-600 bg-gray-50 p-2.5 rounded-lg border border-black/5 font-sans leading-relaxed">
                    <strong>Signature Focus:</strong> {st.focus}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-black/5 text-[11px] font-semibold text-[#981132] flex items-center justify-between font-sans">
                  <span>Chartered & Active</span>
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            ))}

            {/* Joint Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-[#981132] to-[#6A0C23] text-white shadow-xl flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4A520] font-sans">
                  District Aggregate
                </span>
                <h3 className="text-xl font-black text-white mt-1 mb-2 font-sans">
                  77 Chartered Clubs
                </h3>
                <p className="text-xs text-white/80 leading-relaxed font-sans">
                  Campus, community-based, and electronic clubs driving synchronized humanitarian projects under the Four-Way Test.
                </p>
              </div>

              <a
                href="/clubs"
                className="mt-4 inline-flex items-center justify-between text-xs font-bold text-white bg-white/15 hover:bg-white/25 px-3.5 py-2 rounded-lg transition-colors font-sans"
              >
                <span>Browse All 77 Clubs</span>
                <ArrowRight size={13} />
              </a>
            </motion.div>
          </div>
        </section>
      )}

      {/* ================= SECTION 3 & 4: LEADERSHIP & SUCCESSION ================= */}
      {activeTab === 'overview' && (
        <>
          <LeadershipSection showOnly="all" />
          <section className="py-16 max-w-7xl mx-auto px-6 lg:px-10">
            <h3 className="text-3xl font-black text-center mb-8 text-[#1C1C1E]">District Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <img src="/images/leaders/district team collage 2.jpeg" className="w-full h-auto rounded-3xl shadow-sm object-cover" alt="District Team Collage 2" />
              <img src="/images/leaders/district team collage 1.jpeg" className="w-full h-auto rounded-3xl shadow-sm object-cover" alt="District Team Collage 1" />
              <img src="/images/leaders/district team collage 3.jpeg" className="w-full h-auto rounded-3xl shadow-sm object-cover" alt="District Team Collage 3" />
            </div>
            <h3 className="text-3xl font-black text-center mb-8 mt-16 text-[#1C1C1E]">Council of Past DRRs from District 9125</h3>
            <img src="/images/leaders/DRR council Collage.jpeg" className="w-full max-w-4xl mx-auto h-auto rounded-3xl shadow-sm object-cover" alt="Council of Past DRRs Collage" />
          </section>
        </>
      )}
      {activeTab === 'team' && (
        <>
          <LeadershipSection showOnly="team" />
          <section className="py-16 max-w-7xl mx-auto px-6 lg:px-10">
            <h3 className="text-3xl font-black text-center mb-8 text-[#1C1C1E]">District Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <img src="/images/leaders/district team collage 2.jpeg" className="w-full h-auto rounded-3xl shadow-sm object-cover" alt="District Team Collage 2" />
              <img src="/images/leaders/district team collage 1.jpeg" className="w-full h-auto rounded-3xl shadow-sm object-cover" alt="District Team Collage 1" />
              <img src="/images/leaders/district team collage 3.jpeg" className="w-full h-auto rounded-3xl shadow-sm object-cover" alt="District Team Collage 3" />
            </div>
          </section>
        </>
      )}
      {activeTab === 'past-leaders' && (
        <>
          <LeadershipSection showOnly="succession" />
          <section className="py-16 max-w-7xl mx-auto px-6 lg:px-10">
            <h3 className="text-3xl font-black text-center mb-8 text-[#1C1C1E]">Council of Past DRRs from District 9125</h3>
            <img src="/images/leaders/DRR council Collage.jpeg" className="w-full max-w-4xl mx-auto h-auto rounded-3xl shadow-sm object-cover" alt="Council of Past DRRs Collage" />
          </section>
        </>
      )}

      {/* ================= FINAL INSPIRATIONAL CREED ================= */}
      <section className="py-16 bg-[#111111] text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#D4A520] font-sans">
            Our Continuing Creed
          </span>
          <h3 className="text-2xl sm:text-4xl font-black text-white mt-2 mb-4 font-sans">
            "Our History. Our Legacy. Our Future."
          </h3>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto font-sans">
            From the 15-year legacy of District 9125, through the historic redistricting process, to the establishment and growth of District 9126, the journey continues to be guided by the enduring Rotaract spirit of <em>Service Above Self</em>.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
