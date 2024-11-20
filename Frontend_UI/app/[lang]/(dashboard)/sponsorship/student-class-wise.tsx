"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { StudentData, fetchStudents } from "@/services/studentService";
import { SponsorshipData } from "@/services/sponsorshipService";
import { useEffect, useState } from "react";

interface StudentListTableProps {
  onStudentSelectionChange: (selectedStudents: { studentId: number; classId: number | null }[]) => void;
  onStudentSelectionChange: (selectedStudents: number[]) => void;
  sponsorship: SponsorshipData[];
}

const ClassStudentListTable: React.FC<StudentListTableProps> = ({
  onStudentSelectionChange,
  sponsorship,
}) => {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<{ studentId: number; classId: number | null }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStudents();
      setStudents(data?.data || []);
    };
    fetchData();
  }, []);

  const handleCheckboxChange = (student: StudentData) => {
    const updatedSelection = selectedStudents.some(
      (s) => s.studentId === student.studentId
    )
      ? selectedStudents.filter((s) => s.studentId !== student.studentId)
      : [
          ...selectedStudents,
          { studentId: student.studentId, classId: student.classId },
        ];

    setSelectedStudents(updatedSelection);
    onStudentSelectionChange(updatedSelection); // Pass array of objects to parent
  };


  const handleCheckboxChange = (student: StudentData) => {
    const isAlreadySelected = selectedStudents.some(
      (s) => s.studentId === student.studentId
    );
    const updatedSelection = isAlreadySelected
      ? selectedStudents.filter((s) => s.studentId !== student.studentId)
      : [
          ...selectedStudents,
          { studentId: student.studentId, classId: student.classId ?? null },
        ];

    setSelectedStudents(updatedSelection);
    onStudentSelectionChange(updatedSelection);
  };
  };

  const filteredStudents = students.filter(
    (student) =>
      (student.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.lastName?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      !sponsorship.some((s) => s.studentId === student.studentId)
  );

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  return (
    <div>
      <Input
        placeholder="Search by Student Name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 rounded mb-4"
      />
      <Card className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Profile</TableHead>
              <TableHead>Gr No</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>DOB</TableHead>
              <TableHead>Enrollment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Select</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedStudents.map((student) => (
              <TableRow key={student.studentId}>
                <TableCell>
                  <Avatar>
                    <AvatarFallback>SK</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{student.grNo}</TableCell>
                <TableCell>
                  {student.firstName} {student.lastName}
                </TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phoneNumber}</TableCell>
                <TableCell>{student.gender}</TableCell>
                <TableCell>{student.className}</TableCell>

                <TableCell>{new Date(student.dateOfBirth).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(student.enrollmentDate).toLocaleDateString()}</TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    color={student.isActive ? "success" : "destructive"}
                  >
                    {student.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <input
                    type="checkbox"
                    checked={selectedStudents.some(
                      (s) => s.studentId === student.studentId
                    )}
                    onChange={() => handleCheckboxChange(student)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ClassStudentListTable;
