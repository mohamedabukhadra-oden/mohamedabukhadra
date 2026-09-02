'use client'

import Link from 'next/link'
import { useState } from 'react'

const footerNav = [
  { href: '/book-one', label: 'The Book' },
  { href: '/about', label: 'About' },
  { href: '/free', label: 'Free Chapter' },
  { href: '/book-two', label: 'Book Two' },
  // Without this the published articles sit in the sitemap linked from nowhere
  // on the site, which is how they were until now.
  { href: '/insights', label: 'Writing' },
  { href: '/contact', label: 'Contact' },
]

const legalLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
]

export function Footer() {
  const year = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  /**
   * This used to set `submitted` and clear the field without sending anything
   * anywhere — the visitor saw a thank-you and the address was discarded, while
   * a working /api/newsletter sat unused. It now actually subscribes, and only
   * claims success when the request succeeded.
   */
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    const value = email.trim()
    if (!value || busy) return

    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value, source: 'footer' }),
      })
      if (res.ok) {
        setSubmitted(true)
        setEmail('')
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Could not subscribe. Please try again.')
      }
    } catch {
      setError('No connection. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <footer className="bg-ink-dark text-on-dark">
      <div className="section-container py-16 md:py-20">
        {/* Top row: logo + nav + newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-12 md:gap-8">
          {/* Col 1: Logo + tagline */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="font-display text-lg tracking-tight text-on-dark hover:text-accent transition-colors w-fit"
            >
              MAK
            </Link>
            <p className="text-caption text-on-dark-2 max-w-xs">
              Mohamed Abu Khadra is the founder of{' '}
              <a
                href="https://www.oden.pet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-dark hover:text-accent transition-colors underline underline-offset-2"
              >
                Oden Pet
              </a>{' '}
              and{' '}
              <a
                href="https://theknowhow.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-dark hover:text-accent transition-colors underline underline-offset-2"
              >
                The KnowHow Company
              </a>.
            </p>
          </div>

          {/* Col 2: Nav repeat */}
          <nav className="flex flex-col gap-3">
            {footerNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-ui text-sm text-on-dark-2 hover:text-on-dark transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Col 3: Newsletter */}
          <div className="flex flex-col gap-3">
            <p className="font-ui text-sm font-medium text-on-dark">
              Stay updated
            </p>
            {submitted ? (
              <p className="text-caption text-on-dark-2">
                Thanks — you're on the list.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 min-w-0 bg-transparent border border-on-dark-2 text-on-dark placeholder:text-on-dark-2/60 text-sm font-ui px-3 py-2 rounded focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="font-ui text-sm font-medium text-accent hover:text-on-dark transition-colors whitespace-nowrap disabled:opacity-50"
                >
                  {busy ? 'Subscribing…' : 'Subscribe'}
                </button>
              </form>
            )}
            {error && (
              <p className="text-caption text-red-300 mt-2" role="alert">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Bottom row: copyright + legal */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-caption text-on-dark-2">
            &copy; {year} Mohamed Abu Khadra. All rights reserved.
          </p>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-caption text-on-dark-2 hover:text-on-dark transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
