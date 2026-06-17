import Link from "next/link";
import {
  Compass, Search, ExternalLink, Map,
  TrendingUp, BookOpen, Star, Clock, ChevronRight, Zap, Users,
} from "lucide-react";
import { TickerBar } from "@/components/ticker-bar";
import { SiteHeader } from "@/components/site-header";

export const dynamic = "force-dynamic";

// ── Stack data ─────────────────────────────────────────────────────────────────
const STACKS = [
  // DevOps & Cloud
  { name: "DevOps",            cat: "devops",    level: "Intermediate", months: "6–12", icon: "⚙️",  skills: ["CI/CD","Docker","K8s","Terraform","Monitoring"],           url: "https://roadmap.sh/devops",                color: "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30",       badge: "bg-blue-600",    accent: "text-blue-600 dark:text-blue-400" },
  { name: "Kubernetes",        cat: "devops",    level: "Advanced",     months: "4–8",  icon: "☸️",  skills: ["Pods","Helm","Operators","RBAC","Networking"],              url: "https://roadmap.sh/kubernetes",            color: "border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/30", badge: "bg-indigo-600",  accent: "text-indigo-600 dark:text-indigo-400" },
  { name: "Docker",            cat: "devops",    level: "Beginner",     months: "1–3",  icon: "🐳",  skills: ["Images","Volumes","Compose","Networking","Registry"],       url: "https://roadmap.sh/docker",                color: "border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30",           badge: "bg-sky-600",     accent: "text-sky-600 dark:text-sky-400" },
  { name: "AWS",               cat: "devops",    level: "Intermediate", months: "6–10", icon: "☁️",  skills: ["EC2","S3","Lambda","EKS","IAM","RDS"],                     url: "https://roadmap.sh/aws",                   color: "border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/30", badge: "bg-orange-600",  accent: "text-orange-600 dark:text-orange-400" },
  { name: "Azure",             cat: "devops",    level: "Intermediate", months: "6–10", icon: "🔷",  skills: ["AKS","DevOps","Functions","Blob","AD"],                     url: "https://learn.microsoft.com/azure",        color: "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30",       badge: "bg-blue-700",    accent: "text-blue-700 dark:text-blue-300" },
  { name: "Google Cloud",      cat: "devops",    level: "Intermediate", months: "5–9",  icon: "🌩️",  skills: ["GKE","BigQuery","Cloud Run","Pub/Sub","IAM"],               url: "https://cloud.google.com/training",        color: "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30",           badge: "bg-red-500",     accent: "text-red-600 dark:text-red-400" },
  { name: "Terraform / IaC",   cat: "devops",    level: "Intermediate", months: "2–5",  icon: "🏗️",  skills: ["Modules","State","Providers","Pulumi","CDK"],               url: "https://roadmap.sh/terraform",             color: "border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/30", badge: "bg-violet-600",  accent: "text-violet-600 dark:text-violet-400" },
  { name: "Linux / SRE",       cat: "devops",    level: "Intermediate", months: "4–8",  icon: "🐧",  skills: ["Shell","Systemd","Networking","Observability","SRE"],       url: "https://roadmap.sh/linux",                 color: "border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/60",  badge: "bg-slate-600",   accent: "text-slate-600 dark:text-slate-400" },
  { name: "CI/CD",             cat: "devops",    level: "Beginner",     months: "1–3",  icon: "🔄",  skills: ["GitHub Actions","Jenkins","GitLab","ArgoCD","Tekton"],      url: "https://roadmap.sh/devops",                color: "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30",   badge: "bg-green-600",   accent: "text-green-600 dark:text-green-400" },
  { name: "Ansible",           cat: "devops",    level: "Beginner",     months: "1–3",  icon: "📋",  skills: ["Playbooks","Roles","Inventory","Vault","AWX"],              url: "https://www.ansible.com/resources",        color: "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30",           badge: "bg-red-600",     accent: "text-red-600 dark:text-red-400" },
  { name: "Platform Eng.",     cat: "devops",    level: "Advanced",     months: "6–12", icon: "🧱",  skills: ["Backstage","IDPs","Golden Paths","APIs","Self-service"],    url: "https://platformengineering.org/roadmaps", color: "border-pink-200 dark:border-pink-800 bg-pink-50 dark:bg-pink-950/30",       badge: "bg-pink-600",    accent: "text-pink-600 dark:text-pink-400" },
  { name: "Monitoring",        cat: "devops",    level: "Intermediate", months: "2–4",  icon: "📊",  skills: ["Prometheus","Grafana","Loki","OpenTelemetry","Jaeger"],     url: "https://grafana.com/tutorials",            color: "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/30", badge: "bg-yellow-600",  accent: "text-yellow-600 dark:text-yellow-400" },
  // AI & ML
  { name: "AI / ML",           cat: "ai",        level: "Advanced",     months: "8–18", icon: "🤖",  skills: ["PyTorch","Scikit-learn","MLflow","Feature Eng.","LLMs"],   url: "https://roadmap.sh/ai-data-scientist",     color: "border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/30", badge: "bg-purple-600",  accent: "text-purple-600 dark:text-purple-400" },
  { name: "MLOps",             cat: "ai",        level: "Advanced",     months: "4–8",  icon: "🔬",  skills: ["MLflow","Kubeflow","DVC","Seldon","Feature Store"],          url: "https://roadmap.sh/mlops",                 color: "border-fuchsia-200 dark:border-fuchsia-800 bg-fuchsia-50 dark:bg-fuchsia-950/30", badge: "bg-fuchsia-600", accent: "text-fuchsia-600 dark:text-fuchsia-400" },
  { name: "Data Science",      cat: "ai",        level: "Intermediate", months: "6–12", icon: "📈",  skills: ["Pandas","NumPy","SQL","Visualization","Statistics"],        url: "https://roadmap.sh/ai-data-scientist",     color: "border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/30",       badge: "bg-teal-600",    accent: "text-teal-600 dark:text-teal-400" },
  { name: "LLM Engineering",   cat: "ai",        level: "Advanced",     months: "3–6",  icon: "💬",  skills: ["RAG","Embeddings","LangChain","Fine-tuning","Agents"],      url: "https://roadmap.sh/ai-engineer",           color: "border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30",       badge: "bg-rose-600",    accent: "text-rose-600 dark:text-rose-400" },
  // Backend
  { name: "Python",            cat: "backend",   level: "Beginner",     months: "3–8",  icon: "🐍",  skills: ["FastAPI","Django","Async","Testing","Packaging"],           url: "https://roadmap.sh/python",                color: "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/30", badge: "bg-yellow-500",  accent: "text-yellow-600 dark:text-yellow-400" },
  { name: "Java",              cat: "backend",   level: "Intermediate", months: "6–12", icon: "☕",  skills: ["Spring Boot","Microservices","JVM","Maven","Hibernate"],    url: "https://roadmap.sh/java",                  color: "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30",           badge: "bg-red-600",     accent: "text-red-600 dark:text-red-400" },
  { name: "Go (Golang)",       cat: "backend",   level: "Intermediate", months: "3–8",  icon: "🏎️",  skills: ["Goroutines","gRPC","CLI","Cloud-native","Testing"],          url: "https://roadmap.sh/golang",                color: "border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/30",       badge: "bg-teal-600",    accent: "text-teal-600 dark:text-teal-400" },
  { name: "Rust",              cat: "backend",   level: "Advanced",     months: "6–12", icon: "⚙️",  skills: ["Ownership","Async","WebAssembly","Systems","Cargo"],        url: "https://roadmap.sh/rust",                  color: "border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/30", badge: "bg-orange-700",  accent: "text-orange-700 dark:text-orange-300" },
  { name: "Node.js",           cat: "backend",   level: "Intermediate", months: "4–8",  icon: "💚",  skills: ["Express","NestJS","REST","WebSockets","npm"],               url: "https://roadmap.sh/nodejs",                color: "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30",   badge: "bg-green-600",   accent: "text-green-600 dark:text-green-400" },
  { name: "System Design",     cat: "backend",   level: "Advanced",     months: "3–6",  icon: "🏛️",  skills: ["Scalability","CAP Theorem","Caching","Load Balancing","DB"], url: "https://roadmap.sh/system-design",        color: "border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/60",  badge: "bg-slate-700",   accent: "text-slate-700 dark:text-slate-300" },
  { name: "PostgreSQL",        cat: "backend",   level: "Intermediate", months: "2–5",  icon: "🐘",  skills: ["Indexing","JSONB","Replication","PgAdmin","Performance"],   url: "https://roadmap.sh/postgresql-dba",        color: "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30",       badge: "bg-blue-800",    accent: "text-blue-800 dark:text-blue-300" },
  // Frontend
  { name: "React",             cat: "frontend",  level: "Intermediate", months: "3–6",  icon: "⚛️",  skills: ["Hooks","Context","Next.js","State Mgmt","Testing"],         url: "https://roadmap.sh/react",                 color: "border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/30",       badge: "bg-cyan-600",    accent: "text-cyan-600 dark:text-cyan-400" },
  { name: "TypeScript",        cat: "frontend",  level: "Beginner",     months: "1–3",  icon: "🔷",  skills: ["Types","Generics","Decorators","Utility Types","Config"],   url: "https://roadmap.sh/typescript",            color: "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30",       badge: "bg-blue-500",    accent: "text-blue-500 dark:text-blue-400" },
  { name: "Frontend",          cat: "frontend",  level: "Beginner",     months: "4–8",  icon: "🎨",  skills: ["HTML","CSS","JS","Accessibility","Performance","Tooling"],  url: "https://roadmap.sh/frontend",              color: "border-pink-200 dark:border-pink-800 bg-pink-50 dark:bg-pink-950/30",       badge: "bg-pink-500",    accent: "text-pink-500 dark:text-pink-400" },
  { name: "Vue.js",            cat: "frontend",  level: "Beginner",     months: "2–5",  icon: "💚",  skills: ["Composition API","Pinia","Nuxt","Vite","Testing"],           url: "https://roadmap.sh/vue",                   color: "border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30", badge: "bg-emerald-600", accent: "text-emerald-600 dark:text-emerald-400" },
  // Security
  { name: "Cybersecurity",     cat: "security",  level: "Intermediate", months: "6–12", icon: "🔒",  skills: ["SIEM","Pentesting","Threat Modelling","OWASP","Compliance"], url: "https://roadmap.sh/cyber-security",        color: "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30",   badge: "bg-green-700",   accent: "text-green-700 dark:text-green-300" },
  { name: "DevSecOps",         cat: "security",  level: "Advanced",     months: "4–8",  icon: "🛡️",  skills: ["SAST","DAST","Secret Scanning","Policy as Code","ZAP"],     url: "https://roadmap.sh/devops",                color: "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30",           badge: "bg-red-700",     accent: "text-red-700 dark:text-red-300" },
  // Mobile
  { name: "Flutter",           cat: "mobile",    level: "Beginner",     months: "3–6",  icon: "💙",  skills: ["Dart","Widgets","State","Firebase","Platform Channels"],    url: "https://roadmap.sh/flutter",               color: "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30",       badge: "bg-blue-400",    accent: "text-blue-400 dark:text-blue-300" },
  { name: "Android",           cat: "mobile",    level: "Intermediate", months: "5–10", icon: "🤖",  skills: ["Kotlin","Jetpack Compose","Room","Coroutines","Gradle"],    url: "https://roadmap.sh/android",               color: "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30",   badge: "bg-green-500",   accent: "text-green-500 dark:text-green-400" },
] as const;

const CATEGORIES = [
  { key: "all",      label: "All Roadmaps", icon: "🗺️" },
  { key: "devops",   label: "DevOps & Cloud", icon: "☁️" },
  { key: "ai",       label: "AI & ML", icon: "🤖" },
  { key: "backend",  label: "Backend", icon: "⚙️" },
  { key: "frontend", label: "Frontend", icon: "🎨" },
  { key: "security", label: "Security", icon: "🔒" },
  { key: "mobile",   label: "Mobile", icon: "📱" },
] as const;

type Category = typeof CATEGORIES[number]["key"];

const LEVEL_COLORS: Record<string, string> = {
  Beginner:     "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
  Intermediate: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
  Advanced:     "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
};

// ── Slug map for search ────────────────────────────────────────────────────────
const ROADMAP_SLUGS: Record<string, string> = {
  devops: "devops", "dev-ops": "devops",
  kubernetes: "kubernetes", k8s: "kubernetes",
  docker: "docker",
  python: "python",
  java: "java",
  golang: "golang", go: "golang",
  rust: "rust",
  terraform: "terraform", iac: "terraform",
  aws: "aws", "amazon web services": "aws",
  frontend: "frontend", "front-end": "frontend",
  backend: "backend", "back-end": "backend",
  fullstack: "full-stack", "full stack": "full-stack",
  react: "react",
  vue: "vue",
  angular: "angular",
  nodejs: "nodejs", node: "nodejs", "node.js": "nodejs",
  typescript: "typescript", ts: "typescript",
  linux: "linux",
  cybersecurity: "cyber-security", security: "cyber-security", "cyber security": "cyber-security",
  ai: "ai-data-scientist", ml: "ai-data-scientist", "machine learning": "ai-data-scientist",
  android: "android",
  flutter: "flutter",
  mongodb: "mongodb",
  postgresql: "postgresql-dba", postgres: "postgresql-dba",
  graphql: "graphql",
  "system design": "system-design", "system-design": "system-design",
  blockchain: "blockchain",
  sre: "sre",
  "platform engineering": "platform-engineering",
  git: "git-github", github: "git-github",
  mlops: "mlops",
  "data analyst": "data-analyst",
  "software design": "software-design-architecture",
  "llm": "ai-engineer", "llm engineering": "ai-engineer",
  "devsecops": "devops",
};

function getRoadmapUrl(query: string) {
  const slug = ROADMAP_SLUGS[query.toLowerCase().trim()];
  return slug ? `https://roadmap.sh/${slug}` : "https://roadmap.sh/roadmaps";
}

// ── Live resource fetcher ──────────────────────────────────────────────────────
async function fetchLiveResources(query: string) {
  const q = encodeURIComponent(query);
  const tag = query.toLowerCase().replace(/[^a-z0-9]/g, "");

  const [ghRes, devtoRes, fccRes] = await Promise.allSettled([
    fetch(`https://api.github.com/search/repositories?q=${q}+roadmap+learning-path&sort=stars&order=desc&per_page=6`,
      { headers: { Accept: "application/vnd.github.v3+json" }, cache: "no-store" }
    ).then((r) => r.ok ? r.json() : { items: [] }),

    fetch(`https://dev.to/api/articles?tag=${tag}&per_page=8&top=30`, { cache: "no-store" })
      .then((r) => r.ok ? r.json() : []),

    fetch(`https://www.freecodecamp.org/news/rss/`, { cache: "no-store", headers: { "User-Agent": "StackLens/1.0" } })
      .then((r) => r.ok ? r.text() : ""),
  ]);

  const results: { title: string; description: string; url: string; platform: string; type: string; stars: number; icon: string }[] = [];

  // 1. roadmap.sh (always first)
  results.push({
    title: `${query.charAt(0).toUpperCase() + query.slice(1)} — Official Roadmap`,
    description: `Step-by-step visual learning path covering all skills, tools, and concepts for ${query}.`,
    url: getRoadmapUrl(query), platform: "roadmap.sh", type: "roadmap", stars: 0, icon: "🗺️",
  });

  // 2. YouTube (always works)
  results.push({
    title: `${query} Full Course & Tutorials`,
    description: `Browse thousands of free ${query} courses, tutorials and roadmap walkthroughs.`,
    url: `https://www.youtube.com/results?search_query=${q}+roadmap+full+course`, platform: "YouTube", type: "video", stars: 0, icon: "▶️",
  });

  // 3. freeCodeCamp search
  results.push({
    title: `Learn ${query} — freeCodeCamp`,
    description: `Free, project-based ${query} courses and certifications with no ads.`,
    url: `https://www.freecodecamp.org/news/search/?query=${q}`, platform: "freeCodeCamp", type: "course", stars: 0, icon: "🎓",
  });

  // 4. GitHub repos
  if (ghRes.status === "fulfilled" && ghRes.value.items?.length) {
    for (const repo of ghRes.value.items.slice(0, 4)) {
      results.push({
        title: repo.full_name,
        description: repo.description ?? `Open-source repository with ${repo.stargazers_count.toLocaleString()} ⭐`,
        url: repo.html_url, platform: "GitHub", type: "repository", stars: repo.stargazers_count, icon: "⭐",
      });
    }
  }

  // 5. Dev.to articles
  if (devtoRes.status === "fulfilled" && Array.isArray(devtoRes.value)) {
    for (const a of devtoRes.value.slice(0, 4)) {
      if (!a.url || !a.title) continue;
      results.push({
        title: a.title,
        description: a.description ?? `A Dev.to community article about ${query}.`,
        url: a.url, platform: "Dev.to", type: "blog", stars: a.positive_reactions_count ?? 0, icon: "✍️",
      });
    }
  }

  // 6. freeCodeCamp RSS parse (quick regex)
  if (fccRes.status === "fulfilled" && fccRes.value) {
    const xml = fccRes.value as string;
    const titleMatches = [...xml.matchAll(/<title><!\[CDATA\[(.*?)\]\]><\/title>/g)].slice(1, 5);
    const linkMatches  = [...xml.matchAll(/<link>(https:\/\/[^<]+)<\/link>/g)].slice(0, 4);
    titleMatches.forEach((m, i) => {
      if (!linkMatches[i]) return;
      const title = m[1];
      if (!title.toLowerCase().includes(query.toLowerCase().split(" ")[0])) return;
      results.push({
        title, description: `A freeCodeCamp article about ${query}.`,
        url: linkMatches[i][1], platform: "freeCodeCamp", type: "blog", stars: 0, icon: "🔥",
      });
    });
  }

  return results;
}

// ── Trending section data ──────────────────────────────────────────────────────
async function fetchTrending() {
  const queries = ["devops-roadmap", "kubernetes-learning", "cloud-native", "ai-engineering", "platform-engineering"];
  const results: { title: string; url: string; stars: number; description: string; topic: string }[] = [];

  await Promise.allSettled(queries.map(async (q) => {
    try {
      const res = await fetch(
        `https://api.github.com/search/repositories?q=${q}&sort=stars&order=desc&per_page=2`,
        { headers: { Accept: "application/vnd.github.v3+json" }, cache: "no-store" }
      );
      if (!res.ok) return;
      const data = await res.json();
      for (const repo of data.items ?? []) {
        results.push({
          title: repo.full_name,
          url: repo.html_url,
          stars: repo.stargazers_count,
          description: repo.description ?? "",
          topic: q.split("-")[0],
        });
      }
    } catch { /* skip */ }
  }));

  return results.sort((a, b) => b.stars - a.stars).slice(0, 8);
}

const TYPE_META: Record<string, { color: string; label: string }> = {
  roadmap:    { color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",       label: "Roadmap" },
  video:      { color: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",           label: "Video" },
  repository: { color: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",      label: "GitHub" },
  blog:       { color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300", label: "Article" },
  course:     { color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",    label: "Course" },
};

export default async function RoadmapsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string }>;
}) {
  const { q: query, cat } = await searchParams;
  const activeCategory = (cat ?? "all") as Category;

  const filteredStacks = activeCategory === "all"
    ? STACKS
    : STACKS.filter((s) => s.cat === activeCategory);

  const [liveResults, trending] = await Promise.all([
    query ? fetchLiveResources(query) : Promise.resolve([]),
    !query ? fetchTrending() : Promise.resolve([]),
  ]);

  const totalStacks = STACKS.length;
  const catCounts = CATEGORIES.reduce((acc, c) => {
    acc[c.key] = c.key === "all" ? totalStacks : STACKS.filter((s) => s.cat === c.key).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <SiteHeader activePage="roadmaps" />
      <TickerBar />

      {/* ── Sub-navigation ─────────────────────────────────────────── */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            {[
              { href: "/roadmaps",                label: "Roadmaps",      icon: "🗺️" },
              { href: "/roadmaps/learning",       label: "Learning",      icon: "📚" },
              { href: "/roadmaps/certifications", label: "Certifications",icon: "🏆" },
              { href: "/roadmaps/salaries",       label: "Salaries",      icon: "💰" },
              { href: "/roadmaps/interviews",     label: "Interview Prep",icon: "🎯" },
            ].map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                className={`inline-flex items-center gap-1.5 px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  href === "/roadmaps"
                    ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300"
                }`}
              >
                <span>{icon}</span>{label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10 max-w-7xl">

        {/* ── Hero & Search ─────────────────────────────────────────── */}
        <section className="mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-blue-200 dark:border-blue-800">
            <Map className="w-3.5 h-3.5" />
            {totalStacks} Learning Roadmaps · 7 Categories
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-3 leading-tight">
                Find your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  perfect roadmap
                </span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg mb-6">
                Search any tech stack and get curated learning paths from roadmap.sh, GitHub, freeCodeCamp, YouTube & Dev.to.
              </p>
              <form method="GET" action="/roadmaps" className="flex gap-2 max-w-lg">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    name="q"
                    defaultValue={query ?? ""}
                    placeholder="Search DevOps, Kubernetes, Python, AI..."
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
                  />
                </div>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold px-5 py-3 rounded-xl text-sm shadow-lg shadow-blue-500/20 transition-all whitespace-nowrap">
                  Search
                </button>
              </form>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <Map className="w-5 h-5 text-blue-500" />,     label: "Total Roadmaps",   value: totalStacks,   bg: "bg-blue-50 dark:bg-blue-950/30" },
                { icon: <BookOpen className="w-5 h-5 text-green-500" />, label: "Categories",      value: 7,            bg: "bg-green-50 dark:bg-green-950/30" },
                { icon: <Star className="w-5 h-5 text-yellow-500" />,   label: "Live Sources",     value: "5+",          bg: "bg-yellow-50 dark:bg-yellow-950/30" },
                { icon: <Users className="w-5 h-5 text-purple-500" />,  label: "Skill Paths",      value: "30+",         bg: "bg-purple-50 dark:bg-purple-950/30" },
              ].map(({ icon, label, value, bg }) => (
                <div key={label} className={`${bg} rounded-2xl p-4 border border-slate-200 dark:border-slate-700`}>
                  <div className="flex items-center gap-2 mb-1">{icon}<span className="text-xs text-slate-500 dark:text-slate-400">{label}</span></div>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Search Results ────────────────────────────────────────── */}
        {query && liveResults.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  Learning resources for{" "}
                  <span className="text-blue-600 dark:text-blue-400">&ldquo;{query}&rdquo;</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Pulled from roadmap.sh, GitHub, freeCodeCamp, YouTube &amp; Dev.to</p>
              </div>
              <span className="ml-auto text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">{liveResults.length} results</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {liveResults.map((r, i) => {
                const meta = TYPE_META[r.type] ?? TYPE_META.blog;
                return (
                  <a
                    key={i}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-lg transition-all flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{r.icon}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${meta.color}`}>{meta.label}</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {r.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-2">{r.description}</p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mt-auto">
                      <span className="font-medium">{r.platform}</span>
                      {r.stars > 0 && (
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />{r.stars.toLocaleString()}</span>
                      )}
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Category Tabs ─────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((c) => (
            <Link
              key={c.key}
              href={`/roadmaps?cat=${c.key}${query ? `&q=${query}` : ""}`}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl border transition-all ${
                activeCategory === c.key
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700"
              }`}
            >
              <span>{c.icon}</span>
              {c.label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                activeCategory === c.key ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
              }`}>
                {catCounts[c.key]}
              </span>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ── Stacks Grid ───────────────────────────────────────────── */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm font-black text-slate-900 dark:text-white">
                {activeCategory === "all" ? "All Tech Roadmaps" : CATEGORIES.find((c) => c.key === activeCategory)?.label}
              </span>
              <span className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
              <span className="text-xs text-slate-400">{filteredStacks.length} roadmaps</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredStacks.map((stack) => (
                <a
                  key={stack.name}
                  href={stack.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group rounded-2xl border p-5 hover:shadow-xl transition-all ${stack.color} relative overflow-hidden`}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl leading-none">{stack.icon}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 group-hover:translate-x-0.5 transition-all mt-1" />
                  </div>

                  {/* Name + description */}
                  <h3 className="font-black text-slate-900 dark:text-white text-sm mb-1">{stack.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">{stack.skills.join(" · ")}</p>

                  {/* Skills pills */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {stack.skills.slice(0, 3).map((s) => (
                      <span key={s} className="text-[9px] font-semibold bg-white/60 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded-md border border-white/50 dark:border-slate-700/50">
                        {s}
                      </span>
                    ))}
                    {stack.skills.length > 3 && (
                      <span className="text-[9px] text-slate-400">+{stack.skills.length - 3}</span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${LEVEL_COLORS[stack.level]}`}>
                      {stack.level}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-slate-400">
                      <Clock className="w-3 h-3" />{stack.months} mo
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* ── Trending GitHub resources ───────────────────────────── */}
            {!query && trending.length > 0 && (
              <section className="mt-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white">
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                    Trending Learning Repositories
                  </span>
                  <span className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                  <span className="text-xs text-slate-400">live from GitHub</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trending.map((repo) => (
                    <a
                      key={repo.url}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-lg transition-all flex gap-4 items-start"
                    >
                      <div className="text-2xl shrink-0">⭐</div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                          {repo.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">{repo.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                          <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />{repo.stars.toLocaleString()}</span>
                          <span className="capitalize">{repo.topic}</span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── Sidebar ───────────────────────────────────────────────── */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Highlight card */}
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white p-6 rounded-2xl shadow-lg shadow-blue-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                <h4 className="font-bold text-sm">roadmap.sh</h4>
              </div>
              <p className="text-sm text-blue-100 mb-4 leading-relaxed">
                Free, open-source and community-driven learning roadmaps for every tech career path.
              </p>
              <a
                href="https://roadmap.sh/roadmaps"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-white text-blue-600 font-bold py-2.5 rounded-xl text-sm hover:bg-blue-50 transition-colors"
              >
                Browse All Roadmaps <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Quick search stacks */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
              <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-4">Quick Search</h4>
              <div className="flex flex-wrap gap-2">
                {["DevOps", "Kubernetes", "AWS", "Python", "AI/ML", "React", "Go", "Security", "Terraform", "MLOps", "Docker", "SRE"].map((s) => (
                  <Link
                    key={s}
                    href={`/roadmaps?q=${s.toLowerCase()}`}
                    className="text-[11px] font-semibold px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                  >
                    {s}
                  </Link>
                ))}
              </div>
            </div>

            {/* Level guide */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
              <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-4">Difficulty Guide</h4>
              <ul className="space-y-3">
                {(["Beginner", "Intermediate", "Advanced"] as const).map((lvl) => (
                  <li key={lvl} className="flex items-center justify-between">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${LEVEL_COLORS[lvl]}`}>{lvl}</span>
                    <span className="text-xs text-slate-400">
                      {lvl === "Beginner" ? "1–3 months" : lvl === "Intermediate" ? "3–8 months" : "6–12 months"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learning sources */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
              <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-4">Learning Sources</h4>
              <ul className="space-y-2.5">
                {[
                  { icon: "🗺️", name: "roadmap.sh", url: "https://roadmap.sh" },
                  { icon: "⭐", name: "GitHub Awesome Lists", url: "https://github.com/sindresorhus/awesome" },
                  { icon: "🎓", name: "freeCodeCamp", url: "https://freecodecamp.org" },
                  { icon: "▶️", name: "YouTube",  url: "https://youtube.com" },
                  { icon: "✍️", name: "Dev.to", url: "https://dev.to" },
                ].map(({ icon, name, url }) => (
                  <li key={name}>
                    <a href={url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                      <span>{icon}</span>
                      <span className="group-hover:underline">{name}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 ml-auto transition-opacity" />
                    </a>
                  </li>
                ))}
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
          <p className="text-slate-400 text-sm text-center">© {new Date().getFullYear()} StackLens. All rights reserved.</p>
          <div className="flex gap-4 text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Explore</Link>
            <Link href="/news" className="hover:text-blue-600 transition-colors">News</Link>
            <Link href="/newsletter" className="hover:text-blue-600 transition-colors">Newsletter</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
