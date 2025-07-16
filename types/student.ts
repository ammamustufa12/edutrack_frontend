// types/student.ts

export type StudentStatus = "Active" | "Inactive" | "Pending" | "Graduated";
export type StudentEnrollmentStatus = "Enrolled" | "Waitlisted" | "Dropped";

export interface Student {
  id: number;
  firstname: string;
  lastname: string;
  emroll: string;                // Enrollment number
  birthdate: string;            // e.g. "2006-05-20"
  level: string;                // e.g. "Grade 6"
  parent1: string;
  parent2: string;
  enrollmentDate: string;       // e.g. "2022-09-01"
  status: StudentStatus;
  enrollmentStatus: StudentEnrollmentStatus;
  avatar?: string;
}

// Props for table component
export interface StudentTableProps {
  students: Student[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  onEditStudent: (student: Student) => void;
  onToggleStatus: (student: Student) => void;
  onViewDetails: (student: Student) => void;
}

// Props for filter component
export interface StudentFiltersProps {
  searchTerm: string;
  selectedStatus: StudentStatus | "All";
  onSearchChange: (term: string) => void;
  onStatusChange: (status: StudentStatus | "All") => void;
}
