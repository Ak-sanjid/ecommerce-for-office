import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { issueOtp, verifyOtp } from "@/lib/otp";
import { normalizeBdPhone } from "@/lib/phone";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { phone?: string; code?: string };
  const phone = normalizeBdPhone(String(body.phone ?? ""));
  if (!phone) return NextResponse.json({ ok: false, error: "Invalid BD phone" }, { status: 400 });

  if (body.code) {
    const ok = verifyOtp(phone, String(body.code));
    return ok
      ? NextResponse.json({ ok: true, verified: true })
      : NextResponse.json({ ok: false, error: "Invalid OTP" }, { status: 400 });
  }

  if (!rateLimit("otp:" + phone, 4, 60_000)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  const issued = issueOtp(phone);
  if (!issued) return NextResponse.json({ ok: false, error: "Invalid BD phone" }, { status: 400 });

  console.log(`[OTP dry-run] ${issued.phone} -> ${issued.code}`);
  const payload: { ok: true; sent: true; devCode?: string } = { ok: true, sent: true };
  if (process.env.NODE_ENV !== "production") payload.devCode = issued.code;
  return NextResponse.json(payload);
}
