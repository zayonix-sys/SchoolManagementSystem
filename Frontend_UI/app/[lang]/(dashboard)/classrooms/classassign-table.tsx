"use client";

import React, { useState,useEffect } from "react";
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
import { ClassroomData, deleteClassroom, fetchClassrooms } from "@/services/classroomService";
import { Input } from "@/components/ui/input";
import EditClassroom from "./edit-classroom";
import { AssignClassData, assignClasses, deleteClassassignment } from "@/services/assignClassService";
import { ClassData } from "@/services/ClassService";
import { SectionData } from "@/services/SectionService";
import EditClassSectionAssign from "./edit-classsectionassignment";

interface ClassAssignmentProps {
  classes: ClassData[];
  classroom: ClassroomData[];
  section: SectionData[];
}

const ClassAssignTable = ({classes, classroom, section,}: ClassAssignmentProps) => {
  const [classassignment, setClassassignment] = useState<AssignClassData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Function to fetch class data
  useEffect(() => {
    const fetchClassAssignData = async () => {
      setLoading(true);
      try {
        const response = await assignClasses(); // assuming fetchClasses is a function that fetches the data
        setClassassignment(response.data as AssignClassData[]);
      } catch (err) {
        setError(err as any);
      } finally {
        setLoading(false);
      }
    };
  
    fetchClassAssignData();
  }, []);
  
    const combinedData = classassignment.map((assignment) => {
    const associatedClass = classes.find((cls) => cls.classId === assignment.classId); // Adjust this according to your data structure
    const associatedSection = section.find((sec) => sec.sectionId === assignment.sectionId);
    const associatedClassroom = classroom.find((classroom => classroom.classroomId === assignment.classroomId))
  
    // console.log({
    //   classId: assignment.classId,
    //   sectionId: assignment.sectionId,
    //   classroomId: assignment.classroomId,
    //   className: associatedClass?.className,
    //   sectionName: associatedSection?.sectionName,
    //   roomNumber: associatedClassroom?.roomNumber,
    //   // isActive: assignment.isActive,
    // });

    return {
      assignmentId: assignment.assignmentId,
      className: associatedClass?.className || "",
      sectionName: associatedSection?.sectionName || "",
      roomNumber: associatedClassroom?.roomNumber || "",
      isActive: assignment.isActive,
      classId: assignment.classId,
      classroomId: assignment.classroomId,
      sectionId: assignment.sectionId
    };
  });

  const filteredClassassignments = combinedData.filter((item) =>
    item.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sectionName.toLowerCase().includes(searchQuery.toLowerCase())
);

// Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredClassassignments.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredClassassignments.length / itemsPerPage);

  // const handleSelectAll = () => {
  //   if (selectedRows.length === currentItems.length) {
  //     setSelectedRows([]);
  //   } else {
  //     setSelectedRows(
  //       currentItems.map((row) => row.assignmentId!).filter((id) => id !== null && id !== undefined)
  //     );
  //   }
  // };

  // const handleRowSelect = (id: number) => {
  //   const updatedSelectedRows = [...selectedRows];
  //   if (selectedRows.includes(id)) {
  //     updatedSelectedRows.splice(selectedRows.indexOf(id), 1);
  //   } else {
  //     updatedSelectedRows.push(id);
  //   }
  //   setSelectedRows(updatedSelectedRows);
  // };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleDelete = async (id: number) => {
    const isConfirmed = confirm("Are you sure you want to delete this Assigned Class?");
    
    if (isConfirmed) {
      try {
        await deleteClassassignment(id);
        alert("Assigned Class deleted successfully");
        assignClasses(); // Refresh the data after deletion
      } catch (error) {
        console.error("Error deleting assigned class:", error);
        alert("Failed to delete assigned class");
      }
    } else {
      alert("Deletion cancelled");
    }
  };



  return (
    <>
      <div className="mb-4 flex justify-between items-center mt-5">
        <Input
          type="text"
          placeholder="Search by Room Number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <Table className="text-left">
        <TableHeader>
          <TableRow>
            <TableHead className="h-10 p-2.5">Classroom Number</TableHead>
            <TableHead className="h-10 p-2.5">Class Name</TableHead>
            <TableHead className="h-10 p-2.5">Section Name</TableHead>
            <TableHead className="h-10 p-2.5">Status</TableHead>
            <TableHead className="h-10 p-2.5 text-end">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentItems.map((item) => (
            <TableRow
              key={item.assignmentId}
              className="hover:bg-default-200"
              data-state={
                selectedRows.includes(item.assignmentId!) && "selected"
              }
            >
              <TableCell className="p-2.5">{item.roomNumber}</TableCell>
              <TableCell className="p-2.5">{item.className}</TableCell>
              <TableCell className="p-2.5">{item.sectionName}</TableCell>
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
                 <EditClassSectionAssign  classAssignmentData={item}/>

                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7"
                    color="secondary"
                    onClick={() => handleDelete(item.assignmentId!)}
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
    </>
  );
};

export default ClassAssignTable;
