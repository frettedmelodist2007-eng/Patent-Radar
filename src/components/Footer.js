export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-app border-t border-app py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-muted">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-emerald-400 to-cyan-500 opacity-80"></div>
          <span className="font-semibold text-main">PatentRadar</span>
        </div>
        
        <p className="text-sm text-muted">
          &copy; {currentYear} PatentRadar. Built with Next.js, Framer Motion, and Gemini AI.
        </p>
        
        <div className="flex gap-6">
          <a href="#" className="text-muted hover:text-accent transition-colors text-sm">Terms</a>
          <a href="#" className="text-muted hover:text-accent transition-colors text-sm">Privacy</a>
          <a href="#" className="text-muted hover:text-accent transition-colors text-sm">Contact</a>
        </div>
      </div>
    </footer>
  );
}
