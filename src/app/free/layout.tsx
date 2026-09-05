import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Free Chapter — The Reset | Mohamed Abu Khadra',
  description:
    'Chapter 10 of Before You Say Yes to the Dog, free in full. What to do when the puppy is already home and the week has gone wrong.',
  alternates: {
    canonical: `${SITE_URL}/free`,
  },
}

export default function FreeLayout({ children }: { children: React.ReactNode }) {
  return children
}
