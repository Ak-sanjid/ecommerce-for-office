"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "@/types";

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (name: string, extra?: { email?: string; phone?: string }) => Promise<void>;
  logout: () => void;
  accountOpen: boolean;
  setAccountOpen: (v: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("glow-user");
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const login = async (name: string, extra?: { email?: string; phone?: string }) => {
    let next: User = { name, email: extra?.email, phone: extra?.phone, glowPoints: 0 };
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: extra?.email, phone: extra?.phone }),
      });
      const j = (await res.json()) as { ok: boolean; user?: { id: string; glowPoints: number } };
      if (j.ok && j.user) next = { ...next, id: j.user.id, glowPoints: j.user.glowPoints };
    } catch {
      /* offline demo */
    }
    setUser(next);
    localStorage.setItem("glow-user", JSON.stringify(next));
    setAccountOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("glow-user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout, accountOpen, setAccountOpen }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
