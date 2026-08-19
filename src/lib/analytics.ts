declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (name: string, payload?: Record<string, unknown>) => void };
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(name: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: name, ...payload });
  window.fbq?.("trackCustom", name, payload);
  window.ttq?.track(name, payload);
  window.gtag?.("event", name, payload);
}

export function captureReferral() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref") || params.get("aff");
  if (ref) {
    sessionStorage.setItem("glow-ref", ref);
    track("referral_land", { ref });
  }
}
