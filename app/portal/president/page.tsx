'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  ChevronDown,
  Calendar,
  Layers,
  Settings,
  Phone,
  Check,
  X,
  AlertCircle,
  TrendingUp,
  MapPin,
  Save,
  Plus,
  Lock,
  Sparkles,
  Award,
  Target,
  Briefcase
} from 'lucide-react';
import { getCurrentUser } from '@/lib/services/auth-service';
import {
  getClubRoster,
  addClubMemberRecord,
  updateMemberDuesStatus,
  getClubFinanceLedger,
  DISTRICT_ANNUAL_DUES,
} from '@/lib/services/dashboard-service';
import {
  getProspectLeads,
  submitProspectLead,
  updateProspectLeadStage,
} from '@/lib/services/intake-service';

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

interface ProspectLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  date: string;
  stage: 'intake' | 'orientation' | 'induction_ready';
  notes?: string;
}

interface FinanceTransaction {
  id: string;
  date: string;
  description: string;
  member: string;
  category: 'Annual Dues' | 'Project Levy' | 'Induction Fee' | 'Donation';
  amount: number;
  status: 'Completed' | 'Pending' | 'Remitted';
}

export default function PresidentConsolePage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [currentClubId, setCurrentClubId] = useState<string>('rac-ibadan-ring-road');

  const [members, setMembers] = useState<MemberRecord[]>([]);
  const [finances, setFinances] = useState<FinanceTransaction[]>([]);
  const [activeTab, setActiveTab] = useState<'roster' | 'attendance' | 'finances' | 'pipeline' | 'settings'>('roster');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [duesFilter, setDuesFilter] = useState('all');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  // Modals state
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isExecutiveHqModalOpen, setIsExecutiveHqModalOpen] = useState(false);

  // New Member Form State
  const [newMemberForm, setNewMemberForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Member' as MemberRecord['role'],
    duesStatus: 'cleared' as MemberRecord['duesStatus']
  });

  // Verify President / Admin authorization & load live club data
  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.replace('/login?redirect=/portal/president');
      return;
    }

    const hasPresidentAccess =
      user.role === 'club_president' ||
      user.role === 'district_admin' ||
      (user as any).occupation?.toLowerCase().includes('president');

    setIsAuthorized(hasPresidentAccess);
    setAuthChecked(true);

    if (!hasPresidentAccess) {
      router.replace('/login?error=unauthorized');
      return;
    }

    setCurrentUserId(user.uid);
    const clubId = user.clubId || 'rac-ibadan-ring-road';
    setCurrentClubId(clubId);

    (async () => {
      const rosterRecords = await getClubRoster(clubId);
      const mappedMembers: MemberRecord[] = rosterRecords.map((r) => ({
        id: r.userId,
        name: `${r.firstName} ${r.lastName}`.trim() || r.email,
        email: r.email,
        role:
          r.role === 'president'
            ? 'President'
            : (['Vice President', 'Secretary', 'Treasurer', 'Director'].includes(
                r.occupation || ''
              )
                ? (r.occupation as MemberRecord['role'])
                : 'Member'),
        attendance: r.attendance ?? 100,
        duesStatus: r.duesStatus === 'cleared' ? 'cleared' : 'pending',
        clearedDate: r.clearedDate || (r.duesStatus === 'cleared' ? 'Verified' : ' - '),
        lastActive: r.lastActive || 'Active',
        avatar: r.avatarUrl || '/images/rotaract-logo.png',
      }));
      setMembers(mappedMembers);

      const initialRoll: Record<string, 'present' | 'absent' | 'excused'> = {};
      mappedMembers.forEach((m) => {
        initialRoll[m.id] = 'present';
      });
      setAttendanceRoll(initialRoll);

      const storedLeads = await getProspectLeads(user.clubName);
      setProspects(
        storedLeads.map((l) => ({
          id: l.id,
          name: l.name,
          email: l.email,
          phone: l.phone,
          source: l.source || '/join',
          date: l.date,
          stage: l.stage,
          notes: l.notes,
        }))
      );

      const storedFinances = await getClubFinanceLedger(user.clubName);
      setFinances(
        storedFinances.map((f) => ({
          id: f.id,
          date: f.date,
          description: `${f.category} (${f.period})`,
          member: f.name,
          category: f.category,
          amount: f.amount || DISTRICT_ANNUAL_DUES,
          status: f.status === 'Cleared' ? 'Completed' : 'Pending',
        }))
      );
    })();
  }, [router]);

  // Attendance Tab State
  const [attendanceRoll, setAttendanceRoll] = useState<Record<string, 'present' | 'absent' | 'excused'>>({});

  // Pipeline State
  const [prospects, setProspects] = useState<ProspectLead[]>([]);

  // Settings State
  const [meetingSchedule, setMeetingSchedule] = useState({
    day: '1st & 3rd Sundays of the month',
    time: '4:00 PM - 6:00 PM WAT',
    venue: 'Club Secretariat, District 9126',
    virtualLink: 'https://meet.google.com/rotaract-9126'
  });

  const [executives, setExecutives] = useState<Array<{ role: string; name: string; email: string }>>([]);

  // Handle Add Member submit
  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberForm.name || !newMemberForm.email) {
      alert('Please fill in member name and email');
      return;
    }

    const saved = await addClubMemberRecord({
      name: newMemberForm.name,
      email: newMemberForm.email,
      phone: newMemberForm.phone,
      role: newMemberForm.role,
      duesStatus: newMemberForm.duesStatus === 'cleared' ? 'cleared' : 'pending',
      clubId: currentClubId,
    });

    const newRecord: MemberRecord = {
      id: saved.userId,
      name: `${saved.firstName} ${saved.lastName}`.trim(),
      email: saved.email,
      role: newMemberForm.role,
      attendance: 100,
      duesStatus: newMemberForm.duesStatus,
      clearedDate: newMemberForm.duesStatus === 'cleared' ? 'Today' : ' - ',
      lastActive: 'Just registered',
      avatar: '/images/rotaract-logo.png'
    };

    setMembers(prev => [newRecord, ...prev]);
    setAttendanceRoll(prev => ({ ...prev, [newRecord.id]: 'present' }));
    setIsAddMemberModalOpen(false);
    setNewMemberForm({
      name: '',
      email: '',
      phone: '',
      role: 'Member',
      duesStatus: 'cleared'
    });
  };

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

  // 1-Click dues clearance toggle persisted via dashboard-service
  const toggleDuesStatus = async (id: string) => {
    const target = members.find((m) => m.id === id);
    if (!target) return;
    const nextStatus = target.duesStatus === 'cleared' ? 'pending' : 'cleared';

    setMembers((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        return {
          ...m,
          duesStatus: nextStatus,
          clearedDate: nextStatus === 'cleared' ? 'Just now' : ' - ',
        };
      })
    );

    await updateMemberDuesStatus(id, nextStatus, currentUserId || 'club_president');
  };

  // Advance Prospect Lead Stage persisted via intake-service
  const advanceProspectStage = async (id: string) => {
    const target = prospects.find((p) => p.id === id);
    if (!target) return;
    const nextStage =
      target.stage === 'intake'
        ? 'orientation'
        : target.stage === 'orientation'
        ? 'induction_ready'
        : 'induction_ready';

    setProspects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stage: nextStage } : p))
    );

    await updateProspectLeadStage(id, nextStage);
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

  // Calculate metrics safely when roster is empty
  const totalCount = members.length;
  const clearedCount = members.filter((m) => m.duesStatus === 'cleared').length;
  const duesClearedPercentage = totalCount > 0 ? Math.round((clearedCount / totalCount) * 100) : 0;
  const overdueCount = members.filter((m) => m.duesStatus === 'overdue' || m.duesStatus === 'pending').length;

  const presentAttendeesCount = Object.values(attendanceRoll).filter(v => v === 'present').length;
  const attendanceRatePercentage = totalCount > 0 ? Math.round((presentAttendeesCount / totalCount) * 100) : 0;

  // Loading Screen while verifying session
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#F8F5F2] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#981132] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-black/50">Verifying president authorization...</p>
        </div>
      </div>
    );
  }

  // Access Denied Screen for non-presidents
  if (isAuthorized === false) {
    return (
      <div className="min-h-screen bg-[#F8F5F2] text-[#1C1C1E] font-sans flex items-center justify-center p-6">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-black/[0.08] text-center space-y-5 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-[#EF4444]/10 border border-[#EF4444]/25 text-[#EF4444] flex items-center justify-center mx-auto">
            <Lock size={28} />
          </div>
          <h2 className="text-2xl font-black text-[#1C1C1E]">Access Restricted</h2>
          <p className="text-sm text-black/60 leading-relaxed">
            The <strong>President Management Console</strong> is exclusively accessible to verified <strong>Club Presidents</strong> and District Executive Administrators.
          </p>
          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/portal/dashboard"
              className="w-full py-3 rounded-xl bg-[#981132] hover:bg-[#A70C43] text-white text-xs font-bold transition-all shadow-[0_2px_14px_rgba(152,17,50,0.25)]"
            >
              Return to Member Dashboard
            </Link>
            <Link
              href="/login"
              className="w-full py-3 rounded-xl bg-[#F7F4F3] hover:bg-black/[0.06] text-black/70 hover:text-black text-xs font-semibold transition-colors border border-black/[0.08]"
            >
              Switch Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5F2] text-[#1C1C1E] font-sans relative overflow-x-hidden selection:bg-[#981132] selection:text-white">
      {/* Subtle Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[55%] rounded-full bg-[radial-gradient(rgba(152,17,50,0.03)_0%,transparent_70%)] blur-[70px]" />
        <div className="absolute -bottom-[15%] -left-[8%] w-[45%] h-[50%] rounded-full bg-[radial-gradient(rgba(212,165,32,0.03)_0%,transparent_70%)] blur-[70px]" />
      </div>

      {/* Sticky Executive Topbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-black/[0.08] shadow-xs px-7 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <Link className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F7F4F3] hover:bg-black/[0.06] border border-black/[0.08] text-black/70 hover:text-black text-xs font-medium transition-colors shrink-0" href="/portal/dashboard">
            <ArrowLeft size={12}/> Dashboard
          </Link>
          <div className="w-px h-5 bg-black/[0.08] shrink-0" />
          <img
            src="/images/rotaract-logo.png"
            onError={(e) => { e.currentTarget.src = '/images/logo.png'; }}
            alt="Rotaract"
            className="w-7 h-7 object-contain shrink-0"
          />
          <div className="min-w-0 leading-tight">
            <div className="text-sm font-bold text-[#1C1C1E] truncate">
              Management Console
            </div>
            <div className="text-[10px] text-black/40 truncate">
              Rotaract Club of Ibadan Central  -  Tier 2 Sovereign
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#D4A520]/10 border border-[#D4A520]/25 text-[#B8860B] text-[10px] font-bold">
            <Star fill="#D4A520" size={11}/> Club President
          </div>
          <Link
            href="/portal/executive"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#981132]/10 hover:bg-[#981132]/20 border border-[#981132]/20 text-[#981132] text-xs font-bold transition-colors"
          >
            <BarChart2 size={12} /> Executive HQ
          </Link>
          <button
            onClick={() => setIsAddMemberModalOpen(true)}
            className="flex items-center pl-4 pr-0 h-9 rounded-full bg-[#981132] hover:bg-[#800E2A] text-white text-xs font-bold shadow-[0_2px_14px_rgba(152,17,50,0.25)] hover:opacity-95 transition-all overflow-hidden cursor-pointer"
          >
            <span className="mr-3">Add Member</span>
            <span className="w-9 h-9 rounded-full bg-black/20 flex items-center justify-center">
              <ChevronRight size={14} strokeWidth={2.5}/>
            </span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-[1400px] mx-auto px-7 py-6">
        {/* Metric Cards Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
          {/* Total members */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex flex-col justify-between">
            <div className="text-[11px] font-bold text-black/40 tracking-[0.14em] uppercase mb-3">
              Total members
            </div>
            <div className="text-3xl sm:text-4xl font-black leading-none text-[#981132] my-1">
              {totalCount}
            </div>
            <div className="text-xs text-black/50 mt-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              16 active on projects
            </div>
          </div>

          {/* Dues cleared */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex flex-col justify-between">
            <div className="text-[11px] font-bold text-black/40 tracking-[0.14em] uppercase mb-3">
              Dues cleared
            </div>
            <div className="text-3xl sm:text-4xl font-black leading-none text-[#981132] my-1">
              {duesClearedPercentage}%
            </div>
            <div className="text-xs text-black/50 mt-2">
              {clearedCount} / {totalCount} members cleared
            </div>
          </div>

          {/* Avg attendance */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex flex-col justify-between">
            <div className="text-[11px] font-bold text-black/40 tracking-[0.14em] uppercase mb-3">
              Avg attendance
            </div>
            <div className="text-3xl sm:text-4xl font-black leading-none text-[#22C55E] my-1">
              {attendanceRatePercentage}%
            </div>
            <div className="text-xs text-black/50 mt-2">
              {presentAttendeesCount} present at last meeting
            </div>
          </div>

          {/* Overdue payments */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex flex-col justify-between">
            <div className="text-[11px] font-bold text-black/40 tracking-[0.14em] uppercase mb-3">
              Overdue payments
            </div>
            <div className="text-3xl sm:text-4xl font-black leading-none text-[#EF4444] my-1">
              {overdueCount}
            </div>
            <div className="text-xs text-[#EF4444] mt-2">
              {overdueCount} member{overdueCount === 1 ? '' : 's'} need follow-up
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-black/[0.08] mb-5 overflow-x-auto">
          {[
            { id: 'roster', label: 'Member Roster', badge: totalCount },
            { id: 'attendance', label: 'Attendance' },
            { id: 'finances', label: 'Finances', badge: finances.length },
            { id: 'pipeline', label: 'Lead Pipeline', badge: prospects.length, dot: true },
            { id: 'settings', label: 'Club Settings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 pt-2.5 pb-0 text-xs font-semibold cursor-pointer transition-colors flex flex-col items-center shrink-0 ${
                activeTab === tab.id
                  ? 'text-[#1C1C1E]'
                  : 'text-black/40 hover:text-black/70'
              }`}
            >
              <span className="flex items-center gap-2 pb-2.5">
                {tab.dot && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] inline-block shrink-0" />
                )}
                {tab.label}
                {tab.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      activeTab === tab.id
                        ? 'bg-[#981132]/10 text-[#981132]'
                        : 'bg-black/[0.05] text-black/40'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </span>
              <span
                className={`block h-0.5 rounded-full w-full transition-all duration-300 -mb-px ${
                  activeTab === tab.id
                    ? 'bg-[#981132] opacity-100'
                    : 'opacity-0'
                }`}
              />
            </button>
          ))}
        </div>

        {/* 1. MEMBER ROSTER TAB */}
        {activeTab === 'roster' && (
          <div className="flex flex-col gap-3">
            {/* Filter & Action Controls */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none" size={13}/>
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#F7F4F3] border border-black/[0.08] text-xs text-[#1C1C1E] placeholder-black/40 outline-none focus:border-[#981132] transition-colors"
                />
              </div>

              {/* Role Filter */}
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#F7F4F3] border border-black/[0.08] text-xs text-[#1C1C1E] outline-none cursor-pointer"
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
                className="px-3 py-2 rounded-xl bg-[#F7F4F3] border border-black/[0.08] text-xs text-[#1C1C1E] outline-none cursor-pointer"
              >
                <option value="all">All Dues Status</option>
                <option value="cleared">Cleared</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>

              <div className="flex-1" />

              {/* Export CSV */}
              <button
                onClick={() => alert('Exporting Member Roster to CSV...')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F7F4F3] hover:bg-black/[0.06] border border-black/[0.08] text-black/70 hover:text-black text-xs font-medium transition-colors cursor-pointer"
              >
                <Download size={12}/> Export CSV
              </button>
            </div>

            {/* Table Matrix */}
            <div className="rounded-2xl bg-white border border-black/[0.08] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[860px] text-left">
                  <thead>
                    <tr className="border-b border-black/[0.08] bg-[#F7F4F3] text-[10px] font-bold text-black/50 uppercase tracking-wider">
                      <th className="p-3.5 w-11">
                        <input
                          type="checkbox"
                          checked={
                            selectedMembers.length === filteredMembers.length &&
                            filteredMembers.length > 0
                          }
                          onChange={toggleSelectAll}
                          className="accent-[#981132] w-3.5 h-3.5 cursor-pointer rounded"
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
                  <tbody className="divide-y divide-black/[0.04] text-xs">
                    {filteredMembers.map((member, idx) => (
                      <tr
                        key={member.id}
                        className={`${idx % 2 === 1 ? 'bg-[#F7F4F3]/40' : 'bg-white'} hover:bg-[#981132]/[0.02] transition-colors`}
                      >
                        {/* Checkbox */}
                        <td className="p-3.5">
                          <input
                            type="checkbox"
                            checked={selectedMembers.includes(member.id)}
                            onChange={() => toggleSelectMember(member.id)}
                            className="accent-[#981132] w-3.5 h-3.5 cursor-pointer rounded"
                          />
                        </td>

                        {/* Member Profile */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full p-0.5 bg-gradient-to-tr from-[#981132] to-[#D4A520] shrink-0">
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-full h-full rounded-full object-cover object-top"
                              />
                            </div>
                            <div>
                              <div className="font-bold text-[#1C1C1E]">
                                {member.name}
                              </div>
                              <span
                                className={`inline-block text-[9px] font-bold tracking-wider px-2 py-0.5 rounded ${
                                  member.role === 'President'
                                    ? 'bg-[#981132]/10 text-[#981132]'
                                    : member.role === 'Vice President'
                                    ? 'bg-[#D91B5C]/10 text-[#D91B5C]'
                                    : member.role === 'Treasurer'
                                    ? 'bg-[#D4A520]/15 text-[#B8860B]'
                                    : member.role === 'Director'
                                    ? 'bg-[#22C55E]/15 text-[#15803D]'
                                    : member.role === 'Secretary'
                                    ? 'bg-[#0284C7]/10 text-[#0284C7]'
                                    : 'bg-black/[0.05] text-black/60'
                                }`}
                              >
                                {member.role}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="p-3.5 text-black/60 text-[11px] truncate">
                          {member.email}
                        </td>

                        {/* Attendance Progress */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="flex-1 h-1.5 rounded-full bg-black/[0.08] overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  member.attendance >= 85
                                    ? 'bg-[#22C55E]'
                                    : 'bg-[#981132]'
                                }`}
                                style={{ width: `${member.attendance}%` }}
                              />
                            </div>
                            <span
                              className={`text-[11px] font-bold min-w-[32px] text-right ${
                                member.attendance >= 85
                                  ? 'text-[#22C55E]'
                                  : 'text-[#981132]'
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
                                  ? 'bg-[#981132] shadow-[0_2px_10px_rgba(152,17,50,0.3)]'
                                  : member.duesStatus === 'overdue'
                                  ? 'bg-red-200'
                                  : 'bg-black/15'
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
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md ${
                                member.duesStatus === 'cleared'
                                  ? 'text-green-700 bg-green-50 border border-green-200'
                                  : member.duesStatus === 'overdue'
                                  ? 'text-red-700 bg-red-50 border border-red-200'
                                  : 'text-black/60 bg-black/[0.05]'
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
                        <td className="p-3.5 text-center text-[11px] font-semibold text-[#15803D]">
                          {member.clearedDate || ' - '}
                        </td>

                        {/* Last Active */}
                        <td className="p-3.5 text-[11px] text-black/50">
                          {member.lastActive}
                        </td>

                        {/* Remind Action */}
                        <td className="p-3.5 text-center">
                          {member.duesStatus !== 'cleared' ? (
                            <button
                              onClick={() => alert(`Reminder sent to ${member.name} (${member.email})`)}
                              className="px-2.5 py-1 rounded-lg border border-black/[0.08] bg-[#F7F4F3] hover:bg-black/[0.06] text-black/70 hover:text-black text-[10px] font-bold transition-colors whitespace-nowrap cursor-pointer"
                            >
                              Remind
                            </button>
                          ) : (
                            <span className="text-[10px] text-black/20"> - </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="p-3.5 px-4.5 border-t border-black/[0.08] bg-[#F7F4F3]/50 flex items-center justify-between text-[11px] text-black/50">
                <span>
                  Showing {filteredMembers.length} of {totalCount} members
                </span>
                <span className="font-semibold text-[#981132]">
                  {clearedCount} / {totalCount} dues cleared
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 2. ATTENDANCE & ROLL-CALL TAB */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            {/* Meeting Summary Card */}
            <div className="p-6 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#981132]/10 text-[#981132] border border-[#981132]/20">
                    Active Meeting Session
                  </span>
                  <span className="text-xs text-black/40">Aug 16, 2026</span>
                </div>
                <h3 className="text-lg font-bold text-[#1C1C1E]">
                  General Fellowship: &quot;Digital Leadership in Community Impact&quot;
                </h3>
                <p className="text-xs text-black/60">
                  Venue: Kakanfo Inn & Conference Centre  -  Presiding: Rtr. Tunde Adeyemi
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <div className="text-2xl font-black text-[#22C55E] leading-none">
                    {presentAttendeesCount} / {totalCount}
                  </div>
                  <div className="text-[10px] text-black/40 mt-1 uppercase tracking-wider font-semibold">
                    {attendanceRatePercentage}% Attendance
                  </div>
                </div>
                <button
                  onClick={() => alert('Attendance Roll-Call saved and recorded!')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-xs shadow-[0_2px_10px_rgba(34,197,94,0.3)] transition-all cursor-pointer"
                >
                  <Save size={13} strokeWidth={2.5}/> Save Register
                </button>
              </div>
            </div>

            {/* Quick Roll-Call Table */}
            <div className="rounded-2xl bg-white border border-black/[0.08] shadow-sm overflow-hidden">
              <div className="p-4 border-b border-black/[0.08] bg-[#F7F4F3] flex items-center justify-between">
                <span className="text-xs font-bold text-[#1C1C1E]">
                  Interactive Roll-Call Register
                </span>
                <span className="text-[11px] text-black/50">
                  Mark status for each active club member
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[700px] text-left">
                  <thead>
                    <tr className="border-b border-black/[0.08] bg-[#F7F4F3] text-[10px] font-bold text-black/50 uppercase tracking-wider">
                      <th className="p-3.5 w-[250px]">Member</th>
                      <th className="p-3.5 w-[160px]">Role</th>
                      <th className="p-3.5 w-[140px]">Cumulative Att.</th>
                      <th className="p-3.5 text-center">Mark Attendance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.04] text-xs">
                    {members.map((member, idx) => {
                      const currentStatus = attendanceRoll[member.id] || 'absent';
                      return (
                        <tr key={member.id} className={`${idx % 2 === 1 ? 'bg-[#F7F4F3]/40' : 'bg-white'} hover:bg-black/[0.015] transition-colors`}>
                          <td className="p-3.5">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-8 h-8 rounded-full object-cover shrink-0"
                              />
                              <div>
                                <div className="font-bold text-[#1C1C1E]">{member.name}</div>
                                <div className="text-[10px] text-black/40">{member.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5 text-black/70 text-[11px]">
                            {member.role}
                          </td>
                          <td className="p-3.5">
                            <span className="font-bold text-[#15803D]">{member.attendance}%</span>
                          </td>
                          <td className="p-3.5 text-center">
                            <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-[#F7F4F3] border border-black/[0.08]">
                              <button
                                onClick={() => setAttendanceRoll(prev => ({ ...prev, [member.id]: 'present' }))}
                                className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                  currentStatus === 'present'
                                    ? 'bg-[#22C55E] text-white shadow-xs'
                                    : 'text-black/50 hover:text-black'
                                }`}
                              >
                                Present
                              </button>
                              <button
                                onClick={() => setAttendanceRoll(prev => ({ ...prev, [member.id]: 'excused' }))}
                                className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                  currentStatus === 'excused'
                                    ? 'bg-[#D4A520] text-white shadow-xs'
                                    : 'text-black/50 hover:text-black'
                                }`}
                              >
                                Excused
                              </button>
                              <button
                                onClick={() => setAttendanceRoll(prev => ({ ...prev, [member.id]: 'absent' }))}
                                className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                  currentStatus === 'absent'
                                    ? 'bg-[#EF4444] text-white shadow-xs'
                                    : 'text-black/50 hover:text-black'
                                }`}
                              >
                                Absent
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. CLUB FINANCES & LEDGER TAB */}
        {activeTab === 'finances' && (
          <div className="space-y-6">
            {/* 3 Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-black/[0.08] shadow-sm">
                <div className="text-[10px] font-bold text-black/40 tracking-wider uppercase mb-2">
                  Total Dues Collected
                </div>
                <div className="text-[26px] font-black text-[#22C55E] leading-none">
                  ₦{(clearedCount * DISTRICT_ANNUAL_DUES).toLocaleString()}
                </div>
                <div className="text-[10px] text-black/50 mt-2">
                  {clearedCount} of {totalCount} members cleared
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-black/[0.08] shadow-sm">
                <div className="text-[10px] font-bold text-black/40 tracking-wider uppercase mb-2">
                  Outstanding Dues
                </div>
                <div className="text-[26px] font-black text-[#EF4444] leading-none">
                  ₦{(overdueCount * DISTRICT_ANNUAL_DUES).toLocaleString()}
                </div>
                <div className="text-[10px] text-black/50 mt-2">
                  {overdueCount} pending/overdue accounts
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-black/[0.08] shadow-sm">
                <div className="text-[10px] font-bold text-black/40 tracking-wider uppercase mb-2">
                  District Remittance Status
                </div>
                <div className="text-[18px] font-bold text-[#D4A520] leading-tight flex items-center gap-1.5 mt-1">
                  <ShieldCheck size={18} className="text-[#22C55E] shrink-0" />
                  <span className="text-[#15803D]">Cleared</span>
                </div>
                <div className="text-[10px] text-black/50 mt-2">
                  Remitted to D9126 Secretariat
                </div>
              </div>
            </div>

            {/* Club Ledger Table */}
            <div className="rounded-2xl bg-white border border-black/[0.08] shadow-sm overflow-hidden">
              <div className="p-4 border-b border-black/[0.08] bg-[#F7F4F3] flex items-center justify-between">
                <span className="text-xs font-bold text-[#1C1C1E]">
                  Club Financial Ledger & Receipts
                </span>
                <button
                  onClick={() => alert('Exporting Financial Report to CSV...')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-black/[0.04] border border-black/[0.08] text-black/70 hover:text-black text-xs font-medium transition-colors cursor-pointer"
                >
                  <Download size={12}/> Export CSV
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[760px] text-left">
                  <thead>
                    <tr className="border-b border-black/[0.08] bg-[#F7F4F3] text-[10px] font-bold text-black/50 uppercase tracking-wider">
                      <th className="p-3.5">Txn Reference</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Transaction / Member</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Amount</th>
                      <th className="p-3.5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.04] text-xs">
                    {finances.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-xs text-black/45">
                          No financial transactions recorded yet. Online dues payments will appear here automatically.
                        </td>
                      </tr>
                    ) : (
                      finances.map((txn, idx) => (
                        <tr key={txn.id} className={`${idx % 2 === 1 ? 'bg-[#F7F4F3]/40' : 'bg-white'} hover:bg-black/[0.015] transition-colors`}>
                          <td className="p-3.5 font-mono text-[11px] text-black/50">{txn.id}</td>
                          <td className="p-3.5 text-black/70 text-[11px]">{txn.date}</td>
                          <td className="p-3.5">
                            <div className="font-bold text-[#1C1C1E]">{txn.description}</div>
                            <div className="text-[10px] text-black/50">{txn.member}</div>
                          </td>
                          <td className="p-3.5">
                            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-[#F7F4F3] text-black/70 border border-black/[0.06]">
                              {txn.category}
                            </span>
                          </td>
                          <td className="p-3.5 font-bold text-[#1C1C1E]">
                            ₦{txn.amount.toLocaleString()}
                          </td>
                          <td className="p-3.5 text-center">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              txn.status === 'Completed'
                                ? 'bg-green-50 text-green-700 border border-green-200'
                                : txn.status === 'Remitted'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}>
                              {txn.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. PROSPECT LEAD PIPELINE TAB */}
        {activeTab === 'pipeline' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#1C1C1E]">Membership Induction Pipeline</h3>
                <p className="text-xs text-black/50">Leads captured from the public district portal and referrals</p>
              </div>
              <button
                onClick={async () => {
                  const name = prompt('Enter prospect full name:');
                  if (name && name.trim()) {
                    const cleanName = name.trim();
                    const email = `${cleanName.toLowerCase().replace(/\s+/g, '.')}@rotaract9126.org`;
                    const res = await submitProspectLead({
                      name: cleanName,
                      email,
                      phone: '+234 800 000 0000',
                      state: 'Oyo',
                      preferredClub: currentClubId,
                      source: 'President Portal',
                      notes: 'Added via Club President Console.',
                    });
                    if (res.success && res.lead) {
                      setProspects((prev) => [
                        {
                          id: res.lead!.id,
                          name: res.lead!.name,
                          email: res.lead!.email,
                          phone: res.lead!.phone,
                          source: res.lead!.source,
                          date: res.lead!.date,
                          stage: res.lead!.stage,
                          notes: res.lead!.notes,
                        },
                        ...prev,
                      ]);
                    }
                  }
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#981132] hover:bg-[#800E2A] text-white text-xs font-bold transition-all cursor-pointer shadow-[0_2px_14px_rgba(152,17,50,0.25)]"
              >
                <Plus size={13}/> Add Prospect
              </button>
            </div>

            {/* 3-Column Kanban Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Column 1: Intake Review */}
              <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between pb-2 border-b border-black/[0.08]">
                  <span className="text-xs font-bold text-[#1C1C1E] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    1. Intake Review
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F7F4F3] text-black/60">
                    {prospects.filter(p => p.stage === 'intake').length}
                  </span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto">
                  {prospects.filter(p => p.stage === 'intake').map((lead) => (
                    <div key={lead.id} className="p-3.5 rounded-xl bg-[#F7F4F3] border border-black/[0.06] hover:border-black/[0.12] transition-all space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-bold text-xs text-[#1C1C1E]">{lead.name}</div>
                        <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-white text-black/60 border border-black/[0.06]">{lead.source}</span>
                      </div>
                      <div className="text-[11px] text-black/60 space-y-0.5">
                        <div className="flex items-center gap-1.5"><Mail size={10} className="text-black/40"/> {lead.email}</div>
                        <div className="flex items-center gap-1.5"><Phone size={10} className="text-black/40"/> {lead.phone}</div>
                      </div>
                      {lead.notes && (
                        <p className="text-[10px] text-black/50 italic bg-white p-2 rounded-lg border border-black/[0.04]">
                          &quot;{lead.notes}&quot;
                        </p>
                      )}
                      <div className="pt-1 flex items-center justify-between">
                        <span className="text-[9px] text-black/40">{lead.date}</span>
                        <button
                          onClick={() => advanceProspectStage(lead.id)}
                          className="px-2.5 py-1 rounded-lg bg-[#981132]/10 hover:bg-[#981132]/20 border border-[#981132]/20 text-[#981132] text-[10px] font-bold transition-colors cursor-pointer"
                        >
                          Start Orientation &rarr;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: In Orientation */}
              <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between pb-2 border-b border-black/[0.08]">
                  <span className="text-xs font-bold text-[#1C1C1E] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D4A520]" />
                    2. In Orientation
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F7F4F3] text-black/60">
                    {prospects.filter(p => p.stage === 'orientation').length}
                  </span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto">
                  {prospects.filter(p => p.stage === 'orientation').map((lead) => (
                    <div key={lead.id} className="p-3.5 rounded-xl bg-[#F7F4F3] border border-black/[0.06] hover:border-black/[0.12] transition-all space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-bold text-xs text-[#1C1C1E]">{lead.name}</div>
                        <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#D4A520]/15 text-[#B8860B]">{lead.source}</span>
                      </div>
                      <div className="text-[11px] text-black/60 space-y-0.5">
                        <div className="flex items-center gap-1.5"><Mail size={10} className="text-black/40"/> {lead.email}</div>
                        <div className="flex items-center gap-1.5"><Phone size={10} className="text-black/40"/> {lead.phone}</div>
                      </div>
                      {lead.notes && (
                        <p className="text-[10px] text-black/50 italic bg-white p-2 rounded-lg border border-black/[0.04]">
                          &quot;{lead.notes}&quot;
                        </p>
                      )}
                      <div className="pt-1 flex items-center justify-between">
                        <span className="text-[9px] text-black/40">{lead.date}</span>
                        <button
                          onClick={() => advanceProspectStage(lead.id)}
                          className="px-2.5 py-1 rounded-lg bg-[#22C55E]/10 hover:bg-[#22C55E]/20 border border-[#22C55E]/30 text-[#15803D] text-[10px] font-bold transition-colors cursor-pointer"
                        >
                          Mark Ready &rarr;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Induction Ready */}
              <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between pb-2 border-b border-black/[0.08]">
                  <span className="text-xs font-bold text-[#1C1C1E] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                    3. Induction Ready
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F7F4F3] text-black/60">
                    {prospects.filter(p => p.stage === 'induction_ready').length}
                  </span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto">
                  {prospects.filter(p => p.stage === 'induction_ready').map((lead) => (
                    <div key={lead.id} className="p-3.5 rounded-xl bg-gradient-to-br from-[#981132]/[0.06] to-transparent border border-[#981132]/20 transition-all space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-bold text-xs text-[#1C1C1E]">{lead.name}</div>
                        <span className="px-2 py-0.5 rounded-full text-[8px] font-bold bg-green-50 text-green-700 border border-green-200">Cleared for Pinning</span>
                      </div>
                      <div className="text-[11px] text-black/60 space-y-0.5">
                        <div className="flex items-center gap-1.5"><Mail size={10} className="text-black/40"/> {lead.email}</div>
                        <div className="flex items-center gap-1.5"><Phone size={10} className="text-black/40"/> {lead.phone}</div>
                      </div>
                      {lead.notes && (
                        <p className="text-[10px] text-black/50 italic bg-white p-2 rounded-lg border border-black/[0.04]">
                          &quot;{lead.notes}&quot;
                        </p>
                      )}
                      <div className="pt-1 flex items-center justify-between">
                        <span className="text-[9px] text-black/40">{lead.date}</span>
                        <button
                          onClick={() => alert(`Induction ceremony confirmed for ${lead.name}!`)}
                          className="px-3 py-1 rounded-lg bg-[#981132] hover:bg-[#800E2A] text-white text-[10px] font-bold transition-colors cursor-pointer shadow-xs"
                        >
                          Confirm Induction
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. CLUB SETTINGS & GOVERNANCE TAB */}
        {activeTab === 'settings' && (
          <div className="max-w-[900px] space-y-6">
            {/* Schedule Card */}
            <div className="p-6 rounded-2xl bg-white border border-black/[0.08] shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#1C1C1E] flex items-center gap-2">
                <Calendar size={15} className="text-[#981132]" />
                Meeting Schedule & Fellowship Venue
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase text-black/50">Meeting Days</label>
                  <input
                    type="text"
                    value={meetingSchedule.day}
                    onChange={(e) => setMeetingSchedule(prev => ({ ...prev, day: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F4F3] border border-black/[0.08] text-xs text-[#1C1C1E] outline-none focus:border-[#981132] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase text-black/50">Meeting Time</label>
                  <input
                    type="text"
                    value={meetingSchedule.time}
                    onChange={(e) => setMeetingSchedule(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F4F3] border border-black/[0.08] text-xs text-[#1C1C1E] outline-none focus:border-[#981132] transition-all"
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase text-black/50">Physical Venue</label>
                  <input
                    type="text"
                    value={meetingSchedule.venue}
                    onChange={(e) => setMeetingSchedule(prev => ({ ...prev, venue: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F4F3] border border-black/[0.08] text-xs text-[#1C1C1E] outline-none focus:border-[#981132] transition-all"
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase text-black/50">Virtual Google Meet / Zoom Link</label>
                  <input
                    type="url"
                    value={meetingSchedule.virtualLink}
                    onChange={(e) => setMeetingSchedule(prev => ({ ...prev, virtualLink: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F4F3] border border-black/[0.08] text-xs text-[#1C1C1E] outline-none focus:border-[#981132] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Executive Council & Committee Chairs */}
            <div className="p-6 rounded-2xl bg-white border border-black/[0.08] shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#1C1C1E] flex items-center gap-2">
                <Users size={15} className="text-[#981132]" />
                Club Executive Council & Committee Chairs
              </h3>

              <div className="space-y-2.5">
                {executives.map((exec, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#F7F4F3] border border-black/[0.06]">
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#1C1C1E]">{exec.role}</div>
                      <div className="text-[11px] text-black/50">{exec.name}  -  {exec.email}</div>
                    </div>
                    <button
                      onClick={() => {
                        const newName = prompt(`Assign new ${exec.role}:`, exec.name);
                        if (newName) {
                          setExecutives(prev => prev.map((item, i) => i === idx ? { ...item, name: newName } : item));
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-black/[0.05] border border-black/[0.08] text-xs font-semibold text-black/80 hover:text-black transition-colors cursor-pointer self-start sm:self-center"
                    >
                      Reassign
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-black/[0.08] flex justify-end">
                <button
                  onClick={() => alert('Club governance and schedule settings saved successfully!')}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#981132] hover:bg-[#800E2A] text-white text-xs font-bold shadow-[0_2px_14px_rgba(152,17,50,0.25)] transition-all cursor-pointer"
                >
                  <Save size={13}/> Save Club Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ================= ADD MEMBER MODAL ================= */}
      {isAddMemberModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-white border border-black/[0.08] p-6 sm:p-8 shadow-2xl space-y-6 text-[#1C1C1E]">
            <div className="flex items-center justify-between border-b border-black/[0.08] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#981132] text-white shadow-sm">
                  <UserPlus size={18} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#1C1C1E]">Induct New Club Member</h3>
                  <p className="text-[11px] text-black/50">Direct club register roster onboarding</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddMemberModalOpen(false)}
                className="p-2 rounded-full hover:bg-black/[0.05] text-black/40 hover:text-black transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-4 font-sans">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-black/60 mb-1.5 block">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Oladimeji Victor Adeyemi"
                  value={newMemberForm.name}
                  onChange={(e) => setNewMemberForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F7F4F3] border border-black/[0.08] text-xs text-[#1C1C1E] placeholder:text-black/30 outline-none focus:border-[#981132] transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-black/60 mb-1.5 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="v.adeyemi@rotaract9126.org"
                    value={newMemberForm.email}
                    onChange={(e) => setNewMemberForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F7F4F3] border border-black/[0.08] text-xs text-[#1C1C1E] placeholder:text-black/30 outline-none focus:border-[#981132] transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-black/60 mb-1.5 block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={newMemberForm.phone}
                    onChange={(e) => setNewMemberForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F7F4F3] border border-black/[0.08] text-xs text-[#1C1C1E] placeholder:text-black/30 outline-none focus:border-[#981132] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-black/60 mb-1.5 block">
                    Assigned Role
                  </label>
                  <select
                    value={newMemberForm.role}
                    onChange={(e) => setNewMemberForm(prev => ({ ...prev, role: e.target.value as any }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F7F4F3] border border-black/[0.08] text-xs text-[#1C1C1E] outline-none focus:border-[#981132] transition-all"
                  >
                    <option value="Member">General Member</option>
                    <option value="Director">Board Director</option>
                    <option value="Treasurer">Club Treasurer</option>
                    <option value="Secretary">Club Secretary</option>
                    <option value="Vice President">Vice President</option>
                    <option value="President">Club President</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-black/60 mb-1.5 block">
                    Initial Dues Status
                  </label>
                  <select
                    value={newMemberForm.duesStatus}
                    onChange={(e) => setNewMemberForm(prev => ({ ...prev, duesStatus: e.target.value as any }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F7F4F3] border border-black/[0.08] text-xs text-[#1C1C1E] outline-none focus:border-[#981132] transition-all"
                  >
                    <option value="cleared">Cleared (Fully Paid)</option>
                    <option value="pending">Pending Payment</option>
                    <option value="overdue">Overdue / Arrears</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-black/[0.08] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddMemberModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#F7F4F3] hover:bg-black/[0.06] text-black/70 hover:text-black text-xs font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#981132] hover:bg-[#800E2A] text-white text-xs font-bold shadow-[0_2px_14px_rgba(152,17,50,0.25)] transition-all cursor-pointer"
                >
                  <UserPlus size={14} /> Complete Induction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= EXECUTIVE HQ MODAL ================= */}
      {isExecutiveHqModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-black/[0.08] p-6 sm:p-8 shadow-2xl space-y-6 text-[#1C1C1E]">
            <div className="flex items-center justify-between border-b border-black/[0.08] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-[#981132]/10 text-[#981132] border border-[#981132]/20">
                  <BarChart2 size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#1C1C1E] flex items-center gap-2">
                    Executive HQ Strategic Centre
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-[#D4A520]/15 text-[#B8860B] border border-[#D4A520]/30">
                      Tier 2 Sovereign
                    </span>
                  </h3>
                  <p className="text-[11px] text-black/50">Rotaract Club of Ibadan Central  -  District 9126</p>
                </div>
              </div>
              <button
                onClick={() => setIsExecutiveHqModalOpen(false)}
                className="p-2 rounded-full hover:bg-black/[0.05] text-black/40 hover:text-black transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Strategic KPI Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-[#F7F4F3] border border-black/[0.06]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#981132] mb-1">
                  <Award size={14} /> Citation Goal
                </div>
                <div className="text-xl font-black text-[#1C1C1E]">85% Achieved</div>
                <div className="text-[10px] text-black/50 mt-1">17 / 20 District Goals Completed</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F4F3] border border-black/[0.06]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#22C55E] mb-1">
                  <Target size={14} /> Health Outreach
                </div>
                <div className="text-xl font-black text-[#1C1C1E]">₦240,000</div>
                <div className="text-[10px] text-black/50 mt-1">Raised for Maternal Outreach</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F4F3] border border-black/[0.06]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#981132] mb-1">
                  <Briefcase size={14} /> Capitation
                </div>
                <div className="text-xl font-black text-[#1C1C1E]">Q1 Remitted</div>
                <div className="text-[10px] text-black/50 mt-1">District Secretariat Cleared</div>
              </div>
            </div>

            {/* Executive Directives */}
            <div className="p-4.5 rounded-2xl bg-[#F7F4F3] border border-black/[0.06] space-y-2.5">
              <div className="text-xs font-black uppercase tracking-wider text-black/70">
                Presidential Directives & Action Items
              </div>
              <ul className="text-xs text-black/70 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#22C55E] shrink-0" />
                  <span>Verify member ID cards with District Secretariat by end of month.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#22C55E] shrink-0" />
                  <span>Finalize orientation schedule for 4 newly enrolled prospects.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock size={14} className="text-[#D4A520] shrink-0" />
                  <span>Submit Q2 Rotary Foundation matching grant proposal.</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 border-t border-black/[0.08] flex justify-end gap-3">
              <button
                onClick={() => setIsExecutiveHqModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-[#981132] hover:bg-[#800E2A] text-white text-xs font-bold transition-all shadow-[0_2px_14px_rgba(152,17,50,0.25)]"
              >
                Close Executive HQ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
