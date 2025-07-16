"use client";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StudentStatus } from "@/types/student";

export const StudentFilters = ({
 searchTerm,
 selectedStatus,
 onSearchChange,
 onStatusChange,
}: {
 searchTerm: string;
 selectedStatus: StudentStatus | "All";
 onSearchChange: (term: string) => void;
 onStatusChange: (status: StudentStatus | "All") => void;
}) => {
 return (
  <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
   {/* <div className="flex items-center space-x-4">
    <div className="relative">
     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
     <Input
      placeholder="Search by name or email..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="pl-10 w-64 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
     />
    </div>
    <Button variant="outline" size="sm" className="space-x-2">
     <Filter className="h-4 w-4" />
     <span>Advanced</span>
    </Button>
   </div>

   <div className="flex items-center space-x-4">
    {(["All", "Active", "Inactive", "Pending", "Graduated"] as const).map(
     (status) => (
      <div key={status} className="flex items-center space-x-2">
       <input
        type="radio"
        id={`status-${status}`}
        name="status"
        checked={selectedStatus === status}
        onChange={() => onStatusChange(status)}
        className="text-blue-600"
       />
       <label htmlFor={`status-${status}`} className="text-sm text-gray-700">
        {status}
       </label>
      </div>
     )
    )}
   </div> */}
  </div>
 );
};
