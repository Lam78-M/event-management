"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FiGrid, 
  FiCalendar, 
  FiPlusCircle, 
  FiUser, 
  FiSettings, 
  FiTrendingUp, 
  FiClock, 
  FiCheckCircle, 
  FiMapPin, 
  FiBell,
  FiSearch
} from "react-icons/fi";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample Data for Typed Arrays
  const stats = [
    { title: "Registered Events", count: "12", icon: <FiCalendar />, change: "+3 this month", color: "text-[#2C5EAD]" },
    { title: "Attended Workshops", count: "8", icon: <FiCheckCircle />, change: "100% completion", color: "text-green-500" },
    { title: "Upcoming Schedules", count: "4", icon: <FiClock />, change: "Next: Tomorrow", color: "text-[#4BB8FA]" },
  ];

  const upcomingEvents = [
    { id: 1, title: "National Next.js Hackathon 2026", date: "July 15, 2026", time: "10:00 AM", location: "Dhaka, BD", tag: "Hackathon" },
    { id: 2, title: "Tailwind CSS Advanced Workshop", date: "July 22, 2026", time: "03:00 PM", location: "Online (Zoom)", tag: "Workshop" },
    { id: 3, title: "DevOps & Cloud Native Meetup", date: "Aug 02, 2026", time: "05:30 PM", location: "Chittagong, BD", tag: "Meetup" },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pt-20 flex">
      
      {/* 1. LEFT SIDEBAR: Desktop Navigation Controls */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200/80 p-5 space-y-6">
        <div className="flex items-center gap-3 px-2 py-1 bg-[#C4E2F5]/20 border border-[#C4E2F5]/40 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2C5EAD] to-[#4BB8FA] text-white flex items-center justify-center font-black">
            U
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-black text-slate-800 truncate">Sabbir Rahman</h4>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Developer Account</p>
          </div>
        </div>

        <nav className="space-y-1.5 flex-1">
          <button 
            onClick={() => setActiveTab("overview")} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === "overview" ? "bg-[#2C5EAD] text-white shadow-lg shadow-[#2C5EAD]/20" : "text-slate-600 hover:bg-[#C4E2F5]/20 hover:text-[#2C5EAD]"}`}
          >
            <FiGrid className="w-4 h-4" /> Overview
          </button>
          <button 
            onClick={() => setActiveTab("my-events")} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === "my-events" ? "bg-[#2C5EAD] text-white shadow-lg shadow-[#2C5EAD]/20" : "text-slate-600 hover:bg-[#C4E2F5]/20 hover:text-[#2C5EAD]"}`}
          >
            <FiCalendar className="w-4 h-4" /> My Registrations
          </button>
          <button 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-[#C4E2F5]/20 hover:text-[#2C5EAD] transition-all"
          >
            <FiPlusCircle className="w-4 h-4" /> Create Event
          </button>
          <button 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-[#C4E2F5]/20 hover:text-[#2C5EAD] transition-all"
          >
            <FiUser className="w-4 h-4" /> Account Profile
          </button>
        </nav>

        <div className="pt-4 border-t border-slate-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 rounded-xl transition-colors">
            <FiSettings className="w-4 h-4" /> Settings
          </button>
        </div>
      </aside>

      {/* 2. RIGHT MAIN BODY: Core Content Panel Grid */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Header Panel block row with Welcome Message & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Welcome Dashboard, Friend!</h1>
              <p className="text-xs sm:text-sm font-medium text-slate-500">Track and manage your upcoming registered tech configurations</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-500 relative hover:bg-slate-50 transition-colors">
                <FiBell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" alt="avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Metric Analytics Cards Row Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-3 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.title}</span>
                  <div className={`p-2 rounded-xl bg-[#C4E2F5]/30 ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.count}</h3>
                  <span className="text-[11px] font-black text-emerald-600 flex items-center gap-0.5 bg-emerald-50 px-2 py-0.5 rounded-lg">
                    <FiTrendingUp className="w-3 h-3" /> {stat.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Core Content Body: Two columns split view for events array data mapping */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Registered Active Events List array container */}
            <div className="lg:col-span-8 bg-white border border-slate-200/60 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-slate-800">Your Upcoming Event Timeline</h3>
                <span className="text-xs font-bold text-[#2C5EAD] hover:underline cursor-pointer">View All</span>
              </div>

              <div className="space-y-3">
                {upcomingEvents.map((event) => (
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
                      Ticket Access
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Interactive Community Mini Activity Panel */}
            <div className="lg:col-span-4 space-y-5">
              <div className="bg-gradient-to-br from-[#2C5EAD] to-[#4BB8FA] text-white p-5 rounded-2xl shadow-md space-y-4">
                <h4 className="text-base font-black">Need a Custom Event Spot?</h4>
                <p className="text-xs text-[#C4E2F5] leading-relaxed font-medium">
                  Publish workshops or local dev squad gathering meetups right now from your console management panel!
                </p>
                <button className="w-full bg-white text-[#2C5EAD] font-black text-xs py-3 rounded-xl transition-transform hover:scale-102 shadow-md">
                  + Launch New Stream
                </button>
              </div>

              <div className="bg-white border border-slate-200/60 rounded-2xl p-5 space-y-3 shadow-sm">
                <h4 className="text-sm font-black text-slate-800">Quick Event Search API</h4>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"><FiSearch size={14} /></span>
                  <input type="text" placeholder="Filter current track ID..." className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2C5EAD] text-xs font-semibold" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}