// src/hooks/useViewer.ts
"use client";

import { useEffect, useState } from "react";

export interface Viewer {
  id: number;
  name: string;
  email: string;
  role: "SuperAdmin" | "Admin" | "User";
  is_active: boolean;
}

export const useViewer = () => {
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

    if (!userId) {
      setLoading(false);
      return;
    }

    // (Optional) instant role from localStorage to avoid flash
    const cachedRole = localStorage.getItem("role");
    if (cachedRole) {
      setViewer((v) =>
        v
          ? { ...v, role: cachedRole as Viewer["role"] }
          : ({
              id: 0,
              name: "",
              email: "",
              role: cachedRole as Viewer["role"],
              is_active: true,
            } as Viewer)
      );
    }

    fetch(`https://edu-track-4h4z.onrender.com/api/v1/auth/me?id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data?.user) {
          setViewer(data.user);
          // keep role cached for next renders
          localStorage.setItem("role", data.user.role);
        }
      })
      .catch((err) => console.error("Error fetching viewer:", err))
      .finally(() => setLoading(false));
  }, []);

  return { viewer, loading };
};
