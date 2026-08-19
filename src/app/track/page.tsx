"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";

export default function TrackPage() {
  const { lang } = useLang();
  const [found, setFound] = useState(false);
  return (
    <div className="container-page py-10 max-w-lg">
      <h1 className="font-display text-5xl">{lang === "bn" ? "অর্ডার ট্র্যাক" : "Track order"}</h1>
      <form
        className="mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          setFound(true);
        }}
      >
        <input className="input-field" placeholder="GLOW-1842" />
        <button className="btn-primary mt-3">{lang === "bn" ? "খুঁজুন" : "Look up"}</button>
      </form>
      {found && (
        <p className="mt-6">
          <strong>GLOW-1842</strong> — {lang === "bn" ? "ঢাকার ভিতর · পথে। এসএমএস ও হোয়াটসঅ্যাপে আপডেট যাবে।" : "Inside Dhaka · on the way. Updates go out on SMS and WhatsApp."}
        </p>
      )}
    </div>
  );
}
