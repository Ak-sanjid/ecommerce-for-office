import { Suspense } from "react";
import { FilterPanel } from "@/components/listing/FilterPanel";
import { ProductGrid } from "@/components/listing/ProductGrid";
import { filterProducts, parseListParam } from "@/lib/catalog";

export default function SearchPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const q = typeof searchParams.q === "string" ? searchParams.q : "";
  const items = filterProducts({
    q,
    brand: typeof searchParams.brand === "string" ? searchParams.brand : undefined,
    min: searchParams.min ? Number(searchParams.min) : undefined,
    max: searchParams.max ? Number(searchParams.max) : undefined,
    ingredients: parseListParam(searchParams.ing),
    badges: parseListParam(searchParams.badge),
    sort: typeof searchParams.sort === "string" ? searchParams.sort : undefined,
  });

  return (
    <div className="container-page flex gap-8 py-8">
      <div className="hidden w-56 shrink-0 lg:block">
        <Suspense fallback={null}>
          <FilterPanel />
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <ProductGrid items={items} title={q ? `Results for “${q}”` : "Search"} />
      </Suspense>
    </div>
  );
}
