import Link from 'next/link'

const footerLinks = [
  { href: '/books/before-you-say-yes-to-the-dog', label: 'Before You Say Yes' },
  { href: '/books/after-you-say-yes-to-the-dog', label: 'After You Say Yes' },
  { href: '/about', label: 'About Mohamed' },
  { href: '/insights', label: 'Thinking' },
  { href: '/speaking', label: 'Speaking' },
]

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohamedabukhadra' },
  { label: 'X', href: 'https://x.com/mohamedabukhadra' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-near-black text-warm-white/60">
      <div className="section-container py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              className="font-serif text-xl text-warm-white/80 tracking-wide hover:text-warm-white transition-colors w-fit"
            >
              MAK
            </Link>
            <p className="font-sans text-xs text-warm-white/30">
              &copy; {year} Mohamed Abu Khadra. All rights reserved.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-xs tracking-wider uppercase text-warm-white/50 hover:text-warm-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-start md:items-end gap-2">
            <a
              href="https://theknowhow.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs tracking-wider uppercase text-turquoise hover:text-turquoise-light transition-colors"
            >
              The KnowHow
            </a>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs text-warm-white/30 hover:text-warm-white/60 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
