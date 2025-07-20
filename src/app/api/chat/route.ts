import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { chatbotPrompt } from "@/lib/prompts";
import { promises as fs } from "fs";
import path from "path";

type MessageRole = 'system' | 'user' | 'assistant';

const DATA_FILE = path.resolve(process.cwd(), "data/user_chats.json");

// In-memory conversation (for single user during demo)
// In production: use a per-user store (e.g. Firebase, Redis, Supabase)
let conversationHistory: { role: MessageRole; content: string }[] = [];

// Max conversation memory limit
const MAX_HISTORY = 6;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, userMessage, problemType, difficulty, platform, goal, resetConversation } = body;

  if (resetConversation) {
    conversationHistory = [];
    // Also clear from file
    try {
      const raw = await fs.readFile(DATA_FILE, "utf8");
      const allChats = JSON.parse(raw || "{}");
      allChats[userId] = [];
      await fs.writeFile(DATA_FILE, JSON.stringify(allChats, null, 2), "utf8");
      console.log(`[RESET] Cleared chat for userId: ${userId}`);
    } catch (err) {
      console.error("❌ Error clearing chat history:", err);
    }
    return NextResponse.json({ reply: "🔄 Conversation reset. You can now start a fresh analysis." });
  }

  // Input validation
  if (!userId || !userMessage || userMessage.length < 1) {
    return NextResponse.json({ reply: "⚠️ Please provide a valid userId and message." });
  }

  const systemPrompt = chatbotPrompt;

  try {
    const openai = new OpenAI({
      baseURL: "https://models.inference.ai.azure.com",
      apiKey: process.env.GITHUB_TOKEN
    });

    // Store user message in memory
    conversationHistory.push({ role: "user", content: userMessage });
    if (conversationHistory.length > MAX_HISTORY) {
      conversationHistory = conversationHistory.slice(-MAX_HISTORY);
    }

    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
    ] as { role: MessageRole; content: string }[];

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages,
      temperature: 0.7,
      max_tokens: 4096,
    });

    const aiReply = chatCompletion.choices[0]?.message?.content || "⚠️ Something went wrong.";

    // Add assistant response to memory
    conversationHistory.push({ role: "assistant", content: aiReply });

    // --- Save to file ---
    try {
      const raw = await fs.readFile(DATA_FILE, "utf8");
      const allChats: Record<string, any[]> = JSON.parse(raw || "{}");
      if (!allChats[userId]) allChats[userId] = [];
      allChats[userId].push({ role: "user", content: userMessage });
      allChats[userId].push({ role: "ai", content: aiReply });
      await fs.writeFile(DATA_FILE, JSON.stringify(allChats, null, 2), "utf8");
      console.log(`[SAVE] userId: ${userId}, chat length: ${allChats[userId].length}`);
    } catch (err) {
      console.error("❌ Error saving chat to file:", err);
    }

    console.log("Code analyzed for:", { userId, problemType, difficulty, platform, goal });
    return NextResponse.json({ reply: aiReply });

  } catch (error: any) {
    console.error("OpenAI API error:", error);

    let errorMessage = "AI request failed. Please try again.";
    if (error instanceof OpenAI.APIError) {
      errorMessage = `API Error: ${error.status} - ${error.message}`;
    } else if (!process.env.OPENAI_API_KEY) {
      errorMessage = "Missing OpenAI API key. Please set OPENAI_API_KEY in .env.local.";
    }

    return NextResponse.json({ reply: errorMessage });
  }
}
