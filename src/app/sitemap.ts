import type { MetadataRoute } from "next";
import { mainCategories } from "@/data/categories";
import { brands } from "@/data/brands";
import { products, slugify } from "@/data/products";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    ...mainCategories.map((c) => ({ url: `${SITE_URL}/category/${c.slug}`, lastModified: now, priority: 0.8 })),
    ...brands.map((b) => ({ url: `${SITE_URL}/brand/${b.id}`, lastModified: now, priority: 0.7 })),
    ...products.map((p) => ({ url: `${SITE_URL}/product/${slugify(p.name)}`, lastModified: now, priority: 0.6 })),
  ];
}
