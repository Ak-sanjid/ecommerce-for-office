import { clsx, type ClassValue } from "clsx";
import type { Lang, Product } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatBdt(amount: number): string {
  return `৳${Math.round(amount).toLocaleString("en-BD")}`;
}

export function loc(en: string, bn: string, lang: Lang): string {
  return lang === "bn" ? bn : en;
}

export function productName(p: Product, lang: Lang): string {
  return lang === "bn" ? p.nameBangla : p.name;
}

export function deliveryCharge(insideDhaka: boolean): number {
  return insideDhaka ? 60 : 120;
}

export function estimatedDelivery(insideDhaka: boolean): string {
  const start = new Date();
  const end = new Date();
  start.setDate(start.getDate() + (insideDhaka ? 1 : 2));
  end.setDate(end.getDate() + (insideDhaka ? 2 : 5));
  const fmt = (d: Date) => d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  return `${fmt(start)} – ${fmt(end)}`;
}

export const WHATSAPP = "8801700000000";
export const WHATSAPP_DISPLAY = "+880 1700-000000";
export const FREE_SHIP = 2000;
export const SAMPLE_MIN = 2000;
export const FLASH_ENDS = "2026-08-22T23:59:59+06:00";
