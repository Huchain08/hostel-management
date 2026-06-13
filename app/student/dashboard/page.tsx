"use client";

import { motion } from "framer-motion";
import { 
  Home, DollarSign, MessageSquare, Calendar, 
  LogOut, Bell, User, Utensils, AlertCircle 
} from "lucide-react";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const sampleData = [
  { name: "Mon", attendance: 85 },
  { name: "Tue", attendance: 90 },
  { name: "Wed", attendance: 88 },
  { name: "Thu", attendance: 92 },
  { name: "Fri", attendance: 87 },
];

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const menuItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "fees", label: "Fees & Billing", icon: DollarSign },
    { id: "complaints", label: "Complaints", icon: AlertCircle },
    { id: "leave", label: "Leave Requests", icon: Calendar },
    { id: "mess", label: "Mess Menu", icon: Utensils },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white shadow-sm px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">John Doe</h1>
              <p className="text-sm text-gray-600">Room 301-A | B.Tech CSE</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-full">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="flex items-center space-x-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto flex mt-6 px-6 gap-6">
        {/* Sidebar */}
        <motion.aside 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-64 bg-white rounded-2xl shadow-sm p-4 h-fit"
        >
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? "bg-blue-600 text-white" 
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 pb-6">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: "Room Number", value: "301-A", color: "bg-blue-500" },
                  { label: "Attendance", value: "88%", color: "bg-green-500" },
                  { label: "Pending Fees", value: "$0", color: "bg-purple-500" },
                  { label: "Active Complaints", value: "1", color: "bg-orange-500" },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`${stat.color} text-white p-6 rounded-2xl shadow-lg`}
                  >
                    <p className="text-sm opacity-90">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Chart */}
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold mb-4">Attendance Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={sampleData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="attendance" stroke="#2563eb" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Raise Complaint", icon: AlertCircle, color: "bg-red-500" },
                  { label: "Apply Leave", icon: Calendar, color: "bg-green-500" },
                  { label: "View Menu", icon: Utensils, color: "bg-orange-500" },
                ].map((action, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`${action.color} text-white p-6 rounded-2xl shadow-lg flex items-center justify-center space-x-3`}
                  >
                    <action.icon className="w-6 h-6" />
                    <span className="font-semibold">{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "fees" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-2xl shadow-sm"
            >
              <h2 className="text-2xl font-bold mb-6">Fee Management</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                  <div>
                    <p className="font-semibold">Hostel Fee - Semester 1</p>
                    <p className="text-sm text-gray-600">Due: Jan 15, 2026</p>
                  </div>
                  <span className="px-4 py-2 bg-green-500 text-white rounded-lg">Paid</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-semibold">Electricity Bill - May</p>
                    <p className="text-sm text-gray-600">Due: Jun 5, 2026</p>
                  </div>
                  <span className="px-4 py-2 bg-blue-500 text-white rounded-lg">$45.00</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "complaints" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-2xl shadow-sm"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Complaints</h2>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                  New Complaint
                </button>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-gray-50 rounded-r-xl">
                  <p className="font-semibold">AC Not Working</p>
                  <p className="text-sm text-gray-600">Status: In Progress</p>
                  <p className="text-xs text-gray-500 mt-1">Raised on: June 10, 2026</p>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}