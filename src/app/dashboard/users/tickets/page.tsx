"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
// 🎯 আইকনগুলোর সঠিক নাম ইম্পোর্ট করা হলো
import { Calendar, ArrowDownToLine, Timeline, LocationArrow, TrashBin } from "@gravity-ui/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface BookingItem {
  _id: string;
  eventId: string;
  title: string;
  date?: string;
  time?: string;
  location?: string;
  price?: string | number;
  category?: string;
  image?: string;
  userEmail: string;
}

export default function MyBookingsTicketPage() {
  const { data: session, isPending: authLoading } = authClient.useSession();
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!session?.user?.email) {
      if (!authLoading) setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/mybookings?email=${session.user.email}`);
        if (!res.ok) throw new Error("Failed to synchronize booking streams.");
        const data = await res.json();
        setBookings(data);
      } catch (err: any) {
        toast.error("Error fetching bookings: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session, authLoading]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this event pass?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/mybookings/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        toast.success("🎯 Booking pass revoked from matrix.");
        setBookings((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error(data.message || "Failed to delete booking.");
      }
    } catch (err: any) {
      toast.error("Delete operation failed: " + err.message);
    }
  };

  const handleDownloadPDF = async (cardId: string, eventTitle: string) => {
    const { toPng } = await import("html-to-image");
    const { jsPDF } = await import("jspdf");

    const element = document.getElementById(`ticket-node-${cardId}`);
    if (!element) return;

    try {
      const actionZone = element.querySelector(`.action-zone-${cardId}`);
      if (actionZone) actionZone.classList.add("opacity-0");

      const dataUrl = await toPng(element, { 
        quality: 0.95,
        pixelRatio: 2, 
        cacheBust: true 
      });

      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "px",
          format: [img.width / 2, img.height / 2]
        });

        pdf.addImage(dataUrl, "PNG", 0, 0, img.width / 2, img.height / 2);
        pdf.save(`Ticket-${eventTitle.replace(/\s+/g, "-")}.pdf`);
        
        if (actionZone) actionZone.classList.remove("opacity-0");
        toast.success("🎟️ Ticket PDF successfully compiled!");
      };

    } catch (error) {
      console.error("PDF generation collapsed:", error);
      toast.error("Failed to compile digital pass PDF.");
      const actionZone = element.querySelector(`.action-zone-${cardId}`);
      if (actionZone) actionZone.classList.remove("opacity-0");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#1591DC] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-black text-[#2C5EAD] tracking-wider uppercase animate-pulse">Syncing Active Passes...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl max-w-md w-full text-center border border-[#C4E2F5] shadow-sm space-y-3">
          <p className="text-rose-500 font-black text-lg">🔒 Vault Locked</p>
          <p className="text-xs font-semibold text-slate-500">Please sign in to access your digital gate passes.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 py-24 px-4 md:px-8 relative pt-36">
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="border-b border-[#C4E2F5] pb-6">
          <span className="text-[10px] bg-[#C4E2F5]/60 text-[#2C5EAD] px-3 py-1 rounded-full font-black uppercase tracking-widest">
            Registry Portal
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-[#2C5EAD] tracking-tight mt-1">My Digital Tickets</h1>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#C4E2F5]/60 shadow-xs">
            <p className="text-slate-400 font-bold text-sm">No active digital passes registered in this session.</p>
          </div>
        ) : (
          <div className="space-y-6 flex flex-col items-center">
            {bookings.map((item) => {
              if (!item || !item._id) return null;

              return (
                <div 
                  key={item._id}
                  id={`ticket-node-${item._id}`}
                  className="bg-white border border-[#C4E2F5] rounded-[28px] shadow-xs hover:shadow-sm transition-all duration-300 overflow-hidden w-full flex flex-col md:flex-row relative"
                >
                  {/* বাম পাশ: ইমেজ */}
                  <div className="md:w-48 h-40 md:h-auto relative shrink-0 bg-slate-100">
                    <img 
                      src={item.image || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-[#2C5EAD] text-white font-black text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full">
                      {item.category || "General"}
                    </span>
                  </div>

                  {/* মাঝখান: মূল ডিটেইলস */}
                  <div className="p-6 flex-grow space-y-4 flex flex-col justify-between bg-white">
                    <div className="space-y-1.5">
                      <span className="text-[9px] text-[#1591DC] font-black uppercase tracking-wider">Confirmed Entrance Node</span>
                      <h3 className="text-base md:text-lg font-black text-[#2C5EAD] tracking-tight line-clamp-1">{item.title}</h3>
                      
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1 text-slate-600 text-xs font-semibold">
                        {/* 🎯 ক্যালেন্ডার আইকন */}
                        <p className="flex items-center gap-1.5 truncate">
                          <Calendar width="13" height="13" className="text-[#1591DC]" /> {item.date || "TBA"}
                        </p>
                        {/* 🎯 টাইমলাইন (ঘড়ি) আইকন */}
                        <p className="flex items-center gap-1.5 truncate">
                          <Timeline width="13" height="13" className="text-[#1591DC]" /> {item.time || "TBA"}
                        </p>
                        {/* 🎯 লোকেশন আইকন */}
                        <p className="col-span-2 flex items-center gap-1.5 truncate">
                          <LocationArrow width="13" height="13" className="text-[#1591DC]" /> {item.location || "Online Node Sync"}
                        </p>
                      </div>
                    </div>

                    <div className={`action-zone-${item._id} flex items-center gap-2 pt-3 border-t border-slate-100 transition-opacity duration-200`}>
                      {/* 🎯 ডাউনলোড আইকন */}
                      <button
                        onClick={() => handleDownloadPDF(item._id, item.title)}
                        className="bg-[#C4E2F5]/60 hover:bg-[#C4E2F5] text-[#2C5EAD] text-[10px] font-black px-4 py-2 rounded-xl border border-[#4BB8FA]/20 transition-all duration-200 flex items-center gap-1.5 uppercase tracking-wider cursor-pointer"
                      >
                        <ArrowDownToLine width="12" height="12" /> Download Ticket
                      </button>

                      {/* 🎯 ট্র্যাশ বাটন আইকন */}
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-rose-50 hover:bg-rose-100 text-rose-600 text-[10px] font-black px-3 py-2 rounded-xl border border-rose-200/40 transition-all duration-200 flex items-center gap-1 cursor-pointer"
                      >
                        <TrashBin width="12" height="12" /> Cancel Pass
                      </button>
                    </div>
                  </div>

                  {/* টিকিট টিকিট ভাইব ডিভাইডার */}
                  <div className="hidden md:flex flex-col justify-between items-center py-4 select-none pointer-events-none bg-white relative">
                    <div className="w-4 h-2 bg-slate-50 border-b border-[#C4E2F5] rounded-b-full absolute top-[-1px] z-10" />
                    <div className="w-0.5 h-full border-r-2 border-dashed border-[#C4E2F5]/70 my-1" />
                    <div className="w-4 h-2 bg-slate-50 border-t border-[#C4E2F5] rounded-t-full absolute bottom-[-1px] z-10" />
                  </div>

                  {/* ডান পাশ: টিয়ার-অফ স্টাব কাউন্টারফয়েল */}
                  <div className="p-6 bg-slate-50/50 md:w-44 shrink-0 flex flex-row md:flex-col justify-between items-center text-center border-t md:border-t-0 border-[#C4E2F5]/40">
                    <div className="hidden md:block space-y-0.5">
                      <p className="text-[8px] text-slate-400 font-black uppercase tracking-wider">Gateway Access</p>
                      <div className="text-[9px] font-bold text-slate-500 truncate max-w-[120px]">{item.userEmail}</div>
                    </div>

                    <div className="w-14 h-14 bg-white border border-[#C4E2F5] p-1 rounded-xl shadow-2xs overflow-hidden relative">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=booking-${item._id}`} 
                        alt="QR Code" 
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="text-right md:text-center">
                      <p className="text-[8px] text-slate-400 font-black uppercase tracking-wider">Price Valve</p>
                      <p className="text-base font-black text-[#2C5EAD]">${item.price || "0"}</p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}