"use client";

import { Plus, Download,Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StudentFilters } from "@/components/students/StudentFilters";
import { StudentTable } from "@/components/students/StudentTable";
import { StudentPagination } from "@/components/students/StudentPagination";
import { Student, StudentStatus } from "@/types/student";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchStudents } from "@/actions/student";

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<StudentStatus | "All">("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch students with React Query
  const {
    data: students = [],
    isLoading,
    error,
  } = useQuery<Student[], Error>({
    queryKey: ["students"],
    queryFn: fetchStudents,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Filter students by search term and status
  const filteredStudents = students.filter((student) => {
    const lowerSearch = searchTerm.toLowerCase();

    // Check if any of these fields contain the search term
    const matchesSearch =
      student.firstname.toLowerCase().includes(lowerSearch) ||
      student.lastname.toLowerCase().includes(lowerSearch) ||
      student.emroll.toLowerCase().includes(lowerSearch) ||
      (student.level && student.level.toLowerCase().includes(lowerSearch)) ||
      (student.parent1 && student.parent1.toLowerCase().includes(lowerSearch)) ||
      (student.parent2 && student.parent2.toLowerCase().includes(lowerSearch));

    const matchesStatus = selectedStatus === "All" || student.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  const handleEditStudent = (student: Student) => {
    console.log("Edit student:", student);
    // Implement edit logic
  };

  const handleToggleStatus = (student: Student) => {
    console.log("Toggle status for student:", student);
    // Implement status toggle logic
  };

  const handleViewDetails = (student: Student) => {
    console.log("View details for student:", student);
    // Implement view details logic
  };

  const handleAddStudent = () => {
    console.log("Add new student");
    // Implement add student logic
  };

  const handleExport = () => {
    console.log("Export students");
    // Implement export logic
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 px-4 py-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 style={{ fontFamily: "General Sans, sans-serif",color:'#0D0D0D',fontSize:30,fontWeight:600 }} className="text-2xl font-bold text-gray-900">Student Management</h2>
                <p style={{ fontFamily: "General Sans, sans-serif",color:'#64626C',fontSize:12,fontWeight:500 }} className="text-gray-600 mt-1">
                  Add, Edit, View, and Manage Student Records with Ease
                </p>
              </div>
               <div className="flex items-center  mb-6">
              {/* Search Box */}
              <div className="relative w-full max-w-md mt-5">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  style={{
          fontFamily: "'General Sans', sans-serif",
          fontSize: 15,
          fontWeight: 300,
          color: '#000000',
        }}
                  type="text"
                  placeholder="Search by name or level..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>

              {/* Add Button */}
              <Button
                style={{
        fontFamily: "'General Sans', sans-serif",
        fontSize: 14,
        fontWeight: 400,
      }}
                className="mt-5 ml-4 bg-black text-white hover:bg-gray-800 flex items-center gap-2 whitespace-nowrap"
                onClick={() => {
                  console.log("Add Formation clicked");
                }}
              >
                <Plus className="h-4 w-4" />
                Add New Student
              </Button>
            </div>
            </div>
           

            <StudentTable
              students={currentStudents}
              loading={isLoading}
              error={error?.message || ""}
              onEditStudent={handleEditStudent}
              onToggleStatus={handleToggleStatus}
              onViewDetails={handleViewDetails}
            />

            {filteredStudents.length > 0 && (
              <StudentPagination
                currentPage={currentPage}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                onPageChange={setCurrentPage}
                onRowsPerPageChange={setRowsPerPage}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
