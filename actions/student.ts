import { Student } from "@/types/student";

export const fetchStudents = async (): Promise<Student[]> => {
  const res = await fetch("https://edu-track-4h4z.onrender.com/api/v1/students/");
  if (!res.ok) throw new Error(`Failed to fetch students: ${res.statusText}`);

  const data = await res.json();
  if (!data.success) throw new Error("API returned unsuccessful response");

  return data.students;
};
