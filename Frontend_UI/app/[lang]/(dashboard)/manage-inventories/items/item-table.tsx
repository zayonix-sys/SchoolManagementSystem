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

import EditItem from "./edit-item";
import ConfirmationDialog from "../../common/confirmation-dialog";
import {
  InventoryItemData,
  useDeleteInventoryItemMutation,
} from "@/services/apis/inventoryItemService";

interface ItemListTableProps {
  items: InventoryItemData[];
}

const ItemListTable: React.FC<ItemListTableProps> = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const itemsPerPage = 20;

  const [deleteItem] = useDeleteInventoryItemMutation();

  // Apply search filter and pagination
  const filteredCategories = (items ?? []).filter(
    (item) =>
      item?.itemName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredCategories?.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleDeleteConfirmation = (id: number) => {
    setItemToDelete(id);
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteItem(id);
      toast.success("Item deleted successfully");
      setItemToDelete(null);
    } catch (error) {
      console.error("Error deleting Item:", error);
      toast.error("Failed to delete Item");
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
          placeholder="Search by Item Name or Description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded m-2"
        />
      </div>
      <Table className="text-left">
        <TableHeader>
          <TableRow>
            <TableHead className="h-10 p-2.5">Item Name</TableHead>
            <TableHead className="h-10 p-2.5">Category</TableHead>
            <TableHead className="h-10 p-2.5">Desccription</TableHead>
            <TableHead className="h-10 p-2.5">Price</TableHead>
            <TableHead className="h-10 p-2.5">Quantity</TableHead>
            <TableHead className="h-10 p-2.5">Created Date</TableHead>
            <TableHead className="h-10 p-2.5">Status</TableHead>
            <TableHead className="h-10 p-2.5 text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentItems.map((item) => (
            <TableRow
              key={item.itemId}
              className="hover:bg-default-200"
              // data-state={selectedRows.includes(item.itemId!) && "selected"}
            >
              <TableCell className="p-2.5">{item.itemName}</TableCell>
              <TableCell className="p-2.5">{item.categoryName}</TableCell>
              <TableCell className="p-2.5"> {item.description}</TableCell>
              <TableCell className="p-2.5"> {item.unitPrice}</TableCell>
              <TableCell className="p-2.5"> {item.totalQuantity}</TableCell>
              <TableCell className="p-2.5">
                {item?.createdAt
                  ? formatDate(item.createdAt)
                  : "No Created Date"}
              </TableCell>
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
                  <EditItem itemData={item} />
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7"
                    color="secondary"
                    onClick={() => handleDeleteConfirmation(item.itemId!)}
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
      {itemToDelete !== null && (
        <ConfirmationDialog
          onDelete={() => handleDelete(itemToDelete)}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default ItemListTable;
