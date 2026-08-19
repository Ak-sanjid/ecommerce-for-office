/** Normalise Bangladeshi mobiles to 8801XXXXXXXXX. */
export function normalizeBdPhone(input: string): string | null {
  let d = String(input ?? "").replace(/\D/g, "");
  if (!d) return null;
  if (d.startsWith("0") && d.length === 11) d = `88${d}`;
  if (d.startsWith("1") && d.length === 10) d = `880${d}`;
  if (/^8801\d{9}$/.test(d)) return d;
  return null;
}

export function isBdPhone(input: string): boolean {
  return Boolean(normalizeBdPhone(input));
}
