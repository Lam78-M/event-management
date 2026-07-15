"use client";

import React, { useEffect, useState, useMemo } from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  ComposedChart,
  Bar,
  Line
} from "recharts";
import { ArrowLeft } from "@gravity-ui/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { User2 } from "lucide-react";

interface UserData {
  _id: { $oid: string } | string;
  name: string;
  email: string;
  role: string;
  createdAt: { $date: string } | string | Date;
}

export default function UserState() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ব্যাকএন্ড থেকে ইউজার ডাটা নিয়ে আসা
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_SERVER_URL}/api/users`);
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        } else {
          toast.error("Failed to fetch user database records.");
        }
      } catch (err) {
        toast.error("Error connecting to server node.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // 🔄 ডাটাবেজের 'createdAt' থেকে ডাইনামিক মান্থলি ডাটা জেনারেট করা
  const chartData = useMemo(() => {
    const monthsMap: { [key: string]: number } = {
      Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0,
      Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0
    };

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    users.forEach((user) => {
      if (user.createdAt) {
        let dateStr = "";
        if (typeof user.createdAt === "object" && "$date" in user.createdAt) {
          dateStr = user.createdAt.$date;
        } else {
          dateStr = user.createdAt as string;
        }

        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
          const monthName = monthNames[date.getMonth()];
          monthsMap[monthName] += 1;
        }
      }
    });

    let runningTotal = 0;
    return monthNames.map((month) => {
      const newSignups = monthsMap[month];
      runningTotal += newSignups;
      return {
        month,
        "New Signups": newSignups,
        "Total Growth": runningTotal
      };
    });
  }, [users]);

  return (
    <div className="p-6 md:p-10 w-full max-w-5xl mx-auto space-y-8 text-left mt-20">
      <ToastContainer position="top-center" autoClose={2000} />

      {/* 🔙 ব্যাক বাটন ও হেডার */}
      <div className="flex flex-col gap-4 border-b border-gray-200 pb-5">
        <Link 
          href="/admin/dashboard" // তোমার মেইন ড্যাশবোর্ডের লিঙ্ক এখানে দেবে
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#021A54] transition-colors w-fit"
        >
          <ArrowLeft /> Back to Dashboard
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#021A54] tracking-tight flex items-center gap-2">
              User Growth & Engagement Analytics 📈
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Dynamic real-time projection of user registrations and cumulative platform growth.
            </p>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-150 rounded-xl">
            <User2 className="text-indigo-600" />
            <span className="text-sm font-bold text-indigo-900">
              {loading ? "..." : users.length} Active Users
            </span>
          </div>
        </div>
      </div>

      {/* 📊 ডাইনামিক Recharts সেকশন */}
      {loading ? (
        <div className="w-full h-[400px] flex items-center justify-center bg-slate-900 rounded-2xl border border-slate-800">
          <span className="text-white text-sm animate-pulse">Synchronizing database node metrics...</span>
        </div>
      ) : (
        <div className="w-full p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Registration Pipeline Trend
              </h3>
              <p className="text-xs text-slate-400">Comparing monthly new registration spikes vs total trajectory.</p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Live Feed
            </div>
          </div>

          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff' 
                  }} 
                />
                <Legend verticalAlign="top" height={36} iconType="circle" />

                {/* মোট গ্রোথ দেখানোর জন্য Area Chart */}
                <Area 
                  name="Cumulative Growth"
                  type="monotone" 
                  dataKey="Total Growth" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorTotal)" 
                />

                {/* প্রতি মাসের নতুন সাইন-আপ বার চার্ট আকারে দেখানোর জন্য (ভীষণ প্রফেশনাল লাগবে) */}
                <Bar 
                  name="New Signups"
                  dataKey="New Signups" 
                  barSize={20} 
                  fill="#10b981" 
                  radius={[4, 4, 0, 0]}
                />

                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}