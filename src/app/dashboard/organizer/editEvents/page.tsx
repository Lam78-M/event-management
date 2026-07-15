"use client";

import React, { useEffect, useState } from "react";
import { Calendar, Ticket, PencilToLine, Check, ChevronLeft, ChevronRight, MapPin } from "@gravity-ui/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Cross, Crosshair } from "lucide-react";

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

export default function EventsExplorePage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({ 
    title: "", 
    date: "", 
    tickets: "", 
    price: "", 
    location: "" 
  });
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/eventmanage");
      if (!res.ok) throw new Error("Failed to capture database layout payload.");
      const data = await res.json();
      setEvents(data);
    } catch (err: any) {
      toast.error(err.message || "Network synchronization pipeline error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const startEditing = (event: EventData) => {
    setEditingId(event._id);
    setEditFormData({
      title: event.title,
      date: event.date,
      tickets: event.tickets,
      price: event.price,
      location: event.location,
    });
  };

  const handleInlineUpdateSubmit = async (id: string) => {
  setActionLoading(true);
  try {
    const res = await fetch(`http://localhost:5000/api/eventmanage/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editFormData.title,
        date: editFormData.date,
        location: editFormData.location,
        // 🎯 ডাটা টাইপ সেফটি: স্কিমা সাধারণত tickets-কে Number এবং price-কে String/Number আশা করে
        tickets: Number(editFormData.tickets) || 0, 
        price: editFormData.price, // যদি স্কিমাতে প্রাইস Number হয় তবে Number(editFormData.price) দিবে
      }),
    });

    // 🎯 যদি ব্যাকএন্ড থেকে কোনো এরর আসে (যেমন status 404 বা 500)
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || errorData.message || "Failed to update event.");
    }
    
    toast.success("🎉 Event parameters successfully synchronized!");
    setEditingId(null);
    fetchEvents(); // টেবিল রিফ্রেশ
  } catch (err: any) {
    console.error("Patch error details:", err);
    toast.error(`❌ ${err.message}`); // আসল ব্যাকএন্ড এরর এখানে দেখতে পাবে
  } finally {
    setActionLoading(false);
  }
};

  const totalPages = Math.ceil(events.length / itemsPerPage);
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  return (
    <div className="min-h-screen bg-slate-50/50 py-16 px-4 md:px-8 pt-40 relative">
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        {/* Header */}
        <div className="border-b border-[#C4E2F5] pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-[#2C5EAD] tracking-tight">📊 Event Pipeline Monitor</h1>
            <p className="text-xs font-semibold text-[#1591DC] mt-1">Directly patch, configure, and override database row objects inline.</p>
          </div>
          <div className="text-xs font-black uppercase bg-[#C4E2F5]/40 text-[#2C5EAD] px-4 py-2 rounded-xl border border-[#4BB8FA]/20">
            Total Rows: {loading ? "..." : events.length}
          </div>
        </div>

        {/* 🎯 TABLE INTERFACE */}
        <div className="bg-white rounded-3xl border border-[#C4E2F5] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-[#C4E2F5] text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  <th className="p-4 pl-6">Event Title</th>
                  <th className="p-4">Execution Date</th>
                  <th className="p-4">Seat Capacity</th>
                  <th className="p-4">Fee / Price</th>
                  <th className="p-4">Location Target</th>
                  <th className="p-4 text-center pr-6">Action Gateway</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                
                {/* ⏳ 1. SKELETON LOADING STATE */}
                {loading ? (
                  [1, 2, 3, 4, 5].map((n) => (
                    <tr key={n} className="animate-pulse">
                      <td className="p-4 pl-6"><div className="h-4 bg-slate-200 rounded-md w-3/4" /></td>
                      <td className="p-4"><div className="h-4 bg-slate-200 rounded-md w-24" /></td>
                      <td className="p-4"><div className="h-4 bg-slate-200 rounded-md w-16" /></td>
                      <td className="p-4"><div className="h-4 bg-slate-200 rounded-md w-12" /></td>
                      <td className="p-4"><div className="h-4 bg-slate-200 rounded-md w-40" /></td>
                      <td className="p-4 text-center pr-6"><div className="h-7 bg-slate-200 rounded-lg w-20 mx-auto" /></td>
                    </tr>
                  ))
                ) : currentEvents.length === 0 ? (
                  /* 📭 EMPTY DATA STATE */
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-400 font-medium">
                      No active event matrices found in the database stream.
                    </td>
                  </tr>
                ) : (
                  /* 👥 ACTUAL RENDERED ROWS */
                  currentEvents.map((event) => {
                    const isEditing = editingId === event._id;

                    return (
                      <tr key={event._id} className="hover:bg-slate-50/50 transition-colors">
                        {/* Title */}
                        <td className="p-4 pl-6 max-w-xs">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editFormData.title}
                              onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                              className="w-full px-3 h-9 bg-slate-50 border border-[#C4E2F5] rounded-lg text-xs font-bold text-[#2C5EAD] focus:outline-none focus:border-[#1591DC]"
                            />
                          ) : (
                            <span className="text-[#2C5EAD] font-extrabold block truncate">{event.title}</span>
                          )}
                        </td>

                        {/* Date */}
                        <td className="p-4">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editFormData.date}
                              onChange={(e) => setEditFormData({ ...editFormData, date: e.target.value })}
                              className="w-36 px-3 h-9 bg-slate-50 border border-[#C4E2F5] rounded-lg text-xs font-bold text-[#2C5EAD] focus:outline-none"
                            />
                          ) : (
                            <div className="flex items-center gap-1.5 text-slate-600">
                              <Calendar width="14" height="14" className="text-[#4BB8FA]" />
                              <span>{event.date}</span>
                            </div>
                          )}
                        </td>

                        {/* Seats */}
                        <td className="p-4">
                          {isEditing ? (
                            <input
                              type="number"
                              value={editFormData.tickets}
                              onChange={(e) => setEditFormData({ ...editFormData, tickets: e.target.value })}
                              className="w-24 px-3 h-9 bg-slate-50 border border-[#C4E2F5] rounded-lg text-xs font-bold text-[#2C5EAD] focus:outline-none"
                            />
                          ) : (
                            <div className="flex items-center gap-1.5 text-slate-600">
                              <Ticket width="14" height="14" className="text-[#4BB8FA]" />
                              <span>{event.tickets} Slots</span>
                            </div>
                          )}
                        </td>

                        {/* Price */}
                        <td className="p-4">
                          {isEditing ? (
                            <div className="relative flex items-center">
                              <span className="absolute left-2 text-[#4BB8FA] font-bold text-xs">$</span>
                              <input
                                type="text"
                                value={editFormData.price}
                                onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                                className="w-24 pl-6 pr-2 h-9 bg-slate-50 border border-[#C4E2F5] rounded-lg text-xs font-bold text-[#2C5EAD] focus:outline-none"
                              />
                            </div>
                          ) : (
                            <span className="font-black text-[#1591DC]">
                              {Number(event.price) === 0 || event.price.toLowerCase() === "free" ? "FREE" : `$${event.price}`}
                            </span>
                          )}
                        </td>

                        {/* Location */}
                        <td className="p-4 max-w-xs">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editFormData.location}
                              onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                              className="w-full px-3 h-9 bg-slate-50 border border-[#C4E2F5] rounded-lg text-xs font-bold text-[#2C5EAD] focus:outline-none"
                            />
                          ) : (
                            <div className="flex items-center gap-1.5 text-slate-600 truncate">
                              <MapPin width="14" height="14" className="text-[#4BB8FA] shrink-0" />
                              <span className="truncate">{event.location}</span>
                            </div>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-center pr-6">
                          {isEditing ? (
                            <div className="flex items-center justify-center gap-2">
                              <button
                                disabled={actionLoading}
                                onClick={() => handleInlineUpdateSubmit(event._id)}
                                className="h-8 px-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg flex items-center gap-1 transition-all shadow-sm cursor-pointer disabled:opacity-50"
                              >
                                <Check width="14" height="14" /> Save
                              </button>
                              <button
                                disabled={actionLoading}
                                onClick={() => setEditingId(null)}
                                className="h-8 px-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg flex items-center gap-1 transition-all cursor-pointer"
                              >
                                <Crosshair width="14" height="14" /> Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => startEditing(event)}
                              className="h-8 px-3 mx-auto bg-amber-50 hover:bg-amber-100 text-amber-600 border border-amber-200 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer text-[11px] font-black uppercase tracking-wider"
                            >
                              <PencilToLine width="13" height="13" /> Edit Row
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION PANEL */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-9 w-9 flex items-center justify-center rounded-xl border border-[#C4E2F5] bg-white text-[#2C5EAD] disabled:opacity-40 transition-all cursor-pointer"
            >
              <ChevronLeft width="16" height="16" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-9 w-9 text-xs font-black rounded-xl transition-all border ${
                  page === currentPage
                    ? "bg-[#2C5EAD] border-[#2C5EAD] text-white scale-105"
                    : "bg-white border-[#C4E2F5] text-[#2C5EAD] hover:bg-[#C4E2F5]/30"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-9 w-9 flex items-center justify-center rounded-xl border border-[#C4E2F5] bg-white text-[#2C5EAD] disabled:opacity-40 transition-all cursor-pointer"
            >
              <ChevronRight width="16" height="16" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}