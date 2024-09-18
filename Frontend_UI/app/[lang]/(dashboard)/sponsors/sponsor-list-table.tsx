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
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SponsorData } from "@/services/sponsorService";

interface SponsorListTableProps {
  sponsor: SponsorData[];
}

const SponsorListTable: React.FC<SponsorListTableProps> = ({sponsor}) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sponsorToDelete, setSponsorToDelete] = useState<number | null>(null);
  const itemsPerPage = 20;
  // const [detailedSponsor, setDetailedSponsor] = useState<SponsorData | null>(null); 
  
  const filteredSponsors = (sponsor as any[]).filter((sponsor) =>
    sponsor?.sponsorName?.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSponsors.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredSponsors.length / itemsPerPage);

  const handleSelectAll = () => {
    if (selectedRows.length === currentItems.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(
        currentItems
          .map((row) => row.sponsorId!)
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
    setSponsorToDelete(id);
  };

  const handleCancelDelete = () => {
    setSponsorToDelete(null);
  };

  const handleDelete = async (id: number) => {
    try {
      // await deleteSponsor(id);
      toast.success("Sponsor deleted successfully");
      setSponsorToDelete(null); 
    } catch (error) {
      console.error("Error deleting Sponsor:", error);
      toast.error("Failed to delete Sponsor");
    }
  };
  // const handleViewDetails = (sponsor: SponsorData) => {
  //   setDetailedSponsor(sponsor); 
  // };

  // const handleCloseDetails = () => {
  //   setDetailedSponsor(null); 
  // };
  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <Input
          type="text"
          placeholder="Search by Sponsor Name..."
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
            <TableHead className="h-10 p-2.5">Gender</TableHead>
            <TableHead className="h-10 p-2.5">Occupation</TableHead>
            <TableHead className="h-10 p-2.5">Phone Number</TableHead>
            <TableHead className="h-10 p-2.5">Nationality</TableHead>
            <TableHead className="h-10 p-2.5">Address</TableHead>
            <TableHead className="h-10 p-2.5">Status</TableHead>
            <TableHead className="h-10 p-2.5 text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentItems.map((item) => (
            <TableRow
              key={item.sponsorId}
              className="hover:bg-default-200"
              data-state={selectedRows.includes(item.sponsorId!) && "selected"}
            >
              <TableCell className="p-2.5">
               {item.sponsorName}
              </TableCell>
              <TableCell className="p-2.5">{item.email}</TableCell>
              <TableCell className="p-2.5"> {item.gender}</TableCell>
              <TableCell className="p-2.5"> {item.occupation}</TableCell>
              <TableCell className="p-2.5"> {item.phoneNumber}</TableCell>
              <TableCell className="p-2.5"> {item.nationality}</TableCell>
              <TableCell className="p-2.5"> {item.address}</TableCell>
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
                {/* <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7"
                    color="secondary"
                    onClick={() => handleViewDetails(item)} // Show detailed view
                  >
                      <Icon icon="heroicons:eye" className=" h-4 w-4" />
                      </Button> */}
                  {/* <EditEmployee employeeData={item}/> */}
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7"
                    color="secondary"
                    onClick={() => handleDeleteConfirmation(item.sponsorId!)}
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


      {/* <Dialog open={!!detailedSponsor} onOpenChange={handleCloseDetails}>
  <DialogContent className="max-w-screen-sm mx-auto">
    <DialogHeader>
      <DialogTitle className="text-xl font-medium">
        Sponsor Details
      </DialogTitle>
      <DialogClose onClick={handleCloseDetails} />
    </DialogHeader>
    
    {detailedSponsor && (
      <div className="text-sm text-default-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="font-bold">Full Name: </span>
            {detailedSponsor.sponsorName}
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Email </span>
            {detailedSponsor.email}
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Gender </span>
            {detailedSponsor.gender}
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Occupation </span>
            {detailedSponsor.occupation}
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Phone Number: </span>
            {detailedSponsor.phoneNumber}
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Country </span>
            {detailedSponsor.country}
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Nationality </span>
            {detailedSponsor.nationality}
          <div className="flex flex-col">
            <span className="font-bold">State </span>
            {detailedSponsor.state}
          <div className="flex flex-col">
            <span className="font-bold">City </span>
            {detailedSponsor.city}
          <div className="flex flex-col">
            <span className="font-bold">postalCode </span>
            {detailedSponsor.postalCode}
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Address: </span>
            {detailedSponsor.address}
          </div>
         
        </div>
      </div>
  )}
  
  </DialogContent>
</Dialog> */}

      {sponsorToDelete !== null && (
        <ConfirmationDialog
          onDelete={() => handleDelete(sponsorToDelete)}
          onCancel={handleCancelDelete}
        />
      )}
    </>

  )}


export default SponsorListTable;
