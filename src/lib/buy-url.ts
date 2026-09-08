/**
 * No retailer link exists yet — set NEXT_PUBLIC_BOOK_ONE_BUY_URL to the real
 * Amazon/Kindle listing once it's live. Until then this falls back to a
 * pre-filled email enquiry instead of a dead "#" link, so any CTA that uses it
 * always goes somewhere a reader can act on.
 *
 * Shared by /book-one and the Day-7 lead-magnet email so both pick up the real
 * link automatically the moment the env var is set, with nothing to keep in sync.
 */
export const BOOK_ONE_BUY_URL =
  process.env.NEXT_PUBLIC_BOOK_ONE_BUY_URL ||
  'mailto:hello@mohamedabukhadra.com?subject=Before%20You%20Say%20Yes%20to%20the%20Dog%20%E2%80%94%20where%20to%20buy'
