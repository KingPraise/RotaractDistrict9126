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
  Search,
  Mail,
  Phone,
  ArrowUpRight,
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RotaryTooltip from '@/components/ui/RotaryTooltip';
import CountUp from '@/components/ui/CountUp';
import DistrictGovernorSection from '@/components/sections/DistrictGovernorSection';

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
    tenure: '2024–2025',
    order: '1st DRR',
    title: 'Inaugural 1st District Rotaract Representative',
    name: 'Rtr. PP Oyewumi Kamaldeen Adeshina',
    credentials: 'PHF, FEIPA, Past President',
    theme: 'The Magic of Rotary',
    roleNote: 'Inaugural DRR who established the sovereign governance structure, district bylaws, and official charter of District 9126 across all 7 constituent states.',
    image: '/images/leaders/drr-oyewumi-kamaldeen.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1533108344127-a586d2b02479?w=480&h=580&fit=crop&auto=format',
    badge: '1st DRR · Inaugural Era',
    accentColor: '#981132'
  },
  {
    tenure: '2025–2026',
    order: '2nd DRR',
    title: '2nd District Rotaract Representative',
    name: 'Rtr. PP Raji Abeeb Adekola',
    credentials: 'Past President, Paul Harris Fellow',
    theme: 'Unite for Greater Impact',
    roleNote: '2nd DRR who consolidated district operations, cross-state programs, youth leadership institutes, automated dues protocols, and club vitality.',
    image: '/images/leaders/drr-raji-abeeb.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1629145810320-aec9e63dd798?w=480&h=580&fit=crop&auto=format',
    badge: '2nd DRR · Consolidation Era',
    accentColor: '#D91B5C'
  },
  {
    tenure: '2026–2027',
    order: '3rd DRR',
    title: 'Sitting 3rd District Rotaract Representative',
    name: 'Rtr. PP Adaramoye Iyanuoluwa',
    credentials: 'DRR, Past President',
    theme: 'Creating Lasting Impact',
    roleNote: 'Presiding District Rotaract Representative driving digital transformation, verified member credentials, and maternal & child health outreach.',
    image: '/images/leaders/drr-adaramoye-iyanuoluwa.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1644152993066-9b9ee687930d?w=480&h=580&fit=crop&auto=format',
    badge: '3rd DRR · Present Administration',
    accentColor: '#D4A520',
    isCurrent: true
  },
  {
    tenure: '2023–2024',
    order: 'D9125 Precursor',
    title: '15th & Final DRR (District 9125 Transition Era)',
    name: 'Rtr. PP Adebayo Sodiq Babatunde',
    credentials: 'PHF+1, Past President',
    theme: 'Create Hope in the World',
    roleNote: '15th and final DRR of District 9125 who shepherded the historic creation and Rotary International Board approval of District 9126.',
    image: '/images/leaders/drr-adebayo-sodiq.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1602009786436-96b827675d32?w=480&h=580&fit=crop&auto=format',
    badge: 'D9125 Precursor · Transition',
    accentColor: '#4338CA'
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

const currentTeam: LeaderMember[] = [
  {
    id: 'drr',
    name: 'Rtr. PP Adaramoye Iyanuoluwa',
    role: 'District Rotaract Representative',
    tooltip: 'DRR',
    image: '/images/leaders/drr-adaramoye-iyanuoluwa.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1644152993066-9b9ee687930d?w=480&h=580&fit=crop&auto=format',
    dept: 'Executive Office',
    email: 'drr@rotaractdistrict9126.com.ng',
    phone: '+234 800 912 6001',
    bio: 'Presiding 3rd District Rotaract Representative for the 2026/2027 Rotary Year. Steering digital transformation, member verified credentials, and flagship maternal & child health outreach across 7 states.'
  },
  {
    id: 'ipdrr',
    name: 'Rtr. PP Raji Abeeb Adekola',
    role: 'Immediate Past DRR',
    tooltip: 'IPDRR',
    image: '/images/leaders/drr-raji-abeeb.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1629145810320-aec9e63dd798?w=480&h=580&fit=crop&auto=format',
    dept: 'Advisory Council',
    email: 'ipdrr@rotaractdistrict9126.com.ng',
    phone: '+234 800 912 6002',
    bio: '2nd DRR of District 9126 (2025/2026). Advises on executive alignment, leadership institutes, governance, and institutional continuity.'
  },
  {
    id: 'founding-drr',
    name: 'Rtr. PP Oyewumi Kamaldeen Adeshina',
    role: 'Inaugural 1st DRR & Advisory Chair',
    tooltip: 'PHF',
    image: '/images/leaders/drr-oyewumi-kamaldeen.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1533108344127-a586d2b02479?w=480&h=580&fit=crop&auto=format',
    dept: 'Council of Past DRRs',
    email: 'foundingdrr@rotaractdistrict9126.com.ng',
    phone: '+234 800 912 6003',
    bio: 'Inaugural DRR who established the sovereign structures of District 9126 during the 2024/2025 chartering era. Serves as senior counsel for executive policy and inter-district alliances.'
  },
  {
    id: 'sec',
    name: 'Rtr. PP Faleye Ifeoluwa',
    role: 'District Secretary',
    tooltip: 'PP',
    image: '/images/leaders/leader-secretary-faleye.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1629145810320-aec9e63dd798?w=480&h=580&fit=crop&auto=format',
    dept: 'Secretariat',
    email: 'secretary@rotaractdistrict9126.com.ng',
    phone: '+234 800 912 6004',
    bio: 'Manages the district secretariat, official records, administrative correspondence, and inter-club communication across all 77 chartered clubs.'
  },
  {
    id: 'treasurer',
    name: 'Rtr. PP Odufuwa Omotoke Anita',
    role: 'District Treasurer',
    tooltip: 'PP',
    image: '/images/leaders/leader-treasurer-odufuwa.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1650490323009-96fc950a959c?w=480&h=580&fit=crop&auto=format',
    dept: 'Finance & Accounts',
    email: 'treasury@rotaractdistrict9126.com.ng',
    phone: '+234 800 912 6005',
    bio: 'Directs the district fiscal strategy, automated club dues reconciliations, project budgets, and transparent audit reports.'
  },
  {
    id: 'cos',
    name: 'Rtr. Hussain Abdulhakeem Ayokunnu',
    role: 'Chief of Staff / District Administrator',
    tooltip: 'PHF',
    image: '/images/leaders/leader-chief-of-staff.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=480&h=580&fit=crop&auto=format',
    dept: 'Executive Office / Administration',
    email: 'chiefofstaff@rotaractdistrict9126.com.ng',
    phone: '+234 800 912 6007',
    bio: 'Chief of Staff and District Administrator of District 9126. Oversees executive operations, administrative alignment, district council coordination, and strategic program implementation.'
  },
  {
    id: 'advisor',
    name: 'Rtr. PP Adebayo Sodiq Babatunde',
    role: 'Strategic Advisor (15th DRR D9125)',
    tooltip: 'PHF+1',
    image: '/images/leaders/drr-adebayo-sodiq.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1602009786436-96b827675d32?w=480&h=580&fit=crop&auto=format',
    dept: 'Strategy & Governance',
    email: 'advisor@rotaractdistrict9126.com.ng',
    phone: '+234 800 912 6006',
    bio: '15th and final DRR of District 9125. Provides high-level strategic guidance, Rotary Foundation partnerships, and inter-district alliances.'
  }
];

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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedLeaderModal, setSelectedLeaderModal] = useState<LeaderMember | null>(null);

  const departments = ['All', 'Executive Office', 'Advisory Council', 'Secretariat', 'Finance & Accounts', 'Service Projects', 'Strategy & Governance'];

  const filteredTeam = useMemo(() => {
    return currentTeam.filter((member) => {
      const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            member.dept.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = selectedDept === 'All' || member.dept === selectedDept;
      return matchesSearch && matchesDept;
    });
  }, [searchQuery, selectedDept]);

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
            One District. One Leadership Team. One Shared Vision — Uniting 77 chartered clubs and ~700 young changemakers across Oyo, Osun, Ondo, Ekiti, Kwara, Kogi, and Niger states.
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
      {(activeTab === 'overview' || activeTab === 'team') && (
        <DistrictGovernorSection />
      )}

      {/* ================= SECTION 0: DRR SPOTLIGHT BANNER ================= */}
      {(activeTab === 'overview' || activeTab === 'team') && (
        <section className="py-12 max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-black/[0.08] bg-gradient-to-br from-white via-white to-amber-50/40 p-6 sm:p-10 shadow-lg relative overflow-hidden"
          >
            {/* Background ambient badge */}
            <div className="absolute right-[-40px] top-[-40px] w-80 h-80 rounded-full bg-[#D4A520]/10 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Portrait */}
              <div className="lg:col-span-4 flex justify-center lg:justify-start">
                <div className="w-64 sm:w-72 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[#D4A520]/40 shadow-2xl relative group">
                  <img
                    src="/images/leaders/drr-adaramoye-iyanuoluwa.jpg"
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1644152993066-9b9ee687930d?w=480&h=580&fit=crop&auto=format'; }}
                    alt="DRR Adaramoye Iyanuoluwa"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 to-transparent text-white text-center">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#D4A520] font-bold">Sitting 3rd DRR · 2026/2027</span>
                  </div>
                </div>
              </div>

              {/* Bio & Actions */}
              <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#981132]/10 text-[#981132] text-xs font-bold uppercase tracking-wider">
                  <Award size={14} /> Theme: "Creating Lasting Impact"
                </div>

                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1C1C1E] tracking-tight leading-tight font-sans">
                  Rtr. PP Adaramoye Iyanuoluwa
                </h2>

                <p className="text-xs font-bold text-[#D91B5C] uppercase tracking-widest">
                  District Rotaract Representative · District 9126
                </p>

                <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
                  Presiding as the 3rd District Rotaract Representative of Rotaract District 9126. Leading the expansion of digital membership identities, youth leadership training, maternal health outreach, and sustainable clean water access across 77 chartered clubs.
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                  <a
                    href="mailto:drr@rotaractdistrict9126.com.ng"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#981132] text-white text-xs font-bold hover:bg-[#7D0E29] transition-colors shadow-md shadow-[#981132]/30"
                  >
                    <Mail size={14} /> Contact Executive Office
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedLeaderModal(currentTeam[0])}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/5 hover:bg-black/10 text-slate-800 text-xs font-bold transition-colors border border-black/10"
                  >
                    <Users size={14} /> View Complete Dossier
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        </section>
      )}

      {/* ================= SECTION 1: DETAILED HISTORY & REDISTRICTING ================= */}
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

      {/* ================= SECTION 3: CURRENT EXECUTIVE COUNCIL WITH FILTER BAR ================= */}
      {(activeTab === 'overview' || activeTab === 'team') && (
        <section className="py-20 max-w-7xl mx-auto px-6 lg:px-10 border-b border-black/[0.06]">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#981132] font-sans">
              District Executive Board 2026/2027
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#1C1C1E] mt-2 mb-3 font-sans">
              The Sitting Leadership Team
            </h2>
            <p className="max-w-xl mx-auto text-gray-600 text-sm md:text-base font-sans">
              The executive board coordinating the strategy, service programs, and member support across all 77 clubs.
            </p>
          </motion.div>

          {/* Interactive Search & Filter Bar */}
          <div className="mb-10 p-4 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search executive leaders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-gray-50 border border-black/10 focus:outline-none focus:border-[#981132] font-sans transition-colors"
              />
            </div>

            {/* Department Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
                    selectedDept === dept
                      ? 'bg-[#981132] text-white shadow-sm'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Result Count */}
            <div className="text-[11px] text-gray-500 font-mono font-semibold shrink-0">
              {filteredTeam.length} Leader{filteredTeam.length === 1 ? '' : 's'}
            </div>
          </div>

          {/* Executive Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
            {filteredTeam.map((member, idx) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative cursor-pointer"
                onClick={() => setSelectedLeaderModal(member)}
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
                    
                    {/* Hover Dossier Hint */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-md rounded-full p-1 text-white text-[10px]">
                      <ArrowUpRight size={13} />
                    </div>
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

      {/* ================= SECTION 4: DRR LINEAGE & PAST LEADERS TIMELINE ================= */}
      {(activeTab === 'overview' || activeTab === 'past-leaders') && (
        <section className="py-20 max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#981132] font-sans">
              District 9126 Leadership Succession
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#1C1C1E] mt-2 mb-3 font-sans">
              Order of DRR Leadership (1st to Present)
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 text-sm md:text-base font-sans">
              From the founding charter to the sitting administration — the chronological lineage of District Rotaract Representatives steering District 9126.
            </p>
          </motion.div>

          {/* Quick Succession Stepper Track */}
          <div className="mb-14 max-w-4xl mx-auto bg-gradient-to-r from-black/[0.02] via-black/[0.04] to-black/[0.02] p-5 sm:p-6 rounded-3xl border border-black/[0.06] shadow-sm">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#981132] text-center mb-4">
              Chronological DRR Succession Track
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative">
              {pastLeaders.filter(l => l.order !== 'D9125 Precursor').map((l, i) => (
                <div 
                  key={l.order}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center gap-3 ${
                    l.isCurrent 
                      ? 'bg-gradient-to-br from-[#981132]/10 via-[#D91B5C]/5 to-transparent border-[#981132]/30 shadow-sm'
                      : 'bg-white border-black/[0.08]'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-black/10 shadow-sm">
                    <img 
                      src={l.image} 
                      onError={(e) => { e.currentTarget.src = l.fallbackImage; }}
                      alt={l.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[9px] font-black uppercase tracking-wider ${l.isCurrent ? 'text-[#981132]' : 'text-gray-500'}`}>
                        {l.order}
                      </span>
                      {l.isCurrent && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#981132] animate-pulse" />
                      )}
                    </div>
                    <div className="text-xs font-bold text-[#1C1C1E] truncate">{l.name.replace('Rtr. PP ', '')}</div>
                    <div className="text-[10px] text-gray-500 font-mono">{l.tenure}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full Chronological Cards List */}
          <div className="space-y-6 max-w-4xl mx-auto">
            {pastLeaders.map((leader, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-6 md:p-8 rounded-3xl bg-white border transition-all duration-300 flex flex-col md:flex-row items-center md:items-start gap-6 group hover:-translate-y-1 shadow-sm hover:shadow-xl ${
                  leader.isCurrent 
                    ? 'border-[#981132]/40 ring-2 ring-[#981132]/10' 
                    : 'border-black/[0.08]'
                }`}
              >
                <div className="relative">
                  <div className="w-24 h-28 md:w-32 md:h-36 rounded-2xl overflow-hidden shrink-0 border-2 border-black/10 shadow-lg relative z-10">
                    <img 
                      src={leader.image} 
                      onError={(e) => { e.currentTarget.src = leader.fallbackImage; }}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div 
                    className="absolute -inset-1 rounded-2xl blur-md opacity-25 -z-0 pointer-events-none"
                    style={{ background: leader.accentColor || '#981132' }}
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5 flex-wrap">
                    <span 
                      className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider font-sans"
                      style={{ 
                        backgroundColor: `${leader.accentColor || '#981132'}15`,
                        color: leader.accentColor || '#981132'
                      }}
                    >
                      {leader.badge}
                    </span>
                    <span className="text-xs font-semibold text-gray-500 font-mono">
                      {leader.tenure}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-[#1C1C1E] font-sans">
                    {leader.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#D91B5C] mb-2 font-sans">
                    {leader.title} · <span className="text-gray-500">{leader.credentials}</span>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed mb-4 font-sans">
                    {leader.roleNote}
                  </p>

                  <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gray-100 text-[11px] font-semibold text-gray-700 italic font-sans">
                      <Award className="text-[#981132]" size={14} /> Theme: "{leader.theme}"
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ================= LEADER DOSSIER POPUP MODAL ================= */}
      <AnimatePresence>
        {selectedLeaderModal && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLeaderModal(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg bg-[#0F1624] border border-white/20 rounded-3xl shadow-2xl overflow-hidden text-white z-10 p-6 sm:p-8"
              style={{
                boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.9), 0 0 30px rgba(217, 27, 92, 0.3)',
              }}
            >
              {/* Header Top Gradient Accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#981132] via-[#D91B5C] to-[#D4A520]" />
              
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedLeaderModal(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X size={16} />
              </button>

              <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start mb-6">
                <div className="w-28 h-36 rounded-2xl overflow-hidden border border-white/20 shadow-lg shrink-0">
                  <img
                    src={selectedLeaderModal.image}
                    onError={(e) => { e.currentTarget.src = selectedLeaderModal.fallbackImage; }}
                    alt={selectedLeaderModal.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="text-center sm:text-left space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-[#D91B5C]/20 text-[#FF4D8D] border border-[#D91B5C]/40">
                    {selectedLeaderModal.dept}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-sans mt-2">
                    {selectedLeaderModal.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#D4A520] font-sans">
                    {selectedLeaderModal.role}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans bg-white/[0.04] p-4 rounded-xl border border-white/10 mb-6">
                {selectedLeaderModal.bio}
              </p>

              {/* Contact Actions */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`mailto:${selectedLeaderModal.email}`}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#981132] hover:bg-[#7D0E29] text-white text-xs font-bold transition-colors shadow-md font-sans"
                >
                  <Mail size={14} /> Send Email
                </a>
                <a
                  href={`tel:${selectedLeaderModal.phone}`}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors font-sans"
                >
                  <Phone size={14} /> Direct Line
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
