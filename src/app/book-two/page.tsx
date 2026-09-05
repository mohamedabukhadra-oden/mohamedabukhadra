import type { Metadata } from 'next'
import { WaitlistForm } from './waitlist-form'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'After You Say Yes to the Dog — Coming Soon | Mohamed Abu Khadra',
  // Was missing: without its own canonical this page silently inherited the
  // homepage's, telling Google it was a duplicate of "/" rather than its own URL.
  alternates: {
    canonical: `${SITE_URL}/book-two`,
  },
}

export default function BookTwoPage() {
  return (
    <section className="bg-bone min-h-screen flex items-center justify-center section-gap">
      <div className="section-container max-w-xl text-center">
        {/* Teal accent line */}
        <div
          className="w-10 h-[2px] mx-auto mb-8"
          style={{ backgroundColor: 'var(--teal)' }}
        />

        <h1 className="text-hero text-ink mb-4">
          After You Say Yes to the Dog
        </h1>

        <h2 className="text-h2 text-text-2 mb-8">Coming soon.</h2>

        <p className="text-body text-text-2 mx-auto mb-4">
          Book One is what you read to know. Book Two is what you print and
          stick on the fridge.
        </p>

        <p className="text-body text-text-2 mx-auto mb-12">
          Manuals for the moments that actually happen — the first night, the
          vet visit, the guest at the door, the week it all falls apart. Written
          to be used with one hand while the other holds a leash.
        </p>

        <WaitlistForm />
      </div>
    </section>
  )
}
