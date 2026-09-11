function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-3">
        
        <a  href="/"
          className="flex items-center gap-2 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
        >
          <span className="grid h-7 w-7 place-content-center rounded bg-rose-700 text-sm font-bold text-white">
            F
          </span>
          <span className="text-base font-bold tracking-tight text-slate-900">Flash News</span>
        </a>

        <p className="text-xs text-slate-500">Powered by GNews</p>
      </div>
    </header>
  );
}

export default Header;