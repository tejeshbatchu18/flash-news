function EmptyState({ query, onClear, title, message }) {
  const heading =
    title || (query ? `No stories match “${query}”` : 'Nothing in this category right now');

  const body =
    message ||
    (query
      ? 'Try a shorter or more general word. The free GNews tier searches the last 30 days only.'
      : 'GNews returned no articles for this category. Try another one.');

  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      <h2 className="text-base font-semibold text-slate-900">{heading}</h2>
      <p className="max-w-sm text-sm text-slate-600">{body}</p>

      {query && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="mt-1 rounded-lg bg-rose-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
        >
          Clear search
        </button>
      )}
    </div>
  );
}

export default EmptyState;