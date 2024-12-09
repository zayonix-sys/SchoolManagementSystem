"use client";

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
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { SponsorData } from "@/services/apis/sponsorService";
import { SponsorshipData, SponsorshipDataDetails, useDeleteSponsorshipMutation } from "@/services/apis/sponsorshipService";

interface SponsorshipListTableProps {
  sponsorship: SponsorshipData[];
  sponsor: SponsorData[];
  sponsorshipDetail: SponsorshipDataDetails[];
  refetch: () => void;
}

const SponsorshipListTable: React.FC<SponsorshipListTableProps> = ({ sponsorship, refetch, sponsor,sponsorshipDetail }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sponsorshipToDelete, setSponsorshipToDelete] = useState<number | null>(null);
  const [detailedSponsorship, setDetailedSponsorship] =
  useState<SponsorshipDataDetails | null>(null);

  const [deleteSponsorship] = useDeleteSponsorshipMutation();
  const itemsPerPage = 20;

  // Filter data based on the search query
  const filteredSponsorship = sponsorship?.filter(
    (item: any) =>
      item.sponsorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.amount.toString().includes(searchQuery.toLowerCase())
  );

  // Pagination indices
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSponsorship?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredSponsorship?.length / itemsPerPage);

  // Group data by sponsorId
  const groupBySponsorId = (data: any) => {
    return data?.reduce((acc: Record<string, SponsorshipData>, item: any) => {
      const existing = acc[item.sponsorId];
      if (existing) {
        existing.amount += item.amount; // Sum the amounts
      } else {
        acc[item.sponsorId] = { ...item };
      }
      return acc;
    }, {});
  };

  const groupedData = currentItems?.length
  ? Object.values(groupBySponsorId(currentItems))
  : [];

  const handleViewDetails = (sponsorshipDetails: SponsorshipDataDetails) => {
    setDetailedSponsorship(sponsorshipDetails);
  };

  const handleCloseDetails = () => {
    setDetailedSponsorship(null);
  };
  // Pagination handlers
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Delete confirmation handlers
  const handleDeleteConfirmation = (id: number) => {
    setSponsorshipToDelete(id);
  };

  const handleCancelDelete = () => {
    setSponsorshipToDelete(null);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSponsorship(id);
      toast.success("Sponsorship deleted successfully");
      setSponsorshipToDelete(null);
      refetch();
    } catch (error) {
      console.error("Error deleting sponsorship:", error);
      toast.error("Failed to delete sponsorship");
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <Input
          type="text"
          placeholder="Search by Sponsor Name or Amount..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded m-2"
        />
      </div>
      <Table className="text-left">
        <TableHeader>
          <TableRow>
            <TableHead className="h-10 p-2.5">Sponsor Date</TableHead>
            <TableHead className="h-10 p-2.5">Amount</TableHead>
            <TableHead className="h-10 p-2.5">Sponsor Name</TableHead>
            <TableHead className="h-10 p-2.5">Status</TableHead>
            <TableHead className="h-10 p-2.5 text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {groupedData?.map((item: any) => (
            <TableRow key={item.sponsorId} className="hover:bg-default-200">
              <TableCell className="p-2.5">{item.startDate}</TableCell>
              <TableCell className="p-2.5">{item.amount}</TableCell>
              <TableCell className="p-2.5">{item.sponsorName}</TableCell>
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

              <div className="flex gap-3 me-1">
              <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7"
                    color="secondary"
                    onClick={() => handleViewDetails(item)} // Show detailed view
                  >
                    <Icon icon="heroicons:eye" className=" h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7"
                    color="secondary"
                    onClick={() => handleDeleteConfirmation(item.sponsorshipId)}
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
      <Dialog open={!!detailedSponsorship} onOpenChange={handleCloseDetails}>
  <DialogContent className="max-w-screen-md mx-auto">
    <DialogHeader>
      <DialogTitle className="text-xl font-medium">Sponsorship Details</DialogTitle>
      <DialogClose onClick={handleCloseDetails} />
    </DialogHeader>

    {detailedSponsorship && (
      <div className="text-sm text-default-500">
        {/* Sponsor Details */}
        <div className="mb-4">
          <div className="font-bold">Sponsor Name:</div>
          <div>{detailedSponsorship.sponsorName}</div>
        </div>

        {/* Table Display */}
        <Table className="text-left w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="p-2">Student Name</TableHead>
              <TableHead className="p-2">Class</TableHead>
              <TableHead className="p-2">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sponsorshipDetail?.map((student: any, index: number) => (
              <TableRow key={index} className="hover:bg-gray-100">
                <TableCell className="p-2">{student.studentName}</TableCell>
                <TableCell className="p-2">{student.className}</TableCell>
                <TableCell className="p-2">{student.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
    </div>
  );
};

export default SponsorshipListTable;
