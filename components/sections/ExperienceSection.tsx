'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ExperienceSection() {
  const pillars = [
    {
      title: "Club Life",
      desc: "Weekly meetings, new friendships, and a community that shows up",
      image: "https://images.unsplash.com/photo-1627423893729-3a79f48ff473?w=600&h=720&fit=crop&auto=format",
    },
    {
      title: "Community Service",
      desc: "Hands-on impact — boreholes, vaccines, classrooms, meals",
      image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&h=720&fit=crop&auto=format",
    },
    {
      title: "Leadership Training",
      desc: "Workshops, summits, and mentorships that sharpen the next generation",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=720&fit=crop&auto=format",
    },
    {
      title: "District Events",
      desc: "Conferences, award nights, and district-wide celebrations of impact",
      image: "https://images.unsplash.com/photo-1652664845183-c6083bc286fc?w=600&h=720&fit=crop&auto=format",
    }
  ];

  return (
    <section 
      id="experience"
      style={{ background: 'rgb(152, 17, 50)', width: '100%', position: 'relative', overflow: 'hidden' }}
    >
      {/* Top Background Glow */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ background: 'radial-gradient(80% 60% at 50% 0%, rgba(255, 255, 255, 0.06) 0%, transparent 65%)' }}
      />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-12 text-center"
        >
          <span 
            className="inline-block uppercase mb-4 font-sans" 
            style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.6)', letterSpacing: '0.3em' }}
          >
            Experience the District
          </span>
          <h2 className="font-sans leading-[1.05]">
            <span 
              className="block" 
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900, color: 'white' }}
            >
              Life in Rotaract
            </span>
            <span 
              className="block" 
              style={{ fontSize: 'clamp(1.1rem, 2.3vw, 2rem)', fontWeight: 700, color: 'rgba(255, 255, 255, 0.7)', marginTop: '0.2em' }}
            >
              is never ordinary.
            </span>
          </h2>
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {pillars.map((pillar, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-xl aspect-[2/3] group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img 
                src={pillar.image} 
                alt={pillar.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              {/* Deep Crimson Overlay */}
              <div 
                className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-90" 
                style={{ background: 'linear-gradient(to top, rgba(100, 5, 30, 0.92) 0%, rgba(100, 5, 30, 0.4) 45%, transparent 75%)' }}
              />
              
              {/* Card Text Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 font-sans">
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'white', marginBottom: '4px' }}>
                  {pillar.title}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.45 }}>
                  {pillar.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center"
        >
          <Link href="/clubs">
            <button 
              className="inline-flex items-center gap-2 font-sans whitespace-nowrap transition-all duration-200 hover:scale-105 active:scale-95 group"
              style={{ 
                padding: '10px 12px 10px 26px', 
                borderRadius: '999px', 
                background: 'white', 
                fontSize: '14px', 
                fontWeight: 700, 
                color: 'rgb(152, 17, 50)', 
                letterSpacing: '0.02em', 
                boxShadow: 'rgba(0, 0, 0, 0.25) 0px 4px 20px' 
              }}
            >
              Find Your Club
              <span 
                className="inline-flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-1"
                style={{ 
                  width: '28px', 
                  height: '28px', 
                  borderRadius: '50%', 
                  background: 'rgba(0, 0, 0, 0.05)', 
                  border: '1px solid rgba(0, 0, 0, 0.08)' 
                }}
              >
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="#981132" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
