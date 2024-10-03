"use client"

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
import { SponsorshipData } from "@/services/sponsorshipService";


interface StudentListTableProps {
  // students: StudentData[];
  classId: number | null,
  onStudentIdChange: (id: number) => void;
  sponsorship: SponsorshipData[];

}
const ClassStudentListTable:React.FC<StudentListTableProps> = ({classId, onStudentIdChange, sponsorship}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [studentId, setStudentId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudent] = useState<StudentData[]>([]);
  const [studentToDelete, setStudentToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchStudentByClass = async (id: number | null) => {
      setLoading(true);
      try {
        const studentData = await getStudentByClassWise(id ?? null);
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
  const filteredStudents = (students as StudentData[]).filter(
    (student) =>
      (student.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.lastName?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      !sponsorship.some((s) => s.studentId === student.studentId) 
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


  const handleSelectStudent = (id: number) => {
    setStudentId(id);
    onStudentIdChange(id); // Call the callback function with the selected studentId
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
              <TableCell className="font-medium  text-card-foreground/80 sticky left-0 bg-background drop-shadow-md">
                <Avatar className="rounded-full">
                  <AvatarImage src={item?.profileImage} />
                  <AvatarFallback>SK
                    <Icon icon="simple-line-icons:user" className="h-4 w-4" />
                  </AvatarFallback>
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
                 <Button
                  size="icon"
                  color="secondary"
                  className=" h-7 w-7"
                  type="submit"
                  onClick={() => handleSelectStudent(item.studentId)}
                  
                >
                   
                   <Icon icon="entypo:plus" className="h-4 w-4" />
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
     
    </>
  );
};

export default ClassStudentListTable;
