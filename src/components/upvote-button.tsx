"use client";

import { useState } from "react";
import { ThumbsUp } from "lucide-react";
import { upvoteResource } from "@/app/actions";

export function UpvoteButton({ id, initialUpvotes }: { id?: number, initialUpvotes: number }) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const handleUpvote = async () => {
    if (hasUpvoted) return;
    
    setHasUpvoted(true);
    setUpvotes(prev => prev + 1);
    
    if (id) {
       await upvoteResource(id);
    }
  };

  return (
    <button 
      onClick={(e) => {
        e.preventDefault();
        handleUpvote();
      }}
      disabled={hasUpvoted}
      className={`flex items-center gap-1.5 text-sm transition-colors ${hasUpvoted ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-blue-600'}`}
    >
      <ThumbsUp className={`w-4 h-4 ${hasUpvoted ? 'fill-blue-600' : ''}`} />
      <span>{upvotes}</span>
    </button>
  );
}
