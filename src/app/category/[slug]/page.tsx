"use client";

import { useParams, useSearchParams } from "next/navigation";
import { ShopListing } from "@/components/shop/ShopListing";

export default function CategoryPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const params = useSearchParams();
  return <ShopListing slug={slug} type={params.get("type") ?? ""} concern={params.get("concern") ?? ""} />;
}
