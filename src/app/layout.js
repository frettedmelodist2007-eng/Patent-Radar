import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "PatentRadar | AI Patent Analysis",
  description: "Analyze your invention ideas using advanced AI to discover prior art and assess patentability.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col bg-app text-main transition-colors duration-300`}>
        {/* We use a hydration script in a real app to prevent flash, but for simplicity here we assume the client sets the dark class */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
        <Navbar />
        <main className="flex-grow w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
