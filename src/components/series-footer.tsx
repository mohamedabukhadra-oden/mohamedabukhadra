import Image from 'next/image'
import Link from 'next/link'
import { SERIES_URL } from '@/lib/buy-url'

/**
 * Shared closing block for the four gift/lead-magnet landing pages
 * (/before, /after, /reset, /free): both covers, one line per book, and a
 * route to the series — so a visitor who arrived for one download always
 * finds their way to the rest of the system.
 */
export function SeriesFooter() {
  return (
    <div className="mt-12 md:mt-16 pt-10 border-t border-rule reveal">
      <p className="section-label mb-8" style={{ color: 'var(--teal)' }}>
        THE FULL SYSTEM
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 mb-8">
        <div className="flex gap-4 items-start">
          <Image
            src="/book-one-cover.jpg"
            alt="Before You Say Yes to the Dog — book cover"
            width={1600}
            height={2560}
            className="w-16 sm:w-20 h-auto rounded-[2px] shrink-0"
            style={{ boxShadow: '4px 4px 12px rgba(0,0,0,0.25)' }}
          />
          <div>
            <p className="font-text font-medium text-ink text-body mb-1">
              Before You Say Yes to the Dog
            </p>
            <p className="text-caption text-text-3 mb-2">
              The decision framework — read this before the puppy arrives.
            </p>
            <Link href="/book-one" className="text-caption text-accent hover:text-accent-hover transition-colors">
              About the book &rarr;
            </Link>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <Image
            src="/book-two-cover.jpg"
            alt="After You Say Yes to the Dog — book cover"
            width={1600}
            height={2560}
            className="w-16 sm:w-20 h-auto rounded-[2px] shrink-0"
            style={{ boxShadow: '4px 4px 12px rgba(0,0,0,0.25)' }}
          />
          <div>
            <p className="font-text font-medium text-ink text-body mb-1">
              After You Say Yes to the Dog
            </p>
            <p className="text-caption text-text-3 mb-2">
              The operating manual — for the family who already said yes.
            </p>
            <Link href="/book-two" className="text-caption text-accent hover:text-accent-hover transition-colors">
              About the book &rarr;
            </Link>
          </div>
        </div>
      </div>
      <a
        href={SERIES_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-caption text-ink font-medium hover:text-accent transition-colors underline underline-offset-2"
      >
        See the full system on Amazon — both books &rarr;
      </a>
    </div>
  )
}
