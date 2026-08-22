# GLOW — কোড নিয়ে লোকাল / GitHub-এ চালানো

Phase 1 + 2 + 3 + 4 + 5 একই রিপোতে আছে। আলাদা করে ফাইল কপি করার দরকার নেই।

| Phase | কী আছে |
|---|---|
| 1 | হেডার, হোমপেজ, EN/BN, কার্ট, PWA |
| 2 | লিস্টিং ফিল্টার, PDP, চেকআউট UI |
| 3 | অ্যাডমিন কনফিগ, কুপন, ইনভেন্টরি, অ্যানালিটিক্স হুক |
| 4 | অ্যাডমিন লগইন, অর্ডার সেভ, OTP, WhatsApp, পেমেন্ট stub |
| 5 | ক্যাটালগ সিড + বাল্ক SKU / ব্যাচ / এক্সপায়ারি এডিট |

---

## যা লাগবে (কম্পিউটারে একবার)

1. [Node.js 18 বা 20](https://nodejs.org/) ইনস্টল করুন  
2. (ঐচ্ছিক) [Git](https://git-scm.com/)  
3. টার্মিনাল খুলুন (Windows: PowerShell / Mac: Terminal)

চেক:

```bash
node -v    # v18 বা তার বেশি
npm -v
```

---

## উপায় A — GitHub থেকে ক্লোন (সবচেয়ে সহজ)

রিপো: https://github.com/Ak-sanjid/ecommerce-for-office

```bash
git clone -b arena/01a018e5-ecommerce-for-office https://github.com/Ak-sanjid/ecommerce-for-office.git
cd ecommerce-for-office
cp .env.example .env.local
```

`.env.local` এ কমপক্ষে এগুলো রাখুন:

```
ADMIN_PASSWORD=glow-admin
ADMIN_SECRET=dev-change-me-32chars-min!!
NEXT_PUBLIC_WHATSAPP=8801700000000
```

তারপর:

```bash
npm install
npm run dev
```

ব্রাউজারে খুলুন: http://localhost:3000

- শপ: `/`
- অ্যাডমিন: `/admin` → পাসওয়ার্ড `owner / glow-admin`

---

## উপায় B — জিপ ডাউনলোড করে চালানো

1. `GLOW-beauty-complete.zip` আনজিপ করুন  
2. ফোল্ডারে ঢুকুন  
3. একই কমান্ড:

```bash
cp .env.example .env.local
# .env.local এ ADMIN_PASSWORD=glow-admin দিন
npm install
npm run dev
```

---

## উপায় C — নিজের GitHub রিপোতে তুলে Vercel-এ চালানো

1. GitHub-এ নতুন রিপো তৈরি করুন (খালি, README ছাড়া)  
2. লোকাল থেকে পুশ:

```bash
cd ecommerce-for-office
git init
git add .
git commit -m "GLOW storefront phases 1-5"
git branch -M main
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git push -u origin main
```

3. [vercel.com](https://vercel.com) → Import GitHub repo  
4. Environment Variables এ `.env.example` এর কীগুলো পেস্ট করুন (`ADMIN_PASSWORD` অবশ্যই)  
5. Deploy → লাইভ URL পাবেন

---

## দরকারি পেজ

| URL | কাজ |
|---|---|
| `/` | হোমপেজ |
| `/category/skincare` | লিস্টিং + ফিল্টার |
| `/product/p002` | প্রোডাক্ট পেজ |
| `/checkout` | অর্ডার (কুপন `GLOW10`) |
| `/admin` | অ্যাডমিন (পাসওয়ার্ড `owner / glow-admin`) |
| `/track` | অর্ডার ট্র্যাক |

কুপন: `GLOW10` (৳১০০০+ এ ১০%) · `FLASH30` (৳২০০০+ এ ৩০%)

---

## Postgres ছাড়াই চলে

ডিফল্টে ডেটা যায় `data/glow-store.json` এ।  
আসল PostgreSQL থাকলে `.env.local` এ `DATABASE_URL` দিন, তারপর:

```bash
npx prisma generate
npx prisma migrate dev --name phase4
```

---

## সমস্যা হলে

- `npm install` ফেল করলে Node 18+ আছে কি না দেখুন  
- পোর্ট 3000 ব্যস্ত থাকলে: `npx next dev -H 0.0.0.0 -p 3001`  
- অ্যাডমিন 500 দিলে `.env.local` এ `ADMIN_PASSWORD` সেট আছে কি না দেখুন  
- ছবি না দেখলে `public/images/` ফোল্ডার আছে কি না দেখুন
