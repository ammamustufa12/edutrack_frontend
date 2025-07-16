"use client";

import { useState, useRef, useEffect } from "react";
import { Search, SlidersHorizontal, Plus } from "lucide-react";
import { UserRole } from "@/types/user";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import CreateUserDialog from "@/components/superAdmin/users-management/CreateUserDialog";

interface UserFiltersProps {
  searchTerm: string;
  roleFilter: UserRole | "all";
  onSearchChange: (term: string) => void;
  onRoleFilterChange: (role: UserRole | "all") => void;
  loading?: boolean;
  onExportCSV?: () => void;
}

export const UserFilters = ({
  searchTerm,
  roleFilter,
  onSearchChange,
  onRoleFilterChange,
  loading = false,
  onExportCSV,
}: UserFiltersProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // <-- modal state
  const dropdownRef = useRef<HTMLDivElement>(null);

  const roles: { value: UserRole | "all"; label: string }[] = [
    { value: "Super Admin", label: "Super Admin" },
    { value: "Admin", label: "Admin" },
    { value: "Viewer", label: "Viewer" },
  ];

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

  return (
    <div className="flex items-center gap-3">
      {/* Search Box */}
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

          {/* Filter Dropdown Button */}
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            disabled={loading}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2",
              "p-1 text-gray-400 hover:text-gray-600",
              "focus:outline-none",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Dropdown Filter Options */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className={cn(
              "absolute left-0 top-full mt-1 w-full",
              "bg-white border border-gray-200 rounded-lg shadow-lg",
              "py-2 z-50"
            )}
          >
            {roles.map((role) => (
              <button
                key={role.value}
                onClick={() => handleRoleSelect(role.value)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left",
                  "hover:bg-gray-50",
                  "focus:outline-none focus:bg-gray-50",
                  "transition-colors"
                )}
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
                  className={cn(
                    roleFilter === role.value ? "text-gray-900 font-medium" : "text-gray-700"
                  )}
                >
                  {role.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2 ml-auto">
        <Button
          onClick={onExportCSV}
          disabled={loading}
          className="bg-[#93DA96] hover:bg-green-600 text-white rounded-lg font-medium"
        >
          Export CSV
        </Button>

        {/* <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-black hover:bg-gray-800 text-white rounded-lg font-medium flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add User
        </Button> */}
  <CreateUserDialog
  className="bg-black hover:bg-gray-800 text-white rounded-lg font-medium flex items-center gap-2 text-sm px-4 py-2"
  open={isDialogOpen}
  onOpenChange={setIsDialogOpen}
/>
      </div>

      {/* Create User Modal */}
 
    </div>
  );
};
