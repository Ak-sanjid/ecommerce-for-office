declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    ttq?: { track: (name: string, payload?: Record<string, unknown>) => void };
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const MAP = {
  viewItem: { fb: "ViewContent", ga: "view_item", tt: "ViewContent" },
  addToCart: { fb: "AddToCart", ga: "add_to_cart", tt: "AddToCart" },
  addWishlist: { fb: "AddToWishlist", ga: "add_to_wishlist", tt: "AddToWishlist" },
  beginCheckout: { fb: "InitiateCheckout", ga: "begin_checkout", tt: "InitiateCheckout" },
  purchase: { fb: "Purchase", ga: "purchase", tt: "CompletePayment" },
} as const;

export function track(event: keyof typeof MAP, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const m = MAP[event];
  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event: m.ga, ...params });
    if (m.fb && window.fbq) window.fbq("track", m.fb, params);
    if (m.ga && window.gtag) window.gtag("event", m.ga, params);
    if (m.tt && window.ttq) window.ttq.track(m.tt, params);
  } catch {
    /* never block UI on analytics */
  }
}

export default track;
