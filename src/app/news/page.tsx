import {
  Compass, ExternalLink, Newspaper, Clock, User, TrendingUp,
  Zap, Flame, Radio,
} from "lucide-react";
import Link from "next/link";
import { fetchMultiSourceNews, type NewsItem } from "@/lib/live-news";
import { TickerBar } from "@/components/ticker-bar";
import { SiteHeader } from "@/components/site-header";

export const dynamic = "force-dynamic";

function timeAgo(ms: number) {
  if (!ms || isNaN(ms)) return "recently";
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all flex flex-col gap-3"
    >
      <div className="flex items-center justify-between gap-2">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.sourceColor}`}>
          {item.source}
        </span>
        <span className="text-[10px] text-slate-400 shrink-0">{timeAgo(item.time)}</span>
      </div>
      <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-3 flex items-start gap-1.5">
        <span>{item.title}</span>
        <ExternalLink className="w-3 h-3 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
      </h3>
      <div className="flex items-center justify-between text-xs text-slate-400 mt-auto">
        <span className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-blue-500" />
          {item.score.toLocaleString()} pts
        </span>
        <span className="flex items-center gap-1 truncate max-w-[130px]">
          <User className="w-3 h-3 shrink-0" />
          <span className="truncate">{item.author}</span>
        </span>
      </div>
    </a>
  );
}

function SourceSection({
  title, icon, desc, items, accentClass,
}: {
  title: string; icon: string; desc: string; items: NewsItem[]; accentClass: string;
}) {
  if (!items.length) return null;
  return (
    <section className="mb-10">
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <span className="text-xl">{icon}</span>
        <div>
          <h2 className={`text-base font-black ${accentClass}`}>{title}</h2>
          <p className="text-xs text-slate-400">{desc}</p>
        </div>
        <span className="ml-auto text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
          {items.length} stories · live
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => <NewsCard key={item.id} item={item} />)}
      </div>
    </section>
  );
}

const SOURCES = [
  { key: "hn",          label: "🔥 Hacker News",  color: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800" },
  { key: "googlenews",  label: "🔍 Google News",   color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800" },
  { key: "techcrunch",  label: "📰 TechCrunch",    color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800" },
  { key: "techmeme",    label: "🧠 Techmeme",      color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800" },
  { key: "arstechnica", label: "🔬 Ars Technica",  color: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800" },
  { key: "infoq",       label: "💡 InfoQ",         color: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800" },
  { key: "theverge",    label: "🌐 The Verge",     color: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800" },
  { key: "slashdot",    label: "⚡ Slashdot",      color: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600" },
  { key: "devto",       label: "✍️ Dev.to",        color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800" },
] as const;

export default async function NewsPage() {
  const { hn, devto, techcrunch, arstechnica, infoq, theverge, googlenews, techmeme, slashdot, all } =
    await fetchMultiSourceNews();

  // Dynamic editor's pick — top scored story from the entire live feed
  const editorsPick = all[0] ?? null;

  const counts: Record<string, number> = {
    hn: hn.length, googlenews: googlenews.length, techcrunch: techcrunch.length,
    techmeme: techmeme.length, arstechnica: arstechnica.length, infoq: infoq.length,
    theverge: theverge.length, slashdot: slashdot.length, devto: devto.length,
  };
  const totalStories = all.length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <SiteHeader activePage="news" />
      <TickerBar />

      <main className="container mx-auto px-4 py-10 max-w-7xl">
        {/* Hero banner */}
        <section className="mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-blue-200 dark:border-blue-800">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            {totalStories} Live Stories — {SOURCES.length} Platforms
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-3 leading-tight">
            What&apos;s happening in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              tech right now
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg mb-5">
            Aggregated in real time from the world&apos;s top tech news platforms.
          </p>

          {/* Source pills */}
          <div className="flex flex-wrap gap-2">
            {SOURCES.map(({ key, label, color }) => (
              counts[key] > 0 && (
                <span key={key} className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${color}`}>
                  {label}
                  <span className="opacity-60">{counts[key]}</span>
                </span>
              )
            ))}
          </div>
        </section>

        {/* Dynamic Editor's Pick — top story from live feed, changes every load */}
        {editorsPick && (
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-500" />
                </span>
                <span className="text-xs font-black uppercase tracking-widest text-yellow-600 dark:text-yellow-400">
                  Editor&apos;s Pick · Trending Now
                </span>
              </div>
              <span className="flex-1 h-px bg-gradient-to-r from-yellow-300/60 to-transparent dark:from-yellow-700/40" />
              <span className="text-[10px] text-slate-400">{timeAgo(editorsPick.time)}</span>
            </div>
            <a
              href={editorsPick.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white rounded-3xl p-7 sm:p-10 shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/20 text-white`}>
                    {editorsPick.source}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-blue-200">
                    <TrendingUp className="w-3 h-3" />
                    {editorsPick.score.toLocaleString()} pts · highest scored right now
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-3 leading-tight group-hover:underline decoration-white/50 underline-offset-4">
                  {editorsPick.title}
                  <ExternalLink className="inline-block ml-2 w-5 h-5 opacity-60" />
                </h2>
                <div className="flex flex-wrap gap-4 text-xs text-blue-200 mt-4">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" />{editorsPick.author}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{timeAgo(editorsPick.time)}</span>
                </div>
              </div>
              {/* Decorative circles */}
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-900/30 rounded-full pointer-events-none" />
            </a>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main feed */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-8">
              <span className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white">
                <Flame className="w-4 h-4 text-orange-500" />
                Live Multi-Source Feed
              </span>
              <span className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
              <span className="text-xs text-slate-400">updates every refresh</span>
            </div>

            <SourceSection title="Hacker News"  icon="🔥" desc="Community-voted top tech stories from engineers worldwide" items={hn}          accentClass="text-orange-600 dark:text-orange-400" />
            <SourceSection title="Google News"  icon="🔍" desc="Top DevOps, cloud & AI stories aggregated from all major publishers" items={googlenews}  accentClass="text-blue-600 dark:text-blue-400" />
            <SourceSection title="TechCrunch"   icon="📰" desc="Breaking news from startups, tech companies, and venture capital" items={techcrunch}  accentClass="text-green-600 dark:text-green-400" />
            <SourceSection title="Techmeme"     icon="🧠" desc="Industry-leading tech news aggregator used by professionals" items={techmeme}    accentClass="text-cyan-600 dark:text-cyan-400" />
            <SourceSection title="Ars Technica" icon="🔬" desc="In-depth tech analysis, science, policy, and engineering" items={arstechnica} accentClass="text-red-600 dark:text-red-400" />
            <SourceSection title="InfoQ"        icon="💡" desc="Software architecture, development practices, and emerging tech" items={infoq}       accentClass="text-violet-600 dark:text-violet-400" />
            <SourceSection title="The Verge"    icon="🌐" desc="Tech culture, product launches, and industry news" items={theverge}    accentClass="text-pink-600 dark:text-pink-400" />
            <SourceSection title="Slashdot"     icon="⚡" desc="Developer-focused: open source, Linux, infrastructure, and security" items={slashdot}    accentClass="text-slate-600 dark:text-slate-400" />
            <SourceSection title="Dev.to"       icon="✍️" desc="Community articles on DevOps, Kubernetes, cloud, and security" items={devto}       accentClass="text-indigo-600 dark:text-indigo-400" />

            {totalStories === 0 && (
              <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
                <Newspaper className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <p className="text-slate-500 italic">Live feeds are loading. Try refreshing in a moment.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Flash card */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-lg shadow-blue-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                <h4 className="font-bold text-sm">StackLens Flash</h4>
              </div>
              <p className="text-sm text-blue-100 mb-4 leading-relaxed">
                Stay ahead — curated DevOps, Cloud &amp; AI stories delivered to your inbox.
              </p>
              <Link href="/newsletter" className="block w-full bg-white text-blue-600 font-bold py-2.5 rounded-xl text-sm hover:bg-blue-50 transition-colors text-center">
                Subscribe to Newsletter
              </Link>
            </div>

            {/* Live source counts */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
              <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-4">Live Sources</h4>
              <ul className="space-y-2.5">
                {SOURCES.map(({ key, label }) =>
                  counts[key] > 0 ? (
                    <li key={key} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
                      <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                        {counts[key]}
                      </span>
                    </li>
                  ) : null
                )}
                <li className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-2.5">
                  <span className="text-sm font-black text-slate-900 dark:text-white">Total</span>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
                    {totalStories}
                  </span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 py-10 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-blue-600 dark:text-blue-400">
            <Compass className="w-6 h-6" />
            <span>Stack<span className="text-slate-900 dark:text-white">Lens</span></span>
          </Link>
          <p className="text-slate-400 text-sm text-center">
            © {new Date().getFullYear()} StackLens News Aggregator. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Explore</Link>
            <Link href="/roadmaps" className="hover:text-blue-600 transition-colors">Roadmaps</Link>
            <Link href="/newsletter" className="hover:text-blue-600 transition-colors">Newsletter</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
