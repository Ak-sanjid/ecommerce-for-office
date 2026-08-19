import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/adminAuth";
import { updateOrderStatus } from "@/lib/orders";
import { ORDER_STATUSES } from "@/lib/commerce";
import type { OrderStatus } from "@/lib/jsonStore";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  if (!verifyAdminToken(token)) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const { status } = (await req.json().catch(() => ({}))) as { status?: string };
  if (!status || !(ORDER_STATUSES as readonly string[]).includes(status)) {
    return NextResponse.json({ ok: false, error: "bad status" }, { status: 400 });
  }

  const order = await updateOrderStatus(params.id, status as OrderStatus);
  if (!order) return NextResponse.json({ ok: false }, { status: 404 });
  return NextResponse.json({ ok: true, order });
}
