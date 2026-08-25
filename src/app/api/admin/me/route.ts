import { NextResponse } from 'next/server'
import { withAdmin } from '@/lib/auth'

export const runtime = 'nodejs'

/**
 * GET /api/admin/me — returns the signed-in admin, or 401.
 *
 * The admin UI calls this on mount to decide whether to show the login form,
 * so that the decision comes from a server-verified cookie rather than from
 * client state that anyone could flip in devtools.
 */
export const GET = withAdmin(async (_req, _ctx, admin) => {
  return NextResponse.json({ admin })
})
