import { useCallback } from 'react';
import useLocalStorage from './useLocalStorage.js';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage('flashnews:bookmarks', []);

  const isBookmarked = useCallback(
    (id) => bookmarks.some((saved) => saved.id === id),
    [bookmarks]
  );

  const toggleBookmark = useCallback(
    (article) => {
      setBookmarks((current) =>
        current.some((saved) => saved.id === article.id)
          ? current.filter((saved) => saved.id !== article.id)
          : [article, ...current]
      );
    },
    [setBookmarks]
  );

  return { bookmarks, isBookmarked, toggleBookmark };
}

export default useBookmarks;