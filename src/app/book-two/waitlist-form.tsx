'use client'

import { useState, type FormEvent } from 'react'

export function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'book-two-waitlist' }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong.')
      }
      setStatus('done')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>
      {status === 'done' ? (
        <p className="font-text text-text-2 text-body">
          You&rsquo;re on the list. We&rsquo;ll be in touch.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <label htmlFor="book-two-email" className="sr-only">
            Email address
          </label>
          <input
            id="book-two-email"
            type="email"
            required
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 min-w-0 bg-bone-alt border border-rule text-ink placeholder:text-text-3 text-sm font-ui px-4 py-3 rounded-[4px] focus:outline-none focus:border-accent transition-colors"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            className="btn-primary whitespace-nowrap disabled:opacity-50"
            disabled={status === 'loading'}
            style={{
              backgroundColor: 'var(--teal)',
            }}
          >
            {status === 'loading' ? '...' : "Tell me when it's out"}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="text-caption mt-3" style={{ color: 'var(--warn)' }}>
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  )
}
