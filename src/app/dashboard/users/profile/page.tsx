"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { 
  Person, 
  Envelope, 
  ShieldCheck, 
  Calendar,
  Gear
} from "@gravity-ui/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserProfileData {
  _id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export default function UserProfileDashboardPortal() {
  const { data: session, isPending: authLoading } = authClient.useSession();
  
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!session?.user?.email) {
      if (!authLoading) setLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_SERVER_URL}/api/userprofile?email=${session.user.email}`);
        if (!res.ok) throw new Error("Sync pipeline processing failed for user matrix data.");
        
        const data = await res.json();
        setProfile(data);
      } catch (err: any) {
        toast.error("Pipeline error tracking profile node: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [session, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#1591DC] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-black text-[#2C5EAD] tracking-wider animate-pulse uppercase">Syncing Profile Vector...</p>
        </div>
      </div>
    );
  }

  if (!session || !profile) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl max-w-md w-full text-center border border-[#C4E2F5] shadow-sm space-y-4">
          <p className="text-rose-500 font-black text-xl">🔒 Security Lockdown</p>
          <p className="text-xs font-semibold text-slate-500">Please login to view active identity core metrics loop.</p>
        </div>
      </div>
    );
  }

  // ডেট ফরম্যাটিং
  const memberSince = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    : "Syncing Index";

  return (
    <div className="min-h-screen bg-slate-50/60 py-24 px-4 md:px-8 relative overflow-hidden pt-36">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Brand Aesthetic background glows */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#C4E2F5]/20 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[550px] h-[550px] bg-[#4BB8FA]/10 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 space-y-8">
        
        {/* Profile Control Gateway Header */}
        <div className="border-b border-[#C4E2F5] pb-6 flex justify-between items-end">
          <div>
            <span className="text-[10px] bg-[#C4E2F5]/60 text-[#2C5EAD] px-3 py-1 rounded-full font-black uppercase tracking-widest">
              Identity Matrix Layer
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-[#2C5EAD] tracking-tight mt-1">My Security Profile</h1>
          </div>
          
          <button className="bg-white hover:bg-slate-50 text-slate-500 border border-[#C4E2F5] p-2.5 rounded-xl transition-all duration-200 cursor-pointer shadow-xs">
            <Gear width="16" height="16" />
          </button>
        </div>

        {/* Core Profile Card Widget */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white rounded-[32px] border border-[#C4E2F5] shadow-sm overflow-hidden flex flex-col md:flex-row"
        >
          {/* Left Hero Profile Segment */}
          <div className="p-8 bg-gradient-to-br from-[#C4E2F5]/30 to-[#4BB8FA]/5 border-b md:border-b-0 md:border-r border-[#C4E2F5]/40 flex flex-col items-center justify-center text-center md:w-72 shrink-0 space-y-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-[#1591DC] rounded-full blur-md opacity-20 group-hover:opacity-30 transition-all duration-300" />
              <img 
                src={profile.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb"} 
                alt={profile.name} 
                className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-sm relative z-10"
              />
              <span className="absolute bottom-1 right-1 bg-emerald-500 border-2 border-white w-4 h-4 rounded-full z-20" />
            </div>

            <div className="space-y-1 relative z-10">
              <h2 className="text-base font-black text-[#2C5EAD] tracking-tight line-clamp-1">{profile.name}</h2>
              <span className="inline-block text-[9px] bg-[#2C5EAD] text-white font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                {profile.role || "User"}
              </span>
            </div>
          </div>

          {/* Right Vector Metadata Grid */}
          <div className="p-8 flex-grow space-y-6">
            <h3 className="text-xs font-black text-[#2C5EAD] uppercase tracking-wider border-b border-[#C4E2F5]/40 pb-2">Account Registry Metadata</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Name Field */}
              <div className="space-y-1.5">
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider flex items-center gap-1.5">
                  <Person width="12" height="12" className="text-[#1591DC]"/> Full Identity Name
                </p>
                <div className="bg-slate-50 border border-[#C4E2F5]/50 px-4 py-3 rounded-xl text-xs font-bold text-slate-700">
                  {profile.name}
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider flex items-center gap-1.5">
                  <Envelope width="12" height="12" className="text-[#1591DC]"/> Account Routing Mail
                </p>
                <div className="bg-slate-50 border border-[#C4E2F5]/50 px-4 py-3 rounded-xl text-xs font-bold text-slate-700 truncate">
                  {profile.email}
                </div>
              </div>

              {/* Security Verification Node */}
              <div className="space-y-1.5">
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck width="12" height="12" className="text-[#1591DC]"/> Sync Protection Layer
                </p>
                <div className={`border px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between ${
                  profile.emailVerified 
                    ? "bg-emerald-50/40 border-emerald-200/60 text-emerald-700" 
                    : "bg-amber-50/40 border-amber-200/60 text-amber-700"
                }`}>
                  <span>{profile.emailVerified ? "Verified Sync" : "Unverified Protocol"}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${profile.emailVerified ? "bg-emerald-500" : "bg-amber-500"}`} />
                </div>
              </div>

              {/* Created Date */}
              <div className="space-y-1.5">
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar width="12" height="12" className="text-[#1591DC]"/> Genesis Node Date
                </p>
                <div className="bg-slate-50 border border-[#C4E2F5]/50 px-4 py-3 rounded-xl text-xs font-bold text-slate-700">
                  {memberSince}
                </div>
              </div>

            </div>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}