import type { Product } from "@/types";
import { getProduct } from "@/data/products";

export const ORDER_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "PACKED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
] as const;

export const PAYMENT_METHODS = ["BKASH", "NAGAD", "ROCKET", "COD", "CARD"] as const;

export const FREE_SHIPPING_THRESHOLD = 2000;
export const DHAKA_FEE = 60;
export const OUTSIDE_FEE = 120;

export function unitPrice(p: Product): number {
  if (p.flashSale && new Date(p.flashSale.endsAt).getTime() > Date.now()) return p.flashSale.price;
  return p.price;
}

export function resolveProduct(id: string): Product | undefined {
  return getProduct(id);
}

export function deliveryFeeFor(zone: "INSIDE_DHAKA" | "OUTSIDE_DHAKA", subtotal: number): number {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return zone === "INSIDE_DHAKA" ? DHAKA_FEE : OUTSIDE_FEE;
}

export function etaDate(zone: "INSIDE_DHAKA" | "OUTSIDE_DHAKA"): Date {
  const days = zone === "INSIDE_DHAKA" ? 2 : 4;
  return new Date(Date.now() + days * 86400000);
}
