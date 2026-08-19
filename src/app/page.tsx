import { HeroBanner } from "@/components/home/HeroBanner";
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
  TrustBar,
} from "@/components/home/HomeSections";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <TrustBar />
      <FlashSale />
      <SkinQuizCTA />
      <TopSelling />
      <ShopByConcern />
      <BrandWeTrust />
      <TodaysOffer />
      <ShoppableReels />
      <RecommendedForYou />
      <CustomerReviews />
      <RecentlyViewed />
      <NewsletterSignup />
    </>
  );
}
