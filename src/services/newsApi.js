const BASE_URL = '/gnews';
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

function cleanContent(text) {
  if (!text) return '';
  return text.replace(/\s*\[\+?\d+\s*chars?\]\s*$/i, '').replace(/\.{3}\s*$/, '').trim();
}

function normalise(article) {
  return {
    id: article.url,
    title: article.title,
    description: article.description || '',
    content: cleanContent(article.content),
    url: article.url,
    image: article.image || null,
    publishedAt: article.publishedAt,
    source: article.source?.name || 'Unknown',
  };
}

function messageFor(status) {
  if (status === 400) return 'Bad request — check the API key in your .env file.';
  if (status === 401 || status === 403) return 'API key rejected. Check it is active.';
  if (status === 429) return 'Daily request limit reached. Try another key.';
  if (status >= 500) return 'GNews is having trouble. Try again in a moment.';
  return 'Could not load news. Please try again.';
}

async function request(endpoint, params, signal) {
  if (!API_KEY) {
    throw new Error('No API key found. Add VITE_NEWS_API_KEY to .env and restart the server.');
  }

  const query = new URLSearchParams({ ...params, lang: 'en', apikey: API_KEY });

  let response;
  try {
    response = await fetch(`${BASE_URL}/${endpoint}?${query}`, { signal });
  } catch (networkError) {
    if (networkError.name === 'AbortError') throw networkError;
    throw new Error(
      navigator.onLine
        ? 'Could not reach the news service. Check your connection and try again.'
        : 'You’re offline. Reconnect and try again.'
    );
  }

  if (!response.ok) throw new Error(messageFor(response.status));

  const data = await response.json();
  return (data.articles || []).map(normalise);
}

export function getTopHeadlines({ category = 'general', max = 10, signal } = {}) {
  return request('top-headlines', { category, country: 'in', max }, signal);
}

export function searchNews({ query, max = 10, signal } = {}) {
  return request('search', { q: query, max, sortby: 'publishedAt' }, signal);
}

export function getNewsByCategory(category, options = {}) {
  return getTopHeadlines({ ...options, category });
}