"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signupAction } from "@/app/actions";
import { Loader, AlertCircle, CheckCircle } from "lucide-react";

const inputCls = "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm";

export function SignupForm() {
  const [state, action, pending] = useActionState(signupAction, null);

  if (state?.success) {
    return (
      <div className="text-center py-6">
        <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-7 h-7 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">Check your inbox!</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">{state.message}</p>
        <Link href="/login" className="text-blue-600 font-semibold text-sm hover:underline">
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">First name</label>
          <input name="firstName" type="text" placeholder="John" className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Last name</label>
          <input name="lastName" type="text" placeholder="Doe" className={inputCls} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Email address <span className="text-red-500">*</span>
        </label>
        <input name="email" type="email" required placeholder="you@example.com" className={inputCls} />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Password <span className="text-red-500">*</span>
        </label>
        <input name="password" type="password" required placeholder="Min. 8 characters" className={inputCls} />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Confirm password <span className="text-red-500">*</span>
        </label>
        <input name="confirm" type="password" required placeholder="••••••••" className={inputCls} />
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
        {pending ? "Creating account…" : "Create Account"}
      </button>
    </form>
  );
}
