import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { alternateBrands, related } from "@/lib/catalog";
import { getProductDB } from "@/lib/catalog-db";
import { reviews } from "@/data/reviews";
import { products, slugify } from "@/data/products";
import { ProductGallery } from "@/components/pdp/ProductGallery";
import { ProductInfo } from "@/components/pdp/ProductInfo";
import { ProductTabs } from "@/components/pdp/ProductTabs";
import { BeforeAfterSlider } from "@/components/pdp/BeforeAfterSlider";
import { ShadeMatcher } from "@/components/pdp/ShadeMatcher";
import { CompareBar } from "@/components/pdp/CompareBar";
import { CarouselRow } from "@/components/shared/CarouselRow";
import { ProductCard } from "@/components/product/ProductCard";
import { RecentlyViewed } from "@/components/home/HomeSections";
import { TrackView } from "@/components/pdp/TrackView";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return products.flatMap((p) => [{ slug: slugify(p.name) }, { slug: p.id }]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProductDB(params.slug);
  if (!p) return { title: "Product" };
  return {
    title: `${p.name} — ${p.brand}`,
    description: p.description,
    openGraph: { title: p.name, description: p.description },
  };
}

export default async function ProductPage({ params }: Props) {
  const p = await getProductDB(params.slug);
  if (!p) notFound();

  const rel = related(p);
  const alts = alternateBrands(p);
  const productReviews = reviews.filter((r) => !r.productId || r.productId === p.id);

  return (
    <div className="bg-cream pb-20">
      <TrackView id={p.id} price={p.flashSale?.price ?? p.price} />
      <div className="container-page grid gap-10 py-8 lg:grid-cols-2">
        <ProductGallery product={p} />
        <ProductInfo product={p} />
      </div>

      {(p.category === "Skincare" || p.category === "Haircare") && (
        <div className="container-page mb-10">
          <BeforeAfterSlider before={p.images[0]} after={p.images[1] ?? p.images[0]} />
        </div>
      )}

      {p.category === "Makeup" && (
        <div className="container-page mb-10">
          <ShadeMatcher />
        </div>
      )}

      <div className="container-page">
        <ProductTabs product={p} reviews={productReviews} />
      </div>

      {alts.length > 0 && (
        <CarouselRow title="Alternate Brands" subtitle="Same type, different house" tone="white">
          {alts.map((x) => (
            <ProductCard key={x.id} product={x} />
          ))}
        </CarouselRow>
      )}

      <CarouselRow title="Related Products" tone="cream">
        {rel.map((x) => (
          <ProductCard key={x.id} product={x} />
        ))}
      </CarouselRow>

      <RecentlyViewed />
      <CompareBar currentId={p.id} />
    </div>
  );
}
