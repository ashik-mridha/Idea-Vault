const CardGridSkeleton = ({ count = 6 }) => (
  <div
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    role="status"
    aria-label="Loading ideas"
  >
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className="card overflow-hidden animate-pulse">
        <div className="h-48 bg-slate-200 dark:bg-slate-800" />
        <div className="p-4 space-y-3">
          <div className="h-3 w-1/4 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-10 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    ))}
  </div>
);

export default CardGridSkeleton;
