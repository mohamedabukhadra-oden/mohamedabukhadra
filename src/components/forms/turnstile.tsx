'use client'

import * as React from 'react'
import Script from 'next/script'

interface TurnstileProps {
  onVerify: (token: string) => void
  className?: string
}

/**
 * Cloudflare Turnstile widget for spam protection.
 * Renders nothing if NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set,
 * so forms still work in environments without Turnstile configured.
 */
export function Turnstile({ onVerify, className }: TurnstileProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const containerRef = React.useRef<HTMLDivElement>(null)
  const renderedRef = React.useRef(false)
  const widgetIdRef = React.useRef<string | null>(null)

  React.useEffect(() => {
    if (!siteKey) return
    const render = () => {
      if (renderedRef.current || !containerRef.current || !window.turnstile) return
      renderedRef.current = true
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: onVerify,
        theme: 'auto',
        // Stays fully invisible for traffic Cloudflare already trusts, and
        // only renders a visible challenge for the traffic that needs one —
        // most real visitors never see this widget at all.
        appearance: 'interaction-only',
      })
    }
    // wait for script to load
    const t = setInterval(() => {
      if (window.turnstile) {
        render()
        clearInterval(t)
      }
    }, 100)
    return () => {
      clearInterval(t)
      if (widgetIdRef.current && window.turnstile) {
        try { window.turnstile.remove(widgetIdRef.current) } catch { /* ignore */ }
      }
    }
  }, [siteKey, onVerify])

  if (!siteKey) {
    // Turnstile not configured — form will still submit, server-side verification skipped.
    return null
  }

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" async defer />
      <div ref={containerRef} className={className} />
    </>
  )
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: {
        sitekey: string
        callback?: (token: string) => void
        theme?: 'light' | 'dark' | 'auto'
        appearance?: 'always' | 'execute' | 'interaction-only'
      }) => string
      remove: (id: string) => void
    }
  }
}
