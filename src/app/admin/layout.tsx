'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Loader2, LogOut, LayoutDashboard, FileText, BookOpen, Mic, GraduationCap,
  Briefcase, Rocket, Award, Quote, HelpCircle, Search, CornerUpRight,
  Send, BarChart3, Menu, X,
} from 'lucide-react'

/**
 * Admin shell.
 *
 * Gates on a server-verified session (/api/admin/me) rather than local state.
 * The API enforces auth independently on every route, so this is navigation
 * convenience — flipping it in devtools yields empty screens, not access.
 */

type NavItem = { href: string; label: string; icon: React.ComponentType<{ className?: string }> }
type NavGroup = { title: string; items: NavItem[] }

const NAV: NavGroup[] = [
  {
    title: 'Overview',
    items: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/admin/publishing', label: 'Auto-publishing', icon: Send },
      { href: '/admin/analytics', label: 'Website analytics', icon: BarChart3 },
    ],
  },
  {
    title: 'Content',
    items: [
      { href: '/admin/articles', label: 'Articles', icon: FileText },
      { href: '/admin/books', label: 'Books', icon: BookOpen },
      { href: '/admin/speaking', label: 'Speaking', icon: Mic },
      { href: '/admin/teaching', label: 'Teaching', icon: GraduationCap },
      { href: '/admin/consulting', label: 'Consulting', icon: Briefcase },
      { href: '/admin/ventures', label: 'Ventures', icon: Rocket },
      { href: '/admin/recognition', label: 'Recognition', icon: Award },
      { href: '/admin/testimonials', label: 'Testimonials', icon: Quote },
      { href: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
    ],
  },
  {
    title: 'SEO',
    items: [
      { href: '/admin/seo', label: 'Page metadata', icon: Search },
      { href: '/admin/redirects', label: 'Redirects', icon: CornerUpRight },
    ],
  },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch('/api/admin/me')
      .then((r) => !cancelled && setAuthed(r.ok))
      .catch(() => !cancelled && setAuthed(false))
    return () => { cancelled = true }
  }, [])

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) setAuthed(true)
      else setError(data.error || 'Sign in failed.')
    } catch {
      setError('Network error.')
    } finally {
      setBusy(false)
    }
  }, [email, password])

  const handleLogout = useCallback(async () => {
    await fetch('/api/admin/login', { method: 'DELETE' }).catch(() => {})
    setAuthed(false)
  }, [])

  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F1E8]">
        <Loader2 className="h-5 w-5 animate-spin text-[#6B5D4F]" />
      </div>
    )
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F1E8] px-5">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-white rounded-xl border border-[#EBE5D5] p-7 space-y-4">
          <div className="text-center mb-2">
            <h1 className="font-serif text-2xl font-bold text-[#1B3B36]">Marketing Centre</h1>
            <p className="text-sm text-[#6B5D4F] mt-1">Sign in to continue</p>
          </div>
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700">{error}</div>
          )}
          <div>
            <label className="block text-sm font-medium text-[#2A2520] mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full h-11 rounded-lg border border-[#EBE5D5] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A86A]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2A2520] mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full h-11 rounded-lg border border-[#EBE5D5] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A86A]" />
          </div>
          <button type="submit" disabled={busy}
            className="w-full h-11 rounded-lg bg-[#1B3B36] text-white font-semibold hover:bg-[#2D5249] disabled:opacity-50 flex items-center justify-center gap-2">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign in'}
          </button>
          <p className="text-xs text-[#6B5D4F] text-center">Authorised access only.</p>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex">
      {/* Sidebar */}
      <aside className={`${menuOpen ? 'block' : 'hidden'} md:block fixed md:sticky top-0 left-0 z-40 h-screen w-64 shrink-0 overflow-y-auto bg-white border-r border-[#EBE5D5]`}>
        <div className="p-5 border-b border-[#EBE5D5] flex items-center justify-between">
          <span className="font-serif font-bold text-[#1B3B36]">Marketing Centre</span>
          <button onClick={() => setMenuOpen(false)} className="md:hidden text-[#6B5D4F]" aria-label="Close menu">
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="p-3">
          {NAV.map((group) => (
            <div key={group.title} className="mb-4">
              <p className="px-3 mb-1 text-[11px] font-semibold uppercase tracking-wider text-[#6B5D4F]">{group.title}</p>
              {group.items.map((item) => {
                const active = pathname === item.href
                const Icon = item.icon
                return (
                  <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm mb-0.5 ${
                      active ? 'bg-[#1B3B36] text-white font-medium' : 'text-[#2A2520] hover:bg-[#F5F1E8]'
                    }`}>
                    <Icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-[#EBE5D5]">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#6B5D4F] hover:bg-[#F5F1E8]">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="md:hidden sticky top-0 z-30 bg-white border-b border-[#EBE5D5] px-4 py-3 flex items-center gap-3">
          <button onClick={() => setMenuOpen(true)} className="text-[#1B3B36]" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-serif font-bold text-[#1B3B36]">Marketing Centre</span>
        </div>
        <main className="p-5 md:p-8 max-w-6xl">{children}</main>
      </div>
    </div>
  )
}
