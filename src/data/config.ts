import type { HomepageRow, PromoSlide, Sample } from "../types";

export const WHATSAPP = "8801700000000";
export const WHATSAPP_DISPLAY = "+880 1700-000000";
export const SUPPORT_EMAIL = "hello@kanti.shop";
export const FREE_SHIPPING_OVER = 1599;
export const SAMPLE_THRESHOLD = 2000;
export const SAMPLE_LIMIT = 2;
export const FLASH_ENDS_AT = "2026-08-22T23:59:59+06:00";

export const defaultPromo: PromoSlide[] = [
  {
    id: "ship",
    text: {
      en: "Free delivery on orders over ৳1,599 — 64 districts",
      bn: "৳১,৫৯৯+ অর্ডারে ফ্রি ডেলিভারি — ৬৪ জেলা",
    },
  },
  {
    id: "auth",
    text: {
      en: "100% authentic · Official distributor · Batch & expiry on every box",
      bn: "১০০% অথেন্টিক · অফিসিয়াল ডিস্ট্রিবিউটর · প্রতি বক্সে ব্যাচ ও মেয়াদ",
    },
  },
  {
    id: "cod",
    text: {
      en: "Cash on Delivery · bKash · Nagad · Rocket",
      bn: "ক্যাশ অন ডেলিভারি · বিকাশ · নগদ · রকেট",
    },
  },
  {
    id: "points",
    text: {
      en: "Earn Glow Points on every purchase, review and signup",
      bn: "প্রতি কেনাকাটা, রিভিউ ও সাইনআপে গ্লো পয়েন্ট",
    },
  },
];

export const defaultHomeRows: HomepageRow[] = [
  { id: "hero", visible: true, order: 0 },
  { id: "trust", visible: true, order: 1 },
  { id: "flash", visible: true, order: 2 },
  { id: "topselling", visible: true, order: 3 },
  { id: "concerns", visible: true, order: 4 },
  { id: "brands", visible: true, order: 5 },
  { id: "offers", visible: true, order: 6 },
  { id: "reels", visible: true, order: 7 },
  { id: "recommend", visible: true, order: 8 },
  { id: "quiz", visible: true, order: 9 },
  { id: "reviews", visible: true, order: 10 },
];

export const samples: Sample[] = [
  {
    id: "s1",
    name: { en: "Heartleaf calming sachet", bn: "হার্টলিফ কালমিং স্যাশে" },
    image: "/images/products/toner.jpg",
  },
  {
    id: "s2",
    name: { en: "Rice sunscreen sachet", bn: "রাইস সানস্ক্রিন স্যাশে" },
    image: "/images/products/sunscreen.jpg",
  },
  {
    id: "s3",
    name: { en: "Snail essence ampoule", bn: "স্নেইল এসেন্স অ্যাম্পুল" },
    image: "/images/products/serum-snail.jpg",
  },
  {
    id: "s4",
    name: { en: "Ceramide cream sachet", bn: "সেরামাইড ক্রিম স্যাশে" },
    image: "/images/products/moisturizer.jpg",
  },
];

export const quickAccessDefault = [
  { id: "k-beauty", href: "/shop?origin=k-beauty", label: { en: "K-Beauty", bn: "কে-বিউটি" }, visible: true, order: 0 },
  { id: "j-beauty", href: "/shop?origin=j-beauty", label: { en: "J-Beauty", bn: "জে-বিউটি" }, visible: true, order: 1 },
  { id: "intl", href: "/shop?origin=international", label: { en: "International", bn: "ইন্টারন্যাশনাল" }, visible: true, order: 2 },
  { id: "top", href: "/shop?filter=top", label: { en: "Top Selling", bn: "টপ সেলিং" }, visible: true, order: 3 },
  { id: "combo", href: "/shop?filter=combo", label: { en: "Combo", bn: "কম্বো" }, visible: true, order: 4 },
  { id: "routine", href: "/quiz", label: { en: "Get Your Routine", bn: "রুটিন নিন" }, visible: true, order: 5 },
  { id: "offer", href: "/shop?filter=offer", label: { en: "Today's Offer", bn: "আজকের অফার" }, visible: true, order: 6 },
];
