'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section 
      className="relative w-full overflow-hidden"
      style={{ background: 'rgb(152, 17, 50)' }}
    >
      {/* Top Background Glow */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ background: 'radial-gradient(70% 50% at 50% 0%, rgba(255, 255, 255, 0.08) 0%, transparent 60%)' }}
      />
      
      <div className="max-w-4xl mx-auto px-6 py-20 lg:py-32 text-center relative z-10">
        
        {/* Eyebrow */}
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block uppercase mb-5 font-sans" 
          style={{ 
            fontSize: '0.75rem', 
            letterSpacing: '0.3em', 
            color: 'rgba(255, 255, 255, 0.7)' 
          }}
        >
          Ready to make a difference?
        </motion.span>
        
        {/* Heading */}
        <motion.h2 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-black mb-5 font-sans"
        >
          <span 
            className="block" 
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'white', lineHeight: 1.05 }}
          >
            Join the Movement.
          </span>
          <span 
            className="block" 
            style={{ fontSize: 'clamp(1.2rem, 3vw, 2.4rem)', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.15, marginTop: '0.15em' }}
          >
            Build the Future.
          </span>
        </motion.h2>
        
        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans"
          style={{ 
            fontSize: '1.05rem', 
            color: 'rgba(255, 255, 255, 0.75)', 
            maxWidth: '520px', 
            margin: '0px auto 2.5rem', 
            lineHeight: 1.7 
          }}
        >
          There is a Rotaract club near you. Find your community, step into your purpose, and become part of a global network of changemakers.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          
          {/* Primary Button */}
          <Link href="/clubs">
            <button 
              className="inline-flex items-center gap-2 font-sans whitespace-nowrap transition-all duration-200 hover:scale-105 active:scale-95 group"
              style={{ 
                padding: '10px 12px 10px 26px', 
                borderRadius: '999px', 
                background: 'white', 
                fontSize: '15px', 
                fontWeight: 700, 
                color: 'rgb(152, 17, 50)', 
                boxShadow: 'rgba(0, 0, 0, 0.2) 0px 4px 20px' 
              }}
            >
              Find a Club Near You
              <span 
                className="inline-flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-1"
                style={{ 
                  width: '30px', 
                  height: '30px', 
                  borderRadius: '50%', 
                  background: 'rgba(0, 0, 0, 0.15)', 
                  border: '1px solid rgba(0, 0, 0, 0.1)' 
                }}
              >
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="#981132" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          </Link>

          {/* Secondary Button */}
          <Link href="/projects">
            <button 
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:bg-white/15 hover:scale-105 active:scale-95 font-sans"
              style={{ 
                fontSize: '1rem', 
                color: 'rgba(255, 255, 255, 0.85)', 
                border: '1px solid rgba(255, 255, 255, 0.4)', 
                background: 'transparent' 
              }}
            >
              Explore Our Impact
            </button>
          </Link>

        </motion.div>
      </div>
    </section>
  );
}
