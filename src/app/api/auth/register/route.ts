import { NextResponse } from "next/server";
import { upsertUser } from "@/lib/users";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
  };
  if (!body.name && !body.email && !body.phone) {
    return NextResponse.json({ ok: false, error: "name, email or phone required" }, { status: 400 });
  }
  const user = upsertUser(body);
  return NextResponse.json({ ok: true, user });
}
