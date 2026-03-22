"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedCard from "@/components/AnimatedCard";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/20 blur-[120px] animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/20 blur-[100px] animate-[float_10s_ease-in-out_infinite_reverse]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center">
        
        {/* Hero Section */}
        <motion.div 
          className="text-center max-w-3xl mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-6">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Powered by Next-Gen AI
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 bg-[length:200%_auto] animate-[gradient-shift_8s_ease_infinite]">
              Analyze Your Invention
            </span>
            <br />
            <span className="text-main">with AI Precision.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted mb-10 leading-relaxed">
            Protect your intellectual property instantly. Submit your idea to our advanced AI to evaluate novelty, discover prior art, and generate comprehensive patentability reports.
          </p>

          <Link href="/analyze">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(16, 185, 129, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-emerald-500/30 transition-all cursor-pointer relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
              Analyze Idea Free &rarr;
            </motion.button>
          </Link>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-10"
        >
          <motion.div variants={itemVariants} className="h-full">
            <AnimatedCard className="h-full flex flex-col items-start p-8 glow-border">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-500">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Instant AI Analysis</h3>
              <p className="text-muted leading-relaxed">
                Our proprietary LLM analyzes your invention descriptions in seconds, highlighting strengths and potential weaknesses in patentability.
              </p>
            </AnimatedCard>
          </motion.div>

          <motion.div variants={itemVariants} className="h-full">
            <AnimatedCard className="h-full flex flex-col items-start p-8 glow-border">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 text-cyan-500">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Deep Prior Art Search</h3>
              <p className="text-muted leading-relaxed">
                Connects across global patent databases to find structurally similar ideas, giving you an accurate risk assessment before filing.
              </p>
            </AnimatedCard>
          </motion.div>

          <motion.div variants={itemVariants} className="h-full">
            <AnimatedCard className="h-full flex flex-col items-start p-8 glow-border">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-500">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Draft-Ready Reports</h3>
              <p className="text-muted leading-relaxed">
                Generates a structured, professional-grade report outlining claims and specifications ready to be reviewed by a patent attorney.
              </p>
            </AnimatedCard>
          </motion.div>
        </motion.div>
        
      </div>
    </div>
  );
}
