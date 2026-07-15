"use client";

import React, { useEffect, useState } from "react";
import { House, Person, Bell,  LayoutSideContentLeft } from "@gravity-ui/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserState from "@/components/UserState";

// 🎯 শুধু ইভেন্ট রিলেটেড রিসেন্ট অ্যাক্টিভিটি কার্ড
const recentEventActivities = [
  { id: 1, eventName: "Acoustic Live Session: Melodies of Monsoon", organizer: "safwan@example.com", status: "Approved", time: "5 mins ago", category: "Music" },
  { id: 2, eventName: "National Hackathon 2026", organizer: "tanvir@code.org", status: "Pending", time: "25 mins ago", category: "Tech" },
  { id: 3, eventName: "UI/UX Designer Meetup", organizer: "ahmed@design.co", status: "Under Review", time: "1 hr ago", category: "Design" },
  { id: 4, eventName: "Cyber Security Hack-Defense", organizer: "faisal@cyber.net", status: "Approved", time: "2 hrs ago", category: "Security" },
];

interface UserData {
  _id: { $oid: string } | string;
  name: string;
  email: string;
  role: string;
  createdAt: { $date: string } | string | Date;
  approved: boolean;
}

export default function DashboardContentPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [totalEvents, setTotalEvents] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDashboardData = async () => {
    try {
      const userRes = await fetch("http://localhost:5000/api/users");
      if (userRes.ok) {
        const userData = await userRes.json();
        setUsers(userData);
      }

      const eventRes = await fetch("http://localhost:5000/api/events/count");
      if (eventRes.ok) {
        const eventData = await eventRes.json();
        setTotalEvents(eventData.count);
      }
    } catch (err) {
      toast.error("Failed to synchronize active database node metrics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="p-6 md:p-10 w-full max-w-5xl mx-auto space-y-8 text-left mt-20">
      <ToastContainer position="top-center" autoClose={2000} />
      
      {/* 👑 Header Banner (Event Management Relevant) */}
      <div className="border-b border-gray-200 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#021A54] tracking-tight flex items-center gap-2">
            Event Admin Control Panel 👑
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-2xl">
            Monitor live event registrations, approve organizer applications, and manage platform submissions in real-time.
          </p>
        </div>
        
        <div className="flex items-center gap-2 self-start md:self-center px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          Live Event Pipeline: Active
        </div>
      </div>

      {/* 📊 Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Active Users */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Registered Users</p>
            <h3 className="text-2xl font-black text-[#021A54] mt-0.5">
              {loading ? "..." : users.length.toLocaleString()}
            </h3>
          </div>
          <div className="p-2.5 bg-blue-50 text-blue-500 rounded-xl"><Person /></div>
        </div>

        {/* 🌟 Total Events */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Live Active Events</p>
            <h3 className="text-2xl font-black text-[#021A54] mt-0.5">
              {loading ? "..." : totalEvents.toLocaleString()}
            </h3>
          </div>
          <div className="p-2.5 bg-[#FF85BB]/10 text-[#FF85BB] rounded-xl"><LayoutSideContentLeft /></div>
        </div>

        {/* System Node Status */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Server Status</p>
            <h3 className="text-2xl font-black text-emerald-600 mt-0.5">Online</h3>
          </div>
          <div className="p-2.5 bg-emerald-50 text-emerald-500 rounded-xl"><House /></div>
        </div>

        {/* Pending Approval Counts */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Organizer Requests</p>
            <h3 className="text-2xl font-black text-amber-500 mt-0.5">
              {loading ? "..." : users.filter(u => !u.approved).length} Pending
            </h3>
          </div>
          <div className="p-2.5 bg-amber-50 text-amber-500 rounded-xl"><Bell /></div>
        </div>
      </div>

      {/* 🎯 রিয়েল-টাইম ইভেন্ট সাবমিশন ও ভেরিফিকেশন পাইপলাইন */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold text-[#021A54] flex items-center gap-2">
            <LayoutSideContentLeft className="text-indigo-500" /> Live Event Submissions & Approvals
          </h3>
          <span className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full font-semibold">
            Realtime Stream
          </span>
        </div>

        <div className="divide-y divide-gray-100">
          {recentEventActivities.map((activity) => (
            <div key={activity.id} className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    {activity.category}
                  </span>
                  <span className="font-bold text-gray-800">{activity.eventName}</span>
                </div>
                <div className="text-xs text-gray-400 flex items-center gap-1.5">
                  <span>Submitted by:</span>
                  <span className="font-mono text-gray-500 bg-slate-50 px-1.5 py-0.5 rounded">{activity.organizer}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end md:self-center">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  activity.status === "Approved" 
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                    : activity.status === "Pending" 
                    ? "bg-amber-50 text-amber-600 border border-amber-100 animate-pulse" 
                    : "bg-blue-50 text-blue-600 border border-blue-100"
                }`}>
                  {activity.status}
                </span>
                <span className="text-xs text-gray-400 font-medium whitespace-nowrap">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
   <UserState/>
    </div>
  );
}