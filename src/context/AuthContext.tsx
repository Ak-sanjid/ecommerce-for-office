"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "@/types";

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (name: string, extra?: { email?: string; phone?: string }) => void;
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

  const login = (name: string, extra?: { email?: string; phone?: string }) => {
    const next: User = { name, email: extra?.email, phone: extra?.phone, glowPoints: 120 };
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
