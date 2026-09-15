import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo'
import { FreePageClient } from './free-page-client'

export const metadata: Metadata = {
  title: 'The Puppy Starter Pack — free | Mohamed Abu Khadra',
  description:
    'A free, practical guide for the first weeks with a new puppy — the decisions that actually matter before the ones everyone argues about online.',
  alternates: { canonical: `${SITE_URL}/free` },
  openGraph: {
    title: 'The Puppy Starter Pack — free',
    description:
      'A free, practical guide for the first weeks with a new puppy, from the author of Before You Say Yes to the Dog.',
    url: `${SITE_URL}/free`,
    images: [{ url: '/book-one-cover.jpg', width: 1600, height: 2560, alt: 'Before You Say Yes to the Dog — book cover' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/book-one-cover.jpg'],
  },
}

export default function FreePage() {
  return <FreePageClient />
}
