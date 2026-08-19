import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

function now(days = 0) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

async function main() {
  const store = {
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
      analytics: { ga4: "", fb_pixel: "", tiktok: "" },
    },
    coupons: [
      { code: "GLOW10", type: "PERCENT", value: 10, minSpend: 1000, startsAt: now(0), endsAt: now(30), usageLimit: 10000, usedCount: 0, active: true },
      { code: "FLASH30", type: "PERCENT", value: 30, minSpend: 2000, startsAt: now(0), endsAt: now(3), usageLimit: 50, usedCount: 0, active: true },
    ],
    inventoryLogs: [],
    abandoned: [],
    affiliates: [{ influencerName: "Emily", linkSlug: "emily", urlTarget: "/collection/k-beauty?ref=emily", clicks: 0, conversions: 0, isActive: true }],
    stock: {},
    skuMeta: {},
    recoveryEnabled: false,
    orders: [],
    restockAlerts: [],
    users: [],
  };
  mkdirSync(join(process.cwd(), "data"), { recursive: true });
  writeFileSync(join(process.cwd(), "data", "glow-store.json"), JSON.stringify(store, null, 2));
  console.log("Seed complete → data/glow-store.json");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
