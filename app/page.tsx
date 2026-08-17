import Link from 'next/link';
import { ArrowRight, ShieldCheck, MapPin, Users, Sparkles, HeartHandshake, Award } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#080C14] text-white selection:bg-[#D91B5C] selection:text-white overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#D91B5C]/20 blur-[128px]" />
      <div className="pointer-events-none absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-[#00246C]/30 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-20 left-1/3 h-96 w-96 rounded-full bg-[#F7A81B]/15 blur-[130px]" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#080C14]/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#D91B5C] to-[#F7A81B] font-black text-white shadow-lg shadow-[#D91B5C]/30">
              9126
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white">ROTARACT</span>
              <span className="ml-1.5 text-xs font-semibold uppercase tracking-wider text-[#D91B5C]">
                District 9126
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="#about" className="transition hover:text-[#D91B5C]">About</Link>
            <Link href="#states" className="transition hover:text-[#D91B5C]">Clubs & States</Link>
            <Link href="#impact" className="transition hover:text-[#D91B5C]">Community Impact</Link>
            <Link href="#membership" className="transition hover:text-[#D91B5C]">Join</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="#membership"
              className="rounded-full bg-gradient-to-r from-[#D91B5C] to-[#A70C43] px-5 py-2.5 text-xs md:text-sm font-semibold text-white shadow-md shadow-[#D91B5C]/30 transition hover:brightness-110 active:scale-95"
            >
              Join a Club
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative mx-auto flex max-w-7xl flex-col items-center justify-center px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-md mb-8">
          <Sparkles className="h-3.5 w-3.5 text-[#F7A81B]" />
          <span>Official Portal for Oyo, Osun, Ogun, Ondo & Ekiti States</span>
        </div>

        <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
          Empowering Youth Leaders.{' '}
          <span className="bg-gradient-to-r from-[#D91B5C] via-[#FF4D8D] to-[#F7A81B] bg-clip-text text-transparent">
            Transforming Communities.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base text-slate-400 sm:text-lg">
          Welcome to the digital headquarters of Rotaract District 9126. Discover fellowship, professional
          excellence, and grassroots humanitarian impact across South-West Nigeria.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#membership"
            className="flex items-center gap-2 rounded-xl bg-[#D91B5C] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#D91B5C]/40 transition hover:bg-[#A70C43] active:scale-95"
          >
            <span>Become a Rotaractor</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#states"
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-md transition hover:bg-white/10 hover:border-white/25 active:scale-95"
          >
            <MapPin className="h-4 w-4 text-[#F7A81B]" />
            <span>Find Nearest Club</span>
          </Link>
        </div>

        {/* Key Metrics Grid */}
        <div className="mt-20 grid w-full grid-cols-2 gap-4 sm:grid-cols-4 md:gap-6">
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="text-3xl font-extrabold text-[#D91B5C] sm:text-4xl">5</div>
            <div className="mt-1 text-xs sm:text-sm font-medium text-slate-400">States Covered</div>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="text-3xl font-extrabold text-[#F7A81B] sm:text-4xl">50+</div>
            <div className="mt-1 text-xs sm:text-sm font-medium text-slate-400">Active Clubs</div>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="text-3xl font-extrabold text-[#16A34A] sm:text-4xl">2,000+</div>
            <div className="mt-1 text-xs sm:text-sm font-medium text-slate-400">Passionate Members</div>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="text-3xl font-extrabold text-blue-400 sm:text-4xl">100+</div>
            <div className="mt-1 text-xs sm:text-sm font-medium text-slate-400">Annual Projects</div>
          </div>
        </div>
      </section>

      {/* District Coverage Section */}
      <section id="states" className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">District 9126 Jurisdiction</h2>
          <p className="mt-2 text-sm text-slate-400">Connecting changemakers across five South-Western Nigerian states</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {['Oyo', 'Osun', 'Ogun', 'Ondo', 'Ekiti'].map((state) => (
            <div
              key={state}
              className="glass-card rounded-2xl p-5 text-center flex flex-col items-center justify-between"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-[#F7A81B] mb-3">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">{state} State</h3>
              <span className="mt-2 text-xs font-semibold text-[#D91B5C] bg-[#D91B5C]/10 px-3 py-1 rounded-full">
                Active Zone
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars Section */}
      <section id="about" className="relative mx-auto max-w-7xl px-6 py-20 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card rounded-2xl p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D91B5C]/10 text-[#D91B5C] mb-5">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Fellowship & Networking</h3>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              Connect with ambitious young professionals, entrepreneurs, and students who share a passion for making a difference.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7A81B]/10 text-[#F7A81B] mb-5">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Leadership Development</h3>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              Gain executive skills, project management experience, and public speaking confidence through district programs.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#16A34A]/10 text-[#16A34A] mb-5">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Service Above Self</h3>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              Execute high-impact community projects addressing maternal health, education, clean water, and economic empowerment.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#06080E] py-12 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Rotaract District 9126 Nigeria. All Rights Reserved.</p>
          <div className="flex items-center gap-6 text-slate-400">
            <Link href="https://rotaractdistrict9126.com.ng" className="hover:text-white transition">
              rotaractdistrict9126.com.ng
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
