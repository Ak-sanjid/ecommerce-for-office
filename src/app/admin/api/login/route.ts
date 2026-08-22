import { NextResponse } from "next/server";
import { createAdminToken, ADMIN_COOKIE } from "@/lib/adminAuth";
import { findAdminUser, verifyPassword } from "@/lib/rbac";

export async function POST(req: Request) {
  const { username, password } = (await req.json().catch(() => ({}))) as {
    username?: string;
    password?: string;
  };
  const user = findAdminUser(username?.trim() || "owner");
  if (!user || !user.active || !password || !verifyPassword(password, user.passwordHash)) {
    return NextResponse.json({ ok: false, error: "Invalid username or password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true, role: user.role });
  res.cookies.set(ADMIN_COOKIE, createAdminToken(user.role, user.id, user.username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
