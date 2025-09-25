"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        router.push("/");
        return;
      }

      try {
        const res = await fetch("/api/auth", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
          document.cookie = "token=; path=/; max-age=0; SameSite=Strict";
          router.push("/");
        }
      } catch {
        localStorage.removeItem("token");
        document.cookie = "token=; path=/; max-age=0; SameSite=Strict";
        router.push("/");
      }
      setIsLoading(false);
    };
    checkAuth();
  }, [router]);

  return { isAuthenticated, isLoading };
}
