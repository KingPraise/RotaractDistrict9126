import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Mail, Phone, MapPin, ChevronRight, ArrowLeft, MessageSquare, Building2, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact District Secretariat',
  description: 'Connect with Rotaract District 9126 Secretariat, Zonal Coordinators, and District Leadership across 7 Nigerian States.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8F5F2] pt-[104px] pb-20 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-4xl mx-auto">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#981132] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-[#1C1C1E] font-medium">Contact Secretariat</span>
          </div>

          {/* Header Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-black/[0.08] shadow-sm mb-8 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-[#981132]/10 text-[#981132] flex items-center justify-center mb-5">
              <Mail size={26} />
            </div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#981132] mb-2">
              Get in Touch
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#1C1C1E] tracking-tight mb-4">
              District Secretariat & Inquiries
            </h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              Connect directly with the District Rotaract Representative (DRR), District Executive Committee, or Zonal Coordinators across Oyo, Osun, Ondo, Ekiti, Kwara, Kogi, and Niger states.
            </p>
          </div>

          {/* Contact Direct Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            
            {/* Email Card */}
            <div className="bg-white rounded-3xl p-7 border border-black/[0.08] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#981132]/10 text-[#981132] flex items-center justify-center mb-4">
                  <Mail size={20} />
                </div>
                <h3 className="font-bold text-lg text-[#1C1C1E] mb-1">Official Secretariat Email</h3>
                <p className="text-xs text-gray-500 mb-4">
                  For formal communications, partnership proposals, sponsorships, and district administrative requests.
                </p>
              </div>
              <a
                href="mailto:secretariat@rotaractdistrict9126.com.ng"
                className="text-sm font-bold text-[#981132] hover:underline break-all"
              >
                secretariat@rotaractdistrict9126.com.ng
              </a>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white rounded-3xl p-7 border border-black/[0.08] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center mb-4">
                  <Phone size={20} />
                </div>
                <h3 className="font-bold text-lg text-[#1C1C1E] mb-1">WhatsApp Quick Desk</h3>
                <p className="text-xs text-gray-500 mb-4">
                  Fast support for prospective members, club presidents, dues confirmation, and event registration inquiries.
                </p>
              </div>
              <a
                href="https://wa.me/2348130009126"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-600 hover:bg-green-700 text-white text-xs font-bold w-fit shadow-sm transition-all"
              >
                <MessageSquare size={14} />
                <span>Chat with Secretariat (+234 813 000 9126)</span>
              </a>
            </div>

          </div>

          {/* Physical Secretariat & Coverage */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-black/[0.08] shadow-sm mb-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#D4A520]/15 text-[#D4A520] flex items-center justify-center shrink-0 mt-1">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#1C1C1E] mb-1">District Secretariat Location</h3>
                <p className="text-sm text-gray-600">
                  Rotaract District 9126 Secretariat, Ibadan, Oyo State, Nigeria.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Operating jurisdiction encompassing South-West and North-Central Nigeria.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-black/[0.06]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#981132] mb-4">
                Constituent States & Zonal Delegations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-gray-50 border border-black/[0.05]">
                  <span className="text-xs font-bold text-[#981132] block mb-1">Zone 1</span>
                  <span className="text-sm font-semibold text-[#1C1C1E] block">Oyo & Osun</span>
                  <span className="text-xs text-gray-500">32 Chartered Clubs</span>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 border border-black/[0.05]">
                  <span className="text-xs font-bold text-[#981132] block mb-1">Zone 2</span>
                  <span className="text-sm font-semibold text-[#1C1C1E] block">Ondo & Ekiti</span>
                  <span className="text-xs text-gray-500">22 Chartered Clubs</span>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 border border-black/[0.05]">
                  <span className="text-xs font-bold text-[#981132] block mb-1">Zone 3</span>
                  <span className="text-sm font-semibold text-[#1C1C1E] block">Kwara, Kogi & Niger</span>
                  <span className="text-xs text-gray-500">24 Chartered Clubs</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-6 border-t border-black/[0.06] flex flex-col sm:flex-row gap-3">
              <Link
                href="/clubs"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#981132] hover:bg-[#A70C43] text-white text-xs font-bold transition-all"
              >
                <Building2 size={14} />
                <span>Find Your Local Club Directory</span>
              </Link>
              <Link
                href="/join"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-black/[0.04] text-[#1C1C1E] border border-black/10 text-xs font-bold transition-all"
              >
                <Users size={14} />
                <span>Submit Membership Application</span>
              </Link>
            </div>
          </div>

          {/* Bottom Back Button */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#981132] hover:underline"
            >
              <ArrowLeft size={16} />
              <span>Return to District Homepage</span>
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
