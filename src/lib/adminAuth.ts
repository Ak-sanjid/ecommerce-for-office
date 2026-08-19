import crypto from "crypto";

const SECRET = process.env.ADMIN_SECRET ?? "dev-change-me-32chars-min!!";
export const ADMIN_COOKIE = "glow_admin";
const TTL = 1000 * 60 * 60 * 8; // 8h

export function createAdminToken(): string {
  const body = Buffer.from(JSON.stringify({ exp: Date.now() + TTL })).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifyAdminToken(token?: string): boolean {
  if (!token) return false;
  const [body, sig] = token.split(".");
  if (!body || !sig) return false;
  const expected = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  try {
    return (JSON.parse(Buffer.from(body, "base64url").toString()).exp as number) > Date.now();
  } catch {
    return false;
  }
}

export function timingSafeEqualStrings(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && crypto.timingSafeEqual(ba, bb);
}

export function requireAdminPassword(): string | null {
  return process.env.ADMIN_PASSWORD ?? null;
}
