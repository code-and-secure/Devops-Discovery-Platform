"use client";

import { motion } from "framer-motion";
import { ExternalLink, Bookmark, Layers, Cloud, Box, Cpu, Shield, Activity, GitBranch, Settings, PlayCircle, BarChart2 } from "lucide-react";
import { UpvoteButton } from "./upvote-button";
import Link from "next/link";

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

  return (
    <div className="perspective-1000 h-full">
      <motion.div
        whileHover={{
          y: -12,
          rotateX: 4,
          rotateY: -4,
          boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)"
        }}
        initial={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col h-full group preserve-3d cursor-pointer shadow-sm"
      >
      <div className="flex justify-between items-start mb-4">
        <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">
          {resource.type}
        </span>
        <div className="flex gap-2">
          <button className="text-slate-400 hover:text-blue-600 transition-colors">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
        <Link href={resourceHref} target="_blank" className="flex items-center gap-2">
          {resource.title}
          {resource.type === 'video' ? <PlayCircle className="w-4 h-4 text-red-500" /> : <ExternalLink className="w-4 h-4" />}
        </Link>
      </h3>
      
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3 flex-grow">
        {resource.description}
      </p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-lg">
            <CategoryIcon name={resource.category} className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </div>
          <span className="text-xs font-medium text-slate-500">{resource.category}</span>
        </div>
        
        <UpvoteButton id={resource.id} initialUpvotes={resource.upvotes || 0} />
      </div>
      </motion.div>
    </div>
  );
}
