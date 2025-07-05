"use client";
import React from "react";
import { Button } from "./ui/moving-border";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { HoverEffect } from "./ui/card-hover-effect";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  return (
    <div className="relative flex flex-col w-full items-center justify-center gap-1 bg-white dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="z-50 flex flex-col items-center justify-center w-full h-full">
      <section className="text-white py-16 px-6 mx-auto text-center space-y-8">
      <p className="text-lg md:text-7xl font-normal pb-4 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-300  ">
        Your Personalized Coding Coach
      </p>
      <TextGenerateEffect words={`Analyze your code, identify knowledge gaps, and get personalized learning recommendations to improve your programming skills and ace technical interviews!`} className="text-lg md:text-7xl font-normal pb-4 text-center bg-clip-text bg-gradient-to-b text-gray-400 from-neutral-100 to-neutral-300" />
      {/* <p className="text-lg md:text-2xl font-normal text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-300">
        Track your calories, monitor your BMI, and get AI-generated diet plans
        tailored to your needs. Join us in your journey to a healthier you!
        </p> */}
      </section>
      <Link href={"/ai"}>
        <Button
          borderRadius="1.75rem"
          className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 cursor-pointer"
          >
          Analyze My Code
        </Button>
      </Link>
      <section className="text-white py-16 px-6 max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold">
          Tired of generic coding tutorials?
        </h2>
        <p className="text-lg md:text-xl text-gray-400">
          Most learning platforms offer one-size-fits-all content. You deserve
          something smarter. Our AI analyzes your code, identifies your specific knowledge gaps,
          and creates personalized learning paths with relevant resources tailored to your skill level
          and learning style.
        </p>
      </section>
      <HoverEffect items={projects} className="w-[75%] text-3xl"/>
      </div>
    </div>
  );
}
export const projects = [
  {
    title: "Code Analysis & Feedback",
    description:
      `Submit your code solutions and get detailed analysis on quality, patterns, and areas for improvement.`,
    link: "/ai",
  },
  {
    title: "Personalized Learning Paths",
    description:
      `Receive tailored learning resources and study plans based on your specific knowledge gaps.`,
    link: "/ai",
  },
  {
    title: "Interview Preparation",
    description:
      `Get step-by-step improvement roadmaps to ace technical interviews at top tech companies.`,
    link: "/ai"
  }];
