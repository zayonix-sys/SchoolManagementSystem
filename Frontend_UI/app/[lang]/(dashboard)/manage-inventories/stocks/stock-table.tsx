"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

import EditItem from "./edit-stock";
import {
  InventoryStockData,
  useDeleteInventoryStockMutation,
} from "@/services/apis/inventoryStockService";
import { InventoryItemData } from "@/services/apis/inventoryItemService";

interface StockListTableProps {
  stocks: InventoryStockData[];
  items: InventoryItemData[];
}

const StockListTable: React.FC<StockListTableProps> = ({ stocks, items }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const stocksPerPage = 20;

  const [deleteItem] = useDeleteInventoryStockMutation();

  // Apply search filter and pagination
  const filteredStocks = (stocks ?? []).filter((item) =>
    item?.itemName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * stocksPerPage;
  const indexOfFirstItem = indexOfLastItem - stocksPerPage;
  const currentItems = filteredStocks.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredStocks?.length / stocksPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      <div className="mb-4 flex justify-between stocks-center">
        <Input
          type="text"
          placeholder="Search by Stock Name or Description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded m-2"
        />
      </div>
      <Table className="text-left">
        <TableHeader>
          <TableRow>
            <TableHead className="h-10 p-2.5">Item</TableHead>
            <TableHead className="h-10 p-2.5">Category</TableHead>
            <TableHead className="h-10 p-2.5">Total Stock In</TableHead>
            <TableHead className="h-10 p-2.5">Total Stock Out</TableHead>
            <TableHead className="h-10 p-2.5">Current Stock</TableHead>
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
              <TableCell className="p-2.5">{item.totalStockIn}</TableCell>
              <TableCell className="p-2.5">{item.totalStockOut}</TableCell>
              <TableCell className="p-2.5">{item.currentStock}</TableCell>
              <TableCell className="p-2.5 flex justify-end">
                <div className="flex gap-3">
                  <EditItem stockData={item} items={items} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between stocks-center mt-4">
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

export default StockListTable;
