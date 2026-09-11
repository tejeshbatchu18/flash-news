import { truncate, LIMITS } from '../utils/text.js';

const SORTS = [
  { id: 'newest', label: 'Newest first' },
  { id: 'oldest', label: 'Oldest first' },
];

function FilterBar({ sort, onSortChange, count, activeQuery }) {
  const shown = truncate(activeQuery, LIMITS.query);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="min-w-0 max-w-full text-sm break-words text-slate-600">
        {shown && (
          <>
            Results for <span className="font-medium text-slate-900">“{shown}”</span>
            <span aria-hidden="true"> · </span>
          </>
        )}
        {count} {count === 1 ? 'article' : 'articles'}
      </p>

      <div className="flex shrink-0 items-center gap-2">
        <label htmlFor="sort-order" className="text-xs font-medium tracking-wide text-slate-500 uppercase">
          Sort
        </label>
        <select
          id="sort-order"
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
        >
          {SORTS.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FilterBar;