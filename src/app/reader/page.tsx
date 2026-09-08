import type { Metadata } from 'next'
import Image from 'next/image'
import { RevealObserver } from '@/components/reveal-observer'
import { DownloadButton } from '@/components/download-button'
import { LEAD_MAGNETS } from '@/lib/lead-magnets'
import { SITE_URL } from '@/lib/seo'

// Printed inside both books as a short URL + QR code — permanent, must stay
// short and typeable. For book owners only: kept out of the sitemap and out
// of every nav/footer link on the site (see also robots.ts, which relies on
// this noindex tag rather than a robots.txt disallow — a disallow would stop
// Googlebot from ever seeing this tag, which is the weaker of the two).
export const metadata: Metadata = {
  title: 'Your working copy | Mohamed Abu Khadra',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/reader` },
}

export default function ReaderPage() {
  return (
    <>
      <RevealObserver />
      <section className="bg-bone section-gap">
        <div className="section-container">
          <div style={{ maxWidth: '68ch' }} className="mx-auto text-center">

            <h1 className="text-h2 text-ink mb-6 reveal">
              You have the book. This is the working copy.
            </h1>

            <p className="text-longform text-ink mb-10 reveal">
              The Family Readiness Test, the room-by-room setup, the roles
              chart — the exercises from Before You Say Yes to the Dog, laid
              out to print, fill in, and put on the fridge.
            </p>

            <div className="mb-10 reveal">
              <DownloadButton
                href={LEAD_MAGNETS.reader.path}
                magnet="reader"
                page="/reader"
                label="Download your working copy (PDF)"
              />
            </div>

            <div className="flex justify-center reveal">
              <Image
                src="/qr/reader-qr.png"
                alt="QR code linking to mohamedabukhadra.com/reader"
                width={140}
                height={140}
              />
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
