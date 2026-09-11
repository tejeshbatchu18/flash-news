const FEATURES = [
  ['Trending', 'Top stories blended across five categories, newest first'],
  ['Categories', 'Nine sections — India, world, business, sport, health and more'],
  ['Search', 'Any topic, with inline validation and newest/oldest sorting'],
  ['Reading views', 'Quick, Standard and Detailed — no extra API requests'],
  ['Works offline', 'Articles cached on your device and served when the network drops'],
  ['Save and share', 'Keep articles for later, or send them on'],
];

function About() {
  return (
    <section id="about" className="mt-12 overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-6 py-5">
        <p className="text-xs font-semibold tracking-widest text-rose-700 uppercase">About</p>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
          A news reader built for a weak connection
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
          News sites are slow, cluttered and often unusable on limited data. Flash News is
          mobile-first: it loads fast, remembers where you left off, and keeps working when the
          network doesn’t.
        </p>
      </div>

      <dl className="grid gap-x-8 gap-y-5 px-6 py-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(([name, detail]) => (
          <div key={name} className="border-l-2 border-rose-700 pl-3">
            <dt className="text-sm font-semibold text-slate-900">{name}</dt>
            <dd className="mt-0.5 text-sm leading-relaxed text-slate-600">{detail}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-5 border-t border-slate-200 bg-slate-50 px-6 py-5 sm:grid-cols-2">
        <div>
          <h3 className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
            Data source
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            GNews API, free tier — ten articles per request with a 12-hour delay. Responses are
            cached in <code className="rounded border border-slate-200 bg-white px-1 py-0.5 text-xs text-slate-700">localStorage</code>{' '}
            for 15 minutes, so repeat views cost no requests.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
            Built with
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            React, Vite and Tailwind CSS. Frontend only — no server and no database.
          </p>
        </div>
      </div>

      <p className="border-t border-slate-200 px-6 py-4 text-xs text-slate-500">
        Built by React Rangers · PVPSIT Frontend Hackathon 2026
      </p>
    </section>
  );
}

export default About;