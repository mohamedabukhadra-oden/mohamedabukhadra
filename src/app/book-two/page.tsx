import type { Metadata } from 'next'
import Image from 'next/image'
import { WaitlistForm } from './waitlist-form'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'After You Say Yes to the Dog — Coming Soon | Mohamed Abu Khadra',
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

export default function BookTwoPage() {
  return (
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

          <h2 className="text-h2 text-text-2 mb-8">Coming soon.</h2>

          <p className="text-body text-text-2 mb-4">
            Book One is what you read to know. Book Two is what you print and
            stick on the fridge.
          </p>

          <p className="text-body text-text-2 mb-12">
            Manuals for the moments that actually happen — the first night, the
            vet visit, the guest at the door, the week it all falls apart. Written
            to be used with one hand while the other holds a leash.
          </p>

          <WaitlistForm />
        </div>
      </div>
    </section>
  )
}
