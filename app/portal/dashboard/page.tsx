'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { User } from '@/types';
import { ShieldCheck, CheckCircle2, Clock, Download, Share2, Award, QrCode, User as UserIcon, Building2, MapPin } from 'lucide-react';
import { FormatRotaryText } from '@/components/ui/RotaryTooltip';

const SAMPLE_MEMBER: User = {
  userId: 'user-drr-9126',
  firstName: 'Oluwaseun',
  lastName: 'Adeleke',
  email: 'oluwaseun@rotaractdistrict9126.com.ng',
  rotaryId: 'ROT-9126-2026',
  clubId: 'club-ibadan-ring-road',
  role: 'member',
  duesStatus: 'cleared',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  occupation: 'Lead Product Architect',
  phoneNumber: '+234 801 234 5678',
};

export default function MemberDashboard() {
  const [member, setMember] = useState<User>(SAMPLE_MEMBER);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    // Generate verified member credential QR code
    const qrData = encodeURIComponent(
      `ROTARACT-9126:VERIFIED|ID:${member.rotaryId}|USER:${member.userId}|STATUS:${member.duesStatus}|DISTRICT:9126-NIGERIA`
    );
    const qrEndpoint = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${qrData}&bgcolor=ffffff&color=080c14&margin=1`;
    setQrCodeUrl(qrEndpoint);
  }, [member]);

  return (
    <div className="min-h-screen bg-[#080C14] text-white flex flex-col selection:bg-[#D91B5C] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D91B5C]">
              Member Portal & Credential Hub
            </span>
            <h1 className="text-3xl md:text-4xl font-black mt-1">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D91B5C] to-[#D4A520]">{member.firstName}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              District 9126 Verified Digital Identity & Dues Clearance Status
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
                member.duesStatus === 'cleared'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
              }`}
            >
              {member.duesStatus === 'cleared' ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>District Dues: Cleared</span>
                </>
              ) : (
                <>
                  <Clock className="h-4 w-4" />
                  <span>District Dues: Pending</span>
                </>
              )}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Digital ID Card Preview (Figma Frame 5:7980) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full max-w-md bg-gradient-to-br from-[#1E1B4B] via-[#0F1624] to-[#312E81] rounded-[24px] p-6 sm:p-8 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 h-40 w-40 bg-[#D91B5C]/25 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 h-32 w-32 bg-[#4338CA]/30 rounded-full blur-2xl pointer-events-none" />

              {/* ID Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#D91B5C] to-[#D4A520] flex items-center justify-center font-black text-white text-xs shadow-md">
                    9126
                  </div>
                  <div>
                    <div className="text-xs font-black tracking-wider text-white">ROTARACT DISTRICT 9126</div>
                    <div className="text-[10px] text-[#D91B5C] font-semibold">NIGERIA · D9126</div>
                  </div>
                </div>
                <Award className="h-6 w-6 text-[#D4A520]" />
              </div>

              {/* Member Profile Block */}
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <img
                  src={member.avatarUrl}
                  alt="Member Avatar"
                  className="h-20 w-20 rounded-[18px] object-cover border-2 border-[#D91B5C] shadow-lg shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-lg font-black text-white truncate">
                    {member.firstName} {member.lastName}
                  </h3>
                  <p className="text-xs text-[#D4A520] font-semibold truncate">{member.occupation}</p>
                  <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-300">
                    <Building2 className="h-3 w-3 text-slate-400" />
                    <span className="truncate">RC Ibadan Ring Road</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <MapPin className="h-3 w-3 text-[#D91B5C]" />
                    <span>Oyo State · South-West</span>
                  </div>
                </div>
              </div>

              {/* QR Code & Verification Data */}
              <div className="glass-panel rounded-[18px] p-4 flex items-center justify-between gap-4 border border-white/10 bg-white/[0.05] relative z-10">
                <div className="space-y-1 text-xs">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Rotary Member ID</div>
                  <div className="font-mono text-sm font-black text-white tracking-wider">{member.rotaryId}</div>
                  <div className="text-[10px] text-slate-400 pt-1">Session 2026/2027</div>
                  <div className="inline-block text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md mt-1">
                    ✓ Cleared for District Events
                  </div>
                </div>

                {qrCodeUrl ? (
                  <img
                    src={qrCodeUrl}
                    alt="Verified Member QR Code"
                    className="h-24 w-24 rounded-xl border border-white/20 p-1 bg-white shrink-0"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-xl bg-white/5 flex items-center justify-center">
                    <QrCode className="h-8 w-8 text-slate-500 animate-pulse" />
                  </div>
                )}
              </div>

              {/* Footer Stamp */}
              <div className="mt-4 pt-3 border-t border-white/10 text-center relative z-10">
                <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                  Official Rotary International Youth Program Credential
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs flex items-center gap-2 transition border border-white/10"
              >
                <Download className="h-4 w-4" />
                <span>Save / Print Digital ID</span>
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="px-5 py-2.5 rounded-xl bg-[#D91B5C] hover:bg-[#A70C43] text-white font-semibold text-xs flex items-center gap-2 transition shadow-md shadow-[#D91B5C]/30"
              >
                <Share2 className="h-4 w-4" />
                <span>Share Credential Link</span>
              </button>
            </div>
          </div>

          {/* Member Privileges & Dues Status Overview */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 bg-white/[0.02]">
              <h3 className="text-lg font-bold text-white mb-4">Membership Credentials & Benefits</h3>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      <FormatRotaryText text="District Conference (DISCON 2026) Access" />
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Your dues clearance grants you direct entry pass privileges to the annual District 9126 Conference.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <Award className="h-5 w-5 text-[#D4A520] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Voting & Nomination Eligibility</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Active dues status qualifies you to vote and hold district executive committee appointments under the <FormatRotaryText text="DRR" />.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <UserIcon className="h-5 w-5 text-[#D91B5C] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Rotary International Directory Sync</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Your profile and rotary ID <code className="text-[#D4A520] font-mono">{member.rotaryId}</code> are synchronized with the official Rotary database.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Dues Breakdown */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 bg-white/[0.02]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white">Annual District Assessment</h3>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  Fully Settled
                </span>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">District Capitation Fee</span>
                  <span className="font-semibold text-white">₦5,000.00</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Rotaract Africa / Multi-District Dues</span>
                  <span className="font-semibold text-white">₦2,500.00</span>
                </div>
                <div className="flex justify-between py-2 font-bold text-white">
                  <span>Total Cleared</span>
                  <span className="text-[#D4A520]">₦7,500.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
