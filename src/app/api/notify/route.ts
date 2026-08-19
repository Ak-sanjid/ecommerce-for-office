import { NextResponse } from "next/server";
import { normalizeBdPhone } from "@/lib/phone";
import { addRestockAlert } from "@/lib/inventory";
import { getPrisma } from "@/lib/prisma";
import { getProduct } from "@/data/products";

export async function POST(req: Request) {
  const { productId, phone } = (await req.json().catch(() => ({}))) as { productId?: string; phone?: string };
  const clean = normalizeBdPhone(String(phone ?? ""));
  if (!productId || !clean) return NextResponse.json({ ok: false, error: "bad payload" }, { status: 400 });
  if (!getProduct(productId)) return NextResponse.json({ ok: false, error: "product not found" }, { status: 404 });

  const prisma = getPrisma();
  if (prisma) {
    try {
      await prisma.restockAlert.create({ data: { productId, phone: clean } });
      return NextResponse.json({ ok: true, message: "We'll WhatsApp you when it's back." });
    } catch {
      /* JSON fallback */
    }
  }

  addRestockAlert(productId, clean);
  return NextResponse.json({ ok: true, message: "We'll WhatsApp you when it's back." });
}
