import type { Metadata } from 'next'
import Image from 'next/image'
import { RevealObserver } from '@/components/reveal-observer'
import { DownloadButton } from '@/components/download-button'
import { LEAD_MAGNETS } from '@/lib/lead-magnets'
import { SITE_URL } from '@/lib/seo'
import { SeriesFooter } from '@/components/series-footer'

// Printed in both books and handed out as a QR code — this URL is permanent.
export const metadata: Metadata = {
  title: 'The Reset — free, no email required | Mohamed Abu Khadra',
  description:
    'Chapter 13 of Before You Say Yes to the Dog, free in full. What to do when the puppy is already home and the week has gone wrong. No email, no signup.',
  alternates: { canonical: `${SITE_URL}/reset` },
  openGraph: {
    title: 'The Reset — free, no email required',
    description:
      'Chapter 13 of Before You Say Yes to the Dog, free in full. What to do when the puppy is already home and the week has gone wrong.',
    url: `${SITE_URL}/reset`,
    images: [{ url: '/book-one-cover.jpg', width: 1600, height: 2560, alt: 'Before You Say Yes to the Dog — book cover' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/book-one-cover.jpg'],
  },
}

export default function ResetPage() {
  return (
    <>
      <RevealObserver />
      <section className="bg-bone section-gap">
        <div className="section-container">
          <div style={{ maxWidth: '68ch' }} className="mx-auto">

            <h1 className="text-h2 text-ink mb-6 reveal">
              It&rsquo;s already going badly. That is not the end of the story.
            </h1>

            <p className="text-longform text-ink mb-4 reveal">
              The Reset chapter is Chapter 13 of Before You Say Yes to the Dog.
              Free, in full, right now — no email, no signup, no strings.
            </p>

            <p className="text-longform text-ink mb-6 reveal">
              What to do when the puppy is already home and the week has gone
              wrong: why a bad week is not a bad dog, why &ldquo;try harder&rdquo;
              is the wrong instruction, and how to change the system instead of
              the effort.
            </p>

            <div className="mb-10 reveal">
              <p className="font-text text-text-2 text-body italic">
                One honest warning inside it: if the real answer was &ldquo;no,
                not now,&rdquo; a reset won&rsquo;t fix that. The chapter says so
                plainly.
              </p>
            </div>

            <div className="mb-12 md:mb-16 reveal">
              <DownloadButton
                href={LEAD_MAGNETS.reset.path}
                magnet="reset"
                page="/reset"
                label="Open the Reset chapter (PDF)"
              />
            </div>

            <blockquote className="border-l-2 border-rule pl-8 mb-12 md:mb-16 reveal">
              <p className="font-text italic text-text-2 text-body">
                Koudy, Milo, and Snoopy all went to families who could give them
                what we couldn&rsquo;t&hellip; It is the last responsible thing a
                family can do for a dog.
              </p>
            </blockquote>

            <div className="bg-bone-alt p-6 rounded-[4px] mb-10 reveal flex flex-col sm:flex-row sm:items-center gap-6">
              <Image
                src="/qr/reset-qr.png"
                alt="QR code linking to mohamedabukhadra.com/reset"
                width={120}
                height={120}
                className="shrink-0"
              />
              <p className="text-caption text-text-3">
                Shelters and rescues: share this link freely with adopters and
                returning families. No permission needed, no attribution
                required. <strong className="text-ink">mohamedabukhadra.com/reset</strong>
              </p>
            </div>

            <SeriesFooter />

          </div>
        </div>
      </section>
    </>
  )
}
