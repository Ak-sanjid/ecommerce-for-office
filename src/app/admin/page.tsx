"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";

const SECTIONS = [
  { id: "layout", label: "Header Layout" },
  { id: "promo", label: "Promo Strip" },
  { id: "nav", label: "Navigation Editor" },
  { id: "rows", label: "Homepage Rows" },
  { id: "coupons", label: "Coupons & Flash" },
  { id: "inventory", label: "Inventory" },
  { id: "referral", label: "Referrals / Affiliate" },
  { id: "analytics", label: "Pixels & GA4" },
  { id: "abandoned", label: "Abandoned Recovery" },
];

type Json = Record<string, unknown> | unknown[] | string | boolean | null;

export default function AdminPage() {
  const [tab, setTab] = useState("layout");
  const [status, setStatus] = useState("");
  const [configs, setConfigs] = useState<Record<string, Json>>({});

  const load = async () => {
    const keys = ["header_layout", "promo_strip", "nav_items", "home_rows", "analytics", "coupons", "inventory", "abandoned", "affiliates"];
    const out: Record<string, Json> = {};
    await Promise.all(
      keys.map(async (k) => {
        const res = await fetch(`/admin/api/get?key=${k}`);
        const j = (await res.json()) as { value: Json };
        out[k] = j.value;
      }),
    );
    setConfigs(out);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (key: string, value: unknown) => {
    await fetch("/admin/api/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    });
    setStatus(`Saved: ${key}`);
    load();
  };

  const layout = configs.header_layout;
  const promo = (configs.promo_strip ?? {}) as Record<string, unknown>;
  const inventory = (configs.inventory ?? { logs: [], stock: [] }) as {
    logs: Array<{ id: string; name: string; change: number; reason: string; createdAt: string }>;
    stock: Array<{ id: string; name: string; stock: number; batch: string; expiry: string }>;
  };
  const coupons = (configs.coupons ?? []) as Array<{ code: string; value: number; type: string; usedCount: number; active: boolean; endsAt: string }>;
  const abandoned = (configs.abandoned ?? []) as Array<{ id: string; createdAt: string; remindersSent: number; recoveredAt?: string }>;
  const affiliates = (configs.affiliates ?? []) as Array<{ influencerName: string; linkSlug: string; clicks: number; conversions: number }>;

  return (
    <div className="bg-cream min-h-screen pb-16">
      <div className="container-page py-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="kicker">Phase 3</p>
            <h1 className="font-display text-3xl font-semibold mt-1">GLOW Admin</h1>
            <p className="text-sm text-off-black/50 mt-1">
              Writes to the SiteConfig store (JSON now, Prisma when DATABASE_URL is set).
            </p>
          </div>
          <Link href="/admin/dashboard" className="btn-secondary text-xs">
            Visual reorder UI
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setTab(s.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                tab === s.id ? "bg-gold text-off-black" : "bg-white border border-off-black/10 text-off-black/70"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {status && <div className="mt-3 text-xs text-gold-dark">{status}</div>}

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-card space-y-4">
          {tab === "layout" && (
            <section>
              <h2 className="font-display text-xl">Header Layout</h2>
              <p className="text-xs text-off-black/50">A = search + shortcuts + category. B = full category + promo strip.</p>
              <div className="mt-3 flex gap-2">
                {(["A", "B"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => save("header_layout", v)}
                    className={`rounded-xl px-4 py-2 text-sm font-medium border ${layout === v ? "border-gold bg-gold/10 text-gold-dark" : "bg-cream"}`}
                  >
                    Option {v}
                  </button>
                ))}
              </div>
            </section>
          )}

          {tab === "promo" && (
            <section>
              <h2 className="font-display text-xl">Promo Strip</h2>
              <button
                type="button"
                onClick={() => save("promo_strip", { ...promo, enabled: !promo.enabled })}
                className="btn-secondary mt-2"
              >
                {promo.enabled ? "Disable" : "Enable"}
              </button>
              <JsonEditor value={promo} onSave={(v) => save("promo_strip", v)} />
            </section>
          )}

          {tab === "nav" && (
            <section>
              <h2 className="font-display text-xl">Navigation Editor</h2>
              <p className="mb-2 text-xs text-off-black/40">Edit visible ids. Visual drag lives on /admin/dashboard.</p>
              <JsonEditor value={configs.nav_items} onSave={(v) => save("nav_items", v)} />
            </section>
          )}

          {tab === "rows" && (
            <section>
              <h2 className="font-display text-xl">Homepage Rows</h2>
              <JsonEditor value={configs.home_rows} onSave={(v) => save("home_rows", v)} />
            </section>
          )}

          {tab === "coupons" && (
            <section>
              <h2 className="font-display text-xl">Coupons</h2>
              <p className="text-xs text-off-black/50 mb-3">Active: GLOW10 (10%), FLASH30 (30% flash, 3 days).</p>
              <ul className="space-y-2 text-sm">
                {coupons.map((c) => (
                  <li key={c.code} className="flex justify-between border border-gold/15 rounded-xl px-3 py-2">
                    <span>
                      <strong>{c.code}</strong> · {c.type} {c.value} · used {c.usedCount}
                    </span>
                    <span className="text-off-black/45">{c.active ? "active" : "off"}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {tab === "inventory" && (
            <section>
              <h2 className="font-display text-xl">Inventory</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                <select id="sku" className="input-field py-2 max-w-xs text-sm">
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.brand} — {p.name}
                    </option>
                  ))}
                </select>
                <input id="delta" type="number" defaultValue={5} className="input-field py-2 w-24 text-sm" />
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    const productId = (document.getElementById("sku") as HTMLSelectElement).value;
                    const change = Number((document.getElementById("delta") as HTMLInputElement).value);
                    save("stock_change", { productId, change, reason: change >= 0 ? "restock" : "adjustment" });
                  }}
                >
                  Apply stock change
                </button>
              </div>
              <ul className="mt-4 space-y-1 text-xs text-off-black/60 max-h-48 overflow-auto">
                {(inventory.logs ?? []).map((l) => (
                  <li key={l.id}>
                    {l.createdAt.slice(0, 16)} · {l.name} · {l.change > 0 ? "+" : ""}
                    {l.change} · {l.reason}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {tab === "referral" && (
            <section>
              <h2 className="font-display text-xl">Referral / Affiliate</h2>
              <p className="text-xs text-off-black/50">Example: /?ref=emily</p>
              <ul className="mt-3 space-y-2 text-sm">
                {affiliates.map((a) => (
                  <li key={a.linkSlug} className="flex justify-between border border-gold/15 rounded-xl px-3 py-2">
                    <span>
                      {a.influencerName} · <code>?ref={a.linkSlug}</code>
                    </span>
                    <span>
                      {a.clicks} clicks · {a.conversions} conv
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {tab === "analytics" && (
            <section>
              <h2 className="font-display text-xl">Analytics Config</h2>
              <p className="text-xs text-off-black/50">Empty IDs stay silent — scripts only inject when set.</p>
              <JsonEditor value={configs.analytics} onSave={(v) => save("analytics", v)} />
            </section>
          )}

          {tab === "abandoned" && (
            <section>
              <h2 className="font-display text-xl">Abandoned carts</h2>
              <button type="button" className="btn-primary mt-2" onClick={() => save("abandoned_recovery_enabled", true)}>
                Enable recovery
              </button>
              <ul className="mt-4 space-y-2 text-sm">
                {abandoned.length === 0 && <li className="text-off-black/40">No abandoned sessions yet. Leave checkout with items to record one.</li>}
                {abandoned.map((a) => (
                  <li key={a.id} className="flex justify-between border border-gold/15 rounded-xl px-3 py-2">
                    <span>
                      {a.id} · reminders {a.remindersSent}
                    </span>
                    {!a.recoveredAt && (
                      <button type="button" className="text-gold-dark text-xs" onClick={() => save("abandoned_recover", { id: a.id, method: "whatsapp" })}>
                        WhatsApp nudge
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function JsonEditor({ value, onSave }: { value: Json; onSave: (v: unknown) => void }) {
  const [text, setText] = useState(JSON.stringify(value ?? {}, null, 2));
  useEffect(() => {
    setText(JSON.stringify(value ?? {}, null, 2));
  }, [value]);
  return (
    <div className="mt-3">
      <textarea className="w-full rounded-xl border p-2 font-mono text-xs min-h-[140px]" value={text} onChange={(e) => setText(e.target.value)} />
      <button
        type="button"
        className="btn-secondary mt-2"
        onClick={() => {
          try {
            onSave(JSON.parse(text));
          } catch {
            /* ignore */
          }
        }}
      >
        Save JSON
      </button>
    </div>
  );
}
