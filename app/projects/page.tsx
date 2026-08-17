'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Heart, 
  Users, 
  Zap, 
  Droplets, 
  BookOpen, 
  Leaf, 
  ArrowLeft, 
  ArrowRight,
  SlidersHorizontal,
  Globe,
  Globe2
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface Project {
  id: string;
  title: string;
  category: 'Healthcare' | 'WASH' | 'Education' | 'Environment' | 'Food Security' | 'Empowerment';
  year: string;
  club: string;
  location: string;
  image: string;
  height: string; // For dynamic masonry feel
  stats: {
    icon: 'heart' | 'users' | 'zap' | 'droplets' | 'book' | 'leaf' | 'pin';
    value: string;
    label: string;
  }[];
}

const projectsData: Project[] = [
  {
    id: '1',
    title: 'Operation Vaccinate 500',
    category: 'Healthcare',
    year: '2024',
    club: 'Rotaract Club of LAUTECH',
    location: 'Ogbomoso, Oyo State',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=900&h=700&fit=crop&auto=format',
    height: 'h-[380px]',
    stats: [
      { icon: 'heart', value: '500', label: 'Children Vaccinated' },
      { icon: 'users', value: '12', label: 'Medical Volunteers' },
      { icon: 'pin', value: '3', label: 'Communities Reached' }
    ]
  },
  {
    id: '2',
    title: 'Clean Water for Offa',
    category: 'WASH',
    year: '2024',
    club: 'Rotaract Club of Offa',
    location: 'Offa, Kwara State',
    image: 'https://images.unsplash.com/photo-1760873059715-7c7cfbe2a2c6?w=900&h=600&fit=crop&auto=format',
    height: 'h-[280px]',
    stats: [
      { icon: 'droplets', value: '2', label: 'Boreholes Constructed' },
      { icon: 'users', value: '1,200', label: 'Beneficiaries' },
      { icon: 'zap', value: '₦48K', label: 'Community Investment' }
    ]
  },
  {
    id: '3',
    title: 'Digital Skills Academy',
    category: 'Education',
    year: '2023',
    club: 'Rotaract Club of Ibadan Central',
    location: 'Ibadan, Oyo State',
    image: 'https://images.unsplash.com/photo-1620829813573-7c9e1877706f?w=900&h=700&fit=crop&auto=format',
    height: 'h-[260px]',
    stats: [
      { icon: 'users', value: '2,400', label: 'Youth Trained' },
      { icon: 'book', value: '8', label: 'Training Centres' },
      { icon: 'zap', value: '94%', label: 'Job Placement Rate' }
    ]
  },
  {
    id: '4',
    title: 'Green Ibadan Initiative',
    category: 'Environment',
    year: '2024',
    club: 'Rotaract Club of University of Ibadan',
    location: 'Ibadan, Oyo State',
    image: 'https://images.unsplash.com/photo-1598335624134-5bceb5de202d?w=900&h=600&fit=crop&auto=format',
    height: 'h-[280px]',
    stats: [
      { icon: 'leaf', value: '5,000', label: 'Trees Planted' },
      { icon: 'users', value: '340', label: 'Volunteers' },
      { icon: 'pin', value: '7', label: 'Forest Zones' }
    ]
  },
  {
    id: '5',
    title: 'End Polio Awareness Walk',
    category: 'Healthcare',
    year: '2023',
    club: 'Rotaract Club of Akure',
    location: 'Akure, Ondo State',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=900&h=600&fit=crop&auto=format',
    height: 'h-[300px]',
    stats: [
      { icon: 'users', value: '600+', label: 'Walkers' },
      { icon: 'zap', value: '₦1.2M', label: 'Funds Raised' },
      { icon: 'pin', value: '14', label: 'Clubs Participating' }
    ]
  },
  {
    id: '6',
    title: 'Feed the Street Osogbo',
    category: 'Food Security',
    year: '2024',
    club: 'Rotaract Club of Osogbo Central',
    location: 'Osogbo, Osun State',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&h=600&fit=crop&auto=format',
    height: 'h-[360px]',
    stats: [
      { icon: 'heart', value: '3,200', label: 'Meals Distributed' },
      { icon: 'users', value: '85', label: 'Volunteers' },
      { icon: 'pin', value: '5', label: 'Distribution Points' }
    ]
  },
  {
    id: '7',
    title: 'Blood Donation Drive',
    category: 'Healthcare',
    year: '2023',
    club: 'Rotaract Club of University of Ibadan',
    location: 'Ibadan, Oyo State',
    image: 'https://images.unsplash.com/flagged/photo-1555251255-e9a095d6eb9d?w=900&h=700&fit=crop&auto=format',
    height: 'h-[280px]',
    stats: [
      { icon: 'heart', value: '850', label: 'Units Collected' },
      { icon: 'users', value: '28', label: 'Hospitals Supplied' },
      { icon: 'zap', value: '3', label: 'Drive Days' }
    ]
  },
  {
    id: '8',
    title: 'Literacy For All Campaign',
    category: 'Education',
    year: '2023',
    club: 'Rotaract Club of Lokoja',
    location: 'Lokoja, Kogi State',
    image: 'https://images.unsplash.com/photo-1627423893729-3a79f48ff473?w=900&h=600&fit=crop&auto=format',
    height: 'h-[260px]',
    stats: [
      { icon: 'book', value: '1,200', label: 'Adults Trained' },
      { icon: 'users', value: '60', label: 'Volunteer Teachers' },
      { icon: 'pin', value: '9', label: 'Learning Centres' }
    ]
  },
  {
    id: '9',
    title: 'Water Pump Installation',
    category: 'WASH',
    year: '2024',
    club: 'Rotaract Club of Minna',
    location: 'Minna, Niger State',
    image: 'https://images.unsplash.com/photo-1611502029437-54521b5e6ada?w=900&h=700&fit=crop&auto=format',
    height: 'h-[380px]',
    stats: [
      { icon: 'droplets', value: '4', label: 'Pumps Installed' },
      { icon: 'users', value: '3,400', label: 'Daily Users' },
      { icon: 'pin', value: '4', label: 'Villages Served' }
    ]
  }
];

const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
  Healthcare: { bg: 'rgba(217, 27, 92, 0.133)', border: 'rgba(217, 27, 92, 0.267)', text: '#D91B5C' },
  WASH: { bg: 'rgba(27, 140, 217, 0.133)', border: 'rgba(27, 140, 217, 0.267)', text: '#1B8CD9' },
  Education: { bg: 'rgba(139, 27, 217, 0.133)', border: 'rgba(139, 27, 217, 0.267)', text: '#8B1BD9' },
  Environment: { bg: 'rgba(22, 163, 74, 0.133)', border: 'rgba(22, 163, 74, 0.267)', text: '#16A34A' },
  'Food Security': { bg: 'rgba(217, 119, 27, 0.133)', border: 'rgba(217, 119, 27, 0.267)', text: '#D9771B' },
  Empowerment: { bg: 'rgba(212, 165, 32, 0.133)', border: 'rgba(212, 165, 32, 0.267)', text: '#D4A520' }
};

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const categories = ['All', 'Healthcare', 'WASH', 'Education', 'Environment', 'Food Security'];

  const featuredProjects = useMemo(() => projectsData.slice(0, 3), []);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((p) => {
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.club.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const renderIcon = (icon: string, color: string) => {
    switch (icon) {
      case 'heart': return <Heart color={color} size={12} />;
      case 'users': return <Users color={color} size={12} />;
      case 'droplets': return <Droplets color={color} size={12} />;
      case 'book': return <BookOpen color={color} size={12} />;
      case 'leaf': return <Leaf color={color} size={12} />;
      case 'pin': return <MapPin color={color} size={12} />;
      default: return <Zap color={color} size={12} />;
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8F5F2] text-[#111111]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        
        {/* HERO SPOTLIGHT HEADER */}
        <div className="relative pt-[140px] sm:pt-[160px] pb-14 text-center overflow-hidden">
          {/* Radial Top Glow */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{ background: 'radial-gradient(70% 55% at 50% 0%, rgba(217, 27, 92, 0.16) 0%, transparent 70%)' }} 
          />

          {/* Guidelines Grid */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100].map((left, idx) => (
              <div 
                key={idx} 
                className="absolute top-0 bottom-0 border-l border-black/[0.03]" 
                style={{ left: `${left}%` }} 
              />
            ))}
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#981132]/10 border border-[#981132]/20 text-[#981132] text-xs font-semibold mb-4"
            >
              <Globe2 className="h-3.5 w-3.5" />
              <span>District Impact Showcase</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-black tracking-tighter mb-4 font-sans leading-[1]"
            >
              <span className="block text-[clamp(2.8rem,7vw,6rem)] leading-[0.95] text-[#111111]">
                Project
              </span>
              <span 
                className="block text-[clamp(1.7rem,4.3vw,3.7rem)] leading-[1.1] text-[#D4A520]"
                style={{ textShadow: 'rgba(212, 165, 32, 0.3) 0px 0px 50px' }}
              >
                Spotlight
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl mx-auto text-black/60 leading-relaxed px-4 text-[clamp(0.95rem,1.5vw,1.1rem)] font-sans"
            >
              Every photo tells a story of real change. Explore the documented legacy of District 9126 — from boreholes to blockchains, from classrooms to clinics.
            </motion.p>
          </div>
        </div>

        {/* 3D FEATURED CAROUSEL */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#D91B5C] font-sans font-semibold">
              Featured Projects
            </span>
            <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-[#D91B5C] to-transparent" />
          </div>

          <div className="relative w-full overflow-hidden" style={{ perspective: '1200px' }}>
            {/* Bottom Glow */}
            <div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-32 pointer-events-none blur-2xl" 
              style={{ background: 'radial-gradient(rgba(217, 27, 92, 0.18) 0%, transparent 70%)' }} 
            />

            {/* 3D Cards Stage */}
            <div className="relative h-[420px] md:h-[500px] flex items-center justify-center">
              {featuredProjects.map((p, idx) => {
                const isCenter = idx === activeSlide;
                const isLeft = idx === (activeSlide - 1 + featuredProjects.length) % featuredProjects.length;
                const isRight = idx === (activeSlide + 1) % featuredProjects.length;

                let transform = 'scale(0.7) opacity(0)';
                let zIndex = 0;
                let opacity = 0;

                if (isCenter) {
                  transform = 'translateX(0px) scale(1)';
                  zIndex = 10;
                  opacity = 1;
                } else if (isRight) {
                  transform = 'translateX(62%) scale(0.82)';
                  zIndex = 5;
                  opacity = 0.55;
                } else if (isLeft) {
                  transform = 'translateX(-62%) scale(0.82)';
                  zIndex = 5;
                  opacity = 0.55;
                }

                return (
                  <div
                    key={p.id}
                    onClick={() => setActiveSlide(idx)}
                    className="absolute w-full max-w-3xl cursor-pointer select-none transition-all duration-700 ease-out"
                    style={{ transform, zIndex, opacity }}
                  >
                    <motion.div 
                      whileHover={{ scale: isCenter ? 1.02 : 0.85 }}
                      transition={{ duration: 0.3 }}
                      className="relative rounded-2xl overflow-hidden shadow-2xl"
                      style={{ 
                        border: isCenter ? '1px solid rgba(217, 27, 92, 0.35)' : '1px solid rgba(0, 0, 0, 0.08)',
                        boxShadow: isCenter ? '0 32px 80px rgba(0,0,0,0.35), 0 0 80px rgba(217,27,92,0.2)' : '0 16px 60px rgba(0,0,0,0.15)'
                      }}
                    >
                      <img 
                        src={p.image} 
                        alt={p.title} 
                        className="w-full object-cover" 
                        style={{ height: 'clamp(240px, 38vw, 420px)' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080C14]/95 via-[#080C14]/40 to-transparent" />

                      {/* Info Panel Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-7 flex flex-col gap-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="flex items-center gap-1 text-[11px] text-white/60 font-sans">
                            <MapPin className="text-[#D91B5C]" size={10}/>
                            {p.location}
                          </span>
                          <span className="ml-auto text-[10px] text-white/50 font-sans">{p.year}</span>
                        </div>

                        <h2 className="font-black text-white leading-tight font-sans text-[clamp(1.4rem,3vw,2.2rem)]">
                          {p.title}
                        </h2>

                        <div className="flex items-center gap-4 flex-wrap">
                          {p.stats.map((s, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-1.5 font-sans">
                              {renderIcon(s.icon, '#D91B5C')}
                              <span className="font-black text-white text-sm">{s.value}</span>
                              <span className="text-white/50 text-xs">{s.label}</span>
                            </div>
                          ))}

                          <Link
                            href="/#impact"
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#981132] hover:bg-[#A70C43] text-white text-[11.5px] font-bold tracking-wide shadow-md transition-all font-sans ml-auto group"
                          >
                            View Project
                            <span className="w-[22px] h-[22px] rounded-full bg-black/35 backdrop-blur-sm inline-flex items-center justify-center border border-white/15 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                              <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-5 mt-6">
              <button 
                onClick={() => setActiveSlide((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-black/60 hover:text-black border border-black/10 hover:border-black/30 transition-all hover:bg-black/5 cursor-pointer"
                aria-label="Previous Slide"
              >
                <ArrowLeft size={16} strokeWidth={2}/>
              </button>

              <div className="flex items-center gap-2">
                {featuredProjects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className="rounded-full transition-all duration-300 cursor-pointer"
                    style={{
                      width: activeSlide === idx ? '24px' : '6px',
                      height: '6px',
                      background: activeSlide === idx ? '#D91B5C' : 'rgba(0, 0, 0, 0.2)'
                    }}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button 
                onClick={() => setActiveSlide((prev) => (prev + 1) % featuredProjects.length)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-black/60 hover:text-black border border-black/10 hover:border-black/30 transition-all hover:bg-black/5 cursor-pointer"
                aria-label="Next Slide"
              >
                <ArrowRight size={16} strokeWidth={2}/>
              </button>
            </div>
          </div>
        </section>

        {/* 4-METRIC IMPACT RIBBON */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl bg-white shadow-md border border-black/[0.06] mb-12"
        >
          <div className="flex flex-col items-center gap-2 px-6 py-7 hover:bg-gray-50 transition-colors border-r border-black/[0.06]">
            <Zap className="text-[#D91B5C] opacity-80 shrink-0" size={18}/>
            <span className="font-sans font-black text-3xl text-[#D4A520] leading-none">180+</span>
            <span className="font-sans text-[10px] text-gray-600 uppercase tracking-wider text-center font-medium">
              Projects Completed
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 px-6 py-7 hover:bg-gray-50 transition-colors border-r border-black/[0.06]">
            <Globe className="text-[#D91B5C] opacity-80 shrink-0" size={18}/>
            <span className="font-sans font-black text-3xl text-[#D4A520] leading-none">77</span>
            <span className="font-sans text-[10px] text-gray-600 uppercase tracking-wider text-center font-medium">
              Active Clubs
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 px-6 py-7 hover:bg-gray-50 transition-colors border-r border-black/[0.06]">
            <Heart className="text-[#D91B5C] opacity-80 shrink-0" size={18}/>
            <span className="font-sans font-black text-3xl text-[#D4A520] leading-none">50K+</span>
            <span className="font-sans text-[10px] text-gray-600 uppercase tracking-wider text-center font-medium">
              Lives Impacted
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 px-6 py-7 hover:bg-gray-50 transition-colors">
            <MapPin className="text-[#D91B5C] opacity-80 shrink-0" size={18}/>
            <span className="font-sans font-black text-3xl text-[#D4A520] leading-none">7</span>
            <span className="font-sans text-[10px] text-gray-600 uppercase tracking-wider text-center font-medium">
              States Reached
            </span>
          </div>
        </motion.div>

        {/* ALL IMPACT PROJECTS MASONRY FEED */}
        <section>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#D91B5C] font-sans font-semibold">
              All Impact Projects
            </span>
            <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-[#D91B5C] to-transparent" />
          </div>

          {/* Search & Category Pills Filter */}
          <div className="flex flex-col gap-3 mb-10">
            <div className="flex items-center gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14}/>
                <input 
                  type="text"
                  placeholder="Search projects…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-white border border-black/10 text-[#1C1C1E] placeholder-gray-400 outline-none focus:border-[#981132] transition-colors font-sans"
                />
              </div>

              <span className="hidden lg:flex items-center gap-1.5 text-gray-500 text-xs ml-auto shrink-0 font-sans">
                <SlidersHorizontal size={12}/>
                {filteredProjects.length} projects
              </span>
            </div>

            {/* Category Filter Pills with Spring Animation */}
            <div className="flex items-center gap-2 flex-wrap font-sans">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative shrink-0 px-3.5 py-1.5 rounded-lg font-semibold uppercase tracking-wider text-[10.5px] transition-all cursor-pointer ${
                      isActive
                        ? 'text-white font-bold'
                        : 'bg-white/80 border border-black/10 text-gray-700 hover:bg-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="projectActiveCategoryPill"
                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#D91B5C] to-[#A70C43] shadow-[0_0_16px_rgba(217,27,92,0.35)] -z-10"
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      />
                    )}
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CSS Masonry Columns with Animated Cards */}
          <motion.div 
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-5" 
            style={{ columnFill: 'balance' }}
          >
            <AnimatePresence>
              {filteredProjects.map((p, idx) => {
                const theme = categoryColors[p.category] || categoryColors.Healthcare;

                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    key={p.id} 
                    className="break-inside-avoid mb-5"
                  >
                    <motion.div 
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      className={`relative overflow-hidden rounded-2xl cursor-pointer group shadow-lg ${p.height}`}
                      style={{ border: '1px solid rgba(0, 0, 0, 0.08)' }}
                    >
                      <img 
                        src={p.image} 
                        alt={p.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#080C14]/85 via-[#080C14]/15 to-transparent" />

                      {/* Category Badge (Top Right) */}
                      <div className="absolute top-3.5 right-3.5 z-10">
                        <span 
                          className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider backdrop-blur-md shadow-sm font-sans"
                          style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.text }}
                        >
                          {p.category}
                        </span>
                      </div>

                      {/* Hover / Bottom Metadata */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-2 z-10">
                        <div className="flex items-center gap-2 text-white/70 text-[11px] font-sans">
                          <MapPin size={11} className="text-[#D91B5C]"/>
                          <span>{p.location}</span>
                          <span className="ml-auto text-white/50 text-[10px]">{p.year}</span>
                        </div>

                        <h3 className="font-bold text-white text-base leading-snug font-sans group-hover:text-[#FFC72C] transition-colors">
                          {p.title}
                        </h3>

                        <div className="text-[11px] text-white/60 font-sans truncate">
                          {p.club}
                        </div>

                        {/* Stat Pills */}
                        <div className="flex items-center gap-2 pt-1 flex-wrap font-sans">
                          {p.stats.map((s, sIdx) => (
                            <div 
                              key={sIdx}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-white/80 text-[10px] border border-white/10 font-sans"
                            >
                              {renderIcon(s.icon, '#FF4D8D')}
                              <span className="font-bold">{s.value}</span>
                              <span className="text-white/50">{s.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
