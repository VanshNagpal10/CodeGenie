"use client";
import React, { useEffect, useRef } from "react";
import { Button } from "./ui/moving-border";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { HoverEffect } from "./ui/card-hover-effect";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const floatingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create floating particles
    const createFloatingElements = () => {
      const container = floatingRef.current;
      if (!container) return;

      for (let i = 0; i < 50; i++) {
        const element = document.createElement("div");
        element.className =
          "absolute w-1 h-1 bg-blue-400/20 rounded-full animate-pulse";
        element.style.left = Math.random() * 100 + "%";
        element.style.top = Math.random() * 100 + "%";
        element.style.animationDelay = Math.random() * 3 + "s";
        element.style.animationDuration = Math.random() * 3 + 2 + "s";
        container.appendChild(element);
      }
    };

    createFloatingElements();
  }, []);

  return (
    <div className="relative flex flex-col w-full items-center justify-center gap-1 overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
      
      {/* Animated grid pattern */}
      <div
        className={cn(
          "absolute inset-0 opacity-20",
          "[background-size:40px_40px]",
          "[background-image:radial-gradient(circle,#3b82f6_1px,transparent_1px)]",
          "animate-pulse"
        )}
      />
      
      {/* Floating particles */}
      <div ref={floatingRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Center mask */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      <div className="z-10 flex flex-col items-center justify-center w-full h-full relative">
        {/* Main Hero Content */}
        <section className="text-white py-20 px-6 mx-auto text-center space-y-12 max-w-6xl">
          {/* AI Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
            <span className="text-sm font-medium text-blue-300">
              AI-Powered • Live Analysis
            </span>
          </div>
          
          {/* Main Title with enhanced styling */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white via-blue-100 to-blue-400 leading-tight">
              Your Personalized
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                AI Coding Coach
              </span>
            </h1>
            
            {/* Subtitle with better spacing */}
            <div className="max-w-4xl mx-auto">
              <TextGenerateEffect
                words="Analyze your code, identify knowledge gaps, and get personalized learning recommendations to improve your programming skills and ace technical interviews!"
                className="text-xl md:text-2xl font-normal text-center text-gray-300 leading-relaxed"
              />
            </div>
          </div>
          
          {/* Enhanced CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/ai">
              <Button
                borderRadius="2rem"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-8 py-4 text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 w-auto min-w-[220px] max-w-full overflow-visible cursor-pointer"
              >
                <span className="flex items-center justify-center gap-2">
                  🚀 Analyze My Code
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
                </span>
              </Button>
            </Link>
          </div>
          
          {/* Stats Section */}
          <div className="flex justify-center gap-8 md:gap-16 mt-16">
            {[
              { number: "10K+", label: "Code Reviews" },
              { number: "95%", label: "Success Rate" },
              { number: "24/7", label: "AI Available" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Problem Statement Section */}
        <section className="text-white py-20 px-6 max-w-6xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
              Tired of generic coding tutorials?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-pink-400 mx-auto rounded-full" />
          </div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Most learning platforms offer one-size-fits-all content. You
              deserve something smarter. Our AI analyzes your code, identifies
              your specific knowledge gaps, and creates
              <span className="text-blue-400 font-semibold">
                {" "}
                personalized learning paths
              </span>{" "}
              with relevant resources tailored to your skill level and learning
              style.
            </p>
          </div>
          
          {/* Visual separator */}
          <div className="flex justify-center items-center gap-4 pt-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-blue-400" />
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-blue-400" />
          </div>
        </section>
        
        {/* Enhanced Features Section */}
        <div className="w-full max-w-7xl mx-auto px-6">
          <HoverEffect items={enhancedProjects} className="w-full" />
        </div>
      </div>
    </div>
  );
}

export const enhancedProjects = [
  {
    title: "🔍 Code Analysis & Feedback",
    description:
      "Submit your code solutions and get detailed AI-powered analysis on quality, patterns, and areas for improvement with real-time suggestions.",
    link: "/ai",
  },
  {
    title: "🎯 Personalized Learning Paths",
    description:
      "Receive tailored learning resources and study plans based on your specific knowledge gaps, powered by advanced AI algorithms.",
    link: "/ai",
  },
  {
    title: "💼 Interview Preparation",
    description:
      "Get step-by-step improvement roadmaps to ace technical interviews at FAANG and top tech companies with confidence.",
    link: "/ai",
  },
];