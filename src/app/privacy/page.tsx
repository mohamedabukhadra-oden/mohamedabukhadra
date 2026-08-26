import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Mohamed Abu Khadra',
  robots: { index: false },
}

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-bone text-ink">
      <section className="section-container section-gap">
        <h1 className="text-h2 font-display">Privacy Policy</h1>
        <div className="mt-8 max-w-2xl space-y-10 font-ui text-body text-text-2">
          <section>
            <h2 className="text-h2 font-display mb-3">Information We Collect</h2>
            <p className="mb-4">
              When you sign up for my newsletter, I collect your email address
              (and optionally your name) so I can send you updates. That&rsquo;s
              it for personal data.
            </p>
            <p>
              I use first-party, privacy-friendly analytics to understand how
              visitors use the site — things like which pages are visited, device
              type, and general referral sources. I do not use third-party
              cookies, tracking pixels, or any external analytics services that
              follow you around the web.
            </p>
          </section>

          <section>
            <h2 className="text-h2 font-display mb-3">How We Use Information</h2>
            <p className="mb-4">
              Your email address is used solely to send the newsletter you
              signed up for — nothing else.
            </p>
            <p>
              Aggregated analytics data helps me understand site traffic and
              improve the content and experience. No individual visitor is
              identified through analytics.
            </p>
          </section>

          <section>
            <h2 className="text-h2 font-display mb-3">Data Storage</h2>
            <p>
              This site is hosted on Vercel. Newsletter subscriber data is stored
              in Vercel Postgres, with data residency in Egypt and the EU. I do
              not sell, rent, or share your personal data with any third party.
            </p>
          </section>

          <section>
            <h2 className="text-h2 font-display mb-3">Your Rights</h2>
            <p className="mb-4">
              You have the right to access or delete your data at any time. Just
              email me at the address below and I&rsquo;ll take care of it
              promptly.
            </p>
            <p>
              Every newsletter email includes a one-click unsubscribe link, so
              you can opt out whenever you like without needing to contact me.
            </p>
          </section>

          <section className="border-t border-rule pt-8">
            <h2 className="text-h2 font-display mb-3">Contact</h2>
            <p>
              Questions or requests? Reach me at{' '}
              <a
                href="mailto:hello@mohamedabukhadra.com"
                className="underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                hello@mohamedabukhadra.com
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}
