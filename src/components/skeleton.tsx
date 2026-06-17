export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 flex flex-col h-full animate-pulse">
      <div className="flex justify-between items-start mb-3">
        <div className="h-5 w-20 bg-slate-200 dark:bg-slate-700 rounded-full" />
        <div className="flex gap-1">
          <div className="h-6 w-6 bg-slate-200 dark:bg-slate-700 rounded-lg" />
          <div className="h-6 w-6 bg-slate-200 dark:bg-slate-700 rounded-lg" />
          <div className="h-6 w-6 bg-slate-200 dark:bg-slate-700 rounded-lg" />
        </div>
      </div>
      <div className="space-y-2 mb-3">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/5" />
      </div>
      <div className="space-y-1.5 flex-grow">
        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-full" />
        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-5/6" />
        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-3/4" />
      </div>
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-slate-200 dark:bg-slate-700 rounded-lg" />
          <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
        </div>
        <div className="h-6 w-14 bg-slate-200 dark:bg-slate-700 rounded-full" />
      </div>
    </div>
  );
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
