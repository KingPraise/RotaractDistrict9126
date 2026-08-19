'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { getStoredProjects, subscribeToProjects, ProjectItem } from '@/lib/services/projects-service';

export default function ProjectsSection() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  useEffect(() => {
    setProjects(getStoredProjects());
    const unsubscribe = subscribeToProjects((updated) => {
      setProjects(updated);
    });
    return unsubscribe;
  }, []);

  const displayProjects = projects.slice(0, 3);

  return (
    <section id="projects" className="relative pt-10 pb-24 lg:pt-12 lg:pb-32 overflow-hidden bg-[#F8F5F2]">
      {/* Background Radial Glow */}
      <div 
        className="absolute right-0 top-1/4 pointer-events-none" 
        style={{ 
          width: '600px', 
          height: '600px', 
          background: 'radial-gradient(rgba(217, 27, 92, 0.06) 0%, transparent 70%)' 
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center justify-between mb-12 flex-wrap gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs tracking-[0.3em] uppercase text-[#D91B5C] font-sans font-semibold">
                Flagship Projects
              </span>
              <div 
                className="h-px w-12" 
                style={{ background: 'linear-gradient(90deg, rgb(217, 27, 92), transparent)' }}
              />
            </div>
            
            <h2 
              className="font-black leading-tight font-sans"
              style={{ 
                fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', 
                color: 'rgb(212, 165, 32)', 
                textShadow: 'rgba(212, 165, 32, 0.2) 0px 0px 40px' 
              }}
            >
              Where Action Meets Impact
            </h2>
          </div>

          <Link 
            href="/projects"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-semibold text-black/70 hover:text-black hover:border-black/30 transition-all duration-200 font-sans hover:scale-105 active:scale-95 group"
            style={{ borderColor: 'rgba(0, 0, 0, 0.15)' }}
          >
            <span>View All Projects</span>
            <ArrowRight size={15} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* 3-Column Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {displayProjects.map((proj, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.12, ease: 'easeOut' }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-2 shadow-xl hover:shadow-2xl"
              style={{ border: '1px solid rgba(255, 255, 255, 0.07)' }}
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden bg-[#0f1624]">
                <img 
                  src={proj.image} 
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div 
                  className="absolute inset-0" 
                  style={{ background: 'linear-gradient(rgba(8, 12, 20, 0.1) 0%, rgba(8, 12, 20, 0.85) 100%)' }}
                />
              </div>

              {/* Bottom Glass Panel */}
              <div 
                className="p-5 font-sans" 
                style={{ background: 'rgba(15, 22, 36, 0.9)', backdropFilter: 'blur(12px)' }}
              >
                <h3 className="font-bold text-white text-lg leading-tight group-hover:text-[#D91B5C] transition-colors duration-300 mb-2">
                  {proj.title}
                </h3>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/50 flex items-center">
                    <MapPin className="inline mr-1 opacity-70" size={11} strokeWidth={2} />
                    {proj.location}
                  </span>
                  
                  <span className="font-black text-[#D91B5C] text-[1.1rem]">
                    {proj.statNumber}
                    <span className="text-white/40 text-xs font-normal ml-1">
                      {proj.statLabel}
                    </span>
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
