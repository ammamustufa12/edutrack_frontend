"use client";

import { useState } from "react";
import Image from "next/image";
import { Users, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditUserDialog from "@/components/superAdmin/users-management/EditUserDialog";
import ResetPasswordDialog from "@/components/superAdmin/users-management/ResetPasswordDialog";
import ViewUserDialog from "@/components/superAdmin/users-management/ViewUserDialog";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

interface Viewer {
  id: number;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
}

interface UserActionsProps {
  user: User;
  onSuccess: () => void;
}

// Fetch logged-in user details for role check
const fetchViewer = async (): Promise<Viewer | null> => {
  const userId = localStorage.getItem("userId");
  if (!userId) return null;

  const res = await fetch(
    `https://edu-track-4h4z.onrender.com/api/v1/auth/me?id=${userId}`
  );

  if (!res.ok) throw new Error("Failed to fetch viewer");
  const data = await res.json();
  return data?.success && data?.user ? data.user : null;
};

export const UserActions = ({ user, onSuccess }: UserActionsProps) => {
  const [currentUser, setCurrentUser] = useState<User>(user);
  const [editOpen, setEditOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);

  const {
    data: viewer,
    isLoading: loadingViewer,
    isError,
  } = useQuery<Viewer | null>({
    queryKey: ["viewer"],
    queryFn: fetchViewer,
  });

  const handleToggleStatus = async () => {
    const newStatus = !currentUser.is_active;
    try {
      const res = await fetch(
        `https://edu-track-4h4z.onrender.com/api/v1/auth/toggle-status/${currentUser.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ is_active: newStatus }),
        }
      );
      if (!res.ok) throw new Error("Failed to toggle status");

      const data = await res.json();
      if (data.user) {
        setCurrentUser(data.user);
        onSuccess();
      }
    } catch (error) {
      console.error("Toggle status failed:", error);
    }
  };

  if (loadingViewer) return null;
  if (!viewer || isError) return null;

  const role = viewer.role; // SuperAdmin | Admin | User

  return (
    <>
      {/* SuperAdmin Actions */}
      {role === "SuperAdmin" && (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center justify-center py-2 w-[120px] h-14 text-[10px] text-blue-500 bg-blue-50 hover:text-blue-800 hover:bg-blue-100"
            onClick={() => setResetOpen(true)}
          >
            <Image
              src="/images/icon/lock.png"
              alt="Reset Password Icon"
              width={12}
              height={12}
              className="mb-1"
            />
            Reset Password
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center justify-center w-[120px] h-14 text-[10px] text-yellow-500 bg-yellow-50 hover:text-yellow-800 hover:bg-yellow-100"
            onClick={() => setEditOpen(true)}
          >
            <Image
              src="/images/icon/Edit.png"
              alt="Edit Icon"
              width={12}
              height={12}
              className="mb-1"
            />
            Edit
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center justify-center w-[120px] h-14 text-[10px] ${
              currentUser.is_active
                ? "text-red-500 bg-red-50 hover:text-red-800 hover:bg-red-100"
                : "text-green-500 bg-green-50 hover:text-green-800 hover:bg-green-100"
            }`}
            onClick={handleToggleStatus}
          >
            <Users className="h-4 w-4 mb-1" />
            {currentUser.is_active ? "Deactivate" : "Activate"}
          </Button>
        </div>
      )}

      {/* Admin Actions */}
      {role === "Admin" && (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center justify-center w-[120px] h-14 text-[10px] text-purple-500 bg-purple-50 hover:text-purple-800 hover:bg-purple-100"
            onClick={() => setViewOpen(true)}
          >
            <Eye className="h-4 w-4 mb-1" />
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center justify-center w-[120px] h-14 text-[10px] ${
              currentUser.is_active
                ? "text-red-500 bg-red-50 hover:text-red-800 hover:bg-red-100"
                : "text-green-500 bg-green-50 hover:text-green-800 hover:bg-green-100"
            }`}
            onClick={handleToggleStatus}
          >
            <Users className="h-4 w-4 mb-1" />
            {currentUser.is_active ? "Deactivate" : "Activate"}
          </Button>

          {/* ViewUserDialog popup */}
          <ViewUserDialog
            userId={currentUser.id}
            open={viewOpen}
            onClose={() => setViewOpen(false)}
          />
        </div>
      )}

      {/* Dialogs only for SuperAdmin */}
      {role === "SuperAdmin" && (
        <>
          <EditUserDialog
            user={currentUser}
            open={editOpen}
            onClose={() => setEditOpen(false)}
            onSuccess={() => {
              setEditOpen(false);
              onSuccess();
            }}
          />
          <ResetPasswordDialog
            user={currentUser}
            open={resetOpen}
            onClose={() => setResetOpen(false)}
            onSuccess={() => {
              setResetOpen(false);
              onSuccess();
            }}
          />
        </>
      )}
    </>
  );
};
