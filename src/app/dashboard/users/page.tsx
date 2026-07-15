"use client";

import React, { useEffect, useState } from "react";
import { House, Bell, Calendar } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";


// বুকিং ডেটার ইন্টারফেস
interface BookingItem {
  _id: string;
  title: string;
  date?: string;
  location?: string;
}

export default function DashboardContentPage() {
  const [userName, setUserName] = useState<string>("User");
  const { data: session, isPending: authLoading } = authClient.useSession();
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ১. সেশন থেকে ইউজার নেম সেট করা এবং ব্যাকএন্ড থেকে বুকিং ডেটা আনা
  useEffect(() => {
    if (session?.user?.name) {
      setUserName(session.user.name);
    }

    if (!session?.user?.email) {
      if (!authLoading) setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        // তোমার বুকিং এপিআই রুট
        const res = await fetch(`http://localhost:5000/api/mybookings?email=${session.user.email}`);
        if (res.ok) {
          const data = await res.json();
          setBookings(data);
        }
      } catch (err) {
        console.error("Failed to load metrics registry:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session, authLoading]);

  // ডাইনামিক বুকিং কাউন্ট সংখ্যা
  const totalBookingsCount = bookings.length;

  return (
    <div className="p-6 md:p-10 w-full max-w-7xl mx-auto space-y-8 text-left mt-20">
      
      {/* Header Banner */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl md:text-3xl font-bold text-[#021A54] flex items-center gap-2">
          Hello, {userName} 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome to your event hub. Track your event registrations, updates, and feedback.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        {/* 🎯 টোটাল বুকিং কার্ড (১০০% ডাইনামিক এবং প্রফেশনাল কালার ম্যাচড) */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Registrations</p>
            {loading || authLoading ? (
              <div className="h-7 w-12 bg-slate-100 animate-pulse rounded mt-1" />
            ) : (
              <h3 className="text-2xl font-black text-[#021A54] mt-1">
                {totalBookingsCount}
              </h3>
            )}
          </div>
          {/* তোমার থিমের সাথে কালার ব্যালেন্স করার জন্য নিখুঁত প্রফেশনাল ব্লু শেড */}
          <div className="p-3 bg-[#021A54]/5 text-[#021A54] rounded-xl border border-[#021A54]/10">
            <Calendar />
          </div>
        </div>
        
        {/* বাকি দুইটা কার্ডকে তোমার আগের থিমে রাখা হলো */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Attended Workshops</p>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">23</h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-500 rounded-xl"><House /></div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Unread Alerts</p>
            <h3 className="text-2xl font-black text-amber-500 mt-1">4</h3>
          </div>
          <div className="p-3 bg-amber-50 text-amber-500 rounded-xl"><Bell /></div>
        </div>
      </div>

      {/* Booked Events Section */}
      <div className="bg-white border border-gray-100 shadow-xs rounded-2xl p-5 md:p-6 space-y-4">
        <h3 className="text-lg font-bold text-[#021A54] flex items-center gap-2">
          Your Upcoming Event Registrations
        </h3>
        
        <div className="space-y-3">
          {loading || authLoading ? (
            <div className="space-y-2">
              <div className="h-16 w-full bg-slate-50 border border-slate-100 rounded-xl animate-pulse" />
              <div className="h-16 w-full bg-slate-50 border border-slate-100 rounded-xl animate-pulse" />
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center p-6 text-slate-400 text-xs font-medium bg-slate-50 rounded-xl border border-dashed border-slate-200">
              You haven't registered for any events yet.
            </div>
          ) : (
            bookings.map((event) => (
              <div 
                key={event._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl gap-3 transition-colors hover:border-[#021A54]/20"
              >
                <div>
                  <h4 className="text-sm font-bold text-gray-800">{event.title}</h4>
                  <p className="text-xs text-gray-500 mt-1 flex flex-wrap gap-x-4">
                    <span>📅 {event.date || "TBA"}</span>
                    <span>📍 {event.location || "Online Sync"}</span>
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold self-start sm:self-center bg-emerald-50 text-emerald-600">
                  Confirmed
                </span>
              </div>
            ))
          )}
        </div>
      </div>





 

    </div>
  );
}