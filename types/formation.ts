// types/formation.ts

export type FormationStatus = "Active" | "Inactive" | "Pending" | "Graduated";
export type FormationEnrollmentStatus = "Enrolled" | "Waitlisted" | "Dropped";

export interface Formation {
  id: number;
  formation_name: string;
  from_date: string;
  end_date: string;
  level: string;
  status: FormationStatus;
  avatar?: string; // Optional if formation has a banner/icon
}

export interface FormationTableProps {
  formation: Formation[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  onEditFormation: (formation: Formation) => void;
  onToggleStatus: (formation: Formation) => void;
  onViewDetails: (formation: Formation) => void;
}

export interface FormationFiltersProps {
  searchTerm: string;
  selectedStatus: FormationStatus | "All";
  onSearchChange: (term: string) => void;
  onStatusChange: (status: FormationStatus | "All") => void;
}
