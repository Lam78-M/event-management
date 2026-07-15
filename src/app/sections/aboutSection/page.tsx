"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { 
  FiCheckCircle, 
  FiAward, 
  FiTarget, 
  FiZap 
} from "react-icons/fi";

export default function AboutSection() {
  // 🎯 Framer Motion Animation Variants with strict Typing and Type Locking
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut" as const // 👈 as const যুক্ত করে টাইপ লক করা হয়েছে
      } 
    }
  };

  const imageScaleUp: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" as const // 👈 as const যুক্ত করে টাইপ লক করা হয়েছে
      } 
    }
  };

  const coreFeatures = [
    {
      title: "Our Mission",
      desc: "Bangladesh-er developer ecosystem-ke ekshathe kore interactive community engagement toiri kora.",
      icon: <FiTarget className="w-5 h-5 text-[#2C5EAD]" />,
      bg: "bg-[#C4E2F5]/30"
    },
    {
      title: "Why EventSphere?",
      desc: "Hackathon high-end tech execution theke shuru kore local tech meetups—shob ekhane ek cklik-e paoya jay.",
      icon: <FiZap className="w-5 h-5 text-[#4BB8FA]" />,
      bg: "bg-[#4BB8FA]/10"
    }
  ];

  const bulletPoints = [
    "Seamless Live Event Publishing Controls",
    "Verified Organizers & Real-time Attendee Sync",
    "Direct Tech Community Networking Pipeline",
    "Modern Dashboard to Track Registered Events"
  ];

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-38 border-t border-slate-100">
      {/* Background Soft Glow Effect */}
      <div className="absolute right-[-10%] bottom-0 h-96 w-96 rounded-full bg-[#C4E2F5]/20 blur-[130px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          
          {/* LEFT: Stunning Visual Grid / Interactive Cards */}
          <motion.div 
            variants={imageScaleUp}
            className="lg:col-span-5 relative flex justify-center order-2 lg:order-1"
          >
            {/* Main Interactive Textured Card Container */}
            <div className="relative w-full max-w-[380px] h-[400px] rounded-3xl bg-gradient-to-br from-[#C4E2F5] via-[#4BB8FA] to-[#2C5EAD] p-1 shadow-2xl shadow-[#2C5EAD]/20 overflow-hidden">
              <div className="w-full h-full bg-slate-900 rounded-[22px] p-6 flex flex-col justify-between relative overflow-hidden group">
                {/* Decorative Pattern Lines inside card */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(75,184,250,0.15),transparent_60%)]" />
                
                <div className="space-y-4 relative z-10">
                  <div className="p-3 bg-white/10 rounded-2xl w-fit backdrop-blur-md">
                    <FiAward className="w-6 h-6 text-[#4BB8FA]" />
                  </div>
                  <h3 className="text-xl font-black text-white tracking-wide">
                    Building the Largest Dev Hub in Bangladesh 🇧🇩
                  </h3>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    Amra bishwash kori community active learning-e। Platform-ti platform na, eita holo developer-der connectivity network grid ecosystem.
                  </p>
                </div>

                {/* Floating Metric Stats Counter inside Card */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between relative z-10">
                  <div>
                    <p className="text-2xl font-black text-white">100%</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Community Driven</p>
                  </div>
                  <div className="px-3 py-1 bg-[#4BB8FA]/20 border border-[#4BB8FA]/30 rounded-xl">
                    <span className="text-[10px] font-black text-[#4BB8FA] uppercase tracking-widest">Active 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: High-Converting Text Description & Grid Features */}
          <motion.div 
            variants={fadeInUp}
            className="lg:col-span-7 space-y-6 order-1 lg:order-2"
          >
            <div className="space-y-2">
              <span className="text-xs font-black text-[#2C5EAD] uppercase tracking-widest bg-[#C4E2F5]/40 px-3 py-1 rounded-full">
                About The Platform
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Empowering Developers <br />
                <span className="bg-gradient-to-r from-[#2C5EAD] to-[#4BB8FA] bg-clip-text text-transparent">
                  One Event at a Time
                </span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              EventSphere holo ekti dynamic automation platform jekhane bangladesh-er shob dhoroner tech activities, workshops, framework discussions, ar global hackathons tracking ekshathe manage kora hoy। Amader uddeshyo holo tech enthusiast-der networking-ke arek dhap upore niye jaoa.
            </p>

            {/* Core Mission Mini Cards split layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {coreFeatures.map((item, index) => (
                <div key={index} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2 transition-all hover:shadow-md hover:border-[#C4E2F5]">
                  <div className={`p-2 rounded-xl w-fit ${item.bg}`}>
                    {item.icon}
                  </div>
                  <h4 className="text-sm font-black text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Strict Checked Icon Rows Checklist */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bulletPoints.map((point, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <FiCheckCircle className="w-4 h-4 text-[#2C5EAD] flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}