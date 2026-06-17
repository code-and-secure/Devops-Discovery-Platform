"use client";

import { motion } from "framer-motion";
import { ExternalLink, Bookmark, Layers, Cloud, Box, Cpu, Shield, Activity, GitBranch, Settings, PlayCircle, BarChart2, Copy, Share2, Check } from "lucide-react";
import { UpvoteButton } from "./upvote-button";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/toast";

interface Resource {
  id?: number;
  title: string;
  description: string | null;
  url: string;
  type: string;
  category: string;
  platform: string | null;
  upvotes: number | null;
  isFeatured: boolean | null;
}

export function CategoryIcon({ name, className }: { name: string, className?: string }) {
  switch (name.toLowerCase()) {
    case 'devops': return <Settings className={className} />;
    case 'cloud': case 'cloud computing': return <Cloud className={className} />;
    case 'platform engineering': return <Layers className={className} />;
    case 'kubernetes': return <Box className={className} />;
    case 'ai engineering': return <Cpu className={className} />;
    case 'cybersecurity': return <Shield className={className} />;
    case 'sre': return <Activity className={className} />;
    case 'gitops': return <GitBranch className={className} />;
    case 'monitoring': return <BarChart2 className={className} />;
    default: return <Layers className={className} />;
  }
}

export function ResourceCard({ resource }: { resource: Resource }) {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const { showToast } = useToast();

  const hasResourceId = typeof resource.id === "number";
  const externalResourceHref = `/resources/external?${new URLSearchParams({
    title: resource.title,
    description: resource.description ?? "",
    url: resource.url,
    type: resource.type,
    category: resource.category,
    platform: resource.platform ?? "External",
    upvotes: String(resource.upvotes ?? 0),
  }).toString()}`;
  const resourceHref = hasResourceId ? `/resources/${resource.id}` : externalResourceHref;

  function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(resource.url).then(() => {
      setCopied(true);
      showToast("Link copied to clipboard!", "success");
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleShare(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({ title: resource.title, url: resource.url });
    } else {
      const text = encodeURIComponent(`Check out: ${resource.title} ${resource.url}`);
      window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
    }
  }

  function handleBookmark(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked((b) => !b);
    showToast(bookmarked ? "Removed from bookmarks" : "Saved to bookmarks!", bookmarked ? "info" : "success");
  }

  return (
    <div className="perspective-1000 h-full">
      <motion.div
        whileHover={{
          y: -8,
          boxShadow: "0 20px 40px -12px rgb(0 0 0 / 0.15)"
        }}
        initial={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 flex flex-col h-full group cursor-pointer shadow-sm hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
      >
        {/* Top row */}
        <div className="flex justify-between items-start mb-3">
          <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300">
            {resource.type}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              title="Copy link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              title="Share"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleBookmark}
              className={`p-1.5 rounded-lg transition-colors ${
                bookmarked
                  ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20"
                  : "text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              }`}
              title={bookmarked ? "Remove bookmark" : "Bookmark"}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-blue-600" : ""}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
          <Link href={resourceHref} target="_blank" className="flex items-start gap-2">
            <span className="line-clamp-2 break-words min-w-0">{resource.title}</span>
            <span className="shrink-0 mt-0.5">
              {resource.type === 'video' ? <PlayCircle className="w-4 h-4 text-red-500" /> : <ExternalLink className="w-4 h-4" />}
            </span>
          </Link>
        </h3>

        {/* Description */}
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2 flex-grow">
          {resource.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-lg">
              <CategoryIcon name={resource.category} className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            </div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate max-w-[90px]">{resource.category}</span>
          </div>
          <UpvoteButton id={resource.id} initialUpvotes={resource.upvotes || 0} />
        </div>
      </motion.div>
    </div>
  );
}
