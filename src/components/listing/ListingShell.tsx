import { Suspense } from "react";
import { ListingSidebar } from "./ListingSidebar";
import { FilterPanel } from "./FilterPanel";
import { ProductGrid } from "./ProductGrid";
import type { Product } from "@/types";

export function ListingShell({
  items,
  title,
  accent = "from-cream",
}: {
  items: Product[];
  title: string;
  accent?: string;
}) {
  return (
    <div className={`bg-gradient-to-b ${accent} to-cream pb-16`}>
      <div className="container-page flex gap-8 pt-6">
        <ListingSidebar />
        <div className="hidden w-56 shrink-0 xl:block">
          <Suspense fallback={null}>
            <FilterPanel />
          </Suspense>
        </div>
        <Suspense fallback={<p className="text-sm text-off-black/40">…</p>}>
          <ProductGrid items={items} title={title} />
        </Suspense>
      </div>
    </div>
  );
}
