import { NextResponse } from "next/server";
import { setSiteConfig } from "@/lib/admin";
import { applyUsage, upsertCoupon, validateCoupon } from "@/lib/coupons";
import { logStockChange } from "@/lib/inventory";
import { recoverAbandoned, saveAbandoned, setRecoveryEnabled } from "@/lib/abandoned";
import { registerConversion, trackClick, upsertAffiliate } from "@/lib/referral";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { key: string; value: unknown };
    const { key, value } = body;

    if (key === "coupon_validate") {
      const v = value as { code: string; subtotal: number };
      return NextResponse.json({ ok: true, result: validateCoupon(v.code, v.subtotal) });
    }
    if (key === "coupon_apply") {
      applyUsage(String((value as { code: string }).code));
      return NextResponse.json({ ok: true });
    }
    if (key === "coupon_upsert") {
      upsertCoupon(value as Parameters<typeof upsertCoupon>[0]);
      return NextResponse.json({ ok: true });
    }
    if (key === "stock_change") {
      const v = value as { productId: string; change: number; reason: string; batchNo?: string };
      logStockChange(v.productId, v.change, v.reason, v.batchNo);
      return NextResponse.json({ ok: true });
    }
    if (key === "abandoned_save") {
      const row = saveAbandoned(value as { items: unknown; phone?: string; email?: string });
      return NextResponse.json({ ok: true, result: row });
    }
    if (key === "abandoned_recover") {
      const v = value as { id: string; method: "sms" | "whatsapp" | "email" };
      recoverAbandoned(v.id, v.method);
      return NextResponse.json({ ok: true });
    }
    if (key === "abandoned_recovery_enabled") {
      setRecoveryEnabled(Boolean(value));
      setSiteConfig("abandoned_recovery_enabled", Boolean(value));
      return NextResponse.json({ ok: true });
    }
    if (key === "ref_click") {
      trackClick(String(value));
      return NextResponse.json({ ok: true });
    }
    if (key === "ref_convert") {
      registerConversion(String(value));
      return NextResponse.json({ ok: true });
    }
    if (key === "affiliate_upsert") {
      upsertAffiliate(value as Parameters<typeof upsertAffiliate>[0]);
      return NextResponse.json({ ok: true });
    }

    setSiteConfig(key, value);
    return NextResponse.json({ ok: true, key });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
