"use client";

import { motion } from "framer-motion";
import AnimatedCard from "@/components/AnimatedCard";

export default function LearningPage() {
  const concepts = [
    {
      title: "What is Prior Art?",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      content: "Prior art constitutes all information that has been made available to the public in any form before a given date that might be relevant to a patent's claims of originality. Having high prior art risk means someone else has likely already thought of your exact concept.",
      classes: "bg-emerald-500/10 text-emerald-500"
    },
    {
      title: "Novelty vs. Non-Obviousness",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      content: "Novelty implies the invention does not previously exist. Non-obviousness implies that someone \"ordinarily skilled in the art\" wouldn't naturally think to create the invention based on combining existing prior art. Both are required for a patent.",
      classes: "bg-cyan-500/10 text-cyan-500"
    },
    {
      title: "The Patenting Process",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      content: "Filing a patent involves drafting meticulous claims, filing with a patent office (like the USPTO), and undergoing examination. The examiner reviews prior art and determines if claims should be accepted, rejected, or modified.",
      classes: "bg-indigo-500/10 text-indigo-500"
    },
    {
      title: "Types of Patents",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      content: "Utility patents protect how an invention works (e.g., software, machinery). Design patents protect how it looks (e.g., UI layout, physical shape). Plant patents protect agricultural variations.",
      classes: "bg-rose-500/10 text-rose-500"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-6">
          Educational Resources
        </div>
        <h1 className="text-4xl font-bold mb-4">Patent Learning Center</h1>
        <p className="text-muted max-w-2xl mx-auto text-lg">
          Master the fundamentals of intellectual property to protect your valuable ideas.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {concepts.map((concept, index) => (
          <motion.div
            key={concept.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="h-full"
          >
            <AnimatedCard className="h-full">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${concept.classes}`}>
                {concept.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{concept.title}</h3>
              <p className="text-muted leading-relaxed text-lg">
                {concept.content}
              </p>
            </AnimatedCard>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-16 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-3xl p-8 sm:p-12 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Ready to test your knowledge?</h2>
        <p className="text-muted max-w-2xl mx-auto mb-8">
          Now that you know the criteria for patentability, try describing your own invention to see how it scores in our AI tool.
        </p>
        <a 
          href="/analyze"
          className="inline-flex items-center justify-center px-8 py-3 bg-app border-2 border-emerald-500 text-main rounded-xl font-medium hover:bg-emerald-500 hover:text-white transition-colors"
        >
          Go to Analysis Tool
        </a>
      </motion.div>
    </div>
  );
}
