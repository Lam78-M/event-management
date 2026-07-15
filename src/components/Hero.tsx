"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCalendar,
  FiSearch,
  FiUsers,
  FiTrendingUp,
  FiAward
} from "react-icons/fi";

const Hero = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/events?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-50/50 pt-20 pb-16 lg:pt-28 lg:pb-24">
      {/* Soft Ambient Background Blurs */}
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-gradient-to-tr from-brand-light/30 to-brand-primary/10 blur-[100px] pointer-events-none" />
      <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-gradient-to-bl from-brand-dark/10 to-brand-light/20 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Content & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left order-2 lg:order-1"
          >
            {/* Premium Animated Badge */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-light/20 px-4 py-1.5 text-xs font-bold text-brand-dark tracking-wide shadow-sm"
            >
              <FiCalendar className="text-brand-primary animate-bounce" />
              <span>Discover Amazing Tech Events Across BD</span>
            </motion.div>

            {/* Scaled & Sleek Typography Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
              Discover, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-brand-dark via-brand-primary to-brand-light bg-clip-text text-transparent">
                Learn & Connect
              </span> <br />
              Through Dev Communities
            </h1>

            {/* Smart Descriptive Paragraph */}
            <p className="max-w-xl mx-auto lg:mx-0 text-sm sm:text-base md:text-lg leading-relaxed text-slate-600 font-medium">
              Join local hackathons, interactive workshops, meetups, and engineering conferences. 
              Grow your core stack network, match with tech leaders, and build your future.
            </p>

            {/* Action Buttons with Spring Animation */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/eventManage" className="w-full sm:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-dark to-brand-primary px-7 py-4 font-bold text-white shadow-lg shadow-brand-primary/20 transition-all"
                >
                  <span>Explore Events</span>
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>

            </div>

            {/* Upgraded Dynamic Search Box Container */}
           

            {/* Balanced & Clean Stats Row Grid */}
            <div className="pt-6 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 border-t border-slate-100 mt-8">
              <div className="bg-white/50 p-3 rounded-xl border border-slate-100">
                <h3 className="text-xl sm:text-2xl font-black text-brand-dark">15K+</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">Developers</p>
              </div>
              <div className="bg-white/50 p-3 rounded-xl border border-slate-100">
                <h3 className="text-xl sm:text-2xl font-black text-brand-dark">320+</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">Live Events</p>
              </div>
              <div className="bg-white/50 p-3 rounded-xl border border-slate-100">
                <h3 className="text-xl sm:text-2xl font-black text-brand-dark">50+</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">Organizers</p>
              </div>
              <div className="bg-white/50 p-3 rounded-xl border border-slate-100">
                <h3 className="text-xl sm:text-2xl font-black text-brand-dark">4.9 ★</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">Avg Rating</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Modern Floating Interactive Visual Vector */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-5 flex justify-center order-1 lg:order-2"
          >
            <div className="relative flex items-center justify-center">
              
              {/* Complex Multi-layered Decorative Rotating Orbit Background */}
              <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full border border-dashed border-brand-primary/30 animate-[spin_40s_linear_infinite]" />
              <div className="absolute w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] rounded-full border border-dotted border-brand-light/40 animate-[spin_60s_linear_infinite]" />

              {/* Central Floating Interactive Mesh Card Container */}
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="flex h-[240px] w-[240px] sm:h-[320px] sm:w-[320px] items-center justify-center rounded-full bg-gradient-to-tr from-brand-dark via-brand-primary to-brand-light shadow-[0_20px_50px_rgba(44,94,173,0.3)] border-4 border-white relative z-10"
              >
                {/* Micro Floating Floating Badge 1 */}
                <motion.div 
                  animate={{ x: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute -top-4 -left-4 bg-white shadow-lg rounded-2xl p-3 border border-slate-100 flex items-center gap-2"
                >
                  <div className="p-1.5 bg-green-50 rounded-lg text-green-500"><FiTrendingUp size={14} /></div>
                  <span className="text-[10px] font-black text-slate-800">Growth Active</span>
                </motion.div>

                {/* Micro Floating Floating Badge 2 */}
                <motion.div 
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-2 -right-4 bg-white shadow-lg rounded-2xl p-3 border border-slate-100 flex items-center gap-2"
                >
                  <div className="p-1.5 bg-amber-50 rounded-lg text-amber-500"><FiAward size={14} /></div>
                  <span className="text-[10px] font-black text-slate-800">Top Rated Platforms</span>
                </motion.div>

                {/* Inner Icon Box Card */}
                <div className="flex h-[180px] w-[180px] sm:h-[240px] sm:w-[240px] items-center justify-center rounded-full bg-white shadow-inner">
                  <FiUsers className="text-brand-primary" size={64} />
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;