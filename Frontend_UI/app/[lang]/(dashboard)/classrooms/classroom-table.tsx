"use client";

import React, { useState,useEffect } from "react";
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
import { ClassroomData, deleteClassroom, fetchClassrooms } from "@/services/classroomService";
import { Input } from "@/components/ui/input";
import EditClassroom from "./edit-classroom";
import ConfirmationDialog from "../common/confirmation-dialog";
import { toast } from "sonner";

const ClassroomListTable = () => {
  const [classroom, setClassroom] = useState<ClassroomData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [classroomToDelete, setClassroomToDelete] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Function to fetch class data
  useEffect(() => {
    const fetchClassroomData = async () => {
      setLoading(true);
      try {
        const response = await fetchClassrooms(); // assuming fetchClasses is a function that fetches the data
        setClassroom(response.data as ClassroomData[]);
      } catch (err) {
        setError(err as any);
      } finally {
        setLoading(false);
      }
    };
  
    fetchClassroomData();
  }, []);
  
  const filteredClassrooms = classroom.filter((classroom) =>
    classroom.roomNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredClassrooms.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredClassrooms.length / itemsPerPage);

  const handleSelectAll = () => {
    if (selectedRows.length === currentItems.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(
        currentItems.map((row) => row.classroomId!).filter((id) => id !== null && id !== undefined)
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
    setClassroomToDelete(id);
  };

  const handleCancelDelete = () => {
    setClassroomToDelete(null);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteClassroom(id);
      toast.success("Classroom deleted successfully");
      setClassroomToDelete(null); // Close dialog after successful deletion
    } catch (error) {
      console.error("Error deleting Classroom:", error);
      toast.error("Failed to delete Classroom");
    }
  };


  


  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <Input
          type="text"
          placeholder="Search by Room Number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <Table className="text-left">
        <TableHeader>
          <TableRow>
            <TableHead className="h-10 p-2.5">Room Number</TableHead>
            <TableHead className="h-10 p-2.5">Building</TableHead>
            <TableHead className="h-10 p-2.5">Capacity</TableHead>
            <TableHead className="h-10 p-2.5">Status</TableHead>
            <TableHead className="h-10 p-2.5 text-end">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentItems.map((item) => (
            <TableRow
              key={item.classroomId}
              className="hover:bg-default-200"
              data-state={
                selectedRows.includes(item.classroomId!) && "selected"
              }
            >
              <TableCell className="p-2.5">{item.roomNumber}</TableCell>
              <TableCell className="p-2.5">{item.building}</TableCell>
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
                <EditClassroom classroomData={item}/>

                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7"
                    color="secondary"
                    onClick={() =>  handleDeleteConfirmation(item.classroomId!)}
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
      {classroomToDelete !== null && (
        <ConfirmationDialog
          onDelete={() => handleDelete(classroomToDelete)}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default ClassroomListTable;
