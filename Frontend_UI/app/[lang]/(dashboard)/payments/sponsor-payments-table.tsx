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
import { deleteSponsorPayment, fetchSponsorPayment, PaymentData } from "@/services/sponsorPaymentsService";
import EditPaymentForm from "./edit-sponsor-payment";

interface PaymentListTableProps {
  payment: PaymentData[];
}

const PaymentListTable: React.FC<PaymentListTableProps> = ({ payment }) => {
  const [payments, setPayments] = useState<PaymentData[]>(payment || []); // Initialize with prop data if available
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentToDelete, setPaymentToDelete] = useState<number | null>(null);
  const itemsPerPage = 20;

  useEffect(() => {
    if (!payment || payment.length === 0) {
      const loadPayments = async () => {
        try {
          const response = await fetchSponsorPayment();
          setPayments(response.data);
        } catch (error) {
          toast.error("Failed to load payments");
        }
      };
      loadPayments();
    }
  }, [payment]);

  const filteredPayments = payments.filter(
    (payment) =>
      payment?.sponsorName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPayments.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  const handleSelectAll = () => {
    if (selectedRows.length === currentItems.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(
        currentItems
          .map((row) => row.paymentId)
          .filter((id): id is number => id !== undefined) // Ensure only valid IDs are selected
      );
    }
  };

  const handleRowSelect = (id: number | undefined) => {
    if (id === undefined) return; // Ignore undefined IDs
    const updatedSelectedRows = [...selectedRows];
    if (selectedRows.includes(id)) {
      updatedSelectedRows.splice(updatedSelectedRows.indexOf(id), 1);
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
    setPaymentToDelete(id);
  };

  const handleCancelDelete = () => {
    setPaymentToDelete(null);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSponsorPayment(id);
      toast.success("Payment deleted successfully");
      const updatedPayments = payments.filter((payment) => payment.paymentId !== id);
      setPayments(updatedPayments);
      setPaymentToDelete(null);
    } catch (error) {
      console.error("Error deleting payment:", error);
      toast.error("Failed to delete payment");
    }
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
          placeholder="Search by Sponsor Name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded m-2"
        />
      </div>
      <Table className="text-left">
        <TableHeader>
          <TableRow>
            <TableHead className="h-10 p-2.5">Sponsor Name</TableHead>
            <TableHead className="h-10 p-2.5">Student Name</TableHead>
            <TableHead className="h-10 p-2.5">Payment Date</TableHead>
            <TableHead className="h-10 p-2.5">Amount Paid</TableHead>
            <TableHead className="h-10 p-2.5">Payment Method</TableHead>
            <TableHead className="h-10 p-2.5">Status</TableHead>
            <TableHead className="h-10 p-2.5 text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentItems.map((item) => (
            <TableRow
              key={item.paymentId}
              className="hover:bg-default-200"
              data-state={
                item.paymentId !== undefined && selectedRows.includes(item.paymentId)
                  ? "selected"
                  : undefined
              }
            >
              <TableCell className="p-2.5">{item.sponsorName}</TableCell>
              <TableCell className="p-2.5">
                {item.firstName} {item.lastName}
              </TableCell>
              <TableCell className="p-2.5">{formatDate(item.paymentDate || "")}</TableCell>
              <TableCell className="p-2.5">{item.amountPaid}</TableCell>
              <TableCell className="p-2.5">{item.paymentMethod}</TableCell>
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
                  <EditPaymentForm payment={item} />
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7"
                    color="secondary"
                    onClick={() => handleDeleteConfirmation(item.paymentId!)}
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
      {paymentToDelete !== null && (
        <ConfirmationDialog
          onDelete={() => handleDelete(paymentToDelete)}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default PaymentListTable;
