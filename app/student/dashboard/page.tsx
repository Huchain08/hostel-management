"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, Receipt, MessageSquare, Calendar, 
  LogOut, Bell, User, Utensils, AlertCircle,
  TrendingUp, DoorOpen, Wifi, Droplets,
  MoreHorizontal, CheckCircle, Clock, XCircle
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const attendanceData = [
  { day: "Mon", percentage: 92 },
  { day: "Tue", percentage: 88 },
  { day: "Wed", percentage: 95 },
  { day: "Thu", percentage: 90 },
  { day: "Fri", percentage: 93 },
  { day: "Sat", percentage: 87 },
  { day: "Sun", percentage: 91 },
];

const recentActivities = [
  { id: 1, type: "payment", message: "Hostel fee paid successfully", time: "2 hours ago", status: "success" },
  { id: 2, type: "complaint", message: "AC complaint resolved", time: "5 hours ago", status: "success" },
  { id: 3, type: "notice", message: "Mess menu updated", time: "1 day ago", status: "info" },
];

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showNotifications, setShowNotifications] = useState(false);

  const menuItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "fees", label: "Fees & Billing", icon: Receipt },
    { id: "complaints", label: "Complaints", icon: AlertCircle },
    { id: "leave", label: "Leave Requests", icon: Calendar },
    { id: "mess", label: "Mess Menu", icon: Utensils },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white border-b border-gray-200 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-sm font-semibold text-gray-900">John Doe</h1>
                  <p className="text-xs text-gray-500">Room 301-A • CSE Dept</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                </button>
                
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2"
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {recentActivities.map((activity) => (
                          <div key={activity.id} className="px-4 py-3 hover:bg-gray-50">
                            <p className="text-sm text-gray-800">{activity.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <button className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto flex mt-6 px-6 gap-6 pb-6">
        {/* Sidebar */}
        <motion.aside 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-64 bg-white rounded-xl shadow-sm border border-gray-200 p-3 h-fit"
        >
          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all ${
                  activeTab === item.id 
                    ? "bg-blue-50 text-blue-700 font-medium" 
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? "text-blue-600" : "text-gray-500"}`} />
                <span className="text-sm">{item.label}</span>
              </motion.button>
            ))}
          </nav>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
              <p className="text-xs opacity-90 mb-1">Current Balance</p>
              <p className="text-2xl font-bold">$0.00</p>
              <p className="text-xs mt-2 opacity-75">All dues cleared ✓</p>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: "Room Number", value: "301-A", icon: Home, color: "bg-blue-500", subtext: "Block A • 3rd Floor" },
                  { label: "Attendance", value: "91%", icon: TrendingUp, color: "bg-green-500", subtext: "Above average" },
                  { label: "Pending Fees", value: "$0", icon: Receipt, color: "bg-purple-500", subtext: "All paid" },
                  { label: "Active Complaints", value: "1", icon: AlertCircle, color: "bg-orange-500", subtext: "In progress" },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                        <p className="text-xs text-gray-500 mt-1">{stat.subtext}</p>
                      </div>
                      <div className={`${stat.color} p-2.5 rounded-lg`}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Charts & Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Attendance Chart */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Weekly Attendance</h3>
                      <p className="text-sm text-gray-500 mt-1">Your attendance over the last 7 days</p>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">91% avg</span>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={attendanceData}>
                      <defs>
                        <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} domain={[80, 100]} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                      />
                      <Area type="monotone" dataKey="percentage" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorAttendance)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Room Amenities */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Room Amenities</h3>
                  <div className="space-y-4">
                    {[
                      { icon: Wifi, label: "Wi-Fi", status: "Active", color: "text-green-600" },
                      { icon: Droplets, label: "Water Supply", status: "24/7", color: "text-blue-600" },
                      { icon: DoorOpen, label: "Access Card", status: "Active", color: "text-green-600" },
                    ].map((amenity, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <amenity.icon className={`w-5 h-5 ${amenity.color}`} />
                          <span className="text-sm font-medium text-gray-700">{amenity.label}</span>
                        </div>
                        <span className={`text-xs font-medium ${amenity.color}`}>{amenity.status}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        <AlertCircle className="w-4 h-4" />
                        <span>Raise Complaint</span>
                      </button>
                      <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                        <Calendar className="w-4 h-4" />
                        <span>Apply Leave</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivities.map((activity, idx) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + idx * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-green-500' : 'bg-blue-500'}`} />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "fees" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Fee Management</h2>
                  <p className="text-sm text-gray-500 mt-1">View and manage your hostel fees</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Download Receipt
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Hostel Fee - Semester 1</p>
                        <p className="text-sm text-gray-500 mt-1">Due: Jan 15, 2026</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">$500.00</p>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 mt-2">
                        Paid
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Receipt className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Electricity Bill - May</p>
                        <p className="text-sm text-gray-500 mt-1">Due: Jun 5, 2026</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">$45.00</p>
                      <button className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white mt-2 hover:bg-blue-700 transition-colors">
                        Pay Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "complaints" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">My Complaints</h2>
                  <p className="text-sm text-gray-500 mt-1">Track and manage your complaints</p>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  <AlertCircle className="w-4 h-4" />
                  <span>New Complaint</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Air Conditioner Not Working</h3>
                        <p className="text-sm text-gray-600 mt-1">Room 301-A • AC Unit #2</p>
                        <div className="flex items-center space-x-4 mt-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <Clock className="w-3 h-3 mr-1" />
                            In Progress
                          </span>
                          <span className="text-xs text-gray-500">Raised on June 10, 2026</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}