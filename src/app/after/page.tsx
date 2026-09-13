import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo'
import { SeriesFooter } from '@/components/series-footer'

const BUY_URL =
  process.env.NEXT_PUBLIC_BOOK_TWO_BUY_URL || 'https://www.amazon.com/dp/B0HJ43D7J2'

export const metadata: Metadata = {
  title: 'After You Say Yes to the Dog — companion pack | Mohamed Abu Khadra',
  description:
    'The printable companion to After You Say Yes to the Dog ships with the book. Pre-order the book to get it as soon as it is ready.',
  alternates: { canonical: `${SITE_URL}/after` },
}

export default function AfterPage() {
  return (
    <section className="bg-bone section-gap">
      <div className="section-container">
        <div style={{ maxWidth: '68ch' }} className="mx-auto">

          <h1 className="text-h2 text-ink mb-6">
            The After companion pack is coming with the book.
          </h1>

          <p className="text-longform text-ink mb-4">
            After You Say Yes to the Dog is the operating manual for daily
            life — one printable manual per pressure moment, for the family
            who already said yes. Its companion pack ships alongside the
            book itself.
          </p>

          <p className="text-longform text-ink mb-10">
            Pre-order the book and this page will carry the free companion
            download as soon as it&rsquo;s ready.
          </p>

          <a
            href={BUY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mb-4 inline-flex"
            style={{ backgroundColor: 'var(--teal)' }}
          >
            Pre-order the book
          </a>

          <SeriesFooter />

        </div>
      </div>
    </section>
  )
}
