// types/user.ts
export type UserRole = "Super Admin" | "Admin" | "Viewer";
export type UserStatus = "Active" | "Inactive";

export interface User {
 id: number;
 name: string;
 email: string;
 role: UserRole;
 is_active: boolean;
 avatar?: string;
}

export interface UserTableProps {
 users: User[];
 loading: boolean;
 error: string | null;
 currentPage: number;
 rowsPerPage: number;
 onPageChange: (page: number) => void;
 onRowsPerPageChange: (rows: number) => void;
 onEditUser: (user: User) => void;
 onToggleStatus: (user: User) => void;
 onResetPassword: (user: User) => void;
}

export interface UserFiltersProps {
 searchTerm: string;
 selectedRole: UserRole;
 onSearchChange: (term: string) => void;
 onRoleChange: (role: UserRole) => void;
}
