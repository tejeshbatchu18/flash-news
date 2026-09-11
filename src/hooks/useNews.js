// Will own fetching, loading/error/empty state and caching for articles.
// Implementation comes in a later step.
export function useNews() {
  return {
    articles: [],
    status: 'idle', // 'idle' | 'loading' | 'success' | 'error' | 'empty'
    error: null,
  };
}

export default useNews;
