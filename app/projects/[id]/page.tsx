'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Users, 
  Award, 
  Share2, 
  CheckCircle2, 
  Clock, 
  FileText, 
  DollarSign,
  Heart,
  BookOpen,
  Zap,
  Globe,
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getStoredProjects, ProjectItem } from '@/lib/services/projects-service';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.id as string;
  const [project, setProject] = useState<ProjectItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const allProjects = getStoredProjects();
    const found = allProjects.find(p => p.id === projectId || p.id.toLowerCase() === projectId?.toLowerCase());
    if (found) {
      setProject(found);
    }
    setLoading(false);
  }, [projectId]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F5F2] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#981132] border-t-transparent animate-spin" />
          <p className="text-xs text-black/50 font-semibold">Loading Official Project Dossier...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F8F5F2] flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 max-w-4xl mx-auto px-6 py-32 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-[#981132]/10 text-[#981132] flex items-center justify-center mb-4">
            <FileText size={32} />
          </div>
          <h1 className="text-2xl font-black text-[#1C1C1E] mb-2">Project Dossier Not Found</h1>
          <p className="text-sm text-black/60 max-w-md mb-6">
            The project report you requested is either still under review or may have been updated on the District registry.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#981132] text-white text-xs font-bold shadow-md hover:bg-[#A70C43] transition-all"
          >
            <ArrowLeft size={14} /> Back to Projects Directory
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5F2] text-[#111111] font-sans antialiased selection:bg-[#981132]/20">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24">
        
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold text-black/60 hover:text-[#981132] transition-colors group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to All Projects</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-black/10 text-xs font-semibold text-black/70 hover:bg-black/5 transition-all shadow-xs"
            >
              <Share2 size={13} />
              <span>{copied ? 'Link Copied!' : 'Share Project'}</span>
            </button>
            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#981132]/10 border border-[#981132]/20 text-[#981132]">
              Official District Initiative
            </span>
          </div>
        </div>

        {/* Hero Section Banner with Photo */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-black/[0.08] bg-[#0A0D14] mb-10">
          <div className="relative h-[320px] sm:h-[440px] md:h-[500px] w-full">
            <img
              src={project.image}
              alt={project.title}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1200&h=700&fit=crop&auto=format';
              }}
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/45 to-black/30" />
            
            {/* Top Badges */}
            <div className="absolute top-5 left-5 right-5 flex items-center justify-between flex-wrap gap-2">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase backdrop-blur-md bg-white/20 text-white border border-white/20 shadow-md">
                {project.category}
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md bg-black/60 text-white/90 border border-white/10">
                Rotary Year {project.year}
              </span>
            </div>

            {/* Bottom Hero Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <div className="flex items-center gap-3 text-white/75 text-xs sm:text-sm font-medium mb-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-white">
                  <ShieldCheck className="text-[#D4A520]" size={16} />
                  {project.club}
                </span>
                <span className="text-white/40">·</span>
                <span className="inline-flex items-center gap-1.5 text-white/80">
                  <MapPin className="text-[#D91B5C]" size={14} />
                  {project.location}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight max-w-4xl drop-shadow-md">
                {project.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Dossier Content (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Executive Summary */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.08] shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#981132]">
                <FileText size={16} />
                <span>Executive Summary & Impact Scope</span>
              </div>
              
              <p className="text-base sm:text-lg text-black/80 font-normal leading-relaxed">
                {project.description || 'This strategic project is deployed across District 9126 to create measurable, sustainable community transformation in line with Rotary International Areas of Focus.'}
              </p>
            </div>

            {/* Strategic Pillars & Execution Roadmap */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.08] shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#981132]">
                  <Sparkles size={16} />
                  <span>Strategic Implementation Pillars</span>
                </div>
                <span className="text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                  {project.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4.5 rounded-2xl bg-black/[0.02] border border-black/[0.06] space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#981132]/10 text-[#981132] flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h3 className="text-sm font-bold text-[#1C1C1E]">Needs Assessment & Site Survey</h3>
                  <p className="text-xs text-black/60 leading-relaxed">
                    Rigorous data collection with local community leaders, healthcare centres, and educational institutions to isolate primary priorities.
                  </p>
                </div>

                <div className="p-4.5 rounded-2xl bg-black/[0.02] border border-black/[0.06] space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#981132]/10 text-[#981132] flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h3 className="text-sm font-bold text-[#1C1C1E]">Resource Allocation & Procurement</h3>
                  <p className="text-xs text-black/60 leading-relaxed">
                    Transparent financial deployment adhering to Rotary 4-Way Test standards, ensuring 100% direct project funding efficiency.
                  </p>
                </div>

                <div className="p-4.5 rounded-2xl bg-black/[0.02] border border-black/[0.06] space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#981132]/10 text-[#981132] flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h3 className="text-sm font-bold text-[#1C1C1E]">Execution & Field Deployment</h3>
                  <p className="text-xs text-black/60 leading-relaxed">
                    Mobilizing Rotaractor volunteers, medical personnel, and technical experts to deliver direct humanitarian assistance.
                  </p>
                </div>

                <div className="p-4.5 rounded-2xl bg-black/[0.02] border border-black/[0.06] space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#981132]/10 text-[#981132] flex items-center justify-center font-bold text-xs">
                    04
                  </div>
                  <h3 className="text-sm font-bold text-[#1C1C1E]">Monitoring & Sustainable Handover</h3>
                  <p className="text-xs text-black/60 leading-relaxed">
                    Continuous feedback loops, post-outreach follow-ups, and long-term community stewardship guarantees lasting impact.
                  </p>
                </div>
              </div>
            </div>

            {/* Rotary 4-Way Test Guarantee */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#981132] to-[#750b24] text-white shadow-lg space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-[#D4A520]">
                District 9126 Governance Pledge
              </div>
              <h3 className="text-lg font-black leading-snug">
                The 4-Way Test of the Things We Think, Say or Do
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                1. Is it the TRUTH? · 2. Is it FAIR to all concerned? · 3. Will it build GOODWILL and BETTER FRIENDSHIPS? · 4. Will it be BENEFICIAL to all concerned?
              </p>
            </div>

          </div>

          {/* Sidebar Metrics & Key Details (1 col) */}
          <div className="space-y-6">
            
            {/* Impact Metric Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-black/[0.08] shadow-sm space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                  Target Beneficiaries & Metrics
                </span>
                <div className="text-3xl font-black text-[#D4A520] mt-1">
                  {project.statNumber || '100%'}
                </div>
                <div className="text-xs font-semibold text-black/60">
                  {project.statLabel || 'Project Milestone Reached'}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-black/50">Execution Progress</span>
                  <span className="text-[#981132]">{project.progress || 80}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-black/[0.06] overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-[#981132] transition-all duration-700" 
                    style={{ width: `${project.progress || 80}%` }}
                  />
                </div>
              </div>

              {/* Verified Key Performance Indicators */}
              <div className="pt-4 border-t border-black/[0.06] space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-black/40">
                  Verified Project Telemetry
                </div>
                
                {(project.stats && project.stats.length > 0 ? project.stats : [
                  { icon: 'users', value: project.statNumber || '500+', label: project.statLabel || 'Beneficiaries' },
                  { icon: 'pin', value: project.location, label: 'Location' },
                  { icon: 'zap', value: 'Verified', label: 'Audit Status' }
                ]).map((st, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-black/[0.02] border border-black/[0.04]">
                    <span className="text-xs text-black/60 font-medium">{st.label}</span>
                    <span className="text-xs font-bold text-[#1C1C1E]">{st.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="p-6 rounded-3xl bg-white border border-black/[0.08] shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-black/50">
                District Secretariat Contact
              </h4>
              <p className="text-xs text-black/60 leading-relaxed">
                For partnerships, grants, or media coverage regarding this project, connect directly with the District Directorate.
              </p>
              <Link
                href="/about#contact"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#981132] text-white text-xs font-bold shadow-sm hover:bg-[#A70C43] transition-all mt-2"
              >
                <span>Inquire About Project</span>
                <ChevronRight size={14} />
              </Link>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
