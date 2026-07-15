"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiHelpCircle } from "react-icons/fi";

interface FAQItem {
  question: string;
  answer: string;
}

export default function Frequently() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      question: "How do I register for an event?",
      answer: "It's super simple! First, create an account on our platform. Then, head over to your desired event page and click the 'Register' or 'Get Ticket' button to complete your registration instantly."
    },
    {
      question: "What is the difference between online and in-person events?",
      answer: "Online events can be attended from anywhere in the world via our direct live stream integration or provided Zoom links. In-person (venue) events require physical attendance at the specified physical address."
    },
    {
      question: "Can I cancel my ticket or get a refund?",
      answer: "Yes, you can cancel your ticket up to 48 hours before the event starts. Refunds will be processed back to your original payment method within 3 to 5 business days."
    },
    {
      question: "Can I host or organize my own event?",
      answer: "Absolutely! When you sign up, simply select 'Organizer' as your platform role. You can then easily create, schedule, and manage your custom events directly from your dashboard."
    },
    {
      question: "Will I receive a certificate after attending?",
      answer: "Most technical workshops and certification events provide digital certificates upon completion. Once the event ends, your certificate will be sent directly to your email or profile dashboard."
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-slate-50/50 py-20 px-4 md:px-8 relative overflow-hidden">
      {/* 🌌 Background Glow Accents using your Ice Blue Color */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#C4E2F5]/20 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#4BB8FA]/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header section */}
        <div className="text-center space-y-3 mb-12">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#C4E2F5]/40 text-[#2C5EAD] text-xs font-black rounded-full uppercase tracking-wider border border-[#4BB8FA]/20">
            <FiHelpCircle className="w-4 h-4" />
            Common Queries
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#2C5EAD] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#1591DC] font-semibold max-w-lg mx-auto">
            Everything you need to know about our event orchestration ecosystem.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-md border border-[#C4E2F5] hover:border-[#4BB8FA]/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left transition-colors focus:outline-none"
                >
                  <span className="font-black text-sm md:text-base text-[#2C5EAD] hover:text-[#1591DC] transition-colors pr-4">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className={`p-1.5 rounded-lg shrink-0 ${
                      isOpen ? "bg-[#2C5EAD] text-white" : "bg-[#C4E2F5]/40 text-[#2C5EAD]"
                    }`}
                  >
                    <FiChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                {/* Animated Answer Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-slate-600 font-medium leading-relaxed border-t border-dashed border-[#C4E2F5]">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}