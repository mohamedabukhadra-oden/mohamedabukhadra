import { NextRequest, NextResponse } from 'next/server'
import { runAutoPublish } from '@/lib/auto-publish'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * GET /api/auto-publish — the scheduled publishing run.
 *
 * Called by Vercel Cron (see vercel.json), which sends CRON_SECRET as a bearer
 * token. The work itself lives in lib/auto-publish so the admin's manual trigger
 * runs exactly the same path.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET || ''
  const auth = req.headers.get('authorization') || ''
  const provided = auth.startsWith('Bearer ') ? auth.slice(7) : ''

  // This endpoint publishes content and sends mail — refuse to run it unguarded.
  if (!secret) {
    return NextResponse.json({ error: 'CRON_SECRET is not configured.' }, { status: 500 })
  }
  if (provided !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const outcome = await runAutoPublish({ triggeredBy: 'cron' })
    return NextResponse.json(outcome)
  } catch (e) {
    console.error('Auto-publish failed:', e)
    return NextResponse.json({ error: 'Auto-publish failed.' }, { status: 500 })
  }
}
