import { randomBytes, createHash } from 'crypto'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

/**
 * Admin authentication.
 *
 * Replaces the previous scheme, in which the login route returned `{ ok: true }`
 * as plain JSON, set no cookie, and left the admin page gated on React state —
 * so every /api/admin route was reachable unauthenticated by anyone.
 */

export const ADMIN_SESSION_COOKIE = 'mak_admin_session'
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 days
const BCRYPT_ROUNDS = 12

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

/**
 * Session tokens are random 32-byte values. Only the SHA-256 digest is stored,
 * so a leaked database dump doesn't hand over usable sessions. The raw token
 * goes to the client in an httpOnly cookie and is never persisted.
 */
function digest(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

export async function createSession(userId: string): Promise<string> {
  const token = randomBytes(32).toString('hex')
  await db.adminSession.create({
    data: {
      token: digest(token),
      userId,
      expiresAt: new Date(Date.now() + SESSION_TTL_MS),
    },
  })
  return token
}

export type AdminIdentity = { id: string; email: string; name: string | null; role: string }

export async function verifySession(token: string | undefined | null): Promise<AdminIdentity | null> {
  if (!token) return null

  const session = await db.adminSession.findUnique({
    where: { token: digest(token) },
    include: { user: true },
  })

  if (!session) return null

  if (session.expiresAt < new Date()) {
    // Clean up on the way past rather than leaving dead rows to accumulate.
    await db.adminSession.delete({ where: { id: session.id } }).catch(() => {})
    return null
  }

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    role: session.user.role,
  }
}

export async function destroySession(token: string | undefined | null): Promise<void> {
  if (!token) return
  await db.adminSession.deleteMany({ where: { token: digest(token) } }).catch(() => {})
}

export function setSessionCookie(res: NextResponse, token: string): NextResponse {
  res.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_MS / 1000,
  })
  return res
}

export function clearSessionCookie(res: NextResponse): NextResponse {
  res.cookies.set(ADMIN_SESSION_COOKIE, '', { path: '/', maxAge: 0 })
  return res
}

export async function getAdmin(req: NextRequest): Promise<AdminIdentity | null> {
  return verifySession(req.cookies.get(ADMIN_SESSION_COOKIE)?.value)
}

type Handler<C> = (req: NextRequest, ctx: C, admin: AdminIdentity) => Promise<NextResponse> | NextResponse

/**
 * Wraps a route handler so it cannot run without a valid session.
 *
 * Applying auth through a wrapper rather than an inline check per route is
 * deliberate: it makes the guard impossible to forget when adding a new route.
 */
export function withAdmin<C>(handler: Handler<C>) {
  return async (req: NextRequest, ctx: C): Promise<NextResponse> => {
    const admin = await getAdmin(req)
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return handler(req, ctx, admin)
  }
}
