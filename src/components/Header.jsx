function Header({ savedCount = 0, active = 'home' }) {
  const base = 'rounded px-2.5 py-1 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600';
  const on = 'bg-rose-700 text-white';
  const off = 'text-slate-600 hover:text-slate-900';

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <a href="#/" className="flex items-center gap-2 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
          <span className="grid h-7 w-7 place-content-center rounded bg-rose-700 text-sm font-bold text-white">F</span>
          <span className="text-base font-bold tracking-tight text-slate-900">Flash News</span>
        </a>
        <nav className="flex items-center gap-1">
          <a href="#/" aria-current={active === 'home' ? 'page' : undefined} className={`${base} ${active === 'home' ? on : off}`}>Headlines</a>
          <a href="#/saved" aria-current={active === 'saved' ? 'page' : undefined} className={`${base} ${active === 'saved' ? on : off}`}>Saved{savedCount > 0 ? ` (${savedCount})` : ''}</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;