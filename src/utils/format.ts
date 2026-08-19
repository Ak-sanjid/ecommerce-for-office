import type { Lang, Localized } from "../types";

export function loc(value: Localized, lang: Lang): string {
  return value[lang];
}

export function formatBdt(amount: number): string {
  return `৳${Math.round(amount).toLocaleString("en-BD")}`;
}

export function discountPct(price: number, compareAt?: number): number | null {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function estimatedDelivery(insideDhaka: boolean): string {
  const start = new Date();
  const end = new Date();
  start.setDate(start.getDate() + (insideDhaka ? 1 : 3));
  end.setDate(end.getDate() + (insideDhaka ? 2 : 5));
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  return `${fmt(start)} – ${fmt(end)}`;
}

export function deliveryCharge(insideDhaka: boolean): number {
  return insideDhaka ? 60 : 120;
}
