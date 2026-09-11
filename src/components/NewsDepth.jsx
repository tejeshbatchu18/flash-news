const DEPTHS = [
  { id: 'quick', label: 'Quick' },
  { id: 'standard', label: 'Standard' },
  { id: 'detailed', label: 'Detailed' },
];

function NewsDepth({ value, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs font-medium tracking-wide text-slate-500 uppercase">
        Reading view
      </span>
      <div
        role="group"
        aria-label="Reading view"
        className="inline-flex rounded-lg border border-slate-300 bg-white p-0.5"
      >
        {DEPTHS.map((depth) => {
          const active = depth.id === value;
          return (
            <button
              key={depth.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(depth.id)}
              className={`rounded-md px-3 py-1.5 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 ${
                active ? 'bg-rose-700 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {depth.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default NewsDepth;