import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ShieldCheck, ChevronRight, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Rotaract District 9126 Nigeria Data Privacy Commitment and NDPR Compliance Statement.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8F5F2] pt-[104px] pb-20 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-4xl mx-auto">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#981132] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-[#1C1C1E] font-medium">Privacy Policy</span>
          </div>

          {/* Header Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-black/[0.08] shadow-sm mb-8 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-[#981132]/10 text-[#981132] flex items-center justify-center mb-5">
              <ShieldCheck size={26} />
            </div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#981132] mb-2">
              Legal & Compliance
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#1C1C1E] tracking-tight mb-4">
              District Privacy Policy
            </h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              How Rotaract District 9126 collects, uses, and safeguards the personal data of prospective members, club presidents, executives, and website visitors across Nigeria.
            </p>
            <div className="text-xs text-gray-400 mt-4">
              Effective Date: Rotary Year 2026/2027 · Last Updated: November 2026
            </div>
          </div>

          {/* Policy Content */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-black/[0.08] shadow-sm space-y-8 text-sm sm:text-base text-[#2C2C2E] leading-relaxed">
            
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#1C1C1E]">1. Overview & NDPR Commitment</h2>
              <p className="text-gray-600">
                Rotaract District 9126 (“we”, “our”, or “the District”) operates the digital platform uniting 78 chartered clubs across Oyo, Osun, Ondo, Ekiti, Kwara, Kogi, and Niger states. We adhere strictly to the Nigeria Data Protection Regulation (NDPR) and the Nigeria Data Protection Act (NDPA).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#1C1C1E]">2. Information We Collect</h2>
              <p className="text-gray-600">We collect information to facilitate membership intake, capitation dues clearance, and humanitarian project coordination:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li><strong>Prospective Member Intake:</strong> Full name, email address, WhatsApp/phone number, state of residence, and preferred club assignment.</li>
                <li><strong>Club Dues & Verification:</strong> Member names, Rotary Club IDs, transaction receipts, and Paystack reference tokens.</li>
                <li><strong>Newsletter & Communications:</strong> Email address provided during subscription for bi-weekly district publications.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#1C1C1E]">3. Purpose & Legal Basis of Processing</h2>
              <p className="text-gray-600">
                Your data is used strictly for legitimate District operations: introducing candidates to local clubs, issuing official capitations clearance badges, managing leadership summit registrations, and responding to inquiries. We do not sell or lease personal data.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#1C1C1E]">4. Data Storage & Security Safeguards</h2>
              <p className="text-gray-600">
                All records are stored on secure Google Cloud Firestore infrastructure with encrypted server-side token enforcement. Access is restricted to authorized District Secretariat officers and Club Presidents under strict non-disclosure obligations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#1C1C1E]">5. Your Data Protection Rights</h2>
              <p className="text-gray-600">
                Under Nigerian privacy legislation, you have the right to request access to your records, rectify inaccurate data, or withdraw consent and request data deletion. Contact the District Data Privacy Officer at <a href="mailto:secretariat@rotaractdistrict9126.com.ng" className="text-[#981132] font-semibold hover:underline">secretariat@rotaractdistrict9126.com.ng</a>.
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
