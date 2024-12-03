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
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import ConfirmationDialog from "../common/confirmation-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteSponsorship, fetchSponsorship, SponsorshipData } from "@/services/sponsorshipService";
import EditSponsorshipForm from "./edit-sponsorship";

interface SponsorshipListTableProps {
  sponsorship: SponsorshipData[];
}

const SponsorshipListTable: React.FC<SponsorshipListTableProps> = ({ sponsorship }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sponsorshipToDelete, setSponsorshipToDelete] = useState<number | null>(null);
  const itemsPerPage = 20;
  const [detailedsponsorship, setDetailedSponsorship] =
    useState<SponsorshipData | null>(null);

  const filteredSponsorshp = (sponsorship as any[]).filter(
    (sponsorship) =>
      sponsorship?.sponsorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sponsorship?.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sponsorship?.amount?.toString().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSponsorshp.slice(
    indexOfFirstItem,
    indexOfLastItem
  );


  const totalPages = Math.ceil(filteredSponsorshp.length / itemsPerPage);
// console.log(filteredSponsorshp,"filterend Sponosorship");

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleDeleteConfirmation = (id: number) => {
    setSponsorshipToDelete(id);
  };

  const handleCancelDelete = () => {
    setSponsorshipToDelete(null);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSponsorship(id);
      toast.success("sponsorship deleted successfully");
      fetchSponsorship();
      setSponsorshipToDelete(null);
    } catch (error) {
      console.error("Error deleting sponsorship:", error);
      toast.error("Failed to delete sponsorship");
    }
  };
  const handleViewDetails = (sponsorship: SponsorshipData) => {
    setDetailedSponsorship(sponsorship);
  };

  const handleCloseDetails = () => {
    setDetailedSponsorship(null);
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
          placeholder="Search by Student Name & Sponsor Name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded m-2"
        />
      </div>
      <Table className="text-left">
        <TableHeader>
          <TableRow>
            <TableHead className="h-10 p-2.5">Student Name</TableHead>
            <TableHead className="h-10 p-2.5">Class</TableHead>
            <TableHead className="h-10 p-2.5">Sponsor Date</TableHead>
            <TableHead className="h-10 p-2.5">Amount</TableHead>
            <TableHead className="h-10 p-2.5">Sponsor Name</TableHead>
            <TableHead className="h-10 p-2.5">Status</TableHead>
            <TableHead className="h-10 p-2.5 text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentItems.map((item) => (
            <TableRow
              key={item.sponsorshipId}
              className="hover:bg-default-200"
              data-state={selectedRows.includes(item.sponsorshipId!) && "selected"}
            >
              <TableCell className="p-2.5">
                {item.studentName}
              </TableCell>
              <TableCell className="p-2.5">{item.className}</TableCell>
              <TableCell className="p-2.5"> {item.startDate}</TableCell>
              <TableCell className="p-2.5">{item.amount} </TableCell>
              <TableCell className="p-2.5">{item.sponsorName} </TableCell>

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
                    onClick={() => handleViewDetails(item)} 
                  >
                    <Icon icon="heroicons:eye" className=" h-4 w-4" />
                  </Button>
                  <EditSponsorshipForm existingSponsorship={item} studentName={item.studentName} />
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7"
                    color="secondary"
                    onClick={() => handleDeleteConfirmation(item.sponsorshipId!)}
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
      <Dialog open={!!detailedsponsorship} onOpenChange={handleCloseDetails}>
        <DialogContent className="max-w-screen-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium">
              Sponsorship Details
            </DialogTitle>
            <DialogClose onClick={handleCloseDetails} />
          </DialogHeader>

          {detailedsponsorship && (
            <div className="text-sm text-default-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="font-bold">Student Name: </span>
                  {detailedsponsorship.studentName} 
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">Gender </span>
                  {detailedsponsorship.gender}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">Class </span>
                  {detailedsponsorship.className}
                </div>
                {/* <div className="flex flex-col">
                  <span className="font-bold">Age: </span>
                  {detailedsponsorship.age}
                </div> */}
                <div className="flex flex-col">
                  <span className="font-bold">Sponsorship Start Date </span>
                  {detailedsponsorship?.startDate?.toString()}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">Amount: </span>
                  {detailedsponsorship.amount}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">Sponsor Phone #: </span>
                  {detailedsponsorship.phoneNumber}
                </div>
                {/* <div className="flex flex-col">
                  <span className="font-bold">Sponsorship Status: </span>
                  {detailedsponsorship.sponsorshipStatus}
                </div> */}
                {/* <div className="flex flex-col">
                  <span className="font-bold">Sponsorship : </span>
                  {detailedsponsorship.}
                </div> */}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {sponsorshipToDelete !== null && (
        <ConfirmationDialog
          onDelete={() => handleDelete(sponsorshipToDelete)}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default SponsorshipListTable;
