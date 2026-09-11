function FlashTicker({ articles = [] }) {
  const headlines = articles.slice(0, 6).map((a) => a.title);
  if (headlines.length === 0) return null;

  const loop = [...headlines, ...headlines];

  return (
    <div className="ticker border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-3 px-4 py-2">
        <span className="shrink-0 rounded bg-rose-700 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
          Flash
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div className="ticker-track text-sm whitespace-nowrap text-slate-700">
            {loop.map((title, index) => (
              <span key={index} className="shrink-0">{title}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlashTicker;