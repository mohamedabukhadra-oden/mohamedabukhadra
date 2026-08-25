'use client'

import { useState } from 'react'
import { Mail, BookOpen, Shield, CheckCircle } from 'lucide-react'

export function SubscribeCTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'subscribe-cta-home' }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-plum/[0.04] rounded-2xl p-8 md:p-12">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="w-12 h-12 text-turquoise mx-auto mb-4" />
          <h3 className="font-serif text-2xl md:text-3xl font-light tracking-tight mb-3">
            You are on the list.
          </h3>
          <p className="font-sans text-sm leading-relaxed max-w-md mx-auto text-muted-foreground">
            You will be the first to know when the book is published.
            Check your inbox for the Simple Family Readiness Test.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-plum/[0.04] rounded-2xl p-8 md:p-12">
      <div className="max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-turquoise/10 flex items-center justify-center mx-auto mb-6">
          <Mail className="w-6 h-6 text-turquoise" />
        </div>

        {/* Headline */}
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-4">
          Get the Simple Family
          <span className="block text-plum">Readiness Test</span>
        </h2>

        {/* Description */}
        <p className="font-sans text-base leading-relaxed max-w-lg mx-auto mb-8 text-muted-foreground">
          Subscribe to be the first to know when{' '}
          <em>Before You Say Yes to the Dog</em> is published — and receive the{' '}
          <strong className="text-foreground">Simple Family Readiness Test</strong>{' '}
          directly to your email.
        </p>

        {/* Benefits */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 text-sm font-sans text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Book launch notification
          </span>
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            Free Readiness Test
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" />
            No spam, ever
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            aria-label="Email address for mailing list subscription"
            required
            className={`flex-1 font-sans text-sm px-4 py-3 rounded-full border transition-colors duration-300 outline-none focus:ring-2 focus:ring-turquoise/40 bg-white border-border text-foreground placeholder:text-muted-foreground ${error ? 'border-red-400' : ''}`}
          />
          <button
            type="submit"
            disabled={loading}
            className="font-sans text-sm tracking-wide uppercase px-6 py-3 rounded-full bg-turquoise text-near-black hover:bg-turquoise-light transition-colors duration-300 whitespace-nowrap font-medium disabled:opacity-60"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {error && (
          <p className="font-sans text-xs text-red-400 mt-3">{error}</p>
        )}

        <p className="font-sans text-xs mt-4 text-muted-foreground/60">
          The Simple Family Readiness Test is a trademarked tool by Mohamed Abu Khadra.
        </p>
      </div>
    </div>
  )
}
