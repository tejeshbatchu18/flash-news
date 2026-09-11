// Will persist state (filters, bookmarks, cached articles) across refreshes.
// Implementation comes in a later step.
export function useLocalStorage(key, initialValue) {
  return [initialValue, () => {}];
}

export default useLocalStorage;
