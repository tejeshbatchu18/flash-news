# Flash News

Flash News is a responsive React news reader for browsing current headlines and
searching articles from GNews. The current app is focused on the home feed and
the core reading workflow; some planned persistence features are still pending.

## Tech Stack

- React 19
- Vite 7
- JavaScript and JSX (no TypeScript)
- Tailwind CSS 4 through `@tailwindcss/vite`
- GNews API v4 for article data

The project is frontend-only. Vite proxies local `/gnews` requests to GNews in
development, and Vercel uses the rewrite in `vercel.json` in production.

## Current Workflow

1. The home page requests top headlines for the selected category, using India
	as the country and English as the language.
2. Users can browse the available categories: Top, India, World, Business,
	Tech, Sports, Entertainment, Science, and Health.
3. Submitting a search term switches the request to the GNews search endpoint
	and sorts results by publication date from the API.
4. Results can be sorted locally from newest to oldest, and displayed in Quick,
	Standard, or Detailed reading views.
5. Each article card shows source, relative publication time, available image,
	summary, and a link to the original article.
6. Loading, empty, API error, retry, and browser offline states are handled in
	the UI.

## Project Structure

```
flash-news/
├── public/               Static assets served as-is
├── src/
│   ├── components/       Header, controls, article cards, and UI states
│   ├── pages/             Home screen and planned saved-news screen
│   ├── hooks/             News fetching and localStorage hooks
│   ├── services/          GNews API client and response normalisation
│   ├── utils/             Date formatting and planned cache helpers
│   ├── App.jsx           Application root
│   ├── main.jsx          React entry point
│   └── index.css          Tailwind import and global styles
├── .env.example           Environment variable template
├── index.html            Minimal HTML shell
├── vite.config.js         Vite, React, Tailwind, and GNews proxy config
├── vercel.json             Production GNews rewrite
└── package.json            Scripts and dependencies
```

## Getting Started

### Requirements

- Node.js 20 or newer recommended
- An API key from [GNews](https://gnews.io/)

### Install and run

```bash
npm install
copy .env.example .env
npm run dev
```

Add your key to `.env` before starting or restarting the development server:

```bash
VITE_NEWS_API_KEY=your_gnews_api_key
```

Open the URL printed by Vite, normally `http://localhost:5173`.

### Production build

```bash
npm run build
npm run preview
```

The production deployment can be hosted on Vercel. Configure
`VITE_NEWS_API_KEY` in the project environment settings before building.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Environment Variables

The app currently uses one Vite client-side variable:

```
VITE_NEWS_API_KEY=your_key_here
```

The key is read through `import.meta.env.VITE_NEWS_API_KEY`. Do not commit a
real key; `.env` is ignored by Git.

## Implementation Status

- [x] GNews service and article normalisation
- [x] Category-based top headlines
- [x] Article search
- [x] Newest/oldest sorting
- [x] Quick, Standard, and Detailed reading views
- [x] Loading, empty, error, retry, and offline banner states
- [x] Responsive layout with Tailwind CSS
- [ ] Functional localStorage article caching
- [ ] Saved/bookmarked article workflow
- [ ] Routing to the saved-news page

## AI Tool Disclosure

- Claude (Anthropic) was used to scaffold the initial project structure.
