/**
 * Creates or updates the admin account from environment variables.
 *
 *   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='…' npx tsx scripts/seed-admin.ts
 *
 * This replaces the old "first login creates the admin account" behaviour, where
 * whoever hit a fresh deployment first became the administrator. Run it once per
 * environment after the database is provisioned.
 */
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const db = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD
  const name = process.env.ADMIN_NAME?.trim() || 'Admin'

  if (!email || !password) {
    console.error('ADMIN_EMAIL and ADMIN_PASSWORD must both be set.')
    process.exit(1)
  }

  if (password.length < 12) {
    console.error('ADMIN_PASSWORD must be at least 12 characters.')
    process.exit(1)
  }

  const passwordHash = await bcrypt.hash(password, 12)

  const admin = await db.adminUser.upsert({
    where: { email },
    update: { passwordHash, name },
    create: { email, passwordHash, name, role: 'admin' },
  })

  // Any existing sessions were issued against the old password.
  const { count } = await db.adminSession.deleteMany({ where: { userId: admin.id } })

  console.log(`✓ Admin ready: ${admin.email}`)
  if (count > 0) console.log(`  Revoked ${count} existing session(s).`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => db.$disconnect())
