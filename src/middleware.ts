import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const ref = req.nextUrl.searchParams.get("ref");
  if (ref && !req.cookies.has("glow_ref")) {
    res.cookies.set("glow_ref", ref, { maxAge: 60 * 60 * 24 * 30, path: "/" });
  }

  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  // X-Frame-Options: DENY breaks the Arena live preview iframe. Enable in
  // production (or set GLOW_FRAME_DENY=1) when the site is served on its own origin.
  if (process.env.NODE_ENV === "production" || process.env.GLOW_FRAME_DENY === "1") {
    res.headers.set("X-Frame-Options", "DENY");
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icons/|images/|sw.js|manifest.json|offline.html).*)"],
};
