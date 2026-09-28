'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, ChevronRight, Award, Quote, Mail, Compass } from 'lucide-react';
import Link from 'next/link';

const DRR_GALLERY = [
  { id: 1, src: '/images/leaders/drr-adaramoye-1.jpg' },
  { id: 2, src: '/images/leaders/drr-adaramoye-2.jpg' },
  { id: 3, src: '/images/leaders/drr-adaramoye-3.jpg' },
  { id: 4, src: '/images/leaders/drr-adaramoye-4.jpg' }
];

export default function DRRSpotlightSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % DRR_GALLERY.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-[#F8F5F2]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#981132]/20 to-transparent" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-6 lg:px-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-[#0C101A] border-4 border-white">
              {DRR_GALLERY.map((img, idx) => (
                <motion.img
                  key={img.id}
                  src={img.src}
                  alt={`DRR Portrait ${idx + 1}`}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: activeIdx === idx ? 1 : 0, scale: activeIdx === idx ? 1 : 1.05 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
              
              <button 
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="absolute left-4 bottom-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all z-10"
              >
                {isAutoPlaying ? <Pause size={14} className="fill-current" /> : <Play size={14} className="fill-current translate-x-[1px]" />}
              </button>
              
              <button 
                onClick={() => { setIsAutoPlaying(false); setActiveIdx((prev) => (prev + 1) % DRR_GALLERY.length); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-10 backdrop-blur-sm shadow-md"
              >
                <ChevronRight size={16} />
              </button>

              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center gap-1.5 z-10">
                <img src="/images/rotaract-logo.png" alt="Rotaract" className="w-3.5 h-3.5 object-contain" />
                <span className="text-[9px] font-bold text-white tracking-wider uppercase">Sitting DRR</span>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-2.5 mt-4 w-full max-w-md">
              {DRR_GALLERY.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => { setIsAutoPlaying(false); setActiveIdx(idx); }}
                  aria-label={`Select photo ${idx + 1}`}
                  className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeIdx === idx ? 'border-[#981132] scale-105 shadow-md shadow-[#981132]/30 ring-2 ring-[#981132]/20' : 'border-black/10 opacity-60 hover:opacity-100 hover:border-black/30'
                  }`}
                >
                  <img src={img.src} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col h-full">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#981132]/10 text-[#981132] text-xs font-bold uppercase tracking-wider mb-3">
                <Award size={14} /> Theme: &quot;Create Lasting Impact&quot;
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1C1C1E] tracking-tight leading-tight font-sans">
                Rtr. PP Adaramoye Iyanuoluwa
              </h3>
              <p className="text-xs sm:text-sm font-bold text-[#D91B5C] uppercase tracking-widest mt-1">
                Sitting 3rd District Rotaract Representative - District 9126
              </p>
            </div>

            <div className="relative rounded-2xl bg-white border border-black/[0.08] shadow-md text-left flex-1 flex flex-col overflow-hidden max-h-[450px]">
              <div className="bg-gray-50 border-b border-black/[0.08] p-4 flex items-center justify-between sticky top-0 z-10">
                <h4 className="font-bold text-[#981132] text-sm uppercase tracking-wider flex items-center gap-2">
                  <Quote size={16} /> Official Citation &amp; Biography
                </h4>
              </div>
              <div className="p-6 overflow-y-auto custom-scrollbar text-sm text-gray-700 space-y-4 leading-relaxed font-sans">
                <p>
                  <strong>ROTARACTOR Adaramoye Iyanuoluwa AdukeAdee</strong> is a dynamic, visionary, and transformational leader born on the 20th of March over two decades ago. An indigene of Akure, Ondo State, she is a proud Christian whose life reflects purpose, excellence, and service. She holds a Bachelor&apos;s degree in Biology and Education from Adeyemi Federal University of Education, Ondo.
                </p>
                <p>
                  Her inspiring journey into the Rotary family began in 2018 under the Rotary theme &quot;Be the Inspiration.&quot; Introduced by her mother, Rtn. Tomilola Olawuni, PHF, she embraced service not merely as an activity but as a lifelong calling. Since then, AdukeAdee has emerged as a beacon of hope, an epitome of resilience, and a shining light within Rotaract and beyond.
                </p>
                <p>
                  AdukeAdee is a passionate public health enthusiast whose perspective was profoundly shaped during her NYSC year at the Department of Public Health, Nasarawa State Ministry of Health. This defining experience has ignited in her a strong desire to pursue a Master&apos;s degree in Public Health and to become a transformational force in advancing healthcare delivery. Her special interest lies in Reproductive, Maternal, and Child Health, where she is committed to improving health outcomes for women and children.
                </p>
                <p>
                  Beyond service, she is a vibrant creative entrepreneur and the founder of VIBE Beads and Accessories, a flourishing brand through which she has served hundreds of satisfied customers.
                </p>
                <div className="my-6 p-4 bg-gray-50 border-l-4 border-[#D4A520] rounded-r-lg">
                  <h5 className="font-bold text-[#1C1C1E] mb-2 uppercase tracking-wide">Club Level Leadership</h5>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>Club Secretary, RAC AFUED (2019-2020)</li>
                    <li>President, RAC AFUED (2020-2021) - <em>Increased club membership and engagement by 250%</em></li>
                    <li>Club Trainer, RAC AFUED Ondo (2021-2022)</li>
                    <li>Director, Membership Retention and Extension, RAC AFUED (2022-2023)</li>
                    <li>Club Trainer, Rotaract e-Club Mighty (2023-2024)</li>
                    <li>Membership Director, Rotaract e-Club Mighty (2023-2025)</li>
                    <li>Club Service Project Director, Rotaract e-Club Mighty (2025-2026)</li>
                  </ul>
                </div>
                <div className="my-6 p-4 bg-gray-50 border-l-4 border-purple-600 rounded-r-lg">
                  <h5 className="font-bold text-[#1C1C1E] mb-2 uppercase tracking-wide">Zonal Level (Ondo &amp; Ekiti State)</h5>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>Media and Publicity Director (2020-2021)</li>
                    <li>Zonal Administrator, Ondo and Ekiti State (2021-2022)</li>
                    <li>Chairperson, Dinner and Award Night, Ondo and Ekiti State (2021-2022)</li>
                    <li>Deputy Zonal Trainer, Ondo and Ekiti State (2022-2023)</li>
                    <li>The Rotary Foundation Chairperson (2023-2024)</li>
                    <li>Rotaract Ondo State Learning Facilitator (2024-2025)</li>
                  </ul>
                </div>
                <div className="my-6 p-4 bg-gray-50 border-l-4 border-[#981132] rounded-r-lg">
                  <h5 className="font-bold text-[#1C1C1E] mb-2 uppercase tracking-wide">District Level</h5>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>District Quiz Team Lead (2020-2021)</li>
                    <li>Secretary, Rotary District 9125 Polio Plus Committee (2020-2021)</li>
                    <li>Deputy District Project Director, Rotaract District 9125 (2021-2022) - <em>Co-launched the Digi-Hands initiative</em></li>
                    <li>Secretary, District International Service Committee (2022-2023)</li>
                    <li>Secretary, Rotary Girl Child Initiative Committee (2022-2023)</li>
                    <li>Chair, District Water, Sanitation and Hygiene Activities (2022-2023) - <em>Championed ONE ZONE, ONE MARKET CLEAN UP</em></li>
                    <li>Chairperson, District Training Seminar, Rotaract District 9125 (2023-2024)</li>
                    <li>Secretary, District 9126 Bylaw Review Committee (2024-2025)</li>
                    <li>District Secretary, Rotaract District 9126 (2024-2025)</li>
                    <li>District Rotaract Representative Nominee (2024-2025)</li>
                    <li>District Rotaract Representative-Elect (2025-2026)</li>
                    <li>District Rotaract Representative (2026-2027)</li>
                  </ul>
                </div>
                <div className="my-6 p-4 bg-gray-50 border-l-4 border-blue-600 rounded-r-lg">
                  <h5 className="font-bold text-[#1C1C1E] mb-2 uppercase tracking-wide">National &amp; Continental Level</h5>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>Secretary, NIGEROTA Committee (2022-2023)</li>
                    <li>Treasurer, Rotaract Nigeria (2024-2025)</li>
                    <li>Rotaract Africa Secretary-Elect (2024-2025)</li>
                    <li>Rotaract Africa Secretary (2025-2026)</li>
                    <li>Chairperson, NIGEROTA 2026 - <em>Hosted ~500 Rotaractors</em></li>
                  </ul>
                </div>
                <p>
                  A passionate tennis enthusiast and a lover of pounded yam with correct soup, AdukeAdee beautifully balances excellence with humility, strength with warmth, and ambition with service.
                </p>
                <p className="font-black text-center text-[#981132] pt-4">
                  AdukeAdee is an OMOLUABI, fully prepared to Create Lasting Impact. <br/><br/>
                  LADIES AND GENTLEMEN, I PRESENT TO YOU ROTARACTOR, ADARAMOYE IYANUOLUWA ADUKEADEE, PHF<br/>
                  THE THIRD AND FIRST FEMALE DISTRICT ROTARACT REPRESENTATIVE, ROTARACT DISTRICT 9126 NIGERIA.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a href="mailto:drr@rotaractdistrict9126.com.ng" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#981132] text-white text-xs font-bold hover:bg-[#7D0E29] transition-all shadow-md shadow-[#981132]/30 hover:scale-105 cursor-pointer">
                <Mail size={14} /> <span>Contact Executive Office</span>
              </a>
              <Link href="/projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-black/5 text-[#1C1C1E] text-xs font-bold transition-all border border-black/10 shadow-sm hover:scale-105">
                <Compass size={14} className="text-[#981132]" /> <span>Explore Flagship Projects</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}