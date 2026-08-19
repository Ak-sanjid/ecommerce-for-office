import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { products } from "@/data/products";

export type CouponRow = {
  code: string;
  type: "PERCENT" | "FIXED";
  value: number;
  minSpend: number;
  startsAt: string;
  endsAt: string;
  usageLimit: number | null;
  usedCount: number;
  active: boolean;
};

export type InventoryRow = {
  id: string;
  productId: string;
  change: number;
  reason: string;
  batchNo?: string;
  createdAt: string;
};

export type AbandonedRow = {
  id: string;
  sessionId?: string;
  phone?: string;
  email?: string;
  payload: unknown;
  remindersSent: number;
  recoveredAt?: string;
  recoveryMethod?: string;
  createdAt: string;
};

export type AffiliateRow = {
  influencerName: string;
  linkSlug: string;
  urlTarget: string;
  clicks: number;
  conversions: number;
  isActive: boolean;
};

export type StoreShape = {
  siteConfig: Record<string, unknown>;
  coupons: CouponRow[];
  inventoryLogs: InventoryRow[];
  abandoned: AbandonedRow[];
  affiliates: AffiliateRow[];
  stock: Record<string, number>;
  recoveryEnabled: boolean;
};

const STORE_PATH = join(process.cwd(), "data", "glow-store.json");

function defaults(): StoreShape {
  const in30 = new Date();
  in30.setDate(in30.getDate() + 30);
  const in3 = new Date();
  in3.setDate(in3.getDate() + 3);
  return {
    siteConfig: {
      header_layout: "A",
      promo_strip: {
        enabled: true,
        messages: ["Free delivery above ৳2,000", "Use GLOW10 for 10% off", "100% Authentic"],
        intervalMs: 5000,
      },
      nav_items: {
        visible: ["home", "skincare", "haircare", "men", "makeup", "baby", "brand", "blog", "solutions", "contact"],
      },
      home_rows: {
        visible: [
          "hero",
          "flashSale",
          "skinQuiz",
          "topSelling",
          "shopByConcern",
          "brandWeTrust",
          "todaysOffer",
          "reels",
          "recommended",
          "customerReviews",
          "recentlyViewed",
          "newsletter",
        ],
      },
      analytics: {
        ga4: process.env.NEXT_PUBLIC_GA4_ID ?? "",
        fb_pixel: process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? "",
        tiktok: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? "",
      },
    },
    coupons: [
      {
        code: "GLOW10",
        type: "PERCENT",
        value: 10,
        minSpend: 1000,
        startsAt: new Date().toISOString(),
        endsAt: in30.toISOString(),
        usageLimit: 10000,
        usedCount: 0,
        active: true,
      },
      {
        code: "FLASH30",
        type: "PERCENT",
        value: 30,
        minSpend: 2000,
        startsAt: new Date().toISOString(),
        endsAt: in3.toISOString(),
        usageLimit: 50,
        usedCount: 0,
        active: true,
      },
    ],
    inventoryLogs: [],
    abandoned: [],
    affiliates: [
      {
        influencerName: "Emily",
        linkSlug: "emily",
        urlTarget: "/collection/k-beauty?ref=emily",
        clicks: 0,
        conversions: 0,
        isActive: true,
      },
    ],
    stock: Object.fromEntries(products.map((p) => [p.id, p.stock])),
    recoveryEnabled: false,
  };
}

export function readStore(): StoreShape {
  try {
    const raw = readFileSync(STORE_PATH, "utf8");
    return { ...defaults(), ...(JSON.parse(raw) as StoreShape) };
  } catch {
    const seed = defaults();
    writeStore(seed);
    return seed;
  }
}

export function writeStore(next: StoreShape) {
  mkdirSync(dirname(STORE_PATH), { recursive: true });
  writeFileSync(STORE_PATH, JSON.stringify(next, null, 2));
}

export function updateStore(fn: (s: StoreShape) => StoreShape): StoreShape {
  const next = fn(readStore());
  writeStore(next);
  return next;
}
