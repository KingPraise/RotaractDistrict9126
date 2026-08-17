'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
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
    email: 'folashade.a@example.com',
    rotaryId: 'ROT-9126-2104',
    clubId: 'club-ibadan-ring-road',
    role: 'member',
    duesStatus: 'cleared',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    occupation: 'Legal Practitioner',
    phoneNumber: '+2348056781234',
  },
];

const INITIAL_PROSPECTS: Prospect[] = [
  {
    prospectId: 'prospect-01',
    fullName: 'Babajide Ogundimu',
    email: 'babajide.ogundimu@example.com',
    phone: '+2348021112233',
    assignedClubId: 'club-ibadan-ring-road',
    status: 'new',
    createdAt: new Date().toISOString(),
    preferredState: 'Oyo',
    notes: 'Interested in youth community digital development.',
  },
  {
    prospectId: 'prospect-02',
    fullName: 'Amina Lawal',
    email: 'amina.lawal@example.com',
    phone: '+2348055566778',
    assignedClubId: 'club-ibadan-ring-road',
    status: 'contacted',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    preferredState: 'Oyo',
    notes: 'Reached out via WhatsApp regarding meeting time.',
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
    } catch {
      // optimistic fallback
      setRoster((prev) =>
        prev.map((m) => (m.userId === userId ? { ...m, duesStatus: newStatus } : m))
      );
    } finally {
      setIsUpdatingDues(null);
    }
  };

  // Move Prospect Stage
  const handleAdvanceProspect = async (prospectId: string, currentStatus: ProspectStatus) => {
    const statusOrder: ProspectStatus[] = ['new', 'contacted', 'meeting_attended', 'inducted'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    if (currentIndex >= statusOrder.length - 1) return;

    const nextStatus = statusOrder[currentIndex + 1];
    setProspects((prev) =>
      prev.map((p) => (p.prospectId === prospectId ? { ...p, status: nextStatus } : p))
    );

    await updateProspectStatus(prospectId, nextStatus);
  };

  const clearedCount = roster.filter((m) => m.duesStatus === 'cleared').length;
  const clearedPercent = Math.round((clearedCount / roster.length) * 100);

  return (
    <div className="min-h-screen bg-[#080C14] text-white flex flex-col selection:bg-[#D91B5C] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-[130px] sm:pt-[150px] pb-12 space-y-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
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
        </motion.div>

        {/* Executive Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div 
            whileHover={{ y: -3 }}
            className="glass-card rounded-[16px] p-5 bg-white/[0.03] border border-white/10"
          >
            <div className="text-xs font-semibold text-slate-400">Total Roster</div>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1">{roster.length} Members</div>
            <div className="text-[11px] text-slate-500 mt-1">Registered in Firestore</div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="glass-card rounded-[16px] p-5 bg-white/[0.03] border border-white/10"
          >
            <div className="text-xs font-semibold text-slate-400">Dues Clearance Rate</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">{clearedPercent}%</div>
            <div className="text-[11px] text-emerald-400/80 mt-1">{clearedCount} of {roster.length} Cleared</div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="glass-card rounded-[16px] p-5 bg-white/[0.03] border border-white/10"
          >
            <div className="text-xs font-semibold text-slate-400">Active Leads</div>
            <div className="text-2xl sm:text-3xl font-black text-[#D4A520] mt-1">{prospects.length} In Pipeline</div>
            <div className="text-[11px] text-[#D4A520]/80 mt-1">Recruitment Inquiries</div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="glass-card rounded-[16px] p-5 bg-white/[0.03] border border-white/10"
          >
            <div className="text-xs font-semibold text-slate-400">Next Induction</div>
            <div className="text-2xl sm:text-3xl font-black text-[#D91B5C] mt-1">Sep 15</div>
            <div className="text-[11px] text-slate-500 mt-1">Quarterly District Ceremony</div>
          </motion.div>
        </div>

        {/* Section 1: Member Roster & 1-Click Dues Clearance */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 bg-white/[0.02]"
        >
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
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        disabled={isUpdatingDues === member.userId}
                        onClick={() => handleToggleDues(member.userId, member.duesStatus)}
                        className={`px-3.5 py-1.5 rounded-xl font-bold text-[11px] transition shadow-md cursor-pointer ${
                          member.duesStatus === 'cleared'
                            ? 'bg-white/5 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-[#D91B5C] hover:bg-[#A70C43] text-white shadow-[#D91B5C]/20'
                        }`}
                      >
                        {isUpdatingDues === member.userId
                          ? 'Updating...'
                          : member.duesStatus === 'cleared'
                          ? 'Revoke Clearance'
                          : 'Approve & Clear Dues'}
                      </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Section 2: Prospective Intake Kanban Pipeline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div>
            <h2 className="text-xl font-bold text-white">Prospective Member Kanban Pipeline</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Advance candidate onboarding from digital lead form capture to induction day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
            {KANBAN_COLUMNS.map((col) => {
              const colProspects = prospects.filter((p) => p.status === col.key);

              return (
                <div
                  key={col.key}
                  className="glass-panel rounded-2xl p-4 border border-white/10 bg-white/[0.02] flex flex-col min-h-[300px]"
                >
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: col.color }} />
                      <span className="text-xs font-bold text-white">{col.label}</span>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-mono">
                      {colProspects.length}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1">
                    <AnimatePresence>
                      {colProspects.map((prospect) => (
                        <motion.div
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          key={prospect.prospectId}
                          className="p-4 rounded-xl bg-[#0F1420] border border-white/10 space-y-2 shadow-md hover:border-white/20 transition"
                        >
                          <div className="font-bold text-xs text-white">{prospect.fullName}</div>
                          <div className="text-[11px] text-slate-400">{prospect.email}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{prospect.phone}</div>
                          {prospect.notes && (
                            <p className="text-[11px] text-slate-300 bg-white/5 p-2 rounded-lg italic">
                              &ldquo;{prospect.notes}&rdquo;
                            </p>
                          )}

                          {col.key !== 'inducted' && (
                            <motion.button
                              whileTap={{ scale: 0.96 }}
                              onClick={() => handleAdvanceProspect(prospect.prospectId, prospect.status)}
                              className="w-full mt-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-1 transition cursor-pointer"
                            >
                              <span>Advance Stage</span>
                              <ChevronRight className="h-3 w-3" />
                            </motion.button>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {colProspects.length === 0 && (
                      <div className="h-24 flex items-center justify-center text-slate-600 text-xs italic">
                        No candidates in this stage
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
