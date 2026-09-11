import { useCallback, useEffect, useState } from 'react';
import { getTopHeadlines, searchNews } from '../services/newsApi.js';

export function useNews({ category = 'general', query = '' } = {}) {
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  // ErrorState's Retry button calls this.
  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    async function load() {
      setStatus('loading');
      setError(null);

      try {
        const term = query.trim();
        const result = term
          ? await searchNews({ query: term, signal: controller.signal })
          : await getTopHeadlines({ category, signal: controller.signal });

        if (cancelled) return;
        setArticles(result);
        setStatus(result.length === 0 ? 'empty' : 'success');
      } catch (err) {
        if (cancelled || err.name === 'AbortError') return;
        setArticles([]);
        setError(err.message);
        setStatus('error');
      }
    }

    load();

    // If category or query changes before the request finishes, cancel it —
    // otherwise a slow old response can overwrite a newer one.
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [category, query, attempt]);

  return { articles, status, error, retry };
}

export default useNews;