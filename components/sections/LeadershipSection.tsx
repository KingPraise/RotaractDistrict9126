'use client';

import React from 'react';
import { motion } from 'framer-motion';
import RotaryTooltip from '@/components/ui/RotaryTooltip';

export default function LeadershipSection() {
  const leaders = [
    {
      name: "Rtr. PP Adaramoye Iyanuoluwa",
      role: "District Rotaract Representative",
      tooltip: "DRR",
      image: "/images/leaders/drr-adaramoye-iyanuoluwa.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1644152993066-9b9ee687930d?w=480&h=580&fit=crop&auto=format"
    },
    {
      name: "Rtr. PP Oyewumi Kamaldeen",
      role: "Immediate Past DRR",
      tooltip: "IPDRR",
      image: "/images/leaders/drr-oyewumi-kamaldeen.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1533108344127-a586d2b02479?w=480&h=580&fit=crop&auto=format"
    },
    {
      name: "Rtr. Chukwuemeka Obi",
      role: "Director of Service Projects",
      tooltip: null,
      image: "/images/leaders/leader-service.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?w=480&h=580&fit=crop&auto=format"
    },
    {
      name: "Rtr. PP Faleye Ifeoluwa",
      role: "District Secretary",
      tooltip: "PP",
      image: "/images/leaders/leader-secretary-faleye.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1629145810320-aec9e63dd798?w=480&h=580&fit=crop&auto=format"
    },
    {
      name: "Rtr. PP Odufuwa Omotoke",
      role: "District Treasurer",
      tooltip: "PP",
      image: "/images/leaders/leader-treasurer-odufuwa.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1650490323009-96fc950a959c?w=480&h=580&fit=crop&auto=format"
    },
    {
      name: "Rtr. PP Adebayo Sodiq",
      role: "Strategic Advisor & 15th DRR",
      tooltip: "PHF+1",
      image: "/images/leaders/drr-adebayo-sodiq.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1602009786436-96b827675d32?w=480&h=580&fit=crop&auto=format"
    }
  ];

  return (
    <section id="leadership" className="relative py-24 lg:py-32 overflow-hidden bg-[#F8F5F2]">
      
      {/* Top Gradient Divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-16">
        <div 
          style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(217, 27, 92, 0.35) 30%, rgba(168, 85, 247, 0.35) 70%, transparent)' }}
        />
      </div>

      {/* Bottom Radial Glow */}
      <div 
        className="absolute pointer-events-none" 
        style={{ bottom: '10%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '500px', background: 'radial-gradient(rgba(168, 85, 247, 0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, rgb(217, 27, 92))' }} />
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-[#D91B5C] font-sans">
              Executive Council
            </span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, rgb(168, 85, 247), transparent)' }} />
          </div>
          
          <h2 
            className="font-black leading-tight mb-3 font-sans"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: 'rgb(212, 165, 32)', textShadow: 'rgba(212, 165, 32, 0.2) 0px 0px 40px' }}
          >
            Meet the Leadership
          </h2>
          <p className="max-w-lg mx-auto font-sans" style={{ fontSize: '1rem', color: 'rgb(0, 0, 0)' }}>
            The District 9126 executive council driving impact across seven Nigerian states
          </p>
        </motion.div>

        {/* 6-Column Grid with Staggered Cascading Animation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {leaders.map((leader, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
              className="group"
            >
              <div 
                className="transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)] rounded-2xl flex flex-col h-full"
                style={{ 
                  background: 'rgba(15, 22, 36, 0.95)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)', 
                  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 4px 24px' 
                }}
              >
                
                {/* Image Container with rounded top and overflow hidden */}
                <div style={{ aspectRatio: '3/4', overflow: 'hidden', position: 'relative' }} className="rounded-t-2xl">
                  <img 
                    src={leader.image} 
                    onError={(e) => { e.currentTarget.src = leader.fallbackImage; }}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top transform scale-100 transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Dark Bottom Gradient Overlay */}
                  <div 
                    style={{ position: 'absolute', inset: '0px', background: 'linear-gradient(transparent 55%, rgba(8, 12, 20, 0.85) 100%)' }}
                  />
                </div>

                {/* Text Content */}
                <div style={{ padding: '12px 14px 14px' }} className="flex flex-col justify-between flex-1">
                  <div 
                    className="font-sans text-[13px] font-bold text-white mb-1 leading-snug" 
                  >
                    {leader.name}
                  </div>
                  <div 
                    className="font-sans text-[11px] text-[#D91B5C] font-semibold tracking-wide leading-snug" 
                  >
                    {leader.tooltip ? (
                      <RotaryTooltip term={leader.tooltip}>
                        <span>{leader.role}</span>
                      </RotaryTooltip>
                    ) : (
                      leader.role
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
