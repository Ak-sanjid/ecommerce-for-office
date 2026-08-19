import { NextResponse } from "next/server";
import { reviews as seedReviews } from "@/data/reviews";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const product = url.searchParams.get("product") ?? "";
  const pageId = url.searchParams.get("page") ?? "";
  const token = process.env.FB_GRAPH_TOKEN;

  if (token && pageId) {
    try {
      const res = await fetch(
        `https://graph.facebook.com/v19.0/${pageId}/comments?fields=message,from{name},created_time&limit=25&access_token=${token}`,
      );
      const data = (await res.json()) as {
        data?: Array<{ id: string; message?: string; from?: { name?: string }; created_time?: string }>;
      };
      const reviews = (data.data ?? []).map((c) => ({
        id: c.id,
        author: c.from?.name ?? "Facebook User",
        text: c.message,
        date: c.created_time,
        source: "facebook" as const,
        rating: 5,
        verified: true,
      }));
      return NextResponse.json({ source: "facebook", reviews });
    } catch {
      /* fall through to seed */
    }
  }
  return NextResponse.json({
    source: "seed",
    reviews: seedReviews.filter((r) => !product || r.productId === product),
  });
}
