#!/usr/bin/env bash
# ==============================================================================
# deploy.sh — correct build sequence for mohamedabukhadra.com
#
# The build MUST run AFTER articles are in the database. A build against an
# empty DB produces 25 static pages (non-article routes only) and succeeds
# without error — a silent failure where every article page renders on demand
# instead of being prerendered.
#
# Usage:
#   chmod +x scripts/deploy.sh
#   ./scripts/deploy.sh              # full sequence
#   ./scripts/deploy.sh --verify     # re-check prerender count after deploy
#
# Prerequisites:
#   - .env filled in (DATABASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD, etc.)
#   - PostgreSQL reachable at DATABASE_URL
#   - Node 18+
# ==============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT"

# ─── Colours ─────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

info()  { echo -e "${GREEN}[deploy]${NC} $*"; }
warn()  { echo -e "${YELLOW}[deploy]${NC} $*"; }
error() { echo -e "${RED}[deploy]${NC} $*" >&2; exit 1; }

# ─── Pre-flight ──────────────────────────────────────────────────────────────
if [ ! -f .env ]; then
  error ".env missing. Copy .env.example and fill in DATABASE_URL at minimum."
fi

if ! grep -q 'DATABASE_URL=postgres' .env; then
  error "DATABASE_URL must be a postgres:// URL. A file: URL will not work on Vercel."
fi

# ─── Step 1: Push schema ────────────────────────────────────────────────────
info "Step 1/6: Pushing Prisma schema to database..."
npx prisma db push --skip-generate 2>&1 | tail -3
# Generate client after schema is confirmed
npx prisma generate 2>&1 | tail -1

# ─── Step 2: Merge articles (dry run) ──────────────────────────────────────
info "Step 2/6: Merge articles — dry run to verify count..."
DRY_RUN=$(npx tsx scripts/merge-articles.ts 2>&1)
echo "$DRY_RUN"

# Extract the "Unique" line and check the count
UNIQUE_COUNT=$(echo "$DRY_RUN" | grep '^Unique' | rg -o '[0-9]+')
if [ -z "$UNIQUE_COUNT" ]; then
  error "Could not parse article count from dry run output."
fi

EXPECTED_MIN=400
if [ "$UNIQUE_COUNT" -lt "$EXPECTED_MIN" ]; then
  error "Expected >= $EXPECTED_MIN unique articles, got $UNIQUE_COUNT. Stopping."
fi
info "Article count OK: $UNIQUE_COUNT unique articles."

# ─── Step 3: Write articles to database ────────────────────────────────────
info "Step 3/6: Writing articles to database..."
npx tsx scripts/merge-articles.ts --write 2>&1 | tail -5

# ─── Step 4: Seed admin user ───────────────────────────────────────────────
info "Step 4/6: Seeding admin user..."
npx tsx scripts/seed-admin.ts 2>&1 | tail -3

# ─── Step 5: Build ──────────────────────────────────────────────────────────
info "Step 5/6: Building site (this may take a minute)..."
npm run build 2>&1 | tee /tmp/build-output.txt

# ─── Step 6: Verify prerender count ────────────────────────────────────────
info "Step 6/6: Verifying prerendered pages..."

# Next.js prints route info like:
#   /insights/[slug]                                    SSG   440
# We need to find that line and check the count.
PRERENDER_COUNT=$(rg 'insights/\[slug\].*SSG.*[0-9]+' /tmp/build-output.txt \
  | rg -o '[0-9]+$' || true)

if [ -z "$PRERENDER_COUNT" ]; then
  # Try alternate format
  PRERENDER_COUNT=$(rg 'insights' /tmp/build-output.txt \
    | rg -oP '(?<=\s)\d+(?=\s*\(static\))' || true)
fi

if [ -z "$PRERENDER_COUNT" ]; then
  warn "Could not parse prerender count from build output."
  warn "Check /tmp/build-output.txt manually."
  warn "Look for a line like: /insights/[slug]  SSG  <count>"
  echo ""
  echo "Relevant build lines:"
  rg 'insights|Route|SSG|static' /tmp/build-output.txt || true
  exit 1
fi

# NOTE: The merge imports 425 articles as DRAFT. Only PUBLISHED articles get
# prerendered at build time (~15 from the personal repo). DRAFT articles are
# served via ISR (rendered on first request, cached for 5 min via revalidate=300).
# The auto-publish cron (vercel.json) gradually moves DRAFT → PUBLISHED.
# After the cron runs and a rebuild happens, the prerender count will climb.

PUBLISHED_COUNT=$(echo "$DRY_RUN" | grep 'PUBLISHED' | rg -o '\d+')
info "Prerendered article pages: $PRERENDER_COUNT"
info "Published articles in merge: $PUBLISHED_COUNT"
warn "NOTE: Only PUBLISHED articles prerender at build time ($PUBLISHED_COUNT)."
warn "      The remaining $((UNIQUE_COUNT - PUBLISHED_COUNT)) DRAFT articles will be"
warn "      served via ISR and gradually published by the auto-publish cron."

if [ "$PRERENDER_COUNT" -lt 1 ]; then
  error "Zero prerendered article pages. DATABASE_URL may not be reachable at build time."
fi

echo ""
info "Deploy sequence complete."
info "Total static pages: $(rg -c '○|●' /tmp/build-output.txt 2>/dev/null || echo 'see build output')"
info "Next: deploy to Vercel or run npm start to test locally."
