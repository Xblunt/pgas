"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStores } from "@/hooks/useStores";

function decodeJwtPayload(token: string): any | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "===".slice((base64.length + 3) % 4);
    const json = atob(padded);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

const HomePage: React.FC = () => {
  const router = useRouter();
  const { authStore } = useStores();

  useEffect(() => {
    if (!authStore.isHydrated) return;

    const token = authStore.token;

    if (!token) {
      router.replace("/auth");
      return;
    }

    const payload = decodeJwtPayload(token);
    const isAdmin =
        payload?.IsAdmin === true ||
        payload?.is_admin === true ||
        payload?.isAdmin === true;

    router.replace(isAdmin ? "/admin/raiting" : "/user");
  }, [authStore.isHydrated, authStore.token, router]);

  return null;
};

export default HomePage;
