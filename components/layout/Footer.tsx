'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: 'rgba(37, 34, 35, 1)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Top Gradient Border */}
      <div 
        style={{ 
          height: '1px', 
          width: '100%', 
          background: 'linear-gradient(90deg, transparent, rgba(11, 10, 10, 0.04) 30%, rgba(255, 255, 255, 0.25) 70%, transparent)' 
        }} 
      />
      
      {/* Bottom Radial Shadow Glow */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ background: 'rgb(152, 17, 50)' }} 
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Brand Lockup (Left) */}
          <Link href="/" className="flex items-center bg-transparent border-none cursor-pointer group py-1">
            <img 
              src="/images/Rotaract-Simple_Black.png" 
              alt="Rotaract District 9126 logo" 
              className="h-[65px] sm:h-[75px] w-auto max-h-[85px] object-contain shrink-0 transition-transform duration-300 group-hover:scale-105 filter drop-shadow-md brightness-0 invert" 
            />
          </Link>

          {/* Navigation Links (Center) */}
          <div className="flex items-center gap-5 flex-wrap justify-center font-sans">
            <Link href="/" className="transition-colors duration-200 hover:text-white" style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.75)' }}>Homepage</Link>
            <Link href="/clubs" className="transition-colors duration-200 hover:text-white" style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.75)' }}>Clubs</Link>
            <Link href="/projects" className="transition-colors duration-200 hover:text-white" style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.75)' }}>Projects</Link>
            <Link href="/heritage" className="transition-colors duration-200 hover:text-white" style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.75)' }}>Blog</Link>
            
            {/* Vertical Divider */}
            <div style={{ width: '1px', height: '16px', background: 'rgba(255, 255, 255, 0.25)' }} />
            
            <Link href="/privacy" className="transition-colors duration-200 hover:text-white" style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.55)' }}>Privacy</Link>
            <Link href="/terms" className="transition-colors duration-200 hover:text-white" style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.55)' }}>Terms</Link>
            <Link href="/contact" className="transition-colors duration-200 hover:text-white" style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.55)' }}>Contact</Link>
          </div>

          {/* Copyright (Right) */}
          <p className="font-sans m-0" style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.55)' }}>
            © 2026 Rotaract District 9126
          </p>

        </div>
      </div>
    </footer>
  );
}
