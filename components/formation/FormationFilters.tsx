"use client";

import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormationStatus } from "@/types/formation";
import { useState } from "react";

interface FormationFiltersProps {
  searchTerm: string;
  selectedStatus: FormationStatus | "All";
  onSearchChange: (term: string) => void;
  onStatusChange: (status: FormationStatus | "All") => void;
}

export const FormationFilters = ({
  searchTerm,
  selectedStatus,
  onSearchChange,
  onStatusChange,
}: FormationFiltersProps) => {
  // Optional local state to toggle "Advanced" filter — here just a stub for UI
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="flex items-center justify-between  p-4 rounded-lg border border-gray-200 shadow-sm">
      {/* Left side: Search + Advanced button */}

      {/* Right side: Status radio buttons */}
      
    </div>
  );
};
