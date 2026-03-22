"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AnimatedCard from "@/components/AnimatedCard";

export default function NotebookPage() {
  const [savedIdeas, setSavedIdeas] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = JSON.parse(localStorage.getItem("patentNotebook") || "[]");
      setSavedIdeas(saved);
    } catch (e) {
      console.error("Failed to load notebook", e);
    }
  }, []);

  const removeIdea = (id) => {
    const updated = savedIdeas.filter(idea => idea.id !== id);
    setSavedIdeas(updated);
    localStorage.setItem("patentNotebook", JSON.stringify(updated));
  };

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Your Idea Notebook</h1>
        <p className="text-muted max-w-2xl mx-auto">
          View your previously analyzed concepts, novelty scores, and risk assessments.
        </p>
      </motion.div>

      {savedIdeas.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-app rounded-2xl p-12 text-center shadow-sm"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-app flex items-center justify-center mb-6 text-emerald-500">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-2">Notebook is Empty</h3>
          <p className="text-muted mb-8 mb-4 max-w-md mx-auto">
            You haven't analyzed any ideas yet. Start by submitting an invention description to our AI.
          </p>
          <Link href="/analyze">
            <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-medium shadow-md hover:shadow-emerald-500/30 transition-all cursor-pointer">
              Analyze New Idea
            </button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {savedIdeas.map((idea) => (
              <motion.div
                key={idea.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              >
                <AnimatedCard className="h-full flex flex-col relative group">
                  <button 
                    onClick={() => removeIdea(idea.id)}
                    className="absolute top-4 right-4 p-2 text-muted hover:text-red-500 bg-app rounded-full opacity-0 group-hover:opacity-100 transition-all"
                    title="Remove from notebook"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  
                  <div className="flex justify-between items-start mb-4 pr-10">
                    <span className="text-xs text-muted">
                      {new Date(idea.date).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <span className={`text-xs px-2 py-1 rounded font-medium ${idea.score >= 70 ? 'bg-emerald-500/10 text-emerald-500' : idea.score >= 40 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'}`}>
                        Score: {idea.score}
                      </span>
                      <span className="text-xs px-2 py-1 rounded bg-card border border-app text-muted font-medium">
                        {idea.risk} Risk
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-main leading-relaxed flex-grow whitespace-pre-line italic text-sm mb-4 border-l-2 border-emerald-500 pl-4">
                    "{idea.fullIdea}"
                  </p>
                  
                  <div className="mt-4 pt-4 border-t border-app">
                    <Link href="/analyze" className="text-sm font-medium text-emerald-500 hover:text-cyan-500 transition-colors inline-flex items-center gap-1">
                      Analyze again
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
