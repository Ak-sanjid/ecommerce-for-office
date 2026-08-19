import { readStore, updateStore } from "./jsonStore";

export function getRefCode(userId?: string) {
  return userId ? `GLOW${String(userId).slice(-4).toUpperCase()}` : "";
}

export function trackClick(slug: string) {
  updateStore((s) => ({
    ...s,
    affiliates: s.affiliates.map((a) => (a.linkSlug === slug ? { ...a, clicks: a.clicks + 1 } : a)),
  }));
}

export function registerConversion(slug: string) {
  updateStore((s) => ({
    ...s,
    affiliates: s.affiliates.map((a) => (a.linkSlug === slug ? { ...a, conversions: a.conversions + 1 } : a)),
  }));
}

export function listAffiliates() {
  return readStore().affiliates;
}

export function upsertAffiliate(row: ReturnType<typeof listAffiliates>[number]) {
  updateStore((s) => {
    const i = s.affiliates.findIndex((a) => a.linkSlug === row.linkSlug);
    const affiliates = [...s.affiliates];
    if (i >= 0) affiliates[i] = row;
    else affiliates.push(row);
    return { ...s, affiliates };
  });
}
