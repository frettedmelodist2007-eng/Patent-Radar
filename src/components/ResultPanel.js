import { motion } from "framer-motion";
import AnimatedCard from "./AnimatedCard";

export default function ResultPanel({ result }) {
  if (!result) return null;

  const { score, novelty_score, risk_level, risk, confidence, summary, similarities, unique_points, improvements, patent_analysis, keywords } = result;

  // Compatibility mapping for old vs new schema
  const displayScore = novelty_score !== undefined ? novelty_score : score;
  const displayRisk = risk_level !== undefined ? risk_level : risk;
  
  // Find top match
  const topMatch = patent_analysis && patent_analysis.length > 0 
    ? [...patent_analysis].sort((a,b) => b.similarity - a.similarity)[0] 
    : null;

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };
  
  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case "low": return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
      case "medium": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "high": return "text-red-500 bg-red-500/10 border-red-500/20";
      default: return "text-muted bg-card border-app";
    }
  };

  const getConfidenceColor = (conf) => {
    switch (conf?.toLowerCase()) {
      case "high": return "text-emerald-500";
      case "medium": return "text-yellow-500";
      case "low": return "text-red-500";
      default: return "text-muted";
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Keywords Card (New) */}
        {keywords && keywords.length > 0 && (
          <AnimatedCard className="md:col-span-2 flex flex-col justify-center">
            <h3 className="text-sm font-semibold mb-3 text-muted">Extracted Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {keywords.map(kw => (
                 <span key={kw} className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent rounded-full text-sm font-medium">
                   {kw}
                 </span>
              ))}
            </div>
          </AnimatedCard>
        )}

        {/* Score Card */}
        <AnimatedCard className="flex flex-col items-center justify-center text-center relative">
          <h3 className="text-xl font-semibold mb-2">Novelty Score</h3>
          <div className="relative mb-4">
            <svg className="w-32 h-32" viewBox="0 0 36 36">
              <path
                className="text-border-color"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                className={getScoreColor(displayScore)}
                strokeDasharray={`${displayScore}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col">
              <span className={`text-3xl font-bold ${getScoreColor(displayScore)}`}>{displayScore}</span>
              <span className="text-xs text-muted uppercase">/ 100</span>
            </div>
          </div>
          
          {topMatch && topMatch.similarity > 0 && (
             <div className="mt-2 text-sm font-medium bg-red-500/10 text-red-400 px-3 py-1.5 rounded-full border border-red-500/20">
               🔥 Most Similar Patent: {topMatch.similarity}% match
             </div>
          )}
        </AnimatedCard>

        {/* Status Card */}
        <AnimatedCard className="flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-4">Risk & Confidence</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-app">
              <span className="text-muted">Prior Art Risk</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(displayRisk)}`}>
                {displayRisk ? displayRisk.toUpperCase() : "UNKNOWN"}
              </span>
            </div>
            {confidence && (
              <div className="flex justify-between items-center pb-3 border-b border-app">
                <span className="text-muted">Data Confidence</span>
                <span className={`font-medium ${getConfidenceColor(confidence)}`}>{confidence}</span>
              </div>
            )}
            <div className="flex justify-between items-center pb-3 border-b border-app">
              <span className="text-muted">Patentability</span>
              <span className="font-medium">{displayScore >= 70 ? "Favorable" : "Challenging"}</span>
            </div>
          </div>
        </AnimatedCard>

        {/* Summary Card */}
        <AnimatedCard className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-4">AI Analysis Summary</h3>
          <p className="text-muted leading-relaxed whitespace-pre-line text-lg">
            {summary}
          </p>
        </AnimatedCard>
        
        {/* Similarities & Unique Points List */}
        {(similarities?.length > 0 || unique_points?.length > 0) && (
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedCard>
              <h3 className="text-lg font-semibold mb-4 text-red-500 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                Similarities
              </h3>
              <ul className="space-y-2">
               {similarities?.map((sim, i) => (
                  <li key={i} className="flex gap-2 text-sm text-muted">
                    <span className="text-red-500 mt-0.5">•</span> <span>{sim}</span>
                  </li>
               ))}
              </ul>
            </AnimatedCard>
            
            <AnimatedCard>
              <h3 className="text-lg font-semibold mb-4 text-emerald-500 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Unique Points
              </h3>
              <ul className="space-y-2">
               {unique_points?.map((uniq, i) => (
                  <li key={i} className="flex gap-2 text-sm text-muted">
                    <span className="text-emerald-500 mt-0.5">•</span> <span>{uniq}</span>
                  </li>
               ))}
              </ul>
            </AnimatedCard>
          </div>
        )}

        {/* Improvement Suggestions */}
        {improvements?.length > 0 && (
          <AnimatedCard className="md:col-span-2 border-accent/20">
            <h3 className="text-lg font-semibold mb-4 text-accent flex items-center gap-2">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
               Suggestions for Novelty
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {improvements.map((imp, i) => (
                 <li key={i} className="bg-app p-3 rounded-lg text-sm text-muted border border-app hover:border-accent/30 transition-colors">
                   {imp}
                 </li>
              ))}
            </ul>
          </AnimatedCard>
        )}

        {/* Similar Patents List */}
        {patent_analysis && patent_analysis.length > 0 && (
          <AnimatedCard className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Relevant Prior Art Detected
            </h3>
            <div className="space-y-4">
              {patent_analysis.map((patent, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-app border border-app hover:border-accent/30 transition-colors group">
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <h4 className="font-medium group-hover:text-accent transition-colors">
                       {patent.link ? (
                           <a href={patent.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{patent.title}</a>
                       ) : patent.title}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${patent.similarity > 70 ? 'bg-red-500/10 text-red-500' : patent.similarity > 40 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                       {patent.similarity}% Match
                    </span>
                  </div>
                  <p className="text-sm text-muted">{patent.overlap}</p>
                </div>
              ))}
            </div>
          </AnimatedCard>
        )}
      </div>
    </motion.div>
  );
}
