import { NextRequest, NextResponse } from "next/server";
import { readUserChats, writeUserChats, ensureDataFileExists } from "@/lib/fs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = body;
    
    if (!userId || typeof userId !== "string") {
      return NextResponse.json({ error: "Missing or invalid userId" }, { status: 400 });
    }
    
    // Ensure data file exists
    await ensureDataFileExists();
    
    // Read existing chats
    let allChats: Record<string, { role: string; content: string; timestamp: string }[]>;
    
    try {
      allChats = await readUserChats();
    } catch (error) {
      // If file is malformed, start fresh
      console.warn("Malformed user_chats.json, starting fresh");
      allChats = {};
    }
    
    // Add userId if missing
    if (!allChats[userId]) {
      allChats[userId] = [];
      await writeUserChats(allChats);
    }
    
    return NextResponse.json({ message: "User initialized" });
    
  } catch (error) {
    console.error("Error initializing user:", error);
    return NextResponse.json({ error: "Failed to initialize user" }, { status: 500 });
  }
} 