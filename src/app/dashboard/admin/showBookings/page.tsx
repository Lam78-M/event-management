"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CircleCheck } from "@gravity-ui/icons";
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

export default function StaticBookingsDisplay() {
  const [bookings, setBookings] = useState<BookedEventNode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserBookingNodes = async () => {
      try {
        // 🛠️ নোট: তোমার ডাটাবেজে থাকা যেকোনো একটা ভ্যালিড ইমেইল এখানে বসিয়ে টেস্ট করো, 
        // যেন ব্যাকএন্ড অন্তত ডাটাটা পাঠায়।
        const testEmail = "admin@gmail.com"; 
        
        const res = await fetch(`${process.env.NEXT_SERVER_URL}/api/mybookings?email=${testEmail}`);
        if (!res.ok) throw new Error("Database network tunnel failure.");
        
        const data = await res.json();
        const parsedArray = Array.isArray(data) ? data : data.data || [];
        setBookings(parsedArray);
      } catch (err: any) {
        toast.error("Error loading registry: " + err.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchUserBookingNodes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#1591DC] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-16 px-4 md:px-8 pt-40 text-left">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="mb-8 border-b border-[#C4E2F5] pb-6">
          <h1 className="text-3xl font-black text-[#2C5EAD]">🗂️ Event Bookings Matrix View</h1>
          <p className="text-sm font-semibold text-[#1591DC] mt-1">Direct pipeline mapping without active session loops.</p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#C4E2F5] p-12 text-center max-w-md mx-auto">
            <p className="text-sm font-black text-[#2C5EAD]">No Data Found / Query Mismatch</p>
            <p className="text-xs text-slate-400 mt-1">ব্যাকএন্ড এই ইমেইলের আন্ডারে কোনো ডাটা খুঁজে পায়নি।</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-[#C4E2F5] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#C4E2F5] bg-[#C4E2F5]/20">
                    <th className="p-5 text-xs font-black text-[#2C5EAD] uppercase">Target Event Scope</th>
                    <th className="p-5 text-xs font-black text-[#2C5EAD] uppercase">Location Venue</th>
                    <th className="p-5 text-xs font-black text-[#2C5EAD] uppercase text-center">Event Schedule</th>
                    <th className="p-5 text-xs font-black text-[#2C5EAD] uppercase text-center">Security Status</th>
                    <th className="p-5 text-xs font-black text-[#2C5EAD] uppercase text-right">Price Matrix</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((node) => (
                    <tr key={node._id} className="border-b border-[#C4E2F5]/40 hover:bg-[#C4E2F5]/10 transition-colors">
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-8 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                            {node.image ? <img src={node.image} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-[#C4E2F5]/30 text-center text-[10px]">🎇</div>}
                          </div>
                          <div>
                            <div className="text-sm font-black text-slate-800">{node.title}</div>
                            <span className="text-[8px] font-black uppercase bg-[#C4E2F5]/50 text-[#2C5EAD] px-2 py-0.5 rounded-sm">{node.category}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 text-xs font-bold text-slate-700">{node.location}</td>
                      <td className="p-5 text-center text-xs font-black text-slate-700">{node.date} <span className="block text-[10px] text-slate-400">{node.time}</span></td>
                      <td className="p-5 text-center">
                        <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full border border-emerald-100 text-[9px] font-black uppercase">
                          <CircleCheck width="10" height="10"/> Secured
                        </div>
                      </td>
                      <td className="p-5 text-right text-xs font-black font-mono text-[#2C5EAD]">
                        {node.price?.toLowerCase() === "free" || node.price === "0" ? "FREE" : `$${node.price}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}