import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

/**
 * Middleware: static redirects (old URL structure) + database-managed redirects.
 *
 * Runs on the Node runtime because it queries Postgres through Prisma.
 */

type Rule = { toPath: string; status: number }

/* ── Static redirects: old URLs → new structure ── */
const STATIC_REDIRECTS: Record<string, { to: string; status: 301 | 302 }> = {
  '/insights':                                { to: '/',        status: 301 },
  '/speaking':                                { to: '/about',   status: 301 },
  '/books':                                   { to: '/book-one', status: 301 },
  '/books/before-you-say-yes-to-the-dog':     { to: '/book-one', status: 301 },
  '/books/after-you-say-yes-to-the-dog':      { to: '/book-two', status: 301 },
  '/quick-check':                             { to: '/free',    status: 301 },
  '/read-inside':                             { to: '/book-one', status: 301 },
  '/faq':                                     { to: '/contact', status: 301 },
}

// This runs on every request, and redirects change rarely — so the table is
// cached per instance and refreshed on a timer.
const CACHE_TTL_MS = 60_000
let cache: Map<string, Rule> | null = null
let cachedAt = 0

/** Trailing slashes are stripped so "/old" and "/old/" both match. */
function normalise(path: string): string {
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path
}

async function getRules(): Promise<Map<string, Rule>> {
  const now = Date.now()
  if (cache && now - cachedAt < CACHE_TTL_MS) return cache

  try {
    const rows = await db.redirect.findMany({
      where: { enabled: true },
      select: { fromPath: true, toPath: true, status: true },
    })
    cache = new Map(rows.map((r) => [normalise(r.fromPath), { toPath: r.toPath, status: r.status }]))
    cachedAt = now
  } catch {
    // Serve the last known good table rather than dropping every redirect at
    // once. If we've never loaded, fall through empty so requests still work.
    if (!cache) cache = new Map()
  }

  return cache
}

export async function middleware(req: NextRequest) {
  const pathname = normalise(req.nextUrl.pathname)

  // 1. Check static redirects first (old URL structure)
  const staticRule = STATIC_REDIRECTS[pathname]
  if (staticRule) {
    const target = new URL(staticRule.to, req.nextUrl.origin).toString()
    return NextResponse.redirect(target, staticRule.status)
  }

  // 2. Fall back to database-managed redirects
  const rule = (await getRules()).get(pathname)

  if (!rule) return NextResponse.next()

  const target = rule.toPath.startsWith('http')
    ? rule.toPath
    : new URL(rule.toPath, req.nextUrl.origin).toString()

  return NextResponse.redirect(target, rule.status === 302 ? 302 : 301)
}

export const config = {
  runtime: 'nodejs',
  // Skip Next internals, the API, and anything with a file extension — a DB
  // lookup per static asset would be pure overhead.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
