"use client";
import React from 'react'
import { useState } from "react";
import { MessageCircle, MoreVertical, Code, BookOpen, GraduationCap } from "lucide-react";
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-black-900 sticky top-0 z-60 shadow-lg rounded-b-3xl bg-black w-full dark:border dark:border-white/[0.1]">
      <Link href={'/'} className="text-2xl font-bold"><Code className="mr-2 h-8 w-8 inline-block" />CodeGenie</Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={` bg-white text-black flex items-center gap-2 px-5 py-2 rounded-full w-40 font-bold justify-between ${
            menuOpen ? "bg-white text-black" : "bg-black-900 text-black"
          }  will-change-transform group hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(.22,.68,0,1)]`}
        >
          {menuOpen ? "CLOSE" : "MENU"}
         

          <span className="bg-black relative overflow-hidden flex items-center justify-center w-7 lg:w-12 h-7 lg:h-12 rounded-full group">
  <span className="text-[#f0f6f8] rotate-90 block w-1/3 will-change-transform transition-transform duration-500 ease-[cubic-bezier(.22,.68,0,1.5)] group-hover:rotate-[180deg]">
    <svg width="100%" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11.4517" cy="3.41264" r="2.54545" fill="currentColor"></circle>
      <circle cx="2.54545" cy="3.41264" r="2.54545" fill="currentColor"></circle>
    </svg>
  </span>
</span>

        </button>

      {menuOpen && (
       <div
       className={`absolute top-20 right-6 bg-gray-200 rounded-3xl shadow-md px-6 py-8 w-[20%] flex flex-col gap-2 text-xl font-semibold z-50 mt-3.5 transition-all duration-500 ease-in-out
       ${menuOpen ? "translate-x-0 rotate-0 opacity-100 pointer-events-auto" : "translate-x-[120%] rotate-[8deg] opacity-0 pointer-events-none"}`}
     >
          <Link href="/" className="text-black px-4 py-2 rounded-md hover:bg-white transition-colors duration-200 ease-out flex items-center"><Code className="mr-2 h-4 w-4" />Home</Link>
          <Link href="/ai" className="text-black px-4 py-2 rounded-md hover:bg-white transition-colors duration-200 ease-out flex items-center"><MessageCircle className="mr-2 h-4 w-4" />Code Analysis</Link>
          <Link href="/resources" className="text-black px-4 py-2 rounded-md hover:bg-white transition-colors duration-200 ease-out flex items-center"><BookOpen className="mr-2 h-4 w-4" />Learning Resources</Link>
          <Link href="/interview" className="text-black px-4 py-2 rounded-md hover:bg-white transition-colors duration-200 ease-out flex items-center"><GraduationCap className="mr-2 h-4 w-4" />Interview Prep</Link>
          <Link href="/about" className="text-black px-4 py-2 rounded-md hover:bg-white transition-colors duration-200 ease-out">About</Link>
        </div>
      )}
    </nav>
  );
}


