import Link from "next/link";
import { Compass, MessageCircle, Bell, ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Command as GitHubIcon } from "lucide-react";

export default function DiscordPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter text-blue-600 dark:text-blue-400 group">
            <Compass className="w-7 h-7 group-hover:rotate-45 transition-transform duration-500" />
            <span>Stack<span className="text-slate-900 dark:text-white">Lens</span></span>
          </Link>
          <div className="flex items-center gap-2">
            <a href="https://github.com/code-and-secure?tab=repositories" target="_blank" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors p-2">
              <GitHubIcon className="w-5 h-5" />
            </a>
            <ThemeToggle />
            <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full text-center">
          {/* Icon */}
          <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-950/50 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-indigo-200 dark:border-indigo-800 shadow-lg shadow-indigo-500/10">
            <MessageCircle className="w-12 h-12 text-indigo-500" />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-indigo-200 dark:border-indigo-800">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Coming Soon
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
            Discord server is on{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
              the way
            </span>
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg mb-3 leading-relaxed">
            We&apos;re building a community for DevOps, Cloud, and AI engineers. The StackLens Discord server will be available soon.
          </p>
          <p className="text-slate-400 dark:text-slate-500 text-sm mb-10">
            Thanks for your patience — it&apos;ll be worth the wait! 🚀
          </p>

          {/* Notify form */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 mb-8 shadow-sm">
            <div className="flex items-center gap-2 mb-3 justify-center">
              <Bell className="w-4 h-4 text-blue-500" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Get notified when we launch</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-md shadow-indigo-500/20 whitespace-nowrap"
              >
                Notify Me
              </button>
            </form>
          </div>

          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to StackLens
          </Link>
        </div>
      </main>
    </div>
  );
}
