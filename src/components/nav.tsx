'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/books', label: 'Books' },
  { href: '/speaking', label: 'Speaking & Teaching' },
  { href: '/insights', label: 'Insights' },
  { href: '/contact', label: 'Contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? 'bg-[#F5F1E8]/95 backdrop-blur-xl shadow-sm border-b border-[#EBE5D5]' : 'bg-transparent'}`}>
      <nav className="max-w-6xl mx-auto flex h-16 items-center justify-between px-5 md:px-8">
        <Link href="/" className="font-serif text-base font-bold text-[#1B3B36]">
          Mohamed Abu Khadra
        </Link>
        <div className="hidden lg:flex items-center gap-1">
          {NAV.map(l => (
            <Link key={l.href} href={l.href} className="rounded-md px-3 py-2 text-sm font-medium text-[#2A2520]/80 hover:text-[#1B3B36] hover:bg-[#EBE5D5]/50 transition-colors">{l.label}</Link>
          ))}
        </div>
        <button onClick={() => setOpen(!open)} className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#1B3B36]/20 text-[#1B3B36] lg:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div className="border-b border-[#EBE5D5] bg-[#F5F1E8]/95 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            {NAV.map(l => <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium text-[#2A2520]/90 hover:bg-[#EBE5D5]">{l.label}</Link>)}
          </div>
        </div>
      )}
    </header>
  )
}
