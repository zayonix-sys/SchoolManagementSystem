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
import { fetchSection } from "@/services/SectionService";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { deleteEmployee, EmployeesData } from "@/services/EmployeeService";
import EditEmployee from "./edit-employee";
import ConfirmationDialog from "../common/confirmation-dialog";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface EmployeeListTableProps {
  employees: EmployeesData[];
}

const EmployeeListTable: React.FC<EmployeeListTableProps> = ({ employees }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);
  const itemsPerPage = 20;
  const [detailedEmployee, setDetailedEmployee] = useState<EmployeesData | null>(null); 

  // Apply search filter and pagination
  const filteredSections = (employees as any[]).filter((employee) =>
    employee?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  employee?.lastName?.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleDeleteConfirmation = (id: number) => {
    setEmployeeToDelete(id);
  };

  const handleCancelDelete = () => {
    setEmployeeToDelete(null);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteEmployee(id);
      toast.success("Employee deleted successfully");
      fetchSection(); 
      setEmployeeToDelete(null); 
    } catch (error) {
      console.error("Error deleting Employee:", error);
      toast.error("Failed to delete Employee");
    }
  };
  const handleViewDetails = (employee: EmployeesData) => {
    setDetailedEmployee(employee); 
  };

  const handleCloseDetails = () => {
    setDetailedEmployee(null); 
  };
  const formatDate = (dateString: string | Date): string => {
    const date = new Date(dateString);
      return date.toLocaleDateString();
  };
  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <Input
          type="text"
          placeholder="Search by Employee Name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded m-2"
        />
      </div>
      <Table className="text-left">
        <TableHeader>
          <TableRow>
            <TableHead className="h-10 p-2.5">Full Name</TableHead>
            <TableHead className="h-10 p-2.5">Email</TableHead>
            <TableHead className="h-10 p-2.5">Department</TableHead>
            <TableHead className="h-10 p-2.5">HireDate</TableHead>
            <TableHead className="h-10 p-2.5">Status</TableHead>
            <TableHead className="h-10 p-2.5 text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentItems.map((item) => (
            <TableRow
              key={item.employeeId}
              className="hover:bg-default-200"
              data-state={selectedRows.includes(item.employeeId!) && "selected"}
            >
              <TableCell className="p-2.5">
                {item.firstName} {item.lastName}
              </TableCell>
              <TableCell className="p-2.5">{item.email}</TableCell>
              <TableCell className="p-2.5"> {item.departmentName}</TableCell>
              <TableCell className="p-2.5"> {formatDate(item.hireDate)}</TableCell>

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
                <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7"
                    color="secondary"
                    onClick={() => handleViewDetails(item)} // Show detailed view
                  >
                      <Icon icon="heroicons:eye" className=" h-4 w-4" />
                      </Button>
                  <EditEmployee employeeData={item}/>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7"
                    color="secondary"
                    onClick={() => handleDeleteConfirmation(item.employeeId!)}
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


      {/* Detailed Employee View in Dialog */}
      <Dialog open={!!detailedEmployee} onOpenChange={handleCloseDetails}>
  <DialogContent className="max-w-screen-sm mx-auto">
    <DialogHeader>
      <DialogTitle className="text-xl font-medium">
        Employee Details
      </DialogTitle>
      <DialogClose onClick={handleCloseDetails} />
    </DialogHeader>
    
    {detailedEmployee && (
      <div className="text-sm text-default-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="font-bold">Full Name: </span>
            {detailedEmployee.firstName} {detailedEmployee.lastName}
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Employee Role </span>
            {detailedEmployee.employeeRoleName}
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Campus: </span>
            {detailedEmployee.campusName}
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Department: </span>
            {detailedEmployee.departmentName}
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Hire Date: </span>
            {detailedEmployee.hireDate}
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Email: </span>
            {detailedEmployee.email}
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Qualifications: </span>
            {detailedEmployee.qualifications}
          </div>     
          <div className="flex flex-col">
            <span className="font-bold">Phone Number: </span>
            {detailedEmployee.phoneNumber}
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Emergency Contact: </span>
            {detailedEmployee.emergencyContact}
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Address: </span>
            {detailedEmployee.address}
          </div>
         
        </div>
      </div>
    )}
  </DialogContent>
</Dialog>


    
      {employeeToDelete !== null && (
        <ConfirmationDialog
          onDelete={() => handleDelete(employeeToDelete)}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default EmployeeListTable;
