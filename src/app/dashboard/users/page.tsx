"use client";

import React, { useEffect, useState } from "react";
import { House, Magnifier, Bell, Calendar } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";

// Mock Data for User Registrations
const userEvents = [
  { id: 1, title: "National Next.js Hackathon 2026", date: "July 15, 2026", location: "Dhaka, BD", status: "Confirmed" },
  { id: 2, title: "Tailwind CSS Advanced Workshop", date: "July 22, 2026", location: "Online (Zoom)", status: "Pending" },
];

export default function DashboardContentPage() {
  const [userName, setUserName] = useState<string>("User");
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session?.user?.name) {
      setUserName(session.user.name);
    }
  }, [session]);

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
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Registrations</p>
            <h3 className="text-2xl font-black text-[#021A54] mt-1">12</h3>
          </div>
          <div className="p-3 bg-[#FF85BB]/10 text-[#FF85BB] rounded-xl"><Calendar /></div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Attended Workshops</p>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">8</h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-500 rounded-xl"><House /></div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Unread Alerts</p>
            <h3 className="text-2xl font-black text-amber-500 mt-1">4</h3>
          </div>
          <div className="p-3 bg-amber-50 text-amber-500 rounded-xl"><Bell /></div>
        </div>
      </div>

      {/* Booked Events Section */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 md:p-6 space-y-4">
        <h3 className="text-lg font-bold text-[#021A54] flex items-center gap-2">
          Your Upcoming Event Registrations
        </h3>
        
        <div className="space-y-3">
          {userEvents.map((event) => (
            <div 
              key={event.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl gap-3 transition-colors hover:border-[#FF85BB]/50"
            >
              <div>
                <h4 className="text-sm font-bold text-gray-800">{event.title}</h4>
                <p className="text-xs text-gray-500 mt-1 flex flex-wrap gap-x-4">
                  <span>📅 {event.date}</span>
                  <span>📍 {event.location}</span>
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold self-start sm:self-center ${event.status === "Confirmed" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                {event.status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}