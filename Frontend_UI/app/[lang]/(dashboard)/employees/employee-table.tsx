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
import {
  deleteSection,
  fetchSection,
  SectionData,
} from "@/services/SectionService";
// import EditSection from "./edit-section";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { deleteEmployee, EmployeesData } from "@/services/EmployeeService";
import EditEmployee from "./edit-employee";

interface EmployeeListTableProps {
  employees: EmployeesData[];
}
const EmployeeListTable: React.FC<EmployeeListTableProps> = ({ employees }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 5;

  // Apply search filter and pagination
  const filteredSections = (employees as any[]).filter((employee) =>
    employee?.firstName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSections.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredSections.length / itemsPerPage);

  const handleSelectAll = () => {
    if (selectedRows.length === currentItems.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(
        currentItems
          .map((row) => row.employeeId!)
          .filter((id) => id !== null && id !== undefined)
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

  const handleDelete = async (id: number) => {
    const isConfirmed = confirm(
      "Are you sure you want to delete this employee?"
    );

    if (isConfirmed) {
      try {
        await deleteEmployee(id);
        toast.success("Employee deleted successfully");
        fetchSection(); // Refresh the data after deletion
      } catch (error) {
        console.error("Error deleting Employee:", error);
        toast.error("Failed to delete Employee");
      }
    } else {
      toast.success("Deletion cancelled");
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
            <TableHead className="h-10 p-2.5">Role</TableHead>
            <TableHead className="h-10 p-2.5">Campus</TableHead>
            <TableHead className="h-10 p-2.5">Department</TableHead>
            <TableHead className="h-10 p-2.5">Name</TableHead>
            <TableHead className="h-10 p-2.5">Email</TableHead>
            <TableHead className="h-10 p-2.5">Number</TableHead>
            <TableHead className="h-10 p-2.5">HireDate</TableHead>
            <TableHead className="h-10 p-2.5">Address</TableHead>
            <TableHead className="h-10 p-2.5">Qualifications</TableHead>
            <TableHead className="h-10 p-2.5">Status</TableHead>
            <TableHead className="h-10 p-2.5 text-end">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentItems.map((item) => (
            <TableRow
              key={item.employeeId}
              className="hover:bg-default-200"
              data-state={selectedRows.includes(item.employeeId!) && "selected"}
            >
              <TableCell className="p-2.5">{item.employeeRoleName}</TableCell>
              <TableCell className="p-2.5">{item.campusName}</TableCell>
              <TableCell className="p-2.5">{item.departmentName}</TableCell>
              <TableCell className="p-2.5">
                {item.firstName} {item.lastName}
              </TableCell>
              <TableCell className="p-2.5">{item.email}</TableCell>
              <TableCell className="p-2.5">{item.phoneNumber}</TableCell>
              <TableCell className="p-2.5">{item.hireDate}</TableCell>
              <TableCell className="p-2.5">{item.address}</TableCell>
              <TableCell className="p-2.5">{item.qualifications}</TableCell>
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
                  <EditEmployee employeeData={item} employees={employees}/>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7"
                    color="secondary"
                    onClick={() => handleDelete(item.employeeId!)}
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
    </>
  );
};

export default EmployeeListTable;
