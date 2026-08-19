import type { Metadata } from "next";
import { HomeRows } from "@/components/home/HomeRows";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "GLOW — Authentic K-Beauty, J-Beauty & Global Skincare in Bangladesh",
  description:
    "Shop 100% authentic K-Beauty, J-Beauty and international skincare, haircare, makeup, men's grooming and baby & mom products. Cash on Delivery, fast nationwide shipping.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationJsonLd, websiteJsonLd]) }}
      />
      <HomeRows />
    </>
  );
}
