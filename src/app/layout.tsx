import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Analytics } from '@/components/analytics'
import { CookieConsent } from '@/components/cookie-consent'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'], display: 'swap' })
const playfair = Playfair_Display({ variable: '--font-playfair', subsets: ['latin'], display: 'swap', weight: ['400','500','600','700'] })

export const metadata: Metadata = {
  // Without metadataBase, relative Open Graph image paths resolve against
  // localhost and social previews come out blank.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mohamedabukhadra.com'),
  title: 'Mohamed Abu Khadra — Business Leader · Strategist · Author',
  description: 'Business leader, marketing and growth strategist, visiting professor, and author. I build systems that have to work in real life — in business and at home.',
  keywords: ['Mohamed Abu Khadra','business strategist','marketing strategy','visiting professor','author','Before You Say Yes to the Dog','Family Readiness Test','DBA Strategic Management'],
  openGraph: {
    title: 'Mohamed Abu Khadra — Business Leader · Strategist · Author',
    description: 'I build systems that have to work in real life — in business and at home.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <div className="min-h-screen flex flex-col bg-[#F5F1E8]">
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        {/* Every SDK below no-ops unless its NEXT_PUBLIC_* env var is set, and
            each waits on the visitor's consent choice before firing. */}
        <Analytics />
        <CookieConsent />
      </body>
    </html>
  )
}
