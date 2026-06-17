import Link from "next/link";
import { Compass, ExternalLink, Award, Clock, CheckCircle, XCircle, DollarSign } from "lucide-react";
import { TickerBar } from "@/components/ticker-bar";
import { SiteHeader } from "@/components/site-header";

export const dynamic = "force-dynamic";

// ── Types ──────────────────────────────────────────────────────────────────────
interface FreeResource {
  name: string;
  url: string;
}

interface Certification {
  name: string;
  code: string;
  vendor: string;
  vendorKey: string;
  icon: string;
  level: "Foundational" | "Associate" | "Professional" | "Expert";
  fee: number;
  duration: string;
  questions: string;
  passMark: string;
  validity: string;
  description: string;
  freeResources: FreeResource[];
  freeDump: boolean;
  note?: string;
  theme: string;
  badgeTheme: string;
}

// ── Data ───────────────────────────────────────────────────────────────────────
const CERTS: Certification[] = [
  // AWS
  {
    name: "AWS Cloud Practitioner",
    code: "CLF-C02",
    vendor: "AWS",
    vendorKey: "aws",
    icon: "☁️",
    level: "Foundational",
    fee: 100,
    duration: "90 min",
    questions: "65 MCQ",
    passMark: "700/1000",
    validity: "3 years",
    description: "Entry-level covering AWS Cloud concepts, services, security, architecture, pricing.",
    freeResources: [
      { name: "AWS Skill Builder", url: "https://skillbuilder.aws" },
      { name: "freeCodeCamp 13hr course", url: "https://youtube.com" },
      { name: "Examtopics CLF dumps", url: "https://examtopics.com" },
    ],
    freeDump: true,
    theme: "border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20",
    badgeTheme: "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300",
  },
  {
    name: "AWS Solutions Architect Associate",
    code: "SAA-C03",
    vendor: "AWS",
    vendorKey: "aws",
    icon: "☁️",
    level: "Associate",
    fee: 150,
    duration: "130 min",
    questions: "65 MCQ",
    passMark: "720/1000",
    validity: "3 years",
    description: "Design scalable, highly available, and fault-tolerant systems on AWS.",
    freeResources: [
      { name: "AWS Skill Builder", url: "https://skillbuilder.aws" },
      { name: "freeCodeCamp SAA-C03", url: "https://youtube.com" },
      { name: "Examtopics SAA dumps", url: "https://examtopics.com" },
      { name: "Tutorials Dojo cheat sheets", url: "https://tutorialsdojo.com" },
    ],
    freeDump: true,
    theme: "border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20",
    badgeTheme: "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300",
  },
  {
    name: "AWS Developer Associate",
    code: "DVA-C02",
    vendor: "AWS",
    vendorKey: "aws",
    icon: "☁️",
    level: "Associate",
    fee: 150,
    duration: "130 min",
    questions: "65 MCQ",
    passMark: "720/1000",
    validity: "3 years",
    description: "Develop and deploy cloud applications using AWS services.",
    freeResources: [
      { name: "freeCodeCamp DVA-C02", url: "https://youtube.com" },
      { name: "Examtopics DVA dumps", url: "https://examtopics.com" },
    ],
    freeDump: true,
    theme: "border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20",
    badgeTheme: "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300",
  },
  {
    name: "AWS SysOps Administrator Associate",
    code: "SOA-C02",
    vendor: "AWS",
    vendorKey: "aws",
    icon: "☁️",
    level: "Associate",
    fee: 150,
    duration: "180 min",
    questions: "65 MCQ",
    passMark: "720/1000",
    validity: "3 years",
    description: "Deploy, manage, and operate scalable systems on AWS.",
    freeResources: [
      { name: "Examtopics SOA dumps", url: "https://examtopics.com" },
    ],
    freeDump: true,
    theme: "border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20",
    badgeTheme: "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300",
  },
  {
    name: "AWS Solutions Architect Professional",
    code: "SAP-C02",
    vendor: "AWS",
    vendorKey: "aws",
    icon: "☁️",
    level: "Professional",
    fee: 300,
    duration: "180 min",
    questions: "75 MCQ",
    passMark: "750/1000",
    validity: "3 years",
    description: "Advanced architecture with complex organizational requirements on AWS.",
    freeResources: [
      { name: "Examtopics SAP dumps", url: "https://examtopics.com" },
      { name: "Adrian Cantrill's guide", url: "https://learn.cantrill.io" },
    ],
    freeDump: true,
    theme: "border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20",
    badgeTheme: "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300",
  },
  {
    name: "AWS DevOps Engineer Professional",
    code: "DOP-C02",
    vendor: "AWS",
    vendorKey: "aws",
    icon: "☁️",
    level: "Professional",
    fee: 300,
    duration: "180 min",
    questions: "75 MCQ",
    passMark: "750/1000",
    validity: "3 years",
    description: "Implement continuous delivery systems and automation on AWS.",
    freeResources: [
      { name: "Examtopics DOP dumps", url: "https://examtopics.com" },
    ],
    freeDump: true,
    theme: "border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20",
    badgeTheme: "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300",
  },
  // Kubernetes/CNCF
  {
    name: "Certified Kubernetes Administrator",
    code: "CKA",
    vendor: "Kubernetes",
    vendorKey: "kubernetes",
    icon: "☸️",
    level: "Professional",
    fee: 395,
    duration: "120 min",
    questions: "17 performance tasks",
    passMark: "66%",
    validity: "3 years",
    description: "Manage Kubernetes clusters: installation, config, networking, lifecycle.",
    freeResources: [
      { name: "KillerCoda CKA labs", url: "https://killercoda.com/cka" },
      { name: "killer.sh (2 simulations with purchase)", url: "https://killer.sh" },
      { name: "KodeKloud free tier", url: "https://kodekloud.com" },
      { name: "Official K8s docs", url: "https://kubernetes.io/docs" },
      { name: "GitHub CKA prep repo", url: "https://github.com/walidshaari/Kubernetes-Certified-Administrator" },
    ],
    freeDump: false,
    note: "Performance-based lab exam — no MCQ dumps. Use KillerCoda daily.",
    theme: "border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/20",
    badgeTheme: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300",
  },
  {
    name: "Certified Kubernetes Application Developer",
    code: "CKAD",
    vendor: "Kubernetes",
    vendorKey: "kubernetes",
    icon: "☸️",
    level: "Associate",
    fee: 395,
    duration: "120 min",
    questions: "19 tasks",
    passMark: "66%",
    validity: "3 years",
    description: "Design and deploy cloud-native applications on Kubernetes.",
    freeResources: [
      { name: "KillerCoda CKAD labs", url: "https://killercoda.com/ckad" },
      { name: "CKAD-exercises GitHub", url: "https://github.com/dgkanatsios/CKAD-exercises" },
      { name: "freeCodeCamp CKAD", url: "https://youtube.com" },
    ],
    freeDump: false,
    theme: "border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/20",
    badgeTheme: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300",
  },
  {
    name: "Certified Kubernetes Security Specialist",
    code: "CKS",
    vendor: "Kubernetes",
    vendorKey: "kubernetes",
    icon: "☸️",
    level: "Expert",
    fee: 395,
    duration: "120 min",
    questions: "15–20 tasks",
    passMark: "67%",
    validity: "2 years",
    description: "Secure container-based apps and K8s platforms at build/deploy/runtime. Requires active CKA.",
    freeResources: [
      { name: "KillerCoda CKS labs", url: "https://killercoda.com/cks" },
      { name: "CKS GitHub study guide", url: "https://github.com/walidshaari/Certified-Kubernetes-Security-Specialist" },
    ],
    freeDump: false,
    note: "Requires active CKA certification. Hardest K8s cert.",
    theme: "border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/20",
    badgeTheme: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300",
  },
  {
    name: "Kubernetes and Cloud Native Associate",
    code: "KCNA",
    vendor: "Kubernetes",
    vendorKey: "kubernetes",
    icon: "☸️",
    level: "Foundational",
    fee: 250,
    duration: "90 min",
    questions: "60 MCQ",
    passMark: "75%",
    validity: "3 years",
    description: "Entry-level K8s fundamentals and cloud-native ecosystem.",
    freeResources: [
      { name: "Examtopics KCNA", url: "https://examtopics.com" },
      { name: "James Spurin YouTube course", url: "https://youtube.com" },
    ],
    freeDump: true,
    theme: "border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/20",
    badgeTheme: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300",
  },
  // Google Cloud
  {
    name: "Associate Cloud Engineer",
    code: "ACE",
    vendor: "GCP",
    vendorKey: "gcp",
    icon: "🌩️",
    level: "Associate",
    fee: 200,
    duration: "120 min",
    questions: "50 MCQ",
    passMark: "~70%",
    validity: "3 years",
    description: "Deploy apps, monitor operations, and maintain cloud projects on GCP.",
    freeResources: [
      { name: "Google Cloud Skills Boost (free tier)", url: "https://cloudskillsboost.google" },
      { name: "Examtopics ACE dumps", url: "https://examtopics.com" },
      { name: "freeCodeCamp ACE course", url: "https://youtube.com" },
    ],
    freeDump: true,
    theme: "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20",
    badgeTheme: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
  },
  {
    name: "Professional Cloud Architect",
    code: "PCA",
    vendor: "GCP",
    vendorKey: "gcp",
    icon: "🌩️",
    level: "Professional",
    fee: 200,
    duration: "120 min",
    questions: "60 MCQ",
    passMark: "~70%",
    validity: "2 years",
    description: "Design secure, scalable, dynamic solutions on Google Cloud Platform.",
    freeResources: [
      { name: "Google Cloud Skills Boost", url: "https://cloudskillsboost.google" },
      { name: "Examtopics PCA dumps", url: "https://examtopics.com" },
    ],
    freeDump: true,
    theme: "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20",
    badgeTheme: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
  },
  // Azure
  {
    name: "Azure Fundamentals",
    code: "AZ-900",
    vendor: "Azure",
    vendorKey: "azure",
    icon: "🔷",
    level: "Foundational",
    fee: 165,
    duration: "60 min",
    questions: "40–60 MCQ",
    passMark: "700/1000",
    validity: "Lifetime",
    description: "Cloud services fundamentals with Microsoft Azure.",
    freeResources: [
      { name: "Microsoft Learn (free)", url: "https://learn.microsoft.com" },
      { name: "freeCodeCamp AZ-900", url: "https://youtube.com" },
      { name: "Examtopics AZ-900 dumps", url: "https://examtopics.com" },
    ],
    freeDump: true,
    theme: "border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/20",
    badgeTheme: "bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300",
  },
  {
    name: "Azure Administrator",
    code: "AZ-104",
    vendor: "Azure",
    vendorKey: "azure",
    icon: "🔷",
    level: "Associate",
    fee: 165,
    duration: "120 min",
    questions: "40–60 MCQ",
    passMark: "700/1000",
    validity: "1yr renewable",
    description: "Implement, manage, and monitor Azure environments.",
    freeResources: [
      { name: "Microsoft Learn", url: "https://learn.microsoft.com" },
      { name: "Examtopics AZ-104 dumps", url: "https://examtopics.com" },
      { name: "freeCodeCamp AZ-104", url: "https://youtube.com" },
    ],
    freeDump: true,
    theme: "border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/20",
    badgeTheme: "bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300",
  },
  {
    name: "Azure DevOps Engineer Expert",
    code: "AZ-400",
    vendor: "Azure",
    vendorKey: "azure",
    icon: "🔷",
    level: "Expert",
    fee: 165,
    duration: "120 min",
    questions: "40–60 MCQ",
    passMark: "700/1000",
    validity: "1yr renewable",
    description: "Design and implement DevOps practices on Azure. Requires AZ-104 or AZ-204.",
    freeResources: [
      { name: "Microsoft Learn AZ-400", url: "https://learn.microsoft.com" },
      { name: "Examtopics AZ-400 dumps", url: "https://examtopics.com" },
    ],
    freeDump: true,
    theme: "border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/20",
    badgeTheme: "bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300",
  },
  // HashiCorp
  {
    name: "HashiCorp Terraform Associate",
    code: "003",
    vendor: "HashiCorp",
    vendorKey: "hashicorp",
    icon: "🏗️",
    level: "Associate",
    fee: 70.50,
    duration: "60 min",
    questions: "57 MCQ",
    passMark: "70%",
    validity: "2 years",
    description: "Write, plan, and create Terraform configs for infrastructure automation. Most affordable DevOps cert.",
    freeResources: [
      { name: "HashiCorp Learn (free)", url: "https://developer.hashicorp.com/terraform/tutorials" },
      { name: "freeCodeCamp Terraform", url: "https://youtube.com" },
      { name: "Examtopics Terraform dumps", url: "https://examtopics.com" },
    ],
    freeDump: true,
    theme: "border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/20",
    badgeTheme: "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300",
  },
  // Linux Foundation
  {
    name: "Linux Foundation Certified SysAdmin",
    code: "LFCS",
    vendor: "Linux",
    vendorKey: "linux",
    icon: "🐧",
    level: "Associate",
    fee: 395,
    duration: "120 min",
    questions: "Performance-based",
    passMark: "57%",
    validity: "3 years",
    description: "Fundamental operations, service configuration, and troubleshooting on Linux.",
    freeResources: [
      { name: "KillerCoda Linux labs", url: "https://killercoda.com" },
      { name: "OverTheWire Bandit (free wargame)", url: "https://overthewire.org/wargames/bandit" },
      { name: "Linux Journey (free)", url: "https://linuxjourney.com" },
    ],
    freeDump: false,
    note: "Performance-based. Practice in terminal daily.",
    theme: "border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/40",
    badgeTheme: "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300",
  },
  // CompTIA
  {
    name: "CompTIA Security+",
    code: "SY0-701",
    vendor: "Security",
    vendorKey: "security",
    icon: "🔒",
    level: "Associate",
    fee: 392,
    duration: "90 min",
    questions: "90 Q (MCQ+perf)",
    passMark: "750/900",
    validity: "3 years",
    description: "Industry-standard cybersecurity covering threats, vulnerabilities, access control, cryptography.",
    freeResources: [
      { name: "Professor Messer free course", url: "https://professormesser.com" },
      { name: "Examtopics Security+ dumps", url: "https://examtopics.com" },
    ],
    freeDump: true,
    theme: "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20",
    badgeTheme: "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
  },
];

const VENDORS = [
  { key: "all", label: "All" },
  { key: "aws", label: "AWS" },
  { key: "kubernetes", label: "Kubernetes" },
  { key: "gcp", label: "GCP" },
  { key: "azure", label: "Azure" },
  { key: "hashicorp", label: "HashiCorp" },
  { key: "linux", label: "Linux" },
  { key: "security", label: "Security" },
];

const LEVEL_COLORS: Record<string, string> = {
  Foundational: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300",
  Associate: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
  Professional: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300",
  Expert: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300",
};

function feeBadge(fee: number): string {
  if (fee < 200) return "text-green-600 dark:text-green-400 font-bold";
  if (fee <= 300) return "text-yellow-600 dark:text-yellow-400 font-bold";
  return "text-red-600 dark:text-red-400 font-bold";
}

const SUB_NAV = [
  { label: "🗺️ Roadmaps", href: "/roadmaps" },
  { label: "📚 Learning Resources", href: "/roadmaps/learning" },
  { label: "🏆 Certifications", href: "/roadmaps/certifications" },
  { label: "💰 Salaries", href: "/roadmaps/salaries" },
  { label: "🎯 Interview Prep", href: "/roadmaps/interviews" },
];

export default async function CertificationsPage({
  searchParams,
}: {
  searchParams: Promise<{ vendor?: string }>;
}) {
  const { vendor } = await searchParams;
  const activeVendor = vendor ?? "all";
  const filtered = activeVendor === "all" ? CERTS : CERTS.filter((c) => c.vendorKey === activeVendor);
  const totalVendors = new Set(CERTS.map((c) => c.vendorKey)).size;
  const avgCost = Math.round(CERTS.reduce((a, c) => a + c.fee, 0) / CERTS.length);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <SiteHeader activePage="roadmaps" />

      {/* Sub-nav */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex gap-1 overflow-x-auto py-2 no-scrollbar">
            {SUB_NAV.map(({ label, href }) => (
              <Link key={href} href={href} className={`whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                href === "/roadmaps/certifications"
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
          <div className="inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-yellow-200 dark:border-yellow-800">
            <Award className="w-3.5 h-3.5" />
            DevOps & Cloud Certifications Guide
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-3 leading-tight">
                Cloud & DevOps{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
                  Certifications
                </span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">
                Complete guide to {CERTS.length} top certifications with fees, resources, and free study materials.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Total Certs", value: CERTS.length, color: "bg-blue-50 dark:bg-blue-950/30", icon: "🏆" },
                { label: "Vendors", value: totalVendors, color: "bg-orange-50 dark:bg-orange-950/30", icon: "🏢" },
                { label: "Avg Cost", value: `$${avgCost}`, color: "bg-green-50 dark:bg-green-950/30", icon: "💰" },
              ].map(({ label, value, color, icon }) => (
                <div key={label} className={`${color} rounded-2xl p-4 border border-slate-200 dark:border-slate-700 text-center`}>
                  <div className="text-2xl mb-1">{icon}</div>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">{value}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Vendor filter tabs */}
          <div className="flex flex-wrap gap-2">
            {VENDORS.map((v) => {
              const count = v.key === "all" ? CERTS.length : CERTS.filter((c) => c.vendorKey === v.key).length;
              return (
                <Link
                  key={v.key}
                  href={`/roadmaps/certifications${v.key === "all" ? "" : `?vendor=${v.key}`}`}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl border transition-all ${
                    activeVendor === v.key
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700"
                  }`}
                >
                  {v.label}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    activeVendor === v.key ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                  }`}>{count}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Certs grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filtered.map((cert) => (
            <div key={cert.code} className={`rounded-2xl border p-6 ${cert.theme} relative overflow-hidden`}>
              {/* Header row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{cert.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-black text-slate-900 dark:text-white text-base leading-tight">{cert.name}</h3>
                    </div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 bg-white/60 dark:bg-slate-900/40 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">{cert.code}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${LEVEL_COLORS[cert.level]}`}>{cert.level}</span>
                    </div>
                  </div>
                </div>
                {cert.freeDump ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2 py-1 rounded-full border border-green-200 dark:border-green-800 whitespace-nowrap">
                    <CheckCircle className="w-3 h-3" /> Free Dump
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-1 rounded-full border border-slate-200 dark:border-slate-700 whitespace-nowrap">
                    <XCircle className="w-3 h-3" /> Lab Only
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">{cert.description}</p>

              {/* Exam details grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                {[
                  { label: "Fee", value: `$${cert.fee}`, extra: feeBadge(cert.fee), icon: <DollarSign className="w-3 h-3" /> },
                  { label: "Duration", value: cert.duration, extra: "text-slate-700 dark:text-slate-200 font-semibold", icon: <Clock className="w-3 h-3" /> },
                  { label: "Questions", value: cert.questions, extra: "text-slate-700 dark:text-slate-200 font-semibold", icon: null },
                  { label: "Pass Mark", value: cert.passMark, extra: "text-slate-700 dark:text-slate-200 font-semibold", icon: null },
                  { label: "Validity", value: cert.validity, extra: "text-slate-700 dark:text-slate-200 font-semibold", icon: null },
                  { label: "Vendor", value: cert.vendor, extra: cert.badgeTheme + " font-semibold text-xs", icon: null },
                ].map(({ label, value, extra, icon }) => (
                  <div key={label} className="bg-white/60 dark:bg-slate-900/40 rounded-xl p-2.5 border border-white/80 dark:border-slate-700/50">
                    <p className="text-[10px] text-slate-400 mb-0.5">{label}</p>
                    <p className={`text-xs flex items-center gap-1 ${extra}`}>
                      {icon}{value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Note */}
              {cert.note && (
                <div className="mb-4 flex items-start gap-2 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-xl p-3">
                  <span className="text-yellow-500 text-sm mt-0.5">⚠️</span>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300 leading-relaxed">{cert.note}</p>
                </div>
              )}

              {/* Free resources expandable */}
              <details className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200 bg-white/60 dark:bg-slate-900/40 hover:bg-white/80 dark:hover:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 transition-colors select-none">
                  <span className="flex items-center gap-2">
                    📚 Free Study Resources
                    <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{cert.freeResources.length}</span>
                  </span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2 space-y-1.5 pl-1">
                  {cert.freeResources.map((r) => (
                    <a
                      key={r.name}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors group/link p-2 rounded-lg hover:bg-white/60 dark:hover:bg-slate-900/40"
                    >
                      <span className="text-green-500">→</span>
                      <span className="underline underline-offset-2 flex-1">{r.name}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity shrink-0" />
                    </a>
                  ))}
                </div>
              </details>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-10 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 text-center">
          <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
            💡 Prices are approximate and may vary. Always check the official vendor website for current exam pricing and availability.
          </p>
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
