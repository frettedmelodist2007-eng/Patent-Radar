"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedCard from "@/components/AnimatedCard";
import Loader from "@/components/Loader";
import ResultPanel from "@/components/ResultPanel";

export default function AnalyzePage() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!idea.trim()) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setResult(data);
      
      // Auto-save to notebook if successful
      try {
        const saved = JSON.parse(localStorage.getItem("patentNotebook") || "[]");
        saved.push({
          id: Date.now(),
          date: new Date().toISOString(),
          idea: idea.substring(0, 50) + (idea.length > 50 ? "..." : ""),
          fullIdea: idea,
          score: data.novelty_score ?? data.score,
          risk: data.risk_level ?? data.risk
        });
        localStorage.setItem("patentNotebook", JSON.stringify(saved));
      } catch (e) {
        console.error("Failed to save to notebook", e);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Analyze Your Idea</h1>
        <p className="text-muted max-w-2xl mx-auto">
          Describe your invention in detail. Our AI will evaluate novelty, detect prior art risks, and provide a patentability summary.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Section */}
        <div className={`${result ? 'lg:col-span-4' : 'lg:col-span-12'} transition-all duration-500`}>
          <AnimatedCard className="h-full">
            <form onSubmit={handleAnalyze} className="flex flex-col h-full">
              <label htmlFor="idea" className="block text-sm font-medium mb-2">
                Invention Description
              </label>
              <textarea
                id="idea"
                rows={result ? 12 : 8}
                className="w-full p-4 bg-app border border-app rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-none mb-6 outline-none"
                placeholder="e.g. A wearable device that uses transdermal optical sensors to continuously monitor blood glucose levels without needles..."
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                required
              />
              
              <button
                type="submit"
                disabled={loading || !idea.trim()}
                className="mt-auto w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-medium shadow-lg hover:shadow-emerald-500/30 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out"></div>
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : "Run AI Analysis"}
                </span>
              </button>

              {error && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm">
                  {error}
                </div>
              )}
            </form>
          </AnimatedCard>
        </div>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {(loading || result) && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="lg:col-span-8"
            >
              {loading ? (
                <AnimatedCard className="h-full flex items-center justify-center min-h-[400px]">
                  <Loader text="Analyzing uniqueness and formatting report..." />
                </AnimatedCard>
              ) : (
                <ResultPanel result={result} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
