"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "@/types";

export const dict = {
  helloGuest: { en: "Hello Guest", bn: "হ্যালো গেস্ট" },
  account: { en: "My Account", bn: "আমার অ্যাকাউন্ট" },
  wishlist: { en: "Wishlist", bn: "উইশলিস্ট" },
  cart: { en: "Cart", bn: "কার্ট" },
  search: { en: "Search serums, brands, concerns…", bn: "সিরাম, ব্র্যান্ড, সমস্যা খুঁজুন…" },
  browse: { en: "Browse Category", bn: "ক্যাটাগরি দেখুন" },
  support: { en: "WhatsApp", bn: "হোয়াটসঅ্যাপ" },
  addToCart: { en: "Add to cart", bn: "কার্টে যোগ করুন" },
  viewAll: { en: "View all", bn: "সব দেখুন" },
  topSelling: { en: "Top selling", bn: "টপ সেলিং" },
  topSellingSub: { en: "What Bangladesh is finishing first", bn: "বাংলাদেশ যা আগে শেষ করছে" },
  shopConcern: { en: "Shop by concern", bn: "সমস্যা অনুযায়ী" },
  shopConcernSub: { en: "Start with the skin, not the shelf", bn: "শেলফ নয়, ত্বক দিয়ে শুরু" },
  brandsTrust: { en: "Brands we trust", bn: "যে ব্র্যান্ডে বিশ্বাস" },
  brandsTrustSub: { en: "Official lines, batch-checked", bn: "অফিসিয়াল লাইন, ব্যাচ চেক করা" },
  todaysOffer: { en: "Today's offer", bn: "আজকের অফার" },
  todaysOfferSub: { en: "Honest markdowns, not theatre", bn: "সত্যিকারের ছাড়, নাটক নয়" },
  forYou: { en: "Recommended for you", bn: "আপনার জন্য" },
  forYouSub: { en: "Based on what you linger on", bn: "যা দেখে আপনি দাঁড়ান" },
  reviews: { en: "Customer reviews", bn: "কাস্টমার রিভিউ" },
  reviewsSub: { en: "From our Facebook page and photo reviews — shown here", bn: "ফেসবুক পেজ ও ছবি-রিভিউ — এখানেই" },
  reels: { en: "Watch & shop", bn: "দেখুন ও কিনুন" },
  reelsSub: { en: "Short films, tagged and ready for the bag", bn: "শর্ট ফিল্ম, ট্যাগ করা, ব্যাগে তোলার জন্য" },
  flash: { en: "Flash sale", bn: "ফ্ল্যাশ সেল" },
  flashSub: { en: "A short window. The prices are real.", bn: "অল্প সময়। দাম সত্যি।" },
  quizTitle: { en: "Virtual skin quiz", bn: "ভার্চুয়াল স্কিন কুইজ" },
  quizSub: { en: "Four questions. An AM–PM routine. One tap to the cart.", bn: "চার প্রশ্ন। একটি এএম–পিএম রুটিন। এক ট্যাপে কার্ট।" },
  startQuiz: { en: "Build my routine", bn: "রুটিন বানান" },
  addRoutine: { en: "Add full routine to cart", bn: "পুরো রুটিন কার্টে দিন" },
  authentic: { en: "100% Authentic", bn: "১০০% অথেন্টিক" },
  official: { en: "Official distributor", bn: "অফিসিয়াল ডিস্ট্রিবিউটর" },
  cod: { en: "Cash on delivery", bn: "ক্যাশ অন ডেলিভারি" },
  districts: { en: "All 64 districts", bn: "৬৪ জেলায়" },
  easyReturn: { en: "7-day easy exchange", bn: "৭ দিনে সহজ এক্সচেঞ্জ" },
  emptyCart: { en: "Your bag is resting.", bn: "ব্যাগ এখন খালি।" },
  startShopping: { en: "Start shopping", bn: "কেনাকাটা শুরু" },
  subtotal: { en: "Subtotal", bn: "সাবটোটাল" },
  checkout: { en: "Express checkout", bn: "এক্সপ্রেস চেকআউট" },
  guestNote: { en: "Guest checkout is open. No account required.", bn: "গেস্ট চেকআউট চালু। অ্যাকাউন্ট লাগবে না।" },
  samples: { en: "Choose 1–2 complimentary samples", bn: "১–২টি ফ্রি স্যাম্পল নিন" },
  samplesHint: { en: "Unlocked over ৳2,000", bn: "৳২,০০০-এর উপরে আনলক" },
  insideDhaka: { en: "Inside Dhaka", bn: "ঢাকার ভিতর" },
  outsideDhaka: { en: "Outside Dhaka", bn: "ঢাকার বাইরে" },
  eta: { en: "Estimated arrival", bn: "সম্ভাব্য পৌঁছানো" },
  delivery: { en: "Delivery", bn: "ডেলিভারি" },
  freeShip: { en: "Free delivery unlocked", bn: "ফ্রি ডেলিভারি আনলক" },
  language: { en: "বাংলা", bn: "English" },
  allBrands: { en: "All brands", bn: "সব ব্র্যান্ড" },
  shopAll: { en: "Shop all", bn: "সব দেখুন" },
  notify: { en: "Notify me on WhatsApp", bn: "হোয়াটসঅ্যাপে জানাবেন" },
  notifySet: { en: "We will message you", bn: "মেসেজ যাবে" },
  soldOut: { en: "Restocking", bn: "স্টক আসছে" },
  glowPoints: { en: "Glow Points", bn: "গ্লো পয়েন্ট" },
  recently: { en: "Recently viewed", bn: "সম্প্রতি দেখা" },
  newsletter: { en: "A quiet note, now and then", bn: "মাঝে মাঝে একটি শান্ত নোট" },
  subscribe: { en: "Subscribe", bn: "সাবস্ক্রাইব" },
  footerTag: {
    en: "Radiance, authenticated. K-Beauty, J-Beauty and the international lines we will put our name on.",
    bn: "গ্লো — প্রমাণিত উজ্জ্বলতা। কে-বিউটি, জে-বিউটি এবং যে আন্তর্জাতিক লাইনে আমরা নাম দিই।",
  },
  pwa: { en: "Add GLOW to your home screen", bn: "হোম স্ক্রিনে গ্লো রাখুন" },
  swipe: { en: "Drag to browse", bn: "টেনে দেখুন" },
  loginTitle: { en: "Come in", bn: "ঢুকুন" },
  loginSub: { en: "Google, Facebook, mobile OTP or a simple form — one bar.", bn: "গুগল, ফেসবুক, মোবাইল ওটিপি বা সাধারণ ফর্ম — এক ব্যারে।" },
  continueGoogle: { en: "Continue with Google", bn: "গুগল দিয়ে চালিয়ে যান" },
  continueFb: { en: "Continue with Facebook", bn: "ফেসবুক দিয়ে চালিয়ে যান" },
  sendOtp: { en: "Send OTP", bn: "ওটিপি পাঠান" },
  verify: { en: "Verify", bn: "যাচাই" },
  orManual: { en: "Or enter your details", bn: "অথবা তথ্য লিখুন" },
  name: { en: "Name", bn: "নাম" },
  phone: { en: "Mobile number", bn: "মোবাইল নম্বর" },
  email: { en: "Email (optional)", bn: "ইমেইল (ঐচ্ছিক)" },
  enter: { en: "Enter GLOW", bn: "গ্লোতে ঢুকুন" },
  logout: { en: "Sign out", bn: "সাইন আউট" },
  close: { en: "Close", bn: "বন্ধ" },
  menu: { en: "Menu", bn: "মেনু" },
  days: { en: "Days", bn: "দিন" },
  hours: { en: "Hours", bn: "ঘণ্টা" },
  mins: { en: "Mins", bn: "মিনিট" },
  secs: { en: "Secs", bn: "সেকেন্ড" },
  filters: { en: "Filters", bn: "ফিল্টার" },
  price: { en: "Price", bn: "দাম" },
  brand: { en: "Brand", bn: "ব্র্যান্ড" },
  ingredients: { en: "Ingredients", bn: "উপাদান" },
  safety: { en: "Safety", bn: "নিরাপত্তা" },
  noResults: { en: "Nothing in this corner yet.", bn: "এই কোণে এখন কিছু নেই।" },
  howTo: { en: "How to use", bn: "ব্যবহারবিধি" },
  share: { en: "Share", bn: "শেয়ার" },
  compare: { en: "Compare", bn: "তুলনা" },
  chatTitle: { en: "GLOW desk", bn: "গ্লো ডেস্ক" },
  chatPlaceholder: { en: "Ask in English, বাংলা or Banglish…", bn: "ইংরেজি, বাংলা বা বাংলিশে জিজ্ঞেস করুন…" },
  chatIntro: {
    en: "I read the catalogue. Ask about oily skin, niacinamide, SPF, hair-fall — English, Bangla or mixed.",
    bn: "ক্যাটালগ পড়ে রেখেছি। অয়লি স্কিন, নায়াসিনামাইড, এসপিএফ, হেয়ারফল — ইংরেজি, বাংলা বা মিশিয়ে জিজ্ঞেস করুন।",
  },
  promo1: { en: "Free delivery on orders over ৳2,000 — 64 districts", bn: "৳২,০০০+ অর্ডারে ফ্রি ডেলিভারি — ৬৪ জেলা" },
  promo2: { en: "100% authentic · Official distributor · Batch & expiry on every box", bn: "১০০% অথেন্টিক · অফিসিয়াল ডিস্ট্রিবিউটর · প্রতি বক্সে ব্যাচ ও মেয়াদ" },
  promo3: { en: "Cash on Delivery · bKash · Nagad · Rocket", bn: "ক্যাশ অন ডেলিভারি · বিকাশ · নগদ · রকেট" },
} as const;

export type DictKey = keyof typeof dict;

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; t: (k: DictKey) => string };
const LangContext = createContext<LangCtx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("glow-lang") as Lang | null;
    if (saved === "bn" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("glow-lang", l);
    document.documentElement.lang = l === "bn" ? "bn" : "en";
  };

  const t = (k: DictKey) => dict[k][lang];

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang outside provider");
  return ctx;
}
