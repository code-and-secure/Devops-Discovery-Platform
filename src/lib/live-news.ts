export interface NewsItem {
  id: string;
  title: string;
  url: string;
  score: number;
  author: string;
  time: number; // unix ms
  source: string;
  sourceColor: string;
  tag?: string;
}

// ── RSS parser (no packages) ──────────────────────────────────────────────────
function extractField(chunk: string, tag: string): string {
  const cdata = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`).exec(chunk);
  if (cdata) return cdata[1].trim();
  const plain = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`).exec(chunk);
  if (plain) return plain[1].replace(/<[^>]+>/g, "").trim();
  return "";
}

function parseRSS(xml: string, sourceId: string, limit = 12): Array<{
  title: string; url: string; description: string; pubDate: string; author: string;
}> {
  const results: ReturnType<typeof parseRSS> = [];
  const isAtom = xml.includes("<entry>");
  const pattern = isAtom ? /<entry>([\s\S]*?)<\/entry>/g : /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = pattern.exec(xml)) !== null && results.length < limit) {
    const chunk = match[1];
    const title = extractField(chunk, "title");
    let url = "";
    if (isAtom) {
      url = /<link[^>]+href="([^"]+)"/.exec(chunk)?.[1] ?? extractField(chunk, "link");
    } else {
      const linkPlain = /<link>([^<\s][^<]*)<\/link>/.exec(chunk)?.[1]?.trim();
      const linkAlt = /<link\s+[^>]*href="([^"]+)"/.exec(chunk)?.[1];
      const guid = /<guid[^>]*isPermaLink="true"[^>]*>([^<]+)<\/guid>/.exec(chunk)?.[1]?.trim();
      url = linkPlain ?? linkAlt ?? guid ?? extractField(chunk, "guid") ?? "";
    }
    const description = extractField(chunk, "description") || extractField(chunk, "summary") || extractField(chunk, "content");
    const pubDate = extractField(chunk, "pubDate") || extractField(chunk, "published") || extractField(chunk, "updated") || extractField(chunk, "dc:date");
    const author = extractField(chunk, "author") || extractField(chunk, "dc:creator") || extractField(chunk, "source") || sourceId;

    if (title && url?.startsWith("http")) {
      results.push({ title, url, description: description.slice(0, 200), pubDate, author });
    }
  }
  return results;
}

async function fetchRSS(
  feedUrl: string,
  sourceId: string,
  sourceName: string,
  sourceColor: string,
  limit = 10,
  techFilter = false,
  stripSourceSuffix = false,
): Promise<NewsItem[]> {
  try {
    const res = await fetch(feedUrl, {
      headers: {
        "User-Agent": "StackLens/1.0 (tech news aggregator)",
        "Accept": "application/rss+xml, application/atom+xml, application/xml, text/xml, */*",
      },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = parseRSS(xml, sourceId, limit);

    const TECH_KW = [
      "cloud","devops","kubernetes","docker","ai","llm","security","open source",
      "linux","github","terraform","aws","azure","gcp","api","software","developer",
      "engineering","platform","infrastructure","monitoring","container","serverless",
      "cicd","ml","python","rust","go","microservice","observability","k8s",
    ];

    return items
      .filter(({ title }) => !techFilter || TECH_KW.some((kw) => title.toLowerCase().includes(kw)))
      .map((item, i) => {
        // Google News appends "- Source Name" — strip it for cleaner titles
        const cleanTitle = stripSourceSuffix
          ? item.title.replace(/\s[-–]\s[^-–]+$/, "").trim()
          : item.title;
        return {
          id: `${sourceId}-${i}-${Buffer.from(item.url).toString("base64").slice(-10)}`,
          title: cleanTitle,
          url: item.url,
          score: Math.max(0, limit - i),
          author: item.author.length > 50 ? item.author.slice(0, 50) : item.author,
          time: item.pubDate ? new Date(item.pubDate).getTime() || Date.now() - i * 3_600_000 : Date.now() - i * 3_600_000,
          source: sourceName,
          sourceColor,
          tag: undefined,
        };
      });
  } catch {
    return [];
  }
}

// ── Hacker News ───────────────────────────────────────────────────────────────
const TECH_KEYWORDS = [
  "kubernetes","docker","devops","cloud","aws","gcp","azure","terraform","linux",
  "security","ai","ml","llm","platform","cicd","sre","microservice","container",
  "serverless","openai","github","python","rust","go","monitoring","grafana",
  "prometheus","observability","k8s","helm","gitops","open source","infrastructure",
];

async function fetchHN(limit = 15): Promise<NewsItem[]> {
  try {
    const idsRes = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json", { cache: "no-store" });
    if (!idsRes.ok) return [];
    const ids: number[] = await idsRes.json();
    const stories = await Promise.all(
      ids.slice(0, 100).map((id) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, { cache: "no-store" })
          .then((r) => r.json()).catch(() => null)
      )
    );
    return stories
      .filter((s) => s && s.title && s.url && TECH_KEYWORDS.some((kw) => s.title.toLowerCase().includes(kw)))
      .slice(0, limit)
      .map((s) => ({
        id: `hn-${s.id}`,
        title: s.title,
        url: s.url,
        score: s.score ?? 0,
        author: s.by ?? "unknown",
        time: (s.time ?? 0) * 1000,
        source: "Hacker News",
        sourceColor: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
      }));
  } catch {
    return [];
  }
}

// ── Dev.to ─────────────────────────────────────────────────────────────────────
async function fetchDevToLive(limit = 12): Promise<NewsItem[]> {
  const tags = ["devops", "kubernetes", "docker", "aws", "security", "mlops", "cloudnative"];
  const results: NewsItem[] = [];
  const seen = new Set<string>();
  for (const tag of tags) {
    try {
      const res = await fetch(`https://dev.to/api/articles?tag=${tag}&per_page=5&top=3`, { cache: "no-store" });
      if (!res.ok) continue;
      const articles = await res.json();
      if (!Array.isArray(articles)) continue;
      for (const a of articles) {
        if (!a.url || !a.title || seen.has(`devto-${a.id}`)) continue;
        seen.add(`devto-${a.id}`);
        results.push({
          id: `devto-${a.id}`,
          title: a.title,
          url: a.url,
          score: a.positive_reactions_count ?? 0,
          author: a.user?.name ?? "dev.to",
          time: new Date(a.published_at).getTime(),
          source: "Dev.to",
          sourceColor: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300",
          tag,
        });
      }
    } catch { /* skip */ }
  }
  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}

// ── Exported combined fetch ────────────────────────────────────────────────────
export type SourceKey = "hn" | "devto" | "techcrunch" | "arstechnica" | "infoq" | "theverge" | "googlenews" | "techmeme" | "slashdot";

export async function fetchMultiSourceNews(): Promise<
  Record<SourceKey, NewsItem[]> & { all: NewsItem[] }
> {
  const [hn, devto, techcrunch, arstechnica, infoq, theverge, googlenews, techmeme, slashdot] =
    await Promise.all([
      fetchHN(15),
      fetchDevToLive(12),
      fetchRSS(
        "https://techcrunch.com/feed/",
        "tc", "TechCrunch",
        "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
        12, false
      ),
      fetchRSS(
        "https://feeds.arstechnica.com/arstechnica/technology-lab",
        "ars", "Ars Technica",
        "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
        10, false
      ),
      fetchRSS(
        "https://feed.infoq.com/",
        "infoq", "InfoQ",
        "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300",
        10, false
      ),
      fetchRSS(
        "https://www.theverge.com/rss/index.xml",
        "verge", "The Verge",
        "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300",
        12, true
      ),
      fetchRSS(
        "https://news.google.com/rss/search?q=devops+OR+kubernetes+OR+cloud+technology+OR+ai+engineering&hl=en-US&gl=US&ceid=US:en",
        "gnews", "Google News",
        "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
        12, false, true // strip "- Source" suffix from titles
      ),
      fetchRSS(
        "https://www.techmeme.com/feed.xml",
        "tmeme", "Techmeme",
        "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300",
        10, true
      ),
      fetchRSS(
        "https://rss.slashdot.org/Slashdot/slashdotMain",
        "slash", "Slashdot",
        "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300",
        10, true
      ),
    ]);

  const seen = new Set<string>();
  const all = [
    ...hn, ...googlenews, ...techcrunch, ...techmeme, ...arstechnica,
    ...infoq, ...theverge, ...slashdot, ...devto,
  ]
    .filter((r) => { if (seen.has(r.id)) return false; seen.add(r.id); return true; })
    .sort((a, b) => b.score - a.score);

  return { hn, devto, techcrunch, arstechnica, infoq, theverge, googlenews, techmeme, slashdot, all };
}

// Legacy export
export type HNStory = { id: number; title: string; url: string; score: number; by: string; time: number; descendants: number };
export async function fetchHNTopStories(limit = 12): Promise<HNStory[]> {
  const items = await fetchHN(limit);
  return items.map((i) => ({
    id: parseInt(i.id.replace("hn-", "")),
    title: i.title, url: i.url, score: i.score,
    by: i.author, time: i.time / 1000, descendants: 0,
  }));
}
