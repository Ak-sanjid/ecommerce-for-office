"use client";

import { useParams } from "next/navigation";
import { ShopListing } from "@/components/shop/ShopListing";

export default function SubCategoryPage() {
  const { slug = "", type = "" } = useParams<{ slug: string; type: string }>();
  return <ShopListing slug={slug} type={type} />;
}
