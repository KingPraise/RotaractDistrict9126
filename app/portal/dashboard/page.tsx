'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
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

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-[130px] sm:pt-[150px] pb-12">
        {/* Welcome Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
        >
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
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Digital ID Card Preview (Figma Frame 5:7980) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 flex flex-col items-center"
          >
            <motion.div 
              whileHover={{ y: -4, rotateY: 2 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md bg-gradient-to-br from-[#1E1B4B] via-[#0F1624] to-[#312E81] rounded-[24px] p-6 sm:p-8 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden"
            >
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

              {/* Verified QR + Rotary ID Details */}
              <div className="flex items-center justify-between bg-black/40 rounded-2xl p-4 border border-white/10 relative z-10">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Rotary Member ID</div>
                  <div className="text-sm font-mono font-bold text-white tracking-widest">{member.rotaryId}</div>

                  <div className="mt-2 text-[10px] uppercase font-bold text-slate-400">Verification Seal</div>
                  <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>District Active · 2026/2027</span>
                  </div>
                </div>

                {qrCodeUrl ? (
                  <div className="p-1.5 bg-white rounded-xl shadow-md shrink-0">
                    <img src={qrCodeUrl} alt="Verified Member QR Code" className="h-16 w-16 object-contain" />
                  </div>
                ) : (
                  <div className="h-16 w-16 bg-white/10 rounded-xl flex items-center justify-center">
                    <QrCode className="h-8 w-8 text-slate-500" />
                  </div>
                )}
              </div>

              {/* Security Strip */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[9px] text-slate-500 relative z-10">
                <span>AUTHENTICATED VIA ROTARY INTERNATIONAL D9126</span>
                <span className="font-mono">TLS 1.3 · VERIFIED</span>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 mt-6 w-full max-w-md">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs flex items-center justify-center gap-2 transition"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Save ID Card</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-3 rounded-xl bg-[#D91B5C]/15 hover:bg-[#D91B5C]/25 border border-[#D91B5C]/30 text-rose-300 font-semibold text-xs flex items-center justify-center gap-2 transition"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>Share Credential</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Membership Details & Rotary Toolkit */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Status Card */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10">
              <h2 className="text-base font-bold text-white mb-4">Membership Credentials & Dues</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs text-slate-400">Club Association</div>
                  <div className="text-sm font-bold text-white mt-1">RC Ibadan Ring Road</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Chartered 2012 · Zone 3</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs text-slate-400">Annual District Dues</div>
                  <div className="text-sm font-bold text-emerald-400 mt-1">₦5,000 (Paid & Verified)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Valid through June 30, 2027</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs text-slate-400">Rotary Designation</div>
                  <div className="text-sm font-bold text-[#D4A520] mt-1">
                    <FormatRotaryText text="Active Rtr. & PHF Contributor" />
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">District Committee Member</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs text-slate-400">Leadership Access</div>
                  <div className="text-sm font-bold text-white mt-1">General Member</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Verified District Portal User</div>
                </div>
              </div>
            </div>

            {/* Rotary Acronyms & Toolkit Guide */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10">
              <h3 className="text-sm font-bold text-white mb-2">Rotary Acronym Quick Guide</h3>
              <p className="text-xs text-slate-400 mb-4">
                Hover over highlighted terms across the site for instant rotary definitions.
              </p>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5">
                  <span className="font-semibold text-white"><FormatRotaryText text="DRR" /></span>
                  <span className="text-slate-400">District Rotaract Representative</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5">
                  <span className="font-semibold text-white"><FormatRotaryText text="AG" /></span>
                  <span className="text-slate-400">Assistant Governor</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5">
                  <span className="font-semibold text-white"><FormatRotaryText text="PHF" /></span>
                  <span className="text-slate-400">Paul Harris Fellow</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
