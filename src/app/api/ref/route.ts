import { NextResponse } from "next/server";
import { trackClick } from "@/lib/referral";

export async function POST(req: Request) {
  const { slug } = (await req.json().catch(() => ({}))) as { slug?: string };
  if (!slug) return NextResponse.json({ ok: false }, { status: 400 });
  trackClick(String(slug));
  return NextResponse.json({ ok: true });
}
