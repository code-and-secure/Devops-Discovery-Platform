import Link from "next/link";
import { Compass, Home, Search, Map, Newspaper } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-4 text-center">
      {/* Animated logo */}
      <div className="mb-8 relative">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30 mx-auto animate-bounce">
          <Compass className="w-12 h-12 text-white" />
        </div>
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-black px-2 py-0.5 rounded-full">404</span>
      </div>

      <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
        Lost in the{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
          Cloud
        </span>
      </h1>
      <p className="text-slate-500 dark:text-slate-400 text-lg mb-8 max-w-md">
        This page doesn&apos;t exist. Let&apos;s get you back to exploring the DevOps universe.
      </p>

      {/* Quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 w-full max-w-lg">
        {[
          { href: "/", icon: Home, label: "Explore" },
          { href: "/roadmaps", icon: Map, label: "Roadmaps" },
          { href: "/news", icon: Newspaper, label: "News" },
          { href: "/?q=kubernetes", icon: Search, label: "Search" },
        ].map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-400 hover:shadow-md transition-all group"
          >
            <Icon className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{label}</span>
          </Link>
        ))}
      </div>

      <Link
        href="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
