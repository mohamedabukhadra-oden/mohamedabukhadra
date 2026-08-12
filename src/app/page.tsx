import Link from 'next/link'
import { ArrowRight, Briefcase, GraduationCap, BookOpen, Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <>
      {/* HERO — Professional identity */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-[#F5F1E8] to-[#EBE5D5] overflow-hidden">
        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#1B3B36] mb-4">
            Mohamed Abu Khadra
          </h1>
          <p className="text-lg md:text-xl text-[#6B5D4F] mb-6">
            Business Leader · Strategist · Visiting Professor · Author
          </p>
          <div className="w-16 h-1 bg-[#C9A86A] rounded-full mx-auto mb-8" />
          <p className="text-xl md:text-2xl text-[#2A2520] leading-relaxed max-w-3xl mx-auto">
            I work at the intersection of strategy, marketing, growth and real-world execution —
            and I write about what happens when ideas have to work in real life.
          </p>
          <p className="mt-6 font-serif text-lg text-[#1B3B36] italic">
            I build systems that have to work in real life.
          </p>
        </div>
      </section>

      {/* THREE PATHS */}
      <section className="py-16 md:py-24 bg-[#F5F1E8]">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Business & Strategy */}
            <Link href="/about" className="group">
              <div className="book-card h-full hover:shadow-lg transition-shadow">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#1B3B36]/10 mb-4">
                  <Briefcase className="h-7 w-7 text-[#1B3B36]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1B3B36] mb-2">Business & Strategy</h3>
                <p className="text-sm text-[#6B5D4F] leading-relaxed">
                  Leadership, marketing, growth, partnerships and execution. Two decades of turning
                  good ideas into things that actually work.
                </p>
                <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-[#1B3B36] group-hover:text-[#C9A86A] transition-colors">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>

            {/* Teaching & Speaking */}
            <Link href="/speaking" className="group">
              <div className="book-card h-full hover:shadow-lg transition-shadow">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A86A]/10 mb-4">
                  <GraduationCap className="h-7 w-7 text-[#C9A86A]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1B3B36] mb-2">Teaching & Speaking</h3>
                <p className="text-sm text-[#6B5D4F] leading-relaxed">
                  Visiting Professor. Postgraduate teaching, executive education and practical
                  business learning for universities and organisations.
                </p>
                <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-[#1B3B36] group-hover:text-[#C9A86A] transition-colors">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>

            {/* Books */}
            <Link href="/books" className="group">
              <div className="book-card h-full hover:shadow-lg transition-shadow border-[#C9A86A]/30">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#722F37]/10 mb-4">
                  <BookOpen className="h-7 w-7 text-[#722F37]" />
                </div>
                <div className="inline-flex items-center gap-1.5 mb-2">
                  <Sparkles className="h-3.5 w-3.5 text-[#C9A86A]" />
                  <span className="text-xs font-semibold text-[#C9A86A] uppercase tracking-wider">Current Project</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1B3B36] mb-2">Books</h3>
                <p className="text-sm text-[#6B5D4F] leading-relaxed">
                  The Before You Say Yes two-book system — a practical framework for families
                  preparing for life with a dog.
                </p>
                <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-[#1B3B36] group-hover:text-[#C9A86A] transition-colors">
                  Explore the books <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* THE BRIDGE — Professional to personal */}
      <section className="py-16 md:py-24 bg-[#1B3B36] text-white">
        <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-6">
            How Business Strategy Became a Family System
          </h2>
          <div className="w-16 h-1 bg-[#C9A86A] rounded-full mx-auto mb-8" />
          <div className="space-y-4 text-lg text-white/90 leading-relaxed">
            <p>
              You spent your career solving execution problems in business.
            </p>
            <p>
              Then you discovered that your own family had an execution problem at home.
            </p>
            <p className="font-serif text-xl text-[#C9A86A] italic">
              After three failed attempts to bring a dog into my family, I realised that wanting
              the dog wasn't the problem. The family system was.
            </p>
            <p>
              That question became the foundation for a two-book family system — one for deciding
              and preparing before the dog arrives, and one for operating successfully after.
            </p>
          </div>
          <div className="mt-8">
            <Link href="/books" className="inline-flex items-center justify-center gap-2 bg-[#C9A86A] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#DDB87A] transition-colors">
              Explore the Books
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* BOOK COVERS — Visual showcase */}
      <section className="py-16 md:py-24 bg-[#F5F1E8]">
        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1B3B36] mb-2">
            Two Books. Two Moments.
          </h2>
          <p className="text-[#6B5D4F] italic mb-8">One family system.</p>
          <div className="w-16 h-1 bg-[#C9A86A] rounded-full mx-auto mb-12" />

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            {/* Book 1 */}
            <Link href="/books/before-you-say-yes-to-the-dog" className="group text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-[#C9A86A]/20 blur-2xl rounded-full" />
                <img
                  src="/book-cover-1.png"
                  alt="Before You Say Yes to the Dog — book cover"
                  className="relative w-48 md:w-56 rounded-lg shadow-xl group-hover:shadow-2xl transition-shadow"
                  width={280}
                  height={420}
                />
              </div>
              <p className="mt-4 font-serif text-lg font-bold text-[#1B3B36]">Before You Say Yes</p>
              <p className="text-sm text-[#6B5D4F]">Decision + Foundation</p>
              <p className="text-xs text-[#C9A86A] mt-1">Coming Soon</p>
            </Link>

            {/* Arrow / Divider */}
            <div className="hidden md:flex flex-col items-center gap-2">
              <div className="w-12 h-px bg-[#C9A86A]" />
              <p className="font-serif text-sm text-[#C9A86A] italic whitespace-nowrap">System first.<br />Puppy second.<br />Family always.</p>
              <div className="w-12 h-px bg-[#C9A86A]" />
            </div>

            {/* Book 2 */}
            <Link href="/books/after-you-say-yes-to-the-dog" className="group text-center opacity-70 hover:opacity-100 transition-opacity">
              <div className="relative w-48 md:w-56 aspect-[2/3] rounded-lg shadow-xl bg-gradient-to-br from-[#722F37] to-[#1B3B36] flex items-center justify-center">
                <div className="text-center p-6">
                  <p className="font-serif text-white text-lg font-bold leading-tight">After You<br />Say Yes<br />to the Dog</p>
                  <p className="text-[#C9A86A] text-xs mt-3">Coming 2026</p>
                </div>
              </div>
              <p className="mt-4 font-serif text-lg font-bold text-[#1B3B36]">After You Say Yes</p>
              <p className="text-sm text-[#6B5D4F]">Operations + Execution</p>
              <p className="text-xs text-[#6B5D4F] mt-1">2026</p>
            </Link>
          </div>

          <div className="mt-12">
            <Link href="/books" className="book-btn-primary">
              About the Two-Book System
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* QUICK CHECK TEASER */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#722F37] to-[#1B3B36] text-white">
        <div className="max-w-2xl mx-auto px-5 md:px-8 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
            Is Your Family Actually Ready for a Dog?
          </h2>
          <div className="w-16 h-1 bg-[#C9A86A] rounded-full mx-auto mb-6" />
          <p className="text-lg text-white/80 mb-8">
            Take the free Family Dog Readiness Quick Check — 10 questions, one honest conversation,
            three possible outcomes: PASS, PAUSE, or NOT READY.
          </p>
          <Link
            href="/quick-check"
            className="inline-flex items-center justify-center gap-2 bg-[#C9A86A] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#DDB87A] transition-colors"
          >
            Take the Free Quick Check
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
