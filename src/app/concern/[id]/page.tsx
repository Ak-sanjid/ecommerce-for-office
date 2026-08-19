import { ListingShell } from "@/components/listing/ListingShell";
import { parseListParam } from "@/lib/catalog";
import { filterProductsDB } from "@/lib/catalog-db";
import { concerns } from "@/data/categories";

export default async function ConcernPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const label = concerns.find((c) => c.id === params.id);
  const items = await filterProductsDB({
    concern: params.id,
    brand: typeof searchParams.brand === "string" ? searchParams.brand : undefined,
    min: searchParams.min ? Number(searchParams.min) : undefined,
    max: searchParams.max ? Number(searchParams.max) : undefined,
    ingredients: parseListParam(searchParams.ing),
    badges: parseListParam(searchParams.badge),
    sort: typeof searchParams.sort === "string" ? searchParams.sort : undefined,
  });
  return <ListingShell items={items} title={label?.name ?? params.id} />;
}
