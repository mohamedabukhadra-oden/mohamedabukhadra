/**
 * Book One's own Amazon product page (has its own ASIN — description, Look
 * Inside and reviews live here, which convert better than the author or
 * series page, so this is the primary link used everywhere "get the book"
 * means Book One). Set NEXT_PUBLIC_BOOK_ONE_BUY_URL to override without a
 * code change if the ASIN ever changes.
 *
 * Shared by /book-one, /free's post-download link, and the Day-7 lead-magnet
 * email so all three pick up the same link automatically, with nothing to
 * keep in sync.
 */
export const BOOK_ONE_BUY_URL =
  process.env.NEXT_PUBLIC_BOOK_ONE_BUY_URL ||
  'https://www.amazon.com/dp/B0HJ9TYNMD'

/** Author page — lists both books. Used where the point is "see everything he's written" rather than pushing one specific title (e.g. /about). */
export const AUTHOR_URL = 'https://www.amazon.com/author/mohamedabukhadra'

/** Series page — both books at once. Secondary link for readers who want to see the whole set rather than one title. */
export const SERIES_URL = 'https://www.amazon.com/dp/B0HJ45CMP7'
