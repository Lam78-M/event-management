"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// Dynamic Categories Array with metadata for rich UI representation
const CATEGORIES = [
  { id: "business", label: "Business & Corporate", emoji: "💼", total: 42, desc: "Conferences, networking & corporate summits." },
  { id: "workshops", label: "Workshops", emoji: "🎓", total: 28, desc: "Interactive bootcamps & skills enhancement." },
  { id: "seminars", label: "Seminars", emoji: "📚", total: 19, desc: "Educational talks and academic discourse." },
  { id: "sports", label: "Sports", emoji: "🏃", total: 34, desc: "Marathons, tournaments & fitness meets." },
  { id: "entertainment", label: "Entertainment", emoji: "🎭", total: 89, desc: "Live music, theater, standups & open mics." },
  { id: "art", label: "Art & Culture", emoji: "🎨", total: 23, desc: "Exhibitions, cultural fests & galleries." },
  { id: "tech", label: "Technology", emoji: "💻", total: 76, desc: "Hackathons, DevCons & futuristic tech expo." },
  { id: "food", label: "Food & Drinks", emoji: "🍽️", total: 51, desc: "Food festivals, wine tasting & culinary trails." },
  { id: "wedding", label: "Wedding & Celebration", emoji: "💒", total: 15, desc: "Gala nights, match-making & anniversaries." },
  { id: "charity", label: "Charity & Fundraising", emoji: "❤️", total: 12, desc: "Social impacts, auctions & global donation drives." },
  { id: "community", label: "Community", emoji: "👨‍👩‍👧", total: 37, desc: "Local assemblies, support groups & social hubs." },
  { id: "gaming", label: "Gaming & Esports", emoji: "🎮", total: 64, desc: "LAN parties, competitive tournaments & streams." },
  { id: "travel", label: "Travel & Adventure", emoji: "✈️", total: 48, desc: "Trekking trips, global tours & camping groups." },
  { id: "kids", label: "Kids & Family", emoji: "👶", total: 20, desc: "Amusement programs & child-friendly activities." },
];

// Grid Entrance Motion Configuration Matrices - Strictly Type-Casted
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring" as const, // 👈 Locked as spring literal type
      stiffness: 120, 
      damping: 14 
    } 
  }
};

export default function EventCategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Clean filtration computing node
  const filteredCategories = CATEGORIES.filter((category) =>
    category.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/60 py-20 px-4 md:px-8 relative overflow-hidden pt-40">
      
      {/* 🌌 Premium Ambient Glassmorphism Glow Blobs */}
      <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-[#C4E2F5]/40 rounded-full filter blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[550px] h-[550px] bg-[#4BB8FA]/20 rounded-full filter blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 📑 Header Block Area */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block text-[10px] font-black tracking-widest uppercase bg-[#C4E2F5]/60 text-[#2C5EAD] px-4 py-1.5 rounded-full mb-4 border border-[#4BB8FA]/30"
          >
            Categorical Matrix Directory
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-[#2C5EAD] tracking-tight leading-none"
          >
            Explore Event Hubs
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-semibold text-[#1591DC] mt-3"
          >
            Interface with specialized pipelines tailored precisely to your preferred domain activations.
          </motion.p>

          {/* 🔍 Dynamic Search Node */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 relative"
          >
            <input
              type="text"
              placeholder="Search specific domain pipelines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/70 backdrop-blur-md border border-[#C4E2F5] text-[#2C5EAD] placeholder-[#1591DC]/60 text-sm font-bold px-5 py-3.5 rounded-2xl outline-none focus:border-[#1591DC] focus:ring-2 focus:ring-[#4BB8FA]/20 transition-all shadow-xs"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1591DC]/80 font-black text-xs pointer-events-none bg-[#C4E2F5]/40 px-2.5 py-1 rounded-lg">
              {filteredCategories.length} Matches
            </div>
          </motion.div>
        </div>

        {/* 🎛️ Interactive Categories Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredCategories.map((cat) => {
              const isSelected = selectedCategory === cat.id;

              return (
                <motion.div
                  key={cat.id}
                  variants={cardVariants}
                  layout
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ 
                    y: -6, 
                    boxShadow: "0 20px 30px -10px rgba(75, 184, 250, 0.2)"
                  }}
                  onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
                  className={`relative p-6 rounded-3xl border backdrop-blur-md cursor-pointer flex flex-col justify-between overflow-hidden transition-all duration-300 group select-none ${
                    isSelected
                      ? "bg-gradient-to-br from-[#2C5EAD] to-[#1591DC] border-[#2C5EAD] shadow-lg shadow-[#2C5EAD]/30"
                      : "bg-white/80 border-[#C4E2F5] hover:border-[#4BB8FA]/60"
                  }`}
                >
                  {/* Decorative Background Accent Lines */}
                  <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full transition-colors duration-300 pointer-events-none ${
                    isSelected ? "bg-[#4BB8FA]/20" : "bg-[#C4E2F5]/30 group-hover:bg-[#4BB8FA]/15"
                  }`} />

                  {/* Top Data Segment Row */}
                  <div className="flex items-start justify-between">
                    <div className={`text-3xl p-2 rounded-2xl transition-all duration-300 ${
                      isSelected ? "bg-white/20" : "bg-[#C4E2F5]/40 group-hover:scale-110"
                    }`}>
                      {cat.emoji}
                    </div>
                    <span className={`text-xs font-black px-3 py-1 rounded-full border tracking-wide transition-all ${
                      isSelected 
                        ? "bg-white text-[#2C5EAD] border-white" 
                        : "bg-[#C4E2F5]/30 text-[#2C5EAD] border-[#4BB8FA]/20"
                    }`}>
                      {cat.total} Events
                    </span>
                  </div>

                  {/* Middle and Lower Label Segment */}
                  <div className="mt-6 z-10">
                    <h3 className={`text-lg font-black tracking-tight leading-tight transition-colors ${
                      isSelected ? "text-white" : "text-[#2C5EAD] group-hover:text-[#1591DC]"
                    }`}>
                      {cat.label}
                    </h3>
                    
                    <p className={`text-xs font-semibold mt-2 line-clamp-2 transition-colors ${
                      isSelected ? "text-[#C4E2F5]" : "text-[#1591DC]/80"
                    }`}>
                      {cat.desc}
                    </p>
                  </div>

                  {/* Bottom Pipeline Status Action Trigger */}
                  <div className={`mt-5 pt-4 border-t flex items-center justify-between z-10 transition-colors duration-300 border-dashed ${
                    isSelected ? "border-white/20" : "border-[#C4E2F5]"
                  }`}>
                    <span className={`text-[10px] font-bold tracking-wider uppercase transition-colors ${
                      isSelected ? "text-white" : "text-[#2C5EAD]/60"
                    }`}>
                      {isSelected ? "✦ Selected Pipeline" : "Explore Stream"}
                    </span>
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                      isSelected 
                        ? "bg-white text-[#2C5EAD]" 
                        : "bg-[#C4E2F5]/60 text-[#2C5EAD] group-hover:bg-[#2C5EAD] group-hover:text-white"
                    }`}>
                      <span className="text-xs font-black">→</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* 🛠️ Safe Fallback Node */}
        {filteredCategories.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white/50 backdrop-blur-md rounded-3xl border border-[#C4E2F5]/70"
          >
            <p className="text-[#2C5EAD] font-black text-lg">No active event matrices match your search.</p>
            <p className="text-xs text-[#1591DC] mt-1">Refine your query or check back for real-time category synchronizations.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}