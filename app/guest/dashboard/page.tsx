"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  DoorOpen, Calendar, User, Phone, 
  CheckCircle, Clock, MapPin, QrCode,
  ArrowRight, ShieldCheck
} from "lucide-react";

export default function GuestDashboard() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    purpose: "Meeting Student",
    hostRoom: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Top Nav */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white border-b border-gray-200 sticky top-0 z-50"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center">
              <DoorOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">Guest Portal</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Secure Access</span>
            </div>
            <button className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </motion.header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Request a Gate Pass</h1>
          <p className="text-slate-500 mt-1">Fill in the details below to generate your digital entry pass.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-8"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text" 
                      placeholder="John Smith" 
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel" 
                      placeholder="+1 (555) 000-0000" 
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Visit Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      type="date" 
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Host Room Number</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      name="hostRoom"
                      value={formData.hostRoom}
                      onChange={handleChange}
                      type="text" 
                      placeholder="e.g., 301-A" 
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Purpose of Visit</label>
                <select 
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none"
                >
                  <option>Meeting Student</option>
                  <option>Official Work</option>
                  <option>Attending Event</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="pt-4">
                <button 
                  type="button"
                  className="w-full flex items-center justify-center space-x-2 bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors"
                >
                  <span>Generate Gate Pass</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>

          {/* Active Pass Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center">
                <QrCode className="w-4 h-4 mr-2 text-emerald-600" />
                Active Pass
              </h3>
              
              <div className="bg-slate-50 rounded-xl p-6 border border-dashed border-slate-300 text-center">
                <div className="w-32 h-32 bg-white mx-auto rounded-lg p-2 shadow-sm mb-4 flex items-center justify-center">
                  {/* Simulated QR Code */}
                  <div className="w-full h-full bg-slate-900 rounded" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, #fff 5px, #fff 10px), repeating-linear-gradient(-45deg, transparent, transparent 5px, #fff 5px, #fff 10px)',
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Scan at Entry Gate</p>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Status</span>
                  <span className="flex items-center text-emerald-600 font-medium">
                    <CheckCircle className="w-3.5 h-3.5 mr-1" /> Approved
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Valid Until</span>
                  <span className="text-slate-900 font-medium">Today, 10:00 PM</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-slate-400" />
                Recent Visits
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 pb-4 border-b border-gray-100">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Visit to Room 301-A</p>
                    <p className="text-xs text-slate-500 mt-0.5">June 10, 2026 • 2:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Visit to Room 205-B</p>
                    <p className="text-xs text-slate-500 mt-0.5">May 28, 2026 • 11:30 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}