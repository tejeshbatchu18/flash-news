import Header from '../components/Header.jsx';
import NewsGrid from '../components/NewsGrid.jsx';
import NewsDepth from '../components/NewsDepth.jsx';
import EmptyState from '../components/EmptyState.jsx';
import OfflineBanner from '../components/OfflineBanner.jsx';
import useBookmarks from '../hooks/useBookmarks.js';
import useLocalStorage from '../hooks/useLocalStorage.js';

function SavedNews() {
  const { bookmarks, isBookmarked, toggleBookmark } = useBookmarks();
  const [depth, setDepth] = useLocalStorage('flashnews:depth', 'standard');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <OfflineBanner />
      <Header savedCount={bookmarks.length} active="saved" />

      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Saved News</h1>
        <p className="mt-1 text-sm text-slate-600">
          Stored on this device — available offline.
        </p>

        {bookmarks.length > 0 && (
          <div className="mt-6">
            <NewsDepth value={depth} onChange={setDepth} />
          </div>
        )}

        <div className="mt-6">
          {bookmarks.length === 0 ? (
            <EmptyState
              title="No saved articles yet"
              message="Tap Save on any headline and it will appear here, even offline."
            />
          ) : (
            <NewsGrid
              articles={bookmarks}
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

export default SavedNews;