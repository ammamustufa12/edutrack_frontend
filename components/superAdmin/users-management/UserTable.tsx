"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, XCircle, ChevronDown } from "lucide-react";
import { User } from "@/types/user";
import { UserActions } from "./UserActions";

export const UserTable = ({
  users,
  loading,
  error,
  onEdit,
  onToggleStatus,
  onResetPassword,
}: {
  users: User[];
  loading: boolean;
  error: string | null;
  onEdit: (user: User) => void;
  onToggleStatus: (user: User) => Promise<User>; // ✅ Must return updated user
  onResetPassword: (user: User) => void;
}) => {
  if (loading) return <p className="p-4 text-center">Loading users...</p>;
  if (error)
    return <p className="p-4 text-center text-red-600">Error: {error}</p>;

  return (
    <div className="overflow-x-auto rounded-2xl bg-gray-50 ">
      <Table className="min-w-full border-separate border-spacing-y-4">
        <TableHeader>
          <TableRow className="bg-gray-50">
            {["Name", "Email", "Role", "Status", "Actions"].map((title, i) => (
              <TableHead
                key={i}
                className={`px-4 py-3 text-sm text-gray-700 font-medium ${
                  title === "Actions" ? "text-center" : ""
                }`}
              >
                <div
                  className={`flex items-center gap-1 ${
                    title === "Actions" ? "justify-center" : ""
                  }`}
                >
                  {title}
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500 py-10">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <UserTableRow
                key={user.id}
                user={user}
                onEdit={onEdit}
                onToggleStatus={onToggleStatus}
                onResetPassword={onResetPassword}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const UserTableRow = ({
  user,
  onEdit,
  onToggleStatus,
  onResetPassword,
}: {
  user: User;
  onEdit: (user: User) => void;
  onToggleStatus: (user: User) => Promise<User>;
  onResetPassword: (user: User) => void;
}) => {
  return (
    <TableRow className="bg-white rounded-xl shadow border border-gray-200">
      <TableCell className="px-4 py-3 font-medium">{user.name}</TableCell>
      <TableCell className="px-4 py-3 text-gray-600">{user.email}</TableCell>
      <TableCell className="px-4 py-3 capitalize">{user.role}</TableCell>
      <TableCell className="px-4 py-3">
        <StatusBadge status={user.is_active} />
      </TableCell>
      <TableCell className="px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          {/* <UserActions
            user={user}
            onEdit={onEdit}
            onToggleStatus={onToggleStatus}
            onSuccess={() => {}}
          /> */}
          <UserActions
  user={user}
  // onEdit={onEdit}
  // onToggleStatus={onToggleStatus}
  onSuccess={() => {}}
/>
        </div>
      </TableCell>
    </TableRow>
  );
};

const StatusBadge = ({ status }: { status: boolean }) => {
  return (
    <div className="flex items-center gap-2">
      {status ? (
        <>
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span className="text-green-600">Active</span>
        </>
      ) : (
        <>
          <XCircle className="h-4 w-4 text-red-500" />
          <span className="text-red-600">Inactive</span>
        </>
      )}
    </div>
  );
};
