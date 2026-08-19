export type Lang = "en" | "bn";

export interface Product {
  id: string;
  name: string;
  nameBangla: string;
  brand: string;
  brandId: string;
  category: string;
  subCategory: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  video?: string;
  gif?: string;
  description: string;
  descriptionBangla: string;
  howToUse: string;
  howToUseBn: string;
  ingredients: string[];
  badges: string[];
  stock: number;
  isTopSelling: boolean;
  isTodayOffer: boolean;
  flashSale?: { price: number; endsAt: string };
  gender: "women" | "men" | "unisex" | "baby";
  concern?: string[];
  origin: "k-beauty" | "j-beauty" | "international";
  volume: string;
  batch: string;
  expiry: string;
  official?: boolean;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  country: string;
  isOfficial: boolean;
  color: string;
  tagline: string;
  taglineBn: string;
}

export interface SubCategory {
  id: string;
  name: string;
  nameBn: string;
  slug: string;
  order: number;
  visible: boolean;
}

export interface Category {
  id: string;
  name: string;
  nameBangla: string;
  slug: string;
  icon: string;
  subCategories: SubCategory[];
  order: number;
  visible: boolean;
  featured?: { title: string; titleBn: string; href: string; image: string };
}

export interface Review {
  id: string;
  productId?: string;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  textBn: string;
  date: string;
  source: "facebook" | "user";
  photos?: string[];
  verified: boolean;
  city: string;
  cityBn: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  glowPoints: number;
}

export interface Sample {
  id: string;
  name: string;
  nameBn: string;
  image: string;
}
