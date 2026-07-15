"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUsers, FiTrash2, FiAlertTriangle, FiX, FiCheck, FiUserCheck, FiPauseCircle } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserData {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  approved: boolean;
}

type FilterType = "all" | "approved" | "pending";

export default function AdminUserManagement() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  // Modal & Action States
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  // এপিআই থেকে ইউজার ডাটা লোড করা
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_SERVER_URL}/api/users`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      toast.error("Failed to synchronize user records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ১. ইউজার অ্যাপ্রুভ হ্যান্ডলার
  const handleApproveUser = async (id: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_SERVER_URL}/api/users/${id}/approve`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Approval transaction failed.");
      
      toast.success("🚀 User access granted successfully!");
      fetchUsers(); // ডাটা রিফ্রেশ
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // ২. ইউজারকে আবার Pending এ নিয়ে যাওয়ার হ্যান্ডলার (নতুন ফিচার)
  const handlePendingUser = async (id: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_SERVER_URL}/api/users/${id}/pending`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Suspension transaction failed.");
      
      toast.warning("⏳ User status reverted to Pending.");
      fetchUsers(); // ডাটা রিফ্রেশ
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // ৩. ডিলিট মোডাল ওপেন করা
  const openDeleteModal = (id: string) => {
    setUserToDelete(id);
    setIsModalOpen(true);
  };

  // ৪. ডিলিট কনফার্মেশন হ্যান্ডলার
  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_SERVER_URL}/api/users/${userToDelete}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to purge user node.");

      toast.warn("💥 User account permanently removed.");
      setIsModalOpen(false);
      setUserToDelete(null);
      fetchUsers(); // ডাটা রিফ্রেশ
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // ফিল্টারিং লজিক
  const filteredUsers = users.filter((user) => {
    if (activeFilter === "approved") return user.approved === true;
    if (activeFilter === "pending") return user.approved === false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 py-16 px-4 md:px-8 pt-36 text-left">
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="border-b border-[#C4E2F5] pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-[#2C5EAD] tracking-tight flex items-center gap-2">
              <FiUsers className="text-[#4BB8FA]" /> Authority Control Gate
            </h1>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Approve, suspend/pending user status, or permanently remove nodes.
            </p>
          </div>

          {/* STATUS FILTER TABS */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-black">
            {(["all", "approved", "pending"] as FilterType[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === filter
                    ? "bg-white text-[#2C5EAD] shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {filter} ({users.filter(u => filter === "all" ? true : filter === "approved" ? u.approved : !u.approved).length})
              </button>
            ))}
          </div>
        </div>

        {/* LOADING GRID */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white border border-slate-200 p-5 rounded-2xl h-44 animate-pulse" />
            ))}
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-bold text-sm bg-white rounded-3xl border border-[#C4E2F5]">
            No users found matching the selected filter criteria.
          </div>
        ) : (
          /* USER CARDS GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <motion.div
                key={user._id}
                whileHover={{ y: -3 }}
                className="bg-white rounded-2xl border border-[#C4E2F5] p-5 shadow-sm flex flex-col justify-between overflow-hidden relative transition-all hover:border-[#4BB8FA]"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={user.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb"}
                        alt={user.name}
                        className="w-11 h-11 rounded-full object-cover border border-slate-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <h3 className="font-black text-slate-800 text-sm truncate">{user.name || "User Node"}</h3>
                        <p className="text-[10px] text-slate-400 truncate font-semibold mt-0.5">{user.email}</p>
                      </div>
                    </div>

                    {/* Status Badges */}
                    {user.approved ? (
                      <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md shrink-0">
                        APPROVED
                      </span>
                    ) : (
                      <span className="text-[9px] font-black text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md shrink-0 animate-pulse">
                        PENDING
                      </span>
                    )}
                  </div>
                </div>

                {/* Action buttons (Approve / Move to Pending / Reject) */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                  {!user.approved ? (
                    <>
                      {/* Approved trigger button if pending */}
                      <button
                        disabled={actionLoading}
                        onClick={() => handleApproveUser(user._id)}
                        className="w-1/2 h-8.5 bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all disabled:opacity-50"
                      >
                        <FiUserCheck className="w-3.5 h-3.5" /> Approve
                      </button>
                      
                      <button
                        disabled={actionLoading}
                        onClick={() => openDeleteModal(user._id)}
                        className="w-1/2 h-8.5 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-600 text-[10px] font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Move to Pending button if approved (নতুন ফিচার) */}
                      <button
                        disabled={actionLoading}
                        onClick={() => handlePendingUser(user._id)}
                        className="w-1/2 h-8.5 bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all disabled:opacity-50"
                      >
                        <FiPauseCircle className="w-3.5 h-3.5" /> Suspend
                      </button>

                      {/* Delete option */}
                      <button
                        disabled={actionLoading}
                        onClick={() => openDeleteModal(user._id)}
                        className="w-1/2 h-8.5 border border-slate-200 hover:border-rose-200 hover:bg-rose-50 text-slate-500 hover:text-rose-600 text-[10px] font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* SECURITY CONFIRMATION MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !actionLoading && setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white border border-[#C4E2F5] rounded-3xl p-6 max-w-xs w-full shadow-xl relative z-10 text-center space-y-4"
            >
              <div className="w-11 h-11 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-center mx-auto text-rose-500">
                <FiAlertTriangle className="w-5 h-5 animate-bounce" />
              </div>

              <div>
                <h3 className="text-sm font-black text-slate-900">Execute Data Purge?</h3>
                <p className="text-[11px] font-semibold text-slate-400 mt-1 leading-relaxed">
                  This operation terminates all user session layers and wipes records from the server node. This is permanent.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  disabled={actionLoading}
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 h-9 border border-slate-200 rounded-xl text-[11px] font-black text-slate-500 cursor-pointer hover:bg-slate-50"
                >
                  <FiX className="inline mr-0.5" /> Abort
                </button>
                <button
                  disabled={actionLoading}
                  onClick={handleConfirmDelete}
                  className="w-1/2 h-9 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-[11px] font-black cursor-pointer shadow-md shadow-rose-500/10 transition-all flex items-center justify-center gap-1"
                >
                  {actionLoading ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <FiCheck /> Purge Node
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}