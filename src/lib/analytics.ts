type PixelEvent = {
  name: string;
  payload?: Record<string, unknown>;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (name: string, payload?: Record<string, unknown>) => void };
    gtag?: (...args: unknown[]) => void;
    kantiAnalytics?: (event: PixelEvent) => void;
  }
}

export function track(name: string, payload: Record<string, unknown> = {}) {
  const event = { event: name, ...payload };
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(event);
  window.fbq?.("trackCustom", name, payload);
  window.ttq?.track(name, payload);
  window.gtag?.("event", name, payload);
  window.kantiAnalytics?.({ name, payload });
}

export function captureReferral() {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref") || params.get("aff");
  if (ref) {
    sessionStorage.setItem("kanti-ref", ref);
    track("referral_land", { ref });
  }
}
