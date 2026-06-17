import { db } from "@/db";
import { resources, categories as categoriesTable } from "@/db/schema";
import { ResourceCard } from "@/components/resource-card";
import { Search, Compass, Zap, TrendingUp, Layers, BookOpen, Video, FileText, GitBranch } from "lucide-react";
import { eq, ilike, or, desc } from "drizzle-orm";
import Link from "next/link";
import { searchExternalSources } from "@/lib/aggregator";
import { ensureSeeded } from "@/db/ensure-seeded";
import { syncFreshData } from "@/lib/data-sync";
import { TickerBar } from "@/components/ticker-bar";
import { NewsletterForm } from "@/components/newsletter-form";
import { SiteHeader } from "@/components/site-header";

export const dynamic = "force-dynamic";

const TYPE_FILTERS = [
  { label: "All", value: null, icon: Layers },
  { label: "Courses", value: "course", icon: BookOpen },
  { label: "Videos", value: "video", icon: Video },
  { label: "Docs", value: "documentation", icon: FileText },
  { label: "Repos", value: "repository", icon: GitBranch },
];

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; type?: string }>;
}) {
  const { q: query, category, type } = await searchParams;

  await ensureSeeded();
  syncFreshData(); // fire-and-forget: fetches Dev.to + GitHub in background, doesn't block page
  const categories = await db.select().from(categoriesTable);

  let results;
  let externalResults: any[] = [];
  const baseQuery = db.select().from(resources);

  if (query) {
    results = await baseQuery
      .where(
        or(
          ilike(resources.title, `%${query}%`),
          ilike(resources.description, `%${query}%`),
          ilike(resources.tags, `%${query}%`)
        )
      )
      .orderBy(desc(resources.upvotes));
    if (results.length < 5) externalResults = await searchExternalSources(query);
  } else if (category) {
    results = await baseQuery.where(eq(resources.category, category)).orderBy(desc(resources.upvotes));
  } else if (type) {
    results = await baseQuery.where(eq(resources.type, type)).orderBy(desc(resources.upvotes));
  } else {
    results = await baseQuery.orderBy(desc(resources.upvotes)).limit(20);
  }

  const featured = results.filter((r) => r.isFeatured);
  const others = results.filter((r) => !r.isFeatured);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <SiteHeader activePage="explore" />
      <TickerBar />

      <main className="container mx-auto px-4 py-10 max-w-7xl">
        {/* Hero */}
        <section className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-blue-200 dark:border-blue-800">
            <Zap className="w-3.5 h-3.5 fill-blue-600 dark:fill-blue-400" />
            10,000+ hand-picked resources
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-5 leading-tight tracking-tight">
            Navigate the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600">
              Cloud Universe
            </span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            StackLens is your intelligent companion for DevOps, SecOps, ML, and AI Engineering.
            Search hand-picked resources across the technical ecosystem.
          </p>

          <form action="/" className="relative group max-w-2xl mx-auto flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                name="q"
                defaultValue={query}
                type="text"
                placeholder="Search Kubernetes, Terraform, AI Engineering..."
                className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95 text-sm whitespace-nowrap"
            >
              Search
            </button>
          </form>

          <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-slate-500">
            <span>Trending:</span>
            {["Kubernetes", "LLMOps", "Terraform", "Platform Engineering", "AWS"].map((tag) => (
              <Link key={tag} href={`/?q=${tag}`} className="hover:text-blue-600 transition-colors underline decoration-dotted underline-offset-4">
                {tag}
              </Link>
            ))}
          </div>
        </section>

        {/* Stats strip */}
        {!query && !category && !type && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Resources", value: "10,000+" },
              { label: "Categories", value: String(categories.length) },
              { label: "Platforms", value: "50+" },
              { label: "Engineers", value: "50K+" },
            ].map((s) => (
              <div key={s.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-center shadow-sm">
                <p className="text-2xl font-black text-blue-600 dark:text-blue-400">{s.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Type filter pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {TYPE_FILTERS.map(({ label, value, icon: Icon }) => {
            const active = value === null ? !type : type === value;
            return (
              <Link
                key={label}
                href={value ? `/?type=${value}` : "/"}
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  active
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-400"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Link>
            );
          })}
        </div>

        {/* Category bar */}
        <div className="relative mb-10">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none md:hidden" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none md:hidden" />
          <div className="flex overflow-x-auto pb-3 pt-1 gap-2 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
            <Link
              href="/"
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold border transition-all active:scale-95 ${
                !category && !type && !query
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-md"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              All Resources
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/?category=${cat.name}`}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold border transition-all active:scale-95 ${
                  category === cat.name
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Featured */}
        {!query && !category && featured.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-5">
              <span className="flex items-center gap-1.5 bg-yellow-50 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-400 text-xs font-bold px-3 py-1 rounded-full border border-yellow-200 dark:border-yellow-800">
                <Zap className="w-3.5 h-3.5 fill-yellow-500" />
                Featured Hand-Picked
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((res) => (
                <ResourceCard key={res.id} resource={res} />
              ))}
            </div>
          </section>
        )}

        {/* Results */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                {query
                  ? `Results for "${query}"`
                  : category
                  ? `${category} Resources`
                  : type
                  ? `${type.charAt(0).toUpperCase() + type.slice(1)}s`
                  : "Popular Resources"}
              </h2>
            </div>
            {results && (
              <span className="text-xs text-slate-400 font-medium">
                {results.length} result{results.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {others.length > 0 || externalResults.length > 0 ? (
            <div className="space-y-12">
              {others.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {others.map((res) => (
                    <ResourceCard key={res.id} resource={res} />
                  ))}
                </div>
              )}

              {externalResults.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <span className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 text-xs font-bold px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
                      <Compass className="w-3.5 h-3.5" />
                      Discovered from the web
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 opacity-90">
                    {externalResults.map((res, i) => (
                      <ResourceCard key={`ext-${i}`} resource={res} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
              <p className="text-slate-500">No resources found. Try another keyword!</p>
            </div>
          )}
        </section>

        {/* Newsletter */}
        {!query && !category && !type && (
          <section className="mt-20 mb-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-blue-500/20">
            <div className="relative z-10 max-w-2xl">
              <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-2">Newsletter</p>
              <h2 className="text-3xl font-black mb-3">The Techmeme for Cloud Engineers</h2>
              <p className="text-blue-100 mb-8">
                Join 50,000+ engineers who get the daily pulse of DevOps, Kubernetes, AWS, and AI.
              </p>
              <NewsletterForm variant="banner" />
            </div>
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-40" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-700 rounded-full blur-3xl opacity-40" />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-12 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter text-blue-600 dark:text-blue-400 mb-3">
              <Compass className="w-7 h-7" />
              <span>Stack<span className="text-slate-900 dark:text-white">Lens</span></span>
            </Link>
            <p className="text-slate-500 text-sm max-w-sm">
              The ultimate discovery platform for DevOps, SecOps, ML, and AI teams. Stay ahead of the curve.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Explore</h4>
            <ul className="space-y-2 text-slate-500 text-sm">
              <li><Link href="/news" className="hover:text-blue-600 transition-colors">Latest Tech News</Link></li>
              <li><Link href="/?category=Kubernetes" className="hover:text-blue-600 transition-colors">Kubernetes</Link></li>
              <li><Link href="/?category=DevOps" className="hover:text-blue-600 transition-colors">Terraform / IaC</Link></li>
              <li><Link href="/?category=AI Engineering" className="hover:text-blue-600 transition-colors">MLOps & LLMOps</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Community</h4>
            <ul className="space-y-2 text-slate-500 text-sm">
              <li><Link href="/submit" className="hover:text-blue-600 transition-colors">Submit Resource</Link></li>
              <li><a href="https://github.com/code-and-secure?tab=repositories" target="_blank" className="hover:text-blue-600 transition-colors">Contribute</a></li>
              <li><Link href="/discord" className="hover:text-blue-600 transition-colors">Discord</Link></li>
              <li><Link href="/newsletter" className="hover:text-blue-600 transition-colors">Newsletter</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 max-w-7xl mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 text-center text-slate-400 text-sm">
          © {new Date().getFullYear()} StackLens. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
