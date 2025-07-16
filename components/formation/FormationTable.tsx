"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, XCircle, Clock, GraduationCap, ChevronDown } from "lucide-react";
import { Formation, FormationTableProps } from "@/types/formation";
import { FormationActions } from "./FormationActions";

export const FormationTable = ({
  formation,
  loading,
  error,
  onEditFormation,
  onToggleStatus,
  onViewDetails,
}: FormationTableProps) => {
  if (loading) return <p className="p-4 text-center">Loading formations...</p>;
  if (error)
    return <p className="p-4 text-center text-red-600">Error: {error}</p>;

  return (
    <div className="overflow-x-auto rounded-2xl bg-gray-50">
      <Table className="min-w-full border-separate border-spacing-y-4">
        <TableHeader>
          <TableRow className="bg-gray-50">
            {["ID", "Name", "From Date", "End Date", "Level", "Actions"].map(
              (title, i) => (
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
              )
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {formation.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500 py-10">
                No formations found.
              </TableCell>
            </TableRow>
          ) : (
            formation.map((item) => (
              <FormationTableRow
                key={item.id}
                formation={item}
                onEdit={onEditFormation}
                onToggleStatus={onToggleStatus}
                onViewDetails={onViewDetails}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const FormationTableRow = ({
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
    <TableRow className="bg-white rounded-xl shadow border border-gray-200 px-4 py-5 ">
      <TableCell className="px-6 py-6 font-medium">{formation.id}</TableCell>
      <TableCell className="px-6 py-6 font-medium">{formation.formation_name}</TableCell>
      <TableCell className="px-6 py-6 font-medium">{formation.from_date}</TableCell>
      <TableCell className="px-6 py-6 font-medium">{formation.end_date}</TableCell>
      <TableCell className="px-6 py-6 font-medium capitalize">{formation.level}</TableCell>
      <TableCell className="px-6 py-6 text-center">
        <FormationActions
          formation={formation}
          onEdit={onEdit}
          onToggleStatus={onToggleStatus}
          onViewDetails={onViewDetails}
        />
      </TableCell>
    </TableRow>
  );
};
