import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/adminAuth";
import { listOrders, ordersFor } from "@/lib/orders";
import { normalizeBdPhone } from "@/lib/phone";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const phoneRaw = url.searchParams.get("phone");
  const userId = url.searchParams.get("userId");
  const admin = verifyAdminToken(cookies().get(ADMIN_COOKIE)?.value);

  if (admin && !phoneRaw && !userId) {
    return NextResponse.json({ ok: true, orders: listOrders() });
  }

  const phone = phoneRaw ? normalizeBdPhone(phoneRaw) : undefined;
  if (!phone && !userId) return NextResponse.json({ ok: false, error: "phone or userId required" }, { status: 400 });

  return NextResponse.json({ ok: true, orders: ordersFor({ phone: phone ?? undefined, userId: userId ?? undefined }) });
}
