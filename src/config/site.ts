export type HeaderLayout = "A" | "B" | "C";

export interface NavItemConfig {
  id: string;
  label: string;
  labelBn: string;
  href: string;
  order: number;
  visible: boolean;
  megaMenu?: "brands" | "subcategories";
  categoryId?: string;
  accent?: "male" | "female" | "default";
}

export interface ShortcutConfig {
  id: string;
  label: string;
  labelBn: string;
  href: string;
  order: number;
  visible: boolean;
}

export interface HomeRowConfig {
  id: HomeRowId;
  label: string;
  order: number;
  visible: boolean;
}

export type HomeRowId =
  | "hero"
  | "flashSale"
  | "skinQuiz"
  | "topSelling"
  | "shopByConcern"
  | "brandWeTrust"
  | "todaysOffer"
  | "reels"
  | "recommended"
  | "customerReviews"
  | "recentlyViewed"
  | "newsletter";

export const siteConfig = {
  name: "GLOW",
  tagline: "Premium Beauty BD",
  taglineBn: "প্রিমিয়াম বিউটি বিডি",
  whatsapp: "8801700000000",
  whatsappDisplay: "+880 1700-000000",
  email: "hello@glowbeauty.com.bd",
  freeShippingThreshold: 2000,
  freeSampleThreshold: 3000,
  defaultLocale: "en" as "en" | "bn",

  headerLayout: "C" as HeaderLayout,

  promoStrip: {
    enabled: true,
    autoRotate: true,
    intervalMs: 5000,
    messages: [
      { en: "✦ Free delivery on orders above ৳2,000", bn: "✦ ৳২,০০০-এর উপরে ফ্রি ডেলিভারি" },
      { en: "✦ Use code GLOW10 — 10% off your first order", bn: "✦ GLOW10 — প্রথম অর্ডারে ১০% ছাড়" },
      { en: "✦ 100% Authentic · Official Distributor", bn: "✦ ১০০% অথেন্টিক · অফিসিয়াল ডিস্ট্রিবিউটর" },
      { en: "✦ Cash on Delivery available nationwide", bn: "✦ সারা দেশে ক্যাশ অন ডেলিভারি" },
    ],
  },

  navItems: [
    { id: "home", label: "Home", labelBn: "হোম", href: "/", order: 1, visible: true },
    { id: "skincare", label: "Skincare", labelBn: "স্কিনকেয়ার", href: "/category/skincare", order: 2, visible: true, megaMenu: "subcategories", categoryId: "skincare" },
    { id: "haircare", label: "Haircare", labelBn: "হেয়ারকেয়ার", href: "/category/haircare", order: 3, visible: true, megaMenu: "subcategories", categoryId: "haircare" },
    { id: "men", label: "Men", labelBn: "পুরুষ", href: "/category/mens", order: 4, visible: true, megaMenu: "subcategories", categoryId: "mens", accent: "male" },
    { id: "makeup", label: "Makeup", labelBn: "মেকআপ", href: "/category/makeup", order: 5, visible: true, megaMenu: "subcategories", categoryId: "makeup", accent: "female" },
    { id: "baby", label: "Baby & Mom", labelBn: "বেবি ও মা", href: "/category/baby-mom", order: 6, visible: true, megaMenu: "subcategories", categoryId: "baby-mom" },
    { id: "brand", label: "Brand", labelBn: "ব্র্যান্ড", href: "/brands", order: 7, visible: true, megaMenu: "brands" },
    { id: "blog", label: "Blog", labelBn: "ব্লগ", href: "/blog", order: 8, visible: true },
    { id: "solutions", label: "Solutions", labelBn: "সমাধান", href: "/solutions", order: 9, visible: true },
    { id: "contact", label: "Contact", labelBn: "যোগাযোগ", href: "/contact", order: 10, visible: true },
  ] as NavItemConfig[],

  quickShortcuts: [
    { id: "kbeauty", label: "K-Beauty", labelBn: "কে-বিউটি", href: "/collection/k-beauty", order: 1, visible: true },
    { id: "jbeauty", label: "J-Beauty", labelBn: "জে-বিউটি", href: "/collection/j-beauty", order: 2, visible: true },
    { id: "intl", label: "International", labelBn: "ইন্টারন্যাশনাল", href: "/collection/international", order: 3, visible: true },
    { id: "top", label: "Top Selling", labelBn: "টপ সেলিং", href: "/collection/top-selling", order: 4, visible: true },
    { id: "combo", label: "Combo", labelBn: "কম্বো", href: "/collection/combo", order: 5, visible: true },
    { id: "routine", label: "Get Your Routine", labelBn: "রুটিন নিন", href: "/quiz", order: 6, visible: true },
    { id: "offer", label: "Today's Offer", labelBn: "আজকের অফার", href: "/collection/todays-offer", order: 7, visible: true },
  ] as ShortcutConfig[],

  homeRows: [
    { id: "hero", label: "Top Banner", order: 1, visible: true },
    { id: "flashSale", label: "Flash Sale", order: 2, visible: true },
    { id: "topSelling", label: "Top Selling Products", order: 3, visible: true },
    { id: "shopByConcern", label: "Shop by Concern", order: 4, visible: true },
    { id: "skinQuiz", label: "Virtual Skin Quiz", order: 5, visible: true },
    { id: "brandWeTrust", label: "Brand We Trust", order: 6, visible: true },
    { id: "todaysOffer", label: "Today's Offer", order: 7, visible: true },
    { id: "reels", label: "Shoppable Reels", order: 8, visible: true },
    { id: "recommended", label: "Recommendation", order: 9, visible: true },
    { id: "customerReviews", label: "Customer Review", order: 10, visible: true },
    { id: "recentlyViewed", label: "Recently Viewed", order: 11, visible: true },
    { id: "newsletter", label: "Newsletter", order: 12, visible: true },
  ] as HomeRowConfig[],
};

export const visibleSorted = <T extends { order: number; visible: boolean }>(a: T[]) =>
  a.filter((i) => i.visible).sort((x, y) => x.order - y.order);

export const SITE_CONFIG_LS = "glow-site-overrides-v1";

export type SiteOverrides = {
  headerLayout?: HeaderLayout;
  navItems?: Array<Partial<NavItemConfig> & { id: string }>;
  quickShortcuts?: Array<Partial<ShortcutConfig> & { id: string }>;
  homeRows?: Array<Partial<HomeRowConfig> & { id: string }>;
};

export function mergeSite(over: SiteOverrides = {}) {
  const merge = <T extends { id: string }>(base: T[], extra?: Array<Partial<T> & { id: string }>): T[] =>
    base.map((item) => {
      const patch = extra?.find((x) => x.id === item.id);
      return patch ? { ...item, ...patch } : item;
    });

  return {
    ...siteConfig,
    headerLayout: over.headerLayout ?? siteConfig.headerLayout,
    navItems: merge(siteConfig.navItems, over.navItems),
    quickShortcuts: merge(siteConfig.quickShortcuts, over.quickShortcuts),
    homeRows: merge(siteConfig.homeRows, over.homeRows),
  };
}
