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
  TrendingUp 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
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

export default function DistrictExecutiveDashboardPage() {
  const [navActive, setNavActive] = useState('Overview');
  const [membershipTab, setMembershipTab] = useState<'Total' | 'Prospective' | 'Engaged'>('Total');
  const [searchQuery, setSearchQuery] = useState('');

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

        </div>
      </div>

    </div>
  );
}
