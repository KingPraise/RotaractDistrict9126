'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { toggleMemberDues } from '@/actions/dues';
import { updateProspectStatus } from '@/actions/prospects';
import { User, Prospect, ProspectStatus, DuesStatus } from '@/types';
import { ChevronRight } from 'lucide-react';
import { FormatRotaryText } from '@/components/ui/RotaryTooltip';

const INITIAL_ROSTER: User[] = [
  {
    userId: 'user-pres-ibadan',
    firstName: 'Tolu',
    lastName: 'Adeleke',
    email: 'president.ibadanringroad@rotaractdistrict9126.com.ng',
    rotaryId: 'ROT-9126-1002',
    clubId: 'club-ibadan-ring-road',
    role: 'president',
    duesStatus: 'cleared',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    occupation: 'Brand Designer',
    phoneNumber: '+2348023456789',
  },
  {
    userId: 'user-mem-01',
    firstName: 'Chidinma',
    lastName: 'Okafor',
    email: 'chidinma.o@example.com',
    rotaryId: 'ROT-9126-2045',
    clubId: 'club-ibadan-ring-road',
    role: 'member',
    duesStatus: 'cleared',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    occupation: 'Pharmacist',
    phoneNumber: '+2348034567812',
  },
  {
    userId: 'user-mem-02',
    firstName: 'Kayode',
    lastName: 'Balogun',
    email: 'kayode.b@example.com',
    rotaryId: 'ROT-9126-2089',
    clubId: 'club-ibadan-ring-road',
    role: 'member',
    duesStatus: 'pending',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    occupation: 'Data Scientist',
    phoneNumber: '+2348098765432',
  },
  {
    userId: 'user-mem-03',
    firstName: 'Folashade',
    lastName: 'Adebayo',
    email: 'folashade@example.com',
    rotaryId: 'ROT-9126-2104',
    clubId: 'club-ibadan-ring-road',
    role: 'member',
    duesStatus: 'pending',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    occupation: 'Civil Engineer',
    phoneNumber: '+2348054321678',
  },
];

const INITIAL_PROSPECTS: Prospect[] = [
  {
    prospectId: 'prospect-01',
    fullName: 'Babatunde Alabi',
    email: 'babatunde.a@example.com',
    phone: '+2348011223344',
    assignedClubId: 'club-ibadan-ring-road',
    status: 'new',
    createdAt: new Date().toISOString(),
    preferredState: 'Oyo',
    notes: 'Interested in Water & Sanitation projects in Oyo.',
  },
  {
    prospectId: 'prospect-02',
    fullName: 'Grace Emenike',
    email: 'grace.emenike@example.com',
    phone: '+2348022334455',
    assignedClubId: 'club-ibadan-ring-road',
    status: 'contacted',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    preferredState: 'Oyo',
    notes: 'Spoke with Vice President on WhatsApp.',
  },
  {
    prospectId: 'prospect-03',
    fullName: 'Damilola Ajayi',
    email: 'damilola.ajayi@example.com',
    phone: '+2348033445566',
    assignedClubId: 'club-ibadan-ring-road',
    status: 'meeting_attended',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    preferredState: 'Oyo',
    notes: 'Attended the last Sunday general meeting.',
  },
];

const KANBAN_COLUMNS: { key: ProspectStatus; label: string; color: string }[] = [
  { key: 'new', label: 'New Inquiries', color: '#D4A520' },
  { key: 'contacted', label: 'Contacted', color: '#38BDF8' },
  { key: 'meeting_attended', label: 'Meeting Attended', color: '#A855F7' },
  { key: 'inducted', label: 'Inducted / Ready', color: '#16A34A' },
];

export default function PresidentPortal() {
  const [roster, setRoster] = useState<User[]>(INITIAL_ROSTER);
  const [prospects, setProspects] = useState<Prospect[]>(INITIAL_PROSPECTS);
  const [isUpdatingDues, setIsUpdatingDues] = useState<string | null>(null);

  // Toggle Member Dues Action
  const handleToggleDues = async (userId: string, currentStatus: DuesStatus) => {
    setIsUpdatingDues(userId);
    const newStatus: DuesStatus = currentStatus === 'cleared' ? 'pending' : 'cleared';

    try {
      const res = await toggleMemberDues(userId, newStatus);
      if (res.success) {
        setRoster((prev) =>
          prev.map((m) => (m.userId === userId ? { ...m, duesStatus: newStatus } : m))
        );
      }
    } catch (err) {
      console.error('Failed to toggle dues:', err);
    } finally {
      setIsUpdatingDues(null);
    }
  };

  // Move Prospect in Kanban Pipeline
  const handleMoveProspect = async (prospectId: string, nextStatus: ProspectStatus) => {
    try {
      const res = await updateProspectStatus(prospectId, nextStatus);
      if (res.success) {
        setProspects((prev) =>
          prev.map((p) => (p.prospectId === prospectId ? { ...p, status: nextStatus } : p))
        );
      }
    } catch (err) {
      console.error('Failed to update prospect status:', err);
    }
  };

  const clearedCount = roster.filter((m) => m.duesStatus === 'cleared').length;
  const clearedPercent = Math.round((clearedCount / roster.length) * 100);

  return (
    <div className="min-h-screen bg-[#080C14] text-white flex flex-col selection:bg-[#D91B5C] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-[130px] sm:pt-[150px] pb-12 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D91B5C]">
              Club Administration Console
            </span>
            <h1 className="text-3xl md:text-4xl font-black mt-1">
              President&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D91B5C] to-[#D4A520]">Roster & Lead Pipeline</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Rotaract Club of Ibadan Ring Road · District 9126
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 font-semibold">
              Session 2026/2027
            </span>
          </div>
        </div>

        {/* Executive Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-[16px] p-5 bg-white/[0.03] border border-white/10">
            <div className="text-xs font-semibold text-slate-400">Total Roster</div>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1">{roster.length} Members</div>
            <div className="text-[11px] text-slate-500 mt-1">Registered in Firestore</div>
          </div>

          <div className="glass-card rounded-[16px] p-5 bg-white/[0.03] border border-white/10">
            <div className="text-xs font-semibold text-slate-400">Dues Clearance Rate</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">{clearedPercent}%</div>
            <div className="text-[11px] text-emerald-400/80 mt-1">{clearedCount} of {roster.length} Cleared</div>
          </div>

          <div className="glass-card rounded-[16px] p-5 bg-white/[0.03] border border-white/10">
            <div className="text-xs font-semibold text-slate-400">Active Leads</div>
            <div className="text-2xl sm:text-3xl font-black text-[#D4A520] mt-1">{prospects.length} In Pipeline</div>
            <div className="text-[11px] text-[#D4A520]/80 mt-1">Recruitment Inquiries</div>
          </div>

          <div className="glass-card rounded-[16px] p-5 bg-white/[0.03] border border-white/10">
            <div className="text-xs font-semibold text-slate-400">Next Induction</div>
            <div className="text-2xl sm:text-3xl font-black text-[#D91B5C] mt-1">Sep 15</div>
            <div className="text-[11px] text-slate-500 mt-1">Quarterly District Ceremony</div>
          </div>
        </div>

        {/* Section 1: Member Roster & 1-Click Dues Clearance */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 bg-white/[0.02]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">Club Membership Roster</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Toggle dues clearance status directly to grant members verified district credentials.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Member Name</th>
                  <th className="py-3 px-4">Rotary ID</th>
                  <th className="py-3 px-4">Occupation</th>
                  <th className="py-3 px-4">Phone Number</th>
                  <th className="py-3 px-4">Dues Status</th>
                  <th className="py-3 px-4 text-right">Clearance Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {roster.map((member) => (
                  <tr key={member.userId} className="hover:bg-white/[0.02] transition">
                    <td className="py-4 px-4 flex items-center gap-3">
                      <img
                        src={member.avatarUrl}
                        alt="Avatar"
                        className="h-8 w-8 rounded-full object-cover border border-white/20"
                      />
                      <div>
                        <div className="font-bold text-white">
                          {member.firstName} {member.lastName}
                        </div>
                        <div className="text-[11px] text-slate-400">{member.email}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-slate-300">{member.rotaryId}</td>
                    <td className="py-4 px-4 text-slate-300">{member.occupation}</td>
                    <td className="py-4 px-4 text-slate-400">{member.phoneNumber}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          member.duesStatus === 'cleared'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}
                      >
                        {member.duesStatus === 'cleared' ? 'Cleared' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => handleToggleDues(member.userId, member.duesStatus)}
                        disabled={isUpdatingDues === member.userId}
                        className={`px-3.5 py-1.5 rounded-xl font-bold text-[11px] transition shadow-md ${
                          member.duesStatus === 'cleared'
                            ? 'bg-white/5 hover:bg-rose-500/20 text-rose-300 border border-white/10 hover:border-rose-500/30'
                            : 'bg-[#16A34A] hover:bg-emerald-600 text-white shadow-emerald-900/30'
                        }`}
                      >
                        {isUpdatingDues === member.userId
                          ? 'Updating...'
                          : member.duesStatus === 'cleared'
                          ? 'Mark Pending'
                          : 'Clear Dues ✓'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Prospect Lead Kanban Board */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 bg-white/[0.02] space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white">Prospective Member Kanban Pipeline</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage incoming leads from website intake forms through induction into the club.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {KANBAN_COLUMNS.map((col) => {
              const columnProspects = prospects.filter((p) => p.status === col.key);

              return (
                <div
                  key={col.key}
                  className="rounded-[18px] bg-white/[0.02] border border-white/10 p-4 flex flex-col h-full min-h-[360px]"
                >
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: col.color }} />
                      <span className="text-xs font-bold text-white">{col.label}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                      {columnProspects.length}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1">
                    {columnProspects.map((prospect) => (
                      <div
                        key={prospect.prospectId}
                        className="glass-card rounded-xl p-3.5 border border-white/10 hover:border-white/20 transition space-y-2 bg-white/[0.03]"
                      >
                        <div className="font-bold text-xs text-white">{prospect.fullName}</div>
                        <div className="text-[11px] text-slate-400">{prospect.phone}</div>
                        {prospect.notes && (
                          <div className="text-[10px] text-slate-400 italic bg-white/5 p-2 rounded-lg">
                            &ldquo;<FormatRotaryText text={prospect.notes} />&rdquo;
                          </div>
                        )}

                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
                          <span className="text-slate-500">
                            {new Date(prospect.createdAt).toLocaleDateString()}
                          </span>

                          {col.key === 'new' && (
                            <button
                              onClick={() => handleMoveProspect(prospect.prospectId, 'contacted')}
                              className="text-sky-400 hover:text-sky-300 font-bold flex items-center gap-0.5"
                            >
                              <span>Contact</span>
                              <ChevronRight className="h-3 w-3" />
                            </button>
                          )}
                          {col.key === 'contacted' && (
                            <button
                              onClick={() => handleMoveProspect(prospect.prospectId, 'meeting_attended')}
                              className="text-purple-400 hover:text-purple-300 font-bold flex items-center gap-0.5"
                            >
                              <span>Attended</span>
                              <ChevronRight className="h-3 w-3" />
                            </button>
                          )}
                          {col.key === 'meeting_attended' && (
                            <button
                              onClick={() => handleMoveProspect(prospect.prospectId, 'inducted')}
                              className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-0.5"
                            >
                              <span>Induct ✓</span>
                              <ChevronRight className="h-3 w-3" />
                            </button>
                          )}
                          {col.key === 'inducted' && (
                            <span className="text-emerald-400 font-bold">Inducted ✓</span>
                          )}
                        </div>
                      </div>
                    ))}

                    {columnProspects.length === 0 && (
                      <div className="h-32 flex items-center justify-center text-[11px] text-slate-600 border border-dashed border-white/10 rounded-xl">
                        No leads in this stage
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
