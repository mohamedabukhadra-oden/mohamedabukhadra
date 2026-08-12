import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

export default function ReadInsidePage() {
  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 min-h-screen bg-[#F5F1E8]">
      <div className="max-w-2xl mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#1B3B36] mb-4">Read the First Pages</h1>
          <div className="w-16 h-1 bg-[#C9A86A] rounded-full mx-auto mb-6" />
          <p className="text-lg text-[#6B5D4F] italic">Start with the story behind the book.</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <div className="space-y-6 text-[#2A2520] leading-relaxed">
            <p className="text-xl font-serif italic text-[#1B3B36]">Three attempts. Three failures. A daughter in tears.</p>
            <p>The first time we tried to bring a dog into our family, we did what most families do. We saw a puppy, fell in love, and brought him home. Within three months, the excitement had faded. The reality of early mornings, potty accidents, chewed shoes, and a puppy who needed more attention than anyone had anticipated — it broke us.</p>
            <p>The dog went back. My daughter cried for days.</p>
            <p>The second time, I was determined. I read every dog training book I could find. I watched hundreds of videos. I prepared for the training. But I didn't prepare for the family. The same patterns emerged — unclear roles, overwhelmed parents, children who lost interest after week two, and a mother who felt trapped in her own home.</p>
            <p>That attempt ended too.</p>
            <p>The third time, I stopped asking: <em>"How do we get the dog?"</em></p>
            <p className="font-serif text-xl text-[#722F37]">And I started asking: <em>"Why isn't this working?"</em></p>
            <p>That question changed everything.</p>
            <p>I realized the problem wasn't the dog. It wasn't the training method. It wasn't the breed or the breeder or the timing. The problem was that no one had ever helped our family understand what it actually means to carry a dog — not for a week, not for a month, but for years.</p>
            <p>So I went back to something I knew well from my professional life: understanding the real problem, finding its causes, building a system, and testing it.</p>
            <p>The result wasn't another training method. It was a family operating system for dog ownership. A system that asks the hard questions <em>before</em> the puppy comes home. A system that gives every family member a role. A system that treats the mother's comfort as part of the design, not an afterthought.</p>
            <p>I tested it on my own family. It worked.</p>
            <p>And that's how <strong>Before You Say Yes to the Dog</strong> was born.</p>
            <p className="font-serif text-xl text-[#1B3B36] italic">System first. Puppy second. Family always.</p>
          </div>
        </div>
        <div className="mt-12 p-8 rounded-xl bg-white border border-[#EBE5D5] text-center">
          <BookOpen className="h-10 w-10 text-[#C9A86A] mx-auto mb-4" />
          <h2 className="font-serif text-xl font-bold text-[#1B3B36] mb-2">Want to Read More?</h2>
          <p className="text-[#6B5D4F] mb-4">The full book is coming soon. In the meantime, take the free Family Dog Readiness Quick Check.</p>
          <Link href="/quick-check" className="book-btn-primary">Take the Quick Check <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="text-center mt-8"><Link href="/" className="text-sm text-[#6B5D4F] hover:text-[#1B3B36]">← Back to Home</Link></div>
      </div>
    </div>
  )
}
