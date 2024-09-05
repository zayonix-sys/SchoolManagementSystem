import React, { useState } from "react";
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
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import ConfirmationDialog from "../common/confirmation-dialog";
import {
  ApplicantData,
  deleteApplicant,
  getApplicants,
} from "@/services/applicantService";
import EditApplicant from "./edit-applicant";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ApplicantListTableProps {
  applicants: ApplicantData[];
}

const ApplicantListTable: React.FC<ApplicantListTableProps> = ({
  applicants,
}) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [applicantToDelete, setApplicantToDelete] = useState<number | null>(
    null
  );
  const [detailedApplicant, setDetailedApplicant] =
    useState<ApplicantData | null>(null); // State for detailed view
  const itemsPerPage = 5;

  // Apply search filter and pagination
  const filteredApplicants = applicants?.filter(
    (applicant) =>
      applicant?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant?.lastName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredApplicants?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredApplicants.length / itemsPerPage);

  const handleSelectAll = () => {
    if (selectedRows.length === currentItems.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(
        currentItems
          ?.map((row) => row.applicantId!)
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
    setApplicantToDelete(id);
  };

  const handleCancelDelete = () => {
    setApplicantToDelete(null);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteApplicant(id);
      toast.success("Applicant deleted successfully");
      getApplicants(); // Refresh the data after deletion
      setApplicantToDelete(null); // Close dialog after successful deletion
    } catch (error) {
      console.error("Error deleting Applicant:", error);
      toast.error("Failed to delete Applicant");
    }
  };
  const handleViewDetails = (applicant: ApplicantData) => {
    setDetailedApplicant(applicant); // Set detailed view state
  };

  const handleCloseDetails = () => {
    setDetailedApplicant(null); // Close detailed view
  };

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <Input
          type="text"
          placeholder="Search by applicant name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <Table className="text-left">
        <TableHeader>
          <TableRow>
            <TableHead className="h-10 p-2.5">S.No</TableHead>
            <TableHead className="h-10 p-2.5">Full Name</TableHead>
            <TableHead className="h-10 p-2.5">Gender</TableHead>
            <TableHead className="h-10 p-2.5">Email</TableHead>
            <TableHead className="h-10 p-2.5">Phone Number</TableHead>
            <TableHead className="h-10 p-2.5">Status</TableHead>
            <TableHead className="h-10 p-2.5 ">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentItems?.map((item, index) => (
            <TableRow>
              <TableCell className="p-2.5">
                {index + 1 + indexOfFirstItem}
              </TableCell>
              <TableCell className="p-2.5">
                {item.firstName} {item.lastName}
              </TableCell>
              <TableCell className="p-2.5">{item.gender}</TableCell>
              <TableCell className="p-2.5">{item.email}</TableCell>
              <TableCell className="p-2.5">{item.phoneNumber}</TableCell>
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
                  <EditApplicant applicantData={item} />
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7"
                    color="secondary"
                    onClick={() => handleDeleteConfirmation(item.applicantId!)}
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

      {/* Detailed Applicant View in Dialog */}
      <Dialog open={!!detailedApplicant} onOpenChange={handleCloseDetails}>
  <DialogContent className="max-w-screen-sm mx-auto">
    <DialogHeader>
      <DialogTitle className="text-xl font-medium">
        Applicant Details
      </DialogTitle>
      <DialogClose onClick={handleCloseDetails} />
    </DialogHeader>
    
    {detailedApplicant && (
      <div className="text-sm text-default-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="font-bold">Full Name: </span>
            {detailedApplicant.firstName} {detailedApplicant.lastName}
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Form B Number: </span>
            {detailedApplicant.formBNumber}
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Date of Birth: </span>
            {detailedApplicant.dateOfBirth}
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Gender: </span>
            {detailedApplicant.gender}
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Email: </span>
            {detailedApplicant.email}
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Phone Number: </span>
            {detailedApplicant.phoneNumber}
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Address: </span>
            {detailedApplicant.applicantAddress}
          </div>
          <div className="flex flex-col">
            <span className="font-bold">City: </span>
            {detailedApplicant.city}
          </div>
          
          <div className="flex flex-col">
            <span className="font-bold">States: </span>
            {detailedApplicant.states}
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Residence Status: </span>
            {detailedApplicant.residenceStatus}
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Campus </span>
            {detailedApplicant.campusName}
          </div>
           <div className="flex flex-col">
            <span className="font-bold">Mother Tongue </span>
            {detailedApplicant.motherTounge}
          </div>
         
           <div className="flex flex-col">
            <span className="font-bold">Last Class Attendent </span>
            {detailedApplicant.lastClassId}
          </div>
         
        </div>
      </div>
    )}
  </DialogContent>
</Dialog>


      {/* Delete Confirmation Dialog */}
      {applicantToDelete !== null && (
        <ConfirmationDialog
          onDelete={() => handleDelete(applicantToDelete)}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default ApplicantListTable;
