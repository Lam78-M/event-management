"use client";

import React from "react";
// 🛠️ Exact naming conversion mapped here
import UsersDashboard from "@/components/UsersDashboard"; 

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function Dashboardlayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50/50">
      {/* 🚀 Mapped properly with your correct component name */}
      <UsersDashboard />
      
      {/* Right nested dynamic route children configuration workspace panel */}
      <div className="flex-1 w-full pt-16 md:pt-0">
        {children}
      </div>
    </div>
  );
}