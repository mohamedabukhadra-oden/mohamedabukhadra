import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Suspense } from 'react'
import { Analytics } from '@/components/analytics'
import { CookieConsent } from '@/components/cookie-consent'
import { FirstPartyAnalytics } from '@/components/first-party-analytics'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mohamedabukhadra.com'),
  title: 'Mohamed Abu Khadra — Author',
  description:
    'Everyone sells you the dream. Mohamed Abu Khadra asks the questions behind it. Author of Before You Say Yes to the Dog and After You Say Yes to the Dog.',
  keywords: [
    'Mohamed Abu Khadra',
    'Before You Say Yes to the Dog',
    'After You Say Yes to the Dog',
    'business strategy',
    'marketing strategy',
    'visiting professor',
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
    canonical: 'https://mohamedabukhadra.com',
  },
  openGraph: {
    title: 'Mohamed Abu Khadra — Author',
    description:
      'Everyone sells you the dream. Mohamed Abu Khadra asks the questions behind it.',
    url: 'https://mohamedabukhadra.com',
    siteName: 'Mohamed Abu Khadra',
    type: 'website',
    images: [],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohamed Abu Khadra — Author',
    description:
      'Author of Before You Say Yes to the Dog. Everyone sells you the dream. Mohamed asks the questions behind it.',
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${inter.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="min-h-screen flex flex-col bg-background">
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
