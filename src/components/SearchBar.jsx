import { useState } from 'react';

const MAX_LENGTH = 400;

function SearchBar({ onSearch, onClear, isLoading, activeQuery }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const term = value.trim();

    if (!term) {
      setError('Type something to search for.');
      return;
    }
    if (term.length < 2) {
      setError('Search needs at least 2 characters.');
      return;
    }

    setError('');
    onSearch(term);
  }

  function handleChange(event) {
    setValue(event.target.value);
    if (error) setError('');
  }

  function handleClear() {
    setValue('');
    setError('');
    onClear();
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="news-search" className="sr-only">
          Search news
        </label>
        <input
          id="news-search"
          type="text"
          value={value}
          onChange={handleChange}
          maxLength={MAX_LENGTH}
          placeholder="Search headlines…"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'search-error' : undefined}
          className={`w-full min-w-0 flex-1 rounded-lg border bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 ${
            error ? 'border-rose-600' : 'border-slate-300'
          }`}
        />

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-lg bg-rose-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isLoading ? 'Searching…' : 'Search'}
          </button>

          {activeQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-slate-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {error && (
        <p id="search-error" role="alert" className="mt-1.5 text-sm text-rose-700">
          {error}
        </p>
      )}

      {!error && value.length >= MAX_LENGTH && (
        <p className="mt-1.5 text-xs text-slate-500">
          Maximum {MAX_LENGTH} characters reached.
        </p>
      )}
    </form>
  );
}

export default SearchBar;