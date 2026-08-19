import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store/Store";
import { tx } from "../data/i18n";
import { products } from "../data/products";
import { loc, formatBdt } from "../utils/format";
import { IconChat, IconClose } from "./icons";

type Msg = { role: "bot" | "me"; text: string; href?: string };

function reply(raw: string, lang: "en" | "bn"): Msg {
  const q = raw.toLowerCase();
  const find = (...keys: string[]) =>
    products.filter((p) => {
      const blob = `${p.name.en} ${p.brand} ${p.concerns.join(" ")} ${p.ingredients.join(" ")} ${p.category}`.toLowerCase();
      return keys.some((k) => blob.includes(k) || q.includes(k));
    });

  if (/niacinamide|নায়াসিন|naiacin|spot|দাগ|pigment/.test(q)) {
    const p = products.find((x) => x.id === "p10") ?? products[0];
    return {
      role: "bot",
      text:
        lang === "bn"
          ? `${p.brand} ${loc(p.name, "bn")} — ${formatBdt(p.price)}। রাতে ৩ ফোঁটা, সকালে অবশ্যই এসপিএফ।`
          : `${p.brand} ${p.name.en} is ${formatBdt(p.price)}. Three drops at night, SPF every morning.`,
      href: `/product/${p.slug}`,
    };
  }
  if (/sunscreen|spf|সানস্ক্রিন|sun cream|joseon/.test(q)) {
    const p = products.find((x) => x.id === "p2")!;
    return {
      role: "bot",
      text:
        lang === "bn"
          ? `Beauty of Joseon Relief Sun — ${formatBdt(p.price)}। বাংলাদেশি ত্বকে হোয়াইট কাস্ট প্রায় নেই।`
          : `Beauty of Joseon Relief Sun is ${formatBdt(p.price)} — barely a cast on Bangladeshi skin.`,
      href: `/product/${p.slug}`,
    };
  }
  if (/oily|তেল|oil|acne|একনে|pore/.test(q)) {
    const p = products.find((x) => x.id === "p3")!;
    return {
      role: "bot",
      text:
        lang === "bn"
          ? `অয়লি/একনে হলে Anua Heartleaf toner দিয়ে শুরু করুন (${formatBdt(p.price)})। পরে CeraVe cleanser।`
          : `For oily/acne-prone skin start with Anua Heartleaf toner (${formatBdt(p.price)}), then CeraVe cleanser.`,
      href: `/product/${p.slug}`,
    };
  }
  if (/hair|চুল|হেয়ার|fino|fall/.test(q)) {
    const p = products.find((x) => x.id === "p7")!;
    return {
      role: "bot",
      text:
        lang === "bn"
          ? `Fino হেয়ার মাস্ক (${formatBdt(p.price)}) সপ্তাহে একবার। প্রোটিন মাস্ক একই দিনে স্ট্যাক করবেন না।`
          : `Fino hair mask (${formatBdt(p.price)}) once a week. Do not stack another protein mask the same day.`,
      href: `/product/${p.slug}`,
    };
  }
  if (/men|পুরুষ|beard|দাড়ি|groom/.test(q)) {
    const p = products.find((x) => x.id === "p15")!;
    return {
      role: "bot",
      text:
        lang === "bn"
          ? `KÁNTI Homme Cedar beard oil — ${formatBdt(p.price)}। ঢাকার আর্দ্রতার জন্য কাটা।`
          : `KÁNTI Homme cedar beard oil is ${formatBdt(p.price)}, cut for Dhaka humidity.`,
      href: `/product/${p.slug}`,
    };
  }
  if (/baby|বেবি|শিশু|mustela|মা /.test(q)) {
    const p = products.find((x) => x.id === "p19")!;
    return {
      role: "bot",
      text:
        lang === "bn"
          ? `Mustela Gentle Cleansing Gel ${formatBdt(p.price)} — জন্মের দিন থেকে।`
          : `Mustela Gentle Cleansing Gel at ${formatBdt(p.price)} — fine from day one.`,
      href: `/product/${p.slug}`,
    };
  }
  const hit = find(...q.split(/\s+/).filter((w) => w.length > 3))[0];
  if (hit) {
    return {
      role: "bot",
      text:
        lang === "bn"
          ? `${hit.brand} ${loc(hit.name, "bn")} — ${formatBdt(hit.price)}। পেজ খুলুন বিস্তারির জন্য।`
          : `${hit.brand} ${hit.name.en} is ${formatBdt(hit.price)}. Open the page for the full note.`,
      href: `/product/${hit.slug}`,
    };
  }
  return {
    role: "bot",
    text:
      lang === "bn"
        ? "আরেকটু বলুন — যেমন “oily skin er jonno sunscreen” বা “নায়াসিনামাইড কত টাকা”。"
        : "Try a little more — “oily skin er jonno sunscreen” or “niacinamide koto taka”.",
  };
}

export function ChatAssistant() {
  const { lang, chatOpen, setChatOpen } = useStore();
  const intro = useMemo<Msg>(() => ({ role: "bot", text: tx("chatIntro", lang) }), [lang]);
  const [msgs, setMsgs] = useState<Msg[]>([intro]);
  const [text, setText] = useState("");

  return (
    <>
      <button className="chat-fab" onClick={() => setChatOpen(!chatOpen)} aria-label={tx("chatTitle", lang)}>
        {chatOpen ? <IconClose /> : <IconChat />}
      </button>
      {chatOpen && (
        <section className="chat-panel" aria-label={tx("chatTitle", lang)}>
          <div className="drawer-head">
            <div className="kicker">{tx("chatTitle", lang)}</div>
            <strong>English · বাংলা · Banglish</strong>
          </div>
          <div className="chat-log">
            {msgs.map((m, i) => (
              <div key={i} className={`bubble ${m.role}`}>
                {m.text}
                {m.href && (
                  <div>
                    <Link to={m.href} onClick={() => setChatOpen(false)}>
                      →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
          <form
            className="chat-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!text.trim()) return;
              const mine: Msg = { role: "me", text };
              setMsgs((prev) => [...prev, mine, reply(text, lang)]);
              setText("");
            }}
          >
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={tx("chatPlaceholder", lang)}
            />
            <button className="btn btn-ghost" type="submit">
              ↑
            </button>
          </form>
        </section>
      )}
    </>
  );
}
