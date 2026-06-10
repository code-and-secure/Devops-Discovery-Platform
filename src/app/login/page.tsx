import Link from "next/link";
import { Compass, CheckCircle } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SigninForm } from "@/components/auth/signin-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ verified?: string }>;
}) {
  const { verified } = await searchParams;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <header className="px-4 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="container mx-auto max-w-6xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-black text-blue-600 tracking-tight group">
            <Compass className="w-7 h-7 group-hover:rotate-45 transition-transform duration-500" />
            <span>Stack<span className="text-slate-900 dark:text-white">Lens</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <p className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-blue-600 font-semibold hover:underline">Sign Up</Link>
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {verified === "1" && (
            <div className="mb-4 flex items-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl px-4 py-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
              <p className="text-sm font-medium text-green-700 dark:text-green-300">
                Email verified! Sign in to access your account.
              </p>
            </div>
          )}

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10">
            <div className="mb-8 text-center">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">Welcome back</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Sign in to your StackLens account</p>
            </div>

            <SigninForm />

            <div className="mt-6 flex items-center gap-3">
              <span className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
              <span className="text-xs text-slate-400 font-medium">or continue with</span>
              <span className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            </div>

            <a
              href="https://github.com/code-and-secure?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 w-full flex items-center justify-center gap-3 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold py-3 rounded-xl transition text-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.165c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23A11.5 11.5 0 0 1 12 6.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.625-5.475 5.92.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
