import type { Metadata } from "next";
import { ListingShell } from "@/components/listing/ListingShell";
import { parseListParam } from "@/lib/catalog";
import { filterProductsDB } from "@/lib/catalog-db";
import { mainCategories } from "@/data/categories";

type Props = {
  params: { slug: string; sub?: string[] };
  searchParams: Record<string, string | string[] | undefined>;
};

export function generateMetadata({ params }: Props): Metadata {
  const cat = mainCategories.find((c) => c.slug === params.slug);
  const title = cat?.name ?? params.slug;
  return {
    title: `${title} | Authentic Beauty in Bangladesh`,
    description: `Shop authentic ${title} at GLOW. Official distributors, COD nationwide.`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const sub = params.sub?.[0];
  const cat = mainCategories.find((c) => c.slug === params.slug);
  const items = await filterProductsDB({
    category: params.slug,
    sub,
    brand: typeof searchParams.brand === "string" ? searchParams.brand : undefined,
    min: searchParams.min ? Number(searchParams.min) : undefined,
    max: searchParams.max ? Number(searchParams.max) : undefined,
    ingredients: parseListParam(searchParams.ing),
    badges: parseListParam(searchParams.badge),
    sort: typeof searchParams.sort === "string" ? searchParams.sort : undefined,
    concern: typeof searchParams.concern === "string" ? searchParams.concern : undefined,
  });

  const title = sub
    ? cat?.subCategories.find((s) => s.slug === sub)?.name ?? sub
    : cat?.name ?? params.slug;

  const accent =
    params.slug === "mens"
      ? "from-male-tint-light/40"
      : params.slug === "makeup"
        ? "from-female-tint-light/50"
        : "from-cream";

  return <ListingShell items={items} title={title} accent={accent} />;
}
