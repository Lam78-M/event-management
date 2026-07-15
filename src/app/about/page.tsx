"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

// ১. TypeScript Interfaces ডিফাইন করা হলো
interface StatItem {
  value: string;
  label: string;
  desc: string;
}

interface CoreValueItem {
  title: string;
  desc: string;
  icon: string;
}

// Core Statistics Metrics Matrix
const STATS: StatItem[] = [
  { value: "10K+", label: "Active Users", desc: "Global accounts synchronized daily." },
  { value: "500+", label: "Live Matrices", desc: "Events hosted across multiple domains." },
  { value: "99.9%", label: "Uptime Stream", desc: "Flawless real-time pipeline delivery." },
  { value: "24/7", label: "Node Sync", desc: "Continuous database architecture tracking." },
];

// Core Value Frameworks Modules
const CORE_VALUES: CoreValueItem[] = [
  {
    title: "Seamless Architecture",
    desc: "We build modern, high-speed data pipelines that make discovering and management of live activations smooth and responsive.",
    icon: "⚡",
  },
  {
    title: "Community Focused",
    desc: "Connecting thousands of global tech hubs, entertainment circles, and business networks under a singular event ecosystem.",
    icon: "🤝",
  },
  {
    title: "Next-Gen Experience",
    desc: "Utilizing micro-interactions, glassy layouts, and premium aesthetic frameworks to maximize platform engagement parameters.",
    icon: "🎨",
  },
];

// ২. Motion configuration parameters (Explicitly typed as Variants)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
};

export default function AboutUsSection() {
  return (
    <div className="min-h-screen bg-slate-50/60 py-24 px-4 md:px-8 relative overflow-hidden pt-40">
      
      {/* 🌌 Premium Ambient Glassmorphism Glow Blobs */}
      <div className="absolute top-[10%] left-[-5%] w-[600px] h-[600px] bg-[#C4E2F5]/30 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-[550px] h-[550px] bg-[#4BB8FA]/15 rounded-full filter blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-24">
        
        {/* 📑 SECTION 1: Brand Intro Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block text-[10px] font-black tracking-widest uppercase bg-[#C4E2F5]/60 text-[#2C5EAD] px-4 py-1.5 rounded-full border border-[#4BB8FA]/30"
            >
              System Initialization // About Us
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black text-[#2C5EAD] tracking-tight leading-none"
            >
              We Interface People with Live <span className="text-[#1591DC]">Activations</span>.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm md:text-base font-semibold text-slate-500 leading-relaxed max-w-2xl"
            >
              Welcome to our dynamic event ecosystem matrix. We engineered this platform to bridge the gap between global live data streams and users seeking premium experiences. Whether it's high-tech hackathons, global business summits, or cozy community assemblies, we handle the infrastructure so you can focus on building connections.
            </motion.p>
          </div>

          {/* Isometric Glass Graphic Block */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 16 }}
            className="lg:col-span-5 h-72 bg-gradient-to-br from-white/80 to-[#C4E2F5]/30 backdrop-blur-md rounded-3xl border border-[#C4E2F5] shadow-xl relative flex items-center justify-center overflow-hidden group p-8"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#4BB8FA]/20 to-transparent rounded-full blur-xl pointer-events-none" />
            <div className="text-center space-y-2">
              <div className="text-5xl group-hover:scale-110 transition-transform duration-300">🌊</div>
              <h4 className="text-lg font-black text-[#2C5EAD]">Next-Gen Matrix Core</h4>
              <p className="text-xs font-bold text-[#1591DC]/80">Optimized fully for smooth web performance grids.</p>
            </div>
          </motion.div>
        </div>

        {/* 📊 SECTION 2: Live Statistics Tracker Counter Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white/70 backdrop-blur-md border border-[#C4E2F5] p-6 rounded-3xl shadow-xs text-center relative overflow-hidden group"
            >
              <div className="absolute -left-4 -bottom-4 w-12 h-12 rounded-full bg-[#C4E2F5]/40 transition-colors duration-300 group-hover:bg-[#4BB8FA]/20 pointer-events-none" />
              <h2 className="text-3xl md:text-4xl font-black text-[#2C5EAD] tracking-tight bg-gradient-to-r from-[#2C5EAD] to-[#1591DC] bg-clip-text text-transparent">
                {stat.value}
              </h2>
              <p className="text-xs md:text-sm font-black text-[#1591DC] mt-1">{stat.label}</p>
              <p className="text-[10px] font-semibold text-slate-400 mt-1.5 line-clamp-1">{stat.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* 🛠️ SECTION 3: Values & Operations Framework */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-[#2C5EAD] tracking-tight">Our Core Operational Values</h2>
            <p className="text-xs font-bold text-[#1591DC] mt-1">The fundamental system directives pushing our pipelines forward.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {CORE_VALUES.map((value, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="bg-white/80 backdrop-blur-md border border-[#C4E2F5] hover:border-[#4BB8FA]/60 p-6 rounded-3xl shadow-xs transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="text-3xl bg-[#C4E2F5]/40 w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    {value.icon}
                  </div>
                  <h3 className="text-base font-black text-[#2C5EAD] tracking-tight group-hover:text-[#1591DC] transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                    {value.desc}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-[#C4E2F5]/40 flex items-center justify-between">
                  <span className="text-[9px] font-black tracking-widest text-[#2C5EAD]/40 uppercase group-hover:text-[#2C5EAD] transition-colors">Verified Node</span>
                  <span className="text-[#1591DC] font-black text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">✦</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  );
}