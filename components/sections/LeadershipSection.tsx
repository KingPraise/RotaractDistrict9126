'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function LeadershipSection({ showOnly = "all" }: { showOnly?: "team" | "succession" | "all" }) {
  const mainLeaders = [
    { name: "Rtn Amusa Adepitan Adesina", role: "District Rotaract Representative Committee Chairman", tooltip: "DRRCC", image: "/images/leaders/Amusa Adepitan Adesina.jpeg" },
    { name: "Rtr. PP Adaramoye Iyanuoluwa PHF", role: "District Rotaract Representative", tooltip: "DRR", image: "/images/leaders/drr-adaramoye-iyanuoluwa.jpg" },
    { name: "Rtr. PP Faleye Ifeoluwa", role: "District Secretary", tooltip: "DS", image: "/images/leaders/leader-secretary-faleye.jpg" },
    { name: "Rtr. Hussain Abdulhakeem", role: "District Admin / Chief of Staff", tooltip: "DA", image: "/images/leaders/leader-chief-of-staff.jpg" },
    { name: "Rtr. PP Odufuwa Omotoke", role: "District Treasurer", tooltip: "DT", image: "/images/leaders/leader-treasurer-odufuwa.jpg" },
    { name: "Rotn. Idiat Olamide Ibrahim", role: "RAC / Youth Chair", tooltip: "RAC CHAIR", image: "/images/leaders/Rotn. Idiat Olamide.jpeg" },
    { name: "Rtr. PP Adebayo Sodiq", role: "District Learning Facilitator and Chairman Council of PDRRs", tooltip: "PAPA T", image: "/images/leaders/drr-adebayo-sodiq.jpg" },
    { name: "Rtr. Yusuf Mahfooz Adewale", role: "District Director of ICT", tooltip: "MAHFOOZ", image: "/images/leaders/leader-ict-director-mafooz.jpg" }
  ];

  const successionWall = [
    { name: "Rtr. PP Oyewumi Kamaldeen PHF", role: "DRR 2024-2025", tooltip: "PDR (Kamal)", image: "/images/leaders/drr-oyewumi-kamaldeen.jpg" },
    { name: "Rtr. PP Raji Abeeb Adekola", role: "DRR 2025-2026", tooltip: "IPDR (Youngest)", image: "/images/leaders/drr-raji-abeeb.jpg" },
    { name: "Rtr. PP Adaramoye Iyanuoluwa PHF", role: "DRR 2026-2027", tooltip: "DRR (Adukee)", image: "/images/leaders/drr-adaramoye-iyanuoluwa.jpg" },
    { name: "Rtr. Oluwatofunmi Tejumola", role: "DRR 2027-2028", tooltip: "DRRE (Toffy)", image: "/images/leaders/adrr-oluwatofunmi-tejumola.jpg" },
    { name: "Rtr. Shittu Ifedolapo PHF", role: "DRR 2028-2029", tooltip: "DRRN (Dolapo)", image: "/images/leaders/drrn-shittu-ifedolapo.jpg" }
  ];

    const adrrs = [
    { name: "PP Oluwatofunmi Tejumola", role: "Zone 1, Oyo State", tooltip: "ADRR", image: "/images/leaders/Oluwatofunmi tejumola ADRR.jpeg" },
    { name: "PP Aderibigbe Kehinde David", role: "Zone 2, Osun State", tooltip: "ADRR", image: "/images/leaders/kehinde david.jpeg" },
    { name: "PP Abubakar Aminat Abiodun", role: "Zone 3, Kwara & Niger State", tooltip: "ADRR", image: "/images/leaders/aminat abiodun.jpeg" },
    { name: "PP Ijalana Oluwatobi", role: "Zone 4, Ondo & Ekiti", tooltip: "ADRR", image: "/images/leaders/Ijanala oluwatobi.jpeg" },
    { name: "PP Alfa Musa", role: "Zone 5, Kogi State", tooltip: "ADRR", image: "/images/leaders/alfa musa.jpeg" }
  ];

  const LeaderGrid = ({ leaders, title, subtitle }: { leaders: any[], title: string, subtitle: string }) => (
    <div className="mb-24">
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl lg:text-4xl font-black text-[#D4A520] mb-2">{title}</h2>
        <p className="text-gray-600 max-w-lg mx-auto">{subtitle}</p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7 justify-center">
        {leaders.map((leader, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="group cursor-pointer max-w-sm mx-auto w-full"
          >
            <div className="rounded-3xl bg-white border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(152,17,50,0.12)] transition-all duration-500 group-hover:-translate-y-2.5 flex flex-col h-full overflow-hidden">
              <div className="aspect-[4/5] relative overflow-hidden bg-[#0F1420]">
                <img src={leader.image} alt={leader.name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-black/60 backdrop-blur-md text-[#F7A81B] border border-white/15 shadow-sm">
                    {leader.tooltip}
                  </span>
                </div>
                <div className="absolute bottom-3.5 inset-x-4 text-white">
                  <div className="text-[15px] font-black leading-snug tracking-tight">{leader.name}</div>
                </div>
              </div>
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-white">
                <div>
                  <div className="text-[12.5px] font-extrabold text-[#981132] leading-tight">{leader.role}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="leadership" className="relative py-24 lg:py-32 overflow-hidden bg-[#F8F5F2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {(showOnly === "all" || showOnly === "team") && (        <LeaderGrid leaders={mainLeaders} title="Meet the Leadership" subtitle="The District 9126 executive council driving impact across seven Nigerian states" />)}
        {(showOnly === "all" || showOnly === "succession") && (        <LeaderGrid leaders={successionWall} title="District 9126 Succession Wall" subtitle="Honoring our past, present, and future District Rotaract Representatives" />)}
        {(showOnly === "all" || showOnly === "team") && (        <LeaderGrid leaders={adrrs} title="Assistant District Rotaract Representatives" subtitle="Coordinating efforts across our diverse zones and clubs" />)}
      </div>
    </section>
  );
}
