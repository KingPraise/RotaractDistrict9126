'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  MapPin, 
  Heart, 
  Users, 
  Zap, 
  Droplets, 
  BookOpen, 
  Leaf, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight,
  SlidersHorizontal,
  Globe,
  Globe2
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getStoredProjects, subscribeToProjects, ProjectItem } from '@/lib/services/projects-service';

const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
  Healthcare: { bg: 'rgba(217, 27, 92, 0.133)', border: 'rgba(217, 27, 92, 0.267)', text: '#D91B5C' },
  WASH: { bg: 'rgba(27, 140, 217, 0.133)', border: 'rgba(27, 140, 217, 0.267)', text: '#1B8CD9' },
  Education: { bg: 'rgba(212, 165, 32, 0.133)', border: 'rgba(212, 165, 32, 0.267)', text: '#D4A520' },
  Environment: { bg: 'rgba(34, 197, 94, 0.133)', border: 'rgba(34, 197, 94, 0.267)', text: '#22C55E' },
  'Food Security': { bg: 'rgba(249, 115, 22, 0.133)', border: 'rgba(249, 115, 22, 0.267)', text: '#F97316' },
  Empowerment: { bg: 'rgba(168, 85, 247, 0.133)', border: 'rgba(168, 85, 247, 0.267)', text: '#A855F7' }
};

export default function ProjectsPage() {
  const [projectsList, setProjectsList] = useState<ProjectItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSlide, setActiveSlide] = useState<number>(0);

  useEffect(() => {
    setProjectsList(getStoredProjects());
    const unsubscribe = subscribeToProjects((updated) => {
      setProjectsList(updated);
    });
    return unsubscribe;
  }, []);

  const categories = ['All', 'Healthcare', 'WASH', 'Education', 'Environment', 'Food Security', 'Empowerment'];

  const featuredProjects = useMemo(() => projectsList.slice(0, 3), [projectsList]);

  const filteredProjects = useMemo(() => {
    return projectsList.filter((p) => {
      const matchCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.club.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [projectsList, selectedCategory, searchQuery]);

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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#981132]/10 border border-[#981132]/20 text-[#981132] text-xs font-semibold mb-4">
              <Globe2 className="h-3.5 w-3.5" />
              <span>District Impact Showcase</span>
            </div>

            <h1 className="font-black tracking-tighter mb-4 font-sans leading-[1]">
              <span className="block text-[clamp(2.8rem,7vw,6rem)] leading-[0.95] text-[#111111]">
                Project
              </span>
              <span 
                className="block text-[clamp(1.7rem,4.3vw,3.7rem)] leading-[1.1] text-[#D4A520]"
                style={{ textShadow: 'rgba(212, 165, 32, 0.3) 0px 0px 50px' }}
              >
                Spotlight
              </span>
            </h1>
            <p className="max-w-xl mx-auto text-black/60 leading-relaxed px-4 text-[clamp(0.95rem,1.5vw,1.1rem)] font-sans">
              Every photo tells a story of real change. Explore the documented legacy of District 9126 — from boreholes to blockchains, from classrooms to clinics.
            </p>
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
                    <div 
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
                          {(p.stats && p.stats.length > 0 ? p.stats : [
                            { icon: 'users', value: p.statNumber || '1,000+', label: p.statLabel || 'Impact' }
                          ]).map((s, sIdx) => (
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
                    </div>
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl bg-white shadow-md border border-black/[0.06] mb-12">
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
        </div>

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

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 flex-wrap font-sans">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 px-3 py-1 rounded-lg font-semibold uppercase tracking-wider text-[10.5px] transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-[#D91B5C] to-[#A70C43] text-white shadow-[0_0_16px_rgba(217,27,92,0.35)] font-bold'
                      : 'bg-white/80 border border-black/10 text-gray-700 hover:bg-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* CSS Masonry Columns with Original Sliding Drawer Hover Effect */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5" style={{ columnFill: 'balance' }}>
            {filteredProjects.map((p) => {
              const theme = categoryColors[p.category] || categoryColors.Healthcare;

              return (
                <div key={p.id} className="break-inside-avoid mb-5">
                  <div 
                    className={`relative overflow-hidden rounded-2xl cursor-pointer group shadow-lg ${p.height || 'h-[300px]'}`}
                    style={{ border: '1px solid rgba(0, 0, 0, 0.08)' }}
                  >
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#080C14]/85 via-[#080C14]/15 to-transparent" />

                    {/* Category Pill Tag (Top-Left) */}
                    <div 
                      className="absolute top-4 left-4 px-2 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase backdrop-blur-md"
                      style={{ background: theme.bg, borderColor: theme.border, color: theme.text, borderWidth: '1px' }}
                    >
                      {p.category}
                    </div>

                    {/* Year Tag (Top-Right) */}
                    <div className="absolute top-4 right-4 px-2 py-0.5 rounded text-[9px] text-white/70 bg-black/50 backdrop-blur-sm font-sans">
                      {p.year}
                    </div>

                    {/* Default Mobile & Desktop Info (fades out on hover) */}
                    <div className="absolute left-0 right-0 bottom-0 p-4 sm:p-5 font-sans group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                      <p className="text-[10px] text-white/70 mb-0.5 truncate font-sans">{p.club}</p>
                      <h3 className="font-bold text-white text-sm sm:text-base leading-tight drop-shadow-sm mb-1">
                        {p.title}
                      </h3>
                      <p className="flex items-center gap-1 text-white/70 text-[11px]">
                        <MapPin className="text-[#D91B5C] shrink-0" size={10}/>
                        {p.location}
                      </p>
                    </div>

                    {/* Sliding Bottom Drawer on Hover */}
                    <div className="absolute left-0 right-0 bottom-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-[#080C14]/95 backdrop-blur-md border-t border-white/10 p-5 font-sans">
                      <p className="text-[10px] text-white/50 mb-1 truncate font-sans">{p.club}</p>
                      <h3 className="font-black text-white leading-tight mb-1 text-[clamp(0.95rem,2vw,1.15rem)] font-sans">
                        {p.title}
                      </h3>
                      <p className="flex items-center gap-1 text-white/60 text-xs mb-3 font-sans">
                        <MapPin className="text-[#D91B5C] shrink-0" size={10}/>
                        {p.location}
                      </p>

                      {/* Stat Metrics Row */}
                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                        {(p.stats && p.stats.length > 0 ? p.stats : [
                          { icon: 'users', value: p.statNumber || '1,000+', label: p.statLabel || 'Impact' }
                        ]).map((s, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-1.5 font-sans">
                            {renderIcon(s.icon, theme.text)}
                            <span className="font-black text-white text-sm">{s.value}</span>
                            <span className="text-white/50 text-[11px] leading-none">{s.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Full Report Link */}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                        <span className="text-[10px] text-white/40 font-sans">D9126 Project</span>
                        <Link 
                          href="/#impact" 
                          className="flex items-center gap-1 text-xs font-bold transition-colors hover:text-white"
                          style={{ color: theme.text }}
                        >
                          Full Report <ChevronRight size={13}/>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
