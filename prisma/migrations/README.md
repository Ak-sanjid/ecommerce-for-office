# Prisma migrations

There is no live Postgres in the default sandbox. The app persists Phase 3–4
data to `data/glow-store.json` and falls back automatically.

When `DATABASE_URL` points at a real database:

```bash
npx prisma generate
npx prisma migrate dev --name phase4
npx tsx prisma/seed.ts
```

Phase 4 adds `RestockAlert` and `AdminSession` (see `prisma/schema.prisma`).
