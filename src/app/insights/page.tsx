import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

export default function InsightsPage() {
  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 min-h-screen bg-[#F5F1E8]">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#1B3B36] mb-4">Insights</h1>
          <p className="text-lg text-[#6B5D4F] italic">Thinking at the intersection of strategy, execution, and real life.</p>
          <div className="w-16 h-1 bg-[#C9A86A] rounded-full mx-auto mt-6" />
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {[
            { title: 'Business & Strategy', desc: 'Marketing, growth, go-to-market, partnerships and execution.', color: 'bg-[#1B3B36]/10' },
            { title: 'Marketing & Growth', desc: 'Practical thinking on brand, acquisition, retention and scale.', color: 'bg-[#C9A86A]/10' },
            { title: 'Family Systems & Dog Ownership', desc: 'The thinking behind the books — readiness, preparation and family operation.', color: 'bg-[#722F37]/10' },
          ].map((cat, i) => (
            <div key={i} className={`p-6 rounded-xl ${cat.color} border border-[#EBE5D5]`}>
              <h3 className="font-serif text-lg font-bold text-[#1B3B36] mb-2">{cat.title}</h3>
              <p className="text-sm text-[#6B5D4F]">{cat.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center p-8 rounded-xl bg-white border border-[#EBE5D5]">
          <BookOpen className="h-10 w-10 text-[#C9A86A] mx-auto mb-4" />
          <h2 className="font-serif text-xl font-bold text-[#1B3B36] mb-2">Articles Coming Soon</h2>
          <p className="text-[#6B5D4F] mb-4">Insights and articles will be published here — starting with pieces built around the real questions families ask before getting a dog.</p>
          <Link href="/quick-check" className="book-btn-outline text-sm">Take the Quick Check <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
      </div>
    </div>
  )
}
