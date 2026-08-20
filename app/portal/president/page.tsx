'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  Download, 
  Search, 
  Filter, 
  ArrowLeft,
  ShieldCheck,
  Star,
  BarChart2,
  DollarSign,
  UserPlus,
  ChevronRight,
  Mail,
  ChevronDown
} from 'lucide-react';

interface MemberRecord {
  id: string;
  name: string;
  email: string;
  role: 'President' | 'Vice President' | 'Secretary' | 'Treasurer' | 'Director' | 'Member';
  attendance: number;
  duesStatus: 'cleared' | 'pending' | 'overdue';
  clearedDate?: string;
  lastActive: string;
  avatar: string;
}

const INITIAL_MEMBERS: MemberRecord[] = [
  {
    id: '1',
    name: 'Sola Adebayo',
    email: 's.adebayo@rotaract9126.org',
    role: 'Vice President',
    attendance: 91,
    duesStatus: 'cleared',
    clearedDate: 'Jul 3',
    lastActive: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1573497161161-c3e73707e25c?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '2',
    name: 'Seun Adegoke',
    email: 's.adegoke@rotaract9126.org',
    role: 'Member',
    attendance: 90,
    duesStatus: 'cleared',
    clearedDate: 'Jul 7',
    lastActive: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1748290880596-2a2c80530bc0?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '3',
    name: 'Folake Adewusi',
    email: 'f.adewusi@rotaract9126.org',
    role: 'Member',
    attendance: 83,
    duesStatus: 'overdue',
    clearedDate: '—',
    lastActive: '3 days ago',
    avatar: 'https://images.unsplash.com/photo-1573497491207-618cc224f243?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '4',
    name: 'Tunde Adeyemi',
    email: 't.adeyemi@rotaract9126.org',
    role: 'President',
    attendance: 97,
    duesStatus: 'cleared',
    clearedDate: 'Jul 1',
    lastActive: 'Today',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '5',
    name: 'Damilola Afolabi',
    email: 'd.afolabi@rotaract9126.org',
    role: 'Member',
    attendance: 87,
    duesStatus: 'cleared',
    clearedDate: 'Jul 9',
    lastActive: '2 days ago',
    avatar: 'https://images.unsplash.com/photo-1592188657297-c6473609bbd2?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '6',
    name: 'Bimbo Ajayi',
    email: 'b.ajayi@rotaract9126.org',
    role: 'Member',
    attendance: 74,
    duesStatus: 'pending',
    clearedDate: '—',
    lastActive: '5 days ago',
    avatar: 'https://images.unsplash.com/photo-1527203561188-dae1bc1a417f?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '7',
    name: 'Gbemisola Awoyemi',
    email: 'g.awoyemi@rotaract9126.org',
    role: 'Director',
    attendance: 84,
    duesStatus: 'pending',
    clearedDate: '—',
    lastActive: '3 days ago',
    avatar: 'https://images.unsplash.com/photo-1609371497456-3a55a205d5eb?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '8',
    name: 'Yetunde Balogun',
    email: 'y.balogun@rotaract9126.org',
    role: 'Director',
    attendance: 93,
    duesStatus: 'cleared',
    clearedDate: 'Jul 4',
    lastActive: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '9',
    name: 'Kayode Faleye',
    email: 'k.faleye@rotaract9126.org',
    role: 'Secretary',
    attendance: 88,
    duesStatus: 'cleared',
    clearedDate: 'Jul 5',
    lastActive: '2 days ago',
    avatar: 'https://images.unsplash.com/photo-1631824925667-28632e135463?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '10',
    name: 'Rotimi Fasanya',
    email: 'r.fasanya@rotaract9126.org',
    role: 'Member',
    attendance: 81,
    duesStatus: 'cleared',
    clearedDate: 'Jul 10',
    lastActive: '4 days ago',
    avatar: 'https://images.unsplash.com/photo-1646658104783-2eec2433c1d1?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '11',
    name: 'Omotola Idowu',
    email: 'o.idowu@rotaract9126.org',
    role: 'Member',
    attendance: 78,
    duesStatus: 'pending',
    clearedDate: '—',
    lastActive: '1 week ago',
    avatar: 'https://images.unsplash.com/photo-1698650427325-d9c575dd6109?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '12',
    name: 'Rasheed Lawal',
    email: 'r.lawal@rotaract9126.org',
    role: 'Member',
    attendance: 68,
    duesStatus: 'overdue',
    clearedDate: '—',
    lastActive: '1 week ago',
    avatar: 'https://images.unsplash.com/photo-1784651989032-b55410f21e52?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '13',
    name: 'Adunola Makinde',
    email: 'a.makinde@rotaract9126.org',
    role: 'Member',
    attendance: 72,
    duesStatus: 'cleared',
    clearedDate: 'Jul 12',
    lastActive: '5 days ago',
    avatar: 'https://images.unsplash.com/photo-1598547461182-45d03f6661e4?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '14',
    name: 'Kemi Ogundimu',
    email: 'k.ogundimu@rotaract9126.org',
    role: 'Member',
    attendance: 65,
    duesStatus: 'pending',
    clearedDate: '—',
    lastActive: '2 weeks ago',
    avatar: 'https://images.unsplash.com/photo-1632765854612-9b02b6ec2b15?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '15',
    name: 'Taiwo Olabisi',
    email: 't.olabisi@rotaract9126.org',
    role: 'Member',
    attendance: 60,
    duesStatus: 'overdue',
    clearedDate: '—',
    lastActive: '2 weeks ago',
    avatar: 'https://images.unsplash.com/photo-1598803784715-34ae74c751a3?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '16',
    name: 'Funmi Olatunde',
    email: 'f.olatunde@rotaract9126.org',
    role: 'Treasurer',
    attendance: 95,
    duesStatus: 'cleared',
    clearedDate: 'Jul 2',
    lastActive: 'Today',
    avatar: 'https://images.unsplash.com/photo-1748290880596-2a2c80530bc0?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '17',
    name: 'Babatunde Olawale',
    email: 'b.olawale@rotaract9126.org',
    role: 'Director',
    attendance: 85,
    duesStatus: 'cleared',
    clearedDate: 'Jul 6',
    lastActive: 'Today',
    avatar: 'https://images.unsplash.com/photo-1617440431587-138ca5c563ec?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '18',
    name: 'Lanre Oyelaran',
    email: 'l.oyelaran@rotaract9126.org',
    role: 'Member',
    attendance: 76,
    duesStatus: 'pending',
    clearedDate: '—',
    lastActive: '3 days ago',
    avatar: 'https://images.unsplash.com/photo-1650490323009-96fc950a959c?w=80&h=80&fit=crop&auto=format'
  }
];

export default function PresidentConsolePage() {
  const [members, setMembers] = useState<MemberRecord[]>(INITIAL_MEMBERS);
  const [activeTab, setActiveTab] = useState<'roster' | 'attendance' | 'finances' | 'pipeline' | 'settings'>('roster');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [duesFilter, setDuesFilter] = useState('all');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  // Toggle single member selection
  const toggleSelectMember = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  // Toggle all members selection
  const toggleSelectAll = () => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(filteredMembers.map((m) => m.id));
    }
  };

  // 1-Click dues clearance toggle
  const toggleDuesStatus = (id: string) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        if (m.duesStatus === 'cleared') {
          return { ...m, duesStatus: 'pending', clearedDate: '—' };
        } else {
          return { ...m, duesStatus: 'cleared', clearedDate: 'Just now' };
        }
      })
    );
  };

  // Filtered members list
  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || m.role === roleFilter;
    const matchesDues = duesFilter === 'all' || m.duesStatus === duesFilter;
    return matchesSearch && matchesRole && matchesDues;
  });

  // Calculate metrics
  const totalCount = members.length;
  const clearedCount = members.filter((m) => m.duesStatus === 'cleared').length;
  const duesClearedPercentage = Math.round((clearedCount / totalCount) * 100);
  const overdueCount = members.filter((m) => m.duesStatus === 'overdue').length;

  return (
    <div className="min-h-screen bg-[#090A0F] text-[#ECEEF5] font-sans relative overflow-x-hidden selection:bg-[#D91B5C] selection:text-white">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[55%] rounded-full bg-[radial-gradient(rgba(67,97,238,0.063)_0%,transparent_70%)] blur-[70px]" />
        <div className="absolute -bottom-[15%] -left-[8%] w-[45%] h-[50%] rounded-full bg-[radial-gradient(rgba(217,27,92,0.035)_0%,transparent_70%)] blur-[70px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.024)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* Sticky Executive Topbar */}
      <header className="sticky top-0 z-50 bg-[#090A0F]/90 backdrop-blur-xl border-b border-white/[0.07] px-7 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <Link className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] text-[#ECEEF5]/70 hover:text-white text-xs font-medium transition-colors shrink-0" href="/portal/dashboard">
            <ArrowLeft size={12}/> Dashboard
          </Link>
          <div className="w-px h-5 bg-white/[0.07] shrink-0" />
          <img
            src="/images/rotaract-logo.png"
            onError={(e) => { e.currentTarget.src = '/images/logo.png'; }}
            alt="Rotaract"
            className="w-7 h-7 object-contain shrink-0"
          />
          <div className="min-w-0 leading-tight">
            <div className="text-sm font-bold text-[#ECEEF5] truncate">
              Management Console
            </div>
            <div className="text-[10px] text-[#ECEEF5]/40 truncate">
              Rotaract Club of Ibadan Central · Tier 2
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F7A81B]/[0.08] border border-[#F7A81B]/20 text-[#F7A81B] text-[10px] font-bold">
            <Star fill="#F7A81B" size={11}/> Club President
          </div>
          <button
            onClick={() => alert('Executive HQ Opened')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#4361EE]/10 hover:bg-[#4361EE]/20 border border-[#4361EE]/25 text-[#4361EE] text-xs font-semibold transition-colors"
          >
            <BarChart2 size={12}/> Executive HQ
          </button>
          <button
            onClick={() => alert('Add Member modal trigger')}
            className="flex items-center pl-4 pr-0 h-9 rounded-full bg-gradient-to-r from-[#D91B5C] to-[#7C3AED] text-white text-xs font-bold shadow-[0_0_20px_rgba(217,27,92,0.25)] hover:opacity-95 transition-all overflow-hidden"
          >
            <span className="mr-3">Add Member</span>
            <span className="w-9 h-9 rounded-full bg-black/30 flex items-center justify-center">
              <ChevronRight size={14} strokeWidth={2.5}/>
            </span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-[1400px] mx-auto px-7 py-6">
        {/* Metric Cards Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {/* Total members */}
          <div className="p-4.5 rounded-2xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-xl shadow-lg">
            <div className="text-[10px] font-semibold text-[#ECEEF5]/40 tracking-wider uppercase mb-2.5">
              Total members
            </div>
            <div className="text-[26px] font-extrabold leading-none bg-gradient-to-r from-[#D91B5C] to-[#7C3AED] bg-clip-text text-transparent">
              {totalCount}
            </div>
            <div className="text-[10px] text-[#ECEEF5]/50 mt-1.5">
              16 active on projects
            </div>
          </div>

          {/* Dues cleared */}
          <div className="p-4.5 rounded-2xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-xl shadow-lg">
            <div className="text-[10px] font-semibold text-[#ECEEF5]/40 tracking-wider uppercase mb-2.5">
              Dues cleared
            </div>
            <div className="text-[26px] font-extrabold leading-none text-[#D91B5C]">
              {duesClearedPercentage}%
            </div>
            <div className="text-[10px] text-[#ECEEF5]/50 mt-1.5">
              {clearedCount} / {totalCount} members
            </div>
          </div>

          {/* Avg attendance */}
          <div className="p-4.5 rounded-2xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-xl shadow-lg">
            <div className="text-[10px] font-semibold text-[#ECEEF5]/40 tracking-wider uppercase mb-2.5">
              Avg attendance
            </div>
            <div className="text-[26px] font-extrabold leading-none text-[#22C55E]">
              82%
            </div>
            <div className="text-[10px] text-[#ECEEF5]/50 mt-1.5">
              Last 8 meetings
            </div>
          </div>

          {/* Overdue payments */}
          <div className="p-4.5 rounded-2xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-xl shadow-lg">
            <div className="text-[10px] font-semibold text-[#ECEEF5]/40 tracking-wider uppercase mb-2.5">
              Overdue payments
            </div>
            <div className="text-[26px] font-extrabold leading-none text-[#EF4444]">
              {overdueCount}
            </div>
            <div className="text-[10px] text-[#ECEEF5]/50 mt-1.5">
              {overdueCount} need follow-up
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/[0.07] mb-5 overflow-x-auto">
          {[
            { id: 'roster', label: 'Member Roster', badge: totalCount },
            { id: 'attendance', label: 'Attendance' },
            { id: 'finances', label: 'Finances', badge: 8 },
            { id: 'pipeline', label: 'Lead Pipeline', badge: 5, dot: true },
            { id: 'settings', label: 'Club Settings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 pt-2.5 pb-0 text-xs font-semibold cursor-pointer transition-colors flex flex-col items-center shrink-0 ${
                activeTab === tab.id
                  ? 'text-[#ECEEF5]'
                  : 'text-[#ECEEF5]/50 hover:text-[#ECEEF5]/80'
              }`}
            >
              <span className="flex items-center gap-2 pb-2.5">
                {tab.dot && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635] inline-block shrink-0" />
                )}
                {tab.label}
                {tab.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      activeTab === tab.id
                        ? 'bg-white/10 text-white'
                        : 'bg-white/[0.06] text-[#ECEEF5]/40'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </span>
              <span
                className={`block h-0.5 rounded-full w-full transition-all duration-300 -mb-px ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#D91B5C] to-[#7C3AED] opacity-100'
                    : 'opacity-0'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Table & Controls Section */}
        {activeTab === 'roster' && (
          <div className="flex flex-col gap-3">
            {/* Filter & Action Controls */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" size={13}/>
                <input
                  type="text"
                  placeholder="Search members…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs text-[#ECEEF5] placeholder-white/30 outline-none focus:border-[#D91B5C] transition-colors"
                />
              </div>

              {/* Role Filter */}
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#0F1624] border border-white/[0.08] text-xs text-[#ECEEF5]/70 outline-none cursor-pointer"
              >
                <option value="all">All Roles</option>
                <option value="President">President</option>
                <option value="Vice President">Vice President</option>
                <option value="Secretary">Secretary</option>
                <option value="Treasurer">Treasurer</option>
                <option value="Director">Director</option>
                <option value="Member">Member</option>
              </select>

              {/* Dues Filter */}
              <select
                value={duesFilter}
                onChange={(e) => setDuesFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#0F1624] border border-white/[0.08] text-xs text-[#ECEEF5]/70 outline-none cursor-pointer"
              >
                <option value="all">All Dues Status</option>
                <option value="cleared">Cleared</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>

              <div className="flex-1" />

              {/* Export CSV */}
              <button
                onClick={() => alert('Exporting Member Roster to CSV…')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] text-[#ECEEF5]/60 hover:text-white text-xs font-medium transition-colors cursor-pointer"
              >
                <Download size={12}/> Export CSV
              </button>
            </div>

            {/* Table Matrix */}
            <div className="rounded-2xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[860px] text-left">
                  <thead>
                    <tr className="border-b border-white/[0.07] bg-[#090A0F]/60 text-[10px] font-semibold text-[#ECEEF5]/30 uppercase tracking-wider">
                      <th className="p-3.5 w-11">
                        <input
                          type="checkbox"
                          checked={
                            selectedMembers.length === filteredMembers.length &&
                            filteredMembers.length > 0
                          }
                          onChange={toggleSelectAll}
                          className="accent-[#D91B5C] w-3.5 h-3.5 cursor-pointer rounded"
                        />
                      </th>
                      <th className="p-3.5 w-[230px]">Member</th>
                      <th className="p-3.5 w-[190px]">Email</th>
                      <th className="p-3.5 w-[170px]">Attendance</th>
                      <th className="p-3.5 w-[190px] text-center">Dues Status</th>
                      <th className="p-3.5 w-[100px] text-center">Cleared on</th>
                      <th className="p-3.5 w-[110px]">Last Active</th>
                      <th className="p-3.5 w-[90px] text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.05] text-xs">
                    {filteredMembers.map((member) => (
                      <tr
                        key={member.id}
                        className="hover:bg-white/[0.02] transition-colors"
                      >
                        {/* Checkbox */}
                        <td className="p-3.5">
                          <input
                            type="checkbox"
                            checked={selectedMembers.includes(member.id)}
                            onChange={() => toggleSelectMember(member.id)}
                            className="accent-[#D91B5C] w-3.5 h-3.5 cursor-pointer rounded"
                          />
                        </td>

                        {/* Member Profile */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full p-0.5 bg-gradient-to-tr from-[#D91B5C] to-[#7C3AED] shrink-0">
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-full h-full rounded-full object-cover object-top"
                              />
                            </div>
                            <div>
                              <div className="font-semibold text-[#ECEEF5]">
                                {member.name}
                              </div>
                              <span
                                className={`inline-block text-[9px] font-bold tracking-wider px-2 py-0.5 rounded ${
                                  member.role === 'President'
                                    ? 'bg-[#D91B5C]/15 text-[#D91B5C]'
                                    : member.role === 'Vice President'
                                    ? 'bg-[#7C3AED]/15 text-[#7C3AED]'
                                    : member.role === 'Treasurer'
                                    ? 'bg-[#F7A81B]/15 text-[#F7A81B]'
                                    : member.role === 'Director'
                                    ? 'bg-[#22C55E]/15 text-[#22C55E]'
                                    : member.role === 'Secretary'
                                    ? 'bg-[#4361EE]/15 text-[#4361EE]'
                                    : 'bg-white/[0.06] text-[#ECEEF5]/60'
                                }`}
                              >
                                {member.role}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="p-3.5 text-[#ECEEF5]/50 text-[11px] truncate">
                          {member.email}
                        </td>

                        {/* Attendance Progress */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="flex-1 h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  member.attendance >= 85
                                    ? 'bg-[#22C55E]'
                                    : 'bg-gradient-to-r from-[#D91B5C] to-[#7C3AED]'
                                }`}
                                style={{ width: `${member.attendance}%` }}
                              />
                            </div>
                            <span
                              className={`text-[11px] font-semibold min-w-[32px] text-right ${
                                member.attendance >= 85
                                  ? 'text-[#22C55E]'
                                  : 'text-[#D91B5C]'
                              }`}
                            >
                              {member.attendance}%
                            </span>
                          </div>
                        </td>

                        {/* 1-Click Dues Status Toggle */}
                        <td className="p-3.5 text-center">
                          <div className="inline-flex items-center gap-2.5">
                            <button
                              type="button"
                              onClick={() => toggleDuesStatus(member.id)}
                              title={
                                member.duesStatus === 'cleared'
                                  ? 'Click to toggle pending'
                                  : 'Click to toggle cleared'
                              }
                              className={`w-11 h-6 rounded-full relative transition-all duration-200 cursor-pointer shrink-0 ${
                                member.duesStatus === 'cleared'
                                  ? 'bg-[#D91B5C] shadow-[0_0_12px_rgba(217,27,92,0.3)]'
                                  : member.duesStatus === 'overdue'
                                  ? 'bg-red-500/20'
                                  : 'bg-white/10'
                              }`}
                            >
                              <div
                                className={`w-4.5 h-4.5 rounded-full bg-white absolute top-0.75 shadow-sm transition-transform duration-200 ${
                                  member.duesStatus === 'cleared'
                                    ? 'translate-x-5.5 left-0.5'
                                    : 'left-0.75'
                                }`}
                              />
                            </button>
                            <span
                              className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-md ${
                                member.duesStatus === 'cleared'
                                  ? 'text-green-400 bg-green-500/10'
                                  : member.duesStatus === 'overdue'
                                  ? 'text-red-400 bg-red-500/15'
                                  : 'text-white/50 bg-white/[0.06]'
                              }`}
                            >
                              {member.duesStatus === 'cleared'
                                ? 'Cleared'
                                : member.duesStatus === 'overdue'
                                ? 'Overdue'
                                : 'Pending'}
                            </span>
                          </div>
                        </td>

                        {/* Cleared Date */}
                        <td className="p-3.5 text-center text-[11px] text-[#22C55E]">
                          {member.clearedDate || '—'}
                        </td>

                        {/* Last Active */}
                        <td className="p-3.5 text-[11px] text-[#ECEEF5]/50">
                          {member.lastActive}
                        </td>

                        {/* Remind Action */}
                        <td className="p-3.5 text-center">
                          {member.duesStatus !== 'cleared' ? (
                            <button
                              onClick={() => alert(`Reminder sent to ${member.name} (${member.email})`)}
                              className="px-2.5 py-1 rounded-lg border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] text-[#ECEEF5]/60 hover:text-white text-[10px] font-semibold transition-colors whitespace-nowrap"
                            >
                              Remind
                            </button>
                          ) : (
                            <span className="text-[10px] text-[#ECEEF5]/20">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="p-3.5 px-4.5 border-t border-white/[0.07] flex items-center justify-between text-[11px] text-[#ECEEF5]/40">
                <span>
                  Showing {filteredMembers.length} of {totalCount} members
                </span>
                <span>
                  {clearedCount} / {totalCount} dues cleared
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Attendance Tab Placeholder */}
        {activeTab === 'attendance' && (
          <div className="p-12 rounded-2xl bg-white/[0.04] border border-white/[0.07] text-center text-sm text-[#ECEEF5]/60">
            Attendance management and meeting register sub-view.
          </div>
        )}

        {/* Finances Tab Placeholder */}
        {activeTab === 'finances' && (
          <div className="p-12 rounded-2xl bg-white/[0.04] border border-white/[0.07] text-center text-sm text-[#ECEEF5]/60">
            Club financial records, quarterly budgets, and payment ledger.
          </div>
        )}

        {/* Lead Pipeline Tab Placeholder */}
        {activeTab === 'pipeline' && (
          <div className="p-12 rounded-2xl bg-white/[0.04] border border-white/[0.07] text-center text-sm text-[#ECEEF5]/60">
            Prospective member applications and induction pipeline.
          </div>
        )}

        {/* Settings Tab Placeholder */}
        {activeTab === 'settings' && (
          <div className="p-12 rounded-2xl bg-white/[0.04] border border-white/[0.07] text-center text-sm text-[#ECEEF5]/60">
            Charter details, committee assignments, and club operational settings.
          </div>
        )}
      </main>
    </div>
  );
}
