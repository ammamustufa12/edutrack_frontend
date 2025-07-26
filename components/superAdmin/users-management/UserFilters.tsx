"use client";

import { useState, useRef, useEffect } from "react";
import { Search, SlidersHorizontal, RefreshCw } from "lucide-react";
import { UserRole } from "@/types/user";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import CreateUserDialog from "@/components/superAdmin/users-management/CreateUserDialog";

interface UserFiltersProps {
  searchTerm: string;
  roleFilter: UserRole | "all";
  statusFilter: "all" | "Active" | "Inactive";
  onSearchChange: (term: string) => void;
  onRoleFilterChange: (role: UserRole | "all") => void;
  onStatusFilterChange: (status: "all" | "Active" | "Inactive") => void;
  loading?: boolean;
  onExportCSV?: () => void;
  onRefresh?: () => void; // New refresh handler
  currentUserRole?: UserRole; // <-- Add this
}

export const UserFilters = ({
  searchTerm,
  roleFilter,
  statusFilter,
  onSearchChange,
  onRoleFilterChange,
  onStatusFilterChange,
  loading = false,
  onRefresh,
  onExportCSV,
}: UserFiltersProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewerRole, setViewerRole] = useState<UserRole | null>(null);
  const [loadingViewer, setLoadingViewer] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const roles: { value: UserRole | "all"; label: string }[] = [
    { value: "all", label: "All" },
    { value: "SuperAdmin", label: "Super Admin" },
    { value: "Admin", label: "Admin" },
    { value: "Viewer", label: "Viewer" },
  ];

  const statusOptions = ["all", "Active", "Inactive"] as const;

  // Fetch the logged-in user's role
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setLoadingViewer(false);
      return;
    }

    fetch(`https://edu-track-4h4z.onrender.com/api/v1/auth/me?id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data?.user) setViewerRole(data.user.role);
      })
      .catch((err) => console.error("Error fetching viewer:", err))
      .finally(() => setLoadingViewer(false));
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRoleSelect = (role: UserRole | "all") => {
    onRoleFilterChange(role);
    setIsDropdownOpen(false);
  };

  if (loadingViewer) return null; // Wait until role is fetched

  return (
    <div className="flex items-center gap-3">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name ..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            disabled={loading}
            className={cn(
              "w-full pl-10 pr-12 py-2.5 text-sm",
              "border border-gray-200 rounded-lg",
              "bg-white text-gray-900",
              "placeholder:text-gray-400",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          />

          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            disabled={loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Filters Dropdown */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50"
          >
            <p className="text-xs font-semibold px-4 text-gray-500">Filter by Role</p>
            {roles.map((role) => (
              <button
                key={role.value}
                onClick={() => handleRoleSelect(role.value)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50"
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                    roleFilter === role.value ? "border-blue-600" : "border-gray-300"
                  )}
                >
                  {roleFilter === role.value && (
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <span
                  className={
                    roleFilter === role.value
                      ? "text-gray-900 font-medium"
                      : "text-gray-700"
                  }
                >
                  {role.label}
                </span>
              </button>
            ))}

            <div className="border-t my-2" />

            <p className="text-xs font-semibold px-4 text-gray-500">
              Filter by Status
            </p>
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => onStatusFilterChange(status)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50"
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                    statusFilter === status ? "border-blue-600" : "border-gray-300"
                  )}
                >
                  {statusFilter === status && (
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <span
                  className={
                    statusFilter === status
                      ? "text-gray-900 font-medium"
                      : "text-gray-700"
                  }
                >
                  {status}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Buttons: Only for SuperAdmin */}
      {viewerRole === "SuperAdmin" && (
        <div className="flex items-center gap-2 ml-auto">
          {onRefresh && (
            <Button
              onClick={onRefresh}
              disabled={loading}
              variant="outline"
              className="flex items-center gap-2 rounded-lg"
            >
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
          )}

          {onExportCSV && (
            <Button
              onClick={onExportCSV}
              disabled={loading}
              className="bg-[#93DA96] hover:bg-green-600 text-white rounded-lg font-medium"
            >
              Export CSV
            </Button>
          )}

          <CreateUserDialog
            className="bg-black hover:bg-gray-800 text-white rounded-lg font-medium flex items-center gap-2 text-sm px-4 py-2"
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
        </div>
      )}
    </div>
  );
};
