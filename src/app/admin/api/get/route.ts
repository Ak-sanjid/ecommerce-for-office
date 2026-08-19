import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken, ADMIN_COOKIE } from "@/lib/adminAuth";
import { dumpStore, getSiteConfig } from "@/lib/admin";
import { listAbandoned } from "@/lib/abandoned";
import { listAffiliates } from "@/lib/referral";
import { listCoupons } from "@/lib/coupons";
import { listInventory, listRestockAlerts, listStock } from "@/lib/inventory";
import { listOrders } from "@/lib/orders";
import { listUsers } from "@/lib/users";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  if (!verifyAdminToken(token)) return NextResponse.json({ value: null }, { status: 401 });

  const key = new URL(req.url).searchParams.get("key") ?? "";
  if (key === "all") return NextResponse.json({ value: dumpStore() });
  if (key === "coupons") return NextResponse.json({ value: listCoupons() });
  if (key === "inventory") return NextResponse.json({ value: { logs: listInventory(10), stock: listStock() } });
  if (key === "abandoned") return NextResponse.json({ value: listAbandoned() });
  if (key === "affiliates") return NextResponse.json({ value: listAffiliates() });
  if (key === "orders") return NextResponse.json({ value: listOrders() });
  if (key === "restock") return NextResponse.json({ value: listRestockAlerts() });
  if (key === "users") return NextResponse.json({ value: listUsers() });
  return NextResponse.json({ value: (await getSiteConfig(key)) ?? null });
}
