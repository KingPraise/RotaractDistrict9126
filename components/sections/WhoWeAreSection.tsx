'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function WhoWeAreSection() {
  const images = [
    "https://images.unsplash.com/photo-1627423893729-3a79f48ff473?w=800&h=560&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1780847615151-5f6397829786?w=800&h=560&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1639283056436-17ce5f04976a?w=800&h=560&fit=crop&auto=format"
  ];

  return (
    <section id="about" className="relative pt-10 pb-20 lg:pt-14 lg:pb-28 overflow-hidden bg-[#F8F5F2]">
      {/* Top Radial Glow */}
      <div 
        className="absolute pointer-events-none" 
        style={{ 
          top: '0px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          width: '900px', 
          height: '600px', 
          background: 'radial-gradient(rgba(217, 27, 92, 0.07) 0%, transparent 70%)' 
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Top Text & Quote Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
          
          {/* Left Column: Heading & Intro */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-4 mb-5">
              <span className="text-xs font-medium tracking-[0.3em] uppercase text-[#D91B5C] font-sans">
                Who We Are
              </span>
              <div 
                className="h-px flex-1 max-w-[80px]" 
                style={{ background: 'linear-gradient(90deg, rgb(217, 27, 92), transparent)' }}
              />
            </div>
            
            <h2 className="font-black mb-5 leading-tight font-sans">
              <span 
                className="block"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'rgb(212, 165, 32)', lineHeight: '1.05' }}
              >
                Powered by Purpose.
              </span>
              <span 
                className="block"
                style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2.15rem)', color: 'rgb(212, 165, 32)', lineHeight: '1.15', marginTop: '0.2em' }}
              >
                Driven by People.
              </span>
            </h2>
            
            <p className="leading-relaxed font-sans" style={{ fontSize: '1.05rem', color: 'rgb(0, 0, 0)' }}>
              District 9126 is a constellation of 77 chartered Rotaract clubs and over 700 young leaders united under one banner — creating real, lasting change in communities across seven Nigerian states while developing the next generation of servant leaders.
            </p>
          </motion.div>

          {/* Right Column: Quote */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          >
            <div 
              style={{ fontSize: '5rem', lineHeight: '1', fontFamily: 'Georgia, serif', color: 'rgb(217, 27, 92)', marginBottom: '0.5rem', opacity: '0.9' }}
            >
              &ldquo;
            </div>
            <div style={{ paddingTop: '0.75rem' }}>
              <blockquote style={{ borderLeft: '3px solid rgb(217, 27, 92)', paddingLeft: '1.5rem', margin: '0px' }}>
                <p className="font-sans font-semibold italic mb-4" style={{ fontSize: '1.15rem', color: 'rgb(0, 0, 0)', lineHeight: '1.6' }}>
                  We believe the most powerful force for good in any community is a young person who has been trusted with responsibility and equipped to lead.
                </p>
                <footer className="font-sans uppercase" style={{ fontSize: '0.8rem', color: 'rgba(0, 0, 0, 0.45)', letterSpacing: '0.08em' }}>
                  — D9126 Founding Charter, 2009
                </footer>
              </blockquote>
            </div>
          </motion.div>
        </div>

        {/* Bottom Image Collage Grid */}
        <div className="grid grid-cols-3 gap-3 lg:gap-4">
          {images.map((src, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.12, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-xl aspect-[4/3] group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img 
                src={src} 
                alt="District Impact" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              {/* Bottom Vignette for Images */}
              <div 
                className="absolute inset-0" 
                style={{ background: 'linear-gradient(transparent 50%, rgba(8, 12, 20, 0.65) 100%)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
