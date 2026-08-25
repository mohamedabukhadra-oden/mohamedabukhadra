'use client'

import { useState } from 'react'
import { Mail, CheckCircle, BookOpen, Shield } from 'lucide-react'

export function StayBackstageSection() {
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
        body: JSON.stringify({ email, source: 'stay-backstage-footer' }),
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

  return (
    <section className="bg-near-black text-warm-white">
      <div className="section-container py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto">
          <p className="section-label text-warm-white/40 mb-6">Stay Connected</p>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
            Stay backstage.
          </h2>

          <p className="prose-editorial text-warm-white/50 mt-6">
            Get notified when new books are published, receive free resources like the
            Simple Family Readiness Test, and read things here before anyone else does.
          </p>

          <div className="w-16 h-px bg-antique-gold mx-auto my-10" />

          {submitted ? (
            <div>
              <CheckCircle className="w-12 h-12 text-turquoise mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-light tracking-tight text-warm-white mb-3">
                Welcome backstage.
              </h3>
              <p className="font-sans text-sm text-warm-white/50">
                Check your inbox for your free resources.
              </p>
            </div>
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  aria-label="Email address for mailing list subscription"
                  required
                  className={`flex-1 font-sans text-sm px-4 py-3 rounded-full border transition-colors duration-300 outline-none focus:ring-2 focus:ring-turquoise/40 bg-warm-white/10 border-warm-white/20 text-warm-white placeholder:text-warm-white/30 ${error ? 'border-red-400' : ''}`}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="font-sans text-sm tracking-wide uppercase px-6 py-3 rounded-full bg-turquoise text-near-black hover:bg-turquoise-light transition-colors duration-300 whitespace-nowrap font-medium disabled:opacity-60"
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>

              {error && <p className="font-sans text-xs text-red-400 mt-3 text-center">{error}</p>}

              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-xs font-sans text-warm-white/30">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3 h-3" />
                  Book launch updates
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3 h-3" />
                  Free resources
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3" />
                  No spam, ever
                </span>
              </div>
            </>
          )}

          <p className="font-sans text-xs text-warm-white/20 mt-10">
            mohamedabukhadra.com
          </p>
        </div>
      </div>
    </section>
  )
}
