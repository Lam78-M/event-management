"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  FiActivity, FiUsers, FiTrendingUp, FiPlusCircle, 
  FiSliders, FiCalendar, FiMapPin, FiClock 
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function DashboardContentPage() {
  // 🌟 Better Auth Session layer theke user parameters sync
  const { data: session } = authClient.useSession();

  // Organizer Static Live Data Mock System
  const organizerStats = [
    { title: "Total Live Streams", count: "6 Active", icon: <FiActivity />, change: "+1 hosting tonight", color: "text-[#2C5EAD]", bg: "bg-[#C4E2F5]/30" },
    { title: "Registered Ticket Buyers", count: "1,420", icon: <FiUsers />, change: "92% retention rate", color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "Gross Income Metric", count: "$3,450", icon: <FiTrendingUp />, change: "+24% payout pipeline", color: "text-[#4BB8FA]", bg: "bg-cyan-50" },
  ];

  const hostedEvents = [
    { id: 1, title: "National Next.js Hackathon 2026", date: "July 15, 2026", time: "10:00 AM", location: "Dhaka, BD", tag: "Hackathon" },
    { id: 2, title: "Tailwind CSS Advanced Workshop", date: "July 22, 2026", time: "03:00 PM", location: "Online (Zoom)", tag: "Workshop" },
    { id: 3, title: "DevOps & Cloud Native Meetup", date: "Aug 02, 2026", time: "05:30 PM", location: "Chittagong, BD", tag: "Meetup" },
  ];

  return (
    <div className="p-6 md:p-10 text-center lg:text-left space-y-8 w-full max-w-5xl mx-auto mt-20">
      
      {/* 1. Header Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Welcome Back, <span className="bg-gradient-to-r from-[#2C5EAD] to-[#4BB8FA] bg-clip-text text-transparent capitalize">{session?.user?.name || "Organizer"}</span> 👋
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500">
            Configure, schedule, and view registered ticket parameters console stream.
          </p>
        </div>
        
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2C5EAD] text-white font-bold text-xs rounded-xl shadow-lg shadow-[#2C5EAD]/20 hover:bg-[#1e4682] transition-all self-center lg:self-start">
          <FiPlusCircle className="w-4 h-4" /> Create New Event
        </button>
      </div>

      {/* 2. Organizer Analytics Counters Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {organizerStats.map((stat, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -3 }}
            className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-3 relative overflow-hidden text-left"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.title}</span>
              <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">{stat.count}</h3>
              <span className="text-[10px] font-black text-emerald-600 flex items-center gap-0.5 bg-emerald-50 px-2 py-0.5 rounded-lg">
                <FiTrendingUp className="w-3 h-3" /> {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. Core Content Dashboard Lists Splits Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Live hosted streams list */}
        <div className="lg:col-span-8 bg-white border border-slate-200/60 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm text-left">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-black text-slate-800">Your Hosted Events Live Logs</h3>
            <span className="text-xs font-bold text-[#2C5EAD] hover:underline cursor-pointer">View All</span>
          </div>

          <div className="space-y-3">
            {hostedEvents.map((event) => (
              <div 
                key={event.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50/70 border border-slate-100 rounded-xl gap-3 transition-all hover:border-[#C4E2F5]"
              >
                <div className="space-y-1.5 min-w-0">
                  <span className="inline-block px-2.5 py-0.5 bg-[#C4E2F5]/40 text-[#2C5EAD] text-[10px] font-black rounded-lg uppercase tracking-wider">
                    {event.tag}
                  </span>
                  <h4 className="text-sm font-black text-slate-800 truncate">{event.title}</h4>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1"><FiCalendar className="w-3.5 h-3.5 text-[#4BB8FA]" /> {event.date}</span>
                    <span className="flex items-center gap-1"><FiMapPin className="w-3.5 h-3.5 text-slate-400" /> {event.location}</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white border border-slate-200 hover:border-[#2C5EAD] hover:text-[#2C5EAD] text-slate-700 text-xs font-bold rounded-xl transition-all shadow-sm shrink-0 sm:self-center">
                  Edit Setup
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Mini contextual quick action widgets */}
        <div className="lg:col-span-4 space-y-5 text-left">
          <div className="bg-gradient-to-br from-[#2C5EAD] to-[#4BB8FA] text-white p-5 rounded-2xl shadow-md space-y-4">
            <h4 className="text-sm font-black">Publish Live Form</h4>
            <p className="text-xs text-[#C4E2F5] leading-relaxed font-medium">
              Launch public landing pages, create ticket variants, and sync instant webhook parameters data streams directly to your servers.
            </p>
            <button className="w-full bg-white text-[#2C5EAD] font-black text-xs py-2.5 rounded-xl transition-transform hover:scale-102 shadow-md">
              🚀 Stream Live Form
            </button>
          </div>

          <div className="bg-white border border-slate-200/60 rounded-2xl p-4 space-y-2 shadow-sm">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">System Stability Node</h4>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All sync streams online (100%)</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}