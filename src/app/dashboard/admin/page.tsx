"use client";

import React, { useEffect, useState } from "react";
import { House, Person, Bell, Paperclip, LayoutSideContentLeft } from "@gravity-ui/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Mock System Logs for Admin View
const adminLogs = [
  { id: 1, action: "User role updated to Organizer", target: "safwan@example.com", time: "5 mins ago", level: "info" },
  { id: 2, action: "Server Node compiler sequence check", target: "Node-West-04", time: "12 mins ago", level: "success" },
  { id: 3, action: "Critical Event Approval Pending", target: "Hackathon 2026", time: "1 hr ago", level: "warning" },
];

interface UserData {
  _id: string;
  approved: boolean;
}

export default function DashboardContentPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [totalEvents, setTotalEvents] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // এপিআই থেকে রিয়েল-টাইম মেট্রিকেস ডাটা ফেচ করা
  const fetchDashboardData = async () => {
    try {
      // ১. ইউজার ডাটা ফেচিং
      const userRes = await fetch("http://localhost:5000/api/users");
      if (userRes.ok) {
        const userData = await userRes.json();
        setUsers(userData);
      }

      // ২. ইভেন্ট কাউন্ট ডাটা ফেচিং
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
      
      {/* Header Banner */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl md:text-3xl font-bold text-[#021A54]">
          System Admin Panel 👑
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Global database node matrices, control user account permissions, security logs audit interface.
        </p>
      </div>

      {/* 📊 Admin Operations Stats Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Active Users */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Active Users</p>
            <h3 className="text-2xl font-black text-[#021A54] mt-0.5">
              {loading ? "..." : users.length.toLocaleString()}
            </h3>
          </div>
          <div className="p-2.5 bg-blue-50 text-blue-500 rounded-xl"><Person /></div>
        </div>

        {/* 🌟 Total Events (নতুন রিয়েল-টাইম ফিল্ড) */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Events</p>
            <h3 className="text-2xl font-black text-[#021A54] mt-0.5">
              {loading ? "..." : totalEvents.toLocaleString()}
            </h3>
          </div>
          <div className="p-2.5 bg-[#FF85BB]/10 text-[#FF85BB] rounded-xl"><LayoutSideContentLeft /></div>
        </div>

        {/* System Node Status */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">System Node Status</p>
            <h3 className="text-2xl font-black text-emerald-600 mt-0.5">99.98%</h3>
          </div>
          <div className="p-2.5 bg-emerald-50 text-emerald-500 rounded-xl"><House /></div>
        </div>

        {/* Pending Approval Counts */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Pending Approvals</p>
            <h3 className="text-2xl font-black text-amber-500 mt-0.5">
              {loading ? "..." : users.filter(u => !u.approved).length} Forms
            </h3>
          </div>
          <div className="p-2.5 bg-amber-50 text-amber-500 rounded-xl"><Bell /></div>
        </div>
      </div>

      {/* Core Infrastructure Pipeline Logging System */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 md:p-6 space-y-4">
        <h3 className="text-base font-bold text-[#021A54] flex items-center gap-2">
          <Paperclip className="text-gray-400" /> Audit System Security Logs
        </h3>

        <div className="divide-y divide-gray-100">
          {adminLogs.map((log) => (
            <div key={log.id} className="py-3.5 flex flex-col sm:flex-row justify-between gap-2 text-sm">
              <div>
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${log.level === "success" ? "bg-emerald-500" : log.level === "warning" ? "bg-amber-500" : "bg-blue-500"}`} />
                <span className="font-bold text-gray-800">{log.action}</span>
                <span className="text-gray-400 mx-2">|</span>
                <span className="text-xs font-mono text-gray-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{log.target}</span>
              </div>
              <span className="text-xs text-gray-400 font-medium whitespace-nowrap sm:self-center">{log.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}