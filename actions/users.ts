import axiosInstance from "@/lib/api/axiosInstance";
import { User } from "@/types/user";

export const fetchUsers = async (): Promise<User[]> => {
 const response = await axiosInstance.get("/auth/all");
 return response.data;
};
