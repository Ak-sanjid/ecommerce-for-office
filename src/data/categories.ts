import type { Category } from "@/types";

export const mainCategories: Category[] = [
  {
    id: "skincare",
    name: "Skincare",
    nameBangla: "স্কিনকেয়ার",
    slug: "skincare",
    icon: "🧴",
    order: 1,
    visible: true,
    featured: { title: "Build a glow routine", titleBn: "গ্লো রুটিন বানান", href: "/quiz", image: "/images/hero-still.jpg" },
    subCategories: [
      { id: "cleansers", name: "Cleansers", nameBn: "ক্লিনজার", slug: "cleansers", order: 1, visible: true },
      { id: "toners", name: "Toners", nameBn: "টোনার", slug: "toners", order: 2, visible: true },
      { id: "essences", name: "Essences", nameBn: "এসেন্স", slug: "essences", order: 3, visible: true },
      { id: "serums", name: "Serums", nameBn: "সিরাম", slug: "serums", order: 4, visible: true },
      { id: "moisturizers", name: "Moisturizers", nameBn: "ময়েশ্চারাইজার", slug: "moisturizers", order: 5, visible: true },
      { id: "sunscreen", name: "Sunscreen", nameBn: "সানস্ক্রিন", slug: "sunscreen", order: 6, visible: true },
      { id: "masks", name: "Masks", nameBn: "মাস্ক", slug: "masks", order: 7, visible: true },
    ],
  },
  {
    id: "haircare",
    name: "Haircare",
    nameBangla: "হেয়ারকেয়ার",
    slug: "haircare",
    icon: "💇",
    order: 2,
    visible: true,
    featured: { title: "Hair-fall solutions", titleBn: "হেয়ারফল সমাধান", href: "/category/haircare", image: "/images/products/hair-mask.jpg" },
    subCategories: [
      { id: "shampoo", name: "Shampoo", nameBn: "শ্যাম্পু", slug: "shampoo", order: 1, visible: true },
      { id: "conditioner", name: "Conditioner", nameBn: "কন্ডিশনার", slug: "conditioner", order: 2, visible: true },
      { id: "hair-oil", name: "Hair Oil", nameBn: "হেয়ার অয়েল", slug: "hair-oil", order: 3, visible: true },
      { id: "treatment", name: "Treatment", nameBn: "ট্রিটমেন্ট", slug: "treatment", order: 4, visible: true },
    ],
  },
  {
    id: "mens",
    name: "Men",
    nameBangla: "পুরুষ",
    slug: "mens",
    icon: "🧔",
    order: 3,
    visible: true,
    featured: { title: "Grooming, not leftover pink", titleBn: "গ্রুমিং, বাদপড়া গোলাপি নয়", href: "/category/mens", image: "/images/hero-men.jpg" },
    subCategories: [
      { id: "beard-care", name: "Beard Care", nameBn: "দাড়ির যত্ন", slug: "beard-care", order: 1, visible: true },
      { id: "face-care", name: "Face Care", nameBn: "ফেস কেয়ার", slug: "face-care", order: 2, visible: true },
      { id: "fragrance", name: "Fragrance", nameBn: "ফ্র্যাগ্রেন্স", slug: "fragrance", order: 3, visible: true },
      { id: "grooming-tools", name: "Grooming Tools", nameBn: "গ্রুমিং টুলস", slug: "grooming-tools", order: 4, visible: true },
    ],
  },
  {
    id: "makeup",
    name: "Makeup",
    nameBangla: "মেকআপ",
    slug: "makeup",
    icon: "💄",
    order: 4,
    visible: true,
    featured: { title: "Shade-match your base", titleBn: "আপনার শেড মিলিয়ে নিন", href: "/category/makeup", image: "/images/products/moisturizer.jpg" },
    subCategories: [
      { id: "foundation", name: "Foundation", nameBn: "ফাউন্ডেশন", slug: "foundation", order: 1, visible: true },
      { id: "lipstick", name: "Lipstick", nameBn: "লিপস্টিক", slug: "lipstick", order: 2, visible: true },
      { id: "eye-makeup", name: "Eye Makeup", nameBn: "আই মেকআপ", slug: "eye-makeup", order: 3, visible: true },
      { id: "cheeks", name: "Cheeks", nameBn: "চিকস", slug: "cheeks", order: 4, visible: true },
    ],
  },
  {
    id: "baby-mom",
    name: "Baby & Mom",
    nameBangla: "বেবি ও মা",
    slug: "baby-mom",
    icon: "👶",
    order: 5,
    visible: true,
    featured: { title: "First baths, fewer guesses", titleBn: "প্রথম গোসল, কম অনুমান", href: "/category/baby-mom", image: "/images/hero-mom.jpg" },
    subCategories: [
      { id: "baby-lotions", name: "Baby Lotions", nameBn: "বেবি লোশন", slug: "baby-lotions", order: 1, visible: true },
      { id: "baby-shampoo", name: "Baby Shampoo", nameBn: "বেবি শ্যাম্পু", slug: "baby-shampoo", order: 2, visible: true },
      { id: "mom-care", name: "Mom Care", nameBn: "মায়ের যত্ন", slug: "mom-care", order: 3, visible: true },
    ],
  },
];

export const quickCategories = [
  { name: "K-Beauty", nameBn: "কে-বিউটি", slug: "k-beauty" },
  { name: "J-Beauty", nameBn: "জে-বিউটি", slug: "j-beauty" },
  { name: "International", nameBn: "ইন্টারন্যাশনাল", slug: "international" },
  { name: "Top Selling", nameBn: "টপ সেলিং", slug: "top-selling" },
  { name: "Combo", nameBn: "কম্বো", slug: "combo" },
  { name: "Get Your Routine", nameBn: "রুটিন নিন", slug: "routine" },
  { name: "Today's Offer", nameBn: "আজকের অফার", slug: "todays-offer" },
];

export const navItems = [
  { name: "Home", nameBn: "হোম", slug: "/", order: 1, visible: true },
  { name: "Skincare", nameBn: "স্কিনকেয়ার", slug: "/category/skincare", order: 2, visible: true, mega: "skincare" },
  { name: "Haircare", nameBn: "হেয়ারকেয়ার", slug: "/category/haircare", order: 3, visible: true, mega: "haircare" },
  { name: "Men", nameBn: "পুরুষ", slug: "/category/mens", order: 4, visible: true, mega: "mens" },
  { name: "Makeup", nameBn: "মেকআপ", slug: "/category/makeup", order: 5, visible: true, mega: "makeup" },
  { name: "Baby & Mom", nameBn: "বেবি ও মা", slug: "/category/baby-mom", order: 6, visible: true, mega: "baby-mom" },
  { name: "Brand", nameBn: "ব্র্যান্ড", slug: "/brands", order: 7, visible: true, hasMegaMenu: true },
  { name: "Blog", nameBn: "ব্লগ", slug: "/blog", order: 8, visible: true },
  { name: "Solutions", nameBn: "সমাধান", slug: "/solutions", order: 9, visible: true },
  { name: "Contact", nameBn: "যোগাযোগ", slug: "/contact", order: 10, visible: true },
];

export const sidebarItems = [
  { id: "k-beauty", name: "K-Beauty", nameBn: "কে-বিউটি", href: "/category/k-beauty" },
  { id: "j-beauty", name: "J-Beauty", nameBn: "জে-বিউটি", href: "/category/j-beauty" },
  { id: "intl", name: "International Brands", nameBn: "ইন্টারন্যাশনাল ব্র্যান্ড", href: "/category/international" },
  { id: "top", name: "Top Selling", nameBn: "টপ সেলিং", href: "/category/top-selling" },
  { id: "combo", name: "Combo", nameBn: "কম্বো", href: "/category/combo" },
  { id: "routine", name: "Get Your Routine", nameBn: "রুটিন নিন", href: "/quiz" },
  { id: "offer", name: "Today's Offer", nameBn: "আজকের অফার", href: "/category/todays-offer" },
];

export const concerns = [
  { id: "acne", name: "Acne", nameBn: "একনে", image: "/images/products/cleanser.jpg" },
  { id: "pigmentation", name: "Pigmentation", nameBn: "দাগ", image: "/images/products/serum-snail.jpg" },
  { id: "dullness", name: "Dullness", nameBn: "ম্লান ত্বক", image: "/images/hero-glow.jpg" },
  { id: "dryness", name: "Dryness", nameBn: "শুষ্কতা", image: "/images/products/moisturizer.jpg" },
  { id: "hair-fall", name: "Hair fall", nameBn: "হেয়ারফল", image: "/images/products/hair-mask.jpg" },
  { id: "oil-control", name: "Oil control", nameBn: "তেল নিয়ন্ত্রণ", image: "/images/products/toner.jpg" },
  { id: "sun", name: "Sun care", nameBn: "সান কেয়ার", image: "/images/products/sunscreen.jpg" },
  { id: "barrier", name: "Barrier repair", nameBn: "ব্যারিয়ার", image: "/images/hero-still.jpg" },
];
