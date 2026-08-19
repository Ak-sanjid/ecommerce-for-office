"use client";

import { useParams } from "next/navigation";
import { ShopListing } from "@/components/shop/ShopListing";

export default function ConcernPage() {
  const { id = "" } = useParams<{ id: string }>();
  return <ShopListing slug="skincare" concern={id} />;
}
