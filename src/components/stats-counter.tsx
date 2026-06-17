"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  label: string;
  value: string;
  numeric: number;
  suffix: string;
}

function Counter({ numeric, suffix, duration = 1500 }: { numeric: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * numeric));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(numeric);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [numeric, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const STATS: Stat[] = [
  { label: "Resources", value: "10,000+", numeric: 10000, suffix: "+" },
  { label: "Categories", value: "15+", numeric: 15, suffix: "+" },
  { label: "Platforms", value: "50+", numeric: 50, suffix: "+" },
  { label: "Engineers", value: "50K+", numeric: 50000, suffix: "K+" },
];

export function StatsCounter({ categoryCount }: { categoryCount: number }) {
  const stats = [
    { label: "Resources", numeric: 10000, suffix: "+" },
    { label: "Categories", numeric: categoryCount, suffix: "" },
    { label: "Platforms", numeric: 50, suffix: "+" },
    { label: "Engineers", numeric: 50, suffix: "K+" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-center shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all"
        >
          <p className="text-2xl font-black text-blue-600 dark:text-blue-400">
            <Counter numeric={s.numeric} suffix={s.suffix} />
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
