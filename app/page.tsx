"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { ChevronDown, Search, Menu } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    const sections = gsap.utils.toArray(".scroll-section");
    
    sections.forEach((section: any, i) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleGetStarted = () => {
    router.push("/role-selection");
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <span className="text-xl font-bold text-gray-800">HostelHub</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-600 hover:text-primary transition">About</a>
            <a href="#admission" className="text-gray-600 hover:text-primary transition">Admission</a>
            <a href="#students" className="text-gray-600 hover:text-primary transition">Students</a>
            <a href="#life" className="text-gray-600 hover:text-primary transition">Life</a>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <input 
                type="text" 
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            <button className="md:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with Video */}
      <motion.section 
        style={{ opacity, scale }}
        className="scroll-section relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hostel-life.mp4" type="video/mp4" />
        </video>
        
        <div className="relative z-20 text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Hostel Life
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
          >
            Experience modern, comfortable living with smart management
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
            className="bg-primary hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-all flex items-center mx-auto gap-2"
          >
            Let's Go
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </motion.button>
        </div>
      </motion.section>

      {/* Hostels & Allocation Section */}
      <section id="admission" className="scroll-section min-h-screen flex items-center bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Hostels & Allocation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl">
              Smart room allocation system with AI-powered matching and real-time availability
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Smart Allocation", desc: "AI-based room matching", icon: "🏠" },
              { title: "Real-time Updates", desc: "Live availability tracking", icon: "⚡" },
              { title: "Easy Booking", desc: "Simple reservation process", icon: "📱" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining Section */}
      <section id="life" className="scroll-section min-h-screen flex items-center bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Dining in Dorms
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Nutritious meals, flexible meal plans, and dietary accommodations all managed digitally
              </p>
              <ul className="space-y-4">
                {["Healthy meal options", "Dietary restrictions support", "Online menu viewing", "Feedback system"].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white">✓</span>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-orange-100 to-red-100 p-12 rounded-3xl"
            >
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-3xl font-bold mb-4">Mess Management</h3>
              <p className="text-gray-700">Digital mess cards, attendance tracking, and feedback collection</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="scroll-section min-h-screen flex items-center bg-primary py-20 px-6">
        <div className="max-w-7xl mx-auto text-center text-white">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-8"
          >
            About HostelHub
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto mb-12"
          >
            Revolutionizing hostel management with AI-powered solutions, real-time analytics, and seamless user experience
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            onClick={handleGetStarted}
            className="bg-white text-primary px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Get Started Now
          </motion.button>
        </div>
      </section>
    </div>
  );
}