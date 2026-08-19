import { NextResponse } from "next/server";
import { getOrderByNumber } from "@/lib/orders";
import { normalizeBdPhone } from "@/lib/phone";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const order = getOrderByNumber(params.id);
  if (!order) return NextResponse.json({ ok: false }, { status: 404 });

  const phone = new URL(req.url).searchParams.get("phone");
  if (phone) {
    const clean = normalizeBdPhone(phone);
    if (!clean || order.guestPhone !== clean) {
      return NextResponse.json({ ok: false, error: "phone mismatch" }, { status: 403 });
    }
  }

  return NextResponse.json({ ok: true, order });
}
