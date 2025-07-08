import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.resolve(process.cwd(), "data/user_chats.json");

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId") || "test-user";
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const allChats = JSON.parse(raw || "{}");
    const userHistory = allChats[userId] || [];

    return NextResponse.json({ history: userHistory });
  } catch (err) {
    console.error("❌ Failed to load user history:", err);
    return NextResponse.json({ error: "Failed to load history" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, message, reset } = body;

    if (!userId || (!message && !reset)) {
      return NextResponse.json({ error: "Missing userId or message/reset" }, { status: 400 });
    }

    const raw = await fs.readFile(DATA_FILE, "utf8");
    const allChats: Record<string, any[]> = JSON.parse(raw || "{}");

    if (reset) {
      allChats[userId] = [];
      await fs.writeFile(DATA_FILE, JSON.stringify(allChats, null, 2), "utf8");
      console.log(`[RESET] Cleared chat for userId: ${userId}`);
      return NextResponse.json({ success: true });
    }

    if (!allChats[userId]) allChats[userId] = [];
    allChats[userId].push(message);
    await fs.writeFile(DATA_FILE, JSON.stringify(allChats, null, 2), "utf8");
    console.log(`[SAVE] userId: ${userId}, chat length: ${allChats[userId].length}`);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Error saving message:", err);
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
} 