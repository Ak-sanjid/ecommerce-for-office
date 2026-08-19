import { products as staticProducts, getProduct as findStatic } from "@/data/products";
import type { Product } from "@/types";
import { filterProducts } from "./catalog";
import { getStock } from "./inventory";
import { getPrisma } from "./prisma";

function withLiveStock(p: Product): Product {
  return { ...p, stock: getStock(p.id).stock };
}

function mapRow(r: {
  id: string;
  name: string;
  nameBn?: string | null;
  brand?: { name?: string } | null;
  brandId: string;
  category?: { name?: string } | null;
  subCategory?: string | null;
  price: number;
  originalPrice?: number | null;
  rating: number;
  reviewCount: number;
  media?: Array<{ url: string }>;
  descriptionEn: string;
  descriptionBn?: string | null;
  howToUseEn?: string | null;
  howToUseBn?: string | null;
  ingredients?: Array<{ ingredient?: { name: string } }>;
  badges?: Array<{ label: string }>;
  stock: number;
  isTopSelling: boolean;
  isTodayOffer: boolean;
  gender?: string | null;
}): Product {
  const fallback = findStatic(r.id);
  return {
    id: r.id,
    name: r.name,
    nameBangla: r.nameBn ?? fallback?.nameBangla ?? "",
    brand: r.brand?.name ?? fallback?.brand ?? "",
    brandId: r.brandId,
    category: r.category?.name ?? fallback?.category ?? "",
    subCategory: r.subCategory ?? fallback?.subCategory ?? "",
    price: r.price,
    originalPrice: r.originalPrice ?? undefined,
    rating: r.rating,
    reviewCount: r.reviewCount,
    image: r.media?.[0]?.url ?? fallback?.image ?? "",
    images: (r.media ?? []).map((m) => m.url),
    description: r.descriptionEn,
    descriptionBangla: r.descriptionBn ?? "",
    howToUse: r.howToUseEn ?? fallback?.howToUse ?? "",
    howToUseBn: r.howToUseBn ?? fallback?.howToUseBn ?? "",
    ingredients: (r.ingredients ?? []).map((i) => i.ingredient?.name ?? "").filter(Boolean),
    badges: (r.badges ?? []).map((b) => b.label),
    stock: r.stock,
    isTopSelling: r.isTopSelling,
    isTodayOffer: r.isTodayOffer,
    gender: ((r.gender ?? "unisex").toLowerCase() as Product["gender"]) || "unisex",
    origin: fallback?.origin ?? "international",
    volume: fallback?.volume ?? "",
    batch: fallback?.batch ?? "",
    expiry: fallback?.expiry ?? "",
    official: fallback?.official,
    flashSale: fallback?.flashSale,
    concern: fallback?.concern,
    discount: fallback?.discount,
  };
}

export async function getProductDB(id: string): Promise<Product | null> {
  const prisma = getPrisma();
  if (prisma) {
    try {
      const r = (await prisma.product.findUnique({
        where: { id },
        include: { brand: true, category: true, media: true, ingredients: true, badges: true },
      })) as Parameters<typeof mapRow>[0] | null;
      if (r) return mapRow(r);
    } catch {
      /* DB not ready — fall back to seed */
    }
  }
  const p = findStatic(id);
  return p ? withLiveStock(p) : null;
}

export async function listProductsDB(): Promise<Product[]> {
  return staticProducts.map(withLiveStock);
}

export async function filterProductsDB(opts: Parameters<typeof filterProducts>[0]): Promise<Product[]> {
  return filterProducts(opts).map(withLiveStock);
}
