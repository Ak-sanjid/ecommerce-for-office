import { NextResponse } from "next/server";
import { dumpStore, getSiteConfig } from "@/lib/admin";
import { listAbandoned } from "@/lib/abandoned";
import { listAffiliates } from "@/lib/referral";
import { listCoupons } from "@/lib/coupons";
import { listInventory, listStock } from "@/lib/inventory";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get("key") ?? "";
  if (key === "all") {
    return NextResponse.json({ value: dumpStore() });
  }
  if (key === "coupons") return NextResponse.json({ value: listCoupons() });
  if (key === "inventory") return NextResponse.json({ value: { logs: listInventory(10), stock: listStock() } });
  if (key === "abandoned") return NextResponse.json({ value: listAbandoned() });
  if (key === "affiliates") return NextResponse.json({ value: listAffiliates() });
  return NextResponse.json({ value: getSiteConfig(key) });
}
