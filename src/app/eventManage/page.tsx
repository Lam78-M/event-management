"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowUpRight, ChevronLeft, ChevronRight } from "@gravity-ui/icons";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  }
};

export default function EventsExplorePage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // 📈 Pagination States
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/eventmanage");
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
  }, []);

  // 🧮 Pagination Math calculations
  const totalPages = Math.ceil(events.length / itemsPerPage);
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  // 🔄 Smooth Window Scroller to clean view switch
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🎯 Dynamic Pagination Builder Matrix with Ellipsis (...) Logic
  const getPaginationRange = () => {
    const totalNumbers = 5; // Total page buttons to show at once aside from boundaries
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

  return (
    <div className="min-h-screen bg-slate-50/50 py-16 px-4 md:px-8 relative overflow-hidden pt-40">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#C4E2F5]/30 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#4BB8FA]/15 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Page Header Matrix */}
        <div className="mb-12 border-b border-[#C4E2F5] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl md:text-4xl font-black text-[#2C5EAD] tracking-tight"
            >
              🌊 Explore Live Event Streams
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm font-semibold text-[#1591DC] mt-1"
            >
              Discover, sync, and interface with global live activations.
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-xs font-bold uppercase tracking-wider bg-[#C4E2F5]/50 text-[#2C5EAD] px-4 py-2 rounded-full border border-[#4BB8FA]/30"
          >
            Total Pipelines: {events.length} Active
          </motion.div>
        </div>

        {/* Loading Matrix State Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-[420px] bg-white rounded-3xl border border-[#C4E2F5]/60 animate-pulse p-4 space-y-4">
                <div className="w-full h-48 bg-slate-200 rounded-2xl" />
                <div className="h-6 bg-slate-200 rounded-lg w-3/4" />
                <div className="h-4 bg-slate-200 rounded-lg w-1/2" />
                <div className="h-10 bg-slate-100 rounded-xl w-full mt-6" />
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white/60 backdrop-blur-md rounded-3xl border border-[#C4E2F5] shadow-inner"
          >
            <p className="text-[#1591DC] font-black text-lg">No active event matrices found in the database stream.</p>
            <p className="text-xs text-[#2C5EAD]/70 mt-1">Try deploying a new dataset mapping instance from the form.</p>
          </motion.div>
        ) : (
          <>
            {/* ACTIVE CARD GRID MAP (Sliced for current page) */}
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
                  whileHover={{ y: -8, transition: { duration: 0.2, ease: "easeInOut" } }}
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
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
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

            {/* 🌟 SHUNDOR PREMIUM PAGINATION CONTROL PANEL */}
            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-2 border-t border-[#C4E2F5]/50 pt-8">
                {/* Previous Page Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-10 w-10 flex items-center justify-center rounded-xl border border-[#C4E2F5] bg-white text-[#2C5EAD] shadow-sm hover:bg-[#C4E2F5]/30 disabled:opacity-40 disabled:hover:bg-white transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Main Dynamic Track Numbers */}
                {getPaginationRange().map((page, index) => {
                  if (page === "...") {
                    return (
                      <span
                        key={`ellipsis-${index}`}
                        className="h-10 w-10 flex items-center justify-center text-sm font-black text-[#1591DC]/60 select-none"
                      >
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

                {/* Next Page Button */}
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