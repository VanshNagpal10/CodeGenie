import { promises as fs } from "fs";
import path from "path";

const FILE = path.resolve(process.cwd(), "data/user_chats.json");

export async function ensureDataFileExists() {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  try { 
    await fs.access(FILE); 
  } catch { 
    await fs.writeFile(FILE, "{}"); 
  }
  return FILE;
}

export async function readUserChats(): Promise<Record<string, { role: string; content: string; timestamp: string }[]>> {
  await ensureDataFileExists();
  const data = await fs.readFile(FILE, "utf-8");
  return JSON.parse(data);
}

export async function writeUserChats(chats: Record<string, { role: string; content: string; timestamp: string }[]>) {
  await ensureDataFileExists();
  await fs.writeFile(FILE, JSON.stringify(chats, null, 2), "utf-8");
} 