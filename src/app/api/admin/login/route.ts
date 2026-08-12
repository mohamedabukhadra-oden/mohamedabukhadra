import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    // Check if any admin exists
    const adminCount = await db.adminUser.count()

    if (adminCount === 0) {
      // First login = create admin
      const passwordHash = await bcrypt.hash(password, 12)
      const admin = await db.adminUser.create({
        data: { email, passwordHash, name: 'Admin' },
      })
      return NextResponse.json({ ok: true, id: admin.id, email: admin.email })
    }

    // Verify credentials
    const admin = await db.adminUser.findUnique({ where: { email } })
    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, admin.passwordHash)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    return NextResponse.json({ ok: true, id: admin.id, email: admin.email })
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
