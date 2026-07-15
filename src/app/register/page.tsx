"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiLock, FiUser, FiUserPlus, FiImage, FiCheck, FiX } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function RegisterPage() {
  const [role, setRole] = useState<"user" | "organizer" | "admin">("user");
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState(""); 
  const [loading, setLoading] = useState(false);

  // Password validation states
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [checks, setChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    numberOrSpecial: false,
  });

  // Real-time password validation logic
  useEffect(() => {
    setChecks({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numberOrSpecial: /[\d!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  const isPasswordValid = Object.values(checks).every(Boolean);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill in all mandatory fields! ❌");
      return;
    }

    // Checking strong password validation on submit
    if (!isPasswordValid) {
      toast.warning("Please meet all password requirements first! ⚠️");
      return;
    }

    setLoading(true);

    // 🎯 সলিউশন: একদম স্ট্যান্ডার্ড গ্রে জেন্ডার-লেস ডিফল্ট আইকন সেট করা হলো
    const fallbackDefaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    
    // ইউজার যদি ইনপুট ফিল্ড ফাঁকা রাখে তবে স্বয়ংক্রিয়ভাবে ডিফল্ট আইকনটি সেট হবে
    const finalImageUrl = imageUrl.trim() !== "" ? imageUrl.trim() : fallbackDefaultAvatar;

    await authClient.signUp.email({
      email: email.trim().toLowerCase(),
      password,
      name,
      image: finalImageUrl,
      
      ...({
        role: role
      } as Record<string, unknown>),

      fetchOptions: {
        onResponse: () => setLoading(false),
        onSuccess: () => {
          toast.success(`Registered successfully as ${role}! 🚀`);
          
          if (role === "admin") {
            router.push("/dashboard/admin");
          } else if (role === "organizer") {
            router.push("/organizer/dashboard");
          } else {
            router.push("/dashboard/users"); 
          }
          
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Registration Failed! ❌");
        },
      },
    });
  };

  const handleGoogleSignUp = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: role === "admin" ? "/admin/dashboard" : role === "organizer" ? "/organizer/dashboard" : "/dashboard"
      });
    } catch (err) {
      toast.error("Google registration failed! 🌐");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-brand-ice/30 via-white to-brand-light/10 px-4 pt-24 pb-12">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-white border border-brand-ice/60 rounded-3xl shadow-xl p-8 space-y-5">
        
        <div className="text-center space-y-1.5">
          <h2 className="text-3xl font-black text-brand-dark tracking-tight">Create Account</h2>
          <p className="text-sm text-gray-500">Register as attendee or publish global events</p>
        </div>

        {/* PREMIUM ROLE SELECTOR TABS COMPONENT CONFIG */}
        <div className="space-y-1.5">
          <label className="block text-xs font-black text-gray-600 uppercase">Select Platform Role</label>
          <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200/40">
            {(["user", "organizer", "admin"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`py-2 text-xs font-black rounded-lg uppercase tracking-wider transition-all ${role === r ? "bg-gradient-to-r from-brand-dark to-brand-primary text-white shadow-md" : "text-slate-500 hover:text-slate-800"}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Google Registration Trigger */}
        <button 
          onClick={handleGoogleSignUp}
          type="button"
          className="w-full flex items-center justify-center gap-3 font-bold border border-gray-200 text-gray-700 hover:bg-gray-50 p-3 rounded-xl transition-all text-sm shadow-sm"
        >
          <FaGoogle className="w-4 h-4 text-red-500" />
          <span>Sign Up with Google</span>
        </button>

        <div className="relative flex py-1 items-center text-[11px] text-gray-400 uppercase font-black tracking-wider">
          <div className="flex-grow border-t border-gray-100"></div>
          <span className="flex-shrink mx-3">Or regular register</span>
          <div className="flex-grow border-t border-gray-100"></div>
        </div>

        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="name" className="block text-xs font-bold text-gray-600 uppercase mb-2">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiUser /></span>
              <input 
                id="name"
                name="name"
                type="text" 
                autoComplete="name"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="John Doe" 
                className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-primary text-sm font-medium" 
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-bold text-gray-600 uppercase mb-2">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiMail /></span>
              <input 
                id="email"
                name="email"
                type="email" 
                autoComplete="email"
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
                autoComplete="new-password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                placeholder="Choose a strong password" 
                className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:outline-none text-sm font-medium transition-all ${
                  password ? (isPasswordValid ? "border-emerald-500 focus:border-emerald-500" : "border-rose-300 focus:border-rose-400") : "border-gray-200 focus:border-brand-primary"
                }`} 
                required
              />
            </div>

            {/* 🛡️ Smooth Password Validation Rules Box */}
            <AnimatePresence>
              {(isPasswordFocused || password.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-2 overflow-hidden"
                >
                  <span className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">
                    Password Strength Requirements:
                  </span>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs">
                      {checks.length ? <FiCheck className="text-emerald-500 shrink-0" /> : <FiX className="text-slate-300 shrink-0" />}
                      <span className={checks.length ? "text-emerald-700 font-bold" : "text-slate-500 font-medium"}>8+ Characters</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      {checks.uppercase ? <FiCheck className="text-emerald-500 shrink-0" /> : <FiX className="text-slate-300 shrink-0" />}
                      <span className={checks.uppercase ? "text-emerald-700 font-bold" : "text-slate-500 font-medium"}>1 Uppercase</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      {checks.lowercase ? <FiCheck className="text-emerald-500 shrink-0" /> : <FiX className="text-slate-300 shrink-0" />}
                      <span className={checks.lowercase ? "text-emerald-700 font-bold" : "text-slate-500 font-medium"}>1 Lowercase</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      {checks.numberOrSpecial ? <FiCheck className="text-emerald-500 shrink-0" /> : <FiX className="text-slate-300 shrink-0" />}
                      <span className={checks.numberOrSpecial ? "text-emerald-700 font-bold" : "text-slate-500 font-medium"}>Number/Symbol</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-xs font-bold text-gray-600 uppercase mb-2">Profile Image URL (Optional)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiImage /></span>
              <input 
                id="imageUrl"
                name="imageUrl"
                type="url" 
                autoComplete="photo"
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)} 
                placeholder="https://example.com/avatar.jpg" 
                className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-primary text-sm font-medium" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full flex items-center justify-center gap-2 font-bold bg-gradient-to-r from-brand-dark to-brand-primary text-white py-3.5 rounded-xl shadow-lg transition-all text-sm mt-2 disabled:opacity-50"
          >
            <span>{loading ? "Registering..." : `Register as ${role}`}</span>
            <FiUserPlus className="w-4 h-4" />
          </button>
        </form>
        
        <p className="text-center text-xs font-semibold text-gray-500">
          Already have an account? 
          <Link href="/login" className="text-brand-primary font-black hover:underline ml-1">Log In</Link>
        </p>
      </motion.div>
    </div>
  );
}