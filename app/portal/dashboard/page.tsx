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
  ExternalLink,
  Edit3,
  Trash2,
  Image as ImageIcon,
  X,
  Upload
} from 'lucide-react';
import { 
  getStoredProjects, 
  saveProject, 
  updateProject, 
  deleteProject, 
  subscribeToProjects, 
  ProjectItem 
} from '@/lib/services/projects-service';
import { getCurrentUser, signOutUser } from '@/lib/services/auth-service';
import { 
  getMemberDashboardData, 
  getClubRoster, 
  MemberDashboardState, 
  ClubMemberRecord 
} from '@/lib/services/dashboard-service';

export default function MemberDashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [activeChartTab, setActiveChartTab] = useState<'Events' | 'Projects' | 'Volunteering'>('Events');
  const [memberFilter, setMemberFilter] = useState<'Active' | 'Alumni'>('Active');
  const [eventFilter, setEventFilter] = useState('All');
  const [searchMember, setSearchMember] = useState('');
  const [searchDirectory, setSearchDirectory] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [districtNewsletter, setDistrictNewsletter] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  // Projects CRUD State
  const [dashboardProjects, setDashboardProjects] = useState<ProjectItem[]>([]);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<{
    title: string;
    category: string;
    club: string;
    location: string;
    year: string;
    image: string;
    description: string;
    status: 'In Progress' | 'Completed' | 'Upcoming';
    progress: number;
    statNumber: string;
    statLabel: string;
  }>({
    title: '',
    category: 'Healthcare',
    club: 'Rotaract Club of Ibadan Central',
    location: 'Ibadan, Oyo State',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=900&h=700&fit=crop&auto=format',
    description: '',
    status: 'In Progress',
    progress: 50,
    statNumber: '1,000',
    statLabel: 'Beneficiaries'
  });

  useEffect(() => {
    setDashboardProjects(getStoredProjects());
    const unsubscribe = subscribeToProjects((updated) => {
      setDashboardProjects(updated);
    });
    return unsubscribe;
  }, []);

  // Live User & Dashboard State
  const [currentUser, setCurrentUser] = useState<MemberDashboardState['member']>({
    userId: 'usr-default',
    firstName: 'Tunde',
    lastName: 'Adeyemi',
    email: 't.adeyemi@rotaract9126.org',
    rotaryId: 'ROT-9126-2026',
    clubId: 'club-ibadan-central',
    clubName: 'Rotaract Club of Ibadan Central',
    state: 'Oyo State',
    region: 'South-West',
    role: 'member',
    duesStatus: 'cleared',
    avatarUrl: 'https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?w=80&h=80&fit=crop&auto=format',
    occupation: 'Active Member',
    phoneNumber: '+234 800 123 4567'
  });

  const [metrics, setMetrics] = useState({
    impactPoints: 1240,
    eventsAttended: 12,
    projectsJoined: 4,
    volunteerHours: 24
  });

  const [monthlyData, setMonthlyData] = useState([
    { month: 'Nov', count: 2, height: '18px' },
    { month: 'Dec', count: 3, height: '28px' },
    { month: 'Jan', count: 4, height: '37px' },
    { month: 'Feb', count: 3, height: '28px' },
    { month: 'Mar', count: 5, height: '46px' },
    { month: 'Apr', count: 4, height: '37px' },
    { month: 'May', count: 6, height: '55px' },
    { month: 'Jun', count: 5, height: '46px' },
    { month: 'Jul', count: 12, height: '110px', isCurrent: true },
  ]);

  const [duesRecords, setDuesRecords] = useState<Array<{
    id: string;
    name: string;
    club: string;
    status: 'Cleared' | 'Pending' | 'Defaulted';
    period: string;
    amount?: number;
    avatar: string;
  }>>([
    {
      id: 'PAY-D9126-001',
      name: 'Tunde Adeyemi',
      club: 'RAC Ibadan Central',
      status: 'Cleared',
      period: 'Jan – Jun 2026',
      avatar: 'https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?w=80&h=80&fit=crop&auto=format'
    }
  ]);

  const [directoryMembers, setDirectoryMembers] = useState<ClubMemberRecord[]>([]);

  // Fetch live user and dashboard data on mount
  useEffect(() => {
    const authUser = getCurrentUser();
    const targetUid = authUser?.uid || 'usr-default';

    if (authUser) {
      setCurrentUser(prev => ({
        ...prev,
        userId: authUser.uid,
        firstName: authUser.firstName || prev.firstName,
        lastName: authUser.lastName || prev.lastName,
        email: authUser.email || prev.email,
        role: authUser.role || prev.role,
        duesStatus: authUser.duesStatus || prev.duesStatus,
        occupation: authUser.role === 'club_president' ? 'Club President' : authUser.role === 'district_admin' ? 'District Administrator' : 'Active Member'
      }));
    }

    // Load from Firestore dashboard service
    getMemberDashboardData(targetUid).then((data) => {
      if (data && data.member) {
        setCurrentUser(data.member);
        if (data.metrics) setMetrics(data.metrics);
        if (data.monthlyActivity?.length) setMonthlyData(data.monthlyActivity);
        if (data.duesRecords?.length) setDuesRecords(data.duesRecords);

        // Generate verified QR code with live user data
        const qrData = encodeURIComponent(
          `ROTARACT-9126:VERIFIED|ID:${data.member.rotaryId}|USER:${data.member.firstName.toUpperCase()}-${data.member.lastName.toUpperCase()}|STATUS:${data.member.duesStatus.toUpperCase()}|DISTRICT:9126-NIGERIA`
        );
        setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${qrData}&bgcolor=ffffff&color=080c14&margin=1`);

        // Load live club directory roster
        getClubRoster(data.member.clubId || 'club-ibadan-central').then((roster) => {
          if (roster?.length) setDirectoryMembers(roster);
        });
      }
    });
  }, []);

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

          {/* Management Console CTA (Only accessible to Club Presidents / District Admins) */}
          {(currentUser.role === 'club_president' || currentUser.role === 'district_admin' || currentUser.occupation?.toLowerCase().includes('president')) && (
            <div className="pt-2">
              <Link 
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-[#981132] to-[#7C3AED] text-white text-xs font-semibold shadow-md shadow-[#981132]/30 hover:opacity-95 transition-all" 
                href="/portal/president"
              >
                <LayoutGrid size={14}/>
                {!sidebarCollapsed && <span>President Console</span>}
              </Link>
            </div>
          )}
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
                <div className="text-xs font-bold text-[#1C1C1E] truncate">
                  {currentUser.firstName} {currentUser.lastName}
                </div>
                <div className="text-[9px] text-black/40 truncate">
                  {currentUser.occupation || 'Active Member'}
                </div>
              </div>
            )}
            <div className="relative shrink-0">
              <div className="w-8 h-8 rounded-full p-[1.5px] bg-gradient-to-tr from-[#D91B5C] to-[#A855F7]">
                <img 
                  src={currentUser.avatarUrl} 
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format'; }}
                  alt={currentUser.firstName} 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          <button 
            onClick={async () => {
              await signOutUser();
              window.location.href = '/login';
            }}
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
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl md:text-2xl font-black text-[#1C1C1E] leading-tight">
                Welcome back, {currentUser.firstName} 👋
              </h1>
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                currentUser.role === 'district_admin'
                  ? 'bg-[#981132]/10 text-[#981132] border border-[#981132]/25'
                  : currentUser.role === 'club_president' || currentUser.role === 'president'
                  ? 'bg-[#D4A520]/15 text-[#B8860B] border border-[#D4A520]/30'
                  : 'bg-[#22C55E]/10 text-[#16A34A] border border-[#22C55E]/20'
              }`}>
                {currentUser.role === 'district_admin' ? 'District Admin' : currentUser.role === 'club_president' || currentUser.role === 'president' ? 'Club President' : 'Active Member'}
              </span>
            </div>
            <p className="text-[10px] text-black/40 mt-0.5">
              {currentUser.clubName} · {currentUser.state} · Rotary Year 2026/2027
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
          
          {/* Middle Analytics / Settings / Directory / Dues / Projects / Events / Identity Card Column */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {activeNav === 'Settings' ? (
              /* DEDICATED ACCOUNT SETTINGS VIEW */
              <div className="max-w-[640px] space-y-5 font-sans">
                <div>
                  <div className="text-[9.5px] font-semibold text-black/40 tracking-[0.14em] uppercase mb-1.5 font-sans">
                    Account
                  </div>
                  <h2 className="text-[22px] font-extrabold text-[#1C1C1E] tracking-tight font-sans">
                    Settings
                  </h2>
                </div>

                {/* Profile Information Card */}
                <div className="p-6 rounded-2xl bg-black/[0.024] border border-black/[0.06]">
                  <div className="text-xs font-bold text-[#1C1C1E] mb-5">
                    Profile Information
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* First Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9.5px] font-semibold text-black/40 tracking-wider uppercase">
                        First Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Tunde"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.04] border border-black/[0.08] text-xs text-[#1C1C1E] outline-none focus:border-[#981132] focus:bg-white transition-all font-sans"
                      />
                    </div>

                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9.5px] font-semibold text-black/40 tracking-wider uppercase">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Tunde Adeyemi"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.04] border border-black/[0.08] text-xs text-[#1C1C1E] outline-none focus:border-[#981132] focus:bg-white transition-all font-sans"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9.5px] font-semibold text-black/40 tracking-wider uppercase">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue="t.adeyemi@rotaract9126.org"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.04] border border-black/[0.08] text-xs text-[#1C1C1E] outline-none focus:border-[#981132] focus:bg-white transition-all font-sans"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9.5px] font-semibold text-black/40 tracking-wider uppercase">
                        Phone
                      </label>
                      <input
                        type="tel"
                        defaultValue="+234 800 123 4567"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.04] border border-black/[0.08] text-xs text-[#1C1C1E] outline-none focus:border-[#981132] focus:bg-white transition-all font-sans"
                      />
                    </div>

                    {/* Club (Full Width) */}
                    <div className="sm:col-span-2 flex flex-col gap-1.5">
                      <label className="text-[9.5px] font-semibold text-black/40 tracking-wider uppercase">
                        Club
                      </label>
                      <input
                        type="text"
                        defaultValue="Rotaract Club of Ibadan Central"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.04] border border-black/[0.08] text-xs text-[#1C1C1E] outline-none focus:border-[#981132] focus:bg-white transition-all font-sans"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => alert('Profile settings updated successfully!')}
                    className="px-5 py-2 rounded-xl bg-[#981132] text-white text-xs font-semibold hover:bg-[#A70C43] shadow-[0_0_20px_rgba(152,17,50,0.3)] transition-all cursor-pointer"
                  >
                    Save changes
                  </button>
                </div>

                {/* Notification & Security Toggles Card */}
                <div className="p-6 rounded-2xl bg-black/[0.024] border border-black/[0.06]">
                  <div className="text-xs font-bold text-[#1C1C1E] mb-3">
                    Notifications
                  </div>

                  <div className="divide-y divide-black/[0.06]">
                    {/* Toggle 1: Email Notifications */}
                    <div className="py-3 flex items-center justify-between">
                      <span className="text-xs text-black/70 font-medium">
                        Email notifications
                      </span>
                      <button
                        type="button"
                        onClick={() => setEmailNotifications(!emailNotifications)}
                        className={`w-11 h-6 rounded-full relative transition-colors duration-200 cursor-pointer shrink-0 ${
                          emailNotifications ? 'bg-[#981132]' : 'bg-black/[0.12]'
                        }`}
                      >
                        <div
                          className={`w-4.5 h-4.5 rounded-full bg-white absolute top-0.75 shadow-sm transition-transform duration-200 ${
                            emailNotifications ? 'translate-x-5.5 left-0.5' : 'left-0.75'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Toggle 2: District Newsletter */}
                    <div className="py-3 flex items-center justify-between">
                      <span className="text-xs text-black/70 font-medium">
                        District newsletter
                      </span>
                      <button
                        type="button"
                        onClick={() => setDistrictNewsletter(!districtNewsletter)}
                        className={`w-11 h-6 rounded-full relative transition-colors duration-200 cursor-pointer shrink-0 ${
                          districtNewsletter ? 'bg-[#981132]' : 'bg-black/[0.12]'
                        }`}
                      >
                        <div
                          className={`w-4.5 h-4.5 rounded-full bg-white absolute top-0.75 shadow-sm transition-transform duration-200 ${
                            districtNewsletter ? 'translate-x-5.5 left-0.5' : 'left-0.75'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Toggle 3: Two-Factor Authentication */}
                    <div className="py-3 flex items-center justify-between">
                      <span className="text-xs text-black/70 font-medium">
                        Two-factor authentication
                      </span>
                      <button
                        type="button"
                        onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                        className={`w-11 h-6 rounded-full relative transition-colors duration-200 cursor-pointer shrink-0 ${
                          twoFactorAuth ? 'bg-[#981132]' : 'bg-black/[0.12]'
                        }`}
                      >
                        <div
                          className={`w-4.5 h-4.5 rounded-full bg-white absolute top-0.75 shadow-sm transition-transform duration-200 ${
                            twoFactorAuth ? 'translate-x-5.5 left-0.5' : 'left-0.75'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : activeNav === 'Directory' ? (
              /* DEDICATED CLUB MEMBERS DIRECTORY VIEW */
              <div className="space-y-5 font-sans">
                <div>
                  <div className="text-[9.5px] font-semibold text-black/40 tracking-[0.14em] uppercase mb-1.5 font-sans">
                    Club Members
                  </div>
                  <h2 className="text-[22px] font-extrabold text-[#1C1C1E] tracking-tight font-sans">
                    Directory
                  </h2>
                </div>

                {/* Search Box */}
                <div className="flex items-center gap-2 max-w-[320px] px-3 py-2 rounded-xl bg-black/[0.04] border border-black/[0.08]">
                  <Search className="text-black/40 shrink-0" size={13}/>
                  <input
                    type="text"
                    placeholder="Search members..."
                    value={searchDirectory}
                    onChange={(e) => setSearchDirectory(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-[11px] text-[#1C1C1E] placeholder-black/40 font-sans"
                  />
                </div>

                {/* Responsive Members Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {(directoryMembers.length > 0
                    ? directoryMembers.map(m => ({
                        id: m.userId,
                        name: `${m.firstName} ${m.lastName}`.trim() || 'District Member',
                        club: currentUser.clubName,
                        status: m.duesStatus === 'cleared' ? 'Cleared' : 'Pending',
                        statusStyle: m.duesStatus === 'cleared'
                          ? 'text-green-700 bg-green-500/[0.08] border-green-500/[0.16]'
                          : 'text-black/60 bg-black/[0.04] border-black/[0.08]',
                        avatar: m.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format'
                      }))
                    : [
                        {
                          id: currentUser.userId,
                          name: `${currentUser.firstName} ${currentUser.lastName}`.trim(),
                          club: currentUser.clubName,
                          status: currentUser.duesStatus === 'cleared' ? 'Cleared' : 'Pending',
                          statusStyle: currentUser.duesStatus === 'cleared'
                            ? 'text-green-700 bg-green-500/[0.08] border-green-500/[0.16]'
                            : 'text-black/60 bg-black/[0.04] border-black/[0.08]',
                          avatar: currentUser.avatarUrl
                        }
                      ]
                  )
                    .filter(m => 
                      m.name.toLowerCase().includes(searchDirectory.toLowerCase()) || 
                      m.club.toLowerCase().includes(searchDirectory.toLowerCase())
                    )
                    .map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-black/[0.024] border border-black/[0.06] hover:border-black/[0.12] transition-colors"
                    >
                      <img
                        src={member.avatar}
                        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format'; }}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover shrink-0 border-[1.5px] border-black/[0.08]"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-[#1C1C1E] truncate">
                          {member.name}
                        </div>
                        <div className="text-[10px] text-black/40 truncate mt-0.5">
                          {member.club}
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-semibold shrink-0 border ${member.statusStyle}`}>
                        {member.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : activeNav === 'Dues & Payments' ? (
              /* DEDICATED DUES & PAYMENTS VIEW */
              <div className="space-y-5 font-sans">
                <div>
                  <div className="text-[9.5px] font-semibold text-black/40 tracking-[0.14em] uppercase mb-1.5 font-sans">
                    Financials
                  </div>
                  <h2 className="text-[22px] font-extrabold text-[#1C1C1E] tracking-tight font-sans">
                    Dues & Payments
                  </h2>
                </div>

                {/* 3-Card Financial Summary Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Current Status */}
                  <div className={`p-4 rounded-2xl flex flex-col justify-between ${
                    currentUser.duesStatus === 'cleared'
                      ? 'bg-green-500/[0.03] border border-green-500/[0.14]'
                      : 'bg-amber-500/[0.03] border border-amber-500/[0.14]'
                  }`}>
                    <div className="text-[9px] font-semibold text-black/40 tracking-wider uppercase mb-2">
                      Current Status
                    </div>
                    <div className={`text-[22px] font-extrabold leading-none ${
                      currentUser.duesStatus === 'cleared' ? 'text-green-600' : 'text-amber-600'
                    }`}>
                      {currentUser.duesStatus === 'cleared' ? 'Cleared' : 'Pending'}
                    </div>
                    <div className={`text-[10px] mt-2 font-medium ${
                      currentUser.duesStatus === 'cleared' ? 'text-green-700/80' : 'text-amber-700/80'
                    }`}>
                      {currentUser.duesStatus === 'cleared' ? 'Rotary Year 2026/2027' : 'Payment Required'}
                    </div>
                  </div>

                  {/* Next Due */}
                  <div className="p-4 rounded-2xl bg-black/[0.024] border border-black/[0.06] flex flex-col justify-between">
                    <div className="text-[9px] font-semibold text-black/40 tracking-wider uppercase mb-2">
                      District Dues
                    </div>
                    <div className="text-[22px] font-extrabold text-[#D4A520] leading-none">
                      ₦7,500
                    </div>
                    <div className="text-[10px] text-black/40 mt-2">
                      Annual District Assessment
                    </div>
                  </div>

                  {/* Consecutive Terms */}
                  <div className="p-4 rounded-2xl bg-black/[0.024] border border-black/[0.06] flex flex-col justify-between">
                    <div className="text-[9px] font-semibold text-black/40 tracking-wider uppercase mb-2">
                      Verification Level
                    </div>
                    <div className="text-[22px] font-extrabold text-[#981132] leading-none">
                      Tier 1
                    </div>
                    <div className="text-[10px] text-black/40 mt-2">
                      District 9126 Verified
                    </div>
                  </div>
                </div>

                {/* Payment History Ledger Table */}
                <div className="rounded-2xl bg-black/[0.024] border border-black/[0.06] shadow-sm overflow-hidden">
                  {/* Table Header Row */}
                  <div className="p-4 border-b border-black/[0.06] flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1C1C1E]">
                      Payment History
                    </span>
                    <button 
                      onClick={() => alert('Exporting Payment Receipts…')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/[0.04] border border-black/[0.08] text-[11px] text-black/70 hover:bg-black/[0.08] transition-colors cursor-pointer"
                    >
                      <Download size={12}/> Export
                    </button>
                  </div>

                  {/* Grid Table */}
                  <div className="overflow-x-auto">
                    <div className="min-w-[560px]">
                      {/* Column Titles */}
                      <div className="grid grid-cols-[1.4fr_1fr_0.8fr_1fr_1fr] px-4 py-2 border-b border-black/[0.06] text-[9px] font-bold text-black/40 uppercase tracking-wider">
                        <span>Reference</span>
                        <span>Period</span>
                        <span>Amount</span>
                        <span>Status</span>
                        <span>Club</span>
                      </div>

                      {/* Rows */}
                      <div className="divide-y divide-black/[0.04]">
                        {duesRecords.map((row) => (
                          <div 
                            key={row.id}
                            className="grid grid-cols-[1.4fr_1fr_0.8fr_1fr_1fr] items-center px-4 py-3 text-xs hover:bg-black/[0.02] transition-colors"
                          >
                            <span className="font-mono text-[10px] text-black/40">
                              {row.id}
                            </span>
                            <span className="text-[11px] text-black/60">
                              {row.period}
                            </span>
                            <span className="font-bold text-[#1C1C1E]">
                              ₦{row.amount ? row.amount.toLocaleString() : '7,500'}
                            </span>
                            <div>
                              <span className={`inline-block text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                                row.status === 'Cleared'
                                  ? 'text-green-700 bg-green-50 border border-green-200'
                                  : 'text-amber-700 bg-amber-50 border border-amber-200'
                              }`}>
                                {row.status}
                              </span>
                            </div>
                            <div>
                              <div className="text-[11px] text-black/60">{row.club}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : activeNav === 'Projects' ? (
              /* DEDICATED PROJECTS INVOLVEMENT & UPLOAD CRUD VIEW */
              <div className="space-y-5 font-sans">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[9.5px] font-semibold text-black/40 tracking-[0.14em] uppercase mb-1 font-sans">
                      District & Club Initiatives
                    </div>
                    <h2 className="text-[22px] font-extrabold text-[#1C1C1E] tracking-tight font-sans">
                      Projects Management
                    </h2>
                  </div>

                  {/* Upload Project Action Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProjectId(null);
                      setProjectForm({
                        title: '',
                        category: 'Healthcare',
                        club: 'Rotaract Club of Ibadan Central',
                        location: 'Ibadan, Oyo State',
                        year: '2026',
                        image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=900&h=700&fit=crop&auto=format',
                        description: '',
                        status: 'In Progress',
                        progress: 50,
                        statNumber: '1,000',
                        statLabel: 'Beneficiaries'
                      });
                      setIsProjectModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#981132] text-white text-xs font-bold hover:bg-[#7D0E29] transition-all shadow-md shadow-[#981132]/25 cursor-pointer shrink-0"
                  >
                    <Plus size={15} />
                    <span>Upload New Project</span>
                  </button>
                </div>

                {/* Project Cards List */}
                <div className="flex flex-col gap-3.5">
                  {dashboardProjects.length === 0 ? (
                    <div className="text-center py-12 p-6 rounded-2xl bg-black/[0.024] border border-black/[0.06]">
                      <p className="text-xs text-black/50">No projects uploaded yet.</p>
                    </div>
                  ) : (
                    dashboardProjects.map((p) => {
                      const isComplete = p.status === 'Completed' || p.progress === 100;
                      const statusColor = isComplete 
                        ? 'text-green-700 bg-green-50 border-green-200'
                        : p.status === 'Upcoming'
                        ? 'text-amber-700 bg-amber-50 border-amber-200'
                        : 'text-[#981132] bg-[#981132]/[0.08] border-[#981132]/20';
                      const barColor = isComplete ? 'bg-green-600' : p.status === 'Upcoming' ? 'bg-amber-500' : 'bg-[#981132]';

                      return (
                        <div 
                          key={p.id}
                          className="p-5 rounded-2xl bg-white border border-black/[0.08] hover:border-black/[0.15] transition-all shadow-sm hover:shadow-md"
                        >
                          <div className="flex flex-col sm:flex-row gap-4">
                            {/* Project Photo Preview */}
                            <div className="w-full sm:w-28 sm:h-24 h-36 rounded-xl overflow-hidden shrink-0 border border-black/10 relative bg-black/5">
                              <img 
                                src={p.image} 
                                alt={p.title}
                                className="w-full h-full object-cover"
                              />
                              <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-black/70 text-white backdrop-blur-sm">
                                {p.category}
                              </span>
                            </div>

                            {/* Project Information */}
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                              <div>
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <div className="text-sm font-bold text-[#1C1C1E] truncate">
                                    {p.title}
                                  </div>
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-semibold border ${statusColor} shrink-0`}>
                                    {p.status}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 text-[10px] text-black/50 mb-1.5 flex-wrap">
                                  <span className="font-semibold text-black/70">{p.club}</span>
                                  <span className="w-1 h-1 rounded-full bg-black/20" />
                                  <span>{p.location}</span>
                                  <span className="w-1 h-1 rounded-full bg-black/20" />
                                  <span>{p.year}</span>
                                </div>

                                {p.description && (
                                  <p className="text-xs text-black/60 line-clamp-2 mb-2 font-sans">
                                    {p.description}
                                  </p>
                                )}
                              </div>

                              {/* Progress & Stat Row */}
                              <div className="pt-2 border-t border-black/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="flex-1 max-w-xs">
                                  <div className="flex justify-between text-[9px] mb-1">
                                    <span className="text-black/40">Execution Progress</span>
                                    <span className="font-semibold text-black/80">{p.progress}%</span>
                                  </div>
                                  <div className="h-1.5 w-full rounded-full bg-black/[0.06] overflow-hidden">
                                    <div 
                                      className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                                      style={{ width: `${p.progress}%` }}
                                    />
                                  </div>
                                </div>

                                {/* Actions: Edit & Delete */}
                                <div className="flex items-center gap-2 shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingProjectId(p.id);
                                      setProjectForm({
                                        title: p.title,
                                        category: p.category,
                                        club: p.club,
                                        location: p.location,
                                        year: p.year,
                                        image: p.image,
                                        description: p.description || '',
                                        status: p.status,
                                        progress: p.progress,
                                        statNumber: p.statNumber || '1,000',
                                        statLabel: p.statLabel || 'Beneficiaries'
                                      });
                                      setIsProjectModalOpen(true);
                                    }}
                                    className="p-1.5 rounded-lg border border-black/10 hover:bg-black/5 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                                  >
                                    <Edit3 size={13} />
                                    <span>Edit</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (confirm(`Are you sure you want to delete "${p.title}"? This will remove it from the public homepage and projects page.`)) {
                                        deleteProject(p.id);
                                      }
                                    }}
                                    className="p-1.5 rounded-lg border border-red-200 bg-red-50/50 hover:bg-red-100 text-red-700 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                                  >
                                    <Trash2 size={13} />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Upload & Edit Modal Dialog */}
                {isProjectModalOpen && (
                  <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
                    <div 
                      className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                      onClick={() => setIsProjectModalOpen(false)}
                    />

                    <div className="relative w-full max-w-lg bg-white rounded-3xl border border-black/10 shadow-2xl p-6 sm:p-7 z-10 max-h-[90vh] overflow-y-auto font-sans">
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-black/[0.08]">
                        <div>
                          <div className="text-[9.5px] font-bold uppercase tracking-wider text-[#981132]">
                            Project Management
                          </div>
                          <h3 className="text-lg font-black text-[#1C1C1E]">
                            {editingProjectId ? 'Edit Project' : 'Upload & Save Project'}
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsProjectModalOpen(false)}
                          className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-slate-600 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>

                      {/* Project Form Fields */}
                      <div className="space-y-4 text-xs">
                        {/* Title */}
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold uppercase text-black/50">Project Title *</label>
                          <input
                            type="text"
                            placeholder="e.g. Operation Vaccinate 500"
                            value={projectForm.title}
                            onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.03] border border-black/10 outline-none focus:border-[#981132] focus:bg-white transition-all text-xs"
                          />
                        </div>

                        {/* Category & Status Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase text-black/50">Category</label>
                            <select
                              value={projectForm.category}
                              onChange={(e) => setProjectForm(prev => ({ ...prev, category: e.target.value }))}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.03] border border-black/10 outline-none focus:border-[#981132] focus:bg-white transition-all text-xs cursor-pointer"
                            >
                              <option value="Healthcare">Healthcare</option>
                              <option value="WASH">WASH (Water & Sanitation)</option>
                              <option value="Education">Education & Literacy</option>
                              <option value="Environment">Environment</option>
                              <option value="Food Security">Food Security</option>
                              <option value="Empowerment">Youth Empowerment</option>
                            </select>
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase text-black/50">Status</label>
                            <select
                              value={projectForm.status}
                              onChange={(e) => setProjectForm(prev => ({ ...prev, status: e.target.value as any }))}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.03] border border-black/10 outline-none focus:border-[#981132] focus:bg-white transition-all text-xs cursor-pointer"
                            >
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                              <option value="Upcoming">Upcoming</option>
                            </select>
                          </div>
                        </div>

                        {/* Club & Location Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase text-black/50">Organizing Club</label>
                            <input
                              type="text"
                              value={projectForm.club}
                              onChange={(e) => setProjectForm(prev => ({ ...prev, club: e.target.value }))}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.03] border border-black/10 outline-none focus:border-[#981132] focus:bg-white transition-all text-xs"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase text-black/50">Location / State</label>
                            <input
                              type="text"
                              value={projectForm.location}
                              onChange={(e) => setProjectForm(prev => ({ ...prev, location: e.target.value }))}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.03] border border-black/10 outline-none focus:border-[#981132] focus:bg-white transition-all text-xs"
                            />
                          </div>
                        </div>

                        {/* Progress % Slider */}
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <label className="text-[10px] font-bold uppercase text-black/50">Progress (%)</label>
                            <span className="font-bold text-[#981132]">{projectForm.progress}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={projectForm.progress}
                            onChange={(e) => setProjectForm(prev => ({ ...prev, progress: Number(e.target.value) }))}
                            className="w-full accent-[#981132] cursor-pointer"
                          />
                        </div>

                        {/* Photo / Image URL */}
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold uppercase text-black/50">Cover Photo URL</label>
                          <input
                            type="url"
                            placeholder="https://..."
                            value={projectForm.image}
                            onChange={(e) => setProjectForm(prev => ({ ...prev, image: e.target.value }))}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.03] border border-black/10 outline-none focus:border-[#981132] focus:bg-white transition-all text-xs"
                          />
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold uppercase text-black/50">Project Description</label>
                          <textarea
                            rows={3}
                            placeholder="Briefly describe the impact, target beneficiaries, and community milestone..."
                            value={projectForm.description}
                            onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.03] border border-black/10 outline-none focus:border-[#981132] focus:bg-white transition-all text-xs font-sans resize-none"
                          />
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-2 flex items-center justify-end gap-3 border-t border-black/[0.08]">
                          <button
                            type="button"
                            onClick={() => setIsProjectModalOpen(false)}
                            className="px-4 py-2 rounded-xl bg-black/5 hover:bg-black/10 text-slate-700 font-semibold text-xs transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (!projectForm.title.trim()) {
                                alert('Please enter a project title.');
                                return;
                              }
                              if (editingProjectId) {
                                updateProject(editingProjectId, projectForm);
                              } else {
                                saveProject(projectForm);
                              }
                              setIsProjectModalOpen(false);
                            }}
                            className="px-5 py-2 rounded-xl bg-[#981132] text-white font-bold text-xs hover:bg-[#7D0E29] transition-colors shadow-md shadow-[#981132]/30"
                          >
                            {editingProjectId ? 'Save Changes' : 'Publish Project'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : activeNav === 'Events' ? (
              /* DEDICATED EVENTS & MEETINGS VIEW */
              <div className="space-y-5 font-sans">
                <div>
                  <div className="text-[9.5px] font-semibold text-black/40 tracking-[0.14em] uppercase mb-1.5 font-sans">
                    Schedule
                  </div>
                  <h2 className="text-[22px] font-extrabold text-[#1C1C1E] tracking-tight font-sans">
                    Events & Meetings
                  </h2>
                </div>

                {/* Filter Pills */}
                <div className="flex gap-1.5 flex-wrap font-sans">
                  {['All', 'Club', 'District', 'Community'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setEventFilter(cat)}
                      className={`px-3.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                        eventFilter === cat
                          ? 'bg-[#981132] border border-[#981132]/40 text-white shadow-sm'
                          : 'bg-black/[0.04] border border-black/[0.08] text-black/60 hover:bg-black/[0.08]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Event Row Cards */}
                <div className="flex flex-col gap-2.5">
                  {[
                    {
                      id: 'E1',
                      title: 'District Leadership Summit',
                      venue: 'Kakanfo Inn, Ibadan',
                      date: 'Aug 5, 2026',
                      time: '9:00 AM',
                      category: 'District',
                      tagColor: 'rgb(152, 17, 50)',
                      tagBg: 'rgba(152, 17, 50, 0.08)',
                      tagBorder: 'rgba(152, 17, 50, 0.157)',
                      isRegistered: true,
                      actionType: 'registered'
                    },
                    {
                      id: 'E2',
                      title: 'Ibadan Blood Donation Drive',
                      venue: 'UCH Blood Bank, Ibadan',
                      date: 'Aug 12, 2026',
                      time: '8:00 AM',
                      category: 'Community',
                      tagColor: 'rgb(34, 197, 94)',
                      tagBg: 'rgba(34, 197, 94, 0.08)',
                      tagBorder: 'rgba(34, 197, 94, 0.157)',
                      isRegistered: true,
                      actionType: 'registered'
                    },
                    {
                      id: 'E3',
                      title: 'September Club Meeting',
                      venue: 'Kakanfo Inn, Ibadan',
                      date: 'Sep 6, 2026',
                      time: '6:30 PM',
                      category: 'Club',
                      tagColor: 'rgb(124, 58, 237)',
                      tagBg: 'rgba(124, 58, 237, 0.08)',
                      tagBorder: 'rgba(124, 58, 237, 0.157)',
                      isRegistered: false,
                      actionType: 'register'
                    },
                    {
                      id: 'E4',
                      title: 'STEM Education Workshop',
                      venue: 'University of Ibadan',
                      date: 'Sep 14, 2026',
                      time: '10:00 AM',
                      category: 'Community',
                      tagColor: 'rgb(34, 197, 94)',
                      tagBg: 'rgba(34, 197, 94, 0.08)',
                      tagBorder: 'rgba(34, 197, 94, 0.157)',
                      isRegistered: false,
                      actionType: 'register'
                    },
                    {
                      id: 'E5',
                      title: 'Q3 Dues Deadline',
                      venue: 'Online',
                      date: 'Aug 31, 2026',
                      time: '11:59 PM',
                      category: 'Admin',
                      tagColor: 'rgb(247, 168, 27)',
                      tagBg: 'rgba(247, 168, 27, 0.08)',
                      tagBorder: 'rgba(247, 168, 27, 0.157)',
                      isRegistered: false,
                      actionType: 'pay'
                    },
                    {
                      id: 'E6',
                      title: 'Rotaract Day Celebration',
                      venue: 'Ibadan City Hall',
                      date: 'Oct 1, 2026',
                      time: '10:00 AM',
                      category: 'District',
                      tagColor: 'rgb(152, 17, 50)',
                      tagBg: 'rgba(152, 17, 50, 0.08)',
                      tagBorder: 'rgba(152, 17, 50, 0.157)',
                      isRegistered: false,
                      actionType: 'register'
                    }
                  ]
                    .filter(ev => eventFilter === 'All' || ev.category === eventFilter)
                    .map((ev) => (
                    <div 
                      key={ev.id}
                      className="grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr_auto] items-center gap-3 sm:gap-4 p-4 rounded-2xl bg-black/[0.024] border border-black/[0.06] hover:border-black/[0.12] transition-colors"
                    >
                      {/* Title & Venue with Indicator Dot */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: ev.tagBg, border: `1px solid ${ev.tagBorder}` }}
                        >
                          <div 
                            className="w-2.5 h-2.5 rounded-full" 
                            style={{ background: ev.tagColor, boxShadow: `0 0 8px ${ev.tagColor}` }} 
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-semibold text-[#1C1C1E] truncate">
                            {ev.title}
                          </div>
                          <div className="text-[10px] text-black/40 truncate mt-0.5">
                            {ev.venue}
                          </div>
                        </div>
                      </div>

                      {/* Date & Time */}
                      <div>
                        <div className="text-[11px] font-medium text-black/70">
                          {ev.date}
                        </div>
                        <div className="text-[10px] text-black/40">
                          {ev.time}
                        </div>
                      </div>

                      {/* Category Tag */}
                      <div>
                        <span 
                          className="inline-block text-[9.5px] font-semibold px-2.5 py-0.5 rounded-full"
                          style={{ color: ev.tagColor, background: ev.tagBg, border: `1px solid ${ev.tagBorder}` }}
                        >
                          {ev.category}
                        </span>
                      </div>

                      {/* Action Button */}
                      <div className="sm:text-right">
                        {ev.actionType === 'registered' ? (
                          <button 
                            disabled 
                            className="px-3.5 py-1.5 rounded-lg bg-black/[0.04] border border-black/[0.08] text-[11px] text-black/60 whitespace-nowrap cursor-default"
                          >
                            ✓ Registered
                          </button>
                        ) : ev.actionType === 'pay' ? (
                          <button 
                            onClick={() => alert('Redirecting to Dues payment portal…')}
                            className="px-3.5 py-1.5 rounded-lg bg-[#981132] text-white font-bold text-[11px] hover:bg-[#A70C43] shadow-xs whitespace-nowrap transition-all cursor-pointer"
                          >
                            Pay Now
                          </button>
                        ) : (
                          <button 
                            onClick={() => alert(`Registered for ${ev.title}`)}
                            className="px-3.5 py-1.5 rounded-lg bg-black/[0.04] hover:bg-black/[0.08] border border-black/[0.08] text-[11px] text-black/70 font-semibold whitespace-nowrap transition-all cursor-pointer"
                          >
                            Register
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : activeNav === 'Identity Card' ? (
              /* DEDICATED IDENTITY CARD VIEW (max-w-[640px]) */
              <div className="max-w-[640px] space-y-6">
                <div>
                  <div className="text-[9.5px] font-semibold text-black/40 tracking-[0.14em] uppercase mb-1.5 font-sans">
                    Member Identity
                  </div>
                  <h2 className="text-[22px] font-extrabold text-[#1C1C1E] tracking-tight font-sans">
                    Your Identity Card
                  </h2>
                </div>

                {/* Large Credit Card (Aspect Ratio: 1.586 / 1) */}
                <div className="w-full max-w-[420px]">
                  <div 
                    className="w-full rounded-[20px] overflow-hidden relative text-white p-5 md:p-6 flex flex-col justify-between"
                    style={{
                      aspectRatio: '1.586 / 1',
                      background: 'linear-gradient(135deg, rgb(41, 50, 91) 0%, rgb(72, 30, 48) 100%)',
                      boxShadow: 'rgba(255, 255, 255, 0.1) 0px 0px 0px 1px, rgba(255, 255, 255, 0.12) 0px 1px 0px inset, rgba(0, 0, 0, 0.7) 0px 24px 60px'
                    }}
                  >
                    {/* Top Header Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img 
                          src={currentUser.avatarUrl}
                          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format'; }}
                          alt={`${currentUser.firstName} ${currentUser.lastName}`}
                          className="w-9 h-9 rounded-full object-cover border-2 border-white/20"
                        />
                        <div>
                          <div className="text-[13px] font-extrabold text-white leading-tight font-sans">
                            {currentUser.firstName} {currentUser.lastName}
                          </div>
                          <div className="text-[9px] text-white/50 tracking-wider font-sans">
                            {currentUser.occupation || 'Active Member'}
                          </div>
                        </div>
                      </div>

                      <div className={`px-2.5 py-0.5 rounded-md border ${
                        currentUser.duesStatus === 'cleared'
                          ? 'bg-green-500/20 border-green-500/40'
                          : 'bg-amber-500/20 border-amber-500/40'
                      }`}>
                        <span className={`text-[8.5px] font-bold tracking-wider font-sans ${
                          currentUser.duesStatus === 'cleared' ? 'text-green-400' : 'text-amber-400'
                        }`}>
                          {currentUser.duesStatus === 'cleared' ? 'ACTIVE' : 'PENDING'}
                        </span>
                      </div>
                    </div>

                    {/* Masked Card Number */}
                    <div className="font-mono text-base tracking-[0.22em] text-white/65">
                      **** **** **** {currentUser.rotaryId.slice(-4) || '9126'}
                    </div>

                    {/* Bottom Card Row: Club & QR */}
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-[8px] uppercase tracking-wider text-white/35 font-sans mb-0.5">
                          Club
                        </div>
                        <div className="text-[11px] font-semibold text-white font-sans truncate max-w-[210px]">
                          {currentUser.clubName}
                        </div>
                        <div className="text-[9px] text-white/40 font-sans mt-1">
                          Expires 06/27
                        </div>
                      </div>

                      {/* QR Code Container */}
                      <div className="p-1.5 rounded-xl bg-white shadow-[0_4px_14px_rgba(0,0,0,0.5)] shrink-0">
                        {qrCodeUrl ? (
                          <img src={qrCodeUrl} alt="QR Code" className="w-[52px] h-[52px] object-contain" />
                        ) : (
                          <div className="w-[52px] h-[52px] bg-[#1A1D2E] rounded-md flex items-center justify-center text-white text-[8px] font-mono font-bold">
                            QR
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6-Box Member Ledger Grid */}
                <div className="grid grid-cols-2 gap-3 font-sans">
                  <div className="p-3.5 md:p-4 rounded-xl bg-black/[0.024] border border-black/[0.06]">
                    <div className="text-[9px] font-semibold text-black/40 tracking-wider uppercase mb-1">
                      Member ID
                    </div>
                    <div className="text-xs font-semibold text-[#1C1C1E] font-mono">
                      {currentUser.rotaryId}
                    </div>
                  </div>

                  <div className="p-3.5 md:p-4 rounded-xl bg-black/[0.024] border border-black/[0.06]">
                    <div className="text-[9px] font-semibold text-black/40 tracking-wider uppercase mb-1">
                      District Jurisdiction
                    </div>
                    <div className="text-xs font-semibold text-[#1C1C1E]">
                      District 9126 · {currentUser.state}
                    </div>
                  </div>

                  <div className="p-3.5 md:p-4 rounded-xl bg-black/[0.024] border border-black/[0.06]">
                    <div className="text-[9px] font-semibold text-black/40 tracking-wider uppercase mb-1">
                      Club
                    </div>
                    <div className="text-xs font-semibold text-[#1C1C1E] truncate">
                      {currentUser.clubName}
                    </div>
                  </div>

                  <div className="p-3.5 md:p-4 rounded-xl bg-black/[0.024] border border-black/[0.06]">
                    <div className="text-[9px] font-semibold text-black/40 tracking-wider uppercase mb-1">
                      Member Role
                    </div>
                    <div className="text-xs font-semibold text-[#1C1C1E] capitalize">
                      {currentUser.role === 'club_president' ? 'Club President' : currentUser.role}
                    </div>
                  </div>

                  <div className="p-3.5 md:p-4 rounded-xl bg-black/[0.024] border border-black/[0.06]">
                    <div className="text-[9px] font-semibold text-black/40 tracking-wider uppercase mb-1">
                      Dues Status
                    </div>
                    <div className={`text-xs font-semibold ${
                      currentUser.duesStatus === 'cleared' ? 'text-green-700' : 'text-amber-700'
                    }`}>
                      {currentUser.duesStatus === 'cleared' ? 'Cleared (District Good Standing)' : 'Pending Verification'}
                    </div>
                  </div>

                  <div className="p-3.5 md:p-4 rounded-xl bg-black/[0.024] border border-black/[0.06]">
                    <div className="text-[9px] font-semibold text-black/40 tracking-wider uppercase mb-1">
                      Assessment
                    </div>
                    <div className="text-xs font-semibold text-[#1C1C1E]">
                      ₦7,500 / Year
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* 3 Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-black/[0.024] border border-black/[0.06] shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[9px] font-bold text-black/40 uppercase tracking-wider">
                      Impact Points
                      <span className="px-1.5 py-0.5 rounded-full bg-green-50 text-green-600 font-bold border border-green-200">+8%</span>
                    </div>
                    <div className="text-2xl font-black text-[#D4A520] my-2">{metrics.impactPoints.toLocaleString()}</div>
                    <div className="text-[10px] text-black/60">Verified Community Impact</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/[0.024] border border-black/[0.06] shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[9px] font-bold text-black/40 uppercase tracking-wider">
                      Events Attended
                      <span className="px-1.5 py-0.5 rounded-full bg-green-50 text-green-600 font-bold border border-green-200">+33%</span>
                    </div>
                    <div className="text-2xl font-black text-[#D4A520] my-2">{metrics.eventsAttended}</div>
                    <div className="text-[10px] text-black/60">This Rotaract year</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/[0.024] border border-black/[0.06] shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[9px] font-bold text-black/40 uppercase tracking-wider">
                      Projects Joined
                      <span className="px-1.5 py-0.5 rounded-full bg-green-50 text-green-600 font-bold border border-green-200">+1 this month</span>
                    </div>
                    <div className="text-2xl font-black text-[#D4A520] my-2">{metrics.projectsJoined}</div>
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
              </>
            )}
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
                    <span className="truncate">RAC Ibadan Central</span>
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
