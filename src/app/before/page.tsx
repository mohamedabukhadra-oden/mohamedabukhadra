import type { Metadata } from 'next'
import { RevealObserver } from '@/components/reveal-observer'
import { DownloadButton } from '@/components/download-button'
import { LEAD_MAGNETS } from '@/lib/lead-magnets'
import { SITE_URL } from '@/lib/seo'
import { SeriesFooter } from '@/components/series-footer'

export const metadata: Metadata = {
  title: 'The Puppy Starter Pack — Reader Edition | Mohamed Abu Khadra',
  description:
    'The working companion to Before You Say Yes to the Dog — four printable stages for choosing the puppy, preparing the house, the first 48 hours, and what to do if something goes wrong. Free, no email required.',
  alternates: { canonical: `${SITE_URL}/before` },
}

export default function BeforePage() {
  return (
    <>
      <RevealObserver />
      <section className="bg-bone section-gap">
        <div className="section-container">
          <div style={{ maxWidth: '68ch' }} className="mx-auto">

            <h1 className="text-h2 text-ink mb-6 reveal">
              The working companion to Before You Say Yes to the Dog.
            </h1>

            <p className="text-longform text-ink mb-4 reveal">
              The book explains why the system works. This is the part you
              actually use on the day — four stages, each one a page you can
              print, fill in, and put where the family can see it: choosing
              the puppy, preparing the house, the first 48 hours, and what to
              do if something goes wrong.
            </p>

            <p className="text-longform text-ink mb-10 reveal">
              Free, in full, right now — no email, no signup. It works
              whether you already have the book or not.
            </p>

            <div className="mb-12 md:mb-16 reveal">
              <DownloadButton
                href={LEAD_MAGNETS.reader.path}
                magnet="reader"
                page="/before"
                label="Download the Starter Pack (PDF)"
              />
            </div>

            <SeriesFooter />

          </div>
        </div>
      </section>
    </>
  )
}
