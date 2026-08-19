import { NextResponse } from "next/server";
import { saveAbandoned } from "@/lib/abandoned";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { items?: unknown; phone?: string; email?: string };
  if (!body.items) return NextResponse.json({ ok: false, error: "items required" }, { status: 400 });
  const row = saveAbandoned({ items: body.items, phone: body.phone, email: body.email });
  return NextResponse.json({ ok: true, result: row });
}
