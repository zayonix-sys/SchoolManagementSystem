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
import { Input } from "@/components/ui/input";
import ConfirmationDialog from "../common/confirmation-dialog";
import { toast } from "sonner";
import { deletePeriod, PeriodsData } from "@/services/periodService";
import EditPeriods from "./edit-periods";

interface PeriodsProps {
  Periods: PeriodsData[];
}

const formatTime = (time: string) => {
  const [hour, minute] = time.split(":"); 
  const parsedTime = new Date();
  parsedTime.setHours(parseInt(hour, 10), parseInt(minute, 10));

  return parsedTime.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

const PeriodsListTable: React.FC<PeriodsProps> = ({Periods}) => {
  const [periodsToDelete, setPeriodsToDelete] = useState<number | null>(null);
  const [filteredPeriods, setFilteredPeriods] = useState<PeriodsData[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    const filtered = Periods.filter((ps) =>
      ps.periodName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPeriods(filtered);
  }, [searchQuery, Periods]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Periods.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(Periods.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const handleDeleteConfirmation = (id: number) => {
    setPeriodsToDelete(id);
  };

  const handleCancelDelete = () => {
    setPeriodsToDelete(null);
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePeriod(id);
      toast.success("Period deleted successfully");
      setPeriodsToDelete(null); // Close dialog after successful deletion
    } catch (error) {
      console.error("Error deleting a Period:", error);
      toast.error("Failed to delete a Period");
    }
  };

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <Input
          type="text"
          placeholder="Search by Periods..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <Table className="text-left">
        <TableHeader>
          <TableRow>
            <TableHead className="h-10 p-2.5">Period Name</TableHead>
            <TableHead className="h-10 p-2.5">Start Time</TableHead>
            <TableHead className="h-10 p-2.5">End Time</TableHead>
            <TableHead className="h-10 p-2.5">Status</TableHead>
            <TableHead className="h-10 p-2.5 text-end">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentItems.map((item) => (
            <TableRow
              key={item.periodId}
              className="hover:bg-default-200"
              data-state={selectedRows.includes(item.periodId!) && "selected"}
            >
              <TableCell className="p-2.5">{item.periodName}</TableCell>
              <TableCell className="p-2.5">{item.startTime}</TableCell>
              <TableCell className="p-2.5">{item.endTime}</TableCell>
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
                  <EditPeriods PeriodsData={[item]} />

                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7"
                    color="secondary"
                    onClick={() => handleDeleteConfirmation(item.periodId!)}
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
      {periodsToDelete !== null && (
        <ConfirmationDialog
          onDelete={() => handleDelete(periodsToDelete)}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default PeriodsListTable;
