"use client";

import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  StudentData,
} from "@/services/apis/studentService";
import { ClassData } from "@/services/apis/classService";
import { useFetchExamResultPDFQuery } from "@/services/apis/examResultPDFService";
import { toast } from "sonner";
import ViewResult from "./view-result";
import AddResult from "./add-result";

interface StudentListTableProps {
  classData: ClassData[];
  students: StudentData[];
  refetch: () => void;
}
const StudentList: React.FC<StudentListTableProps> = ({
  students,
  refetch,
  classData,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false); 
  const [selectedStudent, setSelectedStudent] = useState<{ studentId: number; classId: number} | null>(null);
  const [viewDialog, setViewDialog] = useState<{studentId: number; classId: number} | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<{studentId: number} | null>(null);
  const [dialogType, setDialogType] = useState<"add" | "view" | null>(null);
  const {data: examResultPDFBlob, isLoading: isLoadingPDF, isError: isErrorPDF, error: ErrorPDF} = useFetchExamResultPDFQuery(
    selectedStudentId !== null
        ? { studentId: selectedStudentId.studentId }
        : { studentId: 0 }, { skip: !selectedStudentId });  

  const itemsPerPage = 5;
  const filteredStudents = (students as StudentData[])?.filter(
    (students) =>
      students.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      students.lastName?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents?.slice(indexOfFirstItem, indexOfLastItem );

  const totalPages = Math.ceil(filteredStudents?.length / itemsPerPage);

  useEffect(() => {
    if(examResultPDFBlob)
    {
        const pdfUrl = URL.createObjectURL(examResultPDFBlob);
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `Exam-Result-${selectedStudentId?.studentId}.pdf`;
        document.body.appendChild(link); 
        link.click();
        document.body.removeChild(link); 

        URL.revokeObjectURL(pdfUrl);
    }
  }, [examResultPDFBlob, selectedStudentId]);

  useEffect(() => {
    if(isErrorPDF){
      toast.error(ErrorPDF as string);
    }
  }, [isErrorPDF])

  useEffect(() => {
    console.log("Selected Student:", selectedStudent);
    console.log("Dialog Type:", dialogType);
  }, [selectedStudent, viewDialog,dialogType]);

  const handleViewDetails = (params: { studentId: number }) => {
    setSelectedStudentId({studentId: params.studentId});
};

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleViewResult = (studentId: number, classId: number) => {
    setViewDialog({ studentId, classId});
    setDialogType("view");
  };

  const handleCloseAddDialog = () => {
    setSelectedStudent(null);
    setDialogType(null);
  };

  const handleCloseViewDialog = () => {
    setViewDialog(null);
    setDialogType(null);
  };

  const handleAddResult = (studentId: number, classId: number) => {
    setSelectedStudent({ studentId, classId});
    setDialogType("add");
  };
  
  
  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <Input
          type="text"
          placeholder="Search by Student Name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded m-2"
        />
      </div>
      <Card className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">GrNo</TableHead>
              <TableHead className="font-semibold">Full Name</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Phone Number</TableHead>
              <TableHead className="font-semibold">Gender</TableHead>
              <TableHead className="font-semibold">Class Name</TableHead>
              <TableHead className="font-semibold">Date of Birth</TableHead>
              <TableHead className="font-semibold">Enrollment Date</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="text-center sticky right-0 bg-background drop-shadow-md">
              Add Results
              </TableHead>
              <TableHead className="text-center sticky right-0 bg-background drop-shadow-md">
              View Results
              </TableHead>
              <TableHead className="text-center sticky right-0 bg-background drop-shadow-md">
              Download Transcript
              </TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems?.map((item) => (
              <TableRow key={item.email} className="hover:bg-muted">
                <TableCell>{item.grNo}</TableCell>
                <TableCell>
                  {item.firstName} {item.lastName}
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phoneNumber}</TableCell>
                <TableCell>{item.gender}</TableCell>
                <TableCell>{item.className}</TableCell>
                <TableCell>{item.dateOfBirth.toLocaleString()}</TableCell>
                <TableCell>{item.enrollmentDate.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    color={item.isActive ? "success" : "destructive"}
                    className="capitalize"
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>

                <TableCell className="gap-3 justify-center bg-background drop-shadow-md">
                  <Button
                    size="icon"
                    variant="outline"
                    className=" h-7 w-7"
                    color="secondary"
                    onClick={() => handleAddResult(item.studentId, item.classId ?? 0)}
                  >
                    <Icon icon="heroicons:pencil" className=" h-4 w-4  " /> 
                  </Button>
                </TableCell>

                <TableCell className="gap-3 justify-end bg-background drop-shadow-md">
                  <Button
                    size="icon"
                    variant="outline"
                    className=" h-7 w-7"
                    color="secondary"
                    onClick={() => handleViewResult(item.studentId, item.classId ?? 0)}
                  >
                    <Icon icon="heroicons:academic-cap" className=" h-4 w-4  " />
                  </Button>
                </TableCell>

                <TableCell className="gap-3 bg-background drop-shadow-md">
                  <Button
                    size="icon"
                    variant="outline"
                    className=" h-7 w-7"
                    color="secondary"
                    onClick={() => handleViewDetails({studentId: item.studentId})}
                  >
                    <Icon icon="heroicons:arrow-long-down" className=" h-4 w-4 " /> 
                  </Button>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
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
        
        <div>
        {dialogType === "add" && selectedStudent && (
        <AddResult 
          studentId={selectedStudent?.studentId} 
          classId={selectedStudent?.classId} 
          onClose={handleCloseAddDialog} 
          refetch={refetch}
          dialogType={dialogType}
        />
        )}
        </div>
      </div>
      {dialogType === "view" && viewDialog && (
        <ViewResult
          className={currentItems.find((item) => item.studentId === viewDialog.studentId)?.className ?? ""}
          firstName={currentItems.find((item) => item.studentId === viewDialog.studentId)?.firstName ?? ""}
          lastName={currentItems.find((item) => item.studentId === viewDialog.studentId)?.lastName ?? ""}
          studentId={viewDialog.studentId}
          classId={viewDialog.classId}
          refetch={refetch}
          onClose={handleCloseViewDialog}
          dialogType={dialogType}
        />
      )}
    </>
  );
};

export default StudentList;
