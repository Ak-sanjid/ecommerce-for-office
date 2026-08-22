import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken, ADMIN_COOKIE } from "@/lib/adminAuth";
import { setSiteConfig } from "@/lib/admin";
import { applyUsage, upsertCoupon, validateCoupon } from "@/lib/coupons";
import { logStockChange } from "@/lib/inventory";
import { recoverAbandoned, saveAbandoned, setRecoveryEnabled } from "@/lib/abandoned";
import { registerConversion, trackClick, upsertAffiliate } from "@/lib/referral";
import { updateOrderStatus } from "@/lib/orders";
import { removeAdminUser, upsertAdminUser, can, type Permission } from "@/lib/rbac";
import { setLive } from "@/lib/goLive";
import type { OrderStatus } from "@/lib/jsonStore";

const PERMISSION_BY_KEY: Record<string, Permission> = {
  coupon_validate: "coupons.manage",
  coupon_apply: "coupons.manage",
  coupon_upsert: "coupons.manage",
  stock_change: "inventory.manage",
  abandoned_save: "catalog.manage",
  abandoned_recover: "catalog.manage",
  abandoned_recovery_enabled: "catalog.manage",
  ref_click: "catalog.manage",
  ref_convert: "catalog.manage",
  affiliate_upsert: "catalog.manage",
  order_status: "orders.update",
  go_live_toggle: "settings.manage",
  team_upsert: "team.manage",
  team_remove: "team.manage",
  header_layout: "catalog.manage",
  promo_strip: "catalog.manage",
  nav_items: "catalog.manage",
  home_rows: "catalog.manage",
  analytics: "catalog.manage",
};

export async function POST(req: Request) {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  const session = verifyAdminToken(token);
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as { key: string; value: unknown };
    const { key, value } = body;
    if (typeof key !== "string") {
      return NextResponse.json({ ok: false, error: "bad payload" }, { status: 400 });
    }

    const required = PERMISSION_BY_KEY[key] ?? "settings.manage";
    if (!can(session.role, required)) {
      return NextResponse.json({ ok: false, error: `Role ${session.role} cannot ${required}` }, { status: 403 });
    }

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
      await logStockChange(v.productId, v.change, v.reason, v.batchNo);
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
    if (key === "order_status") {
      const v = value as { id: string; status: OrderStatus };
      const row = await updateOrderStatus(v.id, v.status);
      return NextResponse.json({ ok: Boolean(row), result: row });
    }
    if (key === "go_live_toggle") {
      setLive(Boolean(value));
      return NextResponse.json({ ok: true, live: Boolean(value) });
    }
    if (key === "team_upsert") {
      const row = upsertAdminUser(value as Parameters<typeof upsertAdminUser>[0]);
      return NextResponse.json({ ok: true, result: row });
    }
    if (key === "team_remove") {
      const ok = removeAdminUser(String((value as { id: string }).id));
      return NextResponse.json({ ok });
    }

    if (typeof value !== "object" && typeof value !== "string" && typeof value !== "boolean") {
      return NextResponse.json({ ok: false, error: "bad payload" }, { status: 400 });
    }
    await setSiteConfig(key, value);
    return NextResponse.json({ ok: true, key });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
