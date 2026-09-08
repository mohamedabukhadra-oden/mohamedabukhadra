import type { Metadata } from 'next'
import { RevealObserver } from '@/components/reveal-observer'
import { DownloadButton } from '@/components/download-button'
import { LEAD_MAGNETS } from '@/lib/lead-magnets'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'For Shelters & Rescues | Mohamed Abu Khadra',
  description:
    'The Reset — a free resource for families whose first weeks with a dog have gone wrong. Free to print, share, and hand to any family. No permission needed.',
  alternates: { canonical: `${SITE_URL}/shelters` },
}

export default function SheltersPage() {
  return (
    <>
      <RevealObserver />
      <section className="bg-bone section-gap">
        <div className="section-container">
          <div style={{ maxWidth: '68ch' }} className="mx-auto">

            <h1 className="text-h2 text-ink mb-6 reveal">
              For shelters and rescues.
            </h1>

            <p className="text-longform text-ink mb-4 reveal">
              The Reset is a chapter from Before You Say Yes to the Dog, written
              for the exact moment a family calls a shelter because the first
              weeks with a dog have gone badly: what to do when it&rsquo;s not
              working, why a bad week isn&rsquo;t a bad dog, and how to change
              the system instead of blaming the effort.
            </p>

            <p className="text-longform text-ink mb-4 reveal">
              It also says plainly when a reset isn&rsquo;t the answer — some
              placements should end, and the chapter doesn&rsquo;t pretend
              otherwise. That honesty is the point: a family that trusts the
              material is more likely to act on it, whichever way it points.
            </p>

            <div className="mb-8 reveal">
              <p className="font-text text-ink text-body font-medium">
                Free to print, share, and hand to any family. No permission
                needed, no attribution required, no cost — for a single family
                or your entire intake process.
              </p>
            </div>

            <div className="mb-12 reveal">
              <DownloadButton
                href={LEAD_MAGNETS.reset.path}
                magnet="reset"
                page="/shelters"
                label="Download The Reset (PDF)"
              />
            </div>

            <div className="bg-bone-alt p-6 rounded-[4px] reveal">
              <p className="text-caption text-text-3">
                Want printed copies of the book for your shelter or rescue?
                Reach out —{' '}
                <a
                  href="mailto:hello@mohamedabukhadra.com?subject=Shelter%20Book%20Request"
                  className="text-ink font-medium hover:text-gold"
                >
                  hello@mohamedabukhadra.com
                </a>
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
