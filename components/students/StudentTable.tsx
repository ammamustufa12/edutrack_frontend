"use client";

import { CheckCircle, XCircle, Clock, GraduationCap, ChevronDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Student } from "@/types/student";
import { StudentActions } from "./StudentActions";

export const StudentTable = ({
  students,
  loading,
  error,
  onEditStudent,
  onToggleStatus,
  onViewDetails,
}: {
  students: Student[];
  loading: boolean;
  error: string | null;
  onEditStudent: (student: Student) => void;
  onToggleStatus: (student: Student) => void;
  onViewDetails: (student: Student) => void;
}) => {
  if (loading) return <p>Loading students...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
   <div className="overflow-x-auto rounded-2xl bg-gray-50">
       <Table className="min-w-full border-separate border-spacing-y-4">
         <TableHeader>
           <TableRow className="bg-gray-50">
             {["ID", "FirstName", "LastNja", "End Date", "Level", "Actions"].map(
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
          {students.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-gray-500 py-10">
                No students found matching your criteria.
              </TableCell>
            </TableRow>
          ) : (
            students.map((student) => (
              <StudentTableRow
                key={student.id}
                student={student}
                onEdit={onEditStudent}
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

const StudentTableRow = ({
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
  <TableRow className="bg-white rounded-xl shadow border border-gray-200 px-4 py-5 ">
      <TableCell className="px-6 py-6 font-medium">{student.firstname}</TableCell>
      <TableCell className="px-6 py-6 font-medium">{student.lastname}</TableCell>
      <TableCell className="px-6 py-6 text-gray-600">{student.birthdate}</TableCell>
      <TableCell className="px-6 py-6 text-gray-600">{student.level}</TableCell>
      <TableCell className="px-6 py-6 text-gray-600">{student.parent1}</TableCell>
      <TableCell className="px-6 py-6 text-gray-600">{student.parent2 || "-"}</TableCell>
   
      <TableCell>
        <StudentActions
          student={student}
          onEdit={onEdit}
          onToggleStatus={onToggleStatus}
          onViewDetails={onViewDetails}
        />
      </TableCell>
    </TableRow>
  );
};

const StatusBadge = ({
  status,
  enrollmentStatus,
}: {
  status: Student["status"];
  enrollmentStatus: Student["enrollmentStatus"];
}) => {
  const statusMap = {
    Active: {
      color: "bg-green-100 text-green-800",
      icon: <CheckCircle className="h-4 w-4" />,
    },
    Inactive: {
      color: "bg-red-100 text-red-800",
      icon: <XCircle className="h-4 w-4" />,
    },
    Pending: {
      color: "bg-yellow-100 text-yellow-800",
      icon: null,
    },
    Graduated: {
      color: "bg-purple-100 text-purple-800",
      icon: <GraduationCap className="h-4 w-4" />,
    },
  };

  return (
    <div className="flex flex-col gap-1">
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
          statusMap?.[status]?.color
        }`}
      >
        {statusMap?.[status]?.icon}
        {status}
      </span>
      {enrollmentStatus !== "Enrolled" && (
        <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {enrollmentStatus}
        </span>
      )}
    </div>
  );
};
