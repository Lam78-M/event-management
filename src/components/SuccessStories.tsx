"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

export default function SuccessStories() {
  const stories = [
    {
      name: "Rahim Ahmed",
      role: "Frontend Intern @ TechMatrix",
      quote: "Rahim attended a high-fidelity React Meetup through DevEvents platform routing matrix and later locked an absolute industry enterprise internship pipeline.",
      avatar: "👨‍💻",
      gradient: "from-[#2C5EAD] to-[#1591DC]"
    },
    {
      name: "Nusrat Jahan",
      role: "AI Research Fellow",
      quote: "Nusrat joined an ecosystem AI Workshop tracking loop instance, deployed her custom neural transformer model, and systematically started her AI professional journey.",
      avatar: "👩‍💻",
      gradient: "from-[#1591DC] to-[#4BB8FA]"
    },
    {
      name: "Tanvir Hossain",
      role: "Core Systems Engineer",
      quote: "Discovered the Web3 Secure Consensus summit here. Interacted with local dev clusters and transitioned into standard cloud systems administration workflows.",
      avatar: "🚀",
      gradient: "from-[#2C5EAD] to-[#4BB8FA]"
    }
  ];

  return (
<div className="bg-slate-50/50">
        <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-7xl mx-auto px-6 py-12 text-left space-y-12 pt-60"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#C4E2F5] pb-6">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C4E2F5] text-[#2C5EAD] text-xs font-black rounded-md uppercase tracking-widest">
            🥈 Success Stories <FiStar className="fill-[#1591DC] stroke-[#1591DC] w-3 h-3" />
          </span>
          <h2 className="text-3xl font-black text-[#2C5EAD] tracking-tight">What Devs Say Log Data</h2>
        </div>
        <div className="text-xs font-mono text-[#2C5EAD] font-bold bg-[#C4E2F5]/50 px-3 py-1.5 rounded-lg">
          ACTIVE_VALIDATION_INDEX: 99.8%
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((story, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.15, ease: "easeOut" }}
            className="bg-white p-6 rounded-3xl border border-[#C4E2F5]/60 shadow-sm flex flex-col justify-between relative overflow-hidden"
          >
            <span className="absolute -top-4 right-2 text-7xl font-serif text-[#C4E2F5]/30 select-none pointer-events-none">&ldquo;</span>
            
            <div className="space-y-4 relative z-10">
              <div className="flex text-[#1591DC] gap-0.5">
                {[...Array(5)].map((_, i) => <FiStar key={i} className="fill-current w-3.5 h-3.5" />)}
              </div>
              <p className="text-sm font-semibold text-slate-600 leading-relaxed italic">
                &ldquo;{story.quote}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-50">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${story.gradient} flex items-center justify-center text-lg shadow-sm shrink-0 text-white`}>
                {story.avatar}
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-black text-[#2C5EAD] truncate">{story.name}</h4>
                <p className="text-[11px] font-bold text-slate-400 truncate">{story.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
</div>
  );
}