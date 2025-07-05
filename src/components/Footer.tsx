import React from 'react'
import Link from 'next/link'
import { Code, Github, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className='p-8 shadow-lg bg-black w-full dark:border dark:border-white/[0.1] rounded-t-3xl'>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Code className="h-6 w-6 mr-2" />
              <h3 className="text-xl font-bold">CodeCoach</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Your personalized learning companion for mastering data structures, algorithms, and acing technical interviews.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="https://github.com" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Resources</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/resources" className="hover:text-white transition-colors">Learning Paths</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">Algorithm Guides</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">Data Structure Tutorials</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">Coding Patterns</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Practice</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/ai" className="hover:text-white transition-colors">Code Analysis</Link></li>
              <li><Link href="/interview" className="hover:text-white transition-colors">Interview Prep</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">Problem Sets</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">Competitive Programming</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} CodeCoach. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

