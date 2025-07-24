"use client";
import { Button } from "@/components/ui/button";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";

interface UserPaginationProps {
 currentPage: number;
 totalPages: number;
 rowsPerPage: number;
 onPageChange: (page: number) => void;
 onRowsPerPageChange: (rows: number) => void;
}

export const UserPagination = ({
 currentPage,
 totalPages,
 rowsPerPage,
 onPageChange,
 onRowsPerPageChange,
}: UserPaginationProps) => {
 const renderPageButtons = () => {
  const pages = [];

  const startPage = Math.max(2, currentPage - 2);
  const endPage = Math.min(totalPages - 1, currentPage + 2);

  pages.push(
   <Button
    key={1}
    variant={currentPage === 1 ? "default" : "outline"}
    size="sm"
    onClick={() => onPageChange(1)}
   >
    1
   </Button>
  );

  if (startPage > 2) {
   pages.push(<span key="start-ellipsis" className="text-gray-400 px-1">...</span>);
  }

  for (let i = startPage; i <= endPage; i++) {
   pages.push(
    <Button
     key={i}
     variant={currentPage === i ? "default" : "outline"}
     size="sm"
     onClick={() => onPageChange(i)}
    >
     {i}
    </Button>
   );
  }

  if (endPage < totalPages - 1) {
   pages.push(<span key="end-ellipsis" className="text-gray-400 px-1">...</span>);
  }

  if (totalPages > 1) {
   pages.push(
    <Button
     key={totalPages}
     variant={currentPage === totalPages ? "default" : "outline"}
     size="sm"
     onClick={() => onPageChange(totalPages)}
    >
     {totalPages}
    </Button>
   );
  }

  return pages;
 };

 return (
  <div className="relative w-full mt-4 flex items-center">
   {/* Left: Show Rows */}
   <div className="flex items-center space-x-2 text-sm text-gray-600">
    <span>Show</span>
    <Select
     value={rowsPerPage.toString()}
     onValueChange={(value) => onRowsPerPageChange(Number(value))}
    >
     <SelectTrigger className="w-16">
      <SelectValue />
     </SelectTrigger>
     <SelectContent>
      <SelectItem value="10">10</SelectItem>
      <SelectItem value="25">25</SelectItem>
      <SelectItem value="50">50</SelectItem>
     </SelectContent>
    </Select>
    <span>Rows</span>
   </div>

   {/* Center: Pagination */}
   <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-1">
    <Button
     variant="outline"
     size="sm"
     onClick={() => onPageChange(currentPage - 1)}
     disabled={currentPage === 1}
    >
     ‹
    </Button>

    {renderPageButtons()}

    <Button
     variant="outline"
     size="sm"
     onClick={() => onPageChange(currentPage + 1)}
     disabled={currentPage === totalPages}
    >
     ›
    </Button>
   </div>
  </div>
 );
};
