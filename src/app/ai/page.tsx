"use client";
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Geist, Geist_Mono } from "next/font/google";
import { MessageCircle, MoreVertical, Code, BookOpen, GraduationCap } from "lucide-react";
import Link from 'next/link';
import { useRouter } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Helper functions for API calls
async function loadChatHistory(userId: string) {
  try {
    const response = await fetch(`/api/history?userId=${userId}`);
    const data = await response.json();
    return data.history || [];
  } catch (error) {
    console.error("Failed to load chat history:", error);
    return [];
  }
}

async function saveMessageToHistory(userId: string, role: string, content: string) {
  try {
    await fetch("/api/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        role,
        content,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error("Failed to save message to history:", error);
  }
}

async function initializeUser(userId: string) {
  try {
    await fetch("/api/initUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
  } catch (error) {
    console.error("Failed to initialize user:", error);
  }
}

export default function CodeAnalysisChat() {
  const [userId, setUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<
    { sender: "user" | "ai"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [problemType, setProblemType] = useState("arrays");
  const [difficulty, setDifficulty] = useState("medium");
  const [platform, setPlatform] = useState("leetcode");
  const [goal, setGoal] = useState("interview");

  // Analysis modal state
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  const router = useRouter();

  // First-run userId initialization
  useEffect(() => {
    const initializeUserId = async () => {
      if (typeof window === "undefined") return;
      
      let storedUserId = localStorage.getItem("userId");
      
      if (!storedUserId) {
        const userInput = prompt("Please enter your name or ID to continue:");
        if (userInput && userInput.trim()) {
          storedUserId = userInput.trim();
          localStorage.setItem("userId", storedUserId);
        } else {
          // Fallback to anonymous user if prompt is cancelled
          storedUserId = "anonymous-" + Date.now();
          localStorage.setItem("userId", storedUserId);
        }
      }
      
      setUserId(storedUserId);
      
      // Initialize user in backend
      await initializeUser(storedUserId);
    };
    
    initializeUserId();
  }, []);

  // Load chat history for the current user on mount
  useEffect(() => {
    if (!userId) return;
    const loadHistory = async () => {
      try {
        const res = await fetch(`/api/history?userId=${userId}`);
        const data = await res.json();
        if (data.history && Array.isArray(data.history)) {
          const restored = data.history.map((msg: any) => ({
            sender: msg.sender || (msg.role === "user" ? "user" : "ai"),
            text: msg.text || msg.content,
          }));
          setMessages(restored);
          console.log(`[Chat] Loaded ${restored.length} messages for userId: ${userId}`);
        } else {
          setMessages([]);
          console.log(`[Chat] No history found for userId: ${userId}`);
        }
      } catch (err) {
        setMessages([]);
        console.log(`[Chat] Error loading history for userId: ${userId}`);
      }
    };
    loadHistory();
  }, [userId]);

  const sendMessage = async () => {
    if (!input.trim() || !userId) return;

    const userMsg: { sender: "user"; text: string } = {
      sender: "user",
      text: input,
    };
    
    // Save user message to history
    await saveMessageToHistory(userId, "user", input);
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        userMessage: input,
        problemType,
        difficulty,
        platform,
        goal,
      }),
    });

    const data = await res.json();
    const aiMsg: { sender: "ai"; text: string } = {
      sender: "ai",
      text: data.reply,
    };

    // Save AI message to history
    await saveMessageToHistory(userId, "assistant", data.reply);
    const updatedMessages = [...messages, userMsg, aiMsg];
    setMessages(updatedMessages);

    const n8nWebhookURL = "http://localhost:5678/webhook-test/analyze-dashboard"; 
    const userIdParam = `?userId=${userId}`;
    const fullWebhookURL = `${n8nWebhookURL}${userIdParam}`;

    // 👇 Send chat to n8n after receiving AI response
    try {
      await fetch(fullWebhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: updatedMessages, userId }),
      });
    } catch (err) {
      // Optionally handle error (e.g., log or ignore)
      // console.error('Failed to send chat to n8n:', err);
    }
    setInput("");
    setLoading(false);
  };

  const resetChat = async () => {
    if (!userId) return;
    
    setMessages([]);
    // Clear history by setting empty array
    try {
      await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          role: "system",
          content: "RESET",
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error("Failed to reset chat history:", error);
    }
    
    await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resetConversation: true }),
    });
  };

  // Handler for dashboard analysis button
  const handleShowAnalysis = async () => {
    if (!userId) return;
    setLoadingAnalysis(true);
    try {
      const res = await fetch(`/api/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      setAnalysis(data.analysis || "No analysis available.");
    } catch (err) {
      console.error("❌ Error fetching analysis:", err);
      setAnalysis("Failed to load analysis.");
    } finally {
      setLoadingAnalysis(false);
    }
  };

  const renderMessage = (msg: { sender: "user" | "ai"; text: string }) => {
    return (
      <div
        className={`py-4 px-6 flex ${
          msg.sender === "user" ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`rounded-xl py-4 px-6 max-w-[85%] shadow-md transition-all duration-300 ease-in-out ${
            msg.sender === "user"
              ? "bg-blue-600 text-white"
              : "bg-gradient-to-br from-zinc-800 to-zinc-700 text-white overflow-auto"
          }`}
        >
          <div className="markdown-content">
            <ReactMarkdown>
              {msg.text}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased flex h-screen bg-zinc-950 text-white overflow-hidden`}>
      {/* Dashboard button in top right */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => router.push("/dashboard")}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          title="View Analysis"
        >
          🧠
        </button>
      </div>
      <aside className="w-64 bg-zinc-900 p-4 flex flex-col border-r border-zinc-800">
        <div className="mb-6">
          <Link href={'/'} className="text-2xl font-bold"><h2 className="text-2xl font-bold text-blue-400"><Code className="mr-2 h-8 w-8 inline-block" />CodeGenie</h2></Link>
          <button
            onClick={resetChat}
            className="mt-4 w-full bg-zinc-800 hover:bg-zinc-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            🔄 {messages.length > 0 ? "Reset Chat" : "New Session"}
          </button>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">
            Popular Topics
          </h3>
          <ul className="space-y-1 text-sm text-gray-300">
            {[
              "Arrays & Strings",
              "Dynamic Programming",
              "Graphs",
              "Binary Trees",
              "Greedy",
            ].map((topic, i) => (
              <li
                key={i}
                className="hover:bg-zinc-800 p-2 rounded-md cursor-pointer"
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto text-xs text-gray-500">
          <Code className="mr-2 h-8 w-8 inline-block" />CodeGenie • © 2025
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto px-6 pt-6 pb-4 scrollbar-thin scrollbar-thumb-zinc-800">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-2xl font-semibold mb-3">Welcome to CodeGenie 🧠</h1>
              <p className="text-gray-400 mb-6 max-w-md">
                Paste your code, choose your focus, and let CodeGenie guide your learning
                journey. Personalized insights, resources, and next steps await!
              </p>
            </div>
          ) : (
            messages.map((msg, i) => <div key={i}>{renderMessage(msg)}</div>)
          )}
          {loading && (
            <div className="py-4 px-6 flex justify-start">
              <div className="bg-zinc-700 text-white rounded-lg py-3 px-4 animate-pulse">
                Analyzing your code...
              </div>
            </div>
          )}
        </div>

        <footer className="border-t border-zinc-800 bg-zinc-900 p-4">
          <div className="flex flex-col gap-4">
            <textarea
              placeholder={messages.length > 0 ? "Ask a follow-up or paste more code..." : "Paste your code here..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-zinc-800 text-white rounded-lg py-3 px-4 min-h-28 font-mono text-sm resize-none"
              disabled={loading}
            />

            <div className="flex flex-wrap items-center gap-2">
              {[{
                label: "Topic",
                value: problemType,
                set: setProblemType,
                options: [
                  "arrays",
                  "linked-lists",
                  "trees",
                  "dp",
                  "sorting",
                  "backtracking",
                  "greedy",
                ],
              }, {
                label: "Difficulty",
                value: difficulty,
                set: setDifficulty,
                options: ["easy", "medium", "hard"],
              }, {
                label: "Platform",
                value: platform,
                set: setPlatform,
                options: ["leetcode", "hackerrank", "codechef", "codeforces"],
              }, {
                label: "Goal",
                value: goal,
                set: setGoal,
                options: ["interview", "competitive", "learning", "efficiency"],
              }].map(({ label, value, set, options }, i) => (
                <select
                  key={i}
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  className="bg-zinc-800 text-white p-2 rounded-lg text-sm outline-none"
                >
                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {label}: {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </option>
                  ))}
                </select>
              ))}

              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="ml-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {messages.length ? "Send" : "Analyze Code"}
              </button>
            </div>
          </div>
        </footer>
      </main>
      {/* Analysis Modal */}
      {analysis !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 relative shadow-lg overflow-auto max-h-[80vh]">
            <button
              className="absolute top-2 right-2 text-xl"
              onClick={() => setAnalysis(null)}
            >
              ✖️
            </button>
            <h2 className="text-xl font-bold mb-2">📊 AI Analysis</h2>
            {loadingAnalysis ? (
              <p>Loading...</p>
            ) : (
              <div className="prose prose-sm whitespace-pre-wrap">
                {typeof analysis === "string" ? (
                  <div dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, "<br/>") }} />
                ) : analysis && typeof analysis === "object" && "summary" in analysis ? (
                  <div>{analysis.summary}</div>
                ) : (
                  <div>{JSON.stringify(analysis)}</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
