# Flash News

## Description

A modern, responsive news website. It will provide flash/latest news, category
browsing, search, multiple news-detail levels, offline caching and robust
loading / empty / error states.

This repository currently contains the **project skeleton only** — the folder
structure, configuration and placeholder files. Features are implemented step by
step.

## Tech Stack

- React
- Vite
- JavaScript (JSX) — no TypeScript
- Tailwind CSS

Frontend only. There is no backend in this project.

## Project Structure

```
FlashNews/
├── public/               Static assets served as-is (favicon, etc.)
├── src/
│   ├── components/       Reusable UI pieces (header, cards, states, bars)
│   ├── pages/            Top-level screens (Home, SavedNews)
│   ├── hooks/            Custom React hooks (data fetching, localStorage)
│   ├── services/         External data access (News API client)
│   ├── utils/            Pure helpers (caching, date formatting)
│   ├── App.jsx           Application root
│   ├── main.jsx          React entry point
│   └── index.css         Tailwind import and base styles
├── .env.example          Template for environment variables
├── index.html            Minimal HTML shell
├── vite.config.js        Vite + React + Tailwind plugins
└── package.json
```

## Tailwind Setup

This project uses **Tailwind CSS v4**, which is configured through the Vite
plugin (`@tailwindcss/vite` in `vite.config.js`) plus a single
`@import "tailwindcss";` at the top of `src/index.css`. There is intentionally
no `tailwind.config.js` and no `postcss.config.js` — v4 does not need them.
Theme customisation, when we need it, goes in `index.css` under `@theme`.

## Setup

```bash
npm install
npm run dev
```

Then open the URL Vite prints (http://localhost:5173 by default).

Production build:

```bash
npm run build
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env` and add your News API key:

```
VITE_NEWS_API_KEY=your_key_here
```

The key is read in code via `import.meta.env.VITE_NEWS_API_KEY`. No real key is
stored in this repository, and `.env` is git-ignored.

## Development Plan

Features are built one at a time, on top of this skeleton:

1. Project skeleton (done)
2. News API service + `useNews` hook
3. Flash news and category feed
4. Search and filtering
5. News depth (short / medium / detailed)
6. localStorage caching and offline mode
7. Loading, empty and error states everywhere
8. Bookmarks / saved news
9. Polish, responsiveness at 375px, accessibility

## AI Tool Disclosure

- Claude (Anthropic) — used to scaffold the initial project structure.
