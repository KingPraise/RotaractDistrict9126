'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutGrid, 
  CreditCard, 
  Calendar, 
  Layers, 
  Wallet, 
  Users, 
  BarChart3, 
  TrendingUp, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Search, 
  Download, 
  Plus, 
  Bell, 
  ChevronDown, 
  ChevronLeft,
  ShieldCheck,
  Award,
  QrCode,
  Share2,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreVertical,
  Building2,
  MapPin,
  ExternalLink
} from 'lucide-react';

export default function MemberDashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [activeChartTab, setActiveChartTab] = useState<'Events' | 'Projects' | 'Volunteering'>('Events');
  const [memberFilter, setMemberFilter] = useState<'Active' | 'Alumni'>('Active');
  const [searchMember, setSearchMember] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    const qrData = encodeURIComponent(
      'ROTARACT-9126:VERIFIED|ID:ROT-9126-2026|USER:TUNDE-ADEYEMI|STATUS:CLEARED|DISTRICT:9126-NIGERIA'
    );
    setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${qrData}&bgcolor=ffffff&color=080c14&margin=1`);
  }, []);

  const monthlyData = [
    { month: 'Nov', count: 2, height: '18px' },
    { month: 'Dec', count: 3, height: '28px' },
    { month: 'Jan', count: 4, height: '37px' },
    { month: 'Feb', count: 3, height: '28px' },
    { month: 'Mar', count: 5, height: '46px' },
    { month: 'Apr', count: 4, height: '37px' },
    { month: 'May', count: 6, height: '55px' },
    { month: 'Jun', count: 5, height: '46px' },
    { month: 'Jul', count: 12, height: '110px', isCurrent: true },
  ];

  const duesRecords = [
    {
      id: 'PAY-D9126-001',
      name: 'Tunde Adeyemi',
      club: 'RC Ibadan Central',
      status: 'Cleared',
      period: 'Jan – Jun 2026',
      avatar: 'https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?w=80&h=80&fit=crop&auto=format'
    },
    {
      id: 'PAY-D9126-002',
      name: 'Funmi Olatunde',
      club: 'RC Ibadan Bodija',
      status: 'Pending',
      period: 'Jan – Jun 2026',
      avatar: 'https://images.unsplash.com/photo-1573497491765-dccce02b29df?w=80&h=80&fit=crop&auto=format'
    },
    {
      id: 'PAY-D9126-003',
      name: 'Sola Adebayo',
      club: 'RC Univ. of Ibadan',
      status: 'Cleared',
      period: 'Jan – Jun 2026',
      avatar: 'https://images.unsplash.com/photo-1609436132311-e4b0c9370469?w=80&h=80&fit=crop&auto=format'
    },
    {
      id: 'PAY-D9126-004',
      name: 'Kayode Faleye',
      club: 'RC Ibadan Ring Road',
      status: 'Defaulted',
      period: 'Jan – Jun 2026',
      avatar: 'https://images.unsplash.com/photo-1659422440915-d516c6dc932e?w=80&h=80&fit=crop&auto=format'
    },
    {
      id: 'PAY-D9126-005',
      name: 'Yetunde Balogun',
      club: 'RC Ibadan North',
      status: 'Cleared',
      period: 'Jan – Jun 2026',
      avatar: 'https://images.unsplash.com/photo-1657218380188-40c56bfdf97f?w=80&h=80&fit=crop&auto=format'
    },
    {
      id: 'PAY-D9126-006',
      name: 'Seun Adegoke',
      club: 'RC LAUTECH Ogbomoso',
      status: 'Pending',
      period: 'Jan – Jun 2026',
      avatar: 'https://images.unsplash.com/photo-1646658104783-2eec2433c1d1?w=80&h=80&fit=crop&auto=format'
    }
  ];

  const filteredDues = duesRecords.filter(r => 
    r.name.toLowerCase().includes(searchMember.toLowerCase()) ||
    r.club.toLowerCase().includes(searchMember.toLowerCase()) ||
    r.id.toLowerCase().includes(searchMember.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-white text-[#1C1C1E] overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* BACKGROUND AMBIENT GLOWS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-[10%] right-[10%] w-[45%] h-[50%] bg-[#981132]/[0.07] blur-[80px] rounded-full" />
        <div className="absolute -bottom-[10%] left-[15%] w-[40%] h-[45%] bg-[#981132]/[0.07] blur-[80px] rounded-full" />
      </div>

      {/* 1. LEFT SIDEBAR */}
      <aside 
        className={`h-screen bg-[#F4F1F0] backdrop-blur-[24px] border-r border-black/[0.08] flex flex-col transition-all duration-300 relative z-20 shrink-0 ${
          sidebarCollapsed ? 'w-[72px]' : 'w-[210px]'
        }`}
      >
        {/* Brand Lockup */}
        <div className="flex items-center justify-between p-4 border-b border-black/[0.08]">
          <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
            <img 
              src="/images/rotary-wheel.png" 
              alt="Rotaract" 
              className="w-8 h-8 object-contain shrink-0 drop-shadow-[0_0_6px_rgba(152,17,50,0.45)]"
            />
            {!sidebarCollapsed && (
              <div className="leading-tight">
                <div className="text-xs font-black tracking-wider uppercase text-[#1C1C1E]">Rotaract</div>
                <div className="text-[8px] text-black/40 uppercase tracking-widest font-semibold">District 9126</div>
              </div>
            )}
          </Link>

          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 rounded-lg bg-black/[0.04] border border-black/[0.08] text-black/40 hover:text-black transition-colors cursor-pointer"
            aria-label="Toggle Sidebar"
          >
            <ChevronLeft className={`transition-transform duration-200 ${sidebarCollapsed ? 'rotate-180' : ''}`} size={12}/>
          </button>
        </div>

        {/* Navigation Categories */}
        <nav className="flex-1 overflow-y-auto py-2.5 px-2 space-y-4">
          
          {/* Group: MAIN */}
          <div>
            {!sidebarCollapsed && (
              <div className="px-2 pb-1 text-[9px] font-bold text-black/40 tracking-widest uppercase">
                Main
              </div>
            )}
            <div className="space-y-0.5">
              {[
                { name: 'Dashboard', icon: LayoutGrid },
                { name: 'Identity Card', icon: CreditCard },
                { name: 'Events', icon: Calendar },
                { name: 'Projects', icon: Layers },
                { name: 'Dues & Payments', icon: Wallet },
                { name: 'Directory', icon: Users },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveNav(item.name)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all text-left cursor-pointer ${
                      isActive 
                        ? 'bg-[#981132]/10 text-[#981132] font-bold border border-[#981132]/30 shadow-sm'
                        : 'text-black/60 hover:text-black hover:bg-black/[0.03]'
                    }`}
                  >
                    <Icon className={isActive ? 'text-[#981132]' : 'text-black/50'} size={14}/>
                    {!sidebarCollapsed && <span>{item.name}</span>}
                    {isActive && !sidebarCollapsed && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#981132]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group: FEATURES */}
          <div>
            {!sidebarCollapsed && (
              <div className="px-2 pb-1 text-[9px] font-bold text-black/40 tracking-widest uppercase">
                Features
              </div>
            )}
            <div className="space-y-0.5">
              {[
                { name: 'Club Reports', icon: BarChart3 },
                { name: 'Analytics', icon: TrendingUp },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveNav(item.name)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-black/60 hover:text-black hover:bg-black/[0.03] transition-all text-left cursor-pointer"
                  >
                    <Icon className="text-black/50" size={14}/>
                    {!sidebarCollapsed && <span>{item.name}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group: TOOLS */}
          <div>
            {!sidebarCollapsed && (
              <div className="px-2 pb-1 text-[9px] font-bold text-black/40 tracking-widest uppercase">
                Tools
              </div>
            )}
            <div className="space-y-0.5">
              {[
                { name: 'Settings', icon: Settings },
                { name: 'Help Centre', icon: HelpCircle },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveNav(item.name)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-black/60 hover:text-black hover:bg-black/[0.03] transition-all text-left cursor-pointer"
                  >
                    <Icon className="text-black/50" size={14}/>
                    {!sidebarCollapsed && <span>{item.name}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Management Console CTA */}
          <div className="pt-2">
            <Link 
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-[#981132] text-white text-xs font-semibold shadow-md shadow-[#981132]/30 hover:bg-[#A70C43] transition-all" 
              href="/portal/president"
            >
              <LayoutGrid size={14}/>
              {!sidebarCollapsed && <span>Management Console</span>}
            </Link>
          </div>
        </nav>

        {/* Exec Promo Banner */}
        {!sidebarCollapsed && (
          <div className="m-2.5 p-3 rounded-2xl bg-[#981132] text-white relative overflow-hidden shadow-sm">
            <div className="relative z-10">
              <div className="text-[11px] font-extrabold mb-0.5">Become an Exec!</div>
              <p className="text-[9px] text-white/80 leading-relaxed mb-2.5">
                Elevate your role and lead your club forward this season.
              </p>
              <div className="flex gap-1.5">
                <button className="flex-1 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold cursor-pointer transition-colors">
                  Apply Now
                </button>
                <button className="flex-1 py-1 rounded-lg border border-white/25 text-white/80 hover:text-white text-[10px] cursor-pointer transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Card & Logout */}
        <div className="p-2 border-t border-black/[0.08]">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-[#D91B5C]/10 to-[#A855F7]/10 border border-[#D91B5C]/20 flex items-center justify-between gap-2 mb-1">
            {!sidebarCollapsed && (
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-[#1C1C1E] truncate">Tunde Adeyemi</div>
                <div className="text-[9px] text-black/40">Active Member</div>
              </div>
            )}
            <div className="relative shrink-0">
              <div className="w-8 h-8 rounded-full p-[1.5px] bg-gradient-to-tr from-[#D91B5C] to-[#A855F7]">
                <img 
                  src="https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?w=80&h=80&fit=crop&auto=format" 
                  alt="Tunde" 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          <button 
            onClick={() => window.location.href = '/login'}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-black/50 hover:text-black transition-colors cursor-pointer"
          >
            <LogOut size={13}/>
            {!sidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* 2. MAIN DASHBOARD CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        
        {/* Top App Header */}
        <header className="px-6 py-4 border-b border-black/[0.06] bg-white/95 backdrop-blur-md flex items-center justify-between gap-4 shrink-0">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-[#1C1C1E] leading-tight">
              Good afternoon, Tunde 👋
            </h1>
            <p className="text-[10px] text-black/40 mt-0.5">
              Wednesday, 19 August 2026 · District 9126 Session
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/[0.04] border border-black/[0.08] text-xs text-black/70 hover:bg-black/[0.08] cursor-pointer">
              Manage Events
            </button>
            <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/[0.04] border border-black/[0.08] text-xs text-black/70 hover:bg-black/[0.08] cursor-pointer">
              <Download size={12}/> Export
            </button>
            <Link className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#981132] text-white text-xs font-bold shadow-md shadow-[#981132]/30 hover:bg-[#A70C43] transition-all" href="/clubs">
              + New Registration
            </Link>
            <button className="p-2 rounded-xl bg-black/[0.04] border border-black/[0.08] text-black/60 relative cursor-pointer hover:text-black">
              <Bell size={14}/>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#981132]" />
            </button>
          </div>
        </header>

        {/* Dashboard 2-Column Split: Analytics (Left) & Digital ID (Right) */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* Middle Analytics Column */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            
            {/* 3 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-black/[0.024] border border-black/[0.06] shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-[9px] font-bold text-black/40 uppercase tracking-wider">
                  Impact Points
                  <span className="px-1.5 py-0.5 rounded-full bg-green-50 text-green-600 font-bold border border-green-200">+8%</span>
                </div>
                <div className="text-2xl font-black text-[#D4A520] my-2">1,240</div>
                <div className="text-[10px] text-black/60">260 pts to Tier 2</div>
              </div>

              <div className="p-4 rounded-2xl bg-black/[0.024] border border-black/[0.06] shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-[9px] font-bold text-black/40 uppercase tracking-wider">
                  Events Attended
                  <span className="px-1.5 py-0.5 rounded-full bg-green-50 text-green-600 font-bold border border-green-200">+33%</span>
                </div>
                <div className="text-2xl font-black text-[#D4A520] my-2">12</div>
                <div className="text-[10px] text-black/60">This Rotaract year</div>
              </div>

              <div className="p-4 rounded-2xl bg-black/[0.024] border border-black/[0.06] shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-[9px] font-bold text-black/40 uppercase tracking-wider">
                  Projects Joined
                  <span className="px-1.5 py-0.5 rounded-full bg-green-50 text-green-600 font-bold border border-green-200">+1 this month</span>
                </div>
                <div className="text-2xl font-black text-[#D4A520] my-2">4</div>
                <div className="text-[10px] text-black/60">Active across D9126</div>
              </div>
            </div>

            {/* Monthly Bar Chart */}
            <div className="p-5 rounded-2xl bg-black/[0.024] border border-black/[0.06] shadow-sm">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div>
                  <div className="text-[9.5px] font-bold text-black/40 uppercase tracking-wider">Activity Overview</div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl font-black text-[#1C1C1E]">12</span>
                    <span className="text-xs text-black/60">events this season</span>
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">+33% vs last month</span>
                  </div>
                </div>

                {/* Filter Switcher */}
                <div className="flex gap-1 p-1 rounded-xl bg-black/[0.04] border border-black/[0.08]">
                  {(['Events', 'Projects', 'Volunteering'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveChartTab(tab)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                        activeChartTab === tab 
                          ? 'bg-[#981132] text-white font-bold shadow-sm' 
                          : 'text-black/60 hover:text-black'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Histogram Canvas */}
              <div className="relative pt-6 pb-2">
                {/* Dashed Threshold Lines */}
                <div className="absolute inset-x-0 top-6 border-t border-dashed border-black/[0.06]" />
                <div className="absolute inset-x-0 top-16 border-t border-dashed border-black/[0.06]" />
                <div className="absolute inset-x-0 top-26 border-t border-dashed border-black/[0.06]" />

                <div className="flex items-end justify-between h-[130px] px-4 relative z-10">
                  {monthlyData.map((d) => (
                    <div key={d.month} className="flex flex-col items-center gap-1.5">
                      <span className="text-[9px] font-bold text-black/40">{d.count}</span>
                      <div 
                        className={`w-6 rounded-t-md transition-all ${
                          d.isCurrent 
                            ? 'bg-[#981132] shadow-[0_0_16px_rgba(152,17,50,0.6)]' 
                            : 'bg-black/[0.06]'
                        }`}
                        style={{ height: d.height }}
                      />
                      <span className="text-[9px] text-black/40 font-medium">{d.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dues & Roster Table */}
            <div className="rounded-2xl bg-black/[0.024] border border-black/[0.06] shadow-sm overflow-hidden">
              <div className="p-4 border-b border-black/[0.06] flex items-center justify-between gap-4">
                <div className="relative max-w-xs flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30" size={13}/>
                  <input
                    type="text"
                    placeholder="Search members..."
                    value={searchMember}
                    onChange={(e) => setSearchMember(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-black/[0.04] border border-black/[0.08] text-xs outline-none focus:border-[#981132] transition-colors"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-xl bg-black/[0.04] border border-black/[0.08] text-xs text-black/70 hover:bg-black/[0.08] cursor-pointer">
                    Export CSV
                  </button>
                </div>
              </div>

              {/* Table Body */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-black/[0.06] text-black/40 text-[9px] font-bold uppercase tracking-wider">
                      <th className="py-2.5 px-4">Member</th>
                      <th className="py-2.5 px-4">Club</th>
                      <th className="py-2.5 px-4 text-center">Dues Status</th>
                      <th className="py-2.5 px-4">Period</th>
                      <th className="py-2.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.04]">
                    {filteredDues.map((row) => (
                      <tr key={row.id} className="hover:bg-black/[0.02] transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <img 
                              src={row.avatar} 
                              alt={row.name} 
                              className="w-7 h-7 rounded-full object-cover shrink-0 border border-black/10"
                            />
                            <div>
                              <div className="font-bold text-[#1C1C1E]">{row.name}</div>
                              <div className="text-[10px] text-black/40 font-mono">{row.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-black/70 font-medium">{row.club}</td>
                        <td className="py-3 px-4 text-center">
                          <span 
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              row.status === 'Cleared'
                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                                : row.status === 'Pending'
                                ? 'bg-amber-50 text-amber-600 border border-amber-200'
                                : 'bg-rose-50 text-rose-600 border border-rose-200'
                            }`}
                          >
                            {row.status === 'Cleared' && <CheckCircle2 size={10} />}
                            {row.status === 'Pending' && <Clock size={10} />}
                            {row.status === 'Defaulted' && <AlertCircle size={10} />}
                            {row.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-black/50 text-[11px] font-mono">{row.period}</td>
                        <td className="py-3 px-4 text-right">
                          <button className="p-1 rounded-lg hover:bg-black/[0.06] text-black/40 hover:text-black transition-colors cursor-pointer">
                            <MoreVertical size={13}/>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* 3. RIGHT RAIL: DIGITAL ID CARD & FAST ACTIONS */}
          <div className="w-full lg:w-[340px] xl:w-[370px] border-t lg:border-t-0 lg:border-l border-black/[0.08] bg-[#FAF8F6] p-6 overflow-y-auto space-y-5 shrink-0">
            
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#981132]">Verified Digital ID</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-bold border border-emerald-200">
                ACTIVE 2026/27
              </span>
            </div>

            {/* Digital ID Card Preview */}
            <div className="w-full bg-gradient-to-br from-[#1E1B4B] via-[#0F1624] to-[#312E81] rounded-2xl p-5 text-white shadow-xl border border-white/20 relative overflow-hidden">
              {/* Decorative glows */}
              <div className="absolute top-0 right-0 h-32 w-32 bg-[#D91B5C]/25 rounded-full blur-xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 h-28 w-28 bg-[#4338CA]/30 rounded-full blur-xl pointer-events-none" />

              {/* ID Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-[#D91B5C] to-[#D4A520] flex items-center justify-center font-black text-white text-[10px] shadow-sm">
                    9126
                  </div>
                  <div>
                    <div className="text-[11px] font-black tracking-wider text-white">ROTARACT D9126</div>
                    <div className="text-[8px] text-[#D91B5C] font-semibold">NIGERIA · CHARTERED</div>
                  </div>
                </div>
                <Award className="h-5 w-5 text-[#D4A520]" />
              </div>

              {/* Member Profile Block */}
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?w=80&h=80&fit=crop&auto=format"
                  alt="Tunde"
                  className="h-14 w-14 rounded-xl object-cover border border-[#D91B5C] shadow-md shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-black text-white truncate">Tunde Adeyemi</h3>
                  <p className="text-[10px] text-[#D4A520] font-semibold truncate">Co-DRR & Lead Architect</p>
                  <div className="mt-0.5 flex items-center gap-1 text-[9.5px] text-slate-300">
                    <Building2 className="h-2.5 w-2.5 text-slate-400" />
                    <span className="truncate">RC Ibadan Central</span>
                  </div>
                  <div className="flex items-center gap-1 text-[9.5px] text-slate-400">
                    <MapPin className="h-2.5 w-2.5 text-[#D91B5C]" />
                    <span>Oyo State · South-West</span>
                  </div>
                </div>
              </div>

              {/* Verified QR + Rotary ID Details */}
              <div className="flex items-center justify-between bg-black/40 rounded-xl p-3 border border-white/10 relative z-10">
                <div>
                  <div className="text-[8px] uppercase font-bold text-slate-400">Rotary Member ID</div>
                  <div className="text-xs font-mono font-bold text-white tracking-widest">ROT-9126-2026</div>

                  <div className="mt-1 text-[8px] uppercase font-bold text-slate-400">Verification Seal</div>
                  <div className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    <span>District Verified</span>
                  </div>
                </div>

                {qrCodeUrl ? (
                  <div className="p-1 bg-white rounded-lg shadow shrink-0">
                    <img src={qrCodeUrl} alt="Verified Member QR Code" className="h-12 w-12 object-contain" />
                  </div>
                ) : (
                  <div className="h-12 w-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <QrCode className="h-6 w-6 text-slate-500" />
                  </div>
                )}
              </div>

              {/* Security Strip */}
              <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[8px] text-slate-500 relative z-10">
                <span>ROTARY INTERNATIONAL D9126</span>
                <span className="font-mono">TLS 1.3 · VERIFIED</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <button className="py-2.5 px-3 rounded-xl bg-white border border-black/[0.08] hover:bg-gray-50 text-[#1C1C1E] font-semibold text-[11px] flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer">
                <Download size={12} />
                <span>Save Pass</span>
              </button>
              <button className="py-2.5 px-3 rounded-xl bg-[#981132]/10 border border-[#981132]/25 hover:bg-[#981132]/15 text-[#981132] font-semibold text-[11px] flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer">
                <Share2 size={12} />
                <span>Share ID</span>
              </button>
            </div>

            {/* District Notice Board */}
            <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-sm space-y-3">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-black/40">
                <span>District Notices</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#981132]" />
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-black/[0.02] border border-black/[0.04]">
                  <div className="font-bold text-[#1C1C1E] text-[11.5px]">DISCON 2026 Early Bird Registration</div>
                  <p className="text-[10px] text-black/60 mt-0.5">Early bird clearance ends 31st August. Ensure your club dues are up to date.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-black/[0.02] border border-black/[0.04]">
                  <div className="font-bold text-[#1C1C1E] text-[11.5px]">Quarterly Leadership Training</div>
                  <p className="text-[10px] text-black/60 mt-0.5">Virtual training series begins this Saturday for all chartered club executives.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
