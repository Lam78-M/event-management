"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Form input entry configuration setup for clean rendering
interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactUsPage() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Form submit state simulation anchor pipeline
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please populate all mandatory framework parameters.");
      return;
    }

    setSubmitting(true);
    
    // Simulating API stream connection latency
    setTimeout(() => {
      toast.success("Data packet synchronized successfully! We will interface soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 py-24 px-4 md:px-8 relative overflow-hidden pt-40">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* 🌌 High-End Ambient Visual Lighting Nodes */}
      <div className="absolute top-[-5%] left-[-5%] w-[550px] h-[550px] bg-[#C4E2F5]/30 rounded-full filter blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[600px] h-[600px] bg-[#4BB8FA]/15 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Metadata Container */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block text-[10px] font-black tracking-widest uppercase bg-[#C4E2F5]/60 text-[#2C5EAD] px-4 py-1.5 rounded-full mb-3 border border-[#4BB8FA]/30"
          >
            Communication Channel Pipeline
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-[#2C5EAD] tracking-tight leading-none"
          >
            Get In <span className="text-[#1591DC]">Interface</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-semibold text-[#1591DC] mt-3"
          >
            Have deployment queries or custom framework feedback? Ping our support core node.
          </motion.p>
        </div>

        {/* Core Layout Split Grid System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* 📡 Left Node: Contact Details & Infrastructure Map Meta */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Quick Informational Metadata Cards */}
            <div className="bg-white/80 backdrop-blur-md border border-[#C4E2F5] p-6 rounded-3xl space-y-6 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="text-2xl bg-[#C4E2F5]/50 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-[#2C5EAD]">
                  📍
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#2C5EAD]">Main HQ Node</h4>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5 leading-relaxed">
                    Gulshan-2 Matrix Tower, Sector 12,<br />Dhaka, Bangladesh.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl bg-[#C4E2F5]/50 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-[#2C5EAD]">
                  ✉️
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#2C5EAD]">System Stream Email</h4>
                  <p className="text-xs font-bold text-[#1591DC] mt-0.5 select-all">
                    pipeline.support@matrixcore.io
                  </p>
                </div>
              </div>
            </div>

            {/* Premium Client-Side Isometric Map Canvas Grid Representation */}
            <div className="h-64 bg-gradient-to-tr from-[#C4E2F5]/40 to-[#4BB8FA]/20 rounded-3xl border border-[#C4E2F5] relative overflow-hidden shadow-inner group flex items-center justify-center p-6 text-center">
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-[#2C5EAD] uppercase border border-[#C4E2F5] shadow-xs">
                📡 Satellite Map Feed Active
              </div>
              <div className="space-y-2">
                <motion.div 
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="text-4xl"
                >
                  📍
                </motion.div>
                <h5 className="text-xs font-black text-[#2C5EAD]">Coordinates Locked</h5>
                <p className="text-[10px] font-bold text-[#1591DC]">23.7925° N, 90.4078° E // Cluster Alpha</p>
              </div>
              {/* Fake UI Scanner Line Grid for Futuristic Tech feel */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(75,184,250,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(75,184,250,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
            </div>
          </motion.div>

          {/* 📬 Right Node: Modern Interactive Glass Input Form Sheet */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="lg:col-span-7 bg-white/80 backdrop-blur-md border border-[#C4E2F5] rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-[#4BB8FA]/5 transition-all duration-300"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-[#2C5EAD] uppercase tracking-wide">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Adnan Chowdhury"
                    className="w-full bg-slate-50/50 border border-[#C4E2F5] rounded-xl px-4 py-3 text-sm font-semibold text-[#2C5EAD] placeholder-slate-400 outline-none focus:border-[#1591DC] focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-[#2C5EAD] uppercase tracking-wide">Email Stream *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full bg-slate-50/50 border border-[#C4E2F5] rounded-xl px-4 py-3 text-sm font-semibold text-[#2C5EAD] placeholder-slate-400 outline-none focus:border-[#1591DC] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-[#2C5EAD] uppercase tracking-wide">Subject Line</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Query regarding event integration pipelines..."
                  className="w-full bg-slate-50/50 border border-[#C4E2F5] rounded-xl px-4 py-3 text-sm font-semibold text-[#2C5EAD] placeholder-slate-400 outline-none focus:border-[#1591DC] focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-[#2C5EAD] uppercase tracking-wide">Message Payload *</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your operational requirement or request context..."
                  className="w-full bg-slate-50/50 border border-[#C4E2F5] rounded-xl px-4 py-4 text-sm font-semibold text-[#2C5EAD] placeholder-slate-400 outline-none focus:border-[#1591DC] focus:bg-white transition-all resize-none"
                />
              </div>

              {/* Dynamic Animated Form Trigger Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={submitting}
                className="w-full h-12 bg-gradient-to-r from-[#2C5EAD] to-[#1591DC] text-white text-sm font-black uppercase tracking-wider rounded-xl shadow-md shadow-[#2C5EAD]/20 hover:shadow-lg hover:shadow-[#2C5EAD]/30 disabled:opacity-50 transition-all duration-300 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Syncing Payload...</span>
                  </div>
                ) : (
                  <span>Dispatch Message Packet →</span>
                )}
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}