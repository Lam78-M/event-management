"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiGlobe, FiRadio, FiSmile, FiAward } from "react-icons/fi";

export default function CommunityStats() {
  const metrics = [
    { label: "Active Developers", value: "15,000+", icon: <FiSmile className="text-[#4BB8FA]" /> },
    { label: "Events Hosted", value: "350+", icon: <FiRadio className="text-[#1591DC]" /> },
    { label: "Trusted Organizers", value: "120+", icon: <FiGlobe className="text-[#C4E2F5]" /> },
    { label: "Cities Covered", value: "25+", icon: <FiAward className="text-[#4BB8FA]" /> }
  ];

  return (
 <div className="bg-slate-50/50">
       <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-7xl mx-auto px-6 py-12 pt-55 pb-50"
    >
      <div className="bg-[#2C5EAD] text-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-left">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(196,226,245,0.15)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="relative z-10 space-y-8">
          <div className="max-w-md space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#4BB8FA]">
              🥉 Our Impact / Community Stats
            </span>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-none">
              Quantifiable Performance Analytics Matrices
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-white/10">
            {metrics.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2 text-sm font-mono text-slate-300">
                  {item.icon}
                  <span className="text-[11px] font-bold tracking-wider uppercase">{item.label}</span>
                </div>
                
                <motion.h4 
                  className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-white to-[#C4E2F5] bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  {item.value}
                </motion.h4>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-white/5 text-[9px] font-mono text-[#C4E2F5]/50 flex flex-wrap justify-between gap-2">
          <span>DATA_SEEDED_SYNC_OK // REALTIME_TELEMETRY</span>
          <span>SYSTEM RUNNING LEVEL A++</span>
        </div>
      </div>
    </motion.div>
 </div>
  );
}