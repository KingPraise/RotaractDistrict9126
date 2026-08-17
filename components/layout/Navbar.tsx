'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, Search, Menu, X } from 'lucide-react';
import GlobalSearch from '@/components/ui/GlobalSearch';

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Clubs', href: '/clubs' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState('About');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Scroll Progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (pathname === '/about') {
      setActiveLink('About');
    } else if (pathname === '/clubs') {
      setActiveLink('Clubs');
    } else if (pathname === '/projects') {
      setActiveLink('Projects');
    } else if (pathname === '/blog') {
      setActiveLink('Blog');
    } else if (pathname === '/heritage') {
      setActiveLink('About');
    } else if (pathname === '/') {
      setActiveLink('');
    }
  }, [pathname]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[2000] w-full h-[110px] px-4 sm:px-8 lg:px-10 bg-white/[0.97] backdrop-blur-[20px] border-b border-black/[0.09] shadow-[0_2px_16px_rgba(0,0,0,0.07)] flex items-center"
      >
        <div className="max-w-[1364px] mx-auto w-full h-full flex items-center justify-between">
          
          {/* Brand Lockup (Left) - Large, Highly Visible Logo Image */}
          <Link href="/" className="flex items-center group py-1 shrink-0">
            <img
              src="/images/rotaract-logo.png"
              alt="Rotaract District 9126 Logo"
              className="h-[100px] sm:h-[110px] w-auto max-h-[120px] object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-md"
            />
          </Link>

          {/* Navigation Links (Center) */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeLink === link.label;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setActiveLink(link.label)}
                  className={`relative py-4 text-[14px] font-medium transition-colors duration-200 ${
                    isActive ? 'text-[#981132] font-bold' : 'text-[#374151] hover:text-[#981132]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#981132] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Items (Right) */}
          <div className="hidden md:flex items-center gap-4 lg:gap-5">
            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-xs text-[#6B7280] border border-black/[0.06] transition-all hover:scale-105"
              title="Search (Ctrl + K)"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="text-[11.5px] font-medium">Search</span>
              <kbd className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded text-slate-500 border border-black/10">
                ⌘K
              </kbd>
            </button>

            {/* Sign In Link */}
            <Link
              href="/login"
              className="text-[13.5px] font-medium text-[#6B7280] hover:text-[#1C1C1E] transition-colors"
            >
              Sign In
            </Link>

            {/* Join a Club Pill Button with Diagonal Arrow Badge */}
            <Link
              href="/join"
              className="bg-[#981132] hover:bg-[#A70C43] active:scale-95 text-white text-[12.5px] font-bold pl-4 pr-2 py-2 rounded-full inline-flex items-center gap-2 shadow-md transition-all duration-200 hover:scale-105 group"
            >
              <span>Join a Club</span>
              <span className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-black/35 border border-white/15 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="h-[11px] w-[11px] text-white" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu & Search Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-lg text-[#374151] hover:bg-black/5"
              aria-label="Open Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 rounded-lg text-[#374151] hover:bg-black/5"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Top Scroll Reading Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#981132] via-[#D91B5C] to-[#D4A520] origin-left"
          style={{ scaleX }}
        />

        {/* Mobile Dropdown */}
        {isMobileOpen && (
          <div className="md:hidden absolute top-[110px] left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-black/10 px-6 py-4 shadow-xl space-y-4">
            <div className="flex flex-col space-y-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    setActiveLink(link.label);
                    setIsMobileOpen(false);
                  }}
                  className={`text-sm py-1.5 ${
                    activeLink === link.label ? 'text-[#981132] font-bold' : 'text-[#374151] font-medium'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-black/10 flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setIsMobileOpen(false)}
                className="text-sm font-medium text-[#6B7280]"
              >
                Sign In to Member Portal
              </Link>
              <Link
                href="/join"
                onClick={() => setIsMobileOpen(false)}
                className="bg-[#981132] text-white text-center text-xs font-bold py-2.5 rounded-full"
              >
                Join a Club ↗
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Command Palette */}
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
