import type { Metadata } from 'next'
import Image from 'next/image'
import { WaitlistForm } from './waitlist-form'
import { SITE_URL } from '@/lib/seo'

// Live on Amazon as of 2026-09-08 (link provided directly by the author).
// NEXT_PUBLIC_BOOK_TWO_BUY_URL can override this later without a code change
// if the canonical link ever moves.
const BUY_URL =
  process.env.NEXT_PUBLIC_BOOK_TWO_BUY_URL || 'https://www.amazon.com/dp/B0HJ43D7J2'

export const metadata: Metadata = {
  title: 'After You Say Yes to the Dog | Mohamed Abu Khadra',
  // Was missing: without its own canonical this page silently inherited the
  // homepage's, telling Google it was a duplicate of "/" rather than its own URL.
  alternates: {
    canonical: `${SITE_URL}/book-two`,
  },
  openGraph: {
    images: [{ url: '/book-two-cover.jpg', width: 1600, height: 2560, alt: 'After You Say Yes to the Dog — book cover' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/book-two-cover.jpg'],
  },
}

const manuals = [
  'How to Use This Book / Find It Fast',
  'House Setup Before Puppy Arrives',
  'Family System Manual',
  'Selecting the Puppy Checklist',
  'First 48 Hours Manual',
  'First Week Manual',
  'Potty Training Manual',
  'First 3 Months / Freedom Review',
  'SAFE Manual',
  'Kids Daily Operator Manual',
  'Visitors, Workers, and Deliveries',
  'Night Barking and Fence',
  'Outdoor Freedom and Play',
  'Socialization Manual',
  'Mental Games Manual + Game Library Annex',
  'Grooming, Shower, Hygiene, and Parasites',
  'Emergency Manual',
  'Bad-Day and Bad-Week Reset',
  'Walks and Leash Manual',
  'Home Alone and Separation Manual',
  'Feeding and Food Safety Manual',
]

export default function BookTwoPage() {
  return (
    <>
      <section className="bg-bone min-h-screen flex items-center section-gap">
        <div className="section-container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center md:justify-end order-first md:order-last">
            <Image
              src="/book-two-cover.jpg"
              alt="After You Say Yes to the Dog — Real-Life Family Manuals for Life After Yes, by Mohamed Abu Khadra"
              width={1600}
              height={2560}
              priority
              sizes="(min-width: 768px) 320px, 256px"
              className="w-56 sm:w-64 md:w-72 h-auto rounded-[2px]"
              style={{ boxShadow: '0 18px 40px -12px rgba(0,0,0,0.35), 0 4px 10px rgba(0,0,0,0.2)' }}
            />
          </div>

          <div className="text-center md:text-left">
            {/* Teal accent line */}
            <div
              className="w-10 h-[2px] mx-auto md:mx-0 mb-8"
              style={{ backgroundColor: 'var(--teal)' }}
            />

            <h1 className="text-hero text-ink mb-4">
              After You Say Yes to the Dog
            </h1>

            <h2 className="text-h2 text-text-2 mb-8">Pre-order · 4 November 2026</h2>

            <p className="text-body text-text-2 mb-4">
              Book One is what you read to know. Book Two is what you print and
              stick on the fridge.
            </p>

            <p className="text-body text-text-2 mb-8">
              Manuals for the moments that actually happen — the first night, the
              vet visit, the guest at the door, the week it all falls apart. Written
              to be used with one hand while the other holds a leash.
            </p>

            <a
              href={BUY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mb-8 inline-flex"
              style={{ backgroundColor: 'var(--teal)' }}
            >
              Pre-order the book
            </a>

            <p className="text-caption text-text-3 mb-3">
              Want updates on future books instead?
            </p>

            <WaitlistForm />
          </div>
        </div>
      </section>

      <section className="bg-bone-alt section-gap">
        <div className="section-container">
          <p className="section-label mb-4" style={{ color: 'var(--teal)' }}>
            WHAT&rsquo;S INSIDE
          </p>
          <h2 className="text-h2 text-ink mb-12 md:mb-16">
            Twenty-one manuals. One per pressure moment.
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3">
            {manuals.map((m, i) => (
              <li key={i} className="font-text text-base leading-relaxed flex gap-3 text-ink" style={{ opacity: 0.85 }}>
                <span className="font-display text-sm shrink-0" style={{ color: 'var(--gold)' }}>
                  {String(i).padStart(2, '0')}
                </span>
                <span>{m}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
