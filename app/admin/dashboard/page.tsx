"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, Home, DollarSign, AlertTriangle, 
  TrendingUp, Shield, LayoutDashboard, 
  UserCheck, Settings, LogOut, Search, Bell,
  ChevronRight, Activity
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const occupancyData = [
  { day: "Mon", current: 85, capacity: 100 },
  { day: "Tue", current: 88, capacity: 100 },
  { day: "Wed", current: 92, capacity: 100 },
  { day: "Thu", current: 89, capacity: 100 },
  { day: "Fri", current: 95, capacity: 100 },
  { day: "Sat", current: 98, capacity: 100 },
  { day: "Sun", current: 90, capacity: 100 },
];

const recentAlerts = [
  { id: 1, type: "warning", message: "Block D approaching 95% capacity", time: "10 mins ago" },
  { id: 2, type: "info", message: "New guest pass requested by Room 301-A", time: "25 mins ago" },
  { id: 3, type: "success", message: "Face recognition system updated", time: "1 hour ago" },
];

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "students", label: "Students", icon: Users },
    { id: "rooms", label: "Rooms", icon: Home },
    { id: "visitors", label: "Visitors", icon: UserCheck },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full"
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">HostelHub</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item, idx) => (
            <motion.button
              key={item.id}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeNav === item.id 
                  ? "bg-slate-100 text-slate-900" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <item.icon className={`w-4 h-4 ${activeNav === item.id ? "text-slate-900" : "text-slate-400"}`} />
              <span>{item.label}</span>
              {activeNav === item.id && <ChevronRight className="w-4 h-4 ml-auto text-slate-400" />}
            </motion.button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <motion.header 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Overview</h1>
            <p className="text-sm text-slate-500 mt-1">Welcome back, here's what's happening today.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search students, rooms..." 
                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 w-64"
              />
            </div>
            <button className="relative p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Bell className="w-4 h-4 text-slate-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center text-sm font-semibold text-slate-700">
              AD
            </div>
          </div>
        </motion.header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Students", value: "450", change: "+12%", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Rooms Occupied", value: "185/200", change: "92.5%", icon: Home, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Monthly Revenue", value: "$45,200", change: "+8.2%", icon: DollarSign, color: "text-purple-600", bg: "bg-purple-50" },
            { label: "Active Alerts", value: "3", change: "-2", icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
              className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bg} p-2 rounded-lg`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Occupancy Trends</h3>
                <p className="text-sm text-slate-500 mt-0.5">Weekly capacity utilization</p>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-slate-900 mr-2"></span>Current</span>
                <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-slate-300 mr-2"></span>Capacity</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={occupancyData}>
                <defs>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                />
                <Area type="monotone" dataKey="current" stroke="#0f172a" strokeWidth={2} fillOpacity={1} fill="url(#colorCurrent)" />
                <Area type="monotone" dataKey="capacity" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="4 4" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* AI Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="flex items-center space-x-2 mb-6">
              <Activity className="w-5 h-5 text-slate-900" />
              <h3 className="text-base font-semibold text-slate-900">System Alerts</h3>
            </div>
            <div className="space-y-4">
              {recentAlerts.map((alert, idx) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg"
                >
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    alert.type === 'warning' ? 'bg-amber-500' : 
                    alert.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 leading-snug">{alert.message}</p>
                    <p className="text-xs text-slate-400 mt-1">{alert.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}