import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");
  const secret = process.env.WA_WEBHOOK_SECRET;
  if (mode === "subscribe" && secret && token === secret && challenge) {
    return new NextResponse(challenge, { status: 200 });
  }
  return NextResponse.json({ ok: false }, { status: 403 });
}

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("x-hub-signature-256");
  const secret = process.env.WA_WEBHOOK_SECRET;
  if (secret && sig) {
    const expected = "sha256=" + crypto.createHmac("sha256", secret).update(body).digest("hex");
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
  }
  console.log("[WA inbound]", body.slice(0, 200));
  return NextResponse.json({ ok: true });
}
