import { NextResponse } from "next/server";
import { validateCouponAsync } from "@/lib/coupons";

export async function POST(req: Request) {
  const { code, subtotal } = (await req.json().catch(() => ({}))) as { code?: string; subtotal?: number };
  if (!code || typeof subtotal !== "number") {
    return NextResponse.json({ ok: false, error: "bad payload" }, { status: 400 });
  }
  const c = await validateCouponAsync(String(code), subtotal);
  return c
    ? NextResponse.json({ ok: true, ...c })
    : NextResponse.json({ ok: false, error: "Invalid coupon" }, { status: 400 });
}
