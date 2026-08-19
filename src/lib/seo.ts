export const SITE_URL = "https://glowbeauty.com.bd";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  name: "GLOW Beauty",
  url: SITE_URL,
  logo: `${SITE_URL}/icons/pwa-512.png`,
  description: "Premium beauty & personal care e-commerce in Bangladesh.",
  areaServed: { "@type": "Country", name: "Bangladesh" },
  currenciesAccepted: "BDT",
  paymentAccepted: "bKash, Nagad, Rocket, Cash on Delivery",
  sameAs: ["https://facebook.com/glowbeautybd", "https://instagram.com/glowbeautybd"],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: SITE_URL,
  name: "GLOW",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};
