"use client";

import Link from "next/link";
import { 
  FiActivity, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiLinkedin, 
  FiArrowUp,
  FiChevronRight
} from "react-icons/fi";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-white to-brand-ice/20 border-t border-brand-ice/50 pt-16 pb-8 text-gray-600 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Info & Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-black text-2xl text-brand-dark">
              <div className="p-1.5 bg-brand-primary/10 rounded-lg text-brand-primary">
                <FiActivity className="w-6 h-6" />
              </div>
              <span className="bg-gradient-to-r from-brand-dark to-brand-primary bg-clip-text text-transparent">
                EventSphere
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500">
              The premier platform to explore local workshops, global tech summits, cultural fests, and premium network meetups.
            </p>
            
            {/* Social Icons using React Icons */}
            <div className="flex gap-3 pt-2">
              {[
                { icon: <FiFacebook className="w-4 h-4" />, href: "#" },
                { icon: <FiTwitter className="w-4 h-4" />, href: "#" },
                { icon: <FiInstagram className="w-4 h-4" />, href: "#" },
                { icon: <FiLinkedin className="w-4 h-4" />, href: "#" }
              ].map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  className="p-2.5 bg-white rounded-xl border border-brand-ice/40 text-brand-dark hover:bg-brand-primary hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Navigation Links */}
          <div>
            <h4 className="font-bold text-brand-dark text-xs uppercase tracking-wider mb-4">Explore Platform</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              {["Find Events", "Create New Event", "Pricing Models", "Success Stories", "Help Support"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-brand-primary transition-colors flex items-center gap-1 group text-gray-500 hover:translate-x-1 duration-200">
                    <FiChevronRight className="w-3 h-3 text-brand-light opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Office Info */}
          <div>
            <h4 className="font-bold text-brand-dark text-xs uppercase tracking-wider mb-4">Contact Us</h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <FiMapPin className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <span className="text-gray-500">Gulshan-2, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="w-4 h-4 text-brand-primary shrink-0" />
                <span className="text-gray-500">+880 1712-345678</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="w-4 h-4 text-brand-primary shrink-0" />
                <span className="text-gray-500">support@eventsphere.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Premium Newsletter Widget */}
          <div className="bg-white p-6 rounded-2xl border border-brand-ice/60 shadow-sm space-y-3">
            <h4 className="font-bold text-brand-dark text-sm">Stay in the Loop</h4>
            <p className="text-xs text-gray-500 leading-normal">Subscribe to weekly event listings directly delivered to your inbox.</p>
            <div className="flex flex-col gap-2 pt-1">
              <input 
                type="email" 
                placeholder="Enter email" 
                className="px-3 py-2.5 text-xs border border-brand-ice rounded-xl bg-gray-50 focus:outline-none focus:border-brand-primary focus:bg-white transition-all"
              />
              <button className="w-full bg-brand-dark hover:bg-brand-primary text-white text-xs font-bold py-2.5 rounded-xl shadow-md transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Banner Section */}
        <div className="border-t border-brand-ice pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-400 relative">
          <p>© {new Date().getFullYear()} EventSphere. All rights reserved by Pro-Developer.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-dark transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-dark transition-colors">Terms of Use</a>
          </div>
          
          {/* Scroll to top using React Icons */}
          <button 
            onClick={scrollToTop} 
            className="p-3 bg-brand-primary/10 hover:bg-brand-primary text-brand-dark hover:text-white rounded-xl transition-all duration-300 shadow-md group border border-brand-primary/10"
            aria-label="Scroll to top"
          >
            <FiArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}