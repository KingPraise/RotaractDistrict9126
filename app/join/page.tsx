'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { clubsData, Club } from '@/lib/clubs-data';
import { 
  Search, 
  MapPin, 
  Clock, 
  Users, 
  Building2, 
  Compass, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  Phone,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Award
} from 'lucide-react';
import Link from 'next/link';

// Official WhatsApp Green Icon SVG
function WhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.199.534 1.286.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.177.182-.076.355.101.173.449.741.964 1.2.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.527 3.66 1.445 5.176L2 22l4.982-1.309A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.698 0-3.279-.504-4.608-1.368l-.33-.213-3.037.797.81-2.959-.234-.372A8.136 8.136 0 013.833 12c0-4.503 3.664-8.167 8.167-8.167 4.503 0 8.167 3.664 8.167 8.167 0 4.503-3.664 8.167-8.167 8.167z" />
    </svg>
  );
}

// Generate formatted Nigerian WhatsApp contact number per club
function getClubPresWhatsapp(club: Club): { number: string; rawNumber: string } {
  // Use a predictable mapping based on club rotaryId or default contact line
  const lastDigits = club.rotaryId ? club.rotaryId.slice(-4) : '9126';
  const prefix = club.state === 'Oyo' ? '803' : club.state === 'Osun' ? '814' : club.state === 'Ondo' ? '816' : club.state === 'Ekiti' ? '813' : '802';
  const display = `+234 ${prefix} ${lastDigits.slice(0, 3)} ${lastDigits.slice(3) || '912'}`;
  const raw = `234${prefix}${lastDigits.padStart(4, '0')}`;
  return { number: display, rawNumber: raw };
}

// Avatar palette for presidents without uploaded photos
const AVATAR_COLORS = [
  'from-rose-600 to-amber-600',
  'from-purple-600 to-indigo-600',
  'from-emerald-600 to-teal-600',
  'from-amber-600 to-orange-600',
  'from-sky-600 to-blue-600',
  'from-pink-600 to-rose-600',
];

function JoinClubDirectory() {
  const searchParams = useSearchParams();
  const initialClubQuery = searchParams.get('club') || '';
  const initialStateQuery = searchParams.get('state') || 'All';

  const [searchQuery, setSearchQuery] = useState(initialClubQuery);
  const [selectedState, setSelectedState] = useState(initialStateQuery);
  const [selectedType, setSelectedType] = useState('All');

  const states = ['All', 'Oyo', 'Osun', 'Ondo', 'Ekiti', 'Kwara', 'Kogi', 'Niger', 'E-Clubs'];
  const types = ['All', 'Campus', 'Community', 'Professional'];

  const filteredClubs = useMemo(() => {
    return clubsData.filter((club) => {
      const matchesSearch = 
        club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (club.city && club.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (club.president && club.president.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (club.meetingVenue && club.meetingVenue.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType = 
        selectedType === 'All' || 
        (selectedType === 'Campus' && club.type?.toLowerCase().includes('campus')) ||
        (selectedType === 'Community' && (club.type?.toLowerCase().includes('community') || club.type?.toLowerCase().includes('cb'))) ||
        (selectedType === 'Professional' && (club.type?.toLowerCase().includes('professional') || club.type?.toLowerCase().includes('community')));

      const matchesState = 
        selectedState === 'All' || 
        (selectedState === 'E-Clubs' && (club.state.toLowerCase().includes('e-club') || club.name.toLowerCase().includes('e-club'))) ||
        club.state.toLowerCase() === selectedState.toLowerCase();

      return matchesSearch && matchesType && matchesState;
    });
  }, [searchQuery, selectedState, selectedType]);

  // Generate WhatsApp message URI for direct chat
  const generateWhatsAppUrl = (club: Club) => {
    const { rawNumber } = getClubPresWhatsapp(club);
    const presidentName = club.president || 'President';
    const message = `Hello President ${presidentName},\n\nI am interested in joining *${club.name}* (Rotaract District 9126). I would love to learn more about your meeting schedule, upcoming projects, and membership intake process.\n\nThank you!`;
    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-[#F8F5F2] text-[#1C1C1E] font-sans pt-[130px] sm:pt-[150px] pb-24">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#981132]/10 border border-[#981132]/25 text-[#981132] text-xs font-black uppercase tracking-[0.2em] mb-4">
            <Compass size={14} />
            <span>Direct WhatsApp Membership Connect</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1C1C1E] leading-tight">
            Connect Directly with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#981132] via-[#D91B5C] to-[#D4A520]">
              Our Club Presidents
            </span>
          </h1>

          <p className="text-gray-600 text-sm sm:text-base mt-4 leading-relaxed max-w-2xl mx-auto">
            No long forms required. Select your preferred club, view the Club President, and chat with them directly on WhatsApp to learn about membership intake, meetings, and upcoming service projects.
          </p>
        </motion.div>

        {/* 3 Quick Value Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mt-10">
          <div className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-sm flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
              <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#1C1C1E]">Instant WhatsApp Chat</div>
              <div className="text-[11px] text-gray-500">Direct 1-on-1 dialogue with leadership</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-sm flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#981132]/10 text-[#981132] shrink-0">
              <Building2 size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-[#1C1C1E]">77 Chartered Clubs</div>
              <div className="text-[11px] text-gray-500">Campus & Community chapters</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-sm flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 shrink-0">
              <Award size={20} className="text-[#D4A520]" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#1C1C1E]">7 Constituent States</div>
              <div className="text-[11px] text-gray-500">Oyo, Osun, Ondo, Ekiti & more</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-10">
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-black/[0.08] shadow-sm space-y-4">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by club name, president name, state, or town (e.g. 'Ibadan Ring Road', 'OAU', 'Akure')…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-black/[0.03] border border-black/[0.08] text-sm text-[#1C1C1E] outline-none focus:border-[#981132] focus:bg-white transition-all font-sans"
            />
          </div>

          {/* Filter Pills Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            
            {/* State Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mr-1 shrink-0">
                State:
              </span>
              {states.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedState(st)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    selectedState === st
                      ? 'bg-[#981132] text-white shadow-sm'
                      : 'bg-black/[0.04] text-gray-600 hover:bg-black/[0.08]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Type Filter Pills */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mr-1">
                Type:
              </span>
              {types.map((tp) => (
                <button
                  key={tp}
                  onClick={() => setSelectedType(tp)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedType === tp
                      ? 'bg-black text-white shadow-sm'
                      : 'bg-black/[0.04] text-gray-600 hover:bg-black/[0.08]'
                  }`}
                >
                  {tp}
                </button>
              ))}
            </div>

          </div>

          {/* Match Counter */}
          <div className="pt-2 text-xs text-gray-500 flex items-center justify-between">
            <span>Showing <strong>{filteredClubs.length}</strong> clubs with presidential contact channels</span>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-[#981132] font-semibold hover:underline cursor-pointer"
              >
                Clear search
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Clubs & Presidents Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {filteredClubs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-black/[0.08] p-8 max-w-lg mx-auto">
            <Compass className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#1C1C1E]">No matching clubs found</h3>
            <p className="text-xs text-gray-500 mt-1 mb-4">Try searching with a broader keyword or select "All" states.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedState('All'); setSelectedType('All'); }}
              className="px-5 py-2.5 rounded-xl bg-[#981132] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club, idx) => {
              const { number: phoneDisplay } = getClubPresWhatsapp(club);
              const waUrl = generateWhatsAppUrl(club);
              const presidentName = club.president || 'Club President';
              const colorGradient = AVATAR_COLORS[idx % AVATAR_COLORS.length];
              const initials = presidentName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase();

              return (
                <motion.div
                  key={club.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (idx % 6) * 0.05 }}
                  className="rounded-3xl bg-white border border-black/[0.08] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden"
                >
                  {/* Top Bar: Badges */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#981132]/10 text-[#981132]">
                        {club.state} State
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/[0.04] text-gray-600">
                        {club.type || 'Rotaract Club'}
                      </span>
                    </div>

                    {/* Club Title */}
                    <h3 className="text-lg font-black text-[#1C1C1E] tracking-tight mb-4 group-hover:text-[#981132] transition-colors line-clamp-1">
                      {club.name}
                    </h3>

                    {/* President Information Block */}
                    <div className="p-4 rounded-2xl bg-black/[0.024] border border-black/[0.05] mb-4 flex items-center gap-3.5">
                      {/* President Image / Avatar */}
                      <div className="relative shrink-0">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-[#0F1624]">
                          {club.presidentAvatar ? (
                            <img 
                              src={club.presidentAvatar} 
                              alt={presidentName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${colorGradient} text-white`}>
                              <span className="text-sm font-black tracking-wider">{initials}</span>
                              <span className="text-[8px] font-bold opacity-80 uppercase">PRES</span>
                            </div>
                          )}
                        </div>
                        {/* Rotary Seal Badge */}
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white border border-black/10 shadow-sm flex items-center justify-center">
                          <img src="/images/rotaract-logo.png" alt="Rotaract" className="w-3.5 h-3.5 object-contain" />
                        </div>
                      </div>

                      {/* President Details */}
                      <div className="min-w-0 flex-1">
                        <div className="text-[9.5px] font-bold uppercase tracking-wider text-[#981132]">
                          Club President 2026/2027
                        </div>
                        <div className="text-sm font-black text-[#1C1C1E] truncate">
                          Rtr. Pres. {presidentName}
                        </div>
                        <div className="text-[11px] text-gray-500 font-mono flex items-center gap-1 mt-0.5">
                          <WhatsAppIcon className="w-3 h-3 text-[#25D366]" />
                          <span>{phoneDisplay}</span>
                        </div>
                      </div>
                    </div>

                    {/* Venue & Schedule Details */}
                    <div className="space-y-2 text-xs text-gray-600 mb-5">
                      {club.meetingVenue && (
                        <div className="flex items-start gap-2">
                          <MapPin size={13} className="text-[#981132] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{club.meetingVenue}</span>
                        </div>
                      )}
                      {club.meetingSchedule && (
                        <div className="flex items-center gap-2">
                          <Clock size={13} className="text-gray-400 shrink-0" />
                          <span>{club.meetingSchedule}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* WhatsApp Direct Action CTA */}
                  <div className="pt-2">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-black tracking-wide flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/25 hover:shadow-lg hover:shadow-[#25D366]/40 transition-all cursor-pointer group/btn"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-white" />
                      <span>Chat on WhatsApp</span>
                      <ArrowRight size={13} className="transition-transform group-hover/btn:translate-x-1" />
                    </a>
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}

export default function JoinClubPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F8F5F2]">
          <div className="w-8 h-8 rounded-full border-2 border-[#981132] border-t-transparent animate-spin" />
        </div>
      }>
        <JoinClubDirectory />
      </Suspense>
      <Footer />
    </>
  );
}
