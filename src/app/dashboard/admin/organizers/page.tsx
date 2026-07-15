"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 

  Calendar, 
  Shield, 
  Magnifier, 
  ArrowRotateLeft, 
  TrashBin, 
  Pencil, 
  Xmark 
} from "@gravity-ui/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MailCheck } from "lucide-react";

interface UserData {
  _id: { $oid: string } | string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: { $date: string } | string;
  role: string;
}

export default function OrganizerManagementPage() {
  const [organizers, setOrganizers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 📝 মডাল এবং এডিটের জন্য প্রয়োজনীয় স্টেটসমূহ
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  // এডিট ফর্মের স্টেট
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("organizer");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // ডাটা ফেচিং ফাংশন
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`);
      if (!res.ok) throw new Error("Failed to sync user database sequence.");
      const data: UserData[] = await res.json();
      
      // শুধুমাত্র যাদের রোল "organizer"
      const onlyOrganizers = data.filter(user => user.role === "organizer");
      setOrganizers(onlyOrganizers);
    } catch (err: any) {
      toast.error(err.message || "Pipeline connection crash.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔍 সার্চ ফিল্টারিং লজিক
  const filteredOrganizers = organizers.filter(org =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateObj: any) => {
    const dateStr = dateObj?.$date || dateObj;
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getUserId = (idObj: any) => idObj?.$oid || idObj || "";

  // 🛠️ মডিফাই মডাল ওপেন করার হ্যান্ডলার
  const handleOpenEditModal = (user: UserData) => {
    setSelectedUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditRole(user.role);
    setIsEditModalOpen(true);
  };

  // 🛠️ মডিফাই রিকোয়েস্ট সাবমিট করা (PUT)
  const handleUpdateOrganizer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setIsUpdating(true);

    const userId = getUserId(selectedUser._id);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName,
          email: editEmail,
          role: editRole
        })
      });

      if (!res.ok) throw new Error("Could not update the organizer schema.");
      
      toast.success("Organizer node updated successfully!");
      setIsEditModalOpen(false);
      fetchUsers(); // ডাটা রি-লোডের মাধ্যমে টেবিল আপডেট
    } catch (err: any) {
      toast.error(err.message || "Failed to submit modifications.");
    } finally {
      setIsUpdating(false);
    }
  };

  // 🗑️ ডিলিট কনফার্মেশন মডাল ওপেন করা
  const handleOpenDeleteModal = (user: UserData) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  // 🗑️ ডিলিট রিকোয়েস্ট সাবমিট করা (DELETE)
  const handleDeleteOrganizer = async () => {
    if (!selectedUser) return;
    setIsDeleting(true);

    const userId = getUserId(selectedUser._id);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${userId}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Could not drop the organizer node.");

      toast.success("Organizer purged successfully!");
      setIsDeleteModalOpen(false);
      fetchUsers(); // টেবিল রি-লোডের জন্য কল
    } catch (err: any) {
      toast.error(err.message || "Failed to delete user profile.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-16 px-4 md:px-8 relative overflow-hidden pt-40 text-left">
      <ToastContainer position="top-center" autoClose={2500} />

      {/* Background Lighting blur effect */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#C4E2F5]/20 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#4BB8FA]/10 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header section */}
        <div className="mb-8 border-b border-[#C4E2F5] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-[#2C5EAD] tracking-tight">
              💼 Organizer Control Matrix
            </h1>
            <p className="text-sm font-semibold text-[#1591DC] mt-1">
              Manage, audit, and interface with verified community event planners.
            </p>
          </div>
          <div className="text-xs font-bold uppercase tracking-wider bg-[#C4E2F5]/50 text-[#2C5EAD] px-4 py-2 rounded-full border border-[#4BB8FA]/30 shadow-sm self-start sm:self-end">
            Total Organizers: {filteredOrganizers.length} Nodes
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="mb-8 bg-white/70 backdrop-blur-md rounded-2xl border border-[#C4E2F5] p-4 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex items-center w-full sm:w-80">
            <Magnifier className="absolute left-4 w-4 h-4 text-[#1591DC]" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 text-xs font-semibold bg-white border border-[#C4E2F5] rounded-xl text-slate-700 placeholder-[#1591DC]/50 focus:outline-none focus:border-[#2C5EAD] focus:ring-1 focus:ring-[#2C5EAD] transition-all"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs font-bold text-[#2C5EAD] hover:text-[#1591DC] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowRotateLeft className="w-3.5 h-3.5" /> Clear Filter
            </button>
          )}
        </div>

        {/* Table/Content State */}
        {loading ? (
          <div className="w-full bg-white rounded-3xl border border-[#C4E2F5]/60 p-6 space-y-4 animate-pulse">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-14 bg-slate-100 rounded-xl w-full" />
            ))}
          </div>
        ) : filteredOrganizers.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white/60 backdrop-blur-md rounded-3xl border border-[#C4E2F5] shadow-inner"
          >
            <p className="text-[#1591DC] font-black text-lg">No active event organizers found in the system pipeline.</p>
          </motion.div>
        ) : (
          <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-[#C4E2F5] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#C4E2F5] bg-[#C4E2F5]/20">
                    <th className="p-5 text-xs font-black text-[#2C5EAD] uppercase tracking-wider">Organizer Details</th>
                    <th className="p-5 text-xs font-black text-[#2C5EAD] uppercase tracking-wider">System Endpoint (Email)</th>
                    <th className="p-5 text-xs font-black text-[#2C5EAD] uppercase tracking-wider">Registered Cycle</th>
                    <th className="p-5 text-xs font-black text-[#2C5EAD] uppercase tracking-wider text-center">Authorization Badge</th>
                    <th className="p-5 text-xs font-black text-[#2C5EAD] uppercase tracking-wider text-center">Operation Control</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrganizers.map((org, idx) => (
                    <motion.tr
                      key={getUserId(org._id)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="border-b border-[#C4E2F5]/40 last:border-none hover:bg-[#C4E2F5]/10 transition-colors duration-200"
                    >
                      {/* Name & ID Column */}
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#2C5EAD]/10 text-[#2C5EAD] flex items-center justify-center font-black text-sm border border-[#2C5EAD]/20">
                            {org.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-sm font-black text-slate-800">{org.name}</div>
                            <div className="text-[10px] font-bold text-slate-400 font-mono mt-0.5">ID: {getUserId(org._id)}</div>
                          </div>
                        </div>
                      </td>

                      {/* Email Column */}
                      <td className="p-5">
                        <div className="flex items-center gap-2 text-slate-600 text-xs font-bold">
                          <MailCheck className="w-3.5 h-3.5 text-[#1591DC]" />
                          <span>{org.email}</span>
                        </div>
                      </td>

                      {/* Date Column */}
                      <td className="p-5">
                        <div className="flex items-center gap-2 text-slate-600 text-xs font-bold">
                          <Calendar className="w-3.5 h-3.5 text-[#4BB8FA]" />
                          <span>{formatDate(org.createdAt)}</span>
                        </div>
                      </td>

                      {/* Badge Column */}
                      <td className="p-5 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#2C5EAD] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
                          <Shield className="w-3 h-3" />
                          {org.role}
                        </span>
                      </td>

                      {/* 🛠️ Action operations: edit & delete */}
                      <td className="p-5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {/* edit button */}
                          <button
                            onClick={() => handleOpenEditModal(org)}
                            className="h-8 w-8 bg-[#C4E2F5]/50 hover:bg-[#2C5EAD] text-[#2C5EAD] hover:text-white rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer"
                            title="Edit Organizer"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          
                          {/* delete button */}
                          <button
                            onClick={() => handleOpenDeleteModal(org)}
                            className="h-8 w-8 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-lg flex items-center justify-center border border-red-100 hover:border-red-600 transition-all duration-200 cursor-pointer"
                            title="Purge Organizer"
                          >
                            <TrashBin className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* 🔮 MODAL 1: MODIFY ORGANIZER FORM */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl border border-[#C4E2F5] shadow-2xl w-full max-w-md overflow-hidden relative z-10"
            >
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-[#C4E2F5]/30 to-white border-b border-[#C4E2F5] flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-[#2C5EAD] tracking-tight">Modify Organizer Node</h3>
                  <p className="text-[10px] font-bold text-[#1591DC] mt-0.5">Edit credentials in the database pipeline</p>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="h-7 w-7 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Xmark className="w-4 h-4" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleUpdateOrganizer} className="p-6 space-y-4">
                {/* Input Name */}
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] font-black text-[#2C5EAD] uppercase tracking-wide">Organizer Name</label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs font-semibold border border-[#C4E2F5] rounded-xl text-slate-700 focus:outline-none focus:border-[#2C5EAD] transition-all"
                  />
                </div>

                {/* Input Email */}
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] font-black text-[#2C5EAD] uppercase tracking-wide">System Endpoint (Email)</label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs font-semibold border border-[#C4E2F5] rounded-xl text-slate-700 focus:outline-none focus:border-[#2C5EAD] transition-all"
                  />
                </div>

                {/* Role dropdown config */}
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] font-black text-[#2C5EAD] uppercase tracking-wide">Role Paradigm</label>
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs font-semibold border border-[#C4E2F5] rounded-xl text-slate-700 focus:outline-none focus:border-[#2C5EAD] transition-all cursor-pointer"
                  >
                    <option value="organizer">Organizer (Active Planar)</option>
                    <option value="admin">Admin (System God)</option>
                    <option value="user">User (Standard Node)</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-500 text-xs font-black rounded-xl transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="flex-1 py-2.5 bg-[#2C5EAD] hover:bg-[#1591DC] disabled:bg-slate-300 text-white text-xs font-black rounded-xl transition-all shadow-md cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isUpdating ? "Processing..." : "Commit Update"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ⚠️ MODAL 2: DELETE CONFIRMATION SCREEN */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl border border-red-100 shadow-2xl w-full max-w-sm overflow-hidden relative z-10 p-6 text-center"
            >
              <div className="mx-auto w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 border border-red-100 mb-4">
                <TrashBin className="w-6 h-6" />
              </div>

              <h3 className="text-base font-black text-slate-800">Confirm Deletion Stream</h3>
              <p className="text-xs font-semibold text-slate-500 mt-2 leading-relaxed">
                Are you sure you want to completely purge <strong className="text-slate-800">"{selectedUser?.name}"</strong> from the registry database? This process is irreversible.
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-500 text-xs font-black rounded-xl transition-all cursor-pointer"
                >
                  No, Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteOrganizer}
                  disabled={isDeleting}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-slate-300 text-white text-xs font-black rounded-xl transition-all shadow-md cursor-pointer disabled:cursor-not-allowed"
                >
                  {isDeleting ? "Processing..." : "Purge Now"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}