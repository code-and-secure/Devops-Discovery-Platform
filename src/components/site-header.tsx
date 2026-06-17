import Link from "next/link";
import { Compass, Command as GitHubIcon } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { getSession } from "@/lib/auth";
import { UserDropdown } from "@/components/user-dropdown";
import { MobileNav } from "@/components/mobile-nav";

interface SiteHeaderProps {
  activePage?: "explore" | "roadmaps" | "news";
}

export async function SiteHeader({ activePage }: SiteHeaderProps) {
  const user = await getSession();

  const navLink = (href: string, label: string, key: string) => (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors ${
        activePage === key
          ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-0.5"
          : "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl tracking-tighter text-blue-600 dark:text-blue-400 group"
        >
          <Compass className="w-7 h-7 group-hover:rotate-45 transition-transform duration-500" />
          <span>Stack<span className="text-slate-900 dark:text-white">Lens</span></span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLink("/", "Explore", "explore")}
          {navLink("/roadmaps", "Roadmaps", "roadmaps")}
          {navLink("/news", "News", "news")}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://github.com/code-and-secure?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors p-2"
          >
            <GitHubIcon className="w-5 h-5" />
          </a>
          <ThemeToggle />

          {user ? (
            <UserDropdown
              firstName={user.firstName ?? ""}
              lastName={user.lastName ?? ""}
              email={user.email}
            />
          ) : (
            <Link
              href="/login"
              className="hidden sm:block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
            >
              Sign In
            </Link>
          )}

          <MobileNav activePage={activePage} />
        </div>
      </div>
    </header>
  );
}
