'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: 'rgb(152, 17, 50)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Top Gradient Border */}
      <div 
        style={{ 
          height: '1px', 
          width: '100%', 
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25) 30%, rgba(255, 255, 255, 0.25) 70%, transparent)' 
        }} 
      />
      
      {/* Bottom Radial Shadow Glow */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ background: 'radial-gradient(80% 100% at 50% 100%, rgba(0, 0, 0, 0.18) 0%, transparent 70%)' }} 
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Brand Lockup (Left) - Highly Visible Image Alone */}
          <Link href="/" className="flex items-center bg-transparent border-none cursor-pointer group py-1">
            <img 
              src="/images/rotary-wheel.png" 
              alt="Rotaract District 9126 logo" 
              className="h-14 sm:h-16 w-auto max-h-[64px] object-contain shrink-0 transition-transform duration-300 group-hover:scale-105 filter drop-shadow-md brightness-105" 
            />
          </Link>

          {/* Navigation Links (Center) */}
          <div className="flex items-center gap-5 flex-wrap justify-center font-sans">
            <Link href="/" className="transition-colors duration-200 hover:text-white" style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)' }}>Homepage</Link>
            <Link href="/clubs" className="transition-colors duration-200 hover:text-white" style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)' }}>Clubs</Link>
            <Link href="/projects" className="transition-colors duration-200 hover:text-white" style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)' }}>Projects</Link>
            <Link href="/heritage" className="transition-colors duration-200 hover:text-white" style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)' }}>Blog</Link>
            
            {/* Vertical Divider */}
            <div style={{ width: '1px', height: '14px', background: 'rgba(255, 255, 255, 0.25)' }} />
            
            <Link href="/privacy" className="transition-colors duration-200 hover:text-white" style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)' }}>Privacy</Link>
            <Link href="/terms" className="transition-colors duration-200 hover:text-white" style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)' }}>Terms</Link>
            <Link href="/contact" className="transition-colors duration-200 hover:text-white" style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)' }}>Contact</Link>
          </div>

          {/* Copyright (Right) */}
          <p className="font-sans m-0" style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.5)' }}>
            © 2026 Rotaract District 9126
          </p>

        </div>
      </div>
    </footer>
  );
}
