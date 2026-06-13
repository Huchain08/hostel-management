"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function RoleSelection() {
  const router = useRouter();

  const roles = [
    {
      id: "student",
      title: "Student",
      emoji: "🎓",
      color: "from-blue-400 to-blue-600",
      path: "/student/login",
      description: "Access your room, fees, and complaints",
    },
    {
      id: "guest",
      title: "Guest",
      emoji: "🧳",
      color: "from-emerald-400 to-emerald-600",
      path: "/guest/login",
      description: "Visitor management and gate passes",
    },
    {
      id: "admin",
      title: "Admin",
      emoji: "🪪",
      color: "from-purple-400 to-purple-600",
      path: "/admin/login",
      description: "Manage hostel operations",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl w-full"
      >
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold text-center mb-4 text-gray-800"
        >
          I Am A
        </motion.h1>
        
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(role.path)}
              className="cursor-pointer bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className={`w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center shadow-lg`}>
                <span className="text-6xl">{role.emoji}</span>
              </div>
              <h2 className="text-3xl font-bold text-center mb-3 text-gray-800">
                {role.title}
              </h2>
              <p className="text-center text-gray-600">
                {role.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-600">
            Unsure? <button className="text-blue-600 hover:underline font-medium">Click here for help</button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}