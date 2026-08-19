import { readStore, updateStore } from "./jsonStore";

export function validateCoupon(code: string, subtotal: number) {
  const c = readStore().coupons.find((x) => x.code.toUpperCase() === code.trim().toUpperCase());
  if (!c || !c.active) return null;
  const now = Date.now();
  if (now < new Date(c.startsAt).getTime() || now > new Date(c.endsAt).getTime()) return null;
  if (c.usageLimit != null && c.usedCount >= c.usageLimit) return null;
  if (subtotal < c.minSpend) return null;
  const discount = c.type === "PERCENT" ? Math.round(subtotal * (c.value / 100)) : c.value;
  return { code: c.code, discount, minSpend: c.minSpend, type: c.type, value: c.value };
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
