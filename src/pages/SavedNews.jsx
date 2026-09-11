import Header from '../components/Header.jsx';

// Bookmark logic will be added in a later step.
function SavedNews() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Saved News</h1>
        <p className="mt-2 text-sm text-slate-600">No saved articles yet.</p>
      </main>
    </div>
  );
}

export default SavedNews;
