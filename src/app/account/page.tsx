"use client";

import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LangContext";

export default function AccountPage() {
  const { user, setAccountOpen } = useAuth();
  const { t } = useLang();
  return (
    <div className="container-page py-12">
      <div className="kicker">{t("account")}</div>
      <h1 className="font-display text-5xl mt-2">{user ? user.name : t("helloGuest")}</h1>
      {user ? (
        <p className="mt-4">{t("glowPoints")}: {user.glowPoints}</p>
      ) : (
        <button type="button" className="btn-primary mt-6" onClick={() => setAccountOpen(true)}>
          {t("enter")}
        </button>
      )}
    </div>
  );
}
