import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExamResultData, useFetchExamResultsQuery } from "@/services/apis/examResultService";
import EditResult from "./edit-result";
import { useState } from "react";

const examDetailsSchema = z.object({
  studentId: z.coerce.number().optional(),
  marksObtained: z.coerce.number().optional(),
  totalMarksObtained: z.coerce.number().optional(),
  percentage: z.coerce.number().optional(),
  grade: z.string().optional(),
});

const examResultsSchema = z.object({
  examResultId: z.coerce.number().optional(),
  examPaperId: z.coerce.number().optional(),
  examDetails: z.array(examDetailsSchema),
  isActive: z.boolean().optional().default(true),
});

interface DataProps {
  className: string;
  firstName: string;
  lastName: string;
  studentId: number;
  classId: number;
  dialogType: "view";
  onClose: () => void;
  refetch: () => void;
}

const ViewResult = ({ studentId, classId, onClose, refetch, className, firstName, lastName, dialogType }: DataProps) => {
  const [selectedStudent, setSelectedStudent] = useState<{ studentId: number; classId: number} | null>(null);
  const { data: examResult, isLoading, isSuccess, isError, error, refetch: refetchResults } = useFetchExamResultsQuery();
  const examResultData = examResult?.data as ExamResultData[] || [];
  
  const examResults = examResultData.filter((item) => item.examDetails?.some((detail) => detail.studentId === studentId));

  const marksObtained = examResults.find((item) => item.examDetails?.find((detail) => detail.marksObtained !== null));

  const marks = examResults.find((item) => item.examDetails?.find((detail) => detail.totalMarksObtained !== null));

  const percentage = examResults.find((item) => item.examDetails?.find((detail) => detail.percentage !== null));

  const grade = examResults.find((item) => item.examDetails?.find((detail) => detail.grade !== null));
  
  const handleEditResult = (studentId: number, classId: number) => {
    setSelectedStudent({ studentId, classId});
  };

  const handleCloseAddDialog = () => {
    setSelectedStudent(null);
    onClose();
  };

  const handleRefetch = () => {
    refetchResults();
  }

  return (
    <>
    <Dialog open={dialogType === "view"} onOpenChange={onClose}>
      <DialogContent
        style={{ width: "100%", maxWidth: "800px" }} 
        className="max-w-screen-md mx-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">View Results</DialogTitle>
          <DialogClose onClick={onClose} />
        </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Student Name</TableHead>
                <TableHead className="text-left">Class Name</TableHead>
              </TableRow>

              <TableRow>
                  <TableCell className="font-bold text-left" style={{fontSize: "18px"}}>{firstName}{lastName}</TableCell>
                  <TableCell className="font-bold float-left" style={{fontSize: "18px"}}>{className}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="text-left">Subject Name</TableHead>
                <TableHead className="text-left">Total Marks</TableHead>
                <TableHead>Marks Obtained</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>          
            {examResults.map((item, index) => (
                <TableRow key={item.examDetails?.[0]?.examResultId}>
                  <TableCell>{item.subjectName}</TableCell>
                  <TableCell>{item.totalMarks}</TableCell>
                  <TableCell className="text-center">{item.examDetails?.find((detail) => detail.studentId === studentId)?.marksObtained}</TableCell>
                  <TableCell>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow >
                <TableCell className="font-bold">Total Marks Obtained</TableCell>
                {marks && <TableCell className="font-bold float-left text-lg">{marks.examDetails?.find((detail) => detail.studentId === studentId)?.totalMarksObtained}</TableCell>}
              </TableRow>

              <TableRow >
                <TableCell className="font-bold">Percentage</TableCell>
                {percentage && <TableCell className="font-bold float-left text-lg">{percentage.examDetails?.find((detail) => detail.studentId === studentId)?.percentage}%</TableCell>}
              </TableRow>

              <TableRow >
                <TableCell className="font-bold">Grade</TableCell>
                {grade && <TableCell className="font-bold float-left text-lg">{grade.examDetails?.find((detail) => detail.studentId === studentId)?.grade}</TableCell>}
              </TableRow>
              <Button
                // variant="outline"
                className="mt-4"
                color="primary"
                onClick={() => handleEditResult(studentId, classId ?? 0)}
              >
                Edit Result
             </Button>
            </TableBody>
          </Table>
          
        {/* </form> */}
      </DialogContent>
    </Dialog>
    {selectedStudent && (
      <EditResult 
        className={className}
        firstName={firstName}
        lastName={lastName}
        studentId={selectedStudent?.studentId} 
        classId={selectedStudent?.classId} 
        onClose={handleCloseAddDialog} 
        refetch={handleRefetch}
        examResultData={examResults}
      />
      )}
      </>
  );
};

export default ViewResult;
