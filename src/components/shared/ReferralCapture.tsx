"use client";

import { useEffect } from "react";
import { captureReferral } from "@/lib/analytics";

export function ReferralCapture() {
  useEffect(() => {
    captureReferral();
  }, []);
  return null;
}
