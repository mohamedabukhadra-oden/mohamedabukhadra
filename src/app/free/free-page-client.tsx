'use client'

import { useState, FormEvent } from 'react'
import { RevealObserver } from '@/components/reveal-observer'
import { DownloadButton } from '@/components/download-button'
import { LEAD_MAGNETS } from '@/lib/lead-magnets'
import { Turnstile } from '@/components/forms/turnstile'
import { SeriesFooter } from '@/components/series-footer'

export function FreePageClient() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  // Bot signals — see src/lib/antibot.ts for what the server does with these.
  const [renderedAt] = useState(() => Date.now())
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email.trim()) return

    const website = (e.currentTarget.elements.namedItem('website') as HTMLInputElement | null)?.value

    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'starter-pack', website, renderedAt, turnstileToken }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong.')
      }

      setStatus('sent')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Could not subscribe.')
    }
  }

  return (
    <>
      <RevealObserver />
      <section className="bg-bone section-gap">
        <div className="section-container">
          <div style={{ maxWidth: '68ch' }} className="mx-auto">

            {/* H1 */}
            <h1 className="text-h2 text-ink mb-6 reveal">
              The Puppy Starter Pack.
            </h1>

            {/* Body */}
            <p className="text-longform text-ink mb-4 reveal">
              A free, practical guide for the first weeks with a new puppy —
              the decisions that actually matter before the ones everyone
              argues about online.
            </p>

            <p className="text-longform text-ink mb-6 reveal">
              Sent straight to your inbox, along with occasional word when a
              new chapter, tool, or book is ready. Nothing more often than
              that.
            </p>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="mb-12 md:mb-16 reveal">
              {/* Honeypot — see src/lib/antibot.ts */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', top: 0, width: 1, height: 1, opacity: 0 }}
              />
              {status === 'sent' ? (
                <div>
                  <p className="text-body text-ink font-medium mb-4">
                    It&rsquo;s also on its way to your inbox, in case the tab
                    closes.
                  </p>
                  <DownloadButton
                    href={LEAD_MAGNETS.starterPack.path}
                    magnet="starterPack"
                    page="/free"
                    label="Open the Starter Pack now (PDF)"
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="flex-1 px-4 py-3 font-ui text-sm rounded-[4px] bg-bone border border-rule text-ink placeholder:text-text-3 focus:outline-none focus:border-accent transition-colors"
                      disabled={status === 'sending'}
                    />
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="btn-primary shrink-0 disabled:opacity-60"
                    >
                      {status === 'sending' ? 'Sending…' : 'Send it to me'}
                    </button>
                  </div>
                  <Turnstile onVerify={setTurnstileToken} />
                </div>
              )}
              {status === 'error' && errorMsg && (
                <p className="text-sm text-red-600 mt-2 font-ui">{errorMsg}</p>
              )}
            </form>

            <SeriesFooter />

          </div>
        </div>
      </section>
    </>
  )
}
