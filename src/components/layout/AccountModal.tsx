import { useState } from "react";
import { useStore } from "../../store/Store";
import { tx } from "../../data/i18n";
import { IconClose } from "../icons";

export function AccountModal() {
  const { lang, accountOpen, setAccountOpen, login, user, logout } = useStore();
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!accountOpen) return null;

  const enter = (who: string, extra?: { phone?: string; email?: string }) => {
    login({ name: who, points: 120, phone: extra?.phone, email: extra?.email });
  };

  return (
    <>
      <button className="overlay" onClick={() => setAccountOpen(false)} aria-label={tx("close", lang)} />
      <div className="account-modal" role="dialog" aria-labelledby="acc-title">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="kicker">{tx("account", lang)}</div>
          <button className="icon-btn" onClick={() => setAccountOpen(false)}>
            <IconClose />
          </button>
        </div>
        {user ? (
          <>
            <h2 id="acc-title">{user.name}</h2>
            <p style={{ margin: "8px 0 16px" }}>
              {tx("glowPoints", lang)}: <strong>{user.points}</strong>
            </p>
            <button className="btn btn-ghost" onClick={logout}>
              {tx("logout", lang)}
            </button>
          </>
        ) : (
          <>
            <h2 id="acc-title">{tx("loginTitle", lang)}</h2>
            <p style={{ color: "var(--ink-soft)", marginTop: 8 }}>{tx("loginSub", lang)}</p>
            <div className="auth-stack">
              <button className="btn btn-ink" onClick={() => enter("Ayesha Rahman", { email: "ayesha@gmail.com" })}>
                {tx("continueGoogle", lang)}
              </button>
              <button className="btn btn-ghost" onClick={() => enter("Nusrat Karim")}>
                {tx("continueFb", lang)}
              </button>
            </div>
            <div className="field">
              <span>{tx("phone", lang)}</span>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="01XXXXXXXXX" />
            </div>
            {!otpSent ? (
              <button className="btn btn-gold" onClick={() => setOtpSent(true)} style={{ width: "100%" }}>
                {tx("sendOtp", lang)}
              </button>
            ) : (
              <>
                <div className="field">
                  <span>OTP</span>
                  <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="1234" />
                </div>
                <button
                  className="btn btn-gold"
                  style={{ width: "100%" }}
                  onClick={() => enter(phone || "Guest", { phone })}
                >
                  {tx("verify", lang)}
                </button>
              </>
            )}
            <div className="or">{tx("orManual", lang)}</div>
            <div className="field">
              <span>{tx("name", lang)}</span>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="field">
              <span>{tx("email", lang)}</span>
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button
              className="btn btn-ink"
              style={{ width: "100%" }}
              onClick={() => enter(name || "Guest", { email, phone })}
            >
              {tx("enter", lang)}
            </button>
          </>
        )}
      </div>
    </>
  );
}
