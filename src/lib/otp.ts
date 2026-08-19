import { normalizeBdPhone } from "./phone";

const otps = new Map<string, { code: string; exp: number }>();

export function issueOtp(phoneRaw: string): { phone: string; code: string } | null {
  const phone = normalizeBdPhone(phoneRaw);
  if (!phone) return null;
  const code = String(Math.floor(100000 + Math.random() * 900000));
  otps.set(phone, { code, exp: Date.now() + 5 * 60_000 });
  return { phone, code };
}

export function verifyOtp(phoneRaw: string, code: string): boolean {
  const phone = normalizeBdPhone(phoneRaw);
  if (!phone) return false;
  const row = otps.get(phone);
  if (!row) return false;
  if (Date.now() > row.exp) {
    otps.delete(phone);
    return false;
  }
  if (row.code !== String(code).trim()) return false;
  otps.delete(phone);
  return true;
}
