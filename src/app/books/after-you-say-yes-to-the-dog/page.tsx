import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Book2Page() {
  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 min-h-screen bg-[#F5F1E8]">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#722F37] px-4 py-1.5 mb-6"><span className="text-xs font-medium text-[#C9A86A]">BOOK 2 — COMING 2026</span></div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#1B3B36] mb-4">After You Say Yes to the Dog</h1>
          <p className="text-lg text-[#6B5D4F] italic">We got the dog. Now what?</p>
          <div className="w-16 h-1 bg-[#C9A86A] rounded-full mx-auto mt-6" />
        </div>
        <div className="space-y-6 text-lg text-[#2A2520] leading-relaxed mb-8">
          <p><strong className="text-[#1B3B36]">Before You Say Yes</strong> helps you decide.</p>
          <p><strong className="text-[#1B3B36]">After You Say Yes</strong> helps you operate.</p>
          <p>Once the puppy arrives, the second book becomes the practical manual for routines, pressure moments, messy days and everyday life after the puppy arrives.</p>
          <p>You don't read it like a conventional book. You open the manual you need when the situation happens.</p>
        </div>
        <div className="grid gap-3 mb-12">
          {['First 48 Hours','Potty Training','Mum SAFE','Kids Daily Operator','Visitors, Workers & Deliveries','Outdoor Freedom & Play','Mental Games','Hygiene & Parasites','Emergency','Reset'].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#EBE5D5]">
              <span className="text-[#C9A86A]">◆</span>
              <span className="text-sm text-[#2A2520]">{item}</span>
            </div>
          ))}
        </div>
        <div className="text-center p-8 rounded-xl bg-[#1B3B36] text-white">
          <p className="font-serif text-xl text-[#C9A86A] italic mb-4">Coming 2026</p>
          <p className="text-white/80 mb-6">In the meantime, start with Book 1 — the decision comes first.</p>
          <Link href="/books/before-you-say-yes-to-the-dog" className="inline-flex items-center gap-2 bg-[#C9A86A] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#DDB87A]">Explore Book 1 <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </div>
  )
}
