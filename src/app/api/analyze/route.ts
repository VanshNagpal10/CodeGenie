import { NextRequest, NextResponse } from "next/server";
import { readUserChats, ensureDataFileExists } from "@/lib/fs";
import OpenAI from "openai";
import { analysisPrompt } from "@/lib/prompts";
import path from "path";
import fs from "fs/promises";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId || typeof userId !== "string") {
      return NextResponse.json({ error: "Missing or invalid userId" }, { status: 400 });
    }

    await ensureDataFileExists();
    let allChats;
    try {
      allChats = await readUserChats();
    } catch (error) {
      return NextResponse.json({ error: "Could not read user chats" }, { status: 500 });
    }

    const userChats = allChats[userId] || [];

    const openai = new OpenAI({
      baseURL: "https://models.inference.ai.azure.com",
      apiKey: process.env.GITHUB_TOKEN,
    });

    const prompt = analysisPrompt(userId, userChats);
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      });
      const content = response.choices?.[0]?.message?.content?.trim();
      if (!content) {
        console.warn("⚠️ No content returned from OpenAI");
        return NextResponse.json({ userId, analysis: "⚠️ AI returned no content." });
      }
      return NextResponse.json({ userId, analysis: content });
    } catch (err) {
      console.error("OpenAI error in analysis:", err);
      return NextResponse.json({ error: "Failed to generate analysis." }, { status: 500 });
    }
  } catch (error) {
    console.error("Error analyzing user chats:", error);
    return NextResponse.json({ error: "Failed to analyze user chats" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || "test-user";

    const file = path.resolve(process.cwd(), "data/user_chats.json");
    const raw = await fs.readFile(file, "utf8");
    const allChats = JSON.parse(raw || "{}");
    const userChats = allChats[userId] || [];

    if (!userChats.length) {
      return NextResponse.json({ analysis: null });
    }

    const openai = new OpenAI({
      baseURL: "https://models.inference.ai.azure.com",
      apiKey: process.env.GITHUB_TOKEN,
    });

    const prompt = analysisPrompt(userId, userChats);

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "system", content: prompt }],
      temperature: 0.7,
      max_tokens: 1024,
    });

    const content = response.choices?.[0]?.message?.content?.trim();
    if (!content) {
      return NextResponse.json({ userId, analysis: null });
    }

    return NextResponse.json({ userId, analysis: content });
  } catch (error) {
    console.error("GET /api/analyze error:", error);
    return NextResponse.json({ error: "Failed to fetch analysis" }, { status: 500 });
  }
}
