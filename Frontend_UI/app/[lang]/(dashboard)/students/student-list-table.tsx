"use client"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { deleteStudent, getStudentByClassWise, StudentData } from "@/services/studentService";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import ConfirmationDialog from "../common/confirmation-dialog";
import EditStudent from "./edit-student";
import { ClassData } from "@/services/apis/classService";


interface StudentListTableProps {
  // students: StudentData[];
  classId: number | null,
  classData: ClassData[]
}
const StudentList:React.FC<StudentListTableProps> = ({classId}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudent] = useState<StudentData[]>([]);
  const [studentToDelete, setStudentToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchStudentByClass = async (id: number) => {
      setLoading(true);
      try {
        const studentData = await getStudentByClassWise(id);
        setStudent(studentData?.data as StudentData[]);
      } catch (err) {
        setError(err as any);
      } finally {
        setLoading(false);
      }
    };

    if (classId) {
      fetchStudentByClass(classId);
    }
  }, [classId]);

  const itemsPerPage = 20;
  const filteredStudents = (students as any[])?.filter(
    (students) =>
      students.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    students.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredStudents?.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const handleDeleteConfirmation = (id: number) => {
    setStudentToDelete(id);
  };

  const handleCancelDelete = () => {
    setStudentToDelete(null);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteStudent(id);
      toast.success("student deleted successfully");
      setStudentToDelete(null);
    } catch (error) {
      console.error("Error deleting Student:", error);
      toast.error("Failed to delete Student");
    }
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
            <TableHead className="font-semibold sticky left-0 bg-background drop-shadow-md"> Profile Image</TableHead>
            <TableHead className="font-semibold">Gr No</TableHead>
            <TableHead className="font-semibold">Full Name</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Phone Number</TableHead>
            <TableHead className="font-semibold">Gender</TableHead>
            <TableHead className="font-semibold">Class Name</TableHead>
            <TableHead className="font-semibold">Date of Birth</TableHead>
            <TableHead className="font-semibold">Enrollment Date</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="text-center sticky right-0 bg-background drop-shadow-md">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems?.map((item) => (
            <TableRow key={item.email} className="hover:bg-muted">
              {/* Profile Image */}
              <TableCell className="font-medium  text-card-foreground/80 sticky left-0 bg-background drop-shadow-md">
                <Avatar className="rounded-full">
                  <AvatarImage src={item.profileImage} />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
              </TableCell>

              
              <TableCell>{item.grNo}</TableCell>
               <TableCell>{item.firstName}{" "}{item.lastName}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.phoneNumber}</TableCell>
              <TableCell>{item.gender}</TableCell>
              <TableCell>{item.className}</TableCell>
              <TableCell>{item.dateOfBirth}</TableCell>
              <TableCell>{item.enrollmentDate}</TableCell>
              <TableCell>
              <Badge
                  variant="outline"
                  color={item.isActive ? "success" : "destructive"}
                  className="capitalize"
                >
                  {item.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="flex gap-3 justify-end bg-background drop-shadow-md">
           
                <EditStudent studentData={item} classes={item.classData}/>
                <Button
                  size="icon"
                  variant="outline"
                  className=" h-7 w-7"
                  color="secondary"
                  onClick={() => handleDeleteConfirmation(item.id)}
                >
                  <Icon icon="heroicons:trash" className=" h-4 w-4  " />
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
      </div>
      {studentToDelete !== null && (
        <ConfirmationDialog
          onDelete={() => handleDelete(studentToDelete)}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default StudentList;
