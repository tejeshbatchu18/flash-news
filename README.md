# Flash News

A fast, mobile-first news reader for people on a weak or limited connection.

**Live:** https://flash-news-six.vercel.app
**Repo:** https://github.com/tejeshbatchu18/flash-news

---

## Scope Card 

> **Problem:** People want to quickly catch up on news, but many news platforms are slow, cluttered, and unreliable on weak or limited internet connections.
>
> **Target user:** Mobile users who want to quickly discover, search, and read news throughout the day.
>
> **Core features:** Flash ticker + latest/category news feed · Search and category filtering · Quick, Standard and Detailed reading views · Offline news with persistent caching · Loading, empty, error and validation states
>
> **Stretch features:** Saved/bookmarked articles · AI-powered news summaries
>
> **Data source:** GNews API + localStorage cache

## What shipped against that card

| Card item | Status | Where it lives |
|---|---|---|
| Flash ticker + category feed | **Delivered** | `FlashTicker.jsx`, `CategoryBar.jsx`, `useNews.js` |
| Search and category filtering | **Delivered** | `SearchBar.jsx`, `FilterBar.jsx` |
| Quick / Standard / Detailed views | **Delivered** | `NewsDepth.jsx`, `NewsCard.jsx`, `NewsGrid.jsx` |
| Offline news with persistent caching | **Delivered** | `cache.js`, `useLocalStorage.js`, `OfflineBanner.jsx` |
| Loading, empty, error, validation states | **Delivered** | `LoadingState.jsx`, `EmptyState.jsx`, `ErrorState.jsx`, `SearchBar.jsx` |
| *Stretch:* saved / bookmarked articles | **Delivered** | `useBookmarks.js`, `SavedNews.jsx` |
| *Stretch:* AI-powered news summaries | **Not delivered** | See below |

**Also built, beyond the card:** a Trending feed that blends five categories, and article sharing.

### Why AI summaries were not delivered

We declared this stretch feature and did not ship it. The reason was a constraint we ran into rather than time: a frontend-only app has nowhere to hide an API key, because anything in the JavaScript bundle is readable in DevTools. Shipping a live LLM credential on a public URL for anyone to copy was not a trade we were willing to make, and adding a server to hide it would have meant abandoning the frontend-only brief.

With the time that freed up we hardened what we had already promised — caching, offline fallback and the state handling — which the rubric weights far more heavily than an AI feature it awards no marks for.

---

## Features

- **Trending** — top stories blended across five categories in parallel, deduplicated, newest first
- **Nine categories** — India, world, business, tech, sport, entertainment, science, health, plus top stories
- **Search** — with inline validation, a 400-character cap, and newest/oldest sorting
- **Three reading views** — Quick (dense list), Standard (cards), Detailed (full available text). Switching costs zero API requests
- **Works offline** — the last successful response per category is cached; a failed request falls back to it with a visible notice
- **Preferences persist** — category, reading view, sort order and search survive a refresh
- **Save and share** — bookmark articles to a separate page, share via the Web Share API with a clipboard fallback

---

## Tech Stack

- **React 19** — no class components, no state library
- **Vite 7** — dev server and build
- **Tailwind CSS v4** — configured through the Vite plugin; no `tailwind.config.js` needed
- **No router library** — two screens are served by a 12-line hash router in `App.jsx`
- **No backend** — frontend only

---

## Architecture

Data flows in one direction and nothing skips a layer.

```
newsApi.js  →  useNews()  →  Home.jsx  →  LoadingState / ErrorState / EmptyState / NewsGrid
   ↕                ↕
cache.js      useLocalStorage()
   ↕                ↕
        localStorage
```

**`services/newsApi.js`** is the only file that knows a network exists. It builds requests, maps GNews's response into our own flat article shape, and translates HTTP status codes into sentences a person can read. Swapping providers touches this file and nothing else.

**`hooks/useNews.js`** owns request state as a single `status` string — `idle | loading | success | error | empty` — rather than separate booleans. Booleans can represent contradictions (loading *and* error at once, which is how frozen spinners happen); one status can only ever be in one state, so the UI cannot disagree with itself. It also aborts in-flight requests when the category or query changes, so a slow old response can never overwrite a newer one.

**`utils/cache.js`** stores each feed under a key with a timestamp. A cache entry under 15 minutes old is served immediately with no network request at all. When a request fails, a *stale* entry is served instead of an error, with a notice in the UI.

**Components are presentational.** None of them call `fetch`. `Home.jsx` reads `status` and renders exactly one of four things.

### Two problems worth documenting

**CORS on the deployed origin.** GNews accepts browser requests from `localhost` but not from our Vercel domain. Rather than add a server, `vercel.json` rewrites `/gnews/*` to the GNews API, so the browser makes a same-origin request and Vercel forwards it server-side. The Vite dev proxy mirrors the same path locally, so development and production behave identically.

**Quota.** The free tier allows 100 requests per day, which is tight with a team testing at once. The 15-minute cache is what makes it workable — revisiting a category costs nothing, so only genuinely new requests count against the limit. When the limit is reached, the error message says so explicitly rather than blaming the key.

---

## Robustness — the seven stress tests

| # | Judge action | How the app responds |
|---|---|---|
| 1 | Resize to 375px | Single-column cards; category pills and ticker scroll inside their own containers; the page body never scrolls sideways |
| 2 | Refresh mid-flow | Category, search, reading view and sort are restored from `localStorage` |
| 3 | Submit an empty search | Inline validation message with `role="alert"`; no crash, no silence |
| 4 | Paste 400 characters | Input is capped at 400 with a visible counter; `min-w-0` keeps the layout intact |
| 5 | Double-click submit | Button is disabled while a request is in flight and its label changes to "Searching…" |
| 6 | Search for nothing | Empty state naming the query, with a "Clear search" action |
| 7 | Go offline | Amber offline banner plus cached articles, or a readable error with a Retry button. Never an endless spinner |

Also checked: no console errors on load, and a visible focus ring on every interactive element.

---

## Setup

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

### Environment variables

Copy `.env.example` to `.env` and add your GNews key:

```
VITE_NEWS_API_KEY=your_key
```

Vite reads `.env` only at startup, so restart the dev server after editing it.

For deployment, the same variable must be added in **Vercel → Settings → Environment Variables**, followed by a redeploy — Vite bakes it into the bundle at build time, so adding it does nothing until a new build runs.

> **Note on secrecy:** a frontend environment variable is not a secret. It ships inside the bundle and anyone can read it in DevTools. `.env` keeps the key out of the public repo, nothing more. Hiding it would require a backend, which this project deliberately does not have.

---

## Project structure

```
FlashNews/
├── public/               Static assets (logo, favicon)
├── src/
│   ├── components/       Presentational UI — no data fetching
│   ├── pages/            Home and SavedNews
│   ├── hooks/            useNews, useLocalStorage, useBookmarks
│   ├── services/         newsApi.js — the only file that calls fetch
│   ├── utils/            cache.js, formatDate.js
│   ├── App.jsx           Hash router
│   ├── main.jsx          React entry
│   └── index.css         Tailwind import, base styles, ticker animation
├── vercel.json           Rewrite that proxies GNews to avoid CORS
└── vite.config.js        React + Tailwind plugins, dev proxy
```

---

## Known limitations

These are GNews free-tier constraints, not bugs, and they are surfaced in the UI rather than hidden:

- **100 requests per day** — mitigated by the 15-minute cache, but a heavy testing session can exhaust it
- **Ten articles per request** — the free plan's hard ceiling
- **12-hour delay** — real-time availability is a paid feature, so the subtitle says so plainly rather than claiming live news
- **Truncated article text** — full content is paid-only. "Detailed" view shows the description plus whatever content is available, then links out to the publisher. We do not pretend to host the full article
- **Trending costs five requests** per fresh load, absorbed by the cache

---

## AI Tool Disclosure

Per the hackathon AI policy:

- *Claude (Anthropic)* — used most heavily on *state handling* (the useNews
  status machine, the useLocalStorage persistence hook, and the caching logic in
  cache.js) and on *Tailwind styling* (utility classes, the responsive
  breakpoints, and the dark theme palette). It was also used during the wider build
  for project scaffolding, the GNews service layer, component structure, and
  debugging — notably the CORS failure on the deployed origin.

No other AI tools were used.

All code in this repository has been read by the team. Every member can explain and
modify the files they own, and the design decisions behind them — the single status
string over booleans, the abort-on-change cleanup, the stale-cache fallback — were
reviewed and understood rather than accepted as generated.

---
## Sources

### GNews API

Flash News uses the **GNews API** as its primary news data source.

GNews is a REST API that provides access to current and historical news articles from thousands of sources worldwide. It returns structured JSON data containing information such as article titles, descriptions, images, publication dates, article URLs, and source details.

In Flash News, GNews is used for:

- **Top Headlines:** Fetching the latest news for the main news feed.
- **Category News:** Loading news by categories such as World, Business, Technology, Sports, Entertainment, Science, and Health.
- **News Search:** Searching articles based on keywords entered by the user.
- **Article Metadata:** Providing titles, descriptions, images, publication times, source names, and links to the original articles.

The application integrates with GNews through its `top-headlines` and `search` API endpoints. The API response is normalized inside the application's service layer before being passed to the React components, keeping the UI independent of the external API response format.

GNews API documentation:
https://docs.gnews.io/

GNews website:
https://gnews.io/

---
## Code ownership

| Area | Files |
|---|---|
| Data layer | `services/newsApi.js`, `hooks/useNews.js`, `utils/cache.js` |
| Feed and cards | `NewsGrid.jsx`, `NewsCard.jsx`, `NewsDepth.jsx`, `utils/formatDate.js` |
| Controls | `SearchBar.jsx`, `CategoryBar.jsx`, `FilterBar.jsx`, `hooks/useLocalStorage.js` |
| States and shell | `LoadingState.jsx`, `EmptyState.jsx`, `ErrorState.jsx`, `OfflineBanner.jsx`, `Header.jsx`, `FlashTicker.jsx`, `App.jsx` |

---

## React Rangers

Dhanush · Tejesh · Balaji · Sai Prakash
PVPSIT Frontend Hackathon
