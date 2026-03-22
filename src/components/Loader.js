export default function Loader({ text = "AI Analyzing..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-20 h-20 border-4 border-emerald-500/20 rounded-full"></div>
        <div className="absolute w-20 h-20 border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <div className="w-12 h-12 bg-gradient-to-tr from-emerald-400 to-cyan-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/40"></div>
      </div>
      <p className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-cyan-500 animate-pulse">
        {text}
      </p>
      
      {/* Shimmer loading bars */}
      <div className="w-full max-w-sm space-y-3 mt-4">
        <div className="h-3 w-3/4 rounded bg-border-color overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
        </div>
        <div className="h-3 w-5/6 rounded bg-border-color overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite_0.2s]"></div>
        </div>
        <div className="h-3 w-1/2 rounded bg-border-color overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite_0.4s]"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
