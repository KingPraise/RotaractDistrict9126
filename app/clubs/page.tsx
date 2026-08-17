'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Search, MapPin, Clock, Users, List, Map as MapIcon } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { clubsData } from '@/lib/clubs-data';

// Dynamic import for Leaflet map component to prevent SSR window/document errors
const ClubMap = dynamic(() => import('@/components/clubs/ClubMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[450px] flex flex-col items-center justify-center bg-[#F8F5F2] text-gray-400 gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-[#981132] border-t-transparent animate-spin" />
      <span className="text-xs font-semibold uppercase tracking-widest text-[#981132] font-sans">
        Loading Interactive Map…
      </span>
    </div>
  ),
});

export default function ClubsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');
  const [activeClubId, setActiveClubId] = useState<string | null>(null);

  const states = ['All', 'Oyo', 'Osun', 'Ondo', 'Ekiti', 'Kwara', 'Kogi', 'E-Clubs'];
  const types = ['All', 'Campus', 'Professional', 'Community'];

  const filteredClubs = useMemo(() => {
    return clubsData.filter((club) => {
      const matchesSearch = 
        club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (club.city && club.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (club.rotaryId && club.rotaryId.includes(searchQuery));

      const matchesType = 
        selectedType === 'All' || 
        (selectedType === 'Campus' && club.type?.toLowerCase().includes('campus')) ||
        (selectedType === 'Community' && (club.type?.toLowerCase().includes('community') || club.type?.toLowerCase().includes('cb'))) ||
        (selectedType === 'Professional' && (club.type?.toLowerCase().includes('professional') || club.type?.toLowerCase().includes('community')));

      const matchesState = selectedState === 'All' || club.state.toLowerCase() === selectedState.toLowerCase();

      return matchesSearch && matchesType && matchesState;
    });
  }, [searchQuery, selectedType, selectedState]);

  const handleSelectClub = (id: string) => {
    setActiveClubId(id);
    const el = document.getElementById(`club-card-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-screen overflow-hidden flex flex-col pt-[76px]" style={{ fontFamily: 'Inter, sans-serif', background: 'rgb(248, 245, 244)', color: 'rgb(17, 17, 17)' }}>
        
        {/* Desktop & Mobile Split Container */}
        <div className="flex-1 flex overflow-hidden relative">
          
          {/* LEFT COLUMN: Club Directory List (37% width on desktop) */}
          <div 
            className={`w-full lg:w-[37%] flex flex-col h-full overflow-hidden border-r border-black/[0.07] bg-white/90 backdrop-blur-[24px] z-10 ${
              mobileView === 'map' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            {/* Header & Filter Controls */}
            <div className="pt-6 px-6 pb-4 border-b border-black/[0.06] shrink-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#981132] font-sans">
                  Club Finder
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-[#981132]/30 to-transparent" />
              </div>

              <h2 className="text-[22px] font-black leading-[1.15] mb-4 font-sans tracking-tight text-[#1C1C1E]">
                Find Your <span className="text-[#981132]">Community</span>
              </h2>

              {/* Search Input */}
              <div className="relative mb-3.5">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13} strokeWidth={2}/>
                <input
                  type="text"
                  placeholder="Search by name, area, or Rotary ID…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/85 border border-black/10 text-[#1C1C1E] text-xs font-sans outline-none focus:border-[#981132] transition-colors"
                />
              </div>

              {/* Club Type Filter Pills */}
              <div className="mb-2.5">
                <div className="text-[8.5px] font-bold text-gray-500 uppercase tracking-[0.15em] mb-1.5 font-sans">
                  Club Type
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {types.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-3 py-1 rounded-full text-[10px] font-sans transition-all cursor-pointer ${
                        selectedType === type
                          ? 'bg-gradient-to-r from-[#981132] to-[#A70C43] text-white font-bold shadow-[0_0_14px_rgba(152,17,50,0.35)]'
                          : 'bg-white/70 backdrop-blur-md border border-black/10 text-[#1C1C1E] font-medium hover:bg-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* State Filter Selector & Counter */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[8.5px] font-bold text-gray-500 uppercase tracking-[0.15em] font-sans">
                    State Territory
                  </span>
                  <span className="text-[10px] font-bold text-[#981132] font-sans">
                    {filteredClubs.length} {filteredClubs.length === 1 ? 'Club' : 'Clubs'} Found
                  </span>
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {states.map((state) => (
                    <button
                      key={state}
                      onClick={() => setSelectedState(state)}
                      className={`px-3 py-1 rounded-full text-[10px] font-sans whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                        selectedState === state
                          ? 'bg-[#1C1C1E] text-white font-bold'
                          : 'bg-black/[0.04] text-[#1C1C1E] font-medium hover:bg-black/[0.08]'
                      }`}
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Scrollable Club Cards List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredClubs.length === 0 && (
                <div className="text-center py-12 text-gray-400 font-sans text-xs">
                  No clubs match your criteria. Try adjusting your search query or filters.
                </div>
              )}

              {filteredClubs.map((club) => {
                const clubId = club.id || club.rotaryId || club.name;
                const isSelected = activeClubId === clubId;

                return (
                  <div
                    key={clubId}
                    id={`club-card-${clubId}`}
                    onClick={() => {
                      handleSelectClub(clubId);
                      if (window.innerWidth < 1024) {
                        setMobileView('map');
                      }
                    }}
                    className={`relative rounded-[18px] p-[18px_18px_16px] cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'bg-white shadow-[0_4px_20px_rgba(152,17,50,0.22)] border-2 border-[#981132] scale-[1.01]'
                        : 'bg-white/80 backdrop-blur-[20px] border border-black/[0.07] shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]'
                    }`}
                  >
                    {/* Top Row: Avatar & Title */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="relative shrink-0">
                        <div className="w-[46px] h-[46px] rounded-full p-[2px] bg-gradient-to-tr from-[#D91B5C] to-[#A855F7] shrink-0">
                          <img
                            src={club.presidentAvatar || "https://images.unsplash.com/photo-1573497491765-dccce02b29df?w=80&h=80&fit=crop&auto=format"}
                            alt={club.president || club.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="absolute bottom-0.5 right-0.5 w-[11px] h-[11px] rounded-full bg-green-500 border-2 border-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-[14.5px] font-bold text-[#1C1C1E] leading-tight truncate font-sans">
                          {club.name}
                        </div>
                        <div className="text-[11.5px] text-gray-500 mt-0.5 truncate font-sans">
                          {club.president ? `Pres. ${club.president}` : `ID: ${club.rotaryId || 'District 9126'}`}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/[0.04] border border-black/[0.07]">
                          <MapPin className="text-gray-500" size={9}/>
                          <span className="text-[10px] font-sans text-gray-700">{club.state}</span>
                        </div>
                        <div className="px-2 py-0.5 rounded-full bg-[#981132]/10 border border-[#981132]/20">
                          <span className="text-[9px] font-bold text-[#981132] tracking-wider uppercase font-sans">
                            {club.type || 'COMMUNITY'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Metadata Badges */}
                    <div className="flex gap-1.5 flex-wrap mb-3.5">
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/[0.04] border border-black/[0.07]">
                        <MapPin className="text-gray-500" size={9}/>
                        <span className="text-[10px] text-gray-700 font-sans">{club.city || club.state}</span>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/[0.04] border border-black/[0.07]">
                        <Clock className="text-gray-500" size={9}/>
                        <span className="text-[10px] text-gray-700 font-sans">{club.meetingSchedule || 'Weekly Meeting'}</span>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/[0.04] border border-black/[0.07]">
                        <Users className="text-gray-500" size={9}/>
                        <span className="text-[10px] text-gray-700 font-sans">{club.memberCount || '30+'} members</span>
                      </div>
                    </div>

                    {/* Express Interest Action Button */}
                    <Link
                      href={`/join?club=${encodeURIComponent(club.name)}`}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-full bg-[#981132] hover:bg-[#A70C43] text-white text-[13.5px] font-bold tracking-wide shadow-[0_4px_20px_rgba(152,17,50,0.32)] transition-all font-sans group hover:scale-[1.01]"
                    >
                      Express Interest
                      <span className="w-[26px] h-[26px] rounded-full bg-black/35 backdrop-blur-sm border border-white/15 inline-flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Leaflet Map Canvas (63% width on desktop) */}
          <div 
            className={`flex-1 relative overflow-hidden bg-[#F0ECE9] p-3 lg:p-4 flex flex-col ${
              mobileView === 'list' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            {/* Functional Leaflet Map */}
            <div className="relative w-full h-full flex-1 rounded-2xl overflow-hidden shadow-inner">
              <ClubMap
                clubs={filteredClubs}
                activeClubId={activeClubId}
                onSelectClub={handleSelectClub}
              />
            </div>

            {/* Floating Top-Right Legend Box */}
            <div className="absolute top-6 right-7 z-[400] rounded-2xl bg-white/95 backdrop-blur-md border border-black/10 p-3 shadow-lg min-w-[130px] pointer-events-none">
              <div className="text-[8px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-2 border-b border-black/[0.06] pb-1 font-sans">
                Club Type
              </div>
              <div className="space-y-1.5 text-[9.5px] font-sans text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#981132]" />
                  Professional
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8B3A7A]" />
                  Campus
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A70C43]" />
                  Community
                </div>
              </div>
            </div>

            {/* Floating Bottom-Left State Region Badge */}
            <div className="absolute bottom-7 left-7 z-[400] px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-black/10 shadow-md flex items-center gap-2 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#981132] animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#1C1C1E] font-sans">
                D9126 · 7 STATES ACTIVE · {filteredClubs.length} LOCATIONS
              </span>
            </div>
          </div>

          {/* Mobile View Toggle Switch (List vs Map) */}
          <div className="lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-[500] flex rounded-full bg-white/95 backdrop-blur-md border border-black/10 shadow-xl overflow-hidden p-1">
            <button
              onClick={() => setMobileView('list')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold font-sans transition-all cursor-pointer ${
                mobileView === 'list' ? 'bg-[#981132] text-white shadow-sm' : 'text-gray-700'
              }`}
            >
              <List size={12}/> List
            </button>
            <button
              onClick={() => setMobileView('map')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold font-sans transition-all cursor-pointer ${
                mobileView === 'map' ? 'bg-[#981132] text-white shadow-sm' : 'text-gray-700'
              }`}
            >
              <MapIcon size={12}/> Map
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
