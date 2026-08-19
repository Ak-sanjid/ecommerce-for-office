"use client";

import { useParams } from "next/navigation";
import { ShopListing } from "@/components/shop/ShopListing";

export default function CollectionPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  return <ShopListing slug={slug} />;
}
