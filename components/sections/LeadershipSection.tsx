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
      name: "Rtr. Oluwatofunmi Tejumola",
      role: "Assistant District Rotaract Rep",
      tooltip: "ADRR",
      image: "/images/leaders/adrr-oluwatofunmi-tejumola.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=480&h=580&fit=crop&auto=format"
    },
    {
      name: "Rtr. PP Raji Abeeb Adekola",
      role: "Immediate Past DRR",
      tooltip: "IPDRR",
      image: "/images/leaders/drr-raji-abeeb.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1629145810320-aec9e63dd798?w=480&h=580&fit=crop&auto=format"
    },
    {
      name: "Rtr. PP Oyewumi Kamaldeen",
      role: "Inaugural 1st DRR & Advisory Chair",
      tooltip: "PHF",
      image: "/images/leaders/drr-oyewumi-kamaldeen.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1533108344127-a586d2b02479?w=480&h=580&fit=crop&auto=format"
    },
    {
      name: "Rtr. Hussain Abdulhakeem",
      role: "Chief of Staff / District Admin",
      tooltip: "PHF",
      image: "/images/leaders/leader-chief-of-staff.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=480&h=580&fit=crop&auto=format"
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
    },
    {
      name: "Rtr. Yusuf Mahfooz Adewale",
      role: "District Director of ICT & Director",
      tooltip: "PHF",
      image: "/images/leaders/leader-ict-director-mafooz.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=480&h=580&fit=crop&auto=format"
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

        {/* 8-Leader Responsive Grid - Executive Luxury Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
          {leaders.map((leader, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer"
            >
              <div className="rounded-3xl bg-white border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(152,17,50,0.12)] transition-all duration-500 group-hover:-translate-y-2.5 flex flex-col h-full overflow-hidden">
                
                {/* Image Container with 4:5 Executive Ratio */}
                <div className="aspect-[4/5] relative overflow-hidden bg-[#0F1420]">
                  <img 
                    src={leader.image} 
                    onError={(e) => { e.currentTarget.src = leader.fallbackImage; }}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
                  />
                  
                  {/* Subtle Vignette & Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

                  {/* Top Badge: Rotary Tooltip / Credential */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-black/60 backdrop-blur-md text-[#F7A81B] border border-white/15 shadow-sm">
                      {leader.tooltip || 'Executive'}
                    </span>
                  </div>

                  {/* Top Right District Seal Accent */}
                  <div className="absolute top-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-all bg-white text-[#981132] rounded-full p-1.5 shadow-md transform group-hover:scale-110">
                    <span className="text-[10px] font-black tracking-tighter">D9126</span>
                  </div>

                  {/* Floating Identity on Base of Portrait */}
                  <div className="absolute bottom-3.5 inset-x-4 text-white">
                    <div className="text-[15px] font-black text-white leading-snug tracking-tight">
                      {leader.name}
                    </div>
                  </div>
                </div>

                {/* Card Body Details */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-white space-y-3">
                  <div>
                    <div className="text-[12.5px] font-extrabold text-[#981132] font-sans leading-tight">
                      {leader.tooltip ? (
                        <RotaryTooltip term={leader.tooltip}>
                          <span>{leader.role}</span>
                        </RotaryTooltip>
                      ) : (
                        leader.role
                      )}
                    </div>
                    
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mt-1">
                      District Executive Council
                    </div>
                  </div>

                  <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] font-semibold text-slate-500 group-hover:text-[#981132] transition-colors font-sans">
                    <span>Executive Profile</span>
                    <span className="text-xs font-bold transition-transform group-hover:translate-x-1">→</span>
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
