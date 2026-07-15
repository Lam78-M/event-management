"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiLogIn, FiInfo } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields! ❌");
      return;
    }

    setLoading(true);

    await authClient.signIn.email({
      email,
      password,
      fetchOptions: {
        onResponse: () => setLoading(false),
        onSuccess: () => {
          toast.success("Login Successful! 🚀");
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Invalid Credentials! ❌");
        },
      },
    });
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/"
      });
    } catch (err) {
      toast.error("Google authentication failed! 🌐");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-brand-ice/30 via-white to-brand-light/10 px-4 pt-24 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full max-w-md bg-white border border-[#C4E2F5] rounded-3xl shadow-xl p-8 space-y-6"
      >
        <div className="text-center space-y-1.5">
          <h2 className="text-3xl font-black text-brand-dark tracking-tight">Welcome Back</h2>
          <p className="text-sm text-gray-500">Sign in to manage your active schedules</p>
        </div>

        {/* ℹ️ DEMO CREDENTIALS DISPLAY CARD */}
        <div className="bg-[#C4E2F5]/25 border border-[#C4E2F5] p-4 rounded-2xl space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-black text-[#2C5EAD] uppercase tracking-wider">
            <FiInfo className="w-4 h-4 text-[#1591DC]" />
            <span>Sandbox Accounts</span>
          </div>
          
          <div className="grid grid-cols-1 gap-2.5 text-xs text-slate-600 font-semibold">
            {/* Admin Creds */}
            <div className="bg-white/80 p-2.5 rounded-xl border border-slate-100">
              <span className="block text-[10px] font-black text-[#1591DC] uppercase tracking-wide mb-1">👑 Admin Dashboard</span>
              <div className="flex flex-col gap-0.5">
                <p>Email:<code className="bg-slate-100 text-[#2C5EAD] px-1.5 py-0.5 rounded font-mono text-[16px]">admin@gmail.com </code></p>
                <p>Pass:  <code className="bg-slate-100 text-[#2C5EAD] px-1.5 py-0.5 rounded font-mono text-[16px] ">User123##</code></p>
              </div>
            </div>

            {/* Organizer Creds */}
            <div className="bg-white/80 p-2.5 rounded-xl border border-slate-100">
              <span className="block text-[10px] font-black text-[#4BB8FA] uppercase tracking-wide mb-1">💼 Users Hub</span>
              <div className="flex flex-col gap-0.5">
                <p>Email: <code className="bg-slate-100 text-[#2C5EAD] px-1.5 py-0.5 rounded font-mono">users@gmail.com</code></p>
                <p>Pass: <code className="bg-slate-100 text-[#2C5EAD] px-1.5 py-0.5 rounded font-mono">User123##</code></p>
              </div>
            </div>
          </div>
        </div>

        {/* Google Sign In Trigger */}
        <button 
          onClick={handleGoogleLogin}
          type="button"
          className="w-full flex items-center justify-center gap-3 font-bold border border-gray-200 text-gray-700 hover:bg-gray-50 p-3 rounded-xl transition-all text-sm shadow-sm"
        >
          <FaGoogle className="w-4 h-4 text-red-500" />
          <span>Continue with Google</span>
        </button>

        <div className="relative flex py-1 items-center text-[11px] text-gray-400 uppercase font-black tracking-wider">
          <div className="flex-grow border-t border-gray-100"></div>
          <span className="flex-shrink mx-4">or use email</span>
          <div className="flex-grow border-t border-gray-100"></div>
        </div>

        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-gray-600 uppercase mb-2">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiMail /></span>
              <input 
                id="email"
                name="email"
                type="email" 
                autoComplete="username email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="name@example.com" 
                className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-primary text-sm font-medium" 
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-xs font-bold text-gray-600 uppercase mb-2">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiLock /></span>
              <input 
                id="password"
                name="password"
                type="password" 
                autoComplete="current-password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••" 
                className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-primary text-sm font-medium" 
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 font-bold bg-gradient-to-r from-brand-dark to-brand-primary text-white py-3.5 rounded-xl shadow-lg text-sm mt-2 disabled:opacity-50">
            <span>{loading ? "Verifying..." : "Sign In Account"}</span>
            <FiLogIn className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs font-semibold text-gray-500">
          New to organization? <Link href="/register" className="text-brand-primary font-black hover:underline ml-1">Create Account</Link>
        </p>
      </motion.div>
    </div>
  );
}