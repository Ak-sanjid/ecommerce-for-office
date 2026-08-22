import crypto from "crypto";
import type { Role } from "./permissions";

const SECRET = process.env.ADMIN_SECRET ?? "dev-change-me-32chars-min!!";
export const ADMIN_COOKIE = "glow_admin";
const TTL = 1000 * 60 * 60 * 8; // 8h

export type AdminSession = {
  sub: string;
  name: string;
  role: Role;
  exp: number;
};

export function createAdminToken(role: Role, sub: string, name: string): string {
  const body = Buffer.from(JSON.stringify({ exp: Date.now() + TTL, sub, name, role })).toString(
    "base64url",
  );
  const sig = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifyAdminToken(token?: string): AdminSession | null {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const parsed = JSON.parse(Buffer.from(body, "base64url").toString()) as {
      exp?: number;
      sub?: string;
      name?: string;
      role?: string;
    };
    if (!parsed.exp || parsed.exp < Date.now()) return null;
    if (!parsed.sub || !parsed.role) return null;
    return {
      sub: parsed.sub,
      name: parsed.name ?? parsed.sub,
      role: parsed.role as Role,
      exp: parsed.exp,
    };
  } catch {
    return null;
  }
}
