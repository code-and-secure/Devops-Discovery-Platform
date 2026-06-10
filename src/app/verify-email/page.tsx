import Link from "next/link";
import { Compass, XCircle, ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";
import { verifyEmailAction } from "@/app/actions";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) redirect("/login");

  const result = await verifyEmailAction(token);

  if (result?.success) {
    redirect("/login?verified=1");
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <header className="px-4 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="container mx-auto max-w-6xl">
          <Link href="/" className="flex items-center gap-2 text-xl font-black text-blue-600 tracking-tight group w-fit">
            <Compass className="w-7 h-7 group-hover:rotate-45 transition-transform duration-500" />
            <span>Stack<span className="text-slate-900 dark:text-white">Lens</span></span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-10">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Verification failed</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
              {result?.message ?? "This verification link is invalid or has expired."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/20 transition-all text-sm"
              >
                Create new account <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold py-3 px-6 rounded-xl transition text-sm"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
