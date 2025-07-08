import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

type MessageRole = 'system' | 'user' | 'assistant';

// In-memory conversation (for single user during demo)
// In production: use a per-user store (e.g. Firebase, Redis, Supabase)
let conversationHistory: { role: MessageRole; content: string }[] = [];

// Max conversation memory limit
const MAX_HISTORY = 6;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userMessage, problemType, difficulty, platform, goal, resetConversation } = body;

  if (resetConversation) {
    conversationHistory = [];
    return NextResponse.json({ reply: "🔄 Conversation reset. You can now start a fresh analysis." });
  }

  // Input validation
  if (!userMessage || userMessage.length < 10) {
    return NextResponse.json({ reply: "⚠️ Please paste a valid code solution for analysis." });
  }

  const systemPrompt = `
You are CodeGenie — a world-class AI coding mentor with decades of virtual experience in teaching, debugging, and preparing students for top-tier technical interviews at companies like Google, Meta, and Amazon.
You specialize in analyzing code submissions, identifying strengths and blind spots, and designing personalized learning roadmaps to accelerate mastery in Data Structures, Algorithms, and System Design.
Your responses are:
Technically precise and deeply insightful
Educational and encouraging — like a mentor, not a tutor
Structured in markdown for clarity
You don't just point out what's wrong — you coach users toward long-term growth with tailored resources, coding patterns, and interview strategies.

The user has submitted a code solution based on:
- 🧩 Problem Type: ${problemType}
- 🔄 Difficulty: ${difficulty}
- 💻 Platform: ${platform}
- 🎯 Goal: ${goal}

Your response must include the following sections in markdown with enhanced formatting:

# 🌟 Analysis Summary
Provide a brief, encouraging summary of the code quality in 2-3 sentences.

# ✅ Strengths
- 🔍 **Clear Segregation**: Highlight specific strengths with emoji bullets
- 📝 **Readable Logic**: Format each point with bold highlights for key concepts
- 🚀 **Efficient Code**: Use code snippets in backticks to reference good parts

# ⚠️ Areas for Improvement
- 🐛 **Issue Type**: Describe what the problem is
  - Why it matters (impact on performance/readability)
  - How to fix it: \`code example\`

# 🔄 Alternative Approaches
### Optimal Solution
\`\`\`cpp
// Example code with better approach
\`\`\`
- Time Complexity: O(n)
- Space Complexity: O(1)
- Benefits: Explain why this is better

# 🎯 Learning Plan
- 📚 **Concept 1**: Brief explanation
  - Resource: [Title](link)
- 🧩 **Similar Problems**: [Problem Name](link)

# 🛤 Roadmap
1. **Step 1**: Specific action item
2. **Step 2**: Next specific action
3. **Step 3**: Final action

Use proper markdown formatting with headings, code blocks, bold text, and bullet points to make your response visually organized and easy to read. Use syntax highlighting in code blocks by specifying the language.

Be encouraging, specific, and actionable. Do NOT provide generic advice. Only respond if the code is valid.
`;

  try {
    const openai = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: process.env.GITHUB_TOKEN
  });

    // Store user message
    conversationHistory.push({ role: "user", content: userMessage });

    // Trim conversation history
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

    // Add assistant response to history
    conversationHistory.push({ role: "assistant", content: aiReply });

    console.log("Code analyzed for:", { problemType, difficulty, platform, goal });
    return NextResponse.json({ reply: aiReply });

  } catch (error: unknown) {
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
