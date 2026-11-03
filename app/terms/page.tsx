import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { FileText, ChevronRight, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service, Rotary Four-Way Test adherence, and District Bylaws for Rotaract District 9126 Nigeria.',
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8F5F2] pt-[104px] pb-20 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-4xl mx-auto">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#981132] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-[#1C1C1E] font-medium">Terms of Service</span>
          </div>

          {/* Header Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-black/[0.08] shadow-sm mb-8 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-[#D4A520]/15 text-[#D4A520] flex items-center justify-center mb-5">
              <FileText size={26} />
            </div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#981132] mb-2">
              District Bylaws & Policies
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#1C1C1E] tracking-tight mb-4">
              Terms of Service & Code of Ethics
            </h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              Governing use of the digital platform, member portal authentication, and district administrative services across Rotaract District 9126.
            </p>
            <div className="text-xs text-gray-400 mt-4">
              Rotary Year 2026/2027 · Standard District Operating Framework
            </div>
          </div>

          {/* Policy Content */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-black/[0.08] shadow-sm space-y-8 text-sm sm:text-base text-[#2C2C2E] leading-relaxed">
            
            {/* The Four-Way Test Callout */}
            <div className="p-6 rounded-2xl bg-[#D4A520]/10 border border-[#D4A520]/30 space-y-3">
              <h3 className="text-base font-bold text-amber-900 uppercase tracking-wider">
                The Rotary Four-Way Test
              </h3>
              <p className="text-xs sm:text-sm text-gray-700">
                Of the things we think, say or do:
              </p>
              <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm font-semibold text-[#1C1C1E]">
                <li>Is it the TRUTH?</li>
                <li>Is it FAIR to all concerned?</li>
                <li>Will it build GOODWILL and BETTER FRIENDSHIPS?</li>
                <li>Will it be BENEFICIAL to all concerned?</li>
              </ol>
            </div>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#1C1C1E]">1. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By browsing the District 9126 digital portal, registering for an account, or interacting with club listings, you agree to comply with these terms, the Rotary International Code of Policies, and applicable Nigerian laws.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#1C1C1E]">2. Member Portal Conduct & Security</h2>
              <p className="text-gray-600">
                Authorized officers (Presidents, Secretaries, District Committee Chairs) must maintain the confidentiality of login credentials. Unlawful extraction of member contact databases or misuse of administrative capabilities is strictly prohibited and results in immediate charter review.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#1C1C1E]">3. Dues & Online Payments via Paystack</h2>
              <p className="text-gray-600">
                Statutory district capitations, conference registration fees, and project donations paid through our Paystack payment gateway are statutory remittances dedicated to youth leadership summits, official operations, and humanitarian service drives. Payments are non-refundable once receipted and verified by the District Treasurer.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#1C1C1E]">4. Intellectual Property & Brand Marks</h2>
              <p className="text-gray-600">
                The Rotaract emblem, District 9126 insignia, and custom media assets are protected trademarks. Use of district visual assets must adhere to official Rotary International Brand Center guidelines.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#1C1C1E]">5. Inquiries & Governance</h2>
              <p className="text-gray-600">
                For questions regarding governance or to report violations, please contact the District Legal & Secretariat Committee at <a href="mailto:secretariat@rotaractdistrict9126.com.ng" className="text-[#981132] font-semibold hover:underline">secretariat@rotaractdistrict9126.com.ng</a>.
              </p>
            </section>

          </div>

          {/* Bottom Back Button */}
          <div className="mt-8 text-center">
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
