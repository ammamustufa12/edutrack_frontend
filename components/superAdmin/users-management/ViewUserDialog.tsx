"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

interface ViewUserDialogProps {
  userId: number;
  open: boolean;
  onClose: () => void;
}

const fetchUserById = async (userId: number): Promise<User> => {
  const res = await fetch(
    `https://edu-track-4h4z.onrender.com/api/v1/auth/me?id=${userId}`
  );
  if (!res.ok) throw new Error("Failed to fetch user");
  const data = await res.json();
  if (!data.success || !data.user) throw new Error("User not found");
  return data.user;
};

const ViewUserDialog = ({ userId, open, onClose }: ViewUserDialogProps) => {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery<User>({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId),
    enabled: open, // only fetch when dialog is open
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-6 rounded-2xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            👤 User Information
          </DialogTitle>
          <DialogClose />
        </DialogHeader>

        <div className="mt-4">
          {isLoading && <p className="text-sm text-gray-500">Loading user data...</p>}
          {isError && (
            <p className="text-sm text-red-500">Error: {(error as Error).message}</p>
          )}
          {!isLoading && user && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Name</p>
                  <p className="font-medium text-gray-800">{user.name}</p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium text-gray-800">{user.email}</p>
                </div>
                <div>
                  <p className="text-gray-500">Role</p>
                  <Badge variant="outline" className="capitalize">
                    {user.role}
                  </Badge>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <Badge
                    className={`capitalize ${
                      user.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewUserDialog;
