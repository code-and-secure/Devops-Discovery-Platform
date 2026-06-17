"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X, Compass } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Explore" },
  { href: "/roadmaps", label: "Roadmaps" },
  { href: "/roadmaps/learning", label: "Learning" },
  { href: "/roadmaps/certifications", label: "Certifications" },
  { href: "/roadmaps/salaries", label: "Salaries" },
  { href: "/roadmaps/interviews", label: "Interview Prep" },
  { href: "/news", label: "News" },
  { href: "/newsletter", label: "Newsletter" },
];

export function MobileNav({ activePage }: { activePage?: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const overlay = (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />

      {/* Slide-in panel */}
      <div className={`fixed top-0 left-0 h-full w-72 z-[201] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-2xl transform transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-400">
            <Compass className="w-7 h-7" />
            <span>Stack<span className="text-slate-900 dark:text-white">Lens</span></span>
          </Link>
          <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100 dark:border-slate-800">
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="block text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl text-sm font-bold transition-all"
          >
            Sign In
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Hamburger button — stays inside the header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Toggle menu"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Portal: renders at <body> level, outside any stacking context */}
      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
