"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, TrashBin,  } from "@gravity-ui/icons";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2 } from "lucide-react";

interface EventData {
  _id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  locationType: "venue" | "online";
  location: string;
  tickets: string;
  price: string;
  description: string;
  image: string;
}

export default function OrganizerEventsManagement() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 🗑️ মোডাল ও ডিলিট স্টেটস
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<{ id: string; title: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // ডাটাবেস থেকে ইভেন্ট ডাটা লোড করা
  const fetchOrganizerEvents = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/eventmanage`);
      if (!res.ok) throw new Error("Failed to capture organizer event stream.");
      const data = await res.json();
      setEvents(data);
    } catch (err: any) {
      toast.error(err.message || "Network synchronization pipeline error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizerEvents();
  }, []);

  // ডিলিট মোডাল ওপেন করার হ্যান্ডলার
  const triggerDeleteModal = (id: string, title: string) => {
    setSelectedEvent({ id, title });
    setIsModalOpen(true);
  };

  // 🗑️ এপিআই কল করে ইভেন্ট ডিলিট করা
  const confirmDeleteEvent = async () => {
    if (!selectedEvent) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/eventmanage/${selectedEvent.id}`, {
        method: "DELETE",
      });
      
      const result = await res.json();

      if (res.ok && result.success) {
        toast.success("Event permanently scrubbed from node registry.");
        // রিয়েল-টাইমে UI স্টেট আপডেট করা
        setEvents((prevEvents) => prevEvents.filter((event) => event._id !== selectedEvent.id));
      } else {
        throw new Error(result.message || "Pipeline deletion rejected.");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to execute database node purge.");
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
      setSelectedEvent(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-16 px-4 md:px-8 relative pt-32 text-left">
      <ToastContainer position="top-center" autoClose={2500} />

      <div className="max-w-7xl mx-auto">
        {/* Management Control Header */}
        <div className="mb-12 border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
              🛠️ Organizer Hub: Managed Events
            </h1>
            <p className="text-sm font-semibold text-gray-500 mt-1">
              Review live architectures or completely delete event nodes from public stream.
            </p>
          </div>
          <div className="text-xs font-bold bg-slate-100 text-slate-700 px-4 py-2 rounded-full border border-slate-200 shadow-sm">
            Total Uploaded: {events.length} Nodes
          </div>
        </div>

        {/* Loading Matrix */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-[420px] bg-white rounded-3xl border border-slate-200/60 animate-pulse p-4 space-y-4" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-gray-400 font-bold">You haven't uploaded any active event matrices yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <motion.div
                key={event._id}
                layout
                className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between group"
              >
                {/* Image Section */}
                <div className="h-44 w-full overflow-hidden relative bg-slate-100">
                  <div className="absolute top-3 left-3 z-10 bg-white/90 text-slate-700 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full border border-slate-200">
                    {event.category}
                  </div>

                  {event.image ? (
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-gray-400 text-xs">
                      No Media Payload
                    </div>
                  )}
                </div>

                {/* Info Content Section */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-x-3 text-gray-500 text-xs font-semibold">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{event.time}</span>
                      </div>
                    </div>

                    <h2 className="text-base font-bold text-slate-800 line-clamp-2 leading-snug">
                      {event.title}
                    </h2>

                    <div className="flex items-center gap-1.5 text-slate-500 text-xs truncate pt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {/* 🗑️ Delete Button Action */}
                  <div className="pt-3 border-t border-slate-100">
                    <button
                      onClick={() => triggerDeleteModal(event._id, event.title)}
                      className="w-full py-2.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 border border-red-100 hover:border-red-600 shadow-sm"
                    >
                      <TrashBin className="w-4 h-4" />
                      Delete Event Matrix
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* 🔮 CUSTOM DELETE MODAL (Slate & Red Palette) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { if (!isDeleting) setIsModalOpen(false); }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white rounded-[2rem] border border-slate-200 max-w-md w-full p-6 md:p-8 shadow-2xl relative z-10 flex flex-col items-center text-center space-y-6"
            >
              {/* Alert Red Icon Box */}
              <div className="w-14 h-14 bg-red-50 rounded-2xl border border-red-100 flex items-center justify-center text-red-500 shadow-sm">
                <Trash2 className="w-7 h-7" />
              </div>

              {/* Text Meta */}
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-800 tracking-tight">
                  Purge Event Node?
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-semibold">
                  You are about to permanently delete <span className="text-slate-800 font-extrabold">"{selectedEvent?.title}"</span>. This action is irreversible and will remove it from all user timelines.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors duration-150 border border-slate-200/50 disabled:opacity-50"
                >
                  Cancel, Keep Safe
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={confirmDeleteEvent}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition-colors duration-150 shadow-md shadow-red-500/10 flex items-center justify-center gap-2 disabled:bg-red-400"
                >
                  {isDeleting ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : null}
                  {isDeleting ? "Purging..." : "Yes, Purge Node"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}