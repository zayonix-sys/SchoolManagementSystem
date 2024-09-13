"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { deleteSection, fetchSection, SectionData } from "@/services/SectionService";
import EditSection from "./edit-section";
import { ClassData } from "@/services/ClassService";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import ConfirmationDialog from "../common/confirmation-dialog";

const SectionListTable = () => {
  const [sections, setSections] = useState<SectionData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sectionToDelete, setSectionToDelete] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const itemsPerPage = 10;

  
  useEffect(() => {
    const fetchSectionsData = async () => {
      setLoading(true);
      try {
        const response = await fetchSection();
        setSections(response.data as SectionData[]);
      } catch (err) {
        setError(err as any);
      } finally {
        setLoading(false);
      }
    };

    fetchSectionsData();
  }, []);

  // Apply search filter and pagination
  const filteredSections = sections.filter((section) =>
    section.sectionName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSections.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredSections.length / itemsPerPage);

  const handleSelectAll = () => {
    if (selectedRows.length === currentItems.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(
        currentItems.map((row) => row.classId!).filter((id) => id !== null && id !== undefined)
      );
    }
  };

  const handleRowSelect = (id: number) => {
    const updatedSelectedRows = [...selectedRows];
    if (selectedRows.includes(id)) {
      updatedSelectedRows.splice(selectedRows.indexOf(id), 1);
    } else {
      updatedSelectedRows.push(id);
    }
    setSelectedRows(updatedSelectedRows);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const handleDeleteConfirmation = (id: number) => {
    setSectionToDelete(id);
  };

  const handleCancelDelete = () => {
    setSectionToDelete(null);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSection(id);
      toast.success("Section deleted successfully");
      setSectionToDelete(null); // Close dialog after successful deletion
    } catch (error) {
      console.error("Error deleting Section:", error);
      toast.error("Failed to delete Section");
    }
  };

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <Input
          type="text"
          placeholder="Search by section name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <Table className="text-left">
        <TableHeader>
          <TableRow>
            <TableHead className="h-10 p-2.5">Section Name</TableHead>
            <TableHead className="h-10 p-2.5">Capacity</TableHead>
            <TableHead className="h-10 p-2.5">Status</TableHead>
            <TableHead className="h-10 p-2.5 text-end">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentItems.map((item) => (
            <TableRow
              key={item.sectionId}
              className="hover:bg-default-200"
              data-state={selectedRows.includes(item.sectionId!) && "selected"}
            >
              <TableCell className="p-2.5">{item.sectionName}</TableCell>
              <TableCell className="p-2.5">{item.capacity}</TableCell>
              <TableCell className="p-2.5">
                <Badge
                  variant="outline"
                  color={item.isActive ? "success" : "destructive"}
                  className="capitalize"
                >
                  {item.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>

              <TableCell className="p-2.5 flex justify-end">
                <div className="flex gap-3">
                  <EditSection sectionData={item} />
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7"
                    color="secondary"
                    onClick={() => handleDeleteConfirmation(item.sectionId!)}
                  >
                    <Icon icon="heroicons:trash" className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
      {sectionToDelete !== null && (
        <ConfirmationDialog
          onDelete={() => handleDelete(sectionToDelete)}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default SectionListTable;
