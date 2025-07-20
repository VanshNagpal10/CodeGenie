import React from 'react'
import Link from 'next/link'
import { Code, Github, Linkedin, Twitter, Zap, BookOpen, Trophy, Users, Mail, ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className='relative bg-black overflow-hidden'>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black to-black" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
      
      {/* Animated grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,#3b82f6_1px,transparent_1px)] [background-size:50px_50px]" />
      
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      
      <div className="relative p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex items-center group">
                <div className="relative mr-3">
                  <Code className="h-8 w-8 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                  CodeGenie
                </h3>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                Your AI-powered coding mentor that provides real-time feedback, identifies weak patterns, 
                and generates personalized learning roadmaps to ace technical interviews.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4 pt-4">
                {[
                  { icon: Github, href: "https://github.com", label: "GitHub" },
                  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" }
                ].map((social, index) => (
                  <Link 
                    key={index}
                    href={social.href} 
                    className="group relative p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/50 rounded-lg transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Newsletter Section */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-xl font-semibold text-white">Stay Updated</h4>
                <p className="text-gray-400">Get the latest AI-powered coding insights and interview tips.</p>
              </div>
              
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-400" />
                AI Features
              </h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><Link href="/ai" className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Code Analysis
                </Link></li>
                <li><Link href="/ai" className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Pattern Recognition
                </Link></li>
                <li><Link href="/ai" className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Real-time Feedback
                </Link></li>
                <li><Link href="/ai" className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Smart Suggestions
                </Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-green-400" />
                Learning
              </h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><Link href="/resources" className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Personalized Paths
                </Link></li>
                <li><Link href="/resources" className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Algorithm Guides
                </Link></li>
                <li><Link href="/resources" className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Data Structures
                </Link></li>
                <li><Link href="/resources" className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Coding Patterns
                </Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                <Trophy className="h-4 w-4 text-purple-400" />
                Interview Prep
              </h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><Link href="/interview" className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Mock Interviews
                </Link></li>
                <li><Link href="/interview" className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  FAANG Questions
                </Link></li>
                <li><Link href="/interview" className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  System Design
                </Link></li>
                <li><Link href="/interview" className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Behavioral Prep
                </Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-400" />
                Company
              </h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><Link href="/about" className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  About Us
                </Link></li>
                <li><Link href="/about" className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Privacy Policy
                </Link></li>
                <li><Link href="/about" className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Terms of Service
                </Link></li>
                <li><Link href="/about" className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Contact
                </Link></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} CodeGenie. All rights reserved.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-gray-500">AI Online</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Made with</span>
              <div className="flex items-center gap-1">
                <span className="text-red-400 animate-pulse">❤️</span>
                <span>by developers, for developers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}