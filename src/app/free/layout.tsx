import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'The Puppy Starter Pack — free | Mohamed Abu Khadra',
  description:
    'A free guide for the first weeks with a new puppy, sent straight to your inbox — plus updates when new chapters, tools, and both books are ready.',
  alternates: {
    canonical: `${SITE_URL}/free`,
  },
}

export default function FreeLayout({ children }: { children: React.ReactNode }) {
  return children
}
