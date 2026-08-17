'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Shield, 
  Sparkles, 
  Award, 
  History, 
  Users, 
  Globe, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen,
  Milestone,
  Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RotaryTooltip from '@/components/ui/RotaryTooltip';
import CountUp from '@/components/ui/CountUp';

const redistrictingTimeline = [
  {
    year: '2009 – 2024',
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
    year: '2024 – 2025',
    badge: 'Inaugural Year',
    title: 'Foundation Era (DRR Oyewumi Kamaldeen)',
    desc: 'The 1st administration under "The Magic of Rotary" established district infrastructure, governance protocols, and inter-state club alignment.'
  },
  {
    year: '2026 – 2027',
    badge: 'Sitting Era',
    title: 'Creating Lasting Impact (DRR Adaramoye Iyanuoluwa)',
    desc: 'Today, the 3rd administration coordinates 77 chartered clubs and ~700 Rotaractors with verified digital IDs, automated dues, and flagship humanitarian programs.'
  }
];

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
    theme: 'Creating Lasting Impact',
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

const sevenStates = [
  {
    name: 'Osun State',
    region: 'South-West Nigeria',
    clubs: 'Osogbo, Ile-Ife, Ilesa, Ede, Ikirun',
    focus: 'Cultural Heritage & Youth Entrepreneurship'
  },
  {
    name: 'Oyo State',
    region: 'South-West Nigeria',
    clubs: 'Ibadan, Ogbomoso, Oyo, Saki',
    focus: 'Higher Education Hubs & Digital Literacy'
  },
  {
    name: 'Ondo State',
    region: 'South-West Nigeria',
    clubs: 'Akure, Ondo, Owo, Ikare',
    focus: 'Agricultural Innovation & Maternal Health'
  },
  {
    name: 'Ekiti State',
    region: 'South-West Nigeria',
    clubs: 'Ado-Ekiti, Ikole, Ijero',
    focus: 'Scholastic Mentorship & Civic Leadership'
  },
  {
    name: 'Kwara State',
    region: 'North-Central Nigeria',
    clubs: 'Ilorin, Offa, Omu-Aran',
    focus: 'WASH (Clean Water) & Commercial Development'
  },
  {
    name: 'Niger State',
    region: 'North-Central Nigeria',
    clubs: 'Minna, Bida, Suleja, Kontagora',
    focus: 'Rural Health Outreach & Food Security'
  },
  {
    name: 'Kogi State',
    region: 'North-Central Nigeria',
    clubs: 'Lokoja, Okene, Kabba, Anyigba',
    focus: 'Youth Skills Training & Community Welfare'
  }
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'states' | 'team' | 'past-leaders'>('overview');

  return (
    <div className="min-h-screen bg-[#F8F5F2] text-[#111111]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      
      {/* HERO HEADER */}
      <section className="relative pt-[120px] pb-20 overflow-hidden bg-[#0C101A] text-white">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(70% 60% at 50% 0%, rgba(217, 27, 92, 0.28) 0%, transparent 75%)' }}
        />
        
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="text-xs font-bold tracking-[0.35em] uppercase text-[#FF4D8D]">
              District 9126 History & Heritage
            </span>
            <div className="h-px w-12 bg-gradient-to-r from-[#FF4D8D] to-transparent" />
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
            The story of Rotaract District 9126 is a journey of leadership, growth, and transformation — born from the 15-year foundation of District 9125 and forged into an autonomous powerhouse uniting 77 clubs across South-West and North-Central Nigeria.
          </motion.p>

          {/* Quick Navigation Tabs */}
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
              { id: 'team', label: 'Current Executive Team' },
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

      {/* SECTION 1: DETAILED HISTORY & REDISTRICTING */}
      {(activeTab === 'overview' || activeTab === 'history') && (
        <section className="py-20 max-w-7xl mx-auto px-6 lg:px-10 border-b border-black/[0.06]">
          
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
                { icon: Sparkles, value: 50000, suffix: '+', label: 'Documented Beneficiaries' }
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

          {/* Redistricting Journey Chronological Cards */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#981132] font-sans">
                Chronological Roadmap
              </span>
              <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-[#1C1C1E] mt-1 font-sans">
                The Journey Towards Redistricting (2021 – 2024)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {redistrictingTimeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="p-6 rounded-2xl bg-white border border-black/[0.08] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#981132]/10 text-[#981132] font-sans">
                        {item.badge}
                      </span>
                      <span className="text-xs font-bold text-slate-500 font-mono">
                        {item.year}
                      </span>
                    </div>

                    <h4 className="text-lg font-black text-[#1C1C1E] mb-2 font-sans group-hover:text-[#981132] transition-colors">
                      {item.title}
                    </h4>

                    <p className="text-sm text-slate-600 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-black/5 flex items-center gap-1.5 text-xs font-semibold text-[#981132] font-sans">
                    <CheckCircle2 size={13} /> Official Rotary Record
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </section>
      )}

      {/* SECTION 2: 7 CONSTITUENT STATES */}
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

                  <h3 className="text-xl font-black text-[#1C1C1E] mb-2 font-sans group-hover:text-[#981132] transition-colors">
                    {st.name}
                  </h3>

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

      {/* SECTION 3: CURRENT EXECUTIVE COUNCIL */}
      {(activeTab === 'overview' || activeTab === 'team') && (
        <section className="py-20 max-w-7xl mx-auto px-6 lg:px-10 border-b border-black/[0.06]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#981132] font-sans">
              Executive Council 2026/2027
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#1C1C1E] mt-2 mb-3 font-sans">
              The Sitting Leadership Team
            </h2>
            <p className="max-w-xl mx-auto text-gray-600 text-sm md:text-base font-sans">
              The executive board coordinating the strategy, service programs, and member support across all 77 clubs.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
            {currentTeam.map((member, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative"
              >
                <div className="rounded-2xl bg-[#0F1624] border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 flex flex-col h-full">
                  
                  {/* Photo Container */}
                  <div className="aspect-[3/4] relative overflow-hidden rounded-t-2xl">
                    <img 
                      src={member.image} 
                      onError={(e) => { e.currentTarget.src = member.fallbackImage; }}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1624] via-transparent to-transparent opacity-90" />
                  </div>

                  {/* Card Body */}
                  <div className="p-3.5 flex flex-col justify-between flex-1">
                    <div>
                      <div className="text-[13px] font-bold text-white leading-snug font-sans group-hover:text-[#FF4D8D] transition-colors mb-1">
                        {member.name}
                      </div>
                      
                      <div className="text-[11px] text-[#D91B5C] font-semibold tracking-wide font-sans">
                        {member.tooltip ? (
                          <RotaryTooltip term={member.tooltip}>
                            <span>{member.role}</span>
                          </RotaryTooltip>
                        ) : (
                          member.role
                        )}
                      </div>
                    </div>

                    <div className="text-[9.5px] text-white/45 uppercase tracking-wider mt-2.5 pt-2 border-t border-white/10 font-sans">
                      {member.dept}
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 4: DRR LINEAGE & PAST LEADERS TIMELINE */}
      {(activeTab === 'overview' || activeTab === 'past-leaders') && (
        <section className="py-20 max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#981132] font-sans">
              Leadership Succession
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#1C1C1E] mt-2 mb-3 font-sans">
              Hall of Past & Sitting Leaders
            </h2>
            <p className="max-w-xl mx-auto text-gray-600 text-sm md:text-base font-sans">
              Chronological lineage of District Rotaract Representatives steering the transition, chartering, and expansion of our movement.
            </p>
          </motion.div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {pastLeaders.map((leader, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 md:p-8 rounded-2xl bg-white border border-black/[0.08] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-center md:items-start gap-6 group hover:-translate-y-1"
              >
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden shrink-0 border border-black/10 shadow-md">
                  <img 
                    src={leader.image} 
                    onError={(e) => { e.currentTarget.src = leader.fallbackImage; }}
                    alt={leader.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-1 flex-wrap">
                    <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#981132]/10 text-[#981132] font-sans">
                      {leader.badge}
                    </span>
                    <span className="text-xs font-semibold text-gray-500 font-sans">
                      {leader.tenure}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-[#1C1C1E] mt-1 font-sans">
                    {leader.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#D91B5C] mb-2 font-sans">
                    {leader.title} · <span className="text-gray-500">{leader.credentials}</span>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed mb-3 font-sans">
                    {leader.roleNote}
                  </p>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-100 text-[11px] font-medium text-gray-700 italic font-sans">
                    <Award className="text-[#981132]" size={14} /> Theme: "{leader.theme}"
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* FINAL INSPIRATIONAL CREED */}
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
