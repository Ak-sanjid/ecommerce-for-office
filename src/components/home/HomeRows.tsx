"use client";

import type { ComponentType } from "react";
import { visibleSorted, type HomeRowId } from "@/config/site";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { HeroBanner } from "./HeroBanner";
import {
  BrandWeTrust,
  CustomerReviews,
  FlashSale,
  NewsletterSignup,
  RecentlyViewed,
  RecommendedForYou,
  ShopByConcern,
  ShoppableReels,
  SkinQuizCTA,
  TodaysOffer,
  TopSelling,
} from "./HomeSections";

const ROWS: Record<HomeRowId, ComponentType> = {
  hero: HeroBanner,
  flashSale: FlashSale,
  skinQuiz: SkinQuizCTA,
  topSelling: TopSelling,
  shopByConcern: ShopByConcern,
  brandWeTrust: BrandWeTrust,
  todaysOffer: TodaysOffer,
  reels: ShoppableReels,
  recommended: RecommendedForYou,
  customerReviews: CustomerReviews,
  recentlyViewed: RecentlyViewed,
  newsletter: NewsletterSignup,
};

export function HomeRows() {
  const { config } = useSiteConfig();
  const rows = visibleSorted(config.homeRows);
  return (
    <>
      {rows.map(({ id }) => {
        const Row = ROWS[id];
        return Row ? <Row key={id} /> : null;
      })}
    </>
  );
}
