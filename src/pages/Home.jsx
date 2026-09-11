import { useMemo } from 'react';
import Header from '../components/Header.jsx';
import FlashTicker from '../components/FlashTicker.jsx';
import SearchBar from '../components/SearchBar.jsx';
import CategoryBar from '../components/CategoryBar.jsx';
import FilterBar from '../components/FilterBar.jsx';
import NewsDepth from '../components/NewsDepth.jsx';
import NewsGrid from '../components/NewsGrid.jsx';
import LoadingState from '../components/LoadingState.jsx';
import EmptyState from '../components/EmptyState.jsx';
import ErrorState from '../components/ErrorState.jsx';
import OfflineBanner from '../components/OfflineBanner.jsx';
import useNews from '../hooks/useNews.js';
import useLocalStorage from '../hooks/useLocalStorage.js';
import useBookmarks from '../hooks/useBookmarks.js';

function Home() {
  const [category, setCategory] = useLocalStorage('flashnews:category', 'general');
  const [query, setQuery] = useLocalStorage('flashnews:query', '');
  const [depth, setDepth] = useLocalStorage('flashnews:depth', 'standard');
  const [sort, setSort] = useLocalStorage('flashnews:sort', 'newest');

  const { articles, status, error, fromCache, retry } = useNews({ category, query });
  const { bookmarks, isBookmarked, toggleBookmark } = useBookmarks();

  function handleCategoryChange(nextCategory) {
    setQuery('');
    setCategory(nextCategory);
  }

  const sortedArticles = useMemo(() => {
    return [...articles].sort((a, b) => {
      const aTime = new Date(a.publishedAt).getTime() || 0;
      const bTime = new Date(b.publishedAt).getTime() || 0;
      return sort === 'newest' ? bTime - aTime : aTime - bTime;
    });
  }, [articles, sort]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <OfflineBanner />
      <Header savedCount={bookmarks.length} active="home" />
      <FlashTicker articles={articles} />

      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Flash News</h1>
        <p className="mt-1 text-sm text-slate-600">
          Top stories from India · free GNews tier, 12-hour delay
        </p>

        <div className="mt-6 space-y-3">
          <SearchBar
            onSearch={setQuery}
            onClear={() => setQuery('')}
            isLoading={status === 'loading'}
            activeQuery={query}
          />
          <CategoryBar value={query ? '' : category} onChange={handleCategoryChange} />
          <NewsDepth value={depth} onChange={setDepth} />
          <FilterBar
            sort={sort}
            onSortChange={setSort}
            count={sortedArticles.length}
            activeQuery={query}
          />
        </div>

        {fromCache && status === 'success' && (
          <p className="mt-4 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-900">
            Showing saved articles — not refreshed from GNews.
          </p>
        )}

        <div className="mt-6">
          {status === 'loading' && <LoadingState depth={depth} />}
          {status === 'error' && <ErrorState message={error} onRetry={retry} />}
          {status === 'empty' && <EmptyState query={query} onClear={() => setQuery('')} />}
          {status === 'success' && (
            <NewsGrid
              articles={sortedArticles}
              depth={depth}
              isBookmarked={isBookmarked}
              onToggleBookmark={toggleBookmark}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;