import { NextResponse } from "next/server";
import { createAdminToken, timingSafeEqualStrings, ADMIN_COOKIE, requireAdminPassword } from "@/lib/adminAuth";

export async function POST(req: Request) {
  const { password } = (await req.json().catch(() => ({}))) as { password?: string };
  const expected = requireAdminPassword();
  if (!expected) return NextResponse.json({ ok: false, error: "ADMIN_PASSWORD not set" }, { status: 500 });
  if (!password || !timingSafeEqualStrings(password, expected)) {
    return NextResponse.json({ ok: false, error: "Invalid password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, createAdminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
