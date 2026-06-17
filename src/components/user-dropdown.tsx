"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import { signoutAction } from "@/app/actions";

interface UserDropdownProps {
  firstName: string;
  lastName: string;
  email: string;
}

function initials(firstName: string, lastName: string, email: string) {
  if (firstName) return (firstName[0] + (lastName?.[0] ?? "")).toUpperCase();
  return email[0].toUpperCase();
}

export function UserDropdown({ firstName, lastName, email }: UserDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const displayName = [firstName, lastName].filter(Boolean).join(" ") || email;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
          {initials(firstName, lastName, email)}
        </div>
        <span className="hidden sm:block text-sm font-medium text-slate-700 dark:text-slate-300 max-w-[120px] truncate">
          {firstName || email}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/40 py-1 z-50">
          {/* User info */}
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{displayName}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{email}</p>
          </div>

          {/* Menu items */}
          <div className="py-1">
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              Account Settings
            </Link>
            <Link
              href="/account#profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <User className="w-4 h-4 text-slate-400" />
              Edit Profile
            </Link>
          </div>

          {/* Sign out */}
          <div className="py-1 border-t border-slate-100 dark:border-slate-800">
            <form action={signoutAction}>
              <button
                type="submit"
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
