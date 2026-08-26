import type { Metadata } from 'next'
import { Source_Serif_4, Inter } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Suspense } from 'react'
import { Analytics } from '@/components/analytics'
import { CookieConsent } from '@/components/cookie-consent'
import { FirstPartyAnalytics } from '@/components/first-party-analytics'

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mohamedabukhadra.com'),
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
    canonical: 'https://mohamedabukhadra.com',
  },
  openGraph: {
    title: 'Mohamed Abu Khadra — Author',
    description:
      'Questions behind the decisions that shape your life with a dog.',
    url: 'https://mohamedabukhadra.com',
    siteName: 'Mohamed Abu Khadra',
    type: 'website',
    images: [],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohamed Abu Khadra — Author',
    description:
      'Author of Before You Say Yes to the Dog. Questions behind the decisions that shape your life with a dog.',
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
        className={`${sourceSerif4.variable} ${inter.variable} antialiased bg-bone text-ink`}
      >
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
