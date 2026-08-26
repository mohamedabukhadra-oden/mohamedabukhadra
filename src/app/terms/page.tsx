import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use | Mohamed Abu Khadra',
  robots: { index: false },
}

export default function TermsPage() {
  return (
    <main className="bg-bone text-ink">
      <section className="section-container section-gap">
        <h1 className="text-h2 font-display">Terms of Use</h1>
        <div className="mt-8 max-w-2xl space-y-10 font-ui text-body text-text-2">
          <section>
            <h2 className="text-h2 font-display mb-3">Intellectual Property</h2>
            <p>
              All original content on this website — including text, images,
              and design — is copyright Mohamed Abu Khadra unless otherwise
              noted. You may not reproduce, distribute, or republish any
              content without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-h2 font-display mb-3">The Reset Chapter</h2>
            <p>
              The free chapter (The Reset Chapter) is provided as a gift to
              readers. You are welcome to share it with friends and link to it
              freely. You may not resell it, modify it, or distribute it under
              a different name.
            </p>
          </section>

          <section>
            <h2 className="text-h2 font-display mb-3">Limitation of Liability</h2>
            <p>
              The content on this site is provided for informational purposes
              only. I make no guarantees about the accuracy, completeness, or
              suitability of the content. I am not liable for any damages
              arising from your use of this website or reliance on its content.
            </p>
          </section>

          <section>
            <h2 className="text-h2 font-display mb-3">Changes to Terms</h2>
            <p>
              I may update these terms from time to time. Continued use of the
              site after changes are posted means you accept the updated terms.
              Significant changes will be noted in the newsletter.
            </p>
          </section>

          <section className="border-t border-rule pt-8">
            <h2 className="text-h2 font-display mb-3">Contact</h2>
            <p>
              Questions about these terms? Reach me at{' '}
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
