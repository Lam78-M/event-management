"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { House, LayoutSideContentLeft } from "@gravity-ui/icons";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#021A54] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden text-center">
      
      {/* Background Floating Decorative Blurred Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#FF85BB]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="max-w-md mx-auto space-y-6 relative z-10">
        
        {/* Animated Big 404 Number Badge */}
        <div className="relative inline-block">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
            className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tighter leading-none select-none"
          >
            404
          </motion.h1>
          
          {/* Floating Emoji Node */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute -top-3 -right-3 text-3xl bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-xl"
          >
            🧭
          </motion.div>
        </div>

        {/* Error Typography Information Block */}
        <div className="space-y-2">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl md:text-2xl font-bold text-white tracking-tight"
          >
            Whoops! This Event Link is Expired
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm text-[#FFCEE3]/70 font-medium max-w-sm mx-auto leading-relaxed"
          >
            The execution node pipeline route you are seeking doesn&apos;t exist, has shifted timelines, or the registration booth is closed.
          </motion.p>
        </div>

        {/* Action Button Controls Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4"
        >
          <Link href="/" className="w-full sm:w-auto">
            <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FF85BB] hover:bg-[#ff6ca9] text-[#021A54] font-black text-sm rounded-xl shadow-lg shadow-[#FF85BB]/20 transition-all active:scale-98">
              <House className="h-4 w-4" /> Go Back Home
            </button>
          </Link>

          <Link href="/dashboard" className="w-full sm:w-auto">
            <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold text-sm rounded-xl transition-all">
              <LayoutSideContentLeft className="h-4 w-4" /> Enter Dashboard
            </button>
          </Link>
        </motion.div>

      </div>

      {/* Footer System Branding Node Code */}
      <div className="absolute bottom-6 left-0 right-0 text-[10px] font-mono text-slate-500 tracking-wider">
        CORE_GATEWAY_ROUTER_EXCEPTION // CODE: 0x404_NOT_FOUND
      </div>
    </div>
  );
}