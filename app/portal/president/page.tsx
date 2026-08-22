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

const INITIAL_MEMBERS: MemberRecord[] = [
  {
    id: '1',
    name: 'Adebayo Sodiq Babatunde',
    email: 'a.babatunde@rotaract9126.org',
    role: 'President',
    attendance: 100,
    duesStatus: 'cleared',
    clearedDate: 'Jul 1',
    lastActive: 'Online',
    avatar: '/images/leaders/drr-adebayo-sodiq.jpg'
  },
  {
    id: '2',
    name: 'Sola Adebayo',
    email: 's.adebayo@rotaract9126.org',
    role: 'Vice President',
    attendance: 92,
    duesStatus: 'cleared',
    clearedDate: 'Jul 3',
    lastActive: 'Today',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '3',
    name: 'Kayode Faleye',
    email: 'k.faleye@rotaract9126.org',
    role: 'Secretary',
    attendance: 88,
    duesStatus: 'pending',
    clearedDate: '—',
    lastActive: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1629145810320-aec9e63dd798?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '4',
    name: 'Yetunde Balogun',
    email: 'y.balogun@rotaract9126.org',
    role: 'Director',
    attendance: 96,
    duesStatus: 'cleared',
    clearedDate: 'Jul 5',
    lastActive: 'Today',
    avatar: 'https://images.unsplash.com/photo-1650490323009-96fc950a959c?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '5',
    name: 'Gbemisola Awoyemi',
    email: 'g.awoyemi@rotaract9126.org',
    role: 'Director',
    attendance: 84,
    duesStatus: 'cleared',
    clearedDate: 'Jul 4',
    lastActive: '3 days ago',
    avatar: 'https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '6',
    name: 'Victor Adeleke',
    email: 'v.adeleke@rotaract9126.org',
    role: 'Member',
    attendance: 78,
    duesStatus: 'cleared',
    clearedDate: 'Jul 10',
    lastActive: '2 days ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '7',
    name: 'Damilola Ajayi',
    email: 'd.ajayi@rotaract9126.org',
    role: 'Member',
    attendance: 70,
    duesStatus: 'pending',
    clearedDate: '—',
    lastActive: '5 days ago',
    avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '8',
    name: 'Chukwuemeka Obi',
    email: 'c.obi@rotaract9126.org',
    role: 'Member',
    attendance: 82,
    duesStatus: 'cleared',
    clearedDate: 'Jul 8',
    lastActive: 'Today',
    avatar: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '9',
    name: 'Zainab Alabi',
    email: 'z.alabi@rotaract9126.org',
    role: 'Member',
    attendance: 90,
    duesStatus: 'cleared',
    clearedDate: 'Jul 2',
    lastActive: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '10',
    name: 'Tunde Bakare',
    email: 't.bakare@rotaract9126.org',
    role: 'Member',
    attendance: 75,
    duesStatus: 'cleared',
    clearedDate: 'Jul 15',
    lastActive: '4 days ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '11',
    name: 'Maryam Hassan',
    email: 'm.hassan@rotaract9126.org',
    role: 'Member',
    attendance: 58,
    duesStatus: 'overdue',
    clearedDate: '—',
    lastActive: '1 week ago',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&auto=format'
  }
];

const INITIAL_PROSPECTS: ProspectLead[] = [
  {
    id: 'P1',
    name: 'Chinedu Eze',
    email: 'chinedu.eze@gmail.com',
    phone: '+234 803 456 7890',
    source: '/join',
    date: 'Aug 18, 2026',
    stage: 'intake',
    notes: 'Interested in Community Health outreaches and youth leadership.'
  },
  {
    id: 'P3',
    name: 'Emmanuel Okafor',
    email: 'e.okafor@lawpartners.ng',
    phone: '+234 812 345 6789',
    source: '/join',
    date: 'Aug 10, 2026',
    stage: 'orientation',
    notes: 'Attended 2 general fellowship meetings. Orientation scheduled.'
  },
  {
    id: 'P4',
    name: 'Blessing Adeyemo',
    email: 'b.adeyemo@biomed.com',
    phone: '+234 814 555 6677',
    source: '/clubs',
    date: 'Aug 04, 2026',
    stage: 'induction_ready',
    notes: 'Completed 4-week orientation curriculum. Dues remittance verified.'
  }
];

const INITIAL_FINANCES: FinanceTransaction[] = [
  {
    id: 'TXN-9126-101',
    date: 'Aug 17, 2026',
    description: 'Annual Club Dues (2026/2027 Season)',
    member: 'Adebayo Sodiq Babatunde',
    category: 'Annual Dues',
    amount: 12000,
    status: 'Completed'
  },
  {
    id: 'TXN-9126-102',
    date: 'Aug 15, 2026',
    description: 'Annual Club Dues (2026/2027 Season)',
    member: 'Sola Adebayo',
    category: 'Annual Dues',
    amount: 12000,
    status: 'Completed'
  },
  {
    id: 'TXN-9126-103',
    date: 'Aug 12, 2026',
    description: 'District Health Outreach Project Levy',
    member: 'Yetunde Balogun',
    category: 'Project Levy',
    amount: 5000,
    status: 'Completed'
  }
];

export default function PresidentConsolePage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  const [members, setMembers] = useState<MemberRecord[]>(INITIAL_MEMBERS);
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

  // Verify President / Admin authorization
  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      setIsAuthorized(false);
      setAuthChecked(true);
      return;
    }

    const hasPresidentAccess = 
      user.role === 'club_president' || 
      user.role === 'district_admin' || 
      (user as any).occupation?.toLowerCase().includes('president');

    setIsAuthorized(hasPresidentAccess);
    setAuthChecked(true);
  }, []);

  // Attendance Tab State
  const [attendanceRoll, setAttendanceRoll] = useState<Record<string, 'present' | 'absent' | 'excused'>>({
    '1': 'present',
    '2': 'present',
    '3': 'absent',
    '4': 'present',
    '5': 'present',
    '6': 'present',
    '7': 'excused',
    '8': 'present',
    '9': 'present',
    '10': 'present',
    '11': 'absent'
  });

  // Pipeline State
  const [prospects, setProspects] = useState<ProspectLead[]>(INITIAL_PROSPECTS);

  // Settings State
  const [meetingSchedule, setMeetingSchedule] = useState({
    day: '1st & 3rd Sundays of the month',
    time: '4:00 PM – 6:00 PM WAT',
    venue: 'Kakanfo Inn & Conference Centre, Ring Road, Ibadan',
    virtualLink: 'https://meet.google.com/rotaract-9126-ibadan-central'
  });

  const [executives, setExecutives] = useState([
    { role: 'Vice President', name: 'Sola Adebayo', email: 's.adebayo@rotaract9126.org' },
    { role: 'Club Secretary', name: 'Kayode Faleye', email: 'k.faleye@rotaract9126.org' },
    { role: 'Club Treasurer', name: 'Funmi Olatunde', email: 'f.olatunde@rotaract9126.org' },
    { role: 'Director of Community Service', name: 'Yetunde Balogun', email: 'y.balogun@rotaract9126.org' },
    { role: 'Director of Club Administration', name: 'Babatunde Olawale', email: 'b.olawale@rotaract9126.org' },
    { role: 'Director of Membership', name: 'Gbemisola Awoyemi', email: 'g.awoyemi@rotaract9126.org' }
  ]);

  // Handle Add Member submit
  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberForm.name || !newMemberForm.email) {
      alert('Please fill in member name and email');
      return;
    }

    const newRecord: MemberRecord = {
      id: String(members.length + 1),
      name: newMemberForm.name,
      email: newMemberForm.email,
      role: newMemberForm.role,
      attendance: 100,
      duesStatus: newMemberForm.duesStatus,
      clearedDate: newMemberForm.duesStatus === 'cleared' ? 'Today' : '—',
      lastActive: 'Just registered',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format'
    };

    setMembers(prev => [newRecord, ...prev]);
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

  // Advance Prospect Lead Stage
  const advanceProspectStage = (id: string) => {
    setProspects((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        if (p.stage === 'intake') return { ...p, stage: 'orientation' };
        if (p.stage === 'orientation') return { ...p, stage: 'induction_ready' };
        return p;
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

  const presentAttendeesCount = Object.values(attendanceRoll).filter(v => v === 'present').length;
  const attendanceRatePercentage = Math.round((presentAttendeesCount / totalCount) * 100);

  // Access Denied Screen for non-presidents
  if (authChecked && isAuthorized === false) {
    return (
      <div className="min-h-screen bg-[#090A0F] text-[#ECEEF5] font-sans flex items-center justify-center p-6">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-[#EF4444]/10 border border-[#EF4444]/25 text-[#EF4444] flex items-center justify-center mx-auto">
            <Lock size={28} />
          </div>
          <h2 className="text-2xl font-black text-white">Access Restricted</h2>
          <p className="text-sm text-white/60 leading-relaxed">
            The <strong>President Management Console</strong> is exclusively accessible to verified <strong>Club Presidents</strong> and District Executive Administrators.
          </p>
          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/portal/dashboard"
              className="w-full py-3 rounded-xl bg-[#981132] hover:bg-[#A70C43] text-white text-xs font-bold transition-colors shadow-lg"
            >
              Return to Member Dashboard
            </Link>
            <Link
              href="/login"
              className="w-full py-3 rounded-xl bg-white/[0.05] hover:bg-white/10 text-white/70 hover:text-white text-xs font-semibold transition-colors border border-white/10"
            >
              Switch Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
          <Link
            href="/portal/executive"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#4361EE]/10 hover:bg-[#4361EE]/20 border border-[#4361EE]/25 text-[#4361EE] text-xs font-semibold transition-colors"
          >
            <BarChart2 size={12} /> Executive HQ
          </Link>
          <button
            onClick={() => setIsAddMemberModalOpen(true)}
            className="flex items-center pl-4 pr-0 h-9 rounded-full bg-gradient-to-r from-[#D91B5C] to-[#7C3AED] text-white text-xs font-bold shadow-[0_0_20px_rgba(217,27,92,0.25)] hover:opacity-95 transition-all overflow-hidden cursor-pointer"
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
        {/* Metric Cards Bar - With Generous Padding & Visual Breathing Room */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
          {/* Total members */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-xl shadow-lg flex flex-col justify-between">
            <div className="text-[11px] font-bold text-[#ECEEF5]/50 tracking-[0.14em] uppercase mb-3">
              Total members
            </div>
            <div className="text-3xl sm:text-4xl font-black leading-none bg-gradient-to-r from-[#D91B5C] to-[#7C3AED] bg-clip-text text-transparent my-1">
              {totalCount}
            </div>
            <div className="text-xs text-[#ECEEF5]/50 mt-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              16 active on projects
            </div>
          </div>

          {/* Dues cleared */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-xl shadow-lg flex flex-col justify-between">
            <div className="text-[11px] font-bold text-[#ECEEF5]/50 tracking-[0.14em] uppercase mb-3">
              Dues cleared
            </div>
            <div className="text-3xl sm:text-4xl font-black leading-none text-[#D91B5C] my-1">
              {duesClearedPercentage}%
            </div>
            <div className="text-xs text-[#ECEEF5]/50 mt-2">
              {clearedCount} / {totalCount} members cleared
            </div>
          </div>

          {/* Avg attendance */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-xl shadow-lg flex flex-col justify-between">
            <div className="text-[11px] font-bold text-[#ECEEF5]/50 tracking-[0.14em] uppercase mb-3">
              Avg attendance
            </div>
            <div className="text-3xl sm:text-4xl font-black leading-none text-[#22C55E] my-1">
              {attendanceRatePercentage}%
            </div>
            <div className="text-xs text-[#ECEEF5]/50 mt-2">
              {presentAttendeesCount} present at last meeting
            </div>
          </div>

          {/* Overdue payments */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-xl shadow-lg flex flex-col justify-between">
            <div className="text-[11px] font-bold text-[#ECEEF5]/50 tracking-[0.14em] uppercase mb-3">
              Overdue payments
            </div>
            <div className="text-3xl sm:text-4xl font-black leading-none text-[#EF4444] my-1">
              {overdueCount}
            </div>
            <div className="text-xs text-[#EF4444]/80 mt-2">
              {overdueCount} member{overdueCount === 1 ? '' : 's'} need follow-up
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/[0.07] mb-5 overflow-x-auto">
          {[
            { id: 'roster', label: 'Member Roster', badge: totalCount },
            { id: 'attendance', label: 'Attendance' },
            { id: 'finances', label: 'Finances', badge: INITIAL_FINANCES.length },
            { id: 'pipeline', label: 'Lead Pipeline', badge: prospects.length, dot: true },
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

        {/* 1. MEMBER ROSTER TAB */}
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
                              className="px-2.5 py-1 rounded-lg border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] text-[#ECEEF5]/60 hover:text-white text-[10px] font-semibold transition-colors whitespace-nowrap cursor-pointer"
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

        {/* 2. ATTENDANCE & ROLL-CALL TAB */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            {/* Meeting Summary Card */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#981132]/20 text-[#D91B5C] border border-[#981132]/30">
                    Active Meeting Session
                  </span>
                  <span className="text-xs text-[#ECEEF5]/40">Aug 16, 2026</span>
                </div>
                <h3 className="text-lg font-bold text-[#ECEEF5]">
                  General Fellowship: &quot;Digital Leadership in Community Impact&quot;
                </h3>
                <p className="text-xs text-[#ECEEF5]/60">
                  Venue: Kakanfo Inn & Conference Centre · Presiding: Rtr. Tunde Adeyemi
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <div className="text-2xl font-black text-[#22C55E] leading-none">
                    {presentAttendeesCount} / {totalCount}
                  </div>
                  <div className="text-[10px] text-[#ECEEF5]/40 mt-1 uppercase tracking-wider font-semibold">
                    {attendanceRatePercentage}% Attendance
                  </div>
                </div>
                <button
                  onClick={() => alert('Attendance Roll-Call saved and recorded!')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-black font-bold text-xs shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all cursor-pointer"
                >
                  <Save size={13} strokeWidth={2.5}/> Save Register
                </button>
              </div>
            </div>

            {/* Quick Roll-Call Table */}
            <div className="rounded-2xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-white/[0.07] flex items-center justify-between">
                <span className="text-xs font-bold text-[#ECEEF5]">
                  Interactive Roll-Call Register
                </span>
                <span className="text-[11px] text-[#ECEEF5]/40">
                  Mark status for each active club member
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[700px] text-left">
                  <thead>
                    <tr className="border-b border-white/[0.07] bg-[#090A0F]/60 text-[10px] font-semibold text-[#ECEEF5]/30 uppercase tracking-wider">
                      <th className="p-3.5 w-[250px]">Member</th>
                      <th className="p-3.5 w-[160px]">Role</th>
                      <th className="p-3.5 w-[140px]">Cumulative Att.</th>
                      <th className="p-3.5 text-center">Mark Attendance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.05] text-xs">
                    {members.map((member) => {
                      const currentStatus = attendanceRoll[member.id] || 'absent';
                      return (
                        <tr key={member.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="p-3.5">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-8 h-8 rounded-full object-cover shrink-0"
                              />
                              <div>
                                <div className="font-semibold text-[#ECEEF5]">{member.name}</div>
                                <div className="text-[10px] text-[#ECEEF5]/40">{member.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5 text-[#ECEEF5]/70 text-[11px]">
                            {member.role}
                          </td>
                          <td className="p-3.5">
                            <span className="font-semibold text-emerald-400">{member.attendance}%</span>
                          </td>
                          <td className="p-3.5 text-center">
                            <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                              <button
                                onClick={() => setAttendanceRoll(prev => ({ ...prev, [member.id]: 'present' }))}
                                className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                  currentStatus === 'present'
                                    ? 'bg-[#22C55E] text-black shadow-sm'
                                    : 'text-[#ECEEF5]/40 hover:text-white'
                                }`}
                              >
                                Present
                              </button>
                              <button
                                onClick={() => setAttendanceRoll(prev => ({ ...prev, [member.id]: 'excused' }))}
                                className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                  currentStatus === 'excused'
                                    ? 'bg-[#F7A81B] text-black shadow-sm'
                                    : 'text-[#ECEEF5]/40 hover:text-white'
                                }`}
                              >
                                Excused
                              </button>
                              <button
                                onClick={() => setAttendanceRoll(prev => ({ ...prev, [member.id]: 'absent' }))}
                                className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                  currentStatus === 'absent'
                                    ? 'bg-[#EF4444] text-white shadow-sm'
                                    : 'text-[#ECEEF5]/40 hover:text-white'
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
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-xl shadow-lg">
                <div className="text-[10px] font-semibold text-[#ECEEF5]/40 tracking-wider uppercase mb-2">
                  Total Dues Collected
                </div>
                <div className="text-[26px] font-extrabold text-[#22C55E] leading-none">
                  ₦81,000
                </div>
                <div className="text-[10px] text-[#ECEEF5]/50 mt-2">
                  11 of 18 members cleared
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-xl shadow-lg">
                <div className="text-[10px] font-semibold text-[#ECEEF5]/40 tracking-wider uppercase mb-2">
                  Outstanding Dues
                </div>
                <div className="text-[26px] font-extrabold text-[#EF4444] leading-none">
                  ₦36,000
                </div>
                <div className="text-[10px] text-[#ECEEF5]/50 mt-2">
                  7 pending/overdue accounts
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-xl shadow-lg">
                <div className="text-[10px] font-semibold text-[#ECEEF5]/40 tracking-wider uppercase mb-2">
                  District Remittance Status
                </div>
                <div className="text-[18px] font-bold text-[#F7A81B] leading-tight flex items-center gap-1.5 mt-1">
                  <ShieldCheck size={18} className="text-[#22C55E] shrink-0" />
                  <span>Cleared</span>
                </div>
                <div className="text-[10px] text-[#ECEEF5]/50 mt-2">
                  Remitted to D9126 Secretariat
                </div>
              </div>
            </div>

            {/* Club Ledger Table */}
            <div className="rounded-2xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-white/[0.07] flex items-center justify-between">
                <span className="text-xs font-bold text-[#ECEEF5]">
                  Club Financial Ledger & Receipts
                </span>
                <button
                  onClick={() => alert('Exporting Financial Report to CSV…')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] text-[#ECEEF5]/60 hover:text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  <Download size={12}/> Export CSV
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[760px] text-left">
                  <thead>
                    <tr className="border-b border-white/[0.07] bg-[#090A0F]/60 text-[10px] font-semibold text-[#ECEEF5]/30 uppercase tracking-wider">
                      <th className="p-3.5">Txn Reference</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Transaction / Member</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Amount</th>
                      <th className="p-3.5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.05] text-xs">
                    {INITIAL_FINANCES.map((txn) => (
                      <tr key={txn.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-3.5 font-mono text-[11px] text-[#ECEEF5]/50">{txn.id}</td>
                        <td className="p-3.5 text-[#ECEEF5]/70 text-[11px]">{txn.date}</td>
                        <td className="p-3.5">
                          <div className="font-semibold text-[#ECEEF5]">{txn.description}</div>
                          <div className="text-[10px] text-[#ECEEF5]/40">{txn.member}</div>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold bg-white/[0.06] text-[#ECEEF5]/70">
                            {txn.category}
                          </span>
                        </td>
                        <td className="p-3.5 font-bold text-[#ECEEF5]">
                          ₦{txn.amount.toLocaleString()}
                        </td>
                        <td className="p-3.5 text-center">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            txn.status === 'Completed'
                              ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                              : txn.status === 'Remitted'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            {txn.status}
                          </span>
                        </td>
                      </tr>
                    ))}
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
                <h3 className="text-sm font-bold text-[#ECEEF5]">Membership Induction Pipeline</h3>
                <p className="text-xs text-[#ECEEF5]/50">Leads captured from the public district portal and referrals</p>
              </div>
              <button
                onClick={() => {
                  const name = prompt('Enter prospect full name:');
                  if (name) {
                    setProspects(prev => [
                      {
                        id: `P-${Date.now()}`,
                        name,
                        email: `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
                        phone: '+234 800 000 0000',
                        source: 'Direct Referral',
                        date: 'Today',
                        stage: 'intake',
                        notes: 'Manual lead addition.'
                      },
                      ...prev
                    ]);
                  }
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#981132] hover:bg-[#A70C43] text-white text-xs font-bold transition-all cursor-pointer shadow-md shadow-[#981132]/30"
              >
                <Plus size={13}/> Add Prospect
              </button>
            </div>

            {/* 3-Column Kanban Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Column 1: Intake Review */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col gap-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-xs font-bold text-[#ECEEF5] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    1. Intake Review
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-white">
                    {prospects.filter(p => p.stage === 'intake').length}
                  </span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto">
                  {prospects.filter(p => p.stage === 'intake').map((lead) => (
                    <div key={lead.id} className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:border-white/15 transition-all space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-bold text-xs text-[#ECEEF5]">{lead.name}</div>
                        <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-white/[0.06] text-[#ECEEF5]/60">{lead.source}</span>
                      </div>
                      <div className="text-[11px] text-[#ECEEF5]/60 space-y-0.5">
                        <div className="flex items-center gap-1.5"><Mail size={10} className="text-white/40"/> {lead.email}</div>
                        <div className="flex items-center gap-1.5"><Phone size={10} className="text-white/40"/> {lead.phone}</div>
                      </div>
                      {lead.notes && (
                        <p className="text-[10px] text-[#ECEEF5]/40 italic bg-black/20 p-2 rounded-lg">
                          &quot;{lead.notes}&quot;
                        </p>
                      )}
                      <div className="pt-1 flex items-center justify-between">
                        <span className="text-[9px] text-white/30">{lead.date}</span>
                        <button
                          onClick={() => advanceProspectStage(lead.id)}
                          className="px-2.5 py-1 rounded-lg bg-[#4361EE]/20 hover:bg-[#4361EE]/30 border border-[#4361EE]/40 text-[#4361EE] text-[10px] font-bold transition-colors cursor-pointer"
                        >
                          Start Orientation →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: In Orientation */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col gap-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-xs font-bold text-[#ECEEF5] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F7A81B]" />
                    2. In Orientation
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-white">
                    {prospects.filter(p => p.stage === 'orientation').length}
                  </span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto">
                  {prospects.filter(p => p.stage === 'orientation').map((lead) => (
                    <div key={lead.id} className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:border-white/15 transition-all space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-bold text-xs text-[#ECEEF5]">{lead.name}</div>
                        <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#F7A81B]/15 text-[#F7A81B]">{lead.source}</span>
                      </div>
                      <div className="text-[11px] text-[#ECEEF5]/60 space-y-0.5">
                        <div className="flex items-center gap-1.5"><Mail size={10} className="text-white/40"/> {lead.email}</div>
                        <div className="flex items-center gap-1.5"><Phone size={10} className="text-white/40"/> {lead.phone}</div>
                      </div>
                      {lead.notes && (
                        <p className="text-[10px] text-[#ECEEF5]/40 italic bg-black/20 p-2 rounded-lg">
                          &quot;{lead.notes}&quot;
                        </p>
                      )}
                      <div className="pt-1 flex items-center justify-between">
                        <span className="text-[9px] text-white/30">{lead.date}</span>
                        <button
                          onClick={() => advanceProspectStage(lead.id)}
                          className="px-2.5 py-1 rounded-lg bg-[#22C55E]/20 hover:bg-[#22C55E]/30 border border-[#22C55E]/40 text-[#22C55E] text-[10px] font-bold transition-colors cursor-pointer"
                        >
                          Mark Ready →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Induction Ready */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col gap-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-xs font-bold text-[#ECEEF5] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                    3. Induction Ready
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-white">
                    {prospects.filter(p => p.stage === 'induction_ready').length}
                  </span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto">
                  {prospects.filter(p => p.stage === 'induction_ready').map((lead) => (
                    <div key={lead.id} className="p-3.5 rounded-xl bg-gradient-to-br from-[#D91B5C]/10 to-transparent border border-[#D91B5C]/30 transition-all space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-bold text-xs text-[#ECEEF5]">{lead.name}</div>
                        <span className="px-2 py-0.5 rounded-full text-[8px] font-bold bg-[#22C55E]/20 text-[#22C55E]">Cleared for Pinning</span>
                      </div>
                      <div className="text-[11px] text-[#ECEEF5]/60 space-y-0.5">
                        <div className="flex items-center gap-1.5"><Mail size={10} className="text-white/40"/> {lead.email}</div>
                        <div className="flex items-center gap-1.5"><Phone size={10} className="text-white/40"/> {lead.phone}</div>
                      </div>
                      {lead.notes && (
                        <p className="text-[10px] text-[#ECEEF5]/40 italic bg-black/20 p-2 rounded-lg">
                          &quot;{lead.notes}&quot;
                        </p>
                      )}
                      <div className="pt-1 flex items-center justify-between">
                        <span className="text-[9px] text-white/30">{lead.date}</span>
                        <button
                          onClick={() => alert(`Induction ceremony confirmed for ${lead.name}!`)}
                          className="px-3 py-1 rounded-lg bg-[#D91B5C] hover:bg-[#A70C43] text-white text-[10px] font-bold transition-colors cursor-pointer"
                        >
                          Confirm Induction ✓
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
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-xl shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-[#ECEEF5] flex items-center gap-2">
                <Calendar size={15} className="text-[#D91B5C]" />
                Meeting Schedule & Fellowship Venue
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase text-[#ECEEF5]/40">Meeting Days</label>
                  <input
                    type="text"
                    value={meetingSchedule.day}
                    onChange={(e) => setMeetingSchedule(prev => ({ ...prev, day: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs text-[#ECEEF5] outline-none focus:border-[#D91B5C] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase text-[#ECEEF5]/40">Meeting Time</label>
                  <input
                    type="text"
                    value={meetingSchedule.time}
                    onChange={(e) => setMeetingSchedule(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs text-[#ECEEF5] outline-none focus:border-[#D91B5C] transition-all"
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase text-[#ECEEF5]/40">Physical Venue</label>
                  <input
                    type="text"
                    value={meetingSchedule.venue}
                    onChange={(e) => setMeetingSchedule(prev => ({ ...prev, venue: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs text-[#ECEEF5] outline-none focus:border-[#D91B5C] transition-all"
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase text-[#ECEEF5]/40">Virtual Google Meet / Zoom Link</label>
                  <input
                    type="url"
                    value={meetingSchedule.virtualLink}
                    onChange={(e) => setMeetingSchedule(prev => ({ ...prev, virtualLink: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs text-[#ECEEF5] outline-none focus:border-[#D91B5C] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Executive Council & Committee Chairs */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-xl shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-[#ECEEF5] flex items-center gap-2">
                <Users size={15} className="text-[#4361EE]" />
                Club Executive Council & Committee Chairs
              </h3>

              <div className="space-y-2.5">
                {executives.map((exec, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#ECEEF5]">{exec.role}</div>
                      <div className="text-[11px] text-[#ECEEF5]/50">{exec.name} · {exec.email}</div>
                    </div>
                    <button
                      onClick={() => {
                        const newName = prompt(`Assign new ${exec.role}:`, exec.name);
                        if (newName) {
                          setExecutives(prev => prev.map((item, i) => i === idx ? { ...item, name: newName } : item));
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#ECEEF5]/80 hover:text-white transition-colors cursor-pointer self-start sm:self-center"
                    >
                      Reassign
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/[0.07] flex justify-end">
                <button
                  onClick={() => alert('Club governance and schedule settings saved successfully!')}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#981132] hover:bg-[#A70C43] text-white text-xs font-bold shadow-[0_0_20px_rgba(152,17,50,0.3)] transition-all cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0F121C] border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6 text-[#ECEEF5]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-gradient-to-r from-[#D91B5C] to-[#7C3AED] text-white">
                  <UserPlus size={18} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">Induct New Club Member</h3>
                  <p className="text-[11px] text-[#ECEEF5]/50">Direct club register roster onboarding</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddMemberModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-[#ECEEF5]/60 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-4 font-sans">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#ECEEF5]/60 mb-1.5 block">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Oladimeji Victor Adeyemi"
                  value={newMemberForm.name}
                  onChange={(e) => setNewMemberForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white placeholder:text-white/30 outline-none focus:border-[#D91B5C] transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#ECEEF5]/60 mb-1.5 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="v.adeyemi@rotaract9126.org"
                    value={newMemberForm.email}
                    onChange={(e) => setNewMemberForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white placeholder:text-white/30 outline-none focus:border-[#D91B5C] transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#ECEEF5]/60 mb-1.5 block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={newMemberForm.phone}
                    onChange={(e) => setNewMemberForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white placeholder:text-white/30 outline-none focus:border-[#D91B5C] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#ECEEF5]/60 mb-1.5 block">
                    Assigned Role
                  </label>
                  <select
                    value={newMemberForm.role}
                    onChange={(e) => setNewMemberForm(prev => ({ ...prev, role: e.target.value as any }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#090A0F] border border-white/10 text-xs text-white outline-none focus:border-[#D91B5C] transition-all"
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
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#ECEEF5]/60 mb-1.5 block">
                    Initial Dues Status
                  </label>
                  <select
                    value={newMemberForm.duesStatus}
                    onChange={(e) => setNewMemberForm(prev => ({ ...prev, duesStatus: e.target.value as any }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#090A0F] border border-white/10 text-xs text-white outline-none focus:border-[#D91B5C] transition-all"
                  >
                    <option value="cleared">Cleared (Fully Paid)</option>
                    <option value="pending">Pending Payment</option>
                    <option value="overdue">Overdue / Arrears</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddMemberModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-white/70 hover:text-white text-xs font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D91B5C] to-[#7C3AED] hover:opacity-95 text-white text-xs font-bold shadow-[0_0_20px_rgba(217,27,92,0.3)] transition-all cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0F121C] border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6 text-[#ECEEF5]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-[#4361EE]/20 text-[#4361EE] border border-[#4361EE]/30">
                  <BarChart2 size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    Executive HQ Strategic Centre
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-[#F7A81B]/15 text-[#F7A81B] border border-[#F7A81B]/30">
                      Tier 2 Sovereign
                    </span>
                  </h3>
                  <p className="text-[11px] text-[#ECEEF5]/50">Rotaract Club of Ibadan Central · District 9126</p>
                </div>
              </div>
              <button
                onClick={() => setIsExecutiveHqModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-[#ECEEF5]/60 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Strategic KPI Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#4361EE] mb-1">
                  <Award size={14} /> Citation Goal
                </div>
                <div className="text-xl font-black text-white">85% Achieved</div>
                <div className="text-[10px] text-white/50 mt-1">17 / 20 District Goals Completed</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#22C55E] mb-1">
                  <Target size={14} /> Health Outreach
                </div>
                <div className="text-xl font-black text-white">₦240,000</div>
                <div className="text-[10px] text-white/50 mt-1">Raised for Maternal Outreach</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#D91B5C] mb-1">
                  <Briefcase size={14} /> Capitation
                </div>
                <div className="text-xl font-black text-white">Q1 Remitted</div>
                <div className="text-[10px] text-white/50 mt-1">District Secretariat Cleared</div>
              </div>
            </div>

            {/* Executive Directives */}
            <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2.5">
              <div className="text-xs font-black uppercase tracking-wider text-white/70">
                Presidential Directives & Action Items
              </div>
              <ul className="text-xs text-white/70 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#22C55E] shrink-0" />
                  <span>Verify member ID cards with District Secretariat by end of month.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#22C55E] shrink-0" />
                  <span>Finalize orientation schedule for 4 newly enrolled prospects.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock size={14} className="text-[#F7A81B] shrink-0" />
                  <span>Submit Q2 Rotary Foundation matching grant proposal.</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={() => setIsExecutiveHqModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-[#4361EE] hover:bg-[#324bcf] text-white text-xs font-bold transition-all shadow-lg"
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
