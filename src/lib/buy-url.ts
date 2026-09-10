/**
 * Book One doesn't have its own dedicated Amazon product page yet, so this
 * points to the author page (lists both books). Set
 * NEXT_PUBLIC_BOOK_ONE_BUY_URL to a direct product listing if/when Book One
 * gets one, without needing a code change.
 *
 * Shared by /book-one and the Day-7 lead-magnet email so both pick up the real
 * link automatically the moment the env var is set, with nothing to keep in sync.
 */
export const BOOK_ONE_BUY_URL =
  process.env.NEXT_PUBLIC_BOOK_ONE_BUY_URL ||
  'https://www.amazon.com/author/mohamedabukhadra'
