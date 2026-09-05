import Link from 'next/link'
import type { Metadata } from 'next'
import { Mic, Briefcase, BookOpen, ArrowRight } from 'lucide-react'
import { SITE_URL } from '@/lib/seo'

// This page had no metadata export at all, so it silently inherited the
// homepage's title and canonical — same defect as book-two and press had, on a
// real indexable page that's also listed in sitemap.ts at priority 0.6.
export const metadata: Metadata = {
  title: 'Contact | Mohamed Abu Khadra',
  description: 'Get in touch about speaking, teaching, business, consulting, or books and media.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
}

export default function ContactPage() {
  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 min-h-screen bg-bone">
      <div className="max-w-2xl mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-ink mb-4">Contact</h1>
          <div className="w-16 h-1 bg-gold rounded-full mx-auto mt-6" />
        </div>

        <div className="grid gap-6">
          <div className="book-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal/10"><Mic className="h-5 w-5 text-ink" /></div>
              <h2 className="font-serif text-xl font-bold text-ink">Speaking & Teaching</h2>
            </div>
            <p className="text-sm text-text-2">For universities, conferences, executive education and corporate programmes.</p>
            <a href="mailto:hello@mohamedabukhadra.com?subject=Speaking%20Enquiry" className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-ink hover:text-gold">hello@mohamedabukhadra.com <ArrowRight className="h-3.5 w-3.5" /></a>
          </div>

          <div className="book-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold/10"><Briefcase className="h-5 w-5 text-gold" /></div>
              <h2 className="font-serif text-xl font-bold text-ink">Business</h2>
            </div>
            <p className="text-sm text-text-2">For consulting, strategy, marketing, growth and partnerships.</p>
            <a href="mailto:hello@mohamedabukhadra.com?subject=Business%20Enquiry" className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-ink hover:text-gold">hello@mohamedabukhadra.com <ArrowRight className="h-3.5 w-3.5" /></a>
          </div>

          <div className="book-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#722F37]/10"><BookOpen className="h-5 w-5 text-[#722F37]" /></div>
              <h2 className="font-serif text-xl font-bold text-ink">Books & Media</h2>
            </div>
            <p className="text-sm text-text-2">For interviews, reviews, publishing and book-related enquiries.</p>
            <a href="mailto:hello@mohamedabukhadra.com?subject=Book%20%26%20Media%20Enquiry" className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-ink hover:text-gold">hello@mohamedabukhadra.com <ArrowRight className="h-3.5 w-3.5" /></a>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="text-sm text-text-2 hover:text-ink">← Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
