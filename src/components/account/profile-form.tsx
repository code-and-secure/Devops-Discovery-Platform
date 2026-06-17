"use client";

import { useActionState } from "react";
import { updateProfileAction, AuthState } from "@/app/actions";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface ProfileFormProps {
  firstName: string;
  lastName: string;
  email: string;
}

export function AccountProfileForm({ firstName, lastName, email }: ProfileFormProps) {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    updateProfileAction,
    null
  );

  return (
    <form action={formAction} className="space-y-4">
      {state && (
        <div className={`flex items-start gap-2.5 p-3.5 rounded-xl text-sm border ${
          state.success
            ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300"
            : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300"
        }`}>
          {state.success
            ? <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
            : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
          {state.message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            First name <span className="text-red-500">*</span>
          </label>
          <input
            name="firstName"
            defaultValue={firstName}
            type="text"
            placeholder="Jane"
            required
            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Last name
          </label>
          <input
            name="lastName"
            defaultValue={lastName}
            type="text"
            placeholder="Doe"
            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          Email address
        </label>
        <input
          type="email"
          value={email}
          disabled
          className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-500 dark:text-slate-500 cursor-not-allowed"
        />
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Email address cannot be changed.</p>
      </div>

      <div className="flex justify-end pt-1">
        <button
          type="submit"
          disabled={pending}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-lg shadow-blue-500/20"
        >
          {pending && <Loader2 className="w-4 h-4 animate-spin" />}
          {pending ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
