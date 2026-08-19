"use client";

import { useSiteConfig } from "@/hooks/useSiteConfig";
import type { HeaderLayout, HomeRowConfig, NavItemConfig, ShortcutConfig } from "@/config/site";

export default function AdminDashboard() {
  const { config, overrides, save, reset } = useSiteConfig();

  const setLayout = (headerLayout: HeaderLayout) => save({ ...overrides, headerLayout });

  const move = <T extends { id: string; order: number }>(
    key: "navItems" | "homeRows" | "quickShortcuts",
    list: T[],
    id: string,
    dir: -1 | 1,
  ) => {
    const sorted = [...list].sort((a, b) => a.order - b.order);
    const i = sorted.findIndex((x) => x.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= sorted.length) return;
    const a = sorted[i];
    const b = sorted[j];
    const next = sorted.map((item) => {
      if (item.id === a.id) return { id: item.id, order: b.order };
      if (item.id === b.id) return { id: item.id, order: a.order };
      return { id: item.id, order: item.order };
    });
    save({ ...overrides, [key]: next });
  };

  const toggle = (key: "navItems" | "homeRows" | "quickShortcuts", id: string, visible: boolean) => {
    const current = overrides[key] ?? [];
    const rest = current.filter((x) => x.id !== id);
    save({ ...overrides, [key]: [...rest, { id, visible }] });
  };

  return (
    <div className="container-page py-10">
      <div className="kicker">Admin control layer</div>
      <h1 className="font-display text-5xl mt-2">Navigation, rows, layout</h1>
      <p className="max-w-2xl mt-4 text-off-black/70">
        Changes write to <code className="text-gold-dark">localStorage</code> today and map 1:1 to{" "}
        <code className="text-gold-dark">src/config/site.ts</code> / the Prisma <code>SiteConfig</code> table tomorrow.
        Hide or reorder anything independently. Refresh the homepage to see rows move.
      </p>

      <div className="mt-8 flex flex-wrap gap-3 items-center">
        <span className="text-xs tracking-widest uppercase text-gold-dark">Header layout</span>
        {(["A", "B"] as const).map((L) => (
          <button
            key={L}
            type="button"
            onClick={() => setLayout(L)}
            className={`px-4 h-9 rounded-full text-sm border ${config.headerLayout === L ? "border-gold bg-gold/15" : "border-gold/25"}`}
          >
            {L === "A" ? "A · Search + shortcuts + category" : "B · Category bar + promo strip"}
          </button>
        ))}
        <button type="button" onClick={reset} className="btn-secondary ml-auto">
          Reset to defaults
        </button>
      </div>

      <div className="mt-10 grid lg:grid-cols-3 gap-6">
        <Editor
          title="Top category bar"
          items={config.navItems}
          onUp={(id) => move("navItems", config.navItems, id, -1)}
          onDown={(id) => move("navItems", config.navItems, id, 1)}
          onToggle={(id, v) => toggle("navItems", id, v)}
        />
        <Editor
          title="Quick shortcuts"
          items={config.quickShortcuts}
          onUp={(id) => move("quickShortcuts", config.quickShortcuts, id, -1)}
          onDown={(id) => move("quickShortcuts", config.quickShortcuts, id, 1)}
          onToggle={(id, v) => toggle("quickShortcuts", id, v)}
        />
        <Editor
          title="Homepage rows"
          items={config.homeRows}
          onUp={(id) => move("homeRows", config.homeRows, id, -1)}
          onDown={(id) => move("homeRows", config.homeRows, id, 1)}
          onToggle={(id, v) => toggle("homeRows", id, v)}
        />
      </div>

      <ul className="mt-10 grid sm:grid-cols-2 gap-3 text-sm">
        {["Inventory", "Repeat customers", "Coupons / flash", "Abandoned cart", "FB / TikTok / GA4", "Referral links"].map((x) => (
          <li key={x} className="border border-gold/25 bg-white p-4 text-off-black/50">
            {x} · Phase 2
          </li>
        ))}
      </ul>
    </div>
  );
}

function Editor({
  title,
  items,
  onUp,
  onDown,
  onToggle,
}: {
  title: string;
  items: Array<NavItemConfig | HomeRowConfig | ShortcutConfig>;
  onUp: (id: string) => void;
  onDown: (id: string) => void;
  onToggle: (id: string, visible: boolean) => void;
}) {
  const sorted = [...items].sort((a, b) => a.order - b.order);
  return (
    <section className="border border-gold/20 bg-white p-4">
      <h2 className="font-display text-2xl mb-3">{title}</h2>
      <ul className="space-y-2">
        {sorted.map((item) => (
          <li key={item.id} className="flex items-center gap-2 text-sm">
            <button type="button" className="w-7 h-7 border border-gold/25" onClick={() => onUp(item.id)} aria-label="up">
              ↑
            </button>
            <button type="button" className="w-7 h-7 border border-gold/25" onClick={() => onDown(item.id)} aria-label="down">
              ↓
            </button>
            <span className={`flex-1 ${item.visible ? "" : "line-through text-off-black/40"}`}>
              {item.label}
            </span>
            <button type="button" className="text-xs uppercase tracking-wider text-gold-dark" onClick={() => onToggle(item.id, !item.visible)}>
              {item.visible ? "Hide" : "Show"}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
