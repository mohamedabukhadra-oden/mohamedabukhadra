import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {q:'Is this a dog-training book?',a:'No. It\'s the book before the training book. This book helps families decide whether they should get a dog and prepares the family system before the puppy arrives. Training books assume you already have the dog. This book asks whether you should.'},
  {q:'Is this only for families getting a puppy?',a:'Primarily, yes. The positioning is first-time puppy families before bringing a puppy home. However, the family system principles apply to any family considering dog ownership.'},
  {q:'Is this useful if we\'ve owned dogs before?',a:'Potentially, particularly if the family structure or circumstances have changed. But the primary audience is first-time puppy families.'},
  {q:'Does the book tell children how to train the dog?',a:'No. It gives children clear, age-appropriate operating responsibilities — feeding, cleanup, boundaries, and routines. Playing with the puppy is not the same as caring for the puppy.'},
  {q:'Does the book tell me what breed to buy?',a:'No. It helps the family evaluate fit rather than selling a universal "best breed."'},
  {q:'What is the Family Readiness Test™?',a:'A structured evaluation that looks at workload, roles, commitment, safety, family comfort, and realistic routines. The result is PASS, PAUSE, or NOT READY.'},
  {q:'What if we\'re NOT READY?',a:'Wait. Waiting is treated as a legitimate and responsible outcome — not a failure. Sometimes the best decision for the family and the dog is to wait until the family system is prepared.'},
  {q:'Is this book anti-dog or anti-training?',a:'Absolutely not. The book is explicitly pro-dog and pro-training. The point is that training cannot compensate for a family that hasn\'t prepared for the reality of living with a puppy.'},
  {q:'What\'s the difference between Book 1 and Book 2?',a:'Book 1 (Before You Say Yes to the Dog) is the decision and preparation book — read it before bringing the puppy home. Book 2 (After You Say Yes to the Dog) is the operations and execution book — use it after the puppy arrives.'},
  {q:'When is the book available?',a:'The book is coming soon. In the meantime, you can take the free Family Dog Readiness Quick Check — a 10-question printable that gives you a PASS / PAUSE / NOT READY result.'},
  {q:'Who is Mohamed Abu Khadra?',a:'Mohamed Abu Khadra is a business leader, marketing and growth strategist, visiting professor, and author. He holds a DBA in Strategic Management and is a Fellow Marketer of the Chartered Institute of Marketing (CIM). He wrote these books not as a dog expert, but as a father who couldn\'t make getting a dog work — and applied his professional systems thinking to the problem.'},
]

export default function FAQPage() {
  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 min-h-screen bg-[#F5F1E8]">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#1B3B36] mb-4">Frequently Asked Questions</h1>
          <div className="w-16 h-1 bg-[#C9A86A] rounded-full mx-auto mt-6" />
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <details key={i} className="group rounded-lg border border-[#EBE5D5] bg-white p-5 md:p-6">
              <summary className="flex items-center justify-between cursor-pointer font-medium text-[#1B3B36] text-lg">{faq.q}<ChevronDown className="h-5 w-5 text-[#C9A86A] shrink-0 group-open:rotate-180 transition-transform" /></summary>
              <p className="mt-4 text-[#6B5D4F] leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
        <div className="text-center mt-8"><Link href="/quick-check" className="book-btn-primary">Take the Quick Check</Link></div>
      </div>
    </div>
  )
}
