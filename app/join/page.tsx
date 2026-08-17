'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { submitProspectLead } from '@/actions/prospects';
import { DistrictState, ProspectInput } from '@/types';
import { Sparkles, Send, CheckCircle2, AlertCircle, HeartHandshake, Users, ShieldCheck, ArrowRight, Building2 } from 'lucide-react';
import Link from 'next/link';

const CLUBS_BY_STATE: Record<DistrictState, { id: string; name: string }[]> = {
  Oyo: [
    { id: 'club-ibadan-ring-road', name: 'RC Ibadan Ring Road' },
    { id: 'club-ui-ibadan', name: 'RC University of Ibadan' },
    { id: 'club-lead-city-univ', name: 'RC Lead City University Ibadan' },
    { id: 'club-the-poly-ibadan', name: 'RC The Polytechnic Ibadan' },
    { id: 'club-uch-ibadan', name: 'RC University College Hospital, Ibadan' },
    { id: 'club-fca-ibadan', name: 'RC Federal College of Agriculture, Ibadan' },
    { id: 'club-fcc-ibadan', name: 'RC Federal Cooperative College Ibadan' },
    { id: 'club-fss-oyo', name: 'RC Federal School of Surveying, Oyo' },
    { id: 'club-tech-u-ibadan', name: 'RC First Technical University Ibadan' },
    { id: 'club-ibadan-akobo', name: 'RC Ibadan Akobo' },
    { id: 'club-ibadan-ologuneru', name: 'RC Ibadan Ologuneru' },
    { id: 'club-ibadan-oritamefa', name: 'RC Ibadan-Oritamefa' },
    { id: 'club-felele', name: 'RC Felele' },
    { id: 'club-moor-plantation', name: 'RC Moor Plantation' },
    { id: 'club-oyo-central', name: 'RC Oyo Central' },
    { id: 'club-iseyin-pathfinder', name: 'RC Iseyin Pathfinder' },
    { id: 'club-ibarapa-poly-eruwa', name: 'RC Ibarapa Polytechnic, Eruwa Campus' },
    { id: 'club-lautech-ogbomoso', name: 'RC Lautech' },
    { id: 'club-atiba-university', name: 'RC Atiba University' },
    { id: 'club-adecom-college', name: 'RC Adecom College' },
    { id: 'club-highland-college', name: 'RC Highland College of Technology' },
    { id: 'club-eclub-ibadan-pacesetter', name: 'RC E-Club of Ibadan Pacesetter' },
  ],
  Osun: [
    { id: 'club-osogbo', name: 'RC Osogbo' },
    { id: 'club-osogbo-central', name: 'RC Osogbo Central' },
    { id: 'club-uniosun-osogbo', name: 'RC Osun State University Osogbo Campus' },
    { id: 'club-fountain-univ', name: 'RC Fountain University, Osogbo' },
    { id: 'club-lautech-th-osogbo', name: 'RC Lautech Teaching Hospital Osogbo' },
    { id: 'club-oau-ile-ife-1', name: 'RC OAU Ile-Ife' },
    { id: 'club-oau-ile-ife-2', name: 'RC Obafemi Awolowo University, Ile-Ife' },
    { id: 'club-ede-cb', name: 'RC Ede Community Based' },
    { id: 'club-fed-poly-ede', name: 'RC Federal Polytechnic Ede' },
    { id: 'club-harvard-poly', name: 'RC Harvard Polytechnic' },
    { id: 'club-ikirun', name: 'RC Ikirun' },
    { id: 'club-ila-orangun-cb', name: 'RC Ila Orangun CB' },
    { id: 'club-iragbiji-cb', name: 'RC Iragbiji CB' },
    { id: 'club-iwo-cb', name: 'RC Iwo Community Based' },
    { id: 'club-modakeke', name: 'RC Modakeke' },
    { id: 'club-oyan', name: 'RC Oyan' },
    { id: 'club-uniosun-ipetu-ilesa', name: 'RC University of Osun State Ipetu-Ilesa' },
    { id: 'club-mm-college-health', name: 'RC Margaret Mosunmola College of Health Science' },
  ],
  Ondo: [
    { id: 'club-akure', name: 'RC Akure' },
    { id: 'club-futa-akure', name: 'RC Federal University of Technology Akure' },
    { id: 'club-aaua-akungba', name: 'RC Adekunle Ajasin University' },
    { id: 'club-adeyemi-univ-ondo', name: 'RC Adeyemi Federal University of Education, Ondo' },
    { id: 'club-ondo-city', name: 'RC Ondo City' },
  ],
  Ekiti: [
    { id: 'club-abuad-ado-ekiti', name: 'RC ABUAD' },
    { id: 'club-eksu-ado-ekiti', name: 'RC Ekiti State University' },
    { id: 'club-fed-poly-ado', name: 'RC Federal Polytechnic CEC Ado-Ekiti' },
    { id: 'club-fuoye-ekiti', name: 'RC Federal University, Oye-Ekiti' },
    { id: 'club-espahms-ijero', name: 'RC ESPAHMS Ijero' },
    { id: 'club-school-health-tech', name: 'RC School of Health Technology' },
  ],
  Kwara: [
    { id: 'club-ilorin', name: 'RC Ilorin' },
    { id: 'club-ilorin-metro', name: 'RC Ilorin Metro' },
    { id: 'club-ilorin-gra', name: 'RC Ilorin GRA' },
    { id: 'club-ilorin-golden', name: 'RC Ilorin Golden' },
    { id: 'club-ilorin-new-dawn', name: 'RC Ilorin New Dawn' },
    { id: 'club-ilorin-fate-neighbourhood', name: 'RC Ilorin Fate Neighbourhood Community Base' },
    { id: 'club-unilorin-campus', name: 'RC University of Ilorin' },
    { id: 'club-nursing-ilorin', name: 'RC College of Nursing and Midwifery, Ilorin' },
    { id: 'club-nursing-uith', name: 'RC College of Nursing Sciences (UITH)' },
    { id: 'club-offa-metro', name: 'RC Offa Metropolitan' },
  ],
  Niger: [
    { id: 'club-minna-central', name: 'RC Minna Central' },
    { id: 'club-futminna-bosso', name: 'RC FUTMinna' },
  ],
  Kogi: [
    { id: 'club-lokoja-cb', name: 'RC Lokoja CB' },
    { id: 'club-ful-lokoja', name: 'RC Federal University Lokoja' },
    { id: 'club-kogi-poly-lokoja', name: 'RC Kogi State Polytechnic Lokoja' },
    { id: 'club-ankpa-central', name: 'RC Ankpa Central' },
    { id: 'club-ankpa-cb', name: 'RC Ankpa Community Base' },
    { id: 'club-alhikma-ankpa', name: 'RC Alhikma C.O.E. Ankpa' },
    { id: 'club-idah-cb', name: 'RC Idah Community Base' },
    { id: 'club-dekina-cb', name: 'RC Dekina Community Base' },
    { id: 'club-ugwolawo-cb', name: 'RC Ugwolawo C.B.' },
  ],
  'E-Club / Multi-State': [
    { id: 'club-eclub-mighty', name: 'RC E-Club Mighty' },
    { id: 'club-eclub-greater-nigeria', name: 'RC E-Club of Greater Nigeria' },
    { id: 'club-eclub-greater-ng-golden', name: 'RC E-Club of Greater Nigeria Golden' },
    { id: 'club-eclub-harmony', name: 'RC E-Club of Harmony' },
    { id: 'club-eclub-ng-new-dawn', name: 'RC E-Club of Nigeria New Dawn' },
    { id: 'club-eclub-one-nigeria', name: 'RC E-Club of One Nigeria' },
    { id: 'club-eclub-peace-nigeria', name: 'RC E-Club of Peace Nigeria' },
  ],
};

function JoinContent() {
  const searchParams = useSearchParams();
  const clubQuery = searchParams.get('club') || '';

  const [formData, setFormData] = useState<ProspectInput>({
    fullName: '',
    email: '',
    phone: '',
    preferredState: 'Oyo',
    assignedClubId: 'club-ibadan-ring-road',
    notes: '',
  });

  const [matchedClubName, setMatchedClubName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  // Sync with ?club=... URL query parameter
  useEffect(() => {
    if (!clubQuery) return;

    // Look for matching club name across all states
    let found = false;
    for (const [state, clubs] of Object.entries(CLUBS_BY_STATE)) {
      const match = clubs.find(
        (c) => c.name.toLowerCase() === clubQuery.toLowerCase() ||
               c.name.toLowerCase().includes(clubQuery.toLowerCase()) ||
               c.id.toLowerCase() === clubQuery.toLowerCase()
      );
      if (match) {
        setFormData((prev) => ({
          ...prev,
          preferredState: state as DistrictState,
          assignedClubId: match.id,
        }));
        setMatchedClubName(match.name);
        found = true;
        break;
      }
    }

    if (!found) {
      setMatchedClubName(clubQuery);
    }
  }, [clubQuery]);

  const handleStateChange = (state: DistrictState) => {
    const defaultClub = CLUBS_BY_STATE[state]?.[0]?.id || '';
    setFormData((prev) => ({
      ...prev,
      preferredState: state,
      assignedClubId: defaultClub,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const result = await submitProspectLead(formData);
      if (result.success) {
        setSubmitResult({
          success: true,
          message: 'Welcome to Rotaract District 9126! Your interest has been received and routed to your club leadership. An alert has been dispatched to district administration.',
        });
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          preferredState: 'Oyo',
          assignedClubId: 'club-ibadan-ring-road',
          notes: '',
        });
      } else {
        setSubmitResult({
          success: false,
          message: result.error || 'Failed to submit form. Please try again.',
        });
      }
    } catch {
      setSubmitResult({
        success: false,
        message: 'An unexpected network error occurred. Please check your connection.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Value Proposition */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D91B5C]/10 border border-[#D91B5C]/20 text-[#D91B5C] text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Membership Intake 2026/2027</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Begin Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D91B5C] via-[#FF4D8D] to-[#D4A520]">
              Leadership Journey.
            </span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Join 700+ young leaders across 77 active clubs spanning Osun, Oyo, Ondo, Ekiti, Kwara, Niger, and Kogi states.
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-xl bg-white/5 flex items-center justify-center text-[#D91B5C] shrink-0">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">7 Constituent States Network</h4>
                <p className="text-xs text-slate-400 mt-0.5">Lifelong professional connections across South-West and North-Central zones.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-xl bg-white/5 flex items-center justify-center text-[#D4A520] shrink-0">
                <HeartHandshake className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Grassroots Humanitarian Service</h4>
                <p className="text-xs text-slate-400 mt-0.5">Direct involvement in water, health, and education community projects.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Digital Rotary Credentialing</h4>
                <p className="text-xs text-slate-400 mt-0.5">Official digital identity cards with dynamic QR verification.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Lead Capture Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/15 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 h-48 w-48 bg-[#D91B5C]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Form Title & Preselected Club Banner */}
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Prospective Member Registration</h2>
              <p className="text-xs text-slate-400 mt-1">Complete your profile to be paired with a local club president.</p>
              
              {matchedClubName && (
                <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#981132]/25 border border-[#981132]/50 text-rose-200 text-xs font-semibold">
                  <Building2 className="h-3.5 w-3.5 text-[#D91B5C]" />
                  <span>Selected Club: <strong className="text-white font-bold">{matchedClubName}</strong></span>
                </div>
              )}
            </div>

            {submitResult && (
              <div
                className={`p-4 rounded-2xl mb-6 text-xs flex items-start gap-3 ${
                  submitResult.success
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
                }`}
              >
                {submitResult.success ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                ) : (
                  <AlertCircle className="h-5 w-5 shrink-0 text-rose-400" />
                )}
                <div>
                  <p className="font-semibold">{submitResult.success ? 'Success!' : 'Submission Error'}</p>
                  <p className="mt-0.5 opacity-90">{submitResult.message}</p>
                  {submitResult.success && (
                    <Link
                      href="/clubs"
                      className="inline-flex items-center gap-1.5 text-white font-bold underline mt-2 hover:text-[#D4A520]"
                    >
                      <span>Browse club meeting locations</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name <span className="text-[#D91B5C]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Oluwaseun Adeleke"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D91B5C] focus:ring-1 focus:ring-[#D91B5C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email Address <span className="text-[#D91B5C]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D91B5C] focus:ring-1 focus:ring-[#D91B5C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Phone Number (WhatsApp) <span className="text-[#D91B5C]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +234 801 234 5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D91B5C] focus:ring-1 focus:ring-[#D91B5C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Constituent State <span className="text-[#D91B5C]">*</span>
                  </label>
                  <select
                    value={formData.preferredState}
                    onChange={(e) => handleStateChange(e.target.value as DistrictState)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0F1420] border border-white/10 text-xs text-white focus:outline-none focus:border-[#D91B5C]"
                  >
                    <option value="Oyo">Oyo State (South-West)</option>
                    <option value="Osun">Osun State (South-West)</option>
                    <option value="Ondo">Ondo State (South-West)</option>
                    <option value="Ekiti">Ekiti State (South-West)</option>
                    <option value="Kwara">Kwara State (North-Central)</option>
                    <option value="Niger">Niger State (North-Central)</option>
                    <option value="Kogi">Kogi State (North-Central)</option>
                    <option value="E-Club / Multi-State">E-Club / Multi-State (Virtual)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Select Desired Club <span className="text-[#D91B5C]">*</span>
                  </label>
                  <select
                    value={formData.assignedClubId}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      setFormData({ ...formData, assignedClubId: selectedId });
                      const currentClubs = CLUBS_BY_STATE[formData.preferredState] || [];
                      const clubObj = currentClubs.find((c) => c.id === selectedId);
                      if (clubObj) setMatchedClubName(clubObj.name);
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-[#0F1420] border border-white/10 text-xs text-white focus:outline-none focus:border-[#D91B5C]"
                  >
                    {formData.preferredState &&
                      CLUBS_BY_STATE[formData.preferredState]?.map((club) => (
                        <option key={club.id} value={club.id}>
                          {club.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Profession, Interests or Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your background, occupation, or what inspired you to join..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D91B5C] focus:ring-1 focus:ring-[#D91B5C] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-[#D91B5C] to-[#A70C43] hover:brightness-110 active:scale-[0.99] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#D91B5C]/30 flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Submitting Application...</span>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Submit Membership Interest</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-[#080C14] text-white flex flex-col selection:bg-[#D91B5C] selection:text-white">
      <Navbar />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center min-h-[60vh] text-slate-500 text-xs">Loading membership portal…</div>}>
        <JoinContent />
      </Suspense>
      <Footer />
    </div>
  );
}
