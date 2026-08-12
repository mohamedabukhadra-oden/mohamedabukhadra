import Link from 'next/link'
import { ArrowRight, BookOpen, CheckCircle2, Heart } from 'lucide-react'

export default function BooksPage() {
  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 min-h-screen bg-[#F5F1E8]">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#1B3B36] mb-4">
            The Two-Book System
          </h1>
          <p className="text-lg text-[#6B5D4F] italic">Before the decision. After the decision. One family system.</p>
          <div className="w-16 h-1 bg-[#C9A86A] rounded-full mx-auto mt-6" />
        </div>

        {/* The philosophy */}
        <div className="p-8 rounded-xl bg-white border border-[#EBE5D5] mb-8 text-center">
          <p className="font-serif text-xl text-[#1B3B36] italic mb-4">
            Other books prepare the puppy.<br />This book prepares the family.
          </p>
          <p className="text-[#6B5D4F]">
            The Kids-First Dog Manual Series is a practical two-book system that helps families
            decide, prepare, and operate — not just train.
          </p>
        </div>

        {/* Book 1 */}
        <div className="grid gap-6 md:grid-cols-[1fr_1.5fr] mb-8">
          <div className="flex justify-center md:justify-start">
            <Link href="/books/before-you-say-yes-to-the-dog" className="group">
              <div className="relative">
                <div className="absolute inset-0 bg-[#C9A86A]/20 blur-2xl rounded-full" />
                <img src="/book-cover-1.png" alt="Before You Say Yes to the Dog" className="relative w-40 md:w-48 rounded-lg shadow-xl group-hover:shadow-2xl transition-shadow" width={240} height={360} />
              </div>
            </Link>
          </div>
          <div className="book-card">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#1B3B36] px-3 py-1 mb-3">
              <BookOpen className="h-3.5 w-3.5 text-[#C9A86A]" />
              <span className="text-xs font-semibold text-[#C9A86A]">BOOK 1 — BEFORE YES</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#1B3B36] mb-2">Before You Say Yes to the Dog</h2>
            <p className="text-[#6B5D4F] italic mb-4">Should we get the dog?</p>
            <p className="text-sm text-[#2A2520] leading-relaxed mb-4">
              A family readiness and preparation guide for families considering bringing home a puppy.
              Includes the Family Readiness Test™, house setup guides, role assignment, and the Mum SAFE
              framework.
            </p>
            <p className="text-sm text-[#1B3B36] font-medium mb-4">Book 1 = Decision + Foundation</p>
            <div className="flex items-center gap-3">
              <Link href="/books/before-you-say-yes-to-the-dog" className="book-btn-primary text-sm">Explore Book 1 <ArrowRight className="h-3.5 w-3.5" /></Link>
              <span className="text-xs text-[#C9A86A]">Coming Soon</span>
            </div>
          </div>
        </div>

        {/* Bridge */}
        <div className="text-center my-8">
          <p className="font-serif text-lg text-[#C9A86A] italic">
            System first. Puppy second. Family always.
          </p>
        </div>

        {/* Book 2 */}
        <div className="grid gap-6 md:grid-cols-[1fr_1.5fr] mb-12">
          <div className="flex justify-center md:justify-start">
            <div className="relative w-40 md:w-48 aspect-[2/3] rounded-lg shadow-xl bg-gradient-to-br from-[#722F37] to-[#1B3B36] flex items-center justify-center">
              <div className="text-center p-4">
                <p className="font-serif text-white text-base font-bold leading-tight">After You<br />Say Yes<br />to the Dog</p>
                <p className="text-[#C9A86A] text-xs mt-2">Coming 2026</p>
              </div>
            </div>
          </div>
          <div className="book-card">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#722F37] px-3 py-1 mb-3">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#C9A86A]" />
              <span className="text-xs font-semibold text-[#C9A86A]">BOOK 2 — AFTER YES</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#1B3B36] mb-2">After You Say Yes to the Dog</h2>
            <p className="text-[#6B5D4F] italic mb-4">We got the dog. Now what?</p>
            <p className="text-sm text-[#2A2520] leading-relaxed mb-4">
              A practical family operating manual for routines, pressure moments, messy days and
              everyday life after the puppy arrives. Open the manual you need when the situation happens.
            </p>
            <p className="text-sm text-[#1B3B36] font-medium mb-4">Book 2 = Operations + Execution</p>
            <span className="text-xs text-[#6B5D4F]">Coming 2026</span>
          </div>
        </div>

        {/* Why I Wrote These Books */}
        <div className="p-8 rounded-xl bg-[#1B3B36] text-white mb-12">
          <h2 className="font-serif text-2xl font-bold text-[#C9A86A] mb-4">Why I Wrote These Books</h2>
          <div className="space-y-4 text-white/90 leading-relaxed">
            <p>Three attempts. Three failures. A daughter in tears.</p>
            <p>And one uncomfortable question: <em>What if the problem wasn't the dog?</em></p>
            <p>
              After the third failure, I stopped blaming bad luck and began examining what was
              actually broken. I went back to something I knew well: understanding the real problem,
              finding its causes, building a system, and testing it.
            </p>
            <p className="font-serif italic text-[#C9A86A]">
              Most families don't have a dog problem. They have a house-system problem.
            </p>
            <p>
              The result wasn't another training method. It was a family operating system for dog
              ownership. I tested it on my own family. It worked.
            </p>
          </div>
          <div className="mt-6">
            <Link href="/read-inside" className="inline-flex items-center gap-2 text-[#C9A86A] hover:text-white transition-colors">
              Read the full story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Quick Check CTA */}
        <div className="text-center">
          <Link href="/quick-check" className="book-btn-primary">
            Take the Free Family Readiness Quick Check
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
