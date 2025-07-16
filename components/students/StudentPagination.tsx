"use client";
import { Button } from "@/components/ui/button";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";

export const StudentPagination = ({
 currentPage,
 totalPages,
 rowsPerPage,
 onPageChange,
 onRowsPerPageChange,
}: {
 currentPage: number;
 totalPages: number;
 rowsPerPage: number;
 onPageChange: (page: number) => void;
 onRowsPerPageChange: (rows: number) => void;
}) => {
 return (
  <div className="flex items-center justify-between">
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
    <span>students per page</span>
   </div>

   <div className="flex items-center space-x-2">
    <Button
     variant="outline"
     size="sm"
     onClick={() => onPageChange(Math.max(1, currentPage - 1))}
     disabled={currentPage === 1}
    >
     Previous
    </Button>

    {[...Array(Math.min(5, totalPages))].map((_, i) => {
     const pageNum = i + 1;
     return (
      <Button
       key={pageNum}
       variant={currentPage === pageNum ? "default" : "outline"}
       size="sm"
       onClick={() => onPageChange(pageNum)}
       className={
        currentPage === pageNum ? "bg-green-600 hover:bg-green-700" : ""
       }
      >
       {pageNum}
      </Button>
     );
    })}

    {totalPages > 5 && (
     <>
      <span className="text-gray-400">...</span>
      <Button
       variant="outline"
       size="sm"
       onClick={() => onPageChange(totalPages)}
      >
       {totalPages}
      </Button>
     </>
    )}

    <Button
     variant="outline"
     size="sm"
     onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
     disabled={currentPage === totalPages}
    >
     Next
    </Button>
   </div>
  </div>
 );
};
