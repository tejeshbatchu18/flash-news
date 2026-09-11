import { useState } from 'react';
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

function Home() {
  const [category, setCategory] = useState('general');
  const [depth, setDepth] = useState('standard');
  const { articles, status, error } = useNews({ category });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <OfflineBanner />
      <Header />
      <FlashTicker articles={articles} />

      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Flash News</h1>
        <p className="mt-1 text-sm text-slate-600">
          Headlines from India, updated continuously.
        </p>

        <div className="mt-6 space-y-3">
          <SearchBar />
          <CategoryBar value={category} onChange={setCategory} />
          <NewsDepth value={depth} onChange={setDepth} />
          <FilterBar />
        </div>

        <div className="mt-6">
          {status === 'loading' && <LoadingState />}
          {status === 'error' && <ErrorState message={error} />}
          {status === 'empty' && <EmptyState />}
          {status === 'success' && <NewsGrid articles={articles} depth={depth} />}
        </div>
      </main>
    </div>
  );
}

export default Home;