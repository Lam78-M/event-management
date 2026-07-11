"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { 
  FiGrid, FiCalendar, FiUser, FiSettings, 
  FiActivity, FiPlusCircle, FiSliders, FiShield, FiUsers, FiFileText,
  FiMenu, FiX 
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function UsersDashboard() {
  // 📌 Mobile Menu State Manager
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  
  // 🔗 Next.js current URL path hook reader (Eita diye automatic color highlit hobe)
  const pathname = usePathname(); 
  
  const currentRole = session?.user?.role || "user"; 

  const menuItems = {
    user: [
      { id: "overview", href: "/dashboard", name: "Overview", icon: <FiGrid className="w-4 h-4" /> },
      { id: "my-events", href: "/dashboard/registrations", name: "My Registrations", icon: <FiCalendar className="w-4 h-4" /> },
      { id: "profile", href: "/dashboard/profile", name: "Account Profile", icon: <FiUser className="w-4 h-4" /> },
    ],
    organizer: [
      { id: "overview", href: "/dashboard/organizer", name: "Organizer Console", icon: <FiActivity className="w-4 h-4" /> },
      { id: "create-event", href: "/dashboard/organizer/launchNewEvent", name: "Launch New Event", icon: <FiPlusCircle className="w-4 h-4" /> },
      { id: "manage-events", href: "/dashboard/organizer/streams", name: "Track Content Streams", icon: <FiSliders className="w-4 h-4" /> },
    ],
    admin: [
      { id: "overview", href: "/dashboard/admin", name: "System Admin Panel", icon: <FiShield className="w-4 h-4" /> },
      { id: "manage-users", href: "/dashboard/admin/users", name: "Control Accounts Grid", icon: <FiUsers className="w-4 h-4" /> },
      { id: "audit-logs", href: "/dashboard/admin/logs", name: "Audit Framework Logs", icon: <FiFileText className="w-4 h-4" /> },
    ]
  };

  const currentNav = menuItems[currentRole as keyof typeof menuItems] || menuItems.user;

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2C5EAD]"></div>
      </div>
    );
  }

  // 📝 Navigation handler
  const handleNavigation = (href: string) => {
    setIsMobileMenuOpen(false); // Mobile drawer autoshut toggle
    router.push(href); // Direct URL push node matrix trigger
  };

  // 📝 Sidebar Content Context (Desktop ar Mobile duitar jonno reusable layout)
  const sidebarContent = (
    <div className="flex flex-col h-full mt-20">
      {/* Profile Layer Header */}
      <div className="flex items-center justify-between px-2 py-1.5 bg-[#C4E2F5]/20 border border-[#C4E2F5]/40 rounded-2xl mb-6">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2C5EAD] to-[#4BB8FA] text-white flex items-center justify-center font-black uppercase shadow-sm shrink-0">
            {session?.user?.name ? session.user.name.charAt(0) : "U"}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-black text-slate-800 truncate">{session?.user?.name || "Guest Friend"}</h4>
            <span className={`inline-block px-2 py-0.5 text-[9px] font-black rounded-md uppercase tracking-widest mt-0.5 ${currentRole === "admin" ? "bg-red-100 text-red-600" : currentRole === "organizer" ? "bg-amber-100 text-amber-600" : "bg-[#C4E2F5] text-[#2C5EAD]"}`}>
              {currentRole}
            </span>
          </div>
        </div>

        {/* Mobile View Cross Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="md:hidden text-slate-500 hover:text-slate-800 p-1 rounded-lg border border-slate-200"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Streams */}
      <nav className="space-y-1.5 flex-1">
        {currentNav.map((item) => {
          // 🎯 CORE FIX: Path match logic config! URL match holei dynamic state high-fidelity color match hobe.
          const isActive = pathname === item.href;

          return (
            <button 
              key={item.id}
              onClick={() => handleNavigation(item.href)} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive ? "bg-[#2C5EAD] text-white shadow-lg shadow-[#2C5EAD]/20" : "text-slate-600 hover:bg-[#C4E2F5]/20 hover:text-[#2C5EAD]"}`}
            >
              {item.icon} {item.name}
            </button>
          );
        })}
      </nav>

      {/* Footer System Settings */}
      <div className="pt-4 border-t border-slate-100 mt-auto">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 rounded-xl transition-colors">
          <FiSettings className="w-4 h-4" /> Global Settings
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. DESKTOP SIDEBAR: Full view screen container alignment set */}
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-white border-r border-slate-200/80 p-5 shrink-0 box-border">
        {sidebarContent}
      </aside>

      {/* 2. MOBILE FLOATING ACTION BUTTON (Visible on Small Screens Only) */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex items-center justify-center w-14 h-14 bg-[#2C5EAD] hover:bg-[#1e4682] text-white rounded-full shadow-2xl transition-transform active:scale-95 border border-white/20"
        >
          <FiMenu className="w-6 h-6" />
        </button>
      </div>

      {/* 3. MOBILE DRAWER OVERLAY PANEL LAYER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop blur element filter wrapper */}
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Main Navigation Drawer Block */}
          <div className="relative flex w-full max-w-[280px] flex-col bg-white p-5 shadow-2xl border-r border-slate-200 h-full animate-in slide-in-from-left duration-200 ease-in-out">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}