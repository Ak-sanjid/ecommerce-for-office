import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { placeOrder } from "@/lib/orders";
import type { PaymentMethod, Zone } from "@/lib/jsonStore";
import { PAYMENT_METHODS } from "@/lib/commerce";
import { normalizeBdPhone } from "@/lib/phone";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    items?: { id: string; qty: number }[];
    zone?: string;
    couponCode?: string;
    customer?: { name?: string; phone?: string; phoneVerified?: boolean; userId?: string; address?: string };
    paymentMethod?: string;
  } | null;

  const items = body?.items;
  const zone = (body?.zone === "in" ? "INSIDE_DHAKA" : body?.zone === "out" ? "OUTSIDE_DHAKA" : body?.zone) as
    | Zone
    | undefined;
  const paymentMethod = String(body?.paymentMethod ?? "COD").toUpperCase() as PaymentMethod;

  if (!PAYMENT_METHODS.includes(paymentMethod)) {
    return NextResponse.json({ ok: false, error: "bad payment method" }, { status: 400 });
  }

  const phone = body?.customer?.phone ? normalizeBdPhone(body.customer.phone) ?? body.customer.phone : undefined;
  const refSlug = cookies().get("glow_ref")?.value;

  const result = await placeOrder({
    items: items ?? [],
    zone: zone ?? "INSIDE_DHAKA",
    couponCode: body?.couponCode || undefined,
    customer: { ...body?.customer, phone },
    paymentMethod,
    refSlug,
  });

  if (!result.ok) return NextResponse.json({ ok: false, error: result.error }, { status: result.status });
  return NextResponse.json({
    ok: true,
    orderNumber: result.orderNumber,
    total: result.total,
    estDelivery: result.estDelivery,
    paymentId: result.paymentId,
  });
}
