'use client'

import { trackEvent } from '@/components/first-party-analytics'
import type { LeadMagnetKey } from '@/lib/lead-magnets'

/**
 * Opens a lead-magnet PDF inline (no `download` attribute, so iOS Safari and
 * Android Chrome show it in their built-in viewer instead of forcing a save
 * dialog) and fires a first-party analytics event first, so we can see which
 * magnet actually gets opened.
 */
export function DownloadButton({
  href,
  magnet,
  page,
  label = 'Download the PDF',
  variant = 'primary',
}: {
  href: string
  magnet: LeadMagnetKey
  page: string
  label?: string
  variant?: 'primary' | 'secondary'
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      onClick={() => trackEvent('lead_magnet_download', { magnet, page })}
      className={variant === 'primary' ? 'btn-primary' : 'btn-secondary'}
    >
      {label}
    </a>
  )
}
