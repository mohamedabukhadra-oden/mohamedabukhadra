import type { Metadata } from 'next'
import { RevealObserver } from '@/components/reveal-observer'
import { DownloadButton } from '@/components/download-button'
import { LEAD_MAGNETS } from '@/lib/lead-magnets'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'The Puppy Starter Pack | Mohamed Abu Khadra',
  description:
    'A free guide for the first weeks with a new puppy — direct download, no email required.',
  alternates: { canonical: `${SITE_URL}/starter-pack` },
}

export default function StarterPackPage() {
  return (
    <>
      <RevealObserver />
      <section className="bg-bone section-gap">
        <div className="section-container">
          <div style={{ maxWidth: '68ch' }} className="mx-auto">

            <h1 className="text-h2 text-ink mb-6 reveal">
              The Puppy Starter Pack
            </h1>

            <p className="text-longform text-ink mb-4 reveal">
              A short, practical guide for the first weeks with a new puppy —
              the decisions that actually matter before the ones everyone
              argues about online.
            </p>

            <p className="text-longform text-ink mb-10 reveal">
              Free, in full, right now. No email, no signup.
            </p>

            <div className="reveal">
              <DownloadButton
                href={LEAD_MAGNETS.starterPack.path}
                magnet="starterPack"
                page="/starter-pack"
                label="Download the Starter Pack (PDF)"
              />
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
