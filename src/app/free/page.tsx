'use client'

import { useState, FormEvent } from 'react'
import { RevealObserver } from '@/components/reveal-observer'

export default function FreePage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'reset-chapter' }),
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
              It&rsquo;s already going badly. That is not the end of the story.
            </h1>

            {/* Body */}
            <p className="text-longform text-ink mb-4 reveal">
              The Reset chapter is Chapter 10 of Before You Say Yes to the Dog.
              Free, in full.
            </p>

            <p className="text-longform text-ink mb-6 reveal">
              What to do when the puppy is already home and the week has gone
              wrong: why a bad week is not a bad dog, why &ldquo;try harder&rdquo;
              is the wrong instruction, and how to change the system instead of
              the effort.
            </p>

            {/* Warning */}
            <div className="mb-10 reveal">
              <p className="font-text text-text-2 text-body italic">
                One honest warning inside it: if the real answer was &ldquo;no,
                not now,&rdquo; a reset won&rsquo;t fix that. The chapter says so
                plainly.
              </p>
            </div>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="mb-12 md:mb-16 reveal">
              {status === 'sent' ? (
                <p className="text-body text-ink font-medium">
                  Check your inbox. The chapter is on its way.
                </p>
              ) : (
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
              )}
              {status === 'error' && errorMsg && (
                <p className="text-sm text-red-600 mt-2 font-ui">{errorMsg}</p>
              )}
            </form>

            {/* Pull-quote echo */}
            <blockquote className="border-l-2 border-rule pl-8 mb-12 md:mb-16 reveal">
              <p className="font-text italic text-text-2 text-body">
                Koudy, Milo, and Snoopy all went to families who could give them
                what we couldn&rsquo;t&hellip; It is the last responsible thing a
                family can do for a dog.
              </p>
            </blockquote>

            {/* Shelter & rescue block */}
            <div className="bg-bone-alt p-6 rounded-[4px] reveal">
              <p className="text-caption text-text-3">
                Shelters and rescues: share this link freely with adopters and
                returning families. No permission needed, no attribution required.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}