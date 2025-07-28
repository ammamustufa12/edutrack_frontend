"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { User } from "@/types/user";
import { UserFilters } from "@/components/superAdmin/users-management/UserFilters";
import { UserTable } from "./UserTable";
import { UserPagination } from "./usersPagination";
import { fetchUsers } from "@/actions/users";

async function fetchCurrentUser() {
  const userId = localStorage.getItem("userId");
  if (!userId) throw new Error("No user ID found for current user");

  const res = await fetch(
    `https://edu-track-4h4z.onrender.com/api/v1/auth/me?id=${userId}`
  );
  if (!res.ok) throw new Error("Failed to fetch current user");

  const data = await res.json();
  if (!data.success) throw new Error(data.error || "Failed to fetch user");

  return data.user as User;
}

export default function UserManagement() {
  const {
    data: currentUser,
    isLoading: loadingUser,
    isError: userError,
    error: userFetchError,
  } = useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<User["role"] | "all">("all");
  const [statusFilter, setStatusFilter] = useState<
    "Active" | "Inactive" | "all"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (loadingUser) return <p>Loading current user...</p>;
  if (userError)
    return (
      <p>
        Error loading user info:{" "}
        {(userFetchError as Error)?.message || "Unknown error"}
      </p>
    );
  if (!currentUser) return <p>No current user info found.</p>;

  // Filtered Users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "Active" && user.is_active) ||
      (statusFilter === "Inactive" && !user.is_active);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto">
        <div className="flex items-center justify-between">
          <div className="mb-8">
            <h1
              style={{
                fontFamily: "General Sans, sans-serif",
                color: "#0D0D0D",
                fontSize: 27,
                fontWeight: 600,
              }}
              className="text-3xl font-bold text-gray-900"
            >
              User Management{" "}
              {roleFilter === "all"
                ? `(${currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)})`
                : `(${roleFilter.charAt(0).toUpperCase() + roleFilter.slice(1)})`}
            </h1>
            <p
              style={{
                fontFamily: "General Sans, sans-serif",
                color: "#64626C",
                fontSize: 12,
                fontWeight: 500,
              }}
              className="text-base text-gray-600 mt-2"
            >
              Efficiently Handle User Data, Roles And Permissions
            </p>
          </div>

          <UserFilters
            searchTerm={searchTerm}
            roleFilter={roleFilter}
            statusFilter={statusFilter}
            onSearchChange={setSearchTerm}
            onRoleFilterChange={setRoleFilter}
            onStatusFilterChange={setStatusFilter}
            onRefresh={refetch}
            loading={isLoading}
            currentUserRole={currentUser.role}
          />
        </div>

        <UserTable
          users={paginatedUsers}
          loading={isLoading}
          error={isError ? (error as Error).message : null}
          onRefresh={refetch}
        />

        {filteredUsers.length > 0 && (
          <UserPagination
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={setRowsPerPage}
          />
        )}
      </div>
    </div>
  );
}
