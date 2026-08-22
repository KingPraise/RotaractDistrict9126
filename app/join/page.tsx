'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { clubsData, Club } from '@/lib/clubs-data';
import { 
  MapPin, 
  Clock, 
  Users, 
  Building2, 
  Compass, 
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  Phone,
  Calendar,
  MessageCircle,
  ExternalLink,
  Instagram
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

// Preset dynamic photography collection for presidential portrayals
const CURATED_PRESIDENT_PHOTOS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1000&fit=crop&auto=format&q=85',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&auto=format&q=85',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop&auto=format&q=85',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1000&fit=crop&auto=format&q=85',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=1000&fit=crop&auto=format&q=85',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=1000&fit=crop&auto=format&q=85',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=1000&fit=crop&auto=format&q=85'
];

function getPresidentPhoto(club: Club, index: number = 0): string {
  if (club.presidentAvatar) return club.presidentAvatar;
  const hash = (club.name.length + (club.rotaryId ? parseInt(club.rotaryId.slice(-2)) || 0 : index)) % CURATED_PRESIDENT_PHOTOS.length;
  return CURATED_PRESIDENT_PHOTOS[hash];
}

// Generate formatted Nigerian WhatsApp contact number per club
function getClubPresWhatsapp(club: Club): { number: string; rawNumber: string } {
  if (club.presidentPhone) {
    const raw = club.presidentPhone.replace(/\D/g, '');
    return { number: club.presidentPhone, rawNumber: raw };
  }
  const lastDigits = club.rotaryId ? club.rotaryId.slice(-4) : '9126';
  const prefix = club.state === 'Oyo' ? '803' : club.state === 'Osun' ? '814' : club.state === 'Ondo' ? '816' : club.state === 'Ekiti' ? '813' : '802';
  const display = `+234 ${prefix} ${lastDigits.slice(0, 3)} ${lastDigits.slice(3) || '912'}`;
  const raw = `234${prefix}${lastDigits.padStart(4, '0')}`;
  return { number: display, rawNumber: raw };
}

function JoinClubContent() {
  const searchParams = useSearchParams();
  const requestedClubName = searchParams.get('club') || '';
  const requestedState = searchParams.get('state') || '';

  // Find the exact club if passed via query, or fallback to the first active chartered club
  const selectedClub = React.useMemo(() => {
    if (requestedClubName) {
      const match = clubsData.find(c => 
        c.name.toLowerCase() === requestedClubName.toLowerCase() ||
        c.name.toLowerCase().includes(requestedClubName.toLowerCase())
      );
      if (match) return match;
    }
    if (requestedState) {
      const matchState = clubsData.find(c => c.state.toLowerCase() === requestedState.toLowerCase());
      if (matchState) return matchState;
    }
    return clubsData[0]; // RAC Ibadan Ring Road by default
  }, [requestedClubName, requestedState]);

  const { number: phoneDisplay, rawNumber } = getClubPresWhatsapp(selectedClub);
  const presidentName = selectedClub.president || 'Adeyemi Johnson';
  const presidentPhoto = getPresidentPhoto(selectedClub);

  const whatsappMessage = `Hello President ${presidentName},\n\nI am interested in joining *${selectedClub.name}* (Rotaract District 9126). I would love to learn more about your upcoming meeting, fellowship schedule, and membership intake process.\n\nThank you!`;
  const whatsappUrl = `https://wa.me/${rawNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Find nearby or sister clubs in same state for exploration
  const nearbyClubs = clubsData
    .filter(c => c.state === selectedClub.state && c.id !== selectedClub.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8F5F2] text-[#1C1C1E] font-sans pt-[120px] sm:pt-[140px] pb-24 relative overflow-hidden">
      {/* Subtle Warm District Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(152,17,50,0.06)_0%,transparent_70%)] blur-[60px]" />
        <div className="absolute top-[40%] right-[5%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(212,165,32,0.05)_0%,transparent_70%)] blur-[60px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/clubs"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/[0.08] text-xs font-bold text-[#1C1C1E] hover:bg-[#981132] hover:text-white hover:border-[#981132] shadow-sm transition-all group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            <span>Browse All 77 Clubs on Map</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#981132]/10 border border-[#981132]/20 text-[#981132] text-[11px] font-black uppercase tracking-wider">
              <ShieldCheck size={12} />
              {selectedClub.state} State · D9126
            </span>
          </div>
        </div>

        {/* MAIN EXECUTIVE PRESIDENT CONNECT SHOWCASE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-[32px] bg-white border border-black/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.07)] overflow-hidden mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[540px]">
            
            {/* LEFT COLUMN: FULL PRESIDENT PORTRAIT CARD WITH VISUAL EFFECTS (5 Cols) */}
            <div className="lg:col-span-5 relative bg-[#090A0F] overflow-hidden flex flex-col justify-end min-h-[420px] lg:min-h-full">
              {/* Full Image */}
              <img 
                src={presidentPhoto} 
                alt={presidentName}
                className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.92] contrast-[1.05] transition-transform duration-700 hover:scale-105"
              />

              {/* Ambient Glows & Gradient Masking */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent hidden lg:block" />
              <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/60 to-transparent" />

              {/* Top Floating Badge */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-[11px] font-bold shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                  <span>Available for Intake</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md p-1.5 shadow-md flex items-center justify-center">
                  <img src="/images/rotaract-logo.png" alt="Rotaract Seal" className="w-full h-full object-contain" />
                </div>
              </div>

              {/* Bottom Image Overlay Details */}
              <div className="relative z-10 p-6 sm:p-8 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A520]/20 backdrop-blur-md border border-[#D4A520]/40 text-[#F7A81B] text-[10px] font-black uppercase tracking-[0.18em]">
                  <Award size={12} />
                  <span>Club President 2026/2027</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                  Rtr. {presidentName}
                </h2>

                <p className="text-white/70 text-xs font-medium">
                  Presiding Officer · {selectedClub.name}
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: CLUB INFO, PHONE, VENUE & DIRECT WHATSAPP ACTION (7 Cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-white space-y-8">
              
              {/* Header Title & Club Designation */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#981132]/10 text-[#981132]">
                    {selectedClub.type || 'Community'} Club
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/[0.04] text-gray-700">
                    Rotary ID: {selectedClub.rotaryId || '218112'}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#22C55E]/10 text-[#16A34A]">
                    {selectedClub.memberCount || '25+'} Active Members
                  </span>
                </div>

                <div>
                  <h1 className="text-2xl sm:text-4xl font-black text-[#1C1C1E] tracking-tight leading-tight">
                    {selectedClub.name}
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base mt-2 leading-relaxed">
                    You have selected <strong className="text-[#1C1C1E]">{selectedClub.name}</strong>. Connect directly with the Club President below via WhatsApp to discuss induction, membership criteria, meeting dates, and service projects.
                  </p>
                </div>
              </div>

              {/* Interactive Contact & Location Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Presidential Phone & Direct Contact */}
                <div className="p-4 rounded-2xl bg-black/[0.024] border border-black/[0.06] flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                    <Phone size={18} className="text-[#25D366]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                      President WhatsApp Line
                    </div>
                    <div className="text-sm font-black text-[#1C1C1E] font-mono mt-0.5 truncate">
                      {phoneDisplay}
                    </div>
                    <div className="text-[11px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" /> Direct 1-on-1 Chat
                    </div>
                  </div>
                </div>

                {/* Meeting Schedule */}
                <div className="p-4 rounded-2xl bg-black/[0.024] border border-black/[0.06] flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-[#D4A520] shrink-0">
                    <Clock size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                      Meeting Schedule
                    </div>
                    <div className="text-xs font-bold text-[#1C1C1E] mt-0.5">
                      {selectedClub.meetingSchedule || 'Every 1st & 3rd Sunday · 4:00 PM'}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5">
                      Bi-monthly fellowship
                    </div>
                  </div>
                </div>

                {/* Physical Venue (Spans 2 cols) */}
                <div className="sm:col-span-2 p-4 rounded-2xl bg-black/[0.024] border border-black/[0.06] flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#981132]/10 text-[#981132] shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                      Fellowship Venue & Address
                    </div>
                    <div className="text-xs font-bold text-[#1C1C1E] mt-0.5">
                      {selectedClub.meetingVenue || `${selectedClub.name} Secretariat, ${selectedClub.state} State`}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5">
                      {selectedClub.city || selectedClub.state}, Nigeria
                    </div>
                  </div>
                </div>

              </div>

              {/* DIRECT 1-CLICK ACTIONS: WHATSAPP + INSTAGRAM */}
              <div className="pt-2 space-y-3">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm sm:text-base font-black tracking-wide flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 transition-all cursor-pointer group/btn transform hover:-translate-y-0.5"
                  >
                    <WhatsAppIcon className="w-5 h-5 text-white" />
                    <span>Chat on WhatsApp</span>
                    <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                  </a>

                  {selectedClub.instagramUrl && (
                    <a
                      href={selectedClub.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white text-sm sm:text-base font-black tracking-wide flex items-center justify-center gap-2.5 shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/35 transition-all cursor-pointer group/insta transform hover:-translate-y-0.5"
                    >
                      <Instagram size={18} />
                      <span>@racib.ringroad</span>
                      <ExternalLink size={14} className="opacity-80 transition-transform group-hover/insta:translate-x-0.5" />
                    </a>
                  )}
                </div>

                <div className="flex items-center justify-center gap-4 text-xs text-gray-500 pt-1 flex-wrap">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={13} className="text-[#22C55E]" /> Official D9126 Channel
                  </span>
                  <span>·</span>
                  <span>Instant Response</span>
                  <span>·</span>
                  <span>Zero Membership Application Fees</span>
                </div>
              </div>

            </div>

          </div>
        </motion.div>

        {/* OTHER CLUBS IN THIS STATE (Clean Navigation without search bar) */}
        {nearbyClubs.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#1C1C1E] tracking-tight">
                  Other Chartered Clubs in {selectedClub.state} State
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Looking for a different location in {selectedClub.state}? Explore these alternative chapters.
                </p>
              </div>

              <Link 
                href={`/clubs?state=${encodeURIComponent(selectedClub.state)}`}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#981132] hover:underline"
              >
                <span>View All on Interactive Map</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {nearbyClubs.map((club, i) => {
                const photo = getPresidentPhoto(club, i + 1);
                const pName = club.president || 'Club President';
                const { number: pPhone } = getClubPresWhatsapp(club);

                return (
                  <Link
                    key={club.id}
                    href={`/join?club=${encodeURIComponent(club.name)}`}
                    className="rounded-3xl bg-white border border-black/[0.08] p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden bg-black/10 shrink-0 border border-black/[0.08]">
                          <img src={photo} alt={pName} className="w-full h-full object-cover object-top" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-black text-[#1C1C1E] truncate group-hover:text-[#981132] transition-colors">
                            {club.name}
                          </div>
                          <div className="text-[11px] text-gray-500 truncate">
                            Pres. {pName}
                          </div>
                        </div>
                      </div>

                      <div className="text-[11px] text-gray-600 space-y-1">
                        <div className="flex items-start gap-1.5">
                          <MapPin size={11} className="text-[#981132] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{club.meetingVenue}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Clock size={11} className="shrink-0" />
                          <span className="truncate">{club.meetingSchedule}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-black/[0.06] mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-gray-400">{pPhone}</span>
                      <span className="text-xs font-bold text-[#981132] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Select Club →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
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
        <JoinClubContent />
      </Suspense>
      <Footer />
    </>
  );
}
