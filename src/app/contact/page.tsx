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
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 min-h-screen bg-[#F5F1E8]">
      <div className="max-w-2xl mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#1B3B36] mb-4">Contact</h1>
          <div className="w-16 h-1 bg-[#C9A86A] rounded-full mx-auto mt-6" />
        </div>

        <div className="grid gap-6">
          <div className="book-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1B3B36]/10"><Mic className="h-5 w-5 text-[#1B3B36]" /></div>
              <h2 className="font-serif text-xl font-bold text-[#1B3B36]">Speaking & Teaching</h2>
            </div>
            <p className="text-sm text-[#6B5D4F]">For universities, conferences, executive education and corporate programmes.</p>
            <a href="mailto:hello@mohamedabukhadra.com?subject=Speaking%20Enquiry" className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-[#1B3B36] hover:text-[#C9A86A]">hello@mohamedabukhadra.com <ArrowRight className="h-3.5 w-3.5" /></a>
          </div>

          <div className="book-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A86A]/10"><Briefcase className="h-5 w-5 text-[#C9A86A]" /></div>
              <h2 className="font-serif text-xl font-bold text-[#1B3B36]">Business</h2>
            </div>
            <p className="text-sm text-[#6B5D4F]">For consulting, strategy, marketing, growth and partnerships.</p>
            <a href="mailto:hello@mohamedabukhadra.com?subject=Business%20Enquiry" className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-[#1B3B36] hover:text-[#C9A86A]">hello@mohamedabukhadra.com <ArrowRight className="h-3.5 w-3.5" /></a>
          </div>

          <div className="book-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#722F37]/10"><BookOpen className="h-5 w-5 text-[#722F37]" /></div>
              <h2 className="font-serif text-xl font-bold text-[#1B3B36]">Books & Media</h2>
            </div>
            <p className="text-sm text-[#6B5D4F]">For interviews, reviews, publishing and book-related enquiries.</p>
            <a href="mailto:hello@mohamedabukhadra.com?subject=Book%20%26%20Media%20Enquiry" className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-[#1B3B36] hover:text-[#C9A86A]">hello@mohamedabukhadra.com <ArrowRight className="h-3.5 w-3.5" /></a>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="text-sm text-[#6B5D4F] hover:text-[#1B3B36]">← Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
