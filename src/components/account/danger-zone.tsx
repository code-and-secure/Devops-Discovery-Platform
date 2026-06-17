"use client";

import { useState, useTransition } from "react";
import { Trash2, LogOut, AlertTriangle, Loader2 } from "lucide-react";
import { signoutAction, deleteAccountAction } from "@/app/actions";

export function AccountDangerZone() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteAccountAction();
    });
  }

  return (
    <section className="bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/50 rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
          <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">Danger Zone</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Irreversible account actions</p>
        </div>
      </div>

      <div className="space-y-3">
        {/* Sign out */}
        <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-sm font-medium text-slate-900 dark:text-white">Sign out</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">End your current session</div>
          </div>
          <form action={signoutAction}>
            <button
              type="submit"
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 px-3.5 py-2 rounded-xl transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>

        {/* Delete account */}
        <div className="flex items-center justify-between py-3">
          <div>
            <div className="text-sm font-medium text-red-600 dark:text-red-400">Delete account</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Permanently remove your account and all data</div>
          </div>
          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 px-3.5 py-2 rounded-xl transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Delete Account</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">This cannot be undone</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
              Are you sure you want to permanently delete your account? All your data — profile, sessions, and settings — will be removed immediately.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isPending}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-60 text-sm font-bold text-white transition-colors"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting…
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Yes, Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
