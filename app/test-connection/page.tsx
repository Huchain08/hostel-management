"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TestConnection() {
  const [status, setStatus] = useState("Testing connection...");

  useEffect(() => {
    async function test() {
      try {
        const { data, error } = await supabase.from("users").select("*");
        if (error) throw error;
        setStatus(`✅ Connected! Found ${data.length} users in database`);
      } catch (err: any) {
        setStatus(`❌ Error: ${err.message}`);
      }
    }
    test();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Supabase Test</h1>
        <p className="text-lg text-gray-700">{status}</p>
        <a href="/" className="mt-6 inline-block text-blue-600 hover:underline">
          ← Back to Home
        </a>
      </div>
    </div>
  );
}