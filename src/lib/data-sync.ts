import { db } from "@/db";
import { resources } from "@/db/schema";

// In-memory gate: sync at most once per 10 minutes per server process
let lastSyncedAt = 0;
const SYNC_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

const DEVTO_TAGS = [
  "devops", "kubernetes", "docker", "monitoring", "aws", "terraform",
  "linux", "security", "mlops", "platformengineering", "cicd", "sre",
  "grafana", "prometheus", "observability", "cloudnative",
];

const CATEGORY_MAP: Record<string, string> = {
  devops: "DevOps",
  kubernetes: "Kubernetes",
  docker: "DevOps",
  monitoring: "Monitoring",
  aws: "Cloud Computing",
  terraform: "DevOps",
  linux: "Linux",
  security: "Cybersecurity",
  mlops: "AI Engineering",
  platformengineering: "Platform Engineering",
  cicd: "CI/CD",
  sre: "SRE",
  grafana: "Monitoring",
  prometheus: "Monitoring",
  observability: "Monitoring",
  cloudnative: "Cloud Computing",
};

async function syncDevTo() {
  const inserted: string[] = [];

  for (const tag of DEVTO_TAGS) {
    try {
      const res = await fetch(
        `https://dev.to/api/articles?tag=${tag}&per_page=6&top=7`,
        { cache: "no-store" }
      );
      if (!res.ok) continue;

      const articles = await res.json();
      if (!Array.isArray(articles)) continue;

      for (const a of articles) {
        if (!a.url || !a.title) continue;
        await db
          .insert(resources)
          .values({
            title: a.title,
            description: a.description ?? `A Dev.to article about ${tag}.`,
            url: a.url,
            type: "blog",
            category: CATEGORY_MAP[tag] ?? "DevOps",
            platform: "Dev.to",
            tags: `${tag},devto,community`,
            upvotes: a.positive_reactions_count ?? 0,
            isFree: true,
            rating: 4,
            author: a.user?.name ?? null,
          })
          .onConflictDoNothing();
        inserted.push(a.url);
      }
    } catch {
      // skip tag on error
    }
  }

  return inserted.length;
}

async function syncGitHub() {
  const queries = [
    "devops+tools",
    "kubernetes+operator",
    "monitoring+observability",
    "infrastructure+as+code",
    "cloud+native",
    "platform+engineering",
    "grafana+dashboard",
    "prometheus+exporter",
  ];

  let count = 0;

  for (const q of queries) {
    try {
      const res = await fetch(
        `https://api.github.com/search/repositories?q=${q}&sort=stars&order=desc&per_page=5`,
        {
          headers: { Accept: "application/vnd.github.v3+json" },
          cache: "no-store",
        }
      );
      if (!res.ok) continue;

      const data = await res.json();
      if (!data.items?.length) continue;

      for (const repo of data.items.slice(0, 3)) {
        if (!repo.html_url || !repo.full_name) continue;

        // Determine category from query keyword
        let category = "DevOps";
        if (q.includes("kubernetes")) category = "Kubernetes";
        else if (q.includes("monitoring") || q.includes("grafana") || q.includes("prometheus")) category = "Monitoring";
        else if (q.includes("platform")) category = "Platform Engineering";
        else if (q.includes("cloud")) category = "Cloud Computing";

        await db
          .insert(resources)
          .values({
            title: repo.full_name,
            description:
              repo.description ??
              `An open-source GitHub repository with ${repo.stargazers_count.toLocaleString()} stars.`,
            url: repo.html_url,
            type: "repository",
            category,
            platform: "GitHub",
            tags: (repo.topics ?? []).slice(0, 5).join(",") || q.replace(/\+/g, ","),
            upvotes: repo.stargazers_count,
            isFree: true,
            rating: repo.stargazers_count > 5000 ? 5 : 4,
          })
          .onConflictDoNothing();
        count++;
      }
    } catch {
      // skip query on error
    }
  }

  return count;
}

export async function syncFreshData() {
  const now = Date.now();
  if (now - lastSyncedAt < SYNC_INTERVAL_MS) return; // already synced recently
  lastSyncedAt = now;

  // Run both syncs in parallel, don't block the page if they fail
  Promise.allSettled([syncDevTo(), syncGitHub()]).catch(() => {});
}
