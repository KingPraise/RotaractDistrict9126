'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Award, 
  Users, 
  DollarSign, 
  Globe, 
  Mail, 
  FileText, 
  Activity, 
  ClipboardList, 
  ChevronRight, 
  Search, 
  RefreshCw, 
  Bell, 
  ArrowUpRight, 
  ArrowRight, 
  Filter, 
  UserCheck, 
  Zap, 
  AlertCircle, 
  Calendar, 
  TrendingUp,
  Clock,
  Send,
  Share2,
  Target,
  CheckCircle2,
  Check,
  X,
  CheckSquare,
  Square,
  Building
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const MEMBERSHIP_DATA = [
  { month: 'Jan', total: 2410, prospective: 120, engaged: 2100 },
  { month: 'Feb', total: 2490, prospective: 140, engaged: 2180 },
  { month: 'Mar', total: 2560, prospective: 180, engaged: 2240 },
  { month: 'Apr', total: 2680, prospective: 210, engaged: 2320 },
  { month: 'May', total: 2790, prospective: 250, engaged: 2410 },
  { month: 'Jun', total: 2890, prospective: 280, engaged: 2530 },
  { month: 'Jul', total: 2980, prospective: 310, engaged: 2620 },
  { month: 'Aug', total: 3050, prospective: 340, engaged: 2700 },
  { month: 'Sep', total: 3120, prospective: 370, engaged: 2780 },
  { month: 'Oct', total: 3180, prospective: 390, engaged: 2840 },
  { month: 'Nov', total: 3220, prospective: 410, engaged: 2890 },
  { month: 'Dec', total: 3247, prospective: 430, engaged: 2950 },
];

const FUND_SPARKLINE = [
  { month: 'Mar', value: 310 },
  { month: 'Apr', value: 330 },
  { month: 'May', value: 360 },
  { month: 'Jun', value: 390 },
  { month: 'Jul', value: 415 },
  { month: 'Aug', value: 435 },
  { month: 'Sep', value: 450 },
  { month: 'Oct', value: 465 },
  { month: 'Nov', value: 475 },
  { month: 'Dec', value: 485 },
];

const ENGAGEMENT_SPARKLINE = [
  { week: 'W3', value: 62 },
  { week: 'W4', value: 66 },
  { week: 'W5', value: 71 },
  { week: 'W6', value: 70 },
  { week: 'W7', value: 78 },
  { week: 'W8', value: 81 },
  { week: 'W9', value: 83 },
  { week: 'W10', value: 86 },
  { week: 'W11', value: 89 },
  { week: 'W12', value: 91 },
];

const CATEGORY_DATA = [
  { name: 'Healthcare', value: 32, color: '#D91B5C' },
  { name: 'Education', value: 28, color: '#A855F7' },
  { name: 'Environment', value: 18, color: 'rgba(184, 41, 160, 0.88)' },
  { name: 'WASH', value: 12, color: 'rgba(217, 27, 92, 0.52)' },
  { name: 'Empowerment', value: 10, color: 'rgba(168, 85, 247, 0.45)' },
];

const CLUB_PERFORMANCE = [
  { rank: 1, name: 'Ibadan Central', members: 42, score: 94, color: '#D91B5C' },
  { rank: 2, name: 'OAU Ile-Ife', members: 89, score: 91, color: 'rgba(210, 35, 114, 0.95)' },
  { rank: 3, name: 'LAUTECH', members: 63, score: 88, color: 'rgba(203, 44, 136, 0.89)' },
  { rank: 4, name: 'Akure', members: 38, score: 85, color: 'rgba(196, 52, 158, 0.84)' },
  { rank: 5, name: 'Ilorin', members: 49, score: 82, color: 'rgba(189, 60, 181, 0.78)' },
  { rank: 6, name: 'Osogbo', members: 36, score: 79, color: 'rgba(182, 68, 203, 0.73)' },
  { rank: 7, name: 'Minna', members: 35, score: 76, color: 'rgba(175, 77, 225, 0.67)' },
  { rank: 8, name: 'Lokoja', members: 31, score: 71, color: 'rgba(168, 85, 247, 0.62)' },
];

const LEAD_ACQUISITION_DATA = [
  { month: 'Jan', leads: 42 },
  { month: 'Feb', leads: 54 },
  { month: 'Mar', leads: 62 },
  { month: 'Apr', leads: 85 },
  { month: 'May', leads: 98 },
  { month: 'Jun', leads: 112 },
  { month: 'Jul', leads: 125 },
  { month: 'Aug', leads: 138 },
  { month: 'Sep', leads: 144 },
  { month: 'Oct', leads: 151 },
  { month: 'Nov', leads: 156 },
  { month: 'Dec', leads: 156 },
];

export default function DistrictExecutiveDashboardPage() {
  const [navActive, setNavActive] = useState('Overview');
  const [membershipTab, setMembershipTab] = useState<'Total' | 'Prospective' | 'Engaged'>('Total');
  const [searchQuery, setSearchQuery] = useState('');

  // Verification Console States & Handlers
  const [verificationTab, setVerificationTab] = useState<'members' | 'clubs'>('members');
  const [selectedQueue, setSelectedQueue] = useState<string[]>([]);
  const [pendingMembersList, setPendingMembersList] = useState([
    { id: '1', name: 'Femi Adeleke', email: 'f.adeleke@rotaract9126.org', club: 'Rotaract Club of Ibadan Central', state: 'Oyo', date: 'Jul 21, 2026', status: 'Pending', avatar: 'https://images.unsplash.com/photo-1617440431587-138ca5c563ec?w=80&h=80&fit=crop&auto=format' },
    { id: '2', name: 'Amina Garba', email: 'a.garba@rotaract9126.org', club: 'Rotaract Club of Minna', state: 'Niger', date: 'Jul 22, 2026', status: 'Pending', avatar: 'https://images.unsplash.com/photo-1747614736574-b1e56e7d7e20?w=80&h=80&fit=crop&auto=format' },
    { id: '3', name: 'Seun Popoola', email: 's.popoola@rotaract9126.org', club: 'Rotaract Club of LAUTECH', state: 'Oyo', date: 'Jul 23, 2026', status: 'Flagged', avatar: 'https://images.unsplash.com/photo-1646658104783-2eec2433c1d1?w=80&h=80&fit=crop&auto=format' },
    { id: '4', name: 'Ngozi Okafor', email: 'n.okafor@rotaract9126.org', club: 'Rotaract Club of Lokoja', state: 'Kogi', date: 'Jul 24, 2026', status: 'Pending', avatar: 'https://images.unsplash.com/photo-1598547461182-45d03f6661e4?w=80&h=80&fit=crop&auto=format' },
    { id: '5', name: 'Taiwo Adesanya', email: 't.adesanya@rotaract9126.org', club: 'RC of University of Ibadan', state: 'Oyo', date: 'Jul 25, 2026', status: 'Pending', avatar: 'https://images.unsplash.com/photo-1659422440915-d516c6dc932e?w=80&h=80&fit=crop&auto=format' },
    { id: '6', name: 'Kunle Olatunji', email: 'k.olatunji@rotaract9126.org', club: 'Rotaract Club of OAU Ile-Ife', state: 'Osun', date: 'Jul 26, 2026', status: 'Pending', avatar: 'https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?w=80&h=80&fit=crop&auto=format' },
    { id: '7', name: 'Rashida Musa', email: 'r.musa@rotaract9126.org', club: 'Rotaract Club of Osogbo', state: 'Osun', date: 'Jul 27, 2026', status: 'Flagged', avatar: 'https://images.unsplash.com/photo-1657218380188-40c56bfdf97f?w=80&h=80&fit=crop&auto=format' },
    { id: '8', name: 'Olabisi Afolabi', email: 'o.afolabi@rotaract9126.org', club: 'Rotaract Club of Ado-Ekiti', state: 'Ekiti', date: 'Jul 28, 2026', status: 'Pending', avatar: 'https://images.unsplash.com/photo-1609371497456-3a55a205d5eb?w=80&h=80&fit=crop&auto=format' },
    { id: '9', name: 'Emeka Chukwuemeka', email: 'e.chukwuemeka@rotaract9126.org', club: 'Rotaract Club of Minna', state: 'Niger', date: 'Jul 29, 2026', status: 'Pending', avatar: 'https://images.unsplash.com/photo-1631824925667-28632e135463?w=80&h=80&fit=crop&auto=format' },
    { id: '10', name: 'Blessing Adeyinka', email: 'b.adeyinka@rotaract9126.org', club: 'Rotaract Club of Ilorin', state: 'Kwara', date: 'Jul 29, 2026', status: 'Flagged', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&auto=format' },
    { id: '11', name: 'Chidinma Okonkwo', email: 'c.okonkwo@rotaract9126.org', club: 'Rotaract Club of Lokoja', state: 'Kogi', date: 'Jul 30, 2026', status: 'Pending', avatar: 'https://images.unsplash.com/photo-1573497491765-dccce02b29df?w=80&h=80&fit=crop&auto=format' },
    { id: '12', name: 'Adewale Ogunleye', email: 'a.ogunleye@rotaract9126.org', club: 'Rotaract Club of Akure', state: 'Ondo', date: 'Aug 1, 2026', status: 'Pending', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format' }
  ]);

  const handleApproveMember = (id: string) => {
    setPendingMembersList(prev => prev.filter(m => m.id !== id));
    setSelectedQueue(prev => prev.filter(mId => mId !== id));
  };

  const handleRejectMember = (id: string) => {
    setPendingMembersList(prev => prev.filter(m => m.id !== id));
    setSelectedQueue(prev => prev.filter(mId => mId !== id));
  };

  const toggleQueueItem = (id: string) => {
    setSelectedQueue(prev => prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]);
  };

  const toggleSelectAllQueue = () => {
    if (selectedQueue.length === pendingMembersList.length) {
      setSelectedQueue([]);
    } else {
      setSelectedQueue(pendingMembersList.map(m => m.id));
    }
  };

  const handleBatchApprove = () => {
    setPendingMembersList(prev => prev.filter(m => !selectedQueue.includes(m.id)));
    setSelectedQueue([]);
  };

  const handleBatchReject = () => {
    setPendingMembersList(prev => prev.filter(m => !selectedQueue.includes(m.id)));
    setSelectedQueue([]);
  };

  return (
    <div className="min-h-screen bg-white text-[#1C1C1E] font-sans flex relative overflow-x-hidden">
      {/* Background Ambients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[15%] right-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(rgba(217,27,92,0.06)_0%,transparent_65%)] blur-[60px]" />
        <div className="absolute -bottom-[10%] left-[15%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(rgba(67,97,238,0.04)_0%,transparent_65%)] blur-[60px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.024)_1px,transparent_1px)] bg-[size:36px_36px]" />
      </div>

      {/* 1. Left Administrative Sidebar (224px) */}
      <aside className="w-[224px] shrink-0 bg-[#F4F1F0] border-r border-black/[0.08] flex flex-col h-screen sticky top-0 z-40 overflow-y-auto">
        {/* Brand Lockup */}
        <div className="p-5 pb-3.5 border-b border-black/[0.08]">
          <div className="flex items-center gap-2.5 mb-3.5">
            <img 
              src="/images/rotaract-logo.png" 
              alt="Rotaract" 
              className="w-7 h-7 object-contain"
            />
            <div className="leading-tight">
              <div className="text-xs font-bold text-[#1C1C1E] tracking-tight">Executive HQ</div>
              <div className="text-[9px] text-black/40 tracking-wider">District 9126 · DRR Portal</div>
            </div>
          </div>

          {/* DRR Profile Card */}
          <div className="p-3 rounded-xl bg-[#D91B5C]/[0.06] border border-[#D91B5C]/20 backdrop-blur-md shadow-sm flex items-center justify-between gap-2.5">
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-[#1C1C1E] truncate">Adaramoye Iyanuoluwa</div>
              <div className="text-[9px] text-black/45">DRR · 2026–27</div>
            </div>
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-[#D91B5C] to-[#A855F7] shadow-sm">
                <img 
                  src="/images/leaders/drr-adaramoye-iyanuoluwa.jpg" 
                  alt="DRR" 
                  className="w-full h-full rounded-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-gradient-to-tr from-[#D91B5C] to-[#A855F7] text-[7.5px] font-bold text-white shadow-xs">
                DRR
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 p-2.5 space-y-3">
          {/* Main */}
          <div>
            <div className="text-[8.5px] font-bold text-black/30 tracking-widest uppercase px-2.5 py-1">Main</div>
            <div className="space-y-0.5">
              {[
                { name: 'Overview', icon: LayoutDashboard },
                { name: 'Club Performance', icon: Award }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = navActive === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setNavActive(item.name)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[11.5px] transition-all text-left ${
                      isActive 
                        ? 'bg-[#D91B5C]/[0.07] border border-[#D91B5C]/20 text-[#D91B5C] font-semibold' 
                        : 'text-black/60 hover:text-black hover:bg-black/[0.03]'
                    }`}
                  >
                    <Icon className={isActive ? 'text-[#D91B5C]' : 'text-inherit'} size={14} />
                    <span>{item.name}</span>
                    {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#D91B5C]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Analytics */}
          <div>
            <div className="text-[8.5px] font-bold text-black/30 tracking-widest uppercase px-2.5 py-1">Analytics</div>
            <div className="space-y-0.5">
              {[
                { name: 'Membership Growth', icon: Users },
                { name: 'Financial Overview', icon: DollarSign },
                { name: 'Impact Metrics', icon: Globe }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = navActive === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setNavActive(item.name)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[11.5px] transition-all text-left ${
                      isActive 
                        ? 'bg-[#D91B5C]/[0.07] border border-[#D91B5C]/20 text-[#D91B5C] font-semibold' 
                        : 'text-black/60 hover:text-black hover:bg-black/[0.03]'
                    }`}
                  >
                    <Icon className={isActive ? 'text-[#D91B5C]' : 'text-inherit'} size={14} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Communications */}
          <div>
            <div className="text-[8.5px] font-bold text-black/30 tracking-widest uppercase px-2.5 py-1">Communications</div>
            <button
              onClick={() => setNavActive('Newsletter Deploy')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[11.5px] transition-all text-left ${
                navActive === 'Newsletter Deploy'
                  ? 'bg-[#D91B5C]/[0.07] border border-[#D91B5C]/20 text-[#D91B5C] font-semibold'
                  : 'text-black/60 hover:text-black hover:bg-black/[0.03]'
              }`}
            >
              <Mail size={14} />
              <span>Newsletter Deploy</span>
            </button>
          </div>

          {/* System */}
          <div>
            <div className="text-[8.5px] font-bold text-black/30 tracking-widest uppercase px-2.5 py-1">System</div>
            <div className="space-y-0.5">
              {[
                { name: 'Executive Reports', icon: FileText },
                { name: 'Executive Analytics', icon: Activity },
                { name: 'Verification Console', icon: ClipboardList }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = navActive === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setNavActive(item.name)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[11.5px] transition-all text-left ${
                      isActive 
                        ? 'bg-[#D91B5C]/[0.07] border border-[#D91B5C]/20 text-[#D91B5C] font-semibold' 
                        : 'text-black/60 hover:text-black hover:bg-black/[0.03]'
                    }`}
                  >
                    <Icon size={14} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Back Link */}
        <div className="p-2.5 border-t border-black/[0.08]">
          <Link className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg bg-black/[0.04] border border-black/[0.08] text-black/50 hover:text-black text-xs font-medium transition-colors" href="/portal/dashboard">
            <ChevronRight className="rotate-180" size={13} />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </aside>

      {/* 2. Main Executive Workspace */}
      <div className="flex-1 min-w-0 flex flex-col relative z-10">
        
        {/* Topbar */}
        <header className="h-15 shrink-0 border-b border-black/[0.08] bg-white/90 backdrop-blur-xl px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div>
            <span className="text-sm font-bold text-[#1C1C1E]">Overview</span>
            <span className="text-[10px] text-black/40 ml-2">· District 9126 Executive Dashboard</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative w-55">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none" size={12} />
              <input
                type="text"
                placeholder="Search clubs, members, reports…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-7 pr-3 h-8 rounded-lg bg-black/[0.04] border border-black/[0.08] text-xs text-[#1C1C1E] outline-none"
              />
            </div>

            {/* Refresh */}
            <button 
              onClick={() => alert('Refreshing live District telemetry…')}
              className="w-8 h-8 rounded-lg bg-black/[0.04] border border-black/[0.08] text-black/40 hover:text-black flex items-center justify-center transition-colors"
            >
              <RefreshCw size={13} />
            </button>

            {/* Bell */}
            <button className="w-8 h-8 rounded-lg bg-black/[0.04] border border-black/[0.08] text-black/40 hover:text-black flex items-center justify-center relative transition-colors">
              <Bell size={13} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#D91B5C] border border-white" />
            </button>

            {/* Live Indicator */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-green-600/[0.07] border border-green-600/20 text-green-700 text-[9.5px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600 shadow-[0_0_5px_#16A34A]" />
              <span>All systems live</span>
            </div>
          </div>
        </header>

        {/* Scroll Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {navActive === 'Verification Console' ? (
            /* DEDICATED VERIFICATION CONSOLE SUB-VIEW */
            <div className="space-y-4 font-sans pb-24 relative">
              
              {/* Header & Metric Counter */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="text-xl font-extrabold text-[#1C1C1E] tracking-tight">
                    Member & Club Verification Queue
                  </h1>
                  <p className="text-xs text-black/40 mt-0.5">
                    Review and authorize pending district inductions and charter verifications.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#D91B5C]/10 border border-[#D91B5C]/20 text-[#D91B5C] text-xs font-bold">
                    {pendingMembersList.length} Pending Approvals
                  </span>
                </div>
              </div>

              {/* Sub-Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-black/[0.08] pb-1">
                <button
                  onClick={() => setVerificationTab('members')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    verificationTab === 'members'
                      ? 'bg-black/[0.06] text-[#1C1C1E]'
                      : 'text-black/40 hover:text-black/70 hover:bg-black/[0.02]'
                  }`}
                >
                  <Users size={14} />
                  <span>Pending Members ({pendingMembersList.length})</span>
                </button>
                <button
                  onClick={() => setVerificationTab('clubs')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    verificationTab === 'clubs'
                      ? 'bg-black/[0.06] text-[#1C1C1E]'
                      : 'text-black/40 hover:text-black/70 hover:bg-black/[0.02]'
                  }`}
                >
                  <Building size={14} />
                  <span>Chartered Clubs (0)</span>
                </button>
              </div>

              {/* Table Container */}
              <div className="p-1 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-black/[0.06] bg-black/[0.015] text-[10px] font-bold uppercase tracking-wider text-black/40">
                        <th className="py-3 px-4 w-10">
                          <button
                            onClick={toggleSelectAllQueue}
                            className="text-black/40 hover:text-black transition-colors"
                          >
                            {selectedQueue.length === pendingMembersList.length && pendingMembersList.length > 0 ? (
                              <CheckSquare size={14} className="text-[#D91B5C]" />
                            ) : (
                              <Square size={14} />
                            )}
                          </button>
                        </th>
                        <th className="py-3 px-4">Member</th>
                        <th className="py-3 px-4">Club & State</th>
                        <th className="py-3 px-4">Application Date</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.04]">
                      {pendingMembersList.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-black/40">
                            No pending verifications in the queue. All submissions have been processed!
                          </td>
                        </tr>
                      ) : (
                        pendingMembersList.map((member) => {
                          const isSelected = selectedQueue.includes(member.id);
                          return (
                            <tr
                              key={member.id}
                              className={`transition-colors hover:bg-black/[0.02] ${
                                isSelected ? 'bg-[#D91B5C]/[0.03]' : ''
                              }`}
                            >
                              <td className="py-3 px-4">
                                <button
                                  onClick={() => toggleQueueItem(member.id)}
                                  className="text-black/40 hover:text-black transition-colors"
                                >
                                  {isSelected ? (
                                    <CheckSquare size={14} className="text-[#D91B5C]" />
                                  ) : (
                                    <Square size={14} />
                                  )}
                                </button>
                              </td>

                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={member.avatar}
                                    alt={member.name}
                                    className="w-8 h-8 rounded-full object-cover border border-black/10 shrink-0"
                                  />
                                  <div>
                                    <div className="font-bold text-[#1C1C1E]">{member.name}</div>
                                    <div className="text-[10px] text-black/40">{member.email}</div>
                                  </div>
                                </div>
                              </td>

                              <td className="py-3 px-4">
                                <div className="font-semibold text-[#1C1C1E]">{member.club}</div>
                                <div className="text-[10px] text-black/40">{member.state} State</div>
                              </td>

                              <td className="py-3 px-4 text-black/60 font-medium">
                                {member.date}
                              </td>

                              <td className="py-3 px-4">
                                {member.status === 'Flagged' ? (
                                  <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-700 text-[10px] font-bold">
                                    Flagged
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-700 text-[10px] font-bold">
                                    Pending Review
                                  </span>
                                )}
                              </td>

                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => handleApproveMember(member.id)}
                                    title="Approve Member"
                                    className="p-1.5 rounded-lg bg-green-600/10 hover:bg-green-600/20 text-green-700 transition-colors"
                                  >
                                    <Check size={13} />
                                  </button>
                                  <button
                                    onClick={() => handleRejectMember(member.id)}
                                    title="Reject Member"
                                    className="p-1.5 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-red-700 transition-colors"
                                  >
                                    <X size={13} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Floating Batch Actions Bar */}
              {selectedQueue.length > 0 && (
                <div className="fixed bottom-7 left-64 z-50 p-3 px-5 rounded-2xl bg-[#090A0F]/90 backdrop-blur-2xl border border-white/15 text-white shadow-2xl flex items-center gap-6">
                  <div className="text-xs font-bold">
                    <span className="text-[#D91B5C] font-extrabold">{selectedQueue.length}</span> member{selectedQueue.length > 1 ? 's' : ''} selected
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleBatchApprove}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-500 text-white text-xs font-bold transition-all shadow-sm"
                    >
                      <Check size={12} /> Approve Selected
                    </button>
                    <button
                      onClick={handleBatchReject}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-sm"
                    >
                      <X size={12} /> Reject Selected
                    </button>
                  </div>
                </div>
              )}

            </div>
          ) : navActive === 'Executive Analytics' ? (
            /* DEDICATED EXECUTIVE ANALYTICS SUB-VIEW */
            <div className="space-y-4 font-sans pb-24 relative">
              
              {/* 1. Header & Greeting */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <button
                    onClick={() => setNavActive('Overview')}
                    className="flex items-center gap-1 text-[10px] text-black/40 hover:text-black mb-2 transition-colors"
                  >
                    <ChevronRight className="rotate-180" size={10} />
                    <span>Executive HQ · Overview</span>
                  </button>
                  <h1 className="text-2xl font-extrabold text-[#1C1C1E] tracking-tight">
                    Good afternoon, Oluwafemi
                  </h1>
                  <p className="text-xs text-black/40 mt-0.5">
                    Here&apos;s what&apos;s happening across District 9126 today.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button className="w-8.5 h-8.5 rounded-lg bg-black/[0.04] border border-black/[0.08] text-black/40 hover:text-black flex items-center justify-center transition-colors">
                    <Share2 size={13} />
                  </button>
                  <button className="w-8.5 h-8.5 rounded-lg bg-black/[0.04] border border-black/[0.08] text-black/40 hover:text-black flex items-center justify-center relative transition-colors">
                    <Bell size={13} />
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#D91B5C] border border-white" />
                  </button>
                  <div className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-black/[0.04] border border-black/[0.08]">
                    <div className="w-7 h-7 rounded-full p-[1.5px] bg-gradient-to-tr from-[#D91B5C] to-[#A855F7]">
                      <img
                        src="https://images.unsplash.com/photo-1642257859842-c95f9fa8121d?w=200&h=200&fit=crop&crop=faces&auto=format"
                        alt="DRR"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="leading-tight">
                      <div className="text-[10.5px] font-bold text-[#1C1C1E]">Oluwafemi A.</div>
                      <div className="text-[8.5px] text-black/40">DRR · 2024–25</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. District Milestone & Tier 2 Growth Hero Card */}
              <div className="p-6 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm flex flex-col md:flex-row items-stretch gap-6">
                {/* Left Progress Section */}
                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#D91B5C]/10 border border-[#D91B5C]/20 flex items-center justify-center text-[#D91B5C]">
                      <Target size={13} />
                    </div>
                    <span className="text-[10px] font-bold text-black/40 tracking-wider uppercase">
                      District Milestone · Tier 2 Growth
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2.5 flex-wrap">
                    <span className="text-4xl font-extrabold text-[#B8860B] leading-none">3,247</span>
                    <span className="text-lg text-black/40">/ 5,000 members</span>
                    <span className="text-xs font-bold text-green-600">▲ +12% this year</span>
                  </div>

                  <div>
                    <div className="h-2 rounded-full bg-black/[0.08] overflow-hidden mb-2">
                      <div className="h-full rounded-full bg-[#D91B5C] transition-all duration-500 w-[65%]" />
                    </div>
                    <div className="flex justify-between text-[9.5px] text-black/40">
                      <span>3,247 enrolled</span>
                      <span>65% complete · 1,753 remaining</span>
                    </div>
                  </div>
                </div>

                <div className="w-px bg-black/[0.08] hidden md:block" />

                {/* Right Mini-Stats */}
                <div className="w-full md:w-50 flex flex-col justify-center gap-2.5">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-black/[0.024] border border-black/[0.08]">
                    <div className="w-8 h-8 rounded-lg bg-[#D91B5C]/10 border border-[#D91B5C]/20 flex items-center justify-center text-[#D91B5C] shrink-0">
                      <Zap size={14} />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#B8860B] leading-none">12</div>
                      <div className="text-[9.5px] text-black/40 mt-0.5">Active Projects</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-black/[0.024] border border-black/[0.08]">
                    <div className="w-8 h-8 rounded-lg bg-[#A855F7]/10 border border-[#A855F7]/20 flex items-center justify-center text-[#A855F7] shrink-0">
                      <DollarSign size={14} />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#B8860B] leading-none">₦93.87K</div>
                      <div className="text-[9.5px] text-black/40 mt-0.5">Pending Disbursement</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. 6-Card Analytical Metric Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* 1. Clubs Engaged */}
                <div className="p-4.5 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm flex flex-col justify-between">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-[10px] font-bold text-black/60 uppercase tracking-wider mb-1">Clubs Engaged</div>
                      <div className="h-0.5 w-7 rounded-full bg-gradient-to-r from-[#D91B5C] to-[#A855F7]" />
                    </div>
                    <div className="w-7.5 h-7.5 rounded-lg bg-[#D91B5C]/10 border border-[#D91B5C]/20 flex items-center justify-center text-[#D91B5C]">
                      <Award size={13} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl font-extrabold text-[#1C1C1E] leading-none">47</span>
                    <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-green-50 text-green-700 text-[9.5px] font-bold">
                      <ArrowUpRight size={9} /> +3
                    </span>
                  </div>
                  <div className="space-y-1.5 divide-y divide-black/[0.06] text-xs">
                    <div className="flex justify-between pt-1 text-black/40">
                      <span>Oyo State</span>
                      <span className="font-semibold text-black/70">14 clubs <span className="text-green-600 font-bold">+2</span></span>
                    </div>
                    <div className="flex justify-between pt-1 text-black/40">
                      <span>Ondo State</span>
                      <span className="font-semibold text-black/70">9 clubs <span className="text-green-600 font-bold">+1</span></span>
                    </div>
                    <div className="flex justify-between pt-1 text-black/40">
                      <span>Osun State</span>
                      <span className="font-semibold text-black/70">8 clubs <span className="text-black/30">—</span></span>
                    </div>
                  </div>
                </div>

                {/* 2. Dues Compliance */}
                <div className="p-4.5 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm flex flex-col justify-between">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-[10px] font-bold text-black/60 uppercase tracking-wider mb-1">Dues Compliance</div>
                      <div className="h-0.5 w-7 rounded-full bg-gradient-to-r from-[#D91B5C] to-[#A855F7]" />
                    </div>
                    <div className="w-7.5 h-7.5 rounded-lg bg-[#D91B5C]/10 border border-[#D91B5C]/20 flex items-center justify-center text-[#D91B5C]">
                      <CheckCircle2 size={13} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl font-extrabold text-[#1C1C1E] leading-none">76%</span>
                    <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-green-50 text-green-700 text-[9.5px] font-bold">
                      <ArrowUpRight size={9} /> +4%
                    </span>
                  </div>
                  <div className="space-y-1.5 divide-y divide-black/[0.06] text-xs">
                    <div className="flex justify-between pt-1 text-black/40">
                      <span>On-time</span>
                      <span className="font-semibold text-black/70">61% <span className="text-green-600 font-bold">↑ +5%</span></span>
                    </div>
                    <div className="flex justify-between pt-1 text-black/40">
                      <span>Late</span>
                      <span className="font-semibold text-black/70">15% <span className="text-green-600 font-bold">↓ -2%</span></span>
                    </div>
                    <div className="flex justify-between pt-1 text-black/40">
                      <span>Overdue</span>
                      <span className="font-semibold text-black/70">24% <span className="text-[#D91B5C] font-bold">↑ +1%</span></span>
                    </div>
                  </div>
                </div>

                {/* 3. Projects Completed */}
                <div className="p-4.5 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm flex flex-col justify-between">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-[10px] font-bold text-black/60 uppercase tracking-wider mb-1">Projects Completed</div>
                      <div className="h-0.5 w-7 rounded-full bg-gradient-to-r from-[#D91B5C] to-[#A855F7]" />
                    </div>
                    <div className="w-7.5 h-7.5 rounded-lg bg-[#D91B5C]/10 border border-[#D91B5C]/20 flex items-center justify-center text-[#D91B5C]">
                      <Zap size={13} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl font-extrabold text-[#1C1C1E] leading-none">34</span>
                    <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-green-50 text-green-700 text-[9.5px] font-bold">
                      <ArrowUpRight size={9} /> +6
                    </span>
                  </div>
                  <div className="space-y-1.5 divide-y divide-black/[0.06] text-xs">
                    <div className="flex justify-between pt-1 text-black/40">
                      <span>Healthcare</span>
                      <span className="font-semibold text-black/70">12 <span className="text-green-600 font-bold">+3</span></span>
                    </div>
                    <div className="flex justify-between pt-1 text-black/40">
                      <span>Education</span>
                      <span className="font-semibold text-black/70">9 <span className="text-green-600 font-bold">+2</span></span>
                    </div>
                    <div className="flex justify-between pt-1 text-black/40">
                      <span>Environment</span>
                      <span className="font-semibold text-black/70">8 <span className="text-green-600 font-bold">+1</span></span>
                    </div>
                  </div>
                </div>

                {/* 4. Fund Utilization */}
                <div className="p-4.5 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm flex flex-col justify-between">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-[10px] font-bold text-black/60 uppercase tracking-wider mb-1">Fund Utilization</div>
                      <div className="h-0.5 w-7 rounded-full bg-gradient-to-r from-[#D91B5C] to-[#A855F7]" />
                    </div>
                    <div className="w-7.5 h-7.5 rounded-lg bg-[#D91B5C]/10 border border-[#D91B5C]/20 flex items-center justify-center text-[#D91B5C]">
                      <DollarSign size={13} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl font-extrabold text-[#1C1C1E] leading-none">₦485K</span>
                    <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-green-50 text-green-700 text-[9.5px] font-bold">
                      <ArrowUpRight size={9} /> +8.5%
                    </span>
                  </div>
                  <div className="space-y-1.5 divide-y divide-black/[0.06] text-xs">
                    <div className="flex justify-between pt-1 text-black/40">
                      <span>Programs</span>
                      <span className="font-semibold text-black/70">₦312K <span className="text-green-600 font-bold">+12%</span></span>
                    </div>
                    <div className="flex justify-between pt-1 text-black/40">
                      <span>Admin</span>
                      <span className="font-semibold text-black/70">₦98K <span className="text-green-600 font-bold">+3%</span></span>
                    </div>
                    <div className="flex justify-between pt-1 text-black/40">
                      <span>Reserves</span>
                      <span className="font-semibold text-black/70">₦75K <span className="text-[#D91B5C] font-bold">-5%</span></span>
                    </div>
                  </div>
                </div>

                {/* 5. New Prospects */}
                <div className="p-4.5 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm flex flex-col justify-between">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-[10px] font-bold text-black/60 uppercase tracking-wider mb-1">New Prospects</div>
                      <div className="h-0.5 w-7 rounded-full bg-gradient-to-r from-[#D91B5C] to-[#A855F7]" />
                    </div>
                    <div className="w-7.5 h-7.5 rounded-lg bg-[#D91B5C]/10 border border-[#D91B5C]/20 flex items-center justify-center text-[#D91B5C]">
                      <UserCheck size={13} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl font-extrabold text-[#1C1C1E] leading-none">156</span>
                    <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-green-50 text-green-700 text-[9.5px] font-bold">
                      <ArrowUpRight size={9} /> +23%
                    </span>
                  </div>
                  <div className="space-y-1.5 divide-y divide-black/[0.06] text-xs">
                    <div className="flex justify-between pt-1 text-black/40">
                      <span>Club Finder</span>
                      <span className="font-semibold text-black/70">89 <span className="text-green-600 font-bold">+18%</span></span>
                    </div>
                    <div className="flex justify-between pt-1 text-black/40">
                      <span>Referral</span>
                      <span className="font-semibold text-black/70">42 <span className="text-green-600 font-bold">+8%</span></span>
                    </div>
                    <div className="flex justify-between pt-1 text-black/40">
                      <span>Events</span>
                      <span className="font-semibold text-black/70">25 <span className="text-green-600 font-bold">+5%</span></span>
                    </div>
                  </div>
                </div>

                {/* 6. Active Volunteers */}
                <div className="p-4.5 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm flex flex-col justify-between">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-[10px] font-bold text-black/60 uppercase tracking-wider mb-1">Active Volunteers</div>
                      <div className="h-0.5 w-7 rounded-full bg-gradient-to-r from-[#D91B5C] to-[#A855F7]" />
                    </div>
                    <div className="w-7.5 h-7.5 rounded-lg bg-[#D91B5C]/10 border border-[#D91B5C]/20 flex items-center justify-center text-[#D91B5C]">
                      <Users size={13} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl font-extrabold text-[#1C1C1E] leading-none">2,847</span>
                    <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-green-50 text-green-700 text-[9.5px] font-bold">
                      <ArrowUpRight size={9} /> +11%
                    </span>
                  </div>
                  <div className="space-y-1.5 divide-y divide-black/[0.06] text-xs">
                    <div className="flex justify-between pt-1 text-black/40">
                      <span>Oyo State</span>
                      <span className="font-semibold text-black/70">1,240 <span className="text-green-600 font-bold">+9%</span></span>
                    </div>
                    <div className="flex justify-between pt-1 text-black/40">
                      <span>Ondo State</span>
                      <span className="font-semibold text-black/70">580 <span className="text-green-600 font-bold">+15%</span></span>
                    </div>
                    <div className="flex justify-between pt-1 text-black/40">
                      <span>Osun State</span>
                      <span className="font-semibold text-black/70">470 <span className="text-green-600 font-bold">+7%</span></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Floating Executive Report Dock */}
              <div className="fixed bottom-7 left-64 z-50 p-3.5 px-4.5 rounded-2xl bg-white/95 backdrop-blur-2xl border border-black/15 shadow-2xl flex items-center gap-6">
                <div>
                  <div className="text-[8.5px] font-bold text-black/40 uppercase tracking-widest">Fund Aggregate</div>
                  <div className="text-xl font-bold text-[#1C1C1E]">₦485,000</div>
                </div>

                <button
                  onClick={() => alert('Generating District Analytical Report PDF...')}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl bg-[#D91B5C] hover:bg-[#A70C43] text-white text-xs font-bold shadow-[0_4px_16px_rgba(217,27,92,0.3)] transition-all"
                >
                  <span>Generate District Report</span>
                  <div className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center">
                    <ArrowRight size={11} />
                  </div>
                </button>
              </div>

            </div>
          ) : navActive === 'Newsletter Deploy' ? (
            /* DEDICATED NEWSLETTER DEPLOYMENT CANVAS VIEW */
            <div className="-mt-6 -mx-6 flex flex-col font-sans">
              
              {/* 1. Sticky Action Sub-Header */}
              <div className="sticky top-0 z-40 px-6 py-3 bg-white/95 backdrop-blur-xl border-b border-black/[0.08] flex items-center justify-between gap-3 flex-wrap">
                <input
                  type="text"
                  defaultValue="District 9126 — July Impact Bulletin"
                  className="flex-1 min-w-[200px] text-sm font-bold text-[#1C1C1E] bg-transparent outline-none caret-[#981132]"
                />

                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-black/[0.04] border border-black/[0.08] text-xs">
                  <Users className="text-black/40" size={12} />
                  <span className="font-semibold text-black/60">All Members</span>
                  <span className="text-black/30">·</span>
                  <span className="font-bold text-[#981132]">1,247</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-black/30 hidden sm:inline">Draft saved 2 min ago</span>
                  <button
                    onClick={() => alert('Newsletter draft saved successfully')}
                    className="px-3.5 py-1.5 rounded-lg bg-black/[0.04] hover:bg-black/[0.08] border border-black/[0.08] text-xs font-semibold text-black/60 transition-colors"
                  >
                    Save Draft
                  </button>
                  <button
                    onClick={() => alert('Dispatching newsletter to 1,247 members...')}
                    className="inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-[#981132] text-white text-xs font-bold shadow-[0_4px_18px_rgba(152,17,50,0.3)] hover:opacity-95 transition-all"
                  >
                    <span>Send Newsletter</span>
                    <span className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center">
                      <Send size={11} />
                    </span>
                  </button>
                </div>
              </div>

              {/* 2. Collapsible Subject & Preheader Accordion */}
              <div className="bg-[#F4F1F0]/70 border-b border-black/[0.08] px-6 py-3 space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9.5px] font-bold text-black/40 uppercase tracking-wider mb-1">
                      Subject Line
                    </label>
                    <input
                      type="text"
                      defaultValue="District 9126 — July Impact Bulletin 🌍"
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-black/[0.08] text-xs text-[#1C1C1E] outline-none focus:border-[#981132]"
                    />
                  </div>
                  <div>
                    <label className="block text-[9.5px] font-bold text-black/40 uppercase tracking-wider mb-1">
                      Preheader Text <span className="font-normal text-black/30 lowercase">(inbox preview text)</span>
                    </label>
                    <input
                      type="text"
                      defaultValue="500 children vaccinated, 2,400 youth trained, and more from across our 7 states."
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-black/[0.08] text-xs text-[#1C1C1E] outline-none focus:border-[#981132]"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Document Workspace + Right Delivery Rail */}
              <div className="flex flex-col lg:flex-row">
                
                {/* Editor Canvas */}
                <div className="flex-1 bg-[#F0EFF0] p-6 lg:p-10 flex flex-col items-center">
                  {/* Formatting Toolbar */}
                  <div className="w-full max-w-[680px] mb-4 px-3 py-2 rounded-xl bg-white/90 border border-black/[0.08] shadow-sm flex items-center gap-1 flex-wrap text-xs text-black/50">
                    <button className="p-1.5 hover:bg-black/[0.05] rounded font-bold">B</button>
                    <button className="p-1.5 hover:bg-black/[0.05] rounded italic">I</button>
                    <button className="p-1.5 hover:bg-black/[0.05] rounded underline">U</button>
                    <div className="w-px h-4 bg-black/10 mx-1" />
                    <button className="px-2 py-1 hover:bg-black/[0.05] rounded font-bold">H1</button>
                    <button className="px-2 py-1 hover:bg-black/[0.05] rounded font-bold">H2</button>
                    <button className="px-2 py-1 hover:bg-black/[0.05] rounded">¶</button>
                    <div className="w-px h-4 bg-black/10 mx-1" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#981132] inline-block cursor-pointer" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#0891B2] inline-block cursor-pointer" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#16A34A] inline-block cursor-pointer" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#B8860B] inline-block cursor-pointer" />
                    <span className="ml-auto text-[10px] text-black/30">Select a block to format</span>
                  </div>

                  {/* Paper Sheet Canvas */}
                  <div className="w-full max-w-[680px] bg-white rounded-2xl border border-black/[0.08] shadow-2xl p-8 sm:p-12 space-y-6">
                    {/* Main Title Block */}
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      className="text-2xl sm:text-3xl font-extrabold text-center text-[#1C1C1E] outline-none tracking-tight leading-tight"
                    >
                      District 9126 — July Impact Bulletin
                    </div>

                    {/* Salutation Block */}
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      className="text-xs sm:text-sm text-black/70 leading-relaxed outline-none"
                    >
                      Dear Fellow Rotaractors,
                      <br /><br />
                      This July, we continue to set new standards for community service across our seven states. From the vaccination drives in Ogbomoso to the reforestation efforts across Ibadan, your impact is being felt — and celebrated.
                    </div>

                    {/* Image Block */}
                    <div className="space-y-1 text-center">
                      <img
                        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=680&h=340&fit=crop&auto=format"
                        alt="Leadership Summit"
                        className="w-full rounded-xl object-cover"
                      />
                      <div className="text-[10px] italic text-black/40">
                        District Leadership Summit 2026 — 400+ Rotaractors gather in Ibadan
                      </div>
                    </div>

                    {/* Section Heading */}
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      className="text-lg font-bold text-[#1C1C1E] outline-none pt-2"
                    >
                      This Month&apos;s Highlights
                    </div>

                    {/* 2-Column Highlight Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-black/[0.024] border border-black/[0.08] text-xs leading-relaxed">
                        <strong className="text-[#1C1C1E] block mb-1">Operation Vaccinate 500</strong>
                        500 children immunised across Ogbomoso by RC LAUTECH volunteers in partnership with the Oyo State Ministry of Health.
                      </div>
                      <div className="p-4 rounded-xl bg-black/[0.024] border border-black/[0.08] text-xs leading-relaxed">
                        <strong className="text-[#1C1C1E] block mb-1">Digital Skills Academy</strong>
                        2,400 youth trained. 94% job placement rate. 8 active training centres across Ibadan Central.
                      </div>
                    </div>

                    {/* CTA Button Block */}
                    <div className="text-center pt-2">
                      <button className="px-7 py-3 rounded-full bg-[#981132] text-white text-xs font-bold shadow-[0_6px_24px_rgba(152,17,50,0.3)]">
                        Read Full Impact Report
                      </button>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-black/15 to-transparent my-4" />

                    {/* Sign-off */}
                    <div className="text-center text-xs text-black/60 leading-relaxed">
                      With fellowship and purpose,
                      <br /><br />
                      <strong className="text-[#1C1C1E]">Oluwafemi Adeleke</strong><br />
                      District Rotaract Representative · D9126 · 2024–25
                    </div>
                  </div>
                </div>

                {/* Right Delivery Configuration Rail (280px) */}
                <div className="w-full lg:w-[280px] p-4 bg-[#F4F1F0]/60 border-l border-black/[0.08] space-y-3 shrink-0">
                  
                  {/* Insights Card */}
                  <div className="p-4 rounded-xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-xs space-y-2.5">
                    <div className="text-[9px] font-bold text-black/40 uppercase tracking-wider">
                      Newsletter Insights
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-black/[0.02] border border-black/[0.06] text-xs">
                      <span className="flex items-center gap-1.5 text-black/60">
                        <Clock className="text-[#0891B2]" size={12} /> Estimated read
                      </span>
                      <span className="font-bold text-[#1C1C1E]">1 min</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-black/[0.02] border border-black/[0.06] text-xs">
                      <span className="flex items-center gap-1.5 text-black/60">
                        <Users className="text-[#981132]" size={12} /> Recipients
                      </span>
                      <span className="font-bold text-[#1C1C1E]">1,247</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#981132]/[0.05] border border-[#981132]/15 text-[10px] text-black/50">
                      Sending to <strong className="text-[#1C1C1E]">1,247 members</strong> across <strong className="text-[#1C1C1E]">7 states</strong>
                    </div>
                  </div>

                  {/* Audience Segment Card */}
                  <div className="p-4 rounded-xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-xs space-y-2">
                    <div className="text-[9px] font-bold text-black/40 uppercase tracking-wider">
                      Audience Segment
                    </div>
                    <select className="w-full px-3 py-2 rounded-lg bg-white border border-black/[0.08] text-xs text-[#1C1C1E] font-medium outline-none">
                      <option>All Members (1,247)</option>
                      <option>Club Presidents (47)</option>
                      <option>Executive Council (16)</option>
                    </select>
                  </div>

                  {/* Send Options Card */}
                  <div className="p-4 rounded-xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-xs space-y-2.5">
                    <div className="text-[9px] font-bold text-black/40 uppercase tracking-wider">
                      Send Options
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="py-1.5 text-xs font-bold rounded-lg bg-[#981132]/10 border border-[#981132]/25 text-[#981132]">
                        Send Now
                      </button>
                      <button className="py-1.5 text-xs text-black/50 rounded-lg bg-black/[0.03] border border-black/[0.08]">
                        Schedule
                      </button>
                    </div>
                  </div>

                  {/* Past Performance Card */}
                  <div className="p-4 rounded-xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-xs space-y-2">
                    <div className="text-[9px] font-bold text-black/40 uppercase tracking-wider">
                      Past Performance
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between p-1.5 rounded bg-black/[0.02]">
                        <span className="text-black/50">Avg. Open Rate</span>
                        <span className="font-bold text-green-600">48.2%</span>
                      </div>
                      <div className="flex justify-between p-1.5 rounded bg-black/[0.02]">
                        <span className="text-black/50">Avg. Click Rate</span>
                        <span className="font-bold text-[#0891B2]">12.7%</span>
                      </div>
                      <div className="flex justify-between p-1.5 rounded bg-black/[0.02]">
                        <span className="text-black/50">Newsletters Sent</span>
                        <span className="font-bold text-black/70">3</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          ) : navActive === 'Financial Overview' ? (
            /* DEDICATED FINANCIAL OVERVIEW SUB-VIEW */
            <div className="space-y-4 font-sans">
              
              {/* 1. 4-Card Financial Metric Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Total Dues Collected */}
                <div className="p-4.5 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm flex flex-col justify-between">
                  <div className="text-[10px] font-semibold text-black/40 uppercase tracking-wider mb-2">
                    Total Dues Collected
                  </div>
                  <div className="text-[26px] font-bold text-[#1C1C1E] leading-none mb-1">
                    ₦285K
                  </div>
                  <div className="text-[10px] text-green-600 font-medium mt-1">
                    +12% vs last quarter
                  </div>
                </div>

                {/* Project Grants */}
                <div className="p-4.5 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm flex flex-col justify-between">
                  <div className="text-[10px] font-semibold text-black/40 uppercase tracking-wider mb-2">
                    Project Grants
                  </div>
                  <div className="text-[26px] font-bold text-[#1C1C1E] leading-none mb-1">
                    ₦124K
                  </div>
                  <div className="text-[10px] text-green-600 font-medium mt-1">
                    +6% vs last quarter
                  </div>
                </div>

                {/* District Reserves */}
                <div className="p-4.5 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm flex flex-col justify-between">
                  <div className="text-[10px] font-semibold text-black/40 uppercase tracking-wider mb-2">
                    District Reserves
                  </div>
                  <div className="text-[26px] font-bold text-green-600 leading-none mb-1">
                    ₦76K
                  </div>
                  <div className="text-[10px] text-green-600 font-medium mt-1">
                    +3% vs last quarter
                  </div>
                </div>

                {/* Outstanding Dues */}
                <div className="p-4.5 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm flex flex-col justify-between">
                  <div className="text-[10px] font-semibold text-black/40 uppercase tracking-wider mb-2">
                    Outstanding Dues
                  </div>
                  <div className="text-[26px] font-bold text-[#D91B5C] leading-none mb-1">
                    ₦18K
                  </div>
                  <div className="text-[10px] text-[#D91B5C] font-medium mt-1">
                    -8% vs last quarter
                  </div>
                </div>
              </div>

              {/* 2. Bottom Split: District Fund Aggregate (2-Span) + Impact by Category (1-Span) */}
              <div className="flex flex-col lg:flex-row gap-3">
                {/* District Fund Aggregate Area Chart */}
                <div className="flex-[2] p-5 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm">
                  <div className="text-xs font-bold text-[#1C1C1E]">District Fund Aggregate</div>
                  <div className="text-[10px] text-black/40 mb-3">Monthly accumulation, NGN</div>
                  
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl font-bold text-[#B8860B] leading-none">₦485K</span>
                    <span className="text-[10px] text-green-600 font-semibold">▲ +8.5%</span>
                  </div>

                  <div className="h-30 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={FUND_SPARKLINE} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="fin-fund-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#D91B5C" stopOpacity={0.4} />
                            <stop offset="100%" stopColor="#A855F7" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="rgba(0,0,0,0.06)" vertical={false} />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'rgba(28,28,30,0.35)', fontSize: 9, fontFamily: 'Inter' }} />
                        <Area type="monotone" dataKey="value" stroke="#D91B5C" strokeWidth={2.5} fill="url(#fin-fund-grad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Impact by Category Donut */}
                <div className="flex-1 p-5 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm flex flex-col justify-between min-w-[280px]">
                  <div>
                    <div className="text-xs font-bold text-[#1C1C1E]">Impact by Category</div>
                    <div className="text-[10px] text-black/40 mb-3">Project distribution, all 47 clubs</div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-28 h-28 shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={CATEGORY_DATA} dataKey="value" innerRadius={30} outerRadius={52} paddingAngle={2}>
                            {CATEGORY_DATA.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="flex-1 space-y-2">
                      {CATEGORY_DATA.map((cat) => (
                        <div key={cat.name} className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-xs shrink-0" style={{ background: cat.color }} />
                          <span className="text-[10px] text-black/60 flex-1">{cat.name}</span>
                          <span className="text-[10px] font-bold" style={{ color: cat.color }}>{cat.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-black/[0.06] text-[10px] text-black/40">
                    180+ active verified projects on District Registry
                  </div>
                </div>
              </div>

            </div>
          ) : navActive === 'Membership Growth' ? (
            /* DEDICATED MEMBERSHIP GROWTH ANALYTICS SUB-VIEW */
            <div className="space-y-4 font-sans">
              
              {/* Top Row: Hero Growth Chart (2-Span) + Stacked Fund & Engagement (1-Span) */}
              <div className="flex flex-col lg:flex-row gap-3">
                {/* 1. Membership Growth Hero Canvas */}
                <div className="flex-[2] p-5 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm">
                  <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                    <div>
                      <div className="text-xs font-bold text-[#1C1C1E] tracking-tight">Membership Growth</div>
                      <div className="text-[10px] text-black/40 mt-0.5">District-wide, January – December 2026</div>
                    </div>

                    <div className="flex border-b border-black/[0.08]">
                      {(['Total', 'Prospective', 'Engaged'] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setMembershipTab(tab)}
                          className={`px-3 py-1 text-[10px] font-semibold transition-all -mb-px ${
                            membershipTab === tab
                              ? 'border-b-2 border-[#D91B5C] text-[#1C1C1E] font-bold'
                              : 'text-black/40 hover:text-black/70'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2.5 mb-4">
                    <span className="text-3xl font-bold text-[#B8860B] leading-none">3,247</span>
                    <span className="text-[11px] text-green-600 font-semibold">▲ +34.7% YTD</span>
                    <span className="text-[10px] text-black/40">vs Jan 2026</span>
                  </div>

                  <div className="h-50 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={MEMBERSHIP_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="mb-growth-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#D91B5C" stopOpacity={0.45} />
                            <stop offset="55%" stopColor="#A855F7" stopOpacity={0.12} />
                            <stop offset="100%" stopColor="#A855F7" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="rgba(0,0,0,0.06)" vertical={false} />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'rgba(28,28,30,0.35)', fontSize: 10, fontFamily: 'Inter' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(28,28,30,0.35)', fontSize: 10, fontFamily: 'Inter' }} />
                        <Tooltip contentStyle={{ background: '#090A0F', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '11px', color: '#fff' }} />
                        <Area type="monotone" dataKey={membershipTab === 'Total' ? 'total' : membershipTab === 'Prospective' ? 'prospective' : 'engaged'} stroke="#D91B5C" strokeWidth={3.5} fill="url(#mb-growth-grad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 2. Right Stacked Metric Cards */}
                <div className="flex-1 flex flex-col gap-3 min-w-[260px]">
                  {/* District Fund Aggregate */}
                  <div className="p-4.5 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm">
                    <div className="text-xs font-bold text-[#1C1C1E]">District Fund Aggregate</div>
                    <div className="text-[10px] text-black/40 mb-3">Monthly accumulation, NGN</div>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-2xl font-bold text-[#B8860B] leading-none">₦485K</span>
                      <span className="text-[10px] text-green-600 font-semibold">▲ +8.5%</span>
                    </div>
                    <div className="h-30 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={FUND_SPARKLINE} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="mb-fund-grad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#D91B5C" stopOpacity={0.4} />
                              <stop offset="100%" stopColor="#A855F7" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid stroke="rgba(0,0,0,0.06)" vertical={false} />
                          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'rgba(28,28,30,0.35)', fontSize: 9, fontFamily: 'Inter' }} />
                          <Area type="monotone" dataKey="value" stroke="#D91B5C" strokeWidth={2.5} fill="url(#mb-fund-grad)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Engagement Score */}
                  <div className="p-4.5 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm">
                    <div className="text-xs font-bold text-[#1C1C1E]">Engagement Score</div>
                    <div className="text-[10px] text-black/40 mb-3">Rolling 12-week avg, all clubs</div>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-2xl font-bold text-green-600 leading-none">91 / 100</span>
                      <span className="text-[10px] text-green-600 font-semibold">▲ +47%</span>
                    </div>
                    <div className="h-30 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={ENGAGEMENT_SPARKLINE} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="mb-eng-grad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#16A34A" stopOpacity={0.35} />
                              <stop offset="100%" stopColor="#16A34A" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid stroke="rgba(0,0,0,0.06)" vertical={false} />
                          <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: 'rgba(28,28,30,0.35)', fontSize: 9, fontFamily: 'Inter' }} />
                          <Area type="monotone" dataKey="value" stroke="#16A34A" strokeWidth={2.5} fill="url(#mb-eng-grad)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Lead Acquisition Trend (Left) + Impact by Category (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {/* 1. Lead Acquisition Trend */}
                <div className="p-5 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm">
                  <div className="text-xs font-bold text-[#1C1C1E]">Lead Acquisition Trend</div>
                  <div className="text-[10px] text-black/40 mb-3.5">Monthly prospective leads via Club Finder</div>
                  
                  <div className="h-40 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={LEAD_ACQUISITION_DATA} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="mb-leads-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0891B2" stopOpacity={0.4} />
                            <stop offset="100%" stopColor="#0891B2" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="rgba(0,0,0,0.06)" vertical={false} />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'rgba(28,28,30,0.35)', fontSize: 9, fontFamily: 'Inter' }} />
                        <Area type="monotone" dataKey="leads" stroke="#0891B2" strokeWidth={2.5} fill="url(#mb-leads-grad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 2. Impact by Category */}
                <div className="p-5 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#1C1C1E]">Impact by Category</div>
                    <div className="text-[10px] text-black/40 mb-4">Project distribution, all 47 clubs</div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-28 h-28 shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={CATEGORY_DATA} dataKey="value" innerRadius={30} outerRadius={52} paddingAngle={2}>
                            {CATEGORY_DATA.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="flex-1 space-y-2">
                      {CATEGORY_DATA.map((cat) => (
                        <div key={cat.name} className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-xs shrink-0" style={{ background: cat.color }} />
                          <span className="text-[10px] text-black/60 flex-1">{cat.name}</span>
                          <span className="text-[10px] font-bold" style={{ color: cat.color }}>{cat.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-black/[0.06] text-[10px] text-black/40">
                    180+ active verified projects on District Registry
                  </div>
                </div>
              </div>

            </div>
          ) : navActive === 'Club Performance' ? (
            /* DEDICATED CLUB PERFORMANCE DEEP-DIVE VIEW */
            <div className="space-y-4 font-sans">
              <div className="text-xs text-black/40">
                Club performance deep-dive — all 47 registered clubs
              </div>

              {/* Hero BarChart Canvas */}
              <div className="p-5 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm">
                <div className="text-xs font-bold text-[#1C1C1E] mb-1">
                  Performance Score by Club
                </div>
                <div className="text-[10px] text-black/40 mb-3.5">
                  Composite index: meeting attendance + dues + projects + growth
                </div>

                <div className="h-55 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={CLUB_PERFORMANCE} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid stroke="rgba(0,0,0,0.06)" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'rgba(28,28,30,0.35)', fontSize: 9, fontFamily: 'Inter' }} />
                      <YAxis domain={[60, 100]} axisLine={false} tickLine={false} tick={{ fill: 'rgba(28,28,30,0.35)', fontSize: 9, fontFamily: 'Inter' }} />
                      <Tooltip contentStyle={{ background: '#090A0F', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '11px', color: '#fff' }} />
                      <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                        {CLUB_PERFORMANCE.map((entry, index) => (
                          <Cell key={`bar-cell-${index}`} fill={entry.color} opacity={0.92} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Dual-Split Row: Club Performance Index Leaderboard (Left) + District Activity Feed (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {/* 1. Club Performance Index */}
                <div className="p-4.5 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-xs font-bold text-[#1C1C1E]">Club Performance Index</div>
                      <div className="text-[10px] text-black/40 mt-0.5">Composite score: activity + dues + projects</div>
                    </div>
                    <button className="flex items-center gap-1 px-2.5 py-1 rounded bg-black/[0.04] border border-black/[0.08] text-black/40 text-[10px]">
                      <Filter size={10} /> Filter
                    </button>
                  </div>

                  <div className="space-y-2">
                    {CLUB_PERFORMANCE.map((c) => (
                      <div key={c.rank} className="flex items-center gap-3">
                        <span className="text-[10px] text-black/40 w-4 text-right">{c.rank}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-semibold text-[#1C1C1E] truncate">{c.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] text-black/40">{c.members} mbrs</span>
                              <span className="font-extrabold text-[11px]" style={{ color: c.color }}>{c.score}</span>
                            </div>
                          </div>
                          <div className="h-1 rounded-full bg-black/[0.08] overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all duration-500" 
                              style={{ width: `${c.score}%`, backgroundColor: c.color }} 
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. District Activity Feed */}
                <div className="p-4.5 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm">
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="text-xs font-bold text-[#1C1C1E]">District Activity Feed</div>
                    <span className="text-[9px] text-black/40">Live</span>
                  </div>

                  <div className="space-y-0 divide-y divide-black/[0.06]">
                    {[
                      { text: '47 new members inducted across 6 clubs', time: '2h ago', icon: UserCheck, color: 'text-green-600 bg-green-50' },
                      { text: 'OAU Ile-Ife Club reached Tier 1 status', time: '5h ago', icon: Award, color: 'text-black/40 bg-black/[0.04]' },
                      { text: 'Digital Skills Academy hit 2,400 trained', time: '1d ago', icon: Zap, color: 'text-black/40 bg-black/[0.04]' },
                      { text: '3 clubs flagged for dues non-compliance', time: '1d ago', icon: AlertCircle, color: 'text-[#D91B5C] bg-[#D91B5C]/10' },
                      { text: 'District 9126 wins Continental Award', time: '2d ago', icon: Globe, color: 'text-black/40 bg-black/[0.04]' },
                      { text: 'Leadership Summit: 400+ attendees', time: '3d ago', icon: Calendar, color: 'text-black/40 bg-black/[0.04]' },
                      { text: 'Membership growth +12% this quarter', time: '4d ago', icon: TrendingUp, color: 'text-green-600 bg-green-50' }
                    ].map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div key={idx} className="flex items-start gap-2.5 py-2">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${item.color}`}>
                            <Icon size={13} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-[11px] text-black/70 leading-snug">{item.text}</div>
                            <div className="text-[9.5px] text-black/40 mt-0.5">{item.time}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* DEFAULT OVERVIEW SUB-VIEW (4 Sparkline Cards, Growth Area Chart, Donut Breakdown) */
            <>
              {/* Action Required Banner */}
              <div className="flex items-center gap-3 p-3 px-4 rounded-xl bg-[#D91B5C]/[0.04] border-l-4 border-[#D91B5C] border-y border-r border-[#D91B5C]/20 shadow-sm cursor-pointer hover:bg-[#D91B5C]/[0.06] transition-colors">
                <div className="w-7 h-7 rounded-lg bg-[#D91B5C]/15 border border-[#D91B5C]/30 flex items-center justify-center text-[#D91B5C] shrink-0">
                  <AlertCircle size={14} />
                </div>
                <span className="text-xs text-black/70 flex-1 leading-relaxed">
                  <strong className="text-[#D91B5C]">Action required:</strong> 3 clubs have outstanding dues compliance issues — Rasheed Lawal, Taiwo Olabisi, Folake Adewusi.
                </span>
                <ChevronRight className="text-black/40" size={14} />
              </div>

              {/* Quick Analytics CTA Glass Banner */}
              <div className="p-3.5 px-4 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#D91B5C]/10 border border-[#D91B5C]/20 flex items-center justify-center text-[#D91B5C] shrink-0">
                    <Activity size={13} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1C1C1E]">Executive Analytics Dashboard</div>
                    <div className="text-[10px] text-black/40">Full metrics breakdown across all 47 clubs · 7 states</div>
                  </div>
                </div>
                <button 
                  onClick={() => setNavActive('Executive Analytics')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#D91B5C]/10 border border-[#D91B5C]/20 text-[#D91B5C] text-xs font-bold hover:bg-[#D91B5C]/20 transition-all shrink-0"
                >
                  View Full Analytics <ArrowRight size={12} />
                </button>
              </div>

              {/* 4 Sparkline Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  {
                    title: 'Total Active Members',
                    value: '3,247',
                    change: '+12%',
                    desc: 'Across 47 clubs · 7 states',
                    icon: Users
                  },
                  {
                    title: 'District Fund Aggregate',
                    value: '₦485K',
                    change: '+8.5%',
                    desc: 'Q3 2026 · Dues + project grants',
                    icon: DollarSign
                  },
                  {
                    title: 'Prospective Leads',
                    value: '156',
                    change: '+23%',
                    desc: 'Active pipeline · 5 stages',
                    icon: TrendingUp
                  },
                  {
                    title: 'Project Impact Reach',
                    value: '52.4K',
                    change: '+18%',
                    desc: 'Beneficiaries · 180+ projects',
                    icon: Globe
                  }
                ].map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <div key={idx} className="p-4 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm flex flex-col justify-between">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-9 h-9 rounded-lg bg-[#D91B5C]/[0.06] border border-[#D91B5C]/15 flex items-center justify-center text-[#D91B5C]">
                          <Icon size={17} />
                        </div>
                        <span className="flex items-center gap-0.5 px-2 py-0.5 rounded bg-green-50 border border-green-200 text-green-700 text-[10px] font-bold">
                          <ArrowUpRight size={10} /> {card.change}
                        </span>
                      </div>

                      <div>
                        <div className="text-[10px] font-semibold text-black/40 uppercase tracking-wider mb-1">
                          {card.title}
                        </div>
                        <div className="text-xl font-bold text-[#1C1C1E] leading-none mb-1.5">
                          {card.value}
                        </div>
                        <div className="text-[10px] text-black/40">
                          {card.desc}
                        </div>
                      </div>

                      {/* Sparkline mini-graph */}
                      <div className="h-11 mt-2 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={FUND_SPARKLINE}>
                            <defs>
                              <linearGradient id={`sparkGrad-${idx}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#D91B5C" stopOpacity={0.35} />
                                <stop offset="100%" stopColor="#D91B5C" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="value" stroke="#D91B5C" strokeWidth={1.5} fill={`url(#sparkGrad-${idx})`} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Middle Analytics Chart Row */}
              <div className="flex flex-col lg:flex-row gap-3">
                {/* Membership Growth Area Chart */}
                <div className="flex-1 p-5 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm">
                  <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                    <div>
                      <div className="text-xs font-bold text-[#1C1C1E]">Membership Growth</div>
                      <div className="text-[10px] text-black/40 mt-0.5">District-wide, January – December 2026</div>
                    </div>

                    <div className="flex border-b border-black/[0.08]">
                      {(['Total', 'Prospective', 'Engaged'] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setMembershipTab(tab)}
                          className={`px-3 py-1 text-[10px] font-semibold transition-all -mb-px ${
                            membershipTab === tab
                              ? 'border-b-2 border-[#D91B5C] text-[#1C1C1E] font-bold'
                              : 'text-black/40 hover:text-black/70'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2.5 mb-3">
                    <span className="text-3xl font-bold text-[#B8860B] leading-none">3,247</span>
                    <span className="text-[11px] text-green-600 font-semibold">▲ +34.7% YTD</span>
                    <span className="text-[10px] text-black/40">vs Jan 2026</span>
                  </div>

                  <div className="h-50 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={MEMBERSHIP_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#D91B5C" stopOpacity={0.45} />
                            <stop offset="55%" stopColor="#A855F7" stopOpacity={0.12} />
                            <stop offset="100%" stopColor="#A855F7" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="rgba(0,0,0,0.06)" vertical={false} />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'rgba(28,28,30,0.35)', fontSize: 10, fontFamily: 'Inter' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(28,28,30,0.35)', fontSize: 10, fontFamily: 'Inter' }} />
                        <Tooltip contentStyle={{ background: '#090A0F', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '11px', color: '#fff' }} />
                        <Area type="monotone" dataKey={membershipTab === 'Total' ? 'total' : membershipTab === 'Prospective' ? 'prospective' : 'engaged'} stroke="#D91B5C" strokeWidth={3} fill="url(#growthGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Right Stacked Mini-Charts */}
                <div className="w-full lg:w-65 flex flex-col gap-3 shrink-0">
                  {/* Fund Aggregate */}
                  <div className="p-4 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm">
                    <div className="text-xs font-bold text-[#1C1C1E]">District Fund Aggregate</div>
                    <div className="text-[10px] text-black/40 mb-2">Monthly accumulation, NGN</div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-xl font-bold text-[#B8860B]">₦485K</span>
                      <span className="text-[10px] text-green-600 font-semibold">▲ +8.5%</span>
                    </div>
                    <div className="h-28 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={FUND_SPARKLINE}>
                          <defs>
                            <linearGradient id="fundGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#D91B5C" stopOpacity={0.4} />
                              <stop offset="100%" stopColor="#A855F7" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="value" stroke="#D91B5C" strokeWidth={2} fill="url(#fundGrad)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Engagement Score */}
                  <div className="p-4 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm">
                    <div className="text-xs font-bold text-[#1C1C1E]">Engagement Score</div>
                    <div className="text-[10px] text-black/40 mb-2">Rolling 12-week avg, all clubs</div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-xl font-bold text-green-600">91 / 100</span>
                      <span className="text-[10px] text-green-600 font-semibold">▲ +47%</span>
                    </div>
                    <div className="h-28 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={ENGAGEMENT_SPARKLINE}>
                          <defs>
                            <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#16A34A" stopOpacity={0.35} />
                              <stop offset="100%" stopColor="#16A34A" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="value" stroke="#16A34A" strokeWidth={2} fill="url(#engGrad)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Grid: Leaderboard + Category Donut + Feed */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {/* 1. Club Performance Index */}
                <div className="p-4.5 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-xs font-bold text-[#1C1C1E]">Club Performance Index</div>
                      <div className="text-[10px] text-black/40 mt-0.5">Composite score: activity + dues + projects</div>
                    </div>
                    <button className="flex items-center gap-1 px-2.5 py-1 rounded bg-black/[0.04] border border-black/[0.08] text-black/40 text-[10px]">
                      <Filter size={10} /> Filter
                    </button>
                  </div>

                  <div className="space-y-2">
                    {CLUB_PERFORMANCE.map((c) => (
                      <div key={c.rank} className="flex items-center gap-3">
                        <span className="text-[10px] text-black/40 w-4 text-right">{c.rank}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-semibold text-[#1C1C1E] truncate">{c.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] text-black/40">{c.members} mbrs</span>
                              <span className="font-extrabold text-[11px]" style={{ color: c.color }}>{c.score}</span>
                            </div>
                          </div>
                          <div className="h-1 rounded-full bg-black/[0.08] overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${c.score}%`, backgroundColor: c.color }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Impact by Category (Donut + Bars) */}
                <div className="p-4.5 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#1C1C1E]">Impact by Category</div>
                    <div className="text-[10px] text-black/40 mb-3">Project distribution, all 47 clubs</div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-28 h-28 shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={CATEGORY_DATA} dataKey="value" innerRadius={30} outerRadius={52} paddingAngle={2}>
                            {CATEGORY_DATA.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="flex-1 space-y-2">
                      {CATEGORY_DATA.map((cat) => (
                        <div key={cat.name} className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-xs shrink-0" style={{ background: cat.color }} />
                          <span className="text-[10px] text-black/60 flex-1">{cat.name}</span>
                          <span className="text-[10px] font-bold" style={{ color: cat.color }}>{cat.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-black/[0.06] text-[10px] text-black/40">
                    180+ active verified projects on District Registry
                  </div>
                </div>

                {/* 3. Live District Activity Feed */}
                <div className="p-4.5 rounded-2xl bg-white/75 border border-black/[0.08] backdrop-blur-xl shadow-sm">
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="text-xs font-bold text-[#1C1C1E]">District Activity Feed</div>
                    <span className="text-[9px] text-black/40">Live</span>
                  </div>

                  <div className="space-y-0 divide-y divide-black/[0.06]">
                    {[
                      { text: '47 new members inducted across 6 clubs', time: '2h ago', icon: UserCheck, color: 'text-green-600 bg-green-50' },
                      { text: 'OAU Ile-Ife Club reached Tier 1 status', time: '5h ago', icon: Award, color: 'text-black/40 bg-black/[0.04]' },
                      { text: 'Digital Skills Academy hit 2,400 trained', time: '1d ago', icon: Zap, color: 'text-black/40 bg-black/[0.04]' },
                      { text: '3 clubs flagged for dues non-compliance', time: '1d ago', icon: AlertCircle, color: 'text-[#D91B5C] bg-[#D91B5C]/10' },
                      { text: 'District 9126 wins Continental Award', time: '2d ago', icon: Globe, color: 'text-black/40 bg-black/[0.04]' },
                      { text: 'Leadership Summit: 400+ attendees', time: '3d ago', icon: Calendar, color: 'text-black/40 bg-black/[0.04]' }
                    ].map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div key={idx} className="flex items-start gap-2.5 py-2">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${item.color}`}>
                            <Icon size={13} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-[11px] text-black/70 leading-snug">{item.text}</div>
                            <div className="text-[9.5px] text-black/40 mt-0.5">{item.time}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </>
          )}
        </div>
      </div>

    </div>
  );
}
