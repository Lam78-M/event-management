"use client";

import React from "react";
import { Rocket } from "@gravity-ui/icons";
import { TrendingUp, Trophy } from "lucide-react";

// 🎯 ৩টি প্রিমিয়াম সাকসেস ডাটা কার্ড
const successCards = [
  {
    id: 1,
    title: "Events Successfully Hosted",
    value: "1,250+",
    description: "Memorable experiences created worldwide",
    icon: <Trophy className="w-6 h-6 text-emerald-500" />,
    bgGradient: "from-emerald-50 to-teal-50/30",
    border: "border-emerald-100",
    iconBg: "bg-emerald-500/10",
  },
  {
    id: 2,
    title: "Active Community Growth",
    value: "98.4%",
    description: "Extremely high retention & engagement rate",
    icon: <TrendingUp className="w-6 h-6 text-blue-500" />,
    bgGradient: "from-blue-50 to-indigo-50/30",
    border: "border-blue-100",
    iconBg: "bg-blue-500/10",
  },
  {
    id: 3,
    title: "Global Organizers",
    value: "450+",
    description: "Leading brands and creators on board",
    icon: <Rocket className="w-6 h-6 text-[#FF85BB]" />,
    bgGradient: "from-[#FF85BB]/5 to-rose-50/20",
    border: "border-[#FF85BB]/20",
    iconBg: "bg-[#FF85BB]/10",
  },
];

export default function OurSuccess() {
  return (
   <div className="bg-slate-50/50">
     <div className="w-full max-w-7xl mx-auto px-4 py-8 mt-40 mb-40 ">
      {/* ৩টি রেসপনসিভ কার্ড গ্রিড */}
      <h2 className="text-3xl font-black text-[#2C5EAD] tracking-tight mb-6 ">Our Success Ratio</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {successCards.map((card) => (
          <div
            key={card.id}
            className={`p-6 rounded-2xl border ${card.border} bg-gradient-to-br ${card.bgGradient} shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-44`}
          >
            {/* উপরের আইকন এবং টাইটেল সেকশন */}
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {card.title}
                </span>
                <h3 className="text-3xl font-black text-[#021A54] tracking-tight">
                  {card.value}
                </h3>
              </div>
              <div className={`p-3 rounded-xl ${card.iconBg} shrink-0`}>
                {card.icon}
              </div>
            </div>

            {/* নিচের ডেসক্রিপশন সেকশন */}
            <div className="pt-4 border-t border-dashed border-gray-200/60">
              <p className="text-xs font-medium text-gray-500 leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
   </div>
  );
}