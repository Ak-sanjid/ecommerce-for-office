import { getProduct as findProduct, products, slugify } from "@/data/products";
import type { Product } from "@/types";
import { getStock } from "./inventory";

export function withLiveStock(p: Product): Product {
  return { ...p, stock: getStock(p.id).stock };
}

export function getProduct(idOrSlug: string) {
  const p = findProduct(idOrSlug);
  return p ? withLiveStock(p) : undefined;
}

export function productHref(p: Product) {
  return `/product/${slugify(p.name)}`;
}

export function filterProducts(opts: {
  category?: string;
  sub?: string;
  brand?: string;
  collection?: string;
  concern?: string;
  q?: string;
  min?: number;
  max?: number;
  ingredients?: string[];
  badges?: string[];
  sort?: string;
}): Product[] {
  let list = [...products];

  if (opts.category) {
    const map: Record<string, string> = {
      skincare: "Skincare",
      haircare: "Haircare",
      mens: "Men's Grooming",
      makeup: "Makeup",
      "baby-mom": "Baby & Mom",
    };
    const name = map[opts.category] ?? opts.category;
    list = list.filter(
      (p) =>
        p.category.toLowerCase() === name.toLowerCase() ||
        (opts.category === "mens" && p.gender === "men"),
    );
  }

  if (opts.sub) {
    const sub = opts.sub.toLowerCase();
    list = list.filter((p) => {
      const slug = p.subCategory.toLowerCase().replace(/\s+/g, "-");
      return slug === sub || slug.includes(sub) || sub.includes(slug.split("-")[0]);
    });
  }

  if (opts.brand) {
    const b = opts.brand.toLowerCase();
    list = list.filter((p) => p.brandId === opts.brand || p.brand.toLowerCase() === b);
  }

  if (opts.collection === "k-beauty") list = list.filter((p) => p.origin === "k-beauty" || p.badges.includes("K-Beauty"));
  if (opts.collection === "j-beauty") list = list.filter((p) => p.origin === "j-beauty" || p.badges.includes("J-Beauty"));
  if (opts.collection === "international") list = list.filter((p) => p.origin === "international");
  if (opts.collection === "top-selling") list = list.filter((p) => p.isTopSelling);
  if (opts.collection === "todays-offer") list = list.filter((p) => p.isTodayOffer);
  if (opts.collection === "combo") list = list.filter((p) => p.subCategory === "Combo" || Boolean(p.originalPrice));

  if (opts.concern) list = list.filter((p) => p.concern?.includes(opts.concern!));

  if (opts.q) {
    const q = opts.q.toLowerCase();
    list = list.filter((p) =>
      `${p.name} ${p.nameBangla} ${p.brand} ${p.ingredients.join(" ")} ${p.category}`.toLowerCase().includes(q),
    );
  }

  if (opts.min != null) list = list.filter((p) => (p.flashSale?.price ?? p.price) >= opts.min!);
  if (opts.max != null) list = list.filter((p) => (p.flashSale?.price ?? p.price) <= opts.max!);

  if (opts.ingredients?.length) {
    list = list.filter((p) =>
      opts.ingredients!.every((i) => p.ingredients.some((x) => x.toLowerCase().includes(i.toLowerCase()))),
    );
  }

  if (opts.badges?.length) {
    list = list.filter((p) => opts.badges!.every((b) => p.badges.includes(b)));
  }

  list = list.map(withLiveStock);

  switch (opts.sort) {
    case "price-asc":
      list.sort((a, b) => (a.flashSale?.price ?? a.price) - (b.flashSale?.price ?? b.price));
      break;
    case "price-desc":
      list.sort((a, b) => (b.flashSale?.price ?? b.price) - (a.flashSale?.price ?? a.price));
      break;
    case "rating":
      list.sort((a, b) => b.rating - a.rating);
      break;
    default:
      list.sort((a, b) => Number(b.isTopSelling) - Number(a.isTopSelling));
  }

  return list;
}

export function related(p: Product, n = 6) {
  return products
    .filter((x) => x.id !== p.id && (x.category === p.category || x.brandId === p.brandId))
    .slice(0, n);
}

export function alternateBrands(p: Product, n = 4) {
  return products
    .filter((x) => x.id !== p.id && x.subCategory === p.subCategory && x.brandId !== p.brandId)
    .slice(0, n);
}

export function parseListParam(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}
