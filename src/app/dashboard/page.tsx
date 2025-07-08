"use client";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [userId, setUserId] = useState<string>("test-user");
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let id = "test-user";
    if (typeof window !== "undefined") {
      id = localStorage.getItem("userId") || "test-user";
    }
    setUserId(id);
  }, []);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    setError(false);
    setAnalysis(null);
    fetch(`/api/analyze?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
          console.log("🧪 /api/analyze response:", data); // <— Add this
        if (data.analysis) {
          setAnalysis(data.analysis);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-10 bg-white shadow flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">📊 DSA Insights Dashboard</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg shadow"
          onClick={() => router.push("/ai")}
        >
          Back to Chat
        </button>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-8"
      >
       {loading ? (
  <div className="flex justify-center items-center h-40">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800" />
  </div>
) : error ? (
  <div className="text-red-500 text-center text-lg py-12">❌ Error loading analysis</div>
) : !analysis ? (
  <div className="text-gray-400 text-center text-lg py-12">No analysis available</div>
) : (
  <div className="prose prose-sm max-w-none text-gray-800 whitespace-pre-wrap">
    <ReactMarkdown>{analysis}</ReactMarkdown>
  </div>
)}
      </motion.div>
    </div>
  );
} 