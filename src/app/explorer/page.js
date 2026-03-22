"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockPatents } from "@/data/mockPatents";
import AnimatedCard from "@/components/AnimatedCard";

export default function ExplorerPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  const categories = ["All", ...Array.from(new Set(mockPatents.map(p => p.category)))].sort();

  const filteredPatents = mockPatents.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Patent Explorer</h1>
        <p className="text-muted max-w-2xl mx-auto">
          Browse through our extensive database of existing patents to discover prior art and technological trends.
        </p>
      </motion.div>

      {/* Filters & Search */}
      <div className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="pl-10 w-full p-3 bg-card border border-app rounded-xl focus:ring-2 focus:ring-emerald-500 transition-shadow outline-none"
            placeholder="Search patents by title, ID, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 custom-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat 
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20" 
                  : "bg-card border border-app text-muted hover:text-main hover:border-emerald-500/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredPatents.length > 0 ? (
            filteredPatents.map((patent, index) => (
              <motion.div
                key={patent.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index < 12 ? index * 0.05 : 0 }}
              >
                <AnimatedCard 
                  className="h-full flex flex-col"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-semibold px-2 py-1 bg-card border border-app rounded text-muted">
                      {patent.id}
                    </span>
                    <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
                      {patent.year}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">{patent.title}</h3>
                  <div className="mb-4 flex items-center gap-2 text-sm text-cyan-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {patent.category}
                  </div>
                  
                  <div className="flex-grow">
                    <p className={`text-muted text-sm ${expandedId === patent.id ? "" : "line-clamp-3"}`}>
                      {patent.abstract}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-app flex justify-between items-center">
                    <span className="text-xs text-muted flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {patent.country}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedId(expandedId === patent.id ? null : patent.id);
                      }}
                      className="text-sm font-medium text-emerald-500 hover:text-emerald-400 transition-colors"
                    >
                      {expandedId === patent.id ? "Show Less" : "Read More"}
                    </button>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="col-span-full py-20 text-center"
            >
              <div className="w-20 h-20 mx-auto bg-card rounded-full flex items-center justify-center mb-4 text-muted">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">No patents found</h3>
              <p className="text-muted">Try adjusting your search terms or filters</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
