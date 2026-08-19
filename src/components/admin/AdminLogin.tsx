"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLogin() {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const res = await fetch("/admin/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    if (res.ok) router.refresh();
    else {
      const j = (await res.json().catch(() => ({}))) as { error?: string };
      setErr(j.error ?? "Invalid password");
    }
    setBusy(false);
  };

  return (
    <div className="grid min-h-[70vh] place-items-center bg-cream">
      <form onSubmit={submit} className="w-full max-w-xs rounded-3xl bg-white p-8 shadow-card">
        <p className="kicker">Restricted</p>
        <h1 className="font-display text-2xl font-semibold mt-1">GLOW Admin</h1>
        <p className="mt-1 text-xs text-off-black/50">Signed HMAC cookie · 8 hour session</p>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Admin password"
          className="input-field mt-4"
          autoFocus
        />
        {err && <p className="mt-2 text-xs text-pink-gold-dark">{err}</p>}
        <button className="btn-primary mt-4 w-full" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
