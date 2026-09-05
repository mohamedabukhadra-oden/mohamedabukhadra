import type { Metadata } from 'next'
import { Source_Serif_4, Inter } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Suspense } from 'react'
import { Analytics } from '@/components/analytics'
import { CookieConsent } from '@/components/cookie-consent'
import { FirstPartyAnalytics } from '@/components/first-party-analytics'
import { SITE_URL } from '@/lib/seo'

const sourceSerif4 = Source_Serif_4({
  variable: '--font-source-serif-4',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Mohamed Abu Khadra — Author',
  description:
    'Author of Before You Say Yes to the Dog and After You Say Yes to the Dog. Questions behind the decisions that shape your life with a dog.',
  keywords: [
    'Mohamed Abu Khadra',
    'Before You Say Yes to the Dog',
    'After You Say Yes to the Dog',
    'family dog system',
    'German Shepherd puppy',
    'first time dog owner',
    'puppy readiness',
    'dog ownership preparation',
  ],
  authors: [{ name: 'Mohamed Abu Khadra' }],
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Mohamed Abu Khadra — Author',
    description:
      'Questions behind the decisions that shape your life with a dog.',
    url: SITE_URL,
    siteName: 'Mohamed Abu Khadra',
    type: 'website',
    // Was an empty array, so every share — LinkedIn, WhatsApp, X — rendered a
    // blank card. The cover is portrait (853×1280) and platforms expecting a
    // 1.91:1 landscape card will crop it; a purpose-made 1200×630 card is the
    // better long-term answer, but a cropped cover beats nothing.
    images: [
      {
        url: '/book-cover-1.png',
        width: 853,
        height: 1280,
        alt: 'Before You Say Yes to the Dog — A Family Guide Before Bringing Home a Puppy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohamed Abu Khadra — Author',
    description:
      'Author of Before You Say Yes to the Dog. Questions behind the decisions that shape your life with a dog.',
    images: ['/book-cover-1.png'],
  },
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_META_DOMAIN_VERIFICATION
      ? { other: { 'facebook-domain-verification': process.env.NEXT_PUBLIC_META_DOMAIN_VERIFICATION } }
      : {}),
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The font variable classes must sit on <html>, not <body>. globals.css
    // defines --font-display/--font-text/--font-ui at :root (which *is* <html>)
    // in terms of --font-inter and --font-source-serif-4. Custom properties
    // inherit downward only, so declaring them on <body> left every one of those
    // unresolved at :root and silently fell back to the system UI font.
    <html
      lang="en"
      className={`${sourceSerif4.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-bone text-ink">
        <div className="min-h-screen flex flex-col bg-bone">
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Analytics />
        <Suspense fallback={null}>
          <FirstPartyAnalytics />
        </Suspense>
        <CookieConsent />
      </body>
    </html>
  )
}
