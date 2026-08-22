# GLOW — Premium Beauty & Personal Care (Bangladesh)

Next.js 14 (App Router) · TypeScript · Tailwind · PWA  
Phases **1–5** in one repo. **[বাংলা ধাপে ধাপে গাইড → START-HERE.md](./START-HERE.md)**

## Quick start

```bash
git clone -b arena/01a018e5-ecommerce-for-office https://github.com/Ak-sanjid/ecommerce-for-office.git
cd ecommerce-for-office
cp .env.example .env.local
# set ADMIN_PASSWORD=glow-admin
npm install
npm run dev          # http://localhost:3000
```

Admin: `/admin` · `owner / glow-admin`  
Coupon: `GLOW10` (10% over ৳1,000)

## This branch adds

| Feature | What it does |
|---|---|
| **Sticky 2-line header** | New layout **C** (default): line 1 = brand + search + actions, line 2 = category nav. Both stay pinned on scroll. |
| **Theme (dark mode)** | Sun/moon toggle in the header — persists to `localStorage`, switches the whole storefront via CSS tokens. |
| **Go Live** | `/admin → Go Live`: launch checklist + a master switch. When off, the storefront shows a "coming soon" page; `/admin` stays reachable. |
| **RBAC** | Roles **owner / manager / staff** with per-role permissions, scoped admin sessions, and a team manager (owner-only). |

RBAC demo accounts (seeded on first run): `owner / glow-admin` · `manager / glow-manager` · `staff / glow-staff`.

## What is included

| Phase | Scope |
|---|---|
| 1 | Sticky header, mega-menus, homepage rows, EN/BN, cart drawer, PWA |
| 2 | Listing filters, brand/concern landings, full PDP, checkout UI |
| 3 | Admin config, coupons, inventory log, pixels, abandoned cart |
| 4 | Admin HMAC login, real order pipeline, OTP, WhatsApp, payments, middleware |
| 5 | Catalog seeder + bulk SKU / batch / expiry editor |

Nothing extra to paste. Types live in `src/types`, context in `src/context`, catalog in `src/data`, tokens in `tailwind.config.ts` + `src/app/globals.css`.

## Design tokens

cream `#FBF8F3` · gold `#C9A45C` · pink-gold `#D9A9A0` · off-black `#2B2B2B`  
grey `#8A8A8A` (reviews only) · male-tint `#A9B4B8` · female-tint `#E7C4C0`

Demo WhatsApp `+880 1700-000000`. English first, বাংলা toggle in the top bar.

## Data

Without Postgres the app writes `data/glow-store.json` (created on first run).

```bash
npm run db:seed
# when DATABASE_URL is a real Postgres:
# npx prisma migrate dev --name phase4
```

## Env

Copy `.env.example` → `.env.local`. Required for admin:

```
ADMIN_USERNAME=owner
ADMIN_PASSWORD=glow-admin
ADMIN_SECRET=dev-change-me-32chars-min!!
```

Payment / WhatsApp / GA4 / Meta keys are optional (dry-run when empty).
