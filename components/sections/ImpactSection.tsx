'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ImpactSection() {
  const cards = [
    {
      stat: "500+",
      title: "Children Vaccinated",
      subtitle: "Health Outreach · Oyo State",
      image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=900&h=700&fit=crop&auto=format",
      accent: "rgb(217, 27, 92)" // Cranberry
    },
    {
      stat: "2,400",
      title: "Youth Trained",
      subtitle: "Digital Skills Academy · Ibadan",
      image: "https://images.unsplash.com/photo-1620829813573-7c9e1877706f?w=900&h=700&fit=crop&auto=format",
      accent: "rgb(139, 27, 217)" // Purple
    },
    {
      stat: "47 Clubs",
      title: "7 States United",
      subtitle: "Ondo · Ekiti · Osun · Oyo · Kogi · Niger · Kwara",
      image: "https://images.unsplash.com/photo-1604212561903-5ca7f041c58b?w=900&h=700&fit=crop&auto=format",
      accent: "rgb(27, 140, 217)" // Blue
    },
    {
      stat: "400+",
      title: "Rotaractors United",
      subtitle: "District Leadership Summit 2026",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&h=700&fit=crop&auto=format",
      accent: "rgb(217, 27, 92)" // Cranberry
    }
  ];

  return (
    <section id="impact" className="relative py-20 lg:py-28 overflow-hidden bg-[#F8F5F2]">
      {/* Subtle Background Radial Glow */}
      <div 
        className="absolute pointer-events-none inset-0" 
        style={{ background: 'radial-gradient(70% 50% at 50% 20%, rgba(217, 27, 92, 0.07) 0%, transparent 65%)' }}
      />
      
      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-10 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-12"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#D91B5C] font-sans">
              Live from the Field
            </span>
            <div 
              className="h-px flex-1 max-w-16" 
              style={{ background: 'linear-gradient(90deg, rgb(217, 27, 92), transparent)' }}
            />
          </div>
          
          {/* Heading */}
          <h2 
            className="font-black leading-tight font-sans"
            style={{ 
              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', 
              color: 'rgb(212, 165, 32)', 
              textShadow: 'rgba(212, 165, 32, 0.25) 0px 0px 40px' 
            }}
          >
            Impact in Motion
          </h2>
          <p className="mt-3 max-w-xl font-sans text-base text-black/80">
            Real moments from across District 9126 — seven states, one movement, measured in lives changed.
          </p>
        </motion.div>
      </div>

      {/* Carousel Container */}
      <div 
        className="flex gap-5 px-6 lg:px-10 overflow-x-auto pb-8 relative z-10 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
      >
        {cards.map((card, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
            className="snap-start shrink-0"
          >
            <div 
              className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-400 ease-out hover:-translate-y-2 hover:scale-[1.02] shadow-xl hover:shadow-2xl"
              style={{ 
                width: 'clamp(240px, 28vw, 320px)', 
                aspectRatio: '3 / 4',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 6px 30px rgba(0,0,0,0.4)'
              }}
            >
              {/* Image */}
              <img 
                src={card.image} 
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" 
              />
              
              {/* Base Dark Gradient overlay */}
              <div 
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(8, 12, 20, 0.95) 0%, rgba(8, 12, 20, 0.55) 45%, rgba(8, 12, 20, 0.1) 100%)' }}
              />

              {/* Hover Color Glow overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(80% 40% at 50% 110%, ${card.accent.replace(')', ', 0.2)')} 0%, transparent 70%)` }}
              />

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 font-sans">
                <div 
                  className="font-black leading-none mb-1"
                  style={{ 
                    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                    background: `linear-gradient(135deg, rgb(255, 255, 255) 40%, ${card.accent} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {card.stat}
                </div>
                <div className="font-bold text-white text-sm leading-tight mb-1">
                  {card.title}
                </div>
                <div className="text-white/50 text-xs leading-snug">
                  {card.subtitle}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {/* Spacer for right edge scrolling */}
        <div className="shrink-0 w-6 lg:w-10" />
      </div>
    </section>
  );
}
