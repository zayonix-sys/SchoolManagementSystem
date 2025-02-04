"use client";
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {  useFetchExamResultsByClassQuery } from '@/services/apis/examResultService';

interface ExamResultData {
  grNo: number;
  firstName: string;
  lastName: string;
  totalMarks: number;
  marksObtained: number;
  examDetails: {
    studentId: number;
    marksObtained: number;
  }[];
}
interface GradesProps {
  refetch: () => void;
  classId: number | null;
}


const StudentGrade: React.FC<GradesProps> = ({ classId, refetch }) => {
  const { data, refetch: examResultRefetch } = useFetchExamResultsByClassQuery(classId);
  const examResultData = data?.data as ExamResultData[];
  
  // Group results by student (using grNo as unique identifier)
  const uniqueStudents = examResultData?.reduce((acc, result) => {
    if (!acc[result.grNo]) {
      acc[result.grNo] = {
        grNo: result.grNo,
        firstName: result.firstName,
        lastName: result.lastName,
        examDetails: [],
        totalMarks: 0,
        marksObtained: 0
      };
    }
    
    // Accumulate total marks and obtained marks for each student
    acc[result.grNo].totalMarks += result.totalMarks || 0;
    acc[result.grNo].marksObtained += result.examDetails?.[0]?.marksObtained || 0;
    acc[result.grNo].examDetails.push(...(result.examDetails || []));
    
    return acc;
  }, {} as Record<string, any>) || {};

  const uniqueExamResults = Object.values(uniqueStudents);

  const calculateGrade = (percentage: number): string => {
    if (percentage >= 95) return "A++";
    if (percentage >= 90) return "A+";
    if (percentage >= 85) return "A";
    if (percentage >= 80) return "B++";
    if (percentage >= 75) return "B+";
    if (percentage >= 70) return "B";
    if (percentage >= 60) return "C";
    if (percentage >= 50) return "D";
    if (percentage >= 40) return "E";
    return "Fail";
  };

  return (
    <div className="p-6">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>GR No.</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Total Marks</TableHead>
              <TableHead>Obtained Marks</TableHead>
              <TableHead>Percentage</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {uniqueExamResults.map((result) => {
              const percentage = result.totalMarks
                ? ((result.marksObtained / result.totalMarks) * 100).toFixed(2)
                : '0.00';

              const overallPercentage = parseFloat(percentage);
              const grade = calculateGrade(overallPercentage);
              const status = overallPercentage >= 40 ? 'Pass' : 'Fail';

              return (
                <TableRow key={result.grNo}>
                  <TableCell>{result.grNo}</TableCell>
                  <TableCell>{result.firstName} {result.lastName}</TableCell>
                  <TableCell>{result.totalMarks}</TableCell>
                  <TableCell>{result.marksObtained}</TableCell>
                  <TableCell>{percentage}%</TableCell>
                  <TableCell>{grade}</TableCell>
                  <TableCell
                    className={`font-medium ${
                      status === 'Pass' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {status}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StudentGrade;
