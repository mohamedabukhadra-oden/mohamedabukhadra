'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { SERIES_URL } from '@/lib/buy-url'

const footerNav = [
  { href: '/book-one', label: 'Book One' },
  { href: '/book-two', label: 'Book Two' },
  { href: '/about', label: 'About' },
  { href: '/free', label: 'Free Guide' },
  // Without this the published articles sit in the sitemap linked from nowhere
  // on the site, which is how they were until now.
  { href: '/insights', label: 'Insights' },
  { href: '/contact', label: 'Contact' },
]

const legalLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
]

// Pages that already ask for an email themselves (a lead-magnet gate or a
// waitlist form) skip the footer's own "Stay updated" box — two email
// prompts stacked on one page is the redundancy this avoids, not a second
// legitimate list.
const SUPPRESS_NEWSLETTER_ON = ['/free', '/book-two']

export function Footer() {
  const year = new Date().getFullYear()
  const pathname = usePathname()
  const showNewsletter = !SUPPRESS_NEWSLETTER_ON.some(
    (p) => pathname === p || pathname?.startsWith(p + '/')
  )
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  // Bot signals — see src/lib/antibot.ts for what the server does with these.
  const [renderedAt] = useState(() => Date.now())

  /**
   * This used to set `submitted` and clear the field without sending anything
   * anywhere — the visitor saw a thank-you and the address was discarded, while
   * a working /api/newsletter sat unused. It now actually subscribes, and only
   * claims success when the request succeeded.
   */
  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = email.trim()
    if (!value || busy) return

    const website = (e.currentTarget.elements.namedItem('website') as HTMLInputElement | null)?.value

    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value, source: 'footer', website, renderedAt }),
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
        <div
          className={`grid grid-cols-1 gap-12 md:gap-8 ${
            showNewsletter ? 'md:grid-cols-[1fr_1fr_1fr]' : 'md:grid-cols-[1fr_1fr]'
          }`}
        >
          {/* Col 1: Logo + tagline */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="w-fit" aria-label="Mohamed Abu Khadra — home">
              <Image
                src="/mohamed.jpg"
                alt="Mohamed Abu Khadra"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover ring-1 ring-on-dark-2/30"
              />
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
            <a
              href={SERIES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-caption text-on-dark-2 hover:text-on-dark transition-colors underline underline-offset-2 w-fit"
            >
              See the full system — both books
            </a>
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

          {/* Col 3: Newsletter — skipped on pages that already have their own
              email capture (see SUPPRESS_NEWSLETTER_ON above). */}
          {showNewsletter && (
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
                {/* Honeypot — see src/lib/antibot.ts */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', top: 0, width: 1, height: 1, opacity: 0 }}
                />
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
          )}
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
