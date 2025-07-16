"use client";
import { FileText, Edit, GraduationCap, UserX, UserCheck, Trash2  } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Student } from "@/types/student";

export const StudentActions = ({
 student,
 onEdit,
 onToggleStatus,
 onViewDetails,
}: {
 student: Student;
 onEdit: (student: Student) => void;
 onToggleStatus: (student: Student) => void;
 onViewDetails: (student: Student) => void;
}) => {
 return (
<div className="flex items-center space-x-3">
  {/* Edit Button - Yellow with light background */}
  <button
    onClick={() => onEdit(student)}
    className="h-10 w-10 flex items-center justify-center rounded-full bg-yellow-50 hover:bg-yellow-100 transition"
  >
    <Edit className="h-5 w-5 text-yellow-500" />
  </button>

  {/* Delete Button - Red with light background */}
  <button
    onClick={() => onViewDetails(student)}
    className="h-10 w-10 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 transition"
  >
    <Trash2 className="h-5 w-5 text-red-600" />
  </button>
</div>
 );
};
