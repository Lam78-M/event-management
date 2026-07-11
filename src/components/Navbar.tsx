"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { 
  FiHome, 
  FiCalendar, 
  FiPlusCircle, 
  FiUser, 
  FiLogOut, 
  FiMenu, 
  FiX, 
  FiActivity,
  FiInfo, 
  FiGrid
} from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Better Auth Live Session Linker
  const { data: session, isPending } = authClient.useSession();

  // 🌟 TypeScript Strict User Role Casting Mechanism (Bypasses compilation flags smoothly)
  const currentRole = (session?.user as Record<string, unknown>)?.role as string || "user";

  // 🚀 DYNAMIC LOGIC ROUTING SCHEME: User role er upor bhab kore exact dashboard link layout set hobe
  let dashboardHref = "/dashboard"; // Default base layout setup fallback

  if (currentRole === "admin") {
    dashboardHref = "/dashboard/admin";
  } else if (currentRole === "organizer") {
    dashboardHref = "/dashboard/organizer";
  } else {
    dashboardHref = "/dashboard/users"; // Normal client base endpoint user
  }

  // 3 routes for logged-out users
  const loggedOutLinks = [
    { name: "Home", href: "/", icon: <FiHome className="w-4 h-4" /> },
    { name: "Events", href: "/events", icon: <FiCalendar className="w-4 h-4" /> },
    { name: "About", href: "/sections/aboutSection", icon: <FiInfo className="w-4 h-4" /> },
  ];

  // 🌟 6 routes for logged-in users (Dynamic dashboardHref mapping included safely)
  const loggedInLinks = [
    { name: "Home", href: "/", icon: <FiHome className="w-4 h-4" /> },
    { name: "Events", href: "/events", icon: <FiCalendar className="w-4 h-4" /> },
    { name: "Add Event", href: "/events/add", icon: <FiPlusCircle className="w-4 h-4" /> },
    { name: "Manage Events", href: "/events/manage", icon: <FiActivity className="w-4 h-4" /> },
    { name: "Profile", href: "/profile", icon: <FiUser className="w-4 h-4" /> },
    { name: "Dashboard", href: dashboardHref, icon: <FiGrid className="w-4 h-4" /> }, // 👈 Dynamic variable assignment injection points
  ];

  const activeLinks = session ? loggedInLinks : loggedOutLinks;

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    setIsOpen(false);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully! 👋");
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Logout Failed!");
        }
      }
    });
  };

  if (isPending) {
    return <div className="h-16 bg-white/70 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-brand-ice/20" />;
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-xl shadow-md z-50 border-b border-brand-ice/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-black text-xl text-brand-dark tracking-tight">
            <div className="p-2 bg-gradient-to-tr from-brand-dark to-brand-primary rounded-xl text-white shadow-md">
              <FiActivity className="w-5 h-5 animate-pulse" />
            </div>
            <span className="bg-gradient-to-r from-brand-dark to-brand-primary bg-clip-text text-transparent">EventSphere</span>
          </Link>

          {/* Desktop Navigation links */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-1 bg-brand-ice/20 p-1.5 rounded-2xl border border-brand-ice/30">
              {activeLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 ${isActive ? "text-white" : "text-gray-600 hover:text-brand-primary"}`}
                  >
                    {isActive && (
                      <motion.span layoutId="activeNav" className="absolute inset-0 bg-gradient-to-r from-brand-dark to-brand-primary rounded-xl z-[-1]" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                    )}
                    <span className="flex items-center gap-1.5">{link.icon}{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Desktop User profile section + LOGOUT button */}
          <div className="hidden lg:flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all border border-red-100 shadow-sm"
                >
                  <FiLogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>

                {/* Profile Image Trigger */}
                <div className="relative">
                  <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center ring-2 ring-brand-primary/40 rounded-full p-0.5 focus:outline-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-8 h-8 rounded-full object-cover" src={session.user.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb"} alt={session.user.name} />
                  </button>
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-2 w-56 bg-white border border-brand-ice/60 rounded-2xl shadow-xl z-20 py-2 overflow-hidden">
                          <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50/50">
                            <p className="text-[10px] font-bold text-gray-400 uppercase">Signed in as</p>
                            <p className="text-xs font-black text-brand-dark truncate">{session.user.email}</p>
                          </div>
                          <Link href="/profile" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-gray-600 hover:bg-brand-ice/20">
                            <FiUser className="w-4 h-4 text-brand-primary" /> My Profile
                          </Link>
                          {/* Quick access logic routing role parameter display tag links */}
                          <Link href={dashboardHref} onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-gray-600 hover:bg-brand-ice/20 border-t border-slate-100">
                            <FiGrid className="w-4 h-4 text-brand-primary" /> Core Dashboard
                          </Link>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="px-4 py-2 text-sm font-bold text-brand-dark hover:bg-brand-ice/30 rounded-xl transition-colors">Log In</Link>
                <Link href="/register" className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-brand-primary to-brand-light shadow-lg rounded-xl transition-all">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Hamburger Menu Toggler */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-xl bg-gray-50 border border-gray-200">
              {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer (Hamburger content block with profile Image and data bindings) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white border-t border-brand-ice/30 shadow-inner overflow-hidden">
            <div className="px-4 pt-3 pb-6 space-y-2">
              
              {session && (
                <div className="flex items-center gap-3 p-3 bg-brand-ice/10 rounded-2xl border border-brand-ice/30 mb-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-primary/40 flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={session.user.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb"} 
                      alt="avatar" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-black text-brand-dark truncate">{session.user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                  </div>
                </div>
              )}

              {/* Dynamic Links Navigation List */}
              {activeLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className={`flex items-center gap-3 font-semibold p-3 rounded-xl ${pathname === link.href ? "bg-gradient-to-r from-brand-dark to-brand-primary text-white" : "text-gray-600 hover:bg-gray-50"}`}>
                  {link.icon} {link.name}
                </Link>
              ))}

              {/* Bottom Action Section inside mobile responsive drawer */}
              <div className="pt-4 border-t border-gray-100 mt-3">
                {session ? (
                  <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 font-bold text-red-600 bg-red-50 p-3 rounded-xl text-sm border border-red-100">
                    <FiLogOut className="w-4 h-4" /> Log Out Account
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center font-bold text-brand-dark bg-brand-ice/30 p-3 rounded-xl text-sm">Log In</Link>
                    <Link href="/register" onClick={() => setIsOpen(false)} className="flex items-center justify-center font-bold text-white bg-gradient-to-r from-brand-primary to-brand-light p-3 rounded-xl text-sm">Sign Up</Link>
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}