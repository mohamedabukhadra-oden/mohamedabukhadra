/**
 * Lead magnet PDFs — single source of truth for the three permanent download
 * paths and which page/email each one belongs to.
 *
 * Each file is the real, finished design from the author's marketing
 * package (not a placeholder), and each one carries its own destination URL
 * printed in its footer — that URL is what decides which page serves it
 * below, not the historical key name:
 *   - `reader` (file footer reads ".../before") -> served at /before
 *   - `starterPack` (file footer reads ".../free") -> served at /free
 *   - `reset` (file footer reads ".../reset") -> served at /reset and /shelters
 *
 * These paths are printed in physical books and handed to shelters as QR
 * codes — see the dev brief. Once printed they can never move. Do not rename
 * the files under public/downloads/ or change these path strings; if the
 * site is ever rebuilt, 301-redirect the old paths instead of breaking them.
 */
export const LEAD_MAGNETS = {
  reset: {
    path: '/downloads/the-reset.pdf',
    label: 'The Reset',
  },
  reader: {
    path: '/downloads/reader-edition.pdf',
    label: 'The Puppy Starter Pack — Reader Edition',
  },
  starterPack: {
    path: '/downloads/starter-pack.pdf',
    label: 'The Puppy Starter Pack',
  },
} as const

export type LeadMagnetKey = keyof typeof LEAD_MAGNETS
