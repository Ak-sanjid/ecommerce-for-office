"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { setAccountOpen } = useAuth();
  const router = useRouter();
  useEffect(() => {
    setAccountOpen(true);
    router.replace("/");
  }, [setAccountOpen, router]);
  return null;
}
