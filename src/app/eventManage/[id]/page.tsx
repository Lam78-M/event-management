"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client"; // 🚀 HERE: Better-Auth client interface link mounted!
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Ticket, 
  ArrowLeft 
} from "@gravity-ui/icons";
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
  status: "pending" | "approved";
}

export default function EventDetailedDisplayPortal() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string; 

  // 🎯 DYNAMIC USER GATEWAY: Better-Auth session runtime setup loader
  const { data: session } = authClient.useSession();

  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    const fetchSingleEventNode = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/eventmanage`);
        if (!res.ok) throw new Error("Synchronization failure with matrix storage.");
        const allEvents: EventData[] = await res.json();
        
        const targetMatch = allEvents.find((ev) => String(ev._id) === String(id));
        
        if (targetMatch) {
          setEvent(targetMatch);
        }
      } catch (err: any) {
        toast.error("Pipeline crash: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleEventNode();
  }, [id]);

  // 🏁 Dynamic Booking Dispatch Trigger Pipeline
  const handleBookingSubmit = async () => {
    if (!event) return;

    // 🔒 Security Gateway validation check
    if (!session || !session.user || !session.user.email) {
      toast.error("🔒 Authentication mismatch! Please log in to book this event.");
      return;
    }

    setBookingLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/mybookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: event._id,
          title: event.title,
          date: event.date,
          time: event.time,
          location: event.location,
          price: event.price,
          category: event.category,
          image: event.image,
          
          // 🚀 HERE: Session variable parameter structure mapped directly!
          userEmail: session.user.email, 
          
          bookedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Transaction verification failure on database write matrix.");
      toast.success("🎟️ Slot transaction secured successfully with user email!");
      router.push('/dashboard/users/bookings')

    } catch (error: any) {
      toast.error("Error dispatching data packet: " + error.message);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center ">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#1591DC] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-black text-[#2C5EAD] tracking-wider animate-pulse">LOADING PROFILE DATA...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-2xl max-w-sm w-full text-center shadow-sm space-y-3">
          <p className="text-rose-600 font-black text-base">⚠️ Data Node Absent</p>
          <button onClick={() => router.back()} className="px-4 py-2 bg-[#2C5EAD] text-white text-xs font-bold rounded-lg shadow-sm">
            Return Workspace
          </button>
        </div>
      </div> 
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 py-24 px-4 md:px-8 relative overflow-hidden pt-40">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#C4E2F5]/20 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[550px] h-[550px] bg-[#4BB8FA]/10 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-8">
        
        {/* Back navigation channel */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-xs font-black text-[#2C5EAD] uppercase tracking-wider bg-white/80 border border-[#C4E2F5] px-4 py-2 rounded-xl shadow-xs hover:bg-[#C4E2F5]/40 transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft width="16" height="16" /> Back to Matrix
        </button>

        {/* Core Layout Interface split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Image & Metadata description node */}
          <div className="lg:col-span-7 space-y-6">
            <div className="aspect-video bg-slate-200 rounded-3xl overflow-hidden border border-[#C4E2F5] shadow-sm relative">
              {event.image ? (
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#C4E2F5]/30 to-[#4BB8FA]/10 text-4xl">🎆</div>
              )}
              <span className="absolute top-4 left-4 bg-[#2C5EAD] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest border border-[#4BB8FA]/40 shadow-sm">
                {event.category}
              </span>
            </div>

            <div className="bg-white/80 backdrop-blur-md border border-[#C4E2F5] p-6 rounded-3xl space-y-4">
              <h1 className="text-2xl md:text-3xl font-black text-[#2C5EAD] tracking-tight leading-tight">{event.title}</h1>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed whitespace-pre-line">{event.description}</p>
            </div>
          </div>

          {/* Right Block: Dynamic Metadata & Active Action Form Node */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/90 backdrop-blur-md border border-[#C4E2F5] p-6 rounded-3xl shadow-sm space-y-6">
              <h3 className="text-sm font-black text-[#2C5EAD] uppercase tracking-wider border-b border-[#C4E2F5]/60 pb-3 flex items-center gap-2">
                ⏱️ Schedule Parameters
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-[#C4E2F5]/50 text-[#2C5EAD] w-10 h-10 rounded-xl flex items-center justify-center shrink-0"><Calendar width="18" height="18"/></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Target Date</p>
                    <p className="text-xs font-black text-[#2C5EAD]">{event.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-[#C4E2F5]/50 text-[#2C5EAD] w-10 h-10 rounded-xl flex items-center justify-center shrink-0"><Clock width="18" height="18"/></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Timestamp Sync</p>
                    <p className="text-xs font-black text-[#2C5EAD]">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-[#C4E2F5]/50 text-[#2C5EAD] w-10 h-10 rounded-xl flex items-center justify-center shrink-0"><MapPin width="18" height="18"/></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Deployment Space ({event.locationType})</p>
                    <p className="text-xs font-bold text-slate-600 line-clamp-1">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-[#C4E2F5]/50 text-[#2C5EAD] w-10 h-10 rounded-xl flex items-center justify-center shrink-0"><Ticket width="18" height="18"/></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Slots Available</p>
                    <p className="text-xs font-black text-[#2C5EAD]">{event.tickets} Tickets</p>
                  </div>
                </div>
              </div>

              {/* Pricing Metric Container */}
              <div className="bg-slate-50 border border-[#C4E2F5] p-4 rounded-2xl flex items-center justify-between">
                <span className="text-xs font-black text-[#2C5EAD] uppercase tracking-wide">Registration Fee</span>
                <span className="text-xl font-black text-[#1591DC] tracking-tight">
                  {Number(event.price) === 0 || event.price.toLowerCase() === "free" ? "FREE NODE" : `$${event.price}`}
                </span>
              </div>

              {/* 🚀 SUBMIT ACTION GATEWAY BUTTON */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBookingSubmit}
                disabled={bookingLoading}
                className="w-full h-12 bg-gradient-to-r from-[#2C5EAD] to-[#1591DC] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-md shadow-[#2C5EAD]/20 hover:shadow-lg hover:shadow-[#2C5EAD]/30 disabled:opacity-50 transition-all duration-300 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
              >
                {bookingLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Synchronizing Slot...</span>
                  </div>
                ) : (
                  <span>Book This Event Access Now →</span>
                )}
              </motion.button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}