import { db } from "@/db";
import { resources } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

const TYPE_DOT: Record<string, string> = {
  news:          "bg-red-500",
  blog:          "bg-purple-500",
  video:         "bg-rose-500",
  repository:    "bg-slate-400",
  documentation: "bg-green-500",
  course:        "bg-yellow-500",
};

const TYPE_LABEL: Record<string, string> = {
  news:          "NEWS",
  blog:          "BLOG",
  video:         "VIDEO",
  repository:    "REPO",
  documentation: "DOCS",
  course:        "COURSE",
};

async function getDiverseFeed() {
  // Fetch a batch from each type in parallel, then interleave
  const [news, docs, repos, blogs, videos, courses] = await Promise.all([
    db.select({ id: resources.id, title: resources.title, url: resources.url, type: resources.type, platform: resources.platform, category: resources.category })
      .from(resources).where(eq(resources.type, "news")).orderBy(desc(resources.upvotes)).limit(6),

    db.select({ id: resources.id, title: resources.title, url: resources.url, type: resources.type, platform: resources.platform, category: resources.category })
      .from(resources).where(eq(resources.type, "documentation")).orderBy(desc(resources.upvotes)).limit(6),

    db.select({ id: resources.id, title: resources.title, url: resources.url, type: resources.type, platform: resources.platform, category: resources.category })
      .from(resources).where(eq(resources.type, "repository")).orderBy(desc(resources.upvotes)).limit(6),

    db.select({ id: resources.id, title: resources.title, url: resources.url, type: resources.type, platform: resources.platform, category: resources.category })
      .from(resources).where(eq(resources.type, "blog")).orderBy(desc(resources.upvotes)).limit(6),

    db.select({ id: resources.id, title: resources.title, url: resources.url, type: resources.type, platform: resources.platform, category: resources.category })
      .from(resources).where(eq(resources.type, "video")).orderBy(desc(resources.upvotes)).limit(4),

    db.select({ id: resources.id, title: resources.title, url: resources.url, type: resources.type, platform: resources.platform, category: resources.category })
      .from(resources).where(eq(resources.type, "course")).orderBy(desc(resources.upvotes)).limit(4),
  ]);

  // Interleave so the ticker shows variety: news → doc → repo → blog → video → course → repeat
  const maxLen = Math.max(news.length, docs.length, repos.length, blogs.length, videos.length, courses.length);
  const mixed: typeof news = [];

  for (let i = 0; i < maxLen; i++) {
    if (news[i])    mixed.push(news[i]);
    if (docs[i])    mixed.push(docs[i]);
    if (repos[i])   mixed.push(repos[i]);
    if (blogs[i])   mixed.push(blogs[i]);
    if (videos[i])  mixed.push(videos[i]);
    if (courses[i]) mixed.push(courses[i]);
  }

  return mixed.slice(0, 30);
}

export async function TickerBar() {
  const latest = await getDiverseFeed();

  if (latest.length === 0) return null;

  // Duplicate for seamless loop
  const items = [...latest, ...latest];

  return (
    <div className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 overflow-hidden select-none">
      <div className="flex items-stretch h-9 sm:h-10">

        {/* LIVE badge */}
        <div className="shrink-0 flex items-center gap-2 px-3 sm:px-4 bg-red-600 text-white z-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
          <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase hidden sm:block">
            Live
          </span>
        </div>

        {/* Divider */}
        <div className="w-px bg-slate-200 dark:bg-slate-700 shrink-0" />

        {/* Scrolling track */}
        <div className="flex-1 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />

          <div className="animate-ticker flex items-center h-full">
            {items.map((item, i) => (
              <a
                key={`${item.id}-${i}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 group whitespace-nowrap"
              >
                <span className="flex items-center gap-1.5 shrink-0">
                  <span className={`w-1.5 h-1.5 rounded-full ${TYPE_DOT[item.type] ?? "bg-blue-500"}`} />
                  <span className="text-[9px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase hidden sm:block">
                    {TYPE_LABEL[item.type] ?? item.type.toUpperCase()}
                  </span>
                </span>

                <span className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-medium">
                  {item.title}
                </span>

                {item.platform && (
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 hidden md:block">
                    — {item.platform}
                  </span>
                )}

                <span className="text-slate-300 dark:text-slate-600 mx-1 text-sm">·</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right: count badge */}
        <div className="shrink-0 hidden sm:flex items-center px-3 border-l border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold whitespace-nowrap">
            {latest.length} sources
          </span>
        </div>
      </div>
    </div>
  );
}
