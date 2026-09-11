const CATEGORIES = [
  { id: 'general', label: 'Top' },
  { id: 'nation', label: 'India' },
  { id: 'world', label: 'World' },
  { id: 'business', label: 'Business' },
  { id: 'technology', label: 'Tech' },
  { id: 'sports', label: 'Sports' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'science', label: 'Science' },
  { id: 'health', label: 'Health' },
];

function CategoryBar({ value, onChange }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4">
      <div className="flex w-max gap-2 pb-1">
        {CATEGORIES.map((category) => {
          const active = category.id === value;
          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(category.id)}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 ${
                active
                  ? 'border-rose-700 bg-rose-700 text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryBar;