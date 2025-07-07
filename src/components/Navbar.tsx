"use client";
import React, { useState, useEffect } from 'react';
import { MessageCircle, MoreVertical, Code, BookOpen, GraduationCap, Zap, Users, Trophy } from "lucide-react";
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        {/* Enhanced Logo */}
        <Link 
          href="/" 
          className="text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-300 flex items-center group"
        >
          <div className="relative mr-3">
            <Code className="h-8 w-8 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          </div>
          <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            CodeGenie
          </span>
        </Link>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            href="/ai" 
            className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group"
          >
            <Zap className="h-4 w-4 group-hover:text-yellow-400 transition-colors duration-300" />
            AI Analysis
          </Link>
          <Link 
            href="/resources" 
            className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group"
          >
            <BookOpen className="h-4 w-4 group-hover:text-green-400 transition-colors duration-300" />
            Resources
          </Link>
          <Link 
            href="/interview" 
            className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group"
          >
            <Trophy className="h-4 w-4 group-hover:text-purple-400 transition-colors duration-300" />
            Interview Prep
          </Link>
          
          {/* CTA Button */}
          <Link href="/ai">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25">
              Get Started
            </button>
          </Link>
        </div>

        {/* Enhanced Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center gap-2 px-5 py-2 rounded-full font-bold justify-between transition-all duration-300 transform hover:scale-105 shadow-lg ${
            menuOpen ? 'from-purple-600 to-blue-600' : ''
          }`}
        >
          {menuOpen ? "CLOSE" : "MENU"}
          <span className="bg-black/20 relative overflow-hidden flex items-center justify-center w-8 h-8 rounded-full group">
            <span className={`text-white block transition-transform duration-300 ${
              menuOpen ? 'rotate-180' : 'rotate-90'
            }`}>
              <svg width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11.4517" cy="3.41264" r="2.54545" fill="currentColor"></circle>
                <circle cx="2.54545" cy="3.41264" r="2.54545" fill="currentColor"></circle>
              </svg>
            </span>
          </span>
        </button>

        {/* Enhanced Mobile Menu */}
        {menuOpen && (
          <div
            className={`md:hidden absolute top-20 right-6 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl px-6 py-8 w-80 flex flex-col gap-1 text-lg font-medium z-50 transition-all duration-300 ease-out ${
              menuOpen ? "translate-x-0 opacity-100 scale-100" : "translate-x-full opacity-0 scale-95"
            }`}
          >
            {/* Menu Header */}
            <div className="pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-white">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-gray-400">AI Ready</span>
              </div>
            </div>

            {/* Menu Items */}
            <Link 
              href="/" 
              className="text-white px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-200 flex items-center gap-3 group"
              onClick={() => setMenuOpen(false)}
            >
              <Code className="h-5 w-5 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
              <span>Home</span>
            </Link>
            
            <Link 
              href="/ai" 
              className="text-white px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-200 flex items-center gap-3 group"
              onClick={() => setMenuOpen(false)}
            >
              <Zap className="h-5 w-5 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
              <span>AI Code Analysis</span>
              <div className="ml-auto">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
            </Link>
            
            <Link 
              href="/resources" 
              className="text-white px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-200 flex items-center gap-3 group"
              onClick={() => setMenuOpen(false)}
            >
              <BookOpen className="h-5 w-5 text-green-400 group-hover:scale-110 transition-transform duration-300" />
              <span>Learning Resources</span>
            </Link>
            
            <Link 
              href="/interview" 
              className="text-white px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-200 flex items-center gap-3 group"
              onClick={() => setMenuOpen(false)}
            >
              <Trophy className="h-5 w-5 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
              <span>Interview Prep</span>
            </Link>
            
            <Link 
              href="/about" 
              className="text-white px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-200 flex items-center gap-3 group"
              onClick={() => setMenuOpen(false)}
            >
              <Users className="h-5 w-5 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
              <span>About</span>
            </Link>

            {/* Menu Footer */}
            <div className="pt-4 mt-4 border-t border-white/10">
              <Link href="/ai" onClick={() => setMenuOpen(false)}>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Start AI Analysis
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}