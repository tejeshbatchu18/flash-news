// Character limits tuned to where each string appears in the UI.
export const LIMITS = {
  query: 40,      // the search term echoed in FilterBar and EmptyState
  ticker: 90,     // a single headline in the flash ticker
  headline: 60,   // hard character cap on a card headline, if ever needed
};

/**
 * Shorten text to `max` characters, ending on a word boundary where possible.
 * Falls back to a hard cut for long unbroken strings (pasted gibberish, URLs).
 */
export function truncate(text, max = LIMITS.query) {
  if (!text) return '';

  const clean = String(text).trim();
  if (clean.length <= max) return clean;

  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');

  // Only break at a space if it isn't so early that we lose most of the text.
  const safe = lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut;

  return `${safe.trimEnd()}…`;
}

export default truncate;