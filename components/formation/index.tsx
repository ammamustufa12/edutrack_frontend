"use client";

import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormationTable } from "@/components/formation/FormationTable";
import { FormationPagination } from "@/components/formation/FormationPagination";
import { Formation, FormationStatus } from "@/types/formation";
import CreateFormationDialog from "@/components/formation/CreateFormationDialog";
export default function FormationsPage() {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<FormationStatus | "All">("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);



  
  useEffect(() => {
    const fetchFormations = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://edu-track-4h4z.onrender.com/api/v1/formations");
        if (!res.ok) throw new Error(`Error fetching formations: ${res.statusText}`);
        const json = await res.json();
        console.log("API response:", json);

        if (json.success && Array.isArray(json.formations)) {
          setFormations(json.formations);
        } else if (Array.isArray(json)) {
          setFormations(json);
        } else {
          throw new Error("Invalid data format received from API");
        }
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchFormations();
  }, []);

  const filteredFormations = formations.filter((formation) => {
    const matchesSearch = formation.formation_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All" || formation.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredFormations.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentFormations = filteredFormations.slice(startIndex, endIndex);

  const handleEditFormation = (formation: Formation) => {
    console.log("Edit formation:", formation);
    // TODO: Open modal or navigate to edit page
  };

  const handleToggleStatus = (formation: Formation) => {
    console.log("Toggle status:", formation);
    // TODO: Implement status toggle logic
  };

  const handleViewDetails = (formation: Formation) => {
    console.log("View details:", formation);
    // TODO: Open details modal or navigate to detail page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 px-4 py-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 style={{ fontFamily: "General Sans, sans-serif",color:'#0D0D0D',fontSize:30,fontWeight:600 }} className="text-2xl font-bold text-gray-900">Formations</h2>
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
                Create New Formation
              </Button>
            </div>
            </div>

            {/* Search + Button */}
           

            {/* Table */}
            <FormationTable
              formation={currentFormations}
              loading={loading}
              error={error}
              currentPage={currentPage}
              rowsPerPage={rowsPerPage}
              onPageChange={setCurrentPage}
              onRowsPerPageChange={setRowsPerPage}
              onEditFormation={handleEditFormation}
              onToggleStatus={handleToggleStatus}
              onViewDetails={handleViewDetails}
            />

            {/* Pagination */}
            {filteredFormations.length > 0 && (
              <FormationPagination
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
