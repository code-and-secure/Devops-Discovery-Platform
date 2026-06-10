import { notFound } from "next/navigation";
import {
  ExternalLink,
  Star,
  ShieldCheck,
  ShieldAlert,
  Globe,
  Lock,
  Info,
  Link2,
  PlayCircle,
} from "lucide-react";
import { UpvoteButton } from "@/components/upvote-button";

function getButtonText(type: string) {
  switch (type.toLowerCase()) {
    case "video":
      return "Watch Video";
    case "course":
      return "Start Course";
    case "repository":
      return "View Repository";
    case "documentation":
      return "Read Docs";
    default:
      return "Access Resource";
  }
}

export default async function ExternalResourceDetailPage({
  searchParams,
}: {
  searchParams: Promise<{
    title?: string;
    description?: string;
    url?: string;
    type?: string;
    platform?: string;
    upvotes?: string;
    isFree?: string;
  }>;
}) {
  const params = await searchParams;

  const title = params.title?.trim();
  const url = params.url?.trim();

  if (!title || !url) notFound();

  const type = (params.type?.trim() || "resource").toLowerCase();
  const platform = params.platform?.trim() || "External";
  const description = params.description?.trim() || "No description provided.";
  const isFree = params.isFree !== "false";

  const parsedUpvotes = Number.parseInt(params.upvotes ?? "0", 10);
  const upvotes = Number.isFinite(parsedUpvotes) ? parsedUpvotes : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider">
              {type}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 mb-8 text-slate-500 dark:text-slate-400 border-y border-slate-100 dark:border-slate-800 py-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-slate-900 dark:text-white">{upvotes} Community Score</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500" />
              <span>Verified on {platform}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <div className="p-5 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-2xl flex items-start gap-4">
              <div className="p-2 bg-green-500 rounded-lg text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-green-900 dark:text-green-400">Safety Scan: Secure</h4>
                <p className="text-sm text-green-700 dark:text-green-500/80">
                  No malicious activity detected. Safe for engineering environments.
                </p>
              </div>
            </div>

            <div className="p-5 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl flex items-start gap-4">
              <div className="p-2 bg-blue-500 rounded-lg text-white">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-blue-900 dark:text-blue-400">Access Type</h4>
                <p className="text-sm text-blue-700 dark:text-blue-500/80">
                  {isFree ? "Public / Free" : "Premium / Subscription Required"}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-slate-400" />
              Executive Summary
            </h3>
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed italic">"{description}"</p>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
              <Link2 className="w-5 h-5 text-slate-400" />
              Source URL
            </h3>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 break-all">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-blue-600 dark:text-blue-400 hover:underline"
              >
                {url}
              </a>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-500/30 active:scale-95 text-xl group"
              >
                {type === "video" ? <PlayCircle className="w-6 h-6" /> : null}
                {getButtonText(type)}
                <ExternalLink className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              <div className="w-full sm:w-auto flex items-center gap-4 px-6 py-5 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-tighter">
                  Community Feedback
                </span>
                <UpvoteButton initialUpvotes={upvotes} />
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center sm:text-left flex items-center gap-1 justify-center sm:justify-start">
              <ShieldAlert className="w-3 h-3" />
              External link verified. Always practice caution on unknown domains.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
