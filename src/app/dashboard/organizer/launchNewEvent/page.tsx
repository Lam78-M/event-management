"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Calendar, 
  LayoutSideContentLeft, 
  Envelope, 
  Picture // 📸 Image/Logo representation context icon
} from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { toast } from "react-toastify"; // 🎯 Toast functionality added

// 🛠️ Typings explicitly resolved for Framer Motion Variants
const formSectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, 
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" }
  })
};

export default function CreateEventForm() {
  // Local Form Component State Management
  const [formData, setFormData] = useState({
    title: "",
    category: "tech",
    date: "",
    time: "",
    locationType: "venue",
    location: "",
    tickets: "",
    price: "",
    description: "",
    image: "" // 🎯 Image Base64 data string matrix initialization
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🎯 Local dynamic image compiler conversion pipeline
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB safety limit
        toast.error("Image too large! Keep it below 5MB threshold.");
        return;
      }
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
        toast.success("Image banner buffered successfully!");
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 🎯 Standard Toastify Loader instance stream
    const toastId = toast.loading("Deploying new event payload timeline structure...");
    
    try {
      // 🚀 BACKEND PIPELINE COUPLING
      const response = await fetch("http://localhost:5000/api/eventmanage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong during instance provisioning.");
      }

      // Update loader to success state
      toast.update(toastId, {
        render: "🎉 Event launched successfully on the global stream matrix!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      
      // Clear state data layout forms fields
      setFormData({
        title: "",
        category: "tech",
        date: "",
        time: "",
        locationType: "venue",
        location: "",
        tickets: "",
        price: "",
        description: "",
        image: "" // Clear output image placeholder
      });

    } catch (error: any) {
      // Update loader to error state
      toast.update(toastId, {
        render: error.message || "Failed to establish integration synchronization network stream.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-3xl mx-auto p-4 md:p-8 text-left mt-20 relative"
    >
      {/* Dynamic Floating Ambient Glow Design Elements */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#C4E2F5]/20 rounded-full filter blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-10 left-1/4 w-60 h-60 bg-[#4BB8FA]/10 rounded-full filter blur-3xl pointer-events-none z-0" />

      <div className="relative z-10">
        {/* Form Header Intro Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-8 border-b border-[#C4E2F5]/60 pb-5"
        >
          <h1 className="text-2xl md:text-3xl font-black text-[#2C5EAD] flex items-center gap-2">
            🚀 Launch New Event Stream
          </h1>
          <p className="text-sm text-[#1591DC] font-semibold mt-1">
            Deploy your instance to the global timeline framework. Fill up metadata routing attributes below.
          </p>
        </motion.div>

        {/* Main Interactive Form Component */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 1. CORE DETAILS GRID SECTION */}
          <motion.div 
            custom={0} 
            variants={formSectionVariants} 
            initial="hidden" 
            animate="visible"
            whileHover={{ y: -2 }}
            className="bg-slate-50/50 backdrop-blur-md p-5 md:p-6 rounded-2xl border border-[#C4E2F5]/60 shadow-sm space-y-4 transition-shadow hover:shadow-md"
          >
            <h3 className="text-sm font-black text-[#2C5EAD] uppercase tracking-wider flex items-center gap-2">
              <LayoutSideContentLeft className="text-[#1591DC]" /> Core Information Nodes
            </h3>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#2C5EAD] uppercase tracking-wide">Event Title</label>
              <input 
                type="text" name="title" required value={formData.title} onChange={handleChange}
                placeholder="e.g., National Next.js Hackathon 2026"
                className="w-full px-4 py-3 bg-white border border-[#C4E2F5] rounded-xl text-sm font-medium focus:outline-none focus:border-[#1591DC] transition-all text-slate-800 focus:ring-2 focus:ring-[#4BB8FA]/30"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#2C5EAD] uppercase tracking-wide">Event Track Category</label>
                <select 
                  name="category" value={formData.category} onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-[#C4E2F5] rounded-xl text-sm font-medium focus:outline-none focus:border-[#1591DC] transition-all text-slate-800"
                >
                  <option value="tech">Tech Hackathon & Summit</option>
                  <option value="workshop">Advanced Workshop Streams</option>
                  <option value="medical">Medical Health Seminar</option>
                  <option value="corporate">Corporate Business Hub</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#2C5EAD] uppercase tracking-wide">Total Tickets</label>
                  <input 
                    type="number" name="tickets" required min="1" value={formData.tickets} onChange={handleChange}
                    placeholder="500"
                    className="w-full px-4 py-3 bg-white border border-[#C4E2F5] rounded-xl text-sm font-medium focus:outline-none focus:border-[#1591DC] transition-all text-slate-800 focus:ring-2 focus:ring-[#4BB8FA]/30"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#2C5EAD] uppercase tracking-wide">Price ($)</label>
                  <input 
                    type="number" name="price" required min="0" value={formData.price} onChange={handleChange}
                    placeholder="Free (0)"
                    className="w-full px-4 py-3 bg-white border border-[#C4E2F5] rounded-xl text-sm font-medium focus:outline-none focus:border-[#1591DC] transition-all text-slate-800 focus:ring-2 focus:ring-[#4BB8FA]/30"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* 🎯 IMAGE UPLOAD CONTAINER SECTION */}
          <motion.div 
            custom={1} 
            variants={formSectionVariants} 
            initial="hidden" 
            animate="visible"
            whileHover={{ y: -2 }}
            className="bg-slate-50/50 backdrop-blur-md p-5 md:p-6 rounded-2xl border border-[#C4E2F5]/60 shadow-sm space-y-4 transition-shadow hover:shadow-md"
          >
            <h3 className="text-sm font-black text-[#2C5EAD] uppercase tracking-wider flex items-center gap-2">
              <Picture className="text-[#1591DC]" /> Event Graphic Asset / Logo
            </h3>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#2C5EAD] uppercase tracking-wide block">Select Attachment</label>
              <input 
                type="file" 
                accept="image/*"
                required
                onChange={handleImageChange}
                className="w-full px-4 py-2.5 bg-white border border-[#C4E2F5] rounded-xl text-sm font-medium focus:outline-none file:mr-4 file:py-1.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#C4E2F5]/40 file:text-[#2C5EAD] hover:file:bg-[#C4E2F5]/70 text-slate-600 cursor-pointer"
              />
              
              {/* Media layout visual validation wrapper */}
              {formData.image && (
                <div className="mt-4 border rounded-xl overflow-hidden max-h-40 w-full max-w-xs relative bg-slate-100 flex items-center justify-center shadow-inner">
                  <img src={formData.image} alt="Logo/Banner Stream Matrix" className="object-cover max-h-40 w-full" />
                </div>
              )}
            </div>
          </motion.div>

          {/* 2. TIMELINE AND GEOLOCATION CONFIGURATION MATRIX */}
          <motion.div 
            custom={2} 
            variants={formSectionVariants} 
            initial="hidden" 
            animate="visible"
            whileHover={{ y: -2 }}
            className="bg-slate-50/50 backdrop-blur-md p-5 md:p-6 rounded-2xl border border-[#C4E2F5]/60 shadow-sm space-y-4 transition-shadow hover:shadow-md"
          >
            <h3 className="text-sm font-black text-[#2C5EAD] uppercase tracking-wider flex items-center gap-2">
              <Calendar className="text-[#1591DC]" /> Spatial Coordinates & Time
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#2C5EAD] uppercase tracking-wide">Target Date</label>
                <input 
                  type="date" name="date" required value={formData.date} onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-[#C4E2F5] rounded-xl text-sm font-medium focus:outline-none focus:border-[#1591DC] transition-all text-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#2C5EAD] uppercase tracking-wide">Execution Hour (Time)</label>
                <input 
                  type="time" name="time" required value={formData.time} onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-[#C4E2F5] rounded-xl text-sm font-medium focus:outline-none focus:border-[#1591DC] transition-all text-slate-800"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-[#2C5EAD] uppercase tracking-wide">Hosting Coordinate Node</label>
                <div className="flex gap-4 text-xs font-bold">
                  <label className="flex items-center gap-1.5 cursor-pointer text-[#2C5EAD]">
                    <input type="radio" name="locationType" value="venue" checked={formData.locationType === "venue"} onChange={handleChange} className="accent-[#2C5EAD]" /> Physical Venue
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-[#2C5EAD]">
                    <input type="radio" name="locationType" value="online" checked={formData.locationType === "online"} onChange={handleChange} className="accent-[#2C5EAD]" /> Online Stream
                  </label>
                </div>
              </div>
              <input 
                type="text" name="location" required value={formData.location} onChange={handleChange}
                placeholder={formData.locationType === "venue" ? "Enter Auditorium link, City Hall name" : "Enter Zoom, Google Meet link or Stream URL"}
                className="w-full px-4 py-3 bg-white border border-[#C4E2F5] rounded-xl text-sm font-medium focus:outline-none focus:border-[#1591DC] transition-all text-slate-800 focus:ring-2 focus:ring-[#4BB8FA]/30"
              />
            </div>
          </motion.div>

          {/* 3. CONTENT MARKDOWN CONTEXT AREA */}
          <motion.div 
            custom={3} 
            variants={formSectionVariants} 
            initial="hidden" 
            animate="visible"
            whileHover={{ y: -2 }}
            className="bg-slate-50/50 backdrop-blur-md p-5 md:p-6 rounded-2xl border border-[#C4E2F5]/60 shadow-sm space-y-4 transition-shadow hover:shadow-md"
          >
            <div className="space-y-1">
              <h3 className="text-sm font-black text-[#2C5EAD] uppercase tracking-wider flex items-center gap-2 mb-2">
                <Envelope className="text-[#1591DC]" /> Structural Description / Guidelines
              </h3>
              <textarea 
                name="description" required rows={4} value={formData.description} onChange={handleChange}
                placeholder="Specify structural details, requirements, track schedules, agenda mapping profiles..."
                className="w-full px-4 py-3 bg-white border border-[#C4E2F5] rounded-xl text-sm font-medium focus:outline-none focus:border-[#1591DC] transition-all text-slate-800 resize-none focus:ring-2 focus:ring-[#4BB8FA]/30"
              />
            </div>
          </motion.div>

          {/* ACTION BUTTON WRAPPER */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.4 }}
            className="pt-2 flex justify-end"
          >
            <Button
              type="submit"
              isDisabled={isSubmitting}
              className="w-full sm:w-48 h-12 bg-[#2C5EAD] text-white font-black rounded-xl text-sm tracking-wide shadow-xl shadow-[#2C5EAD]/20 hover:bg-[#1591DC] transition-all transform active:scale-98 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Processing...</span>
                </>
              ) : (
                "Publish Event Layout"
              )}
            </Button>
          </motion.div>

        </form>
      </div>
    </motion.div>
  );
}