export type Lang = "en" | "bn";

export type Localized = { en: string; bn: string };

export type Origin = "k-beauty" | "j-beauty" | "international";
export type CategoryId = "skincare" | "haircare" | "men" | "makeup" | "baby";
export type GenderTone = "feminine" | "masculine" | "neutral";

export interface Product {
  id: string;
  slug: string;
  name: Localized;
  brand: string;
  brandSlug: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviewCount: number;
  category: CategoryId;
  origin: Origin;
  concerns: string[];
  ingredients: string[];
  badges: string[];
  images: string[];
  inStock: boolean;
  stock: number;
  genderTone: GenderTone;
  isTopSeller?: boolean;
  isFlash?: boolean;
  isOffer?: boolean;
  officialDistributor?: boolean;
  description: Localized;
  howToUse: Localized;
  batch: string;
  expiry: string;
  volume: string;
}

export interface NavChild {
  id: string;
  label: Localized;
  href: string;
}

export interface NavItem {
  id: string;
  label: Localized;
  href: string;
  visible: boolean;
  order: number;
  mega?: "category" | "brand" | "solutions";
  children?: NavChild[];
  featured?: { title: Localized; href: string; image: string };
}

export interface Brand {
  name: string;
  slug: string;
  origin: Origin | "multi";
  letter: string;
  tagline: Localized;
  official?: boolean;
}

export interface Review {
  id: string;
  name: string;
  city: Localized;
  text: Localized;
  rating: number;
  source: "facebook" | "photo";
  product?: string;
}

export interface Reel {
  id: string;
  title: Localized;
  image: string;
  productId: string;
}

export interface Concern {
  id: string;
  label: Localized;
  image: string;
}

export interface CartLine {
  id: string;
  qty: number;
}

export interface User {
  name: string;
  phone?: string;
  email?: string;
  points: number;
}

export interface Sample {
  id: string;
  name: Localized;
  image: string;
}

export interface HomepageRow {
  id: string;
  visible: boolean;
  order: number;
}

export interface PromoSlide {
  id: string;
  text: Localized;
  href?: string;
}
