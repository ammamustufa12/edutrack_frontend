"use client";

import { useState } from "react";
import Image from "next/image";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import EditUserDialog from "@/components/superAdmin/users-management/EditUserDialog";
import ResetPasswordDialog from "@/components/superAdmin/users-management/ResetPasswordDialog";

interface UserActionsProps {
  user: User;
  onSuccess: () => void; // callback when user data changes (edit, toggle, reset)
}

export const UserActions = ({ user, onSuccess }: UserActionsProps) => {
  const [editOpen, setEditOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(user);

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

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to toggle status");
      }

      const data = await res.json();
      if (data.user) {
        setCurrentUser(data.user);
        onSuccess();
      }
    } catch (error) {
      console.error("Toggle status failed:", error);
    }
  };

  if (!currentUser) return <div>User not found</div>;

  return (
    <>
      <div className="flex space-x-2">
        {/* Reset Password Button */}
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

        {/* Edit Button */}
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

        {/* Toggle Status Button */}
        <Button
          variant="ghost"
          size="sm"
          className={`flex flex-col items-center justify-center w-[120px] h-12 text-[10px] ${
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

      {/* Edit User Dialog */}
      <EditUserDialog
        user={currentUser}
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSuccess={() => {
          setEditOpen(false);
          onSuccess();
        }}
      />

      {/* Reset Password Dialog */}
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
  );
};
