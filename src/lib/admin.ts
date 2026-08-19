import { readStore, updateStore } from "./jsonStore";

export function getSiteConfig(key: string) {
  const store = readStore();
  return (store.siteConfig[key] as Record<string, unknown> | string | boolean | null) ?? null;
}

export function setSiteConfig(key: string, value: unknown) {
  updateStore((s) => ({
    ...s,
    siteConfig: { ...s.siteConfig, [key]: value },
  }));
  return { key, value };
}

export function listNavItems() {
  const c = getSiteConfig("nav_items") as { visible?: string[] } | null;
  return c?.visible ?? [];
}

export function listHomeRows() {
  const c = getSiteConfig("home_rows") as { visible?: string[] } | null;
  return c?.visible ?? [];
}

export function dumpStore() {
  return readStore();
}
