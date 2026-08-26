'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/book-one', label: 'The Book' },
  { href: '/about', label: 'About' },
  { href: '/free', label: 'Free Chapter' },
  { href: '/book-two', label: 'Book Two' },
  { href: '/contact', label: 'Contact' },
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const closeMenu = useCallback(() => setOpen(false), [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname?.startsWith(href + '/')
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? 'bg-bone border-b border-rule'
            : 'bg-transparent'
        }`}
      >
        <nav className="section-container flex items-center justify-between h-16 md:h-18">
          <Link
            href="/"
            className="font-display text-xl tracking-tight text-ink hover:text-accent transition-colors duration-200"
          >
            MAK
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-ui text-sm transition-colors duration-200 whitespace-nowrap ${
                  isActive(link.href)
                    ? 'text-ink font-medium'
                    : 'text-text-2 hover:text-ink'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA + hamburger row */}
          <div className="flex items-center gap-4">
            <Link
              href="/book-one"
              className="hidden lg:inline-flex btn-primary text-sm"
            >
              Get the book
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 text-ink hover:text-accent transition-colors duration-200"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen panel */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-ink-dark lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`font-ui text-2xl transition-colors duration-200 ${
                  isActive(link.href)
                    ? 'text-on-dark'
                    : 'text-on-dark-2 hover:text-on-dark'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book-one"
              onClick={closeMenu}
              className="btn-primary text-base mt-4"
            >
              Get the book
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
