import { ListingShell } from "@/components/listing/ListingShell";
import { parseListParam } from "@/lib/catalog";
import { filterProductsDB } from "@/lib/catalog-db";

const titles: Record<string, string> = {
  "k-beauty": "K-Beauty",
  "j-beauty": "J-Beauty",
  international: "International Brands",
  "top-selling": "Top Selling",
  combo: "Combos",
  "todays-offer": "Today's Offer",
};

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const items = await filterProductsDB({
    collection: params.slug,
    brand: typeof searchParams.brand === "string" ? searchParams.brand : undefined,
    min: searchParams.min ? Number(searchParams.min) : undefined,
    max: searchParams.max ? Number(searchParams.max) : undefined,
    ingredients: parseListParam(searchParams.ing),
    badges: parseListParam(searchParams.badge),
    sort: typeof searchParams.sort === "string" ? searchParams.sort : undefined,
  });

  return <ListingShell items={items} title={titles[params.slug] ?? params.slug} />;
}
