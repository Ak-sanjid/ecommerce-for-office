import type { Reel, Review } from "../types";

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Anika Moury",
    city: { en: "Dhaka", bn: "ঢাকা" },
    text: {
      en: "All authentic, packed like they actually care. First order — I will buy the rest of my shelf from KÁNTI.",
      bn: "সব অথেন্টিক, প্যাকিং দেখে মনে হয় সত্যি যত্ন করেন। প্রথম অর্ডার — বাকি শেলফও এখান থেকেই নেব।",
    },
    rating: 5,
    source: "facebook",
    product: "p2",
  },
  {
    id: "r2",
    name: "Hasna Binte Habib",
    city: { en: "Rajshahi", bn: "রাজশাহী" },
    text: {
      en: "Snail essence texture is the real one, not the watery fake. Delivery to Rajshahi in three days.",
      bn: "স্নেইল এসেন্সের টেক্সচার আসল, পাতলা নকল না। রাজশাহীতে তিন দিনে পৌঁছেছে।",
    },
    rating: 5,
    source: "facebook",
    product: "p1",
  },
  {
    id: "r3",
    name: "Israt Zaman",
    city: { en: "Rangpur", bn: "রংপুর" },
    text: {
      en: "Old buyer. They have not slipped on authenticity. Behaviour on WhatsApp is also calm, not salesy.",
      bn: "পুরনো বায়ার। অথেন্টিসিটিতে এখনো স্লিপ করেননি। হোয়াটসঅ্যাপেও শান্ত, সেলসি নয়।",
    },
    rating: 5,
    source: "facebook",
  },
  {
    id: "r4",
    name: "Farhan Ahmed",
    city: { en: "Chattogram", bn: "চট্টগ্রাম" },
    text: {
      en: "The beard oil does not smell like a taxi freshener. Finally a men's corner that is not an afterthought.",
      bn: "বিয়ার্ড অয়েল ট্যাক্সির ফ্রেশনারের মতো গন্ধ করে না। আখেরে একটা মেনস কর্নার যা আফটারথট নয়।",
    },
    rating: 5,
    source: "photo",
    product: "p15",
  },
  {
    id: "r5",
    name: "Nusrat Jahan",
    city: { en: "Sylhet", bn: "সিলেট" },
    text: {
      en: "Joseon sunscreen — no white cast on my skin. Photo review after 3 weeks of daily use.",
      bn: "জোসন সানস্ক্রিন — আমার ত্বকে হোয়াইট কাস্ট নেই। তিন সপ্তাহ রোজ ব্যবহারের পর ছবিসহ রিভিউ।",
    },
    rating: 5,
    source: "photo",
    product: "p2",
  },
  {
    id: "r6",
    name: "Maliha Rahman",
    city: { en: "Khulna", bn: "খুলনা" },
    text: {
      en: "Routine quiz actually suggested things I already wanted. Added the full set. Glow Points were a nice surprise.",
      bn: "রুটিন কুইজ এমন জিনিস সাজেস্ট করল যা আমি আগে থেকেই চাইছিলাম। পুরো সেট নিলাম। গ্লো পয়েন্ট বোনাস।",
    },
    rating: 4,
    source: "facebook",
    product: "p24",
  },
];

export const reels: Reel[] = [
  {
    id: "v1",
    title: { en: "SPF that disappears", bn: "এসপিএফ যা মিলিয়ে যায়" },
    image: "/images/hero-glow.jpg",
    productId: "p2",
  },
  {
    id: "v2",
    title: { en: "Snail essence texture", bn: "স্নেইল এসেন্সের টেক্সচার" },
    image: "/images/hero-still.jpg",
    productId: "p1",
  },
  {
    id: "v3",
    title: { en: "Monsoon hair mask", bn: "বর্ষার হেয়ার মাস্ক" },
    image: "/images/products/hair-mask.jpg",
    productId: "p7",
  },
  {
    id: "v4",
    title: { en: "5-minute groom", bn: "৫ মিনিটের গ্রুম" },
    image: "/images/hero-men.jpg",
    productId: "p15",
  },
  {
    id: "v5",
    title: { en: "First bath, gently", bn: "প্রথম গোসল, আলতো করে" },
    image: "/images/hero-mom.jpg",
    productId: "p19",
  },
];
