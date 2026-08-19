import { notFound } from "next/navigation";
import { brands } from "@/data/brands";
import { filterProductsDB } from "@/lib/catalog-db";
import { ProductGrid } from "@/components/listing/ProductGrid";
import { Suspense } from "react";

export default async function BrandPage({ params }: { params: { id: string } }) {
  const brand = brands.find((b) => b.id === params.id);
  if (!brand) notFound();
  const items = await filterProductsDB({ brand: brand.id });

  return (
    <div>
      <section
        className="border-b border-off-black/5 py-14"
        style={{ background: `linear-gradient(135deg, ${brand.color}14, #FBF8F3)` }}
      >
        <div className="container-page">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
            {brand.isOfficial ? "Official Distributor" : brand.country}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">{brand.name}</h1>
          <p className="mt-2 max-w-lg text-sm text-off-black/55">{brand.tagline}</p>
          <p className="mt-1 text-[11px] uppercase tracking-widest text-off-black/35">{brand.country}</p>
        </div>
      </section>
      <div className="container-page py-10">
        <Suspense fallback={null}>
          <ProductGrid items={items} title={`${brand.name} Collection`} />
        </Suspense>
      </div>
    </div>
  );
}
