import Link from "next/link";
import { Compass, Command, TrendingUp, DollarSign } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { TickerBar } from "@/components/ticker-bar";

export const dynamic = "force-dynamic";

// ── Types ──────────────────────────────────────────────────────────────────────
interface SalaryRole {
  role: string;
  category: string;
  categoryKey: string;
  usaEntry: string;
  usaMid: string;
  usaSenior: string;
  usaLead: string;
  ukMid: string;
  germanyMid: string;
  canadaMid: string;
  indiaMid: string;
  demand: string;
  demandKey: "very-high" | "high" | "medium";
  yoyGrowth: string;
  topSkills: string[];
}

// ── Data ───────────────────────────────────────────────────────────────────────
const ROLES: SalaryRole[] = [
  {
    role: "DevOps Engineer",
    category: "DevOps & Cloud",
    categoryKey: "devops",
    usaEntry: "$75k",
    usaMid: "$125k",
    usaSenior: "$165k",
    usaLead: "$195k+",
    ukMid: "£70k",
    germanyMid: "€75k",
    canadaMid: "C$110k",
    indiaMid: "₹18L",
    demand: "🔥 Very High",
    demandKey: "very-high",
    yoyGrowth: "+22%",
    topSkills: ["Kubernetes", "Terraform", "AWS", "Python", "CI/CD"],
  },
  {
    role: "Cloud Architect",
    category: "DevOps & Cloud",
    categoryKey: "devops",
    usaEntry: "$95k",
    usaMid: "$150k",
    usaSenior: "$200k",
    usaLead: "$240k+",
    ukMid: "£90k",
    germanyMid: "€95k",
    canadaMid: "C$140k",
    indiaMid: "₹28L",
    demand: "🔥 Very High",
    demandKey: "very-high",
    yoyGrowth: "+28%",
    topSkills: ["AWS/GCP/Azure", "Architecture", "Terraform", "Cost Optimization"],
  },
  {
    role: "Platform Engineer",
    category: "DevOps & Cloud",
    categoryKey: "devops",
    usaEntry: "$90k",
    usaMid: "$145k",
    usaSenior: "$195k",
    usaLead: "$230k+",
    ukMid: "£85k",
    germanyMid: "€90k",
    canadaMid: "C$130k",
    indiaMid: "₹25L",
    demand: "🔥 Very High",
    demandKey: "very-high",
    yoyGrowth: "+35%",
    topSkills: ["Kubernetes", "Backstage", "IDP", "SRE", "GitOps"],
  },
  {
    role: "Site Reliability Engineer",
    category: "DevOps & Cloud",
    categoryKey: "devops",
    usaEntry: "$95k",
    usaMid: "$155k",
    usaSenior: "$200k",
    usaLead: "$240k+",
    ukMid: "£90k",
    germanyMid: "€95k",
    canadaMid: "C$140k",
    indiaMid: "₹22L",
    demand: "🔥 Very High",
    demandKey: "very-high",
    yoyGrowth: "+25%",
    topSkills: ["Go", "Prometheus", "Kubernetes", "Linux", "Incident Management"],
  },
  {
    role: "Kubernetes Engineer",
    category: "DevOps & Cloud",
    categoryKey: "devops",
    usaEntry: "$90k",
    usaMid: "$145k",
    usaSenior: "$190k",
    usaLead: "$220k+",
    ukMid: "£85k",
    germanyMid: "€88k",
    canadaMid: "C$130k",
    indiaMid: "₹20L",
    demand: "📈 High",
    demandKey: "high",
    yoyGrowth: "+30%",
    topSkills: ["Kubernetes", "Helm", "GitOps", "Go", "Operators"],
  },
  {
    role: "AI/ML Engineer",
    category: "AI & ML",
    categoryKey: "ai",
    usaEntry: "$100k",
    usaMid: "$165k",
    usaSenior: "$220k",
    usaLead: "$280k+",
    ukMid: "£95k",
    germanyMid: "€100k",
    canadaMid: "C$150k",
    indiaMid: "₹30L",
    demand: "🔥 Very High",
    demandKey: "very-high",
    yoyGrowth: "+45%",
    topSkills: ["Python", "PyTorch", "LLMs", "MLOps", "CUDA"],
  },
  {
    role: "Data Engineer",
    category: "AI & ML",
    categoryKey: "ai",
    usaEntry: "$85k",
    usaMid: "$130k",
    usaSenior: "$175k",
    usaLead: "$210k+",
    ukMid: "£75k",
    germanyMid: "€80k",
    canadaMid: "C$120k",
    indiaMid: "₹22L",
    demand: "📈 High",
    demandKey: "high",
    yoyGrowth: "+20%",
    topSkills: ["SQL", "Spark", "Kafka", "Python", "dbt"],
  },
  {
    role: "Security Engineer",
    category: "Security",
    categoryKey: "security",
    usaEntry: "$85k",
    usaMid: "$135k",
    usaSenior: "$180k",
    usaLead: "$220k+",
    ukMid: "£78k",
    germanyMid: "€82k",
    canadaMid: "C$120k",
    indiaMid: "₹20L",
    demand: "📈 High",
    demandKey: "high",
    yoyGrowth: "+18%",
    topSkills: ["SIEM", "Pentesting", "Cloud Security", "DevSecOps"],
  },
  {
    role: "Backend Engineer (Go/Rust)",
    category: "Backend",
    categoryKey: "backend",
    usaEntry: "$80k",
    usaMid: "$135k",
    usaSenior: "$185k",
    usaLead: "$220k+",
    ukMid: "£78k",
    germanyMid: "€82k",
    canadaMid: "C$120k",
    indiaMid: "₹20L",
    demand: "📈 High",
    demandKey: "high",
    yoyGrowth: "+15%",
    topSkills: ["Go", "Rust", "Microservices", "gRPC", "PostgreSQL"],
  },
  {
    role: "Frontend Engineer (React)",
    category: "Frontend",
    categoryKey: "frontend",
    usaEntry: "$75k",
    usaMid: "$120k",
    usaSenior: "$165k",
    usaLead: "$200k+",
    ukMid: "£68k",
    germanyMid: "€72k",
    canadaMid: "C$105k",
    indiaMid: "₹16L",
    demand: "📊 Medium",
    demandKey: "medium",
    yoyGrowth: "+8%",
    topSkills: ["React", "TypeScript", "Next.js", "Tailwind", "Testing"],
  },
];

const CATEGORIES = [
  { key: "all", label: "All Roles" },
  { key: "devops", label: "DevOps & Cloud" },
  { key: "ai", label: "AI & ML" },
  { key: "backend", label: "Backend" },
  { key: "frontend", label: "Frontend" },
  { key: "security", label: "Security" },
];

const DEMAND_COLORS: Record<string, string> = {
  "very-high": "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
  "high": "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800",
  "medium": "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
};

const SUB_NAV = [
  { label: "🗺️ Roadmaps", href: "/roadmaps" },
  { label: "📚 Learning Resources", href: "/roadmaps/learning" },
  { label: "🏆 Certifications", href: "/roadmaps/certifications" },
  { label: "💰 Salaries", href: "/roadmaps/salaries" },
  { label: "🎯 Interview Prep", href: "/roadmaps/interviews" },
];

export default async function SalariesPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const activeCategory = cat ?? "all";
  const filtered = activeCategory === "all" ? ROLES : ROLES.filter((r) => r.categoryKey === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter text-blue-600 dark:text-blue-400 group">
            <Compass className="w-7 h-7 group-hover:rotate-45 transition-transform duration-500" />
            <span>Stack<span className="text-slate-900 dark:text-white">Lens</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">Explore</Link>
            <Link href="/roadmaps" className="text-sm font-medium text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 pb-0.5">Roadmaps</Link>
            <Link href="/news" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">News</Link>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="https://github.com/code-and-secure?tab=repositories" target="_blank" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors p-2">
              <Command className="w-5 h-5" />
            </a>
            <ThemeToggle />
            <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all">Sign In</Link>
          </div>
        </div>
      </header>

      {/* Sub-nav */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex gap-1 overflow-x-auto py-2 no-scrollbar">
            {SUB_NAV.map(({ label, href }) => (
              <Link key={href} href={href} className={`whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                href === "/roadmaps/salaries"
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}>{label}</Link>
            ))}
          </div>
        </div>
      </div>

      <TickerBar />

      <main className="container mx-auto px-4 py-10 max-w-7xl">
        {/* Hero */}
        <section className="mb-10">
          <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-green-200 dark:border-green-800">
            <DollarSign className="w-3.5 h-3.5" />
            2024–2025 Market Data
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-3 leading-tight">
                Tech Salary{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">
                  Intelligence
                </span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg mb-4">
                Real-world salary ranges for {ROLES.length} tech roles across USA, UK, Germany, Canada, and India. Based on 2024–2025 market data.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 rounded-xl px-3 py-2">
                <span>💡</span>
                <span>Remote DevOps/Cloud roles command a <span className="font-bold text-slate-700 dark:text-slate-200">10–20% premium</span> over on-site equivalents.</span>
              </div>
            </div>
            {/* Summary highlights */}
            <div className="space-y-3">
              {[
                { icon: "🏆", label: "Highest Paying", value: "AI/ML Engineer ($220k+ senior)", color: "bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800" },
                { icon: "🚀", label: "Fastest Growing", value: "AI/ML (+45% YoY)", color: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800" },
                { icon: "🔥", label: "Most In-Demand", value: "Platform Engineering", color: "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800" },
              ].map(({ icon, label, value, color }) => (
                <div key={label} className={`flex items-center gap-3 rounded-xl p-3 border ${color}`}>
                  <span className="text-xl">{icon}</span>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const count = c.key === "all" ? ROLES.length : ROLES.filter((r) => r.categoryKey === c.key).length;
              return (
                <Link
                  key={c.key}
                  href={`/roadmaps/salaries${c.key === "all" ? "" : `?cat=${c.key}`}`}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl border transition-all ${
                    activeCategory === c.key
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700"
                  }`}
                >
                  {c.label}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    activeCategory === c.key ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                  }`}>{count}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Salary cards */}
        <div className="space-y-5">
          {filtered.map((role) => (
            <div key={role.role} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              {/* Card header */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5 pb-0">
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="font-black text-slate-900 dark:text-white text-lg">{role.role}</h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full">{role.category}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${DEMAND_COLORS[role.demandKey]}`}>{role.demand}</span>
                      <span className="flex items-center gap-1 text-[10px] font-bold bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full border border-green-200 dark:border-green-800">
                        <TrendingUp className="w-2.5 h-2.5" />{role.yoyGrowth} YoY
                      </span>
                    </div>
                  </div>
                </div>
                {/* US salary highlight */}
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 mb-0.5">USA Senior</p>
                  <p className="text-xl font-black text-green-600 dark:text-green-400">{role.usaSenior}</p>
                </div>
              </div>

              {/* Salary table */}
              <div className="p-5">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs min-w-[500px]">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800">
                        <th className="text-left py-2 pr-4 font-bold text-slate-400 uppercase tracking-wider text-[10px]">Level</th>
                        <th className="text-right py-2 px-2 font-bold text-slate-500 dark:text-slate-400 text-[11px]">🇺🇸 USA</th>
                        <th className="text-right py-2 px-2 font-bold text-slate-500 dark:text-slate-400 text-[11px]">🇬🇧 UK</th>
                        <th className="text-right py-2 px-2 font-bold text-slate-500 dark:text-slate-400 text-[11px]">🇩🇪 Germany</th>
                        <th className="text-right py-2 px-2 font-bold text-slate-500 dark:text-slate-400 text-[11px]">🇨🇦 Canada</th>
                        <th className="text-right py-2 pl-2 font-bold text-slate-500 dark:text-slate-400 text-[11px]">🇮🇳 India</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60">
                      {[
                        { level: "Entry", usa: role.usaEntry, uk: "—", de: "—", ca: "—", in: "—" },
                        { level: "Mid", usa: role.usaMid, uk: role.ukMid, de: role.germanyMid, ca: role.canadaMid, in: role.indiaMid },
                        { level: "Senior", usa: role.usaSenior, uk: "~" + role.ukMid.replace(/[£€C$₹]/g, "") + " (est.)", de: "~" + role.germanyMid + " (est.)", ca: "~" + role.canadaMid + " (est.)", in: "~" + role.indiaMid + " (est.)" },
                        { level: "Lead/Staff", usa: role.usaLead, uk: "—", de: "—", ca: "—", in: "—" },
                      ].map(({ level, usa, uk, de, ca }) => (
                        <tr key={level}>
                          <td className="py-2.5 pr-4 font-semibold text-slate-700 dark:text-slate-200">{level}</td>
                          <td className="py-2.5 px-2 text-right font-bold text-green-600 dark:text-green-400">{usa}</td>
                          <td className="py-2.5 px-2 text-right text-slate-600 dark:text-slate-300">{uk}</td>
                          <td className="py-2.5 px-2 text-right text-slate-600 dark:text-slate-300">{de}</td>
                          <td className="py-2.5 px-2 text-right text-slate-600 dark:text-slate-300">{ca}</td>
                          <td className="py-2.5 pl-2 text-right text-slate-600 dark:text-slate-300">{role.indiaMid}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Top skills chips */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Top Skills:</span>
                  {role.topSkills.map((skill) => (
                    <span key={skill} className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Currency note */}
        <div className="mt-8 bg-slate-100 dark:bg-slate-800/60 rounded-2xl p-5 text-sm text-slate-500 dark:text-slate-400">
          <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1">📌 Salary Data Notes</p>
          <ul className="space-y-1 text-xs list-disc list-inside">
            <li>Salaries are approximate 2024–2025 market data from LinkedIn, Glassdoor, Levels.fyi, and industry surveys.</li>
            <li>INR figures represent annual CTC (Cost to Company) packages.</li>
            <li>USA figures do not include equity/RSU which can add 30–100%+ for senior roles at top companies.</li>
            <li>Remote DevOps/Cloud roles command a 10–20% premium over on-site equivalents.</li>
            <li>Estimates marked with ~ are extrapolated from mid-level data and may vary significantly.</li>
          </ul>
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
            <Link href="/roadmaps" className="hover:text-blue-600 transition-colors">Roadmaps</Link>
            <Link href="/news" className="hover:text-blue-600 transition-colors">News</Link>
            <Link href="/newsletter" className="hover:text-blue-600 transition-colors">Newsletter</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
