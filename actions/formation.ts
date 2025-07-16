import { Formation } from "@/types/formation";

export const fetchFormations = async (): Promise<Formation[]> => {
  const res = await fetch("https://edu-track-4h4z.onrender.com/api/v1/formations/");
  if (!res.ok) throw new Error(`Failed to fetch formations: ${res.statusText}`);

  const data = await res.json();
  if (!data.success) throw new Error("API returned unsuccessful response");

  return data.formations;
};
