"use client";

import { useEffect, useState } from "react";

const KEY = "glow:recently-viewed";

export function useRecentlyViewed() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      setIds(JSON.parse(localStorage.getItem(KEY) ?? "[]") as string[]);
    } catch {
      /* ignore */
    }
  }, []);

  const push = (id: string) => {
    setIds((prev) => {
      const next = [id, ...prev.filter((x) => x !== id)].slice(0, 12);
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  };

  return { ids, push };
}
