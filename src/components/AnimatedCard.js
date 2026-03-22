"use client";

import { motion } from "framer-motion";

export default function AnimatedCard({ 
  children, 
  delay = 0, 
  className = "", 
  whileHover = { y: -8, scale: 1.02, transition: { duration: 0.2 } },
  onClick 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
      whileHover={whileHover}
      onClick={onClick}
      className={`bg-card rounded-2xl p-6 shadow-sm border border-app hover:shadow-lg hover:border-emerald-500/30 transition-shadow cursor-pointer relative overflow-hidden group ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
