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
import { Input } from "@/components/ui/input";
import { SubjectData } from "@/services/subjectService";
import { EmployeesData } from "@/services/EmployeeService";
import { getSubjectTeacher, SubjectTeacherData } from "@/services/subjectTeacherService";
import EditSubjectTeacher from "./edit-subject-teacher";

interface SubjectTeacherProps {
  employee: EmployeesData[];
  subject: SubjectData[];
}

const SubjectTeacherTable = ({ employee, subject }: SubjectTeacherProps) => {
  const [subjectTeacherAssignment, setSubjectTeacherAssignment] = useState<SubjectTeacherData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  useEffect(() => {
    const fetchSubjectTeacher = async () => {
      setLoading(true);
      try {
        const response = await getSubjectTeacher();
        setSubjectTeacherAssignment(response.data as SubjectTeacherData[]);
      } catch (err) {
        setError(err as any);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjectTeacher();
  }, []);
    const filtered = subjectTeacherAssignment.filter((item) =>
      item.employeeName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subjectName?.toLowerCase().includes(searchQuery.toLowerCase())
  );
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const handlePreviousPage = () => {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    };
    const handleNextPage = () => {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };


  return (
    <>
      <div className="mb-4 flex justify-between items-center mt-5">
        <Input
          type="text"
          placeholder="Search By Subject Or Teacher Name...."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <Table className="text-left condensed">
        <TableHeader>
          <TableRow>
          <TableHead className="h-10 p-2.5">Teacher Name</TableHead>
          
            <TableHead className="h-10 p-2.5">Subject Name</TableHead>
            <TableHead className="h-10 p-2.5">Status</TableHead>
            <TableHead className="h-10 p-2.5 text-end">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentItems.map((item) => (
            <TableRow
              key={item.subjectTeacherId}
              className="hover:bg-default-200"
              data-state={
                selectedRows.includes(item.subjectTeacherId!) && "selected"
              }
            > 
              <TableCell className="p-2.5">{item?.employeeName}</TableCell>
              <TableCell className="p-2.5">{item?.subjectName}</TableCell>
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
                 <EditSubjectTeacher subjectTeacherData={item} />

                  {/* <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7"
                    color="secondary"
                    // onClick={() => handleDelete(item.classSubjectId!)}
                  >
                    <Icon icon="heroicons:trash" className="h-4 w-4" />
                  </Button> */}
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
    </>
  );
};

export default SubjectTeacherTable;