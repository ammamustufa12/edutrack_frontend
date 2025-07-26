"use client";
import { useEffect, useState } from "react";

export interface CurrentUser {
  id: number;
  name: string;
  email: string;
  role: "SuperAdmin" | "Admin" | "User";
  is_active: boolean;
}

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setLoading(false);
      return;
    }

    fetch(`https://edu-track-4h4z.onrender.com/api/v1/auth/me?id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data?.user) {
          setUser(data.user);
        }
      })
      .catch((err) => console.error("Error fetching current user:", err))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}
