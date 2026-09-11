import Header from '../components/Header.jsx';
import FlashTicker from '../components/FlashTicker.jsx';
import SearchBar from '../components/SearchBar.jsx';
import CategoryBar from '../components/CategoryBar.jsx';
import FilterBar from '../components/FilterBar.jsx';
import NewsGrid from '../components/NewsGrid.jsx';
import OfflineBanner from '../components/OfflineBanner.jsx';

function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <OfflineBanner />
      <Header />
      <FlashTicker />

      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Flash News</h1>
        <p className="mt-2 text-sm text-slate-600">Latest news is coming soon...</p>

        <div className="mt-6 space-y-3">
          <SearchBar />
          <CategoryBar />
          <FilterBar />
        </div>

        <div className="mt-6">
          <NewsGrid />
        </div>
      </main>
    </div>
  );
}

export default Home;
