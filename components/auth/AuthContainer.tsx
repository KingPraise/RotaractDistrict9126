'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ChevronLeft, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';

interface AuthContainerProps {
  initialMode?: 'login' | 'register' | 'forgot';
}

function AuthForm({ initialMode = 'login' }: AuthContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modeParam = searchParams.get('mode');
  
  const computedInitialMode = 
    modeParam === 'register' 
      ? 'register' 
      : modeParam === 'forgot' 
      ? 'forgot' 
      : initialMode;

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(computedInitialMode);

  // Form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const currentMode = searchParams.get('mode');
    if (currentMode === 'register' || currentMode === 'forgot' || currentMode === 'login') {
      setMode(currentMode);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (mode === 'forgot') {
      if (!email) {
        setError('Please enter your email address.');
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setSuccessMessage('A reset link has been sent to your email address.');
      }, 800);
      return;
    }

    if (mode === 'login') {
      if (!email || !password) {
        setError('Please fill in all fields.');
        return;
      }
    } else {
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        setError('Please fill in all fields.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters.');
        return;
      }
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/portal/dashboard');
    }, 800);
  };

  return (
    <div 
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 py-12"
      style={{ background: 'rgb(248, 245, 242)', fontFamily: 'Inter, sans-serif' }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes authEntrance { from { opacity: 0; transform: translateY(1.2rem); } to { opacity: 1; transform: translateY(0); } }
        @keyframes authSlideInRight { from { opacity: 0; transform: translateX(28px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes authSlideInLeft  { from { opacity: 0; transform: translateX(-28px); } to { opacity: 1; transform: translateX(0); } }
      `}} />

      {/* Top Cranberry Accent Strip */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#981132]" />

      {/* Back to site */}
      <Link className="absolute top-6 left-6 flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors z-20 font-medium font-sans" href="/">
        <ChevronLeft size={14} strokeWidth={2} />
        Back to site
      </Link>

      {/* Brand Emblem Lockup */}
      <div 
        className="relative z-10 flex flex-col items-center gap-2 mb-8"
        style={{ animation: '0.6s ease 0s 1 normal both running authEntrance' }}
      >
        <img 
          src="/images/rotaract-logo.png" 
          onError={(e) => { e.currentTarget.src = '/images/rotary-wheel.png'; }}
          alt="Rotaract logo" 
          className="w-14 h-14 object-contain"
        />
        <div className="flex flex-col items-center leading-none gap-0.5 text-center font-sans">
          <span className="text-base font-extrabold tracking-[0.15em] text-[#981132] uppercase">
            Rotaract
          </span>
          <span className="text-[10px] tracking-[0.3em] text-gray-400 uppercase font-semibold">
            District 9126
          </span>
        </div>
      </div>

      {/* Main Auth Card */}
      <div 
        className="relative z-10 w-full max-w-md mx-auto"
        style={{ animation: '0.7s ease 0.1s 1 normal both running authEntrance' }}
      >
        <div 
          className="relative rounded-2xl overflow-hidden bg-white border border-black/[0.08]"
          style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 8px 40px, rgba(0, 0, 0, 0.06) 0px 1px 4px' }}
        >
          {/* Card Top Strip */}
          <div className="h-1 w-full bg-[#981132]" />

          {/* 3-Segment Progress Indicator */}
          <div className="flex px-7 pt-6 gap-1">
            <div 
              className="h-0.5 flex-1 rounded-full transition-all duration-400"
              style={{ background: mode === 'login' ? 'rgb(152, 17, 50)' : 'rgba(0, 0, 0, 0.08)' }}
            />
            <div 
              className="h-0.5 flex-1 rounded-full transition-all duration-400"
              style={{ background: mode === 'register' ? 'rgb(152, 17, 50)' : 'rgba(0, 0, 0, 0.08)' }}
            />
            <div 
              className="h-0.5 flex-1 rounded-full transition-all duration-400"
              style={{ background: mode === 'forgot' ? 'rgb(152, 17, 50)' : 'rgba(0, 0, 0, 0.08)' }}
            />
          </div>

          <div className="overflow-hidden">
            <div 
              key={mode}
              className="px-7 py-6"
              style={{ 
                animation: mode === 'login' 
                  ? '0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) authSlideInLeft' 
                  : '0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) authSlideInRight' 
              }}
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans">
                
                {/* FORGOT PASSWORD HEADER */}
                {mode === 'forgot' ? (
                  <div className="flex flex-col gap-1 mb-1">
                    <button
                      type="button"
                      onClick={() => {
                        setError('');
                        setSuccessMessage('');
                        setMode('login');
                      }}
                      className="flex items-center gap-1.5 mb-3 w-fit text-[#981132] text-xs font-semibold hover:underline cursor-pointer"
                    >
                      <ChevronLeft size={14} strokeWidth={2} />
                      Back to Sign In
                    </button>
                    <h2 className="text-[1.6rem] font-extrabold text-[#111111] tracking-tight leading-tight font-sans">
                      Reset Password
                    </h2>
                    <p className="text-xs text-gray-500 font-sans">
                      Enter your email and we'll send a reset link
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1 mb-1">
                    <h2 className="text-[1.6rem] font-extrabold text-[#111111] tracking-tight leading-tight font-sans">
                      {mode === 'login' ? 'Welcome back' : 'Join the District'}
                    </h2>
                    <p className="text-xs text-gray-500 font-sans">
                      {mode === 'login' 
                        ? 'Sign in to your District 9126 account' 
                        : 'Create your Rotaract District 9126 account'}
                    </p>
                  </div>
                )}

                {/* REGISTER: First & Last Name */}
                {mode === 'register' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold tracking-wide uppercase text-gray-500 font-sans">
                        First Name
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3.5 pointer-events-none text-gray-400">
                          <User size={14} strokeWidth={2} />
                        </span>
                        <input
                          type="text"
                          placeholder="Tunde"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full py-3 text-sm rounded-xl outline-none pl-11 pr-3 bg-[#F8F5F2] border border-black/[0.12] text-[#111111] focus:border-[#981132] focus:bg-white transition-all font-sans"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold tracking-wide uppercase text-gray-500 font-sans">
                        Last Name
                      </label>
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          placeholder="Asante"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full py-3 text-sm rounded-xl outline-none px-4 bg-[#F8F5F2] border border-black/[0.12] text-[#111111] focus:border-[#981132] focus:bg-white transition-all font-sans"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Email Address (Common) */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold tracking-wide uppercase text-gray-500 font-sans">
                    Email address
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 pointer-events-none text-gray-400">
                      <Mail size={15} strokeWidth={2} />
                    </span>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      className="w-full py-3 text-sm rounded-xl outline-none pl-11 pr-4 bg-[#F8F5F2] border border-black/[0.12] text-[#111111] focus:border-[#981132] focus:bg-white transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Password (Login & Register) */}
                {mode !== 'forgot' && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold tracking-wide uppercase text-gray-500 font-sans">
                      Password
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 pointer-events-none text-gray-400">
                        <Lock size={15} strokeWidth={2} />
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder={mode === 'login' ? '••••••••' : 'Min. 8 characters'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                        className="w-full py-3 text-sm rounded-xl outline-none pl-11 pr-11 bg-[#F8F5F2] border border-black/[0.12] text-[#111111] focus:border-[#981132] focus:bg-white transition-all font-sans"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Confirm Password (Register Only) */}
                {mode === 'register' && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold tracking-wide uppercase text-gray-500 font-sans">
                      Confirm Password
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 pointer-events-none text-gray-400">
                        <CheckCircle2 size={15} strokeWidth={2} />
                      </span>
                      <input
                        type="password"
                        placeholder="Repeat password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                        className="w-full py-3 text-sm rounded-xl outline-none pl-11 pr-4 bg-[#F8F5F2] border border-black/[0.12] text-[#111111] focus:border-[#981132] focus:bg-white transition-all font-sans"
                      />
                    </div>
                  </div>
                )}

                {/* Remember Me & Forgot Link (Login Only) */}
                {mode === 'login' && (
                  <div className="flex items-center justify-between">
                    <label 
                      onClick={() => setRememberMe(!rememberMe)}
                      className="flex items-center gap-2 cursor-pointer select-none"
                    >
                      <div 
                        className={`w-4 h-4 rounded flex items-center justify-center transition-all ${
                          rememberMe ? 'bg-[#981132] border-[#981132]' : 'bg-transparent border border-black/20'
                        }`}
                      >
                        {rememberMe && <CheckCircle2 className="text-white" size={12} strokeWidth={3} />}
                      </div>
                      <span className="text-xs text-gray-500 font-sans">Remember me</span>
                    </label>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setError('');
                        setSuccessMessage('');
                        setMode('forgot');
                      }}
                      className="text-xs text-[#981132] hover:underline font-semibold font-sans cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                {/* Alerts */}
                {error && (
                  <p className="text-xs px-3 py-2 rounded-lg text-[#981132] bg-[#981132]/[0.08] border border-[#981132]/20 font-sans">
                    {error}
                  </p>
                )}
                {successMessage && (
                  <p className="text-xs px-3 py-2 rounded-lg text-green-700 bg-green-50 border border-green-200 font-sans">
                    {successMessage}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-full bg-[#981132] hover:bg-[#A70C43] text-white text-[13.5px] font-bold tracking-wide shadow-[0_4px_20px_rgba(152,17,50,0.32)] transition-all mt-1 disabled:opacity-70 font-sans cursor-pointer"
                >
                  {isLoading ? 'Processing…' : (
                    mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Send Reset Link'
                  )}
                  <span className="w-[26px] h-[26px] rounded-full bg-black/35 backdrop-blur-sm inline-flex items-center justify-center border border-white/15 shrink-0">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>

                {/* Divider (Login Only) */}
                {mode === 'login' && (
                  <div className="flex items-center gap-3 my-1">
                    <div className="flex-1 h-px bg-black/[0.08]" />
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-sans">or</span>
                    <div className="flex-1 h-px bg-black/[0.08]" />
                  </div>
                )}

                {/* Mode Switcher */}
                {mode !== 'forgot' && (
                  <p className="text-center text-xs text-gray-500 font-sans">
                    {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                    <button
                      type="button"
                      onClick={() => {
                        setError('');
                        setMode(mode === 'login' ? 'register' : 'login');
                      }}
                      className="font-semibold text-[#981132] hover:underline cursor-pointer"
                    >
                      {mode === 'login' ? 'Create account' : 'Sign In'}
                    </button>
                  </p>
                )}

              </form>
            </div>
          </div>
        </div>

        {/* Legal Notice */}
        <p className="text-center mt-4 text-[10px] text-gray-400 leading-relaxed px-4 font-sans">
          By signing in you agree to the{' '}
          <Link className="text-[#981132] hover:underline font-semibold" href="#">Terms of Service</Link>{' '}
          and{' '}
          <Link className="text-[#981132] hover:underline font-semibold" href="#">Privacy Policy</Link>{' '}
          of Rotaract District 9126.
        </p>
      </div>

      {/* Security Seal */}
      <div 
        className="relative z-10 mt-8 flex items-center gap-1.5 text-gray-400 font-sans"
        style={{ animation: '0.7s ease 0.25s 1 normal both running authEntrance' }}
      >
        <ShieldCheck size={12} strokeWidth={2} />
        <span className="text-[10px] tracking-[0.1em] font-semibold uppercase">
          SECURED · DISTRICT 9126 IDENTITY SYSTEM · TLS 1.3
        </span>
      </div>

    </div>
  );
}

export default function AuthContainer({ initialMode = 'login' }: AuthContainerProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F5F2]" />}>
      <AuthForm initialMode={initialMode} />
    </Suspense>
  );
}
