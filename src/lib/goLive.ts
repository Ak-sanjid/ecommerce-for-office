import { readStore, updateStore } from "./jsonStore";

export type LaunchCheck = {
  id: string;
  label: string;
  ok: boolean;
  required: boolean;
  detail: string;
};

export type LaunchStatus = {
  live: boolean;
  ready: boolean;
  checks: LaunchCheck[];
};

/** Storefront is open (true) or in "coming soon" maintenance (false). */
export function isLive(): boolean {
  return readStore().live;
}

export function setLive(live: boolean): boolean {
  updateStore((s) => ({ ...s, live }));
  return live;
}

export function getLaunchStatus(): LaunchStatus {
  const store = readStore();
  const hasOwner = store.adminUsers.some((u) => u.role === "owner");
  const skus = Object.keys(store.stock ?? {}).length;
  const hasWhatsApp = Boolean(process.env.NEXT_PUBLIC_WHATSAPP);
  const hasPayments = Boolean(
    process.env.BKASH_KEY || process.env.NAGAD_CLIENT_ID || process.env.ROCKET_KEY,
  );
  const hasAnalytics = Boolean(
    process.env.NEXT_PUBLIC_GA4_ID || process.env.NEXT_PUBLIC_FB_PIXEL_ID,
  );
  const hasSiteUrl = Boolean(process.env.NEXT_PUBLIC_SITE_URL);

  const checks: LaunchCheck[] = [
    {
      id: "catalog",
      label: "Catalog seeded",
      required: true,
      ok: skus > 0,
      detail: `${skus} SKUs in stock`,
    },
    {
      id: "owner",
      label: "Owner account",
      required: true,
      ok: hasOwner,
      detail: hasOwner ? "RBAC owner present" : "No owner — see /admin",
    },
    {
      id: "whatsapp",
      label: "WhatsApp number",
      required: false,
      ok: hasWhatsApp,
      detail: hasWhatsApp ? "Configured" : "Using demo number",
    },
    {
      id: "payments",
      label: "Payment gateway",
      required: false,
      ok: hasPayments,
      detail: hasPayments ? "Merchant keys set" : "COD only (dry-run)",
    },
    {
      id: "analytics",
      label: "Analytics pixels",
      required: false,
      ok: hasAnalytics,
      detail: hasAnalytics ? "GA4 / Pixel set" : "Silent until set",
    },
    {
      id: "siteUrl",
      label: "Store URL",
      required: false,
      ok: hasSiteUrl,
      detail: hasSiteUrl ? process.env.NEXT_PUBLIC_SITE_URL! : "Not set",
    },
  ];

  return {
    live: store.live,
    ready: checks.filter((c) => c.required).every((c) => c.ok),
    checks,
  };
}
