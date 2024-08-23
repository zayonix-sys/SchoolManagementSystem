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
import { DataRows, users } from "./data";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DepartmentData } from "@/services/departmentService";


interface DepartmentProps {
  departments: DepartmentData[];
}
const SelectionOperation = ({departments}: DepartmentProps) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleSelectAll = () => {
    if (selectedRows?.length === users?.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(users.map((row) => row.id));
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
  const selectEvenRows = () => {
    const evenRowIds = users
      .filter((_, index) => index % 2 !== 0)
      .map((row) => row.id);
    setSelectedRows(evenRowIds);
  };

  const selectOddRows = () => {
    const oddRowIds = users
      .filter((_, index) => index % 2 === 0)
      .map((row) => row.id);
    setSelectedRows(oddRowIds);
  };
  return (
    <Table className="text-left">
      <TableHeader>
        <TableRow>
          <TableHead className=" font-semibold">Campus</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className=" text-end">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {departments.map((item: DepartmentData) => (
          <TableRow
            key={item.departmentId}
            className="hover:bg-muted"
            data-state={selectedRows.includes(item.departmentId!) && "selected"}
          >
            
            <TableCell>{item.campus?.campusName}</TableCell>
            <TableCell>{item.departmentName}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>
            <Badge
                variant="outline"
                color={item.isActive ? "success" : "destructive"} // Adjust colors based on status
                className="capitalize"
              >
                {item.isActive ? "Active" : "Inactive"}
              </Badge>
            </TableCell>

            <TableCell className="flex justify-end">
              <div className="flex gap-3">
                <Button
                  size="icon"
                  variant="outline"
                  color="secondary"
                  className="h-7 w-7"
                >
                  <Icon icon="heroicons:pencil" className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className=" h-7 w-7"
                  color="secondary"
                >
                  <Icon icon="heroicons:trash" className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SelectionOperation;
