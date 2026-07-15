"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowUpRight, ChevronLeft, ChevronRight, Magnifier, ArrowRotateLeft } from "@gravity-ui/icons";
import Link from "next/link";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Better Auth ক্লায়েন্ট হেল্পার ইমপোর্ট করো
import { authClient } from "@/lib/auth-client"; 

interface EventData {
  _id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  locationType: "venue" | "online";
  location: string;
  tickets: string;
  price: string;
  description: string;
  image: string;
}

// 🎯 টাইপ ডিফাইন এবং 'as const' ব্যবহার করে টাইপ লকিং ফিক্স করা হলো
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring" as const, // 👈 as const যুক্ত করা হয়েছে
      stiffness: 120, 
      damping: 18 
    } 
  }
};

export default function EventsExplorePage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  // 🔍 সার্চ ও ফিল্টার স্টেটস
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLocationType, setSelectedLocationType] = useState<string>("");

  // 🛡️ Better Auth সেশন স্টেট
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    // সেশন পেন্ডিং থাকলে অথবা সেশন না থাকলে ডাটা ফেচ করার দরকার নেই
    if (isPending || !session) return;

    const fetchEvents = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_SERVER_URL}/api/eventmanage`);
        if (!res.ok) throw new Error("Failed to capture database layout payload.");
        const data = await res.json();
        setEvents(data);
      } catch (err: any) {
        toast.error(err.message || "Network synchronization pipeline error.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [session, isPending]);

  // 🎛️ ইউনিক ক্যাটাগরি লিস্ট
  const categories = Array.from(new Set(events.map((e) => e.category)));

  // ⚙️ সার্চ এবং ফিল্টারিং লজিক প্রসেস
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "" || event.category === selectedCategory;
    const matchesLocation = selectedLocationType === "" || event.locationType === selectedLocationType;

    return matchesSearch && matchesCategory && matchesLocation;
  });

  // 🔄 রিসেট ফাংশন
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedLocationType("");
    setCurrentPage(1);
    toast.info("Search node filters reset successfully.");
  };

  // 📄 পেজিনেশন হিসাব-নিকাশ
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedLocationType]);

  const getPaginationRange = () => {
    const totalNumbers = 5;
    const siblingCount = 1;

    if (totalPages <= totalNumbers + 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftSpill = leftSiblingIndex > 2;
    const showRightSpill = rightSiblingIndex < totalPages - 1;

    if (!showLeftSpill && showRightSpill) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "...", totalPages];
    }

    if (showLeftSpill && !showRightSpill) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1);
      return [1, "...", ...rightRange];
    }

    if (showLeftSpill && showRightSpill) {
      let middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [1, "...", ...middleRange, "...", totalPages];
    }
    
    return [];
  };

  // 🕒 ১. লোডিং স্টেট
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50/50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2C5EAD]" />
      </div>
    );
  }

  // 🔒 ২. লগইন না থাকলে প্রটেক্টেড ভিউ
  if (!session) {
    return (
      <div className="min-h-screen bg-slate-50/50 py-16 px-4 md:px-8 relative overflow-hidden pt-40 flex items-center justify-center">
        {/* Background Blurs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#C4E2F5]/20 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#4BB8FA]/10 rounded-full filter blur-[150px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-3xl border border-[#C4E2F5] p-8 text-center shadow-xl relative z-10 space-y-6"
        >
          <div className="text-6xl">🔒</div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-[#2C5EAD]">Access Restricted</h2>
            <p className="text-sm font-semibold text-slate-500 leading-relaxed">
              To explore, search, and interface with live synchronized event matrices, you need to sign in first.
            </p>
          </div>
          
          <div className="pt-2">
            <Link href="/login">
              <button className="w-full py-3 bg-[#2C5EAD] hover:bg-[#1591DC] text-white font-black rounded-xl text-sm transition-all duration-300 shadow-md hover:shadow-lg">
                Proceed to Login
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // 🔓 ৩. লগইন করা থাকলে অরিজিনাল ভিউ
  return (
    <div className="min-h-screen bg-slate-50/50 py-16 px-4 md:px-8 relative overflow-hidden pt-40 text-left">
      <ToastContainer position="top-center" autoClose={2500} />

      {/* Background Blur Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#C4E2F5]/20 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#4BB8FA]/10 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-8 border-b border-[#C4E2F5] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl md:text-4xl font-black text-[#2C5EAD] tracking-tight"
            >
              🌊 Explore Live Event Streams
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 }}
              className="text-sm font-semibold text-[#1591DC] mt-1"
            >
              Welcome back, {session.user?.name || "Explorer"}! Discover and sync global live activations.
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-xs font-bold uppercase tracking-wider bg-[#C4E2F5]/50 text-[#2C5EAD] px-4 py-2 rounded-full border border-[#4BB8FA]/30 shadow-sm align-middle self-start md:self-end"
          >
            Matches Found: {filteredEvents.length} Nodes
          </motion.div>
        </div>

        {/* 🔮 MULTI-SEARCH SEARCH DECK PANEL */}
        <div className="mb-12 bg-white/70 backdrop-blur-md rounded-3xl border border-[#C4E2F5] p-5 md:p-6 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* 1. Keyword Search */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-black text-[#2C5EAD] tracking-wide uppercase">Search Event</label>
            <div className="relative flex items-center">
              <Magnifier className="absolute left-4 w-4 h-4 text-[#1591DC]" />
              <input
                type="text"
                placeholder="Type title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 text-xs font-semibold bg-white border border-[#C4E2F5] rounded-xl text-slate-700 placeholder-[#1591DC]/50 focus:outline-none focus:border-[#2C5EAD] focus:ring-1 focus:ring-[#2C5EAD] transition-all"
              />
            </div>
          </div>

          {/* 2. Dynamic Category Select */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-black text-[#2C5EAD] tracking-wide uppercase">Category Matrix</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 text-xs font-bold bg-white border border-[#C4E2F5] rounded-xl text-slate-700 focus:outline-none focus:border-[#2C5EAD] transition-all cursor-pointer accent-[#2C5EAD]"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* 3. Location Type Configuration */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-black text-[#2C5EAD] tracking-wide uppercase">Environment Type</label>
            <select
              value={selectedLocationType}
              onChange={(e) => setSelectedLocationType(e.target.value)}
              className="w-full px-4 py-3 text-xs font-bold bg-white border border-[#C4E2F5] rounded-xl text-slate-700 focus:outline-none focus:border-[#2C5EAD] transition-all cursor-pointer"
            >
              <option value="">All Environments</option>
              <option value="venue">📍 Venue (Physical)</option>
              <option value="online">🌐 Online (Virtual)</option>
            </select>
          </div>

          {/* 4. Reset Filters Action Button */}
          <div>
            <button
              type="button"
              onClick={handleResetFilters}
              disabled={!searchQuery && !selectedCategory && !selectedLocationType}
              className="w-full py-3 bg-[#C4E2F5]/40 hover:bg-[#2C5EAD] text-[#2C5EAD] hover:text-white disabled:bg-slate-100 disabled:text-slate-400 font-black rounded-xl text-xs transition-all duration-300 border border-[#C4E2F5] disabled:border-slate-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              <ArrowRotateLeft className="w-4 h-4" />
              Reset System Matrix
            </button>
          </div>
        </div>

        {/* Loading Matrix State Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-[420px] bg-white rounded-3xl border border-[#C4E2F5]/60 animate-pulse p-4 space-y-4">
                <div className="w-full h-48 bg-slate-200 rounded-2xl" />
                <div className="h-6 bg-slate-200 rounded-lg w-3/4" />
                <div className="h-4 bg-slate-200 rounded-lg w-1/2" />
                <div className="h-10 bg-slate-100 rounded-xl w-full mt-6" />
              </div>
            ))}
          </div>
        ) : currentEvents.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white/60 backdrop-blur-md rounded-3xl border border-[#C4E2F5] shadow-inner"
          >
            <p className="text-[#1591DC] font-black text-lg">No active event matrices match your criteria.</p>
            <button 
              onClick={handleResetFilters} 
              className="mt-4 px-5 py-2.5 bg-[#2C5EAD] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#1591DC] transition-colors"
            >
              Clear Search Query
            </button>
          </motion.div>
        ) : (
          <>
            {/* ACTIVE CARD GRID MAP */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {currentEvents.map((event) => (
                <motion.div
                  key={event._id}
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeInOut" as const } }} // 👈 as const যুক্ত করা হয়েছে
                  className="bg-white/80 backdrop-blur-md rounded-3xl border border-[#C4E2F5] shadow-sm hover:shadow-xl hover:shadow-[#4BB8FA]/10 overflow-hidden flex flex-col group transition-all duration-300"
                >
                  <div className="h-48 w-full overflow-hidden relative bg-slate-100">
                    <div className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur-md text-[#2C5EAD] text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full shadow-sm border border-[#C4E2F5]">
                      {event.category}
                    </div>
                    
                    <div className="absolute top-3 right-3 z-20 bg-[#2C5EAD] text-white text-xs font-black px-3 py-1 rounded-full shadow-sm">
                      {Number(event.price) === 0 ? "FREE" : `$${event.price}`}
                    </div>

                    {event.image ? (
                      <Image 
                        src={event.image} 
                        alt={event.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                        priority={currentPage === 1} 
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-[#C4E2F5]/50 to-[#4BB8FA]/30 text-[#1591DC] font-bold text-sm">
                        No Media Payload
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[#1591DC] text-xs font-bold">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#4BB8FA]" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#4BB8FA]" />
                          <span>{event.time}</span>
                        </div>
                      </div>

                      <h2 className="text-lg font-black text-[#2C5EAD] line-clamp-2 leading-snug group-hover:text-[#1591DC] transition-colors">
                        {event.title}
                      </h2>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[#C4E2F5]/60 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-slate-600 max-w-[65%]">
                        <MapPin className="w-4 h-4 text-[#1591DC] shrink-0" />
                        <span className="text-xs font-bold truncate tracking-wide">
                          {event.locationType === "online" ? "🌐 Online: " : "📍 "}
                          {event.location}
                        </span>
                      </div>

                      <Link href={`/eventManage/${event._id}`}>
                        <motion.div 
                          whileTap={{ scale: 0.95 }}
                          className="h-9 w-9 bg-[#C4E2F5]/60 group-hover:bg-[#2C5EAD] text-[#2C5EAD] group-hover:text-white rounded-xl flex items-center justify-center shadow-sm transition-all duration-300 cursor-pointer"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </motion.div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* PAGINATION PANEL */}
            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-2 border-t border-[#C4E2F5]/50 pt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-10 w-10 flex items-center justify-center rounded-xl border border-[#C4E2F5] bg-white text-[#2C5EAD] shadow-sm hover:bg-[#C4E2F5]/30 disabled:opacity-40 disabled:hover:bg-white transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {getPaginationRange().map((page, index) => {
                  if (page === "...") {
                    return (
                      <span key={`ellipsis-${index}`} className="h-10 w-10 flex items-center justify-center text-sm font-black text-[#1591DC]/60 select-none">
                        ...
                      </span>
                    );
                  }

                  const isCurrent = page === currentPage;
                  return (
                    <button
                      key={`page-${page}`}
                      onClick={() => handlePageChange(page as number)}
                      className={`h-10 min-w-10 px-3 flex items-center justify-center text-sm font-black rounded-xl transition-all duration-300 shadow-sm border ${
                        isCurrent
                          ? "bg-[#2C5EAD] border-[#2C5EAD] text-white scale-105"
                          : "bg-white border-[#C4E2F5] text-[#2C5EAD] hover:bg-[#C4E2F5]/40"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-10 w-10 flex items-center justify-center rounded-xl border border-[#C4E2F5] bg-white text-[#2C5EAD] shadow-sm hover:bg-[#C4E2F5]/30 disabled:opacity-40 disabled:hover:bg-white transition-all duration-200"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}