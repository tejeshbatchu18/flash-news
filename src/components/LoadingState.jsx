function LoadingState({ depth = 'standard' }) {
  const columns =
    depth === 'quick'
      ? 'grid-cols-1'
      : depth === 'detailed'
        ? 'grid-cols-1 lg:grid-cols-2'
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid gap-4 ${columns}`} role="status" aria-busy="true">
      <span className="sr-only">Loading articles…</span>

      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          {depth !== 'quick' && (
            <div className={`w-full animate-pulse bg-slate-200 ${depth === 'detailed' ? 'h-56' : 'h-40'}`} />
          )}
          <div className="flex flex-col gap-3 p-4">
            <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingState;