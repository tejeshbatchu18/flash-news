# Flash News

A modern, responsive news application built with React and Vite. Flash News delivers top news stories with powerful filtering, searching, bookmarking, and offline capabilities.

## Features

### 📰 News Discovery
- **Flash Ticker** - Scrolling marquee of top headlines at the top of the feed
- **Category Browsing** - Filter news by categories (general, business, sports, technology, etc.)
- **Search** - Full-text search across all available news articles
- **Top Headlines** - Curated top stories from India, updated from GNews API
- **News Grid** - Beautiful, responsive card layout displaying articles

### 🎯 Reading Experience
- **Multiple Depth Levels** - Choose your reading style:
  - **Quick** - Headlines and source only
  - **Standard** - Headline, summary, and image
  - **Detailed** - Full article content with all details
- **Sort Options** - View articles newest first or oldest first
- **Responsive Design** - Seamless experience on mobile, tablet, and desktop

### 🔖 Save & Offline Access
- **Bookmarking** - Save articles to your personal collection for later reading
- **Offline Support** - Saved articles are stored locally and available without internet
- **Saved News Page** - Dedicated page to view all bookmarked articles
- **LocalStorage Persistence** - All preferences and bookmarks survive browser refreshes

### 🎨 User Interface
- **Offline Banner** - Visual indicator when connection is lost
- **Loading States** - Skeleton loaders while fetching articles
- **Error Handling** - User-friendly error messages with retry functionality
- **Empty States** - Helpful messages when no articles are found
- **Keyboard Accessible** - Full accessibility support with proper ARIA labels

### 📊 Smart Caching & Error Recovery
- **Cache Detection** - Shows when articles are from saved cache
- **API Error Handling** - Comprehensive error messages for API failures
- **Retry Mechanism** - One-click retry for failed requests
- **Request Cancellation** - Aborts stale requests to prevent race conditions

## Tech Stack

- **React 19.1** - UI framework with hooks
- **Vite 7** - Lightning-fast build tool
- **Tailwind CSS 4.1** - Utility-first CSS
- **GNews API** - News data source (free tier, 12-hour delay)
- **JavaScript (JSX)** - No TypeScript

**Frontend only** — no backend server required. All data comes from the GNews API.

## Project Structure

```
FlashNews/
├── public/                    Static assets (favicon, etc.)
├── src/
│   ├── components/
│   │   ├── About.jsx          Footer with project info
│   │   ├── CategoryBar.jsx    Category selector buttons
│   │   ├── EmptyState.jsx     Message when no articles found
│   │   ├── ErrorState.jsx     Error display with retry button
│   │   ├── FilterBar.jsx      Sort and count display
│   │   ├── FlashTicker.jsx    Scrolling headline ticker
│   │   ├── Header.jsx         Top navigation and branding
│   │   ├── LoadingState.jsx   Skeleton loaders
│   │   ├── NewsCard.jsx       Individual article card
│   │   ├── NewsDepth.jsx      Reading depth selector
│   │   ├── NewsGrid.jsx       Grid layout for articles
│   │   ├── OfflineBanner.jsx  Connection status indicator
│   │   └── SearchBar.jsx      Search input with clear button
│   ├── pages/
│   │   ├── Home.jsx           Main news feed page
│   │   └── SavedNews.jsx      Bookmarked articles page
│   ├── hooks/
│   │   ├── useNews.js         Fetch articles from API
│   │   ├── useLocalStorage.js Persist state to browser storage
│   │   └── useBookmarks.js    Manage saved articles
│   ├── services/
│   │   └── newsApi.js         GNews API client
│   ├── utils/
│   │   ├── cache.js           TODO: Cache implementation
│   │   └── formatDate.js      Date formatting utilities
│   ├── App.jsx                Router and app root
│   ├── main.jsx               React entry point
│   └── index.css              Tailwind config and base styles
├── index.html                 HTML shell
├── vite.config.js             Vite configuration
├── package.json               Dependencies
├── vercel.json                Vercel deployment config
└── .env.example               Environment variable template
```

## Tailwind Setup

This project uses **Tailwind CSS v4**, configured through the Vite plugin (`@tailwindcss/vite` in `vite.config.js`) with a single `@import "tailwindcss";` at the top of `src/index.css`. No separate `tailwind.config.js` or `postcss.config.js` needed — v4 handles everything automatically.

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm

### Getting Started

1. **Clone and install:**
   ```bash
   cd FlashNews
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Add your GNews API key:
   ```
   VITE_NEWS_API_KEY=your_api_key_here
   ```
   Get a free key at [gnews.io](https://gnews.io)

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173 in your browser

4. **Build for production:**
   ```bash
   npm run build
   npm run preview  # Preview production build
   ```

## API Configuration

The app uses the **GNews API** (free tier):
- **12-hour delay** - News are delayed by 12 hours to respect copyright
- **Country: India** - Focused on Indian news
- **Rate limit** - Check your API dashboard for daily request limits
- **Language** - English only

### GNews API Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| `/top-headlines` | Fetch news by category |
| `/search` | Full-text search across articles |

Both return normalized article data with title, description, content, image, publish date, and source.

## Core Components & Features

### Pages
- **Home** (`src/pages/Home.jsx`) - Main news feed with all filtering options
- **SavedNews** (`src/pages/SavedNews.jsx`) - View bookmarked articles (works offline)

### Key Hooks
- `useNews()` - Manages article fetching, loading states, error handling, and request cancellation
- `useLocalStorage()` - Syncs React state with browser localStorage
- `useBookmarks()` - Bookmark management with toggle functionality

### State Management
All state is persisted via localStorage:
- `flashnews:category` - Currently selected category
- `flashnews:query` - Active search query
- `flashnews:depth` - Reading depth preference (quick/standard/detailed)
- `flashnews:sort` - Sort order (newest/oldest)
- `flashnews:bookmarks` - Array of saved article objects

### Error Handling
Comprehensive error messages for common API issues:
- Missing or invalid API key
- API key rejected or inactive
- Daily request limit reached
- GNews service downtime
- Network connectivity issues

## Development Plan - Implementation Status

| Phase | Status | Details |
|-------|--------|---------|
| 1. Project skeleton | ✅ Done | Folder structure, configs, Tailwind setup |
| 2. News API & `useNews` hook | ✅ Done | Article fetching with error handling |
| 3. Flash news & category feed | ✅ Done | FlashTicker, CategoryBar, NewsGrid |
| 4. Search & filtering | ✅ Done | SearchBar, CategoryBar, FilterBar |
| 5. News depth levels | ✅ Done | Quick/Standard/Detailed reading modes |
| 6. LocalStorage & offline | ✅ Done | Persistence, bookmarking, offline viewing |
| 7. Loading/empty/error states | ✅ Done | LoadingState, EmptyState, ErrorState components |
| 8. Bookmarks & saved news | ✅ Done | Bookmark system with SavedNews page |
| 9. Polish & accessibility | ✅ Done | Responsive design, ARIA labels, keyboard support |

## Deployment

The app is configured for **Vercel** deployment:
- `vercel.json` contains build configuration
- Deploy directly from GitHub repository
- Environment variables configured in Vercel dashboard
- Automatic deployments on git push

## Troubleshooting

### No articles appearing?
- Check API key is valid in `.env`
- Check daily API request limit hasn't been exceeded
- Open browser DevTools → Network tab to inspect API responses

### Articles show as "from cache"?
- App uses previous data when API isn't updated
- Click refresh to force fetch new data

### Offline mode not working?
- Ensure you've bookmarked some articles while online
- Saved articles are always available offline
- Check browser's localStorage isn't disabled

### Changes not persisting?
- Ensure localStorage is enabled in browser
- Check browser's storage quota isn't exceeded
- Open DevTools → Application → Local Storage to debug

## Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- **Requirements**: ES2020+ JavaScript support

## License

Open source project. See LICENSE file for details.

## Credits

Built with ❤️ using:
- **React** for UI components
- **Vite** for blazing fast development
- **Tailwind CSS** for styling
- **GNews API** for news data
- **Claude (Anthropic)** for project scaffolding
