"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  
  CircleCheck
} from "@gravity-ui/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface BookedEventNode {
  _id: string;
  eventId: string;
  userEmail: string;
  title: string;
  date: string;
  time: string;
  location: string;
  price: string;
  category: string;
  image: string;
  bookedAt: string;
}

export default function UserBookingsDashboardPortal() {
  const { data: session, isPending: authLoading } = authClient.useSession();
  
  const [bookings, setBookings] = useState<BookedEventNode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!session?.user?.email) {
      if (!authLoading) setLoading(false);
      return;
    }

    const fetchUserBookingNodes = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/mybookings?email=${session.user.email}`);
        if (!res.ok) throw new Error("Sync pipeline processing failed with target database cloud coordinates.");
        
        const data = await res.json();
        const parsedArray = Array.isArray(data) ? data : data.data || [];
        setBookings(parsedArray);
      } catch (err: any) {
        toast.error("Pipeline error tracking nodes: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookingNodes();
  }, [session, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#1591DC] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-black text-[#2C5EAD] tracking-wider animate-pulse uppercase">Syncing Dashboard Streams...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl max-w-md w-full text-center border border-[#C4E2F5] shadow-sm space-y-4">
          <p className="text-rose-500 font-black text-xl">🔒 Security Lockdown</p>
          <p className="text-xs font-semibold text-slate-500">Please login to sync tracking profiles matrix context node loop layers.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 py-24 px-4 md:px-8 relative overflow-hidden pt-36">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Brand Aesthetic ambient overlay glows */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#C4E2F5]/20 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[550px] h-[550px] bg-[#4BB8FA]/10 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-8">
        
        {/* Dynamic Controls Header Without Email & Search Filter */}
        <div className="border-b border-[#C4E2F5] pb-6">
          <span className="text-[10px] bg-[#C4E2F5]/60 text-[#2C5EAD] px-3 py-1 rounded-full font-black uppercase tracking-widest">
            Active Control Gateway
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-[#2C5EAD] tracking-tight mt-1">My Booked Passes Matrix</h1>
        </div>

        {/* Dynamic Ticket Grid Mapping Engine */}
        <AnimatePresence mode="popLayout">
          {bookings.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl border border-[#C4E2F5] p-12 text-center max-w-md mx-auto space-y-3"
            >
              <div className="text-3xl text-slate-300">🎟️</div>
              <p className="text-sm font-black text-[#2C5EAD]">No Active Access Tokens Registered</p>
              <p className="text-xs font-semibold text-slate-400 leading-relaxed">System logs show no matching event access registration loops.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {bookings.map((item) => {
                
                // Safe price configuration
                const formattedPrice = item?.price 
                  ? (Number(item.price) === 0 || String(item.price).toLowerCase() === "free" ? "FREE ACCESS" : `$${item.price}`)
                  : "N/A";

                const displayBookedDate = item?.bookedAt 
                  ? new Date(item.bookedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
                  : "Date Unknown";

                return (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-full max-w-md bg-white rounded-[24px] border border-[#C4E2F5] shadow-sm hover:shadow-md hover:border-[#4BB8FA]/60 transition-all duration-300 overflow-hidden flex flex-col relative group"
                  >
                    {/* Visual Card Banner Graphic */}
                    <div className="aspect-[16/9] w-full bg-slate-50 relative overflow-hidden border-b border-[#C4E2F5]/40 shrink-0">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.title || "Pass Ticket"} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#C4E2F5]/40 to-[#4BB8FA]/10 text-4xl">🎟️</div>
                      )}
                      
                      <span className="absolute top-4 left-4 bg-[#2C5EAD] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-[#4BB8FA]/30 shadow-xs">
                        {item.category || "General"}
                      </span>

                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl border border-[#C4E2F5] flex items-center gap-1 shadow-xs">
                        <span className="text-emerald-500 flex shrink-0"><CircleCheck width="12" height="12"/></span>
                        <span className="text-[9px] font-black text-[#2C5EAD] uppercase tracking-wider">Secured</span>
                      </div>
                    </div>

                    {/* Metadata Content Body */}
                    <div className="p-6 flex-grow flex flex-col justify-between space-y-5">
                      <div className="space-y-3">
                        <h3 className="text-sm font-black text-[#2C5EAD] tracking-tight group-hover:text-[#1591DC] transition-colors duration-200 line-clamp-2 leading-snug">
                          {item.title || "Untitled Access Token"}
                        </h3>

                        <div className="space-y-2.5 pt-1 text-slate-600 text-[11px] font-bold">
                          <div className="flex items-center gap-3">
                            <span className="text-[#1591DC] bg-[#C4E2F5]/40 p-1.5 rounded-lg shrink-0"><Calendar width="14" height="14"/></span>
                            <span>{item.date || "Syncing Date..."}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[#1591DC] bg-[#C4E2F5]/40 p-1.5 rounded-lg shrink-0"><Clock width="14" height="14"/></span>
                            <span>{item.time ? `${item.time} Sync` : "TBA"}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[#1591DC] bg-[#C4E2F5]/40 p-1.5 rounded-lg shrink-0"><MapPin width="14" height="14"/></span>
                            <span className="line-clamp-1">{item.location || "Online Space Network"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Ticket Tear-off Cutout & Value Metric Only */}
                      <div className="pt-2">
                        <div className="relative w-full flex items-center justify-between py-1 mb-4 select-none pointer-events-none">
                          <div className="w-3 h-3 bg-slate-50 border-r border-[#C4E2F5] rounded-full absolute left-[-25px]" />
                          <div className="w-full border-t border-dashed border-[#C4E2F5]" />
                          <div className="w-3 h-3 bg-slate-50 border-l border-[#C4E2F5] rounded-full absolute right-[-25px]" />
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Pass Secured Value</p>
                            <p className="text-base font-black text-[#1591DC] tracking-tight mt-0.5">{formattedPrice}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cleaned Footer Without String ID Node */}
                    <div className="bg-slate-50/80 border-t border-[#C4E2F5]/50 px-6 py-2.5 text-[9px] font-bold text-slate-400 flex items-center justify-between shrink-0">
                      <span className="uppercase tracking-wide text-[8px] text-[#2C5EAD]/70 font-black">Verified Booking Registration</span>
                      <span>Booked: {displayBookedDate}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}