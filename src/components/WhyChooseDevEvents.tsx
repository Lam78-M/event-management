"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { FiCheckCircle, FiUsers, FiCpu, FiTrendingUp } from "react-icons/fi";

// 🎯 Framer Motion Animation Variants with strict Typing and Type Locking
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring" as const, // 👈 as const যুক্ত করে টাইপ লক করা হয়েছে যেন spring-কে string না ভাবে
      stiffness: 100, 
      damping: 15 
    } 
  }
};

export default function WhyChooseDevEvents() {
  const features = [
    {
      title: "Verified Events",
      desc: "Every instance undergoes manual routing authorization matrix processing, ensuring high-fidelity real learning spaces safely.",
      icon: <FiCheckCircle className="w-5 h-5 text-[#1591DC]" />,
      bg: "bg-[#C4E2F5]/40"
    },
    {
      title: "Top Tech Communities",
      desc: "Direct token integration channels with the largest developer clusters, frameworks networks and open source ecosystems.",
      icon: <FiCpu className="w-5 h-5 text-[#2C5EAD]" />,
      bg: "bg-[#2C5EAD]/10"
    },
    {
      title: "Networking Opportunities",
      desc: "Peer-to-peer interactive micro-clusters logic, allowing direct connection streams with industry expert developers instantly.",
      icon: <FiUsers className="w-5 h-5 text-[#4BB8FA]" />,
      bg: "bg-[#4BB8FA]/20"
    },
    {
      title: "Career Growth",
      desc: "Accelerate your validation graph pipeline. 40% of active attendees log direct reference pathways to top engineering hubs.",
      icon: <FiTrendingUp className="w-5 h-5 text-[#1591DC]" />,
      bg: "bg-[#1591DC]/10"
    }
  ];

  return (
    <div className="bg-slate-50/50">
      <motion.div 
        initial="hidden"
        whileInView="visible" // 💡 on-scroll অ্যানিমেশন আরও সুন্দর দেখানোর জন্য whileInView ব্যবহার করা হয়েছে
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="w-full max-w-7xl mx-auto px-6 py-10 text-left space-y-10 relative pt-40"
      >
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="inline-flex items-center px-4 py-1.5 bg-[#C4E2F5]/40 text-[#2C5EAD] text-xs font-black rounded-full uppercase tracking-wider">
            🥇 Why DevEvents
          </span>
          <h2 className="text-3xl font-black text-[#2C5EAD] tracking-tight">
            Engineered for Global Growth
          </h2>
          <p className="text-xs sm:text-sm text-[#1591DC] font-semibold leading-relaxed">
            The structural platform bridging developers with flawless corporate event orchestration nodes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feat, i) => (
            <motion.div 
              key={i}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-slate-50/50 p-6 rounded-3xl border border-slate-200/60 shadow-sm flex gap-4 items-start transition-all"
            >
              <div className={`p-3 rounded-2xl ${feat.bg} shrink-0`}>
                {feat.icon}
              </div>
              <div className="space-y-1">
                <h3 className="font-black text-base text-[#2C5EAD]">{feat.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}