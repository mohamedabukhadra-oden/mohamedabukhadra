'use client'
import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, AlertCircle, XCircle, ArrowRight, Loader2, Mail } from 'lucide-react'

export default function QuickCheckPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!email) return
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setSubmitted(true); setIsLoading(false)
  }

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 min-h-screen">
      <div className="max-w-2xl mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#1B3B36] px-4 py-1.5 mb-6"><span className="text-xs font-medium text-[#C9A86A]">FREE LEAD MAGNET</span></div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#1B3B36] mb-4">Before You Get the Puppy,<br />Test the Family.</h1>
          <div className="w-16 h-1 bg-[#C9A86A] rounded-full mx-auto mb-6" />
          <p className="text-lg text-[#6B5D4F]">10 questions. One honest conversation. Three possible outcomes.</p>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[{icon:CheckCircle2,label:'PASS',desc:'Proceed carefully',color:'text-emerald-600 bg-emerald-50'},{icon:AlertCircle,label:'PAUSE',desc:'Fix weak points',color:'text-amber-600 bg-amber-50'},{icon:XCircle,label:'NOT READY',desc:'Wait',color:'text-red-600 bg-red-50'}].map((item,i) => (
            <div key={i} className="text-center p-4 rounded-lg bg-white border border-[#EBE5D5]"><div className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${item.color} mb-2`}><item.icon className="h-5 w-5" /></div><p className="font-bold text-[#1B3B36] text-sm">{item.label}</p><p className="text-xs text-[#6B5D4F] mt-1">{item.desc}</p></div>
          ))}
        </div>
        <div className="p-6 rounded-xl bg-white border border-[#EBE5D5] mb-8">
          <p className="text-[#2A2520] leading-relaxed mb-4">The Quick Check asks the questions most families <em>don't</em> ask before getting a dog:</p>
          <ul className="space-y-2 text-[#6B5D4F] text-sm">
            {['Who will actually do the daily work?','What happens when the puppy wakes everyone up?','Who cleans the accidents?','What happens when the kids lose interest?','Is Mum comfortable with the arrangement?','Who controls the puppy\'s freedom in the house?','Can your current schedule absorb the workload?'].map((q,i) => <li key={i} className="flex items-start gap-2"><span className="text-[#C9A86A] mt-0.5">◆</span>{q}</li>)}
          </ul>
        </div>
        {submitted ? (
          <div className="p-8 rounded-xl bg-[#1B3B36] text-white text-center"><CheckCircle2 className="h-12 w-12 text-[#C9A86A] mx-auto mb-4" /><h2 className="font-serif text-2xl font-bold mb-2">Check Your Email</h2><p className="text-white/80">We've sent the Family Dog Readiness Quick Check to <strong>{email}</strong>.</p><Link href="/" className="inline-flex items-center gap-2 mt-6 text-[#C9A86A] hover:text-white">← Back to Home</Link></div>
        ) : (
          <div className="p-8 rounded-xl bg-gradient-to-br from-[#1B3B36] to-[#2D5249] text-white">
            <div className="flex items-center gap-2 mb-4"><Mail className="h-5 w-5 text-[#C9A86A]" /><h2 className="font-serif text-xl font-bold">Get the Printable Quick Check</h2></div>
            <p className="text-white/70 text-sm mb-4">Enter your email and get the free 10-question printable you can use with your whole family.</p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="email" placeholder="you@family.com" value={email} onChange={e => setEmail(e.target.value)} required disabled={isLoading} className="w-full h-12 rounded-lg bg-white/10 border border-white/20 px-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#C9A86A]" autoComplete="email" autoFocus />
              <button type="submit" disabled={isLoading} className="w-full h-12 rounded-lg bg-[#C9A86A] text-white font-semibold hover:bg-[#DDB87A] transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2">{isLoading ? <><Loader2 className="h-4 w-4 animate-spin" />Sending...</> : <>Get the Quick Check <ArrowRight className="h-4 w-4" /></>}</button>
            </form>
            <p className="text-xs text-white/50 mt-3">No spam. Just the Quick Check + occasional family dog readiness insights.</p>
          </div>
        )}
        <div className="text-center mt-8"><Link href="/" className="text-sm text-[#6B5D4F] hover:text-[#1B3B36]">← Back to Home</Link></div>
      </div>
    </div>
  )
}
