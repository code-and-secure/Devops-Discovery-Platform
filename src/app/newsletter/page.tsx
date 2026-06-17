import Link from "next/link";
import { Mail, Zap, ArrowLeft, Check } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";
import { SiteHeader } from "@/components/site-header";

const TOPICS = [
  { label: "DevOps & CI/CD", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" },
  { label: "Kubernetes", color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300" },
  { label: "Cloud (AWS / GCP / Azure)", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300" },
  { label: "AI & ML Engineering", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" },
  { label: "Cybersecurity", color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" },
  { label: "Platform Engineering", color: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300" },
];

const PERKS = [
  "Weekly digest of the top resources & news",
  "Curated DevOps, Cloud, and AI articles",
  "New roadmaps and learning paths first",
  "Zero spam — unsubscribe anytime",
];

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-14 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — info */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-blue-200 dark:border-blue-800">
              <Mail className="w-3.5 h-3.5" />
              Weekly Newsletter
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
              The Techmeme for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600">
                Cloud Engineers
              </span>
            </h1>

            <p className="text-slate-500 dark:text-slate-400 mb-8 text-base leading-relaxed">
              Join 50,000+ engineers who get our weekly digest of the best DevOps, Cloud, Kubernetes, and AI resources — hand-picked and curated every week.
            </p>

            {/* Perks */}
            <ul className="space-y-3 mb-8">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>

            {/* Topics */}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Topics covered</p>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((t) => (
                  <span key={t.label} className={`text-xs font-semibold px-3 py-1 rounded-full ${t.color}`}>
                    {t.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-950/50 rounded-2xl flex items-center justify-center mb-6 border border-blue-200 dark:border-blue-800">
              <Zap className="w-7 h-7 text-blue-600 dark:text-blue-400 fill-blue-600 dark:fill-blue-400" />
            </div>

            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-1">Subscribe for free</h2>
            <p className="text-slate-500 text-sm mb-6">No spam. Unsubscribe at any time.</p>

            <NewsletterForm variant="full" />

            <p className="mt-4 text-center text-xs text-slate-400">
              Trusted by 50,000+ engineers at AWS, Google, Microsoft & more.
            </p>
          </div>
        </div>
      </main>

      {/* Back link */}
      <div className="container mx-auto px-4 pb-10 max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to StackLens
        </Link>
      </div>
    </div>
  );
}
