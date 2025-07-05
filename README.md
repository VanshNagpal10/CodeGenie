# CodeGenie: Your Personalized AI Coding Coach

<p align="center">
  <img src="public/file.svg" alt="CodeGenie Logo" width="100" height="100">
</p>

## 🚀 Overview

CodeGenie is an AI-powered coding assistant designed to help programmers improve their skills through personalized feedback and learning recommendations. The application analyzes your code, identifies knowledge gaps, and creates tailored learning paths to enhance your programming skills and prepare you for technical interviews.

## ✨ Features

- **Code Analysis & Feedback**: Submit your code solutions and get detailed analysis on quality, patterns, and areas for improvement
- **Personalized Learning Paths**: Receive tailored learning resources and study plans based on your specific knowledge gaps
- **Interview Preparation**: Get step-by-step improvement roadmaps to ace technical interviews at top tech companies
- **Interactive Chat Interface**: Engage with the AI assistant through a user-friendly chat interface
- **Topic Customization**: Specify problem types, difficulty levels, platforms, and learning goals

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS 4
- **UI Components**: Custom components with animations and hover effects
- **AI Integration**: OpenAI API (GPT-4.1)
- **Styling**: TailwindCSS with custom animations
- **Markdown Rendering**: React-Markdown for formatted AI responses

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key (for AI functionality)

## 🚀 Getting Started

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/codecoach.git
   cd codecoach
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application

## 🧩 Project Structure

```
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── ai/           # AI Chat interface
│   │   ├── api/          # API routes
│   │   │   └── chat/     # Chat API endpoint
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/       # React components
│   │   ├── Footer.tsx    # Footer component
│   │   ├── HeroSection.tsx # Hero section component
│   │   ├── Navbar.tsx    # Navigation bar component
│   │   └── ui/           # UI components
│   └── lib/              # Utility functions
└── ...                   # Config files
```

## 🔧 Usage

1. Navigate to the home page to learn about CodeGenie's features
2. Click on "Analyze My Code" to access the AI chat interface
3. Paste your code in the text area
4. Select the relevant topic, difficulty, platform, and goal
5. Click "Analyze Code" to receive personalized feedback
6. Continue the conversation with follow-up questions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) - The React Framework
- [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework
- [OpenAI](https://openai.com/) - For the AI capabilities
- [Vercel](https://vercel.com/) - For hosting and deployment

---

Built with ❤️ by Vansh Nagpal
