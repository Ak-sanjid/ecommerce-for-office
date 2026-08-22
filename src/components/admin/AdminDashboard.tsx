"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { products } from "@/data/products";
import { ORDER_STATUSES } from "@/lib/commerce";
import { ROLE_LABELS, ROLES, can, type Permission, type Role } from "@/lib/permissions";
import type { AdminSession } from "@/lib/adminAuth";
import { Icon } from "@/components/shared/Icon";

type OrderStatus = (typeof ORDER_STATUSES)[number];
type OrderRow = {
  id: string;
  orderNumber: string;
  guestName?: string | null;
  guestPhone?: string | null;
  total: number;
  paymentMethod: string;
  status: OrderStatus;
  items: unknown[];
  createdAt: string;
};

const SECTIONS: Array<{ id: string; label: string; perm: Permission }> = [
  { id: "layout", label: "Header Layout", perm: "catalog.manage" },
  { id: "promo", label: "Promo Strip", perm: "catalog.manage" },
  { id: "nav", label: "Navigation Editor", perm: "catalog.manage" },
  { id: "rows", label: "Homepage Rows", perm: "catalog.manage" },
  { id: "orders", label: "Orders", perm: "orders.view" },
  { id: "coupons", label: "Coupons & Flash", perm: "coupons.manage" },
  { id: "inventory", label: "Inventory", perm: "inventory.manage" },
  { id: "restock", label: "Restock alerts", perm: "orders.view" },
  { id: "referral", label: "Referrals / Affiliate", perm: "catalog.manage" },
  { id: "analytics", label: "Pixels & GA4", perm: "catalog.manage" },
  { id: "abandoned", label: "Abandoned Recovery", perm: "catalog.manage" },
  { id: "golive", label: "Go Live", perm: "settings.manage" },
  { id: "team", label: "Team / RBAC", perm: "team.manage" },
];

type Json = Record<string, unknown> | unknown[] | string | boolean | null;

export function AdminDashboard({ session }: { session: AdminSession }) {
  const [tab, setTab] = useState("orders");
  const [status, setStatus] = useState("");
  const [configs, setConfigs] = useState<Record<string, Json>>({});
  const router = useRouter();
  const role: Role = session.role;
  const visibleSections = SECTIONS.filter((s) => can(role, s.perm));

  const load = async () => {
    const keys = [
      "header_layout",
      "promo_strip",
      "nav_items",
      "home_rows",
      "analytics",
      "coupons",
      "inventory",
      "abandoned",
      "affiliates",
      "orders",
      "restock",
      "goLive",
    ];
    if (can(role, "team.manage")) keys.push("team");
    const out: Record<string, Json> = {};
    await Promise.all(
      keys.map(async (k) => {
        const res = await fetch(`/admin/api/get?key=${k}`);
        if (res.status === 401) {
          router.refresh();
          return;
        }
        if (res.status === 403) return;
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
    const res = await fetch("/admin/api/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    });
    if (res.status === 401) {
      router.refresh();
      return;
    }
    if (!res.ok) {
      const j = (await res.json().catch(() => ({}))) as { error?: string };
      setStatus(`Denied: ${j.error ?? res.status}`);
      return;
    }
    setStatus(`Saved: ${key}`);
    load();
  };

  const logout = async () => {
    await fetch("/admin/api/logout", { method: "POST" });
    router.refresh();
  };

  const layout = configs.header_layout;
  const promo = (configs.promo_strip ?? {}) as Record<string, unknown>;
  const goLive = (configs.goLive ?? { live: true, ready: true, checks: [] }) as {
    live: boolean;
    ready: boolean;
    checks: Array<{ id: string; label: string; ok: boolean; required: boolean; detail: string }>;
  };
  const team = (configs.team ?? []) as Array<{
    id: string;
    username: string;
    role: Role;
    active: boolean;
    createdAt: string;
  }>;
  const inventory = (configs.inventory ?? { logs: [], stock: [] }) as {
    logs: Array<{ id: string; name: string; change: number; reason: string; createdAt: string }>;
    stock: Array<{ id: string; name: string; stock: number; batch: string; expiry: string }>;
  };
  const coupons = (configs.coupons ?? []) as Array<{
    code: string;
    value: number;
    type: string;
    usedCount: number;
    active: boolean;
    endsAt: string;
  }>;
  const abandoned = (configs.abandoned ?? []) as Array<{
    id: string;
    createdAt: string;
    remindersSent: number;
    recoveredAt?: string;
  }>;
  const affiliates = (configs.affiliates ?? []) as Array<{
    influencerName: string;
    linkSlug: string;
    clicks: number;
    conversions: number;
  }>;
  const orders = (configs.orders ?? []) as OrderRow[];
  const restock = (configs.restock ?? []) as Array<{
    id: string;
    productId: string;
    phone: string;
    notified: boolean;
    createdAt: string;
  }>;

  return (
    <div className="bg-cream min-h-screen pb-16">
      <div className="container-page py-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="kicker">Phase 1–5</p>
            <h1 className="font-display text-3xl font-semibold mt-1">GLOW Admin</h1>
            <p className="text-sm text-off-black/50 mt-1">
              Signed in as <strong>{session.name}</strong> ·{" "}
              <span className="inline-flex items-center gap-1 rounded-full bg-gold/10 px-2 py-0.5 text-[11px] font-medium text-gold-dark">
                <Icon name="shield" size={12} /> {ROLE_LABELS[role]}
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/dashboard" className="btn-secondary text-xs">
              Visual reorder UI
            </Link>
            <button type="button" className="btn-outline text-xs" onClick={logout}>
              Sign out
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {visibleSections.map((s) => (
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
              <p className="text-xs text-off-black/50">
                A = search + shortcuts + category. B = full category + promo strip. C = sticky 2-line (logo/search row + category row).
              </p>
              <div className="mt-3 flex gap-2">
                {(["A", "B", "C"] as const).map((v) => (
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
              <button type="button" onClick={() => save("promo_strip", { ...promo, enabled: !promo.enabled })} className="btn-secondary mt-2">
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

          {tab === "orders" && (
            <section>
              <h2 className="font-display text-xl">Orders</h2>
              <p className="text-xs text-off-black/50 mb-3">Status changes fire WhatsApp (dry-run without WA_TOKEN).</p>
              {orders.length === 0 && <p className="text-sm text-off-black/40">No orders yet. Place one from /checkout.</p>}
              <ul className="space-y-2 text-sm">
                {orders.map((o) => (
                  <li key={o.id} className="rounded-xl border border-gold/15 px-3 py-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span>
                        <strong>{o.orderNumber}</strong> · ৳{o.total} · {o.guestName || "Guest"} · {o.guestPhone || "—"}
                      </span>
                      {can(role, "orders.update") ? (
                        <select
                          className="input-field py-1 w-40 text-xs"
                          value={o.status}
                          onChange={(e) => save("order_status", { id: o.orderNumber, status: e.target.value as OrderStatus })}
                        >
                          {ORDER_STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="badge-gold">{o.status}</span>
                      )}
                    </div>
                    <p className="mt-1 text-[11px] text-off-black/45">
                      {o.paymentMethod} · {o.items.length} items · {o.createdAt.slice(0, 16)}
                    </p>
                  </li>
                ))}
              </ul>
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

          {tab === "restock" && (
            <section>
              <h2 className="font-display text-xl">Restock alerts</h2>
              {restock.length === 0 && <p className="text-sm text-off-black/40">No pending notify-me requests.</p>}
              <ul className="mt-3 space-y-2 text-sm">
                {restock.map((a) => (
                  <li key={a.id} className="flex justify-between border border-gold/15 rounded-xl px-3 py-2">
                    <span>
                      {a.productId} · {a.phone}
                    </span>
                    <span className="text-off-black/45">{a.notified ? "notified" : "waiting"}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {tab === "referral" && (
            <section>
              <h2 className="font-display text-xl">Referral / Affiliate</h2>
              <p className="text-xs text-off-black/50">Example: /?ref=emily — sets glow_ref cookie for 30 days.</p>
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
                {abandoned.length === 0 && (
                  <li className="text-off-black/40">No abandoned sessions yet. Leave checkout with items to record one.</li>
                )}
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

          {tab === "golive" && (
            <section>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl flex items-center gap-2">
                    <Icon name="rocket" size={18} className="text-gold" /> Go Live
                  </h2>
                  <p className="text-xs text-off-black/50 mt-1">
                    When the store is <strong>off</strong>, visitors see a “coming soon” page. Admin stays reachable.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => save("go_live_toggle", !goLive.live)}
                  className={goLive.live ? "btn-outline" : "btn-primary"}
                >
                  {goLive.live ? "Take store offline" : "Go Live"}
                </button>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {goLive.checks.map((c) => (
                  <div key={c.id} className="flex items-start gap-2 rounded-xl border border-gold/15 px-3 py-2 text-sm">
                    <span className={`mt-0.5 grid h-4 w-4 place-items-center rounded-full ${c.ok ? "bg-gold/20 text-gold-dark" : "bg-pink-gold/20 text-pink-gold-dark"}`}>
                      <Icon name={c.ok ? "check" : "close"} size={10} />
                    </span>
                    <span>
                      <span className="font-medium">{c.label}</span>
                      <span className={`ml-1 text-[10px] uppercase tracking-wide ${c.required ? "text-gold-dark" : "text-off-black/40"}`}>
                        {c.required ? "required" : "optional"}
                      </span>
                      <span className="block text-xs text-off-black/50">{c.detail}</span>
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-xs text-off-black/50">
                Status: <strong>{goLive.live ? "Live" : "Offline (maintenance)"}</strong>
                {goLive.live ? " · storefront is open" : " · storefront shows coming soon"} · required checks {goLive.ready ? "all pass" : "pending"}.
              </p>
            </section>
          )}

          {tab === "team" && (
            <section>
              <h2 className="font-display text-xl flex items-center gap-2">
                <Icon name="users" size={18} className="text-gold" /> Team / RBAC
              </h2>
              <p className="text-xs text-off-black/50">Owner · Manager · Staff — each role maps to a set of permissions.</p>
              <ul className="mt-3 space-y-2 text-sm">
                {team.map((u) => (
                  <li key={u.id} className="flex items-center justify-between border border-gold/15 rounded-xl px-3 py-2">
                    <span>
                      <strong>{u.username}</strong>{" "}
                      <span className="badge-gold ml-1">{ROLE_LABELS[u.role]}</span>
                      {!u.active && <span className="ml-1 text-[10px] uppercase text-pink-gold-dark">disabled</span>}
                    </span>
                    {u.id !== "admin_owner" && (
                      <button
                        type="button"
                        className="text-xs text-pink-gold-dark"
                        onClick={() => save("team_remove", { id: u.id })}
                      >
                        Remove
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              <TeamForm onSave={(input) => save("team_upsert", input)} />
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function TeamForm({ onSave }: { onSave: (input: { username: string; role: Role; password: string }) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("staff");

  return (
    <div className="mt-4 rounded-xl border border-gold/15 p-3">
      <p className="text-xs font-medium text-off-black/60 mb-2">Invite a teammate</p>
      <div className="flex flex-wrap gap-2">
        <input
          className="input-field py-2 text-sm max-w-[180px]"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input-field py-2 text-sm max-w-[180px]"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select className="input-field py-2 w-32 text-sm" value={role} onChange={(e) => setRole(e.target.value as Role)}>
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {ROLE_LABELS[r]}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="btn-secondary text-xs"
          disabled={!username.trim() || !password}
          onClick={() => {
            onSave({ username: username.trim(), role, password });
            setPassword("");
          }}
        >
          Add user
        </button>
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
      <textarea className="w-full rounded-xl border p-2 font-mono text-xs min-h-[140px] bg-white text-off-black" value={text} onChange={(e) => setText(e.target.value)} />
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
