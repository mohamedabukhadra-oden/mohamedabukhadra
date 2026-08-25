import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import {
  verifyPassword,
  createSession,
  destroySession,
  setSessionCookie,
  clearSessionCookie,
  ADMIN_SESSION_COOKIE,
} from '@/lib/auth'
import { rateLimit } from '@/lib/rate-limit'

export const runtime = 'nodejs'

// 5 attempts per 15 minutes per IP.
const LOGIN_RATE_LIMIT = { windowMs: 15 * 60 * 1000, max: 5 }

/**
 * POST /api/admin/login
 *
 * Note what is deliberately absent: the previous version created an admin
 * account on the first request when the table was empty ("First login creates
 * the admin account"), which meant anyone who reached a fresh deployment first
 * owned the admin. Seed the admin explicitly instead — see scripts/seed-admin.ts.
 */
export async function POST(req: NextRequest) {
  const limited = rateLimit(req, LOGIN_RATE_LIMIT)
  if (limited) return limited

  try {
    const body = await req.json().catch(() => ({}))
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    const password = typeof body.password === 'string' ? body.password : ''

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
    }

    const admin = await db.adminUser.findUnique({ where: { email } })

    // Same response and roughly the same work whether or not the account
    // exists, so the endpoint doesn't confirm which emails are registered.
    if (!admin) {
      await verifyPassword(password, '$2a$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalido')
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 })
    }

    if (!(await verifyPassword(password, admin.passwordHash))) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 })
    }

    const token = await createSession(admin.id)
    const res = NextResponse.json({
      ok: true,
      admin: { email: admin.email, name: admin.name, role: admin.role },
    })
    return setSessionCookie(res, token)
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json({ error: 'Login failed.' }, { status: 500 })
  }
}

/** DELETE /api/admin/login — sign out, destroying the session server-side. */
export async function DELETE(req: NextRequest) {
  await destroySession(req.cookies.get(ADMIN_SESSION_COOKIE)?.value)
  return clearSessionCookie(NextResponse.json({ ok: true }))
}
