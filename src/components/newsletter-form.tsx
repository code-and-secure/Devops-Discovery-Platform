"use client";

import { useActionState } from "react";
import { subscribeNewsletter } from "@/app/actions";
import { CheckCircle, AlertCircle, Loader } from "lucide-react";

interface NewsletterFormProps {
  /** "banner" = homepage gradient strip (horizontal layout, no name field)
   *  "full"   = /newsletter page (vertical layout, includes name field) */
  variant?: "banner" | "full";
}

const initialState = { success: false, message: "" };

export function NewsletterForm({ variant = "banner" }: NewsletterFormProps) {
  const [state, action, pending] = useActionState(subscribeNewsletter, initialState);

  if (state.success) {
    return (
      <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-4">
        <CheckCircle className="w-6 h-6 text-green-300 shrink-0" />
        <p className="text-sm font-semibold text-white">{state.message}</p>
      </div>
    );
  }

  if (variant === "full") {
    return (
      <form action={action} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            First name
          </label>
          <input
            name="name"
            type="text"
            placeholder="John"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Email address <span className="text-red-500">*</span>
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {state.message && !state.success && (
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {state.message}
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 active:scale-95 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all text-sm flex items-center justify-center gap-2"
        >
          {pending && <Loader className="w-4 h-4 animate-spin" />}
          {pending ? "Subscribing…" : "Subscribe — it's free"}
        </button>
      </form>
    );
  }

  // Banner variant (horizontal, no name field)
  return (
    <form action={action} className="flex flex-col sm:flex-row gap-3">
      <input
        name="email"
        type="email"
        required
        placeholder="engineer@company.com"
        className="flex-grow px-5 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-blue-200 focus:ring-2 focus:ring-white outline-none transition-all text-sm"
      />
      <button
        type="submit"
        disabled={pending}
        className="px-7 py-3.5 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 disabled:opacity-60 transition-all text-sm whitespace-nowrap flex items-center gap-2"
      >
        {pending && <Loader className="w-4 h-4 animate-spin text-blue-600" />}
        {pending ? "Subscribing…" : "Subscribe Free"}
      </button>

      {state.message && !state.success && (
        <p className="text-red-300 text-xs mt-1 sm:hidden">{state.message}</p>
      )}
    </form>
  );
}
