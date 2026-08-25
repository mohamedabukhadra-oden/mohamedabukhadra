'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/books/before-you-say-yes-to-the-dog', label: 'Before You Say Yes' },
  { href: '/books/after-you-say-yes-to-the-dog', label: 'After You Say Yes' },
  { href: '/about', label: 'About Mohamed' },
  { href: '/insights', label: 'Thinking' },
  { href: '/speaking', label: 'Speaking' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-warm-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.05)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-container flex items-center justify-between h-16 md:h-20">
        <Link
          href="/"
          className="font-serif text-xl md:text-2xl text-plum tracking-wide hover:opacity-80 transition-opacity"
        >
          MAK
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-sans text-sm tracking-wide uppercase transition-colors duration-300 hover:text-plum whitespace-nowrap ${
                pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))
                  ? 'text-plum font-medium'
                  : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-foreground hover:text-plum transition-colors duration-300"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-warm-white/95 backdrop-blur-xl lg:hidden">
          <div className="section-container flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-sm tracking-wide uppercase px-3 py-2.5 rounded-md transition-colors ${
                  pathname === link.href
                    ? 'text-plum bg-plum/5'
                    : 'text-foreground/90 hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
