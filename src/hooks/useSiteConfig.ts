"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  SITE_CONFIG_LS,
  mergeSite,
  siteConfig,
  type SiteOverrides,
} from "@/config/site";

export function useSiteConfig() {
  const [over, setOver] = useState<SiteOverrides>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SITE_CONFIG_LS);
      if (raw) setOver(JSON.parse(raw) as SiteOverrides);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const save = useCallback((next: SiteOverrides) => {
    setOver(next);
    localStorage.setItem(SITE_CONFIG_LS, JSON.stringify(next));
  }, []);

  const reset = useCallback(() => {
    setOver({});
    localStorage.removeItem(SITE_CONFIG_LS);
  }, []);

  const config = useMemo(() => mergeSite(over), [over]);

  return { config, overrides: over, save, reset, ready, defaults: siteConfig };
}
