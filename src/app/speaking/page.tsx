import Link from 'next/link'
import { GraduationCap, Mic, BookOpen, ArrowRight } from 'lucide-react'

export default function SpeakingPage() {
  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 min-h-screen bg-[#F5F1E8]">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#1B3B36] mb-4">Speaking & Teaching</h1>
          <div className="w-16 h-1 bg-[#C9A86A] rounded-full mx-auto mt-6" />
        </div>

        {/* Teaching */}
        <div className="book-card mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#1B3B36]/10"><GraduationCap className="h-6 w-6 text-[#1B3B36]" /></div>
            <h2 className="font-serif text-2xl font-bold text-[#1B3B36]">Teaching</h2>
          </div>
          <p className="text-[#6B5D4F] mb-4">Visiting Professor teaching postgraduate and executive audiences.</p>
          <div className="grid gap-2">
            {['Marketing','Business Planning','International Business','Practical Application & Decision-Making'].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-[#2A2520]"><span className="text-[#C9A86A]">◆</span>{item}</div>
            ))}
          </div>
        </div>

        {/* Speaking */}
        <div className="book-card mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#C9A86A]/10"><Mic className="h-6 w-6 text-[#C9A86A]" /></div>
            <h2 className="font-serif text-2xl font-bold text-[#1B3B36]">Speaking Topics</h2>
          </div>
          <div className="grid gap-2">
            {['Marketing & Growth','Strategy & Execution','Go-to-Market','Partnerships & Business Development','Leadership','Entrepreneurship','Innovation'].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-[#2A2520]"><span className="text-[#C9A86A]">◆</span>{item}</div>
            ))}
          </div>
        </div>

        {/* Author & Speaker */}
        <div className="book-card mb-8 border-[#C9A86A]/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#722F37]/10"><BookOpen className="h-6 w-6 text-[#722F37]" /></div>
            <h2 className="font-serif text-2xl font-bold text-[#1B3B36]">Author & Speaker</h2>
          </div>
          <p className="text-[#6B5D4F] mb-4">The family systems story behind <em>Before You Say Yes to the Dog</em> — for corporate audiences who want something different.</p>
          <p className="text-sm text-[#2A2520]">How the same systems thinking that solves business problems can be applied to family decisions, preparation, and execution.</p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/contact" className="book-btn-primary">Invite Mohamed to Speak <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </div>
  )
}
