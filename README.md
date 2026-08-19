# GLOW — Premium Beauty & Personal Care (Bangladesh)

Next.js 14 (App Router) · TypeScript · Tailwind · PWA · Prisma schema ready

## Quick start

```bash
npm install
cp .env.example .env.local
# set ADMIN_PASSWORD (sandbox default: glow-admin)
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
# npx prisma migrate dev --name phase4
```

## Phase 4 — Auth, orders, integrations

`/admin` is gated with a signed HMAC cookie (`glow_admin`, 8h). Write APIs return **401** without it.

Default sandbox password: `glow-admin` (set `ADMIN_PASSWORD` in `.env.local`).

Checkout `POST /api/checkout` persists an order, decrements stock, writes an inventory log, increments coupon usage and Glow Points. Without live Postgres this lands in `data/glow-store.json`; with `DATABASE_URL` the same path uses a Prisma `$transaction`.

| Route | Role |
|---|---|
| `POST /admin/api/login` | Set admin cookie |
| `POST /admin/api/update` | Protected writes |
| `POST /api/checkout` | Order + stock + loyalty |
| `POST /api/coupon` | Validate GLOW10 / FLASH30 |
| `POST /api/otp` | Rate-limited BD OTP (dry-run) |
| `POST /api/notify` | Restock WhatsApp alert |
| `GET /api/reviews` | Facebook Graph or seed |
| `POST /api/orders/:id/status` | Status + WhatsApp |
| `POST /api/webhook/whatsapp` | Inbound verify + log |
| `?ref=emily` | `glow_ref` cookie, 30 days |

Payment helpers (`src/lib/payments.ts`) are signature-ready for bKash / Nagad / Rocket and dry-run when keys are empty.
