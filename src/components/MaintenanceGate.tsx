"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ComingSoon } from "./ComingSoon";

/**
 * Blocks the storefront while the store is not live. `/admin` (and API routes,
 * which never render this layout) stay reachable so the owner can flip it back.
 */
export function MaintenanceGate({ live, children }: { live: boolean; children: ReactNode }) {
  const pathname = usePathname();
  const exempt = pathname.startsWith("/admin");

  if (live || exempt) return <>{children}</>;
  return <ComingSoon />;
}
