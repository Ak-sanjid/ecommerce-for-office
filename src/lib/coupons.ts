import { readStore, updateStore, type CouponRow } from "./jsonStore";
import { getPrisma } from "./prisma";

export type CouponResult = {
  code: string;
  discount: number;
  minSpend: number;
  type: CouponRow["type"];
  value: number;
};

export function validateCoupon(code: string, subtotal: number): CouponResult | null {
  const c = readStore().coupons.find((x) => x.code.toUpperCase() === code.trim().toUpperCase());
  if (!c || !c.active) return null;
  const now = Date.now();
  if (now < new Date(c.startsAt).getTime() || now > new Date(c.endsAt).getTime()) return null;
  if (c.usageLimit != null && c.usedCount >= c.usageLimit) return null;
  if (subtotal < c.minSpend) return null;
  const discount = c.type === "PERCENT" ? Math.round(subtotal * (c.value / 100)) : c.value;
  return { code: c.code, discount, minSpend: c.minSpend, type: c.type, value: c.value };
}

export async function validateCouponAsync(code: string, subtotal: number): Promise<CouponResult | null> {
  const prisma = getPrisma();
  if (prisma) {
    try {
      const c = (await prisma.coupon.findUnique({ where: { code: code.trim().toUpperCase() } })) as
        | {
            code: string;
            active: boolean;
            startsAt: Date;
            endsAt: Date;
            usageLimit: number | null;
            usedCount: number;
            minSpend: number;
            type: "PERCENT" | "FIXED";
            value: number;
          }
        | null;
      if (!c || !c.active) return null;
      const now = Date.now();
      if (now < new Date(c.startsAt).getTime() || now > new Date(c.endsAt).getTime()) return null;
      if (c.usageLimit != null && c.usedCount >= c.usageLimit) return null;
      if (subtotal < c.minSpend) return null;
      const discount = c.type === "PERCENT" ? Math.round(subtotal * (c.value / 100)) : c.value;
      return { code: c.code, discount, minSpend: c.minSpend, type: c.type, value: c.value };
    } catch {
      /* fall through */
    }
  }
  return validateCoupon(code, subtotal);
}

export function applyUsage(code: string) {
  updateStore((s) => ({
    ...s,
    coupons: s.coupons.map((c) =>
      c.code.toUpperCase() === code.toUpperCase() ? { ...c, usedCount: c.usedCount + 1 } : c,
    ),
  }));
}

export function listCoupons() {
  return readStore().coupons;
}

export function upsertCoupon(row: ReturnType<typeof listCoupons>[number]) {
  updateStore((s) => {
    const i = s.coupons.findIndex((c) => c.code === row.code);
    const coupons = [...s.coupons];
    if (i >= 0) coupons[i] = row;
    else coupons.push(row);
    return { ...s, coupons };
  });
}
