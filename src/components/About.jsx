const FEATURES = [
  ['Trending', 'Top stories blended across five categories, newest first'],
  ['Categories', 'Nine sections from India, world, business to health'],
  ['Search', 'Query any topic with inline validation and sorting'],
  ['Reading views', 'Quick, Standard and Detailed — no extra requests'],
  ['Works offline', 'Articles cached on your device and served when the network drops'],
  ['Save and share', 'Keep articles for later or send them on'],
];

function About() {
  return (
    <section id="about" className="mt-12 rounded-lg border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-bold tracking-tight text-slate-900">About Flash News</h2>

      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
        News sites are slow, cluttered and often unusable on a weak connection. Flash News is a
        mobile-first reader built for students checking headlines on mobile data between classes —
        it loads fast, remembers where you left off, and keeps working when the network doesn’t.
      </p>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(([name, detail]) => (
          <div key={name}>
            <dt className="text-sm font-semibold text-slate-900">{name}</dt>
            <dd className="mt-0.5 text-sm text-slate-600">{detail}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 grid gap-4 border-t border-slate-200 pt-5 text-sm sm:grid-cols-2">
        <div>
          <h3 className="font-semibold text-slate-900">Data source</h3>
          <p className="mt-0.5 text-slate-600">
            GNews API, free tier — ten articles per request with a 12-hour delay. Responses are
            cached in <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">localStorage</code>{' '}
            for 15 minutes so repeat views cost no requests.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">Built with</h3>
          <p className="mt-0.5 text-slate-600">
            React, Vite and Tailwind CSS. Frontend only — no server, no database.
          </p>
        </div>
      </div>

      <p className="mt-5 border-t border-slate-200 pt-4 text-xs text-slate-500">
        Built by React Rangers · PVPSIT Frontend Hackathon 2026
      </p>
    </section>
  );
}

export default About;