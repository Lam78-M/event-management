"use client";

import React from "react";

export default function DashboardContentPage() {
  return (
    <div className="p-6 md:p-10 text-center lg:text-left space-y-4">
      {/* 💡 Note: Sidebar component 'UsersDashboard' automatically links content blocks outside layout, so keep this main workspace clean or put specific child content here */}
      <div className="bg-white/80 p-8 rounded-3xl border border-slate-200/60 shadow-sm">
        <h2 className="text-xl font-black text-slate-800">
          Core Analytics Dashboard Module
        </h2>
        <p className="text-sm text-slate-500 font-semibold mt-1">
          Select any pipeline from the left navigation panel cluster to modify your event streams.
        </p>
      </div>
    </div>
  );
}