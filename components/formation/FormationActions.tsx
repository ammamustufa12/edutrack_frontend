"use client";
import { FileText, Edit, GraduationCap, UserX, UserCheck, Trash2  } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Formation } from "@/types/formation";

export const FormationActions = ({
 formation,
 onEdit,
 onToggleStatus,
 onViewDetails,
}: {
 formation: Formation;
 onEdit: (formation: Formation) => void;
 onToggleStatus: (formation: Formation) => void;
 onViewDetails: (formation: Formation) => void;
}) => {
 return (
 <div className="flex items-center space-x-2">
  {/* Edit Button */}
  <button
    onClick={() => onViewDetails(formation)}
    className="h-10 w-10 flex items-center justify-center rounded-full border border-yellow-100 bg-yellow-50 hover:bg-yellow-100 transition"
  >
    <Edit className="h-5 w-5 text-yellow-500" />
  </button>

  {/* Delete Button */}
  <button
    onClick={() => onEdit(formation)}
    className="h-10 w-10 flex items-center justify-center rounded-full border border-red-100 bg-red-50 hover:bg-red-100 transition"
  >
    <Trash2 className="h-5 w-5 text-red-600" />
  </button>
</div>
 );
};
