"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signinAction } from "@/app/actions";
import { Loader, AlertCircle } from "lucide-react";

const inputCls = "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm";

export function SigninForm() {
  const [state, action, pending] = useActionState(signinAction, null);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Email address
        </label>
        <input name="email" type="email" required placeholder="you@example.com" className={inputCls} />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
        </div>
        <input name="password" type="password" required placeholder="••••••••" className={inputCls} />
      </div>

      {state?.message && !state.success && (
        <div className="flex items-start gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 active:scale-95 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all text-sm flex items-center justify-center gap-2"
      >
        {pending && <Loader className="w-4 h-4 animate-spin" />}
        {pending ? "Signing in…" : "Sign In"}
      </button>

      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
          Create one free
        </Link>
      </p>
    </form>
  );
}
