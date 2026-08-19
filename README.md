# GLOW — Premium Beauty & Personal Care (Bangladesh)

Next.js 14 (App Router) · TypeScript · Tailwind · PWA · Prisma schema ready

## Quick start

```bash
npm install
cp .env.example .env
npm run dev          # http://0.0.0.0:3000
```

## Header & homepage

- Layout **A** (default): search + quick shortcuts + category mega-menus (collapses on scroll)
- Layout **B**: full category bar + rotating promo strip
- Toggle live at `/admin/dashboard` (writes `localStorage`, mirrors `src/config/site.ts`)
- Hover **Brand** → A–Z mega-menu · **Men** / **Makeup** shift tint
- WhatsApp sits above Hello Guest
- Cart slide-out · free delivery at ৳2,000 · free samples at ৳3,000
- Homepage rows reorderable / hideable from the same admin file

## Design tokens

cream `#FBF8F3` · gold `#C9A45C` · pink-gold `#D9A9A0` · off-black `#2B2B2B`  
grey `#8A8A8A` (reviews only) · male-tint `#A9B4B8` · female-tint `#E7C4C0`

Demo WhatsApp: `+880 1700-000000`. English first, বাংলা toggle in the top bar.

## Phase 3 — Admin / coupons / inventory

```bash
npm run db:seed          # seeds data/glow-store.json (no Postgres required)
# optional, when DATABASE_URL points at Postgres:
# npx prisma migrate dev --name phase3
```

Open `/admin` for layout, promo, coupons (GLOW10 / FLASH30), inventory log, affiliate clicks, pixels, abandoned-cart recovery.

Checkout accepts `GLOW10` and `FLASH30`. Landing with `/?ref=emily` increments affiliate clicks.
