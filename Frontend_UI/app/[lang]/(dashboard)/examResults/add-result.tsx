import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useFetchExamPapersQuery, ExamPaperData } from "@/services/apis/examPaperService";
import { useAddExamResultMutation } from "@/services/apis/examResultService";

const examDetailsSchema = z.object({
  studentId: z.coerce.number().optional(),
  examPaperId: z.coerce.number().optional(),
  marksObtained: z.coerce.number().optional(),
  totalMarksObtained: z.coerce.number().optional(),
  percentage: z.coerce.number().optional(),
  grade: z.string().optional(),
});

const examResultsSchema = z.object({
  examResultId: z.coerce.number().optional(),
  examDetails: z.array(examDetailsSchema),
  isActive: z.boolean().optional().default(true),
});

interface DataProps {
  studentId: number;
  classId: number;
  dialogType: "add";
  onClose: () => void;
  refetch: () => void;
}

type ExamsResultsFormValues = z.infer<typeof examResultsSchema>;

const AddResult = ({ studentId, classId, onClose, refetch, dialogType }: DataProps) => {
  const { data: examPapers } = useFetchExamPapersQuery();
  const [addExamResults] = useAddExamResultMutation();
  const { register, handleSubmit, watch, setValue, reset } = useForm<ExamsResultsFormValues>({
    resolver: zodResolver(examResultsSchema),
  });

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
    return "U";
  };

  const examPaper = examPapers?.data as ExamPaperData[] || [];

  const examPaperData = (() => {
    const filteredData = examPaper.filter((item) => item.classId === classId) || [];
  
    const uniqueSubjects = new Map<number, ExamPaperData>();
    
    filteredData.forEach((item) => {
      if (!uniqueSubjects.has(item.subjectId)) {
        uniqueSubjects.set(item.subjectId, item);
      }
    });
  
    return Array.from(uniqueSubjects.values());
  })();

  const grandTotal = examPaperData.reduce((sum, item) => sum + item.totalMarks, 0);

  const marksObtainedArray = watch("examDetails")?.map((detail) => detail.marksObtained || 0) || [];

  const totalMarksObtained = marksObtainedArray.reduce((sum, marks) => sum + Number(marks), 0);

  const overallPercentage = grandTotal > 0 ? parseFloat(((totalMarksObtained / grandTotal) * 100).toFixed(2)) : 0;
  const overallGrade = calculateGrade(overallPercentage); 

  const onSubmit: SubmitHandler<ExamsResultsFormValues> = async (data) => {
    const examDetailsPayload = examPaperData.map((item, index) => {
      const marksObtained = data.examDetails[index]?.marksObtained || 0;

      return {
        studentId,
        examPaperId: item.examPaperId,
        totalMarksObtained: totalMarksObtained,
        marksObtained,
        percentage: overallPercentage,
        grade: overallGrade,
      };
    });

    const finalData = {
      ...data,
      examDetails: examDetailsPayload,
    };

    try {
      const response = await addExamResults(finalData);
      if (response.data?.success) {
        toast.success("Exam Results saved successfully!");
        reset();
        refetch();
        onClose();
      } else {
        toast.error(`Error: ${response.data?.message || "Something went wrong"}`);
      }
    } catch (error) {
      toast.error("Request failed");
    }
  };

  return (
    <Dialog open={dialogType === "add"} onOpenChange={onClose}>
      <DialogContent
        style={{ width: "100%", maxWidth: "800px" }} // Set custom dimensions
        className="max-w-screen-md mx-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">Add Results</DialogTitle>
          <DialogClose onClick={onClose} />
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject Name</TableHead>
                <TableHead>Total Marks</TableHead>
                <TableHead>Marks Obtained</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {examPaperData.map((item, index) => (
                <TableRow key={item.examPaperId}>
                  <TableCell>{item.subjectName}</TableCell>
                  <TableCell>{item.totalMarks}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      {...register(`examDetails.${index}.marksObtained`)}
                    />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-bold">Grand Total</TableCell>
                <TableCell className="font-bold">{grandTotal}</TableCell>
                <TableCell className="font-bold">{totalMarksObtained}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Overall Percentage</TableCell>
                <TableCell colSpan={2} className="font-bold">{overallPercentage}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Overall Grade</TableCell>
                <TableCell colSpan={2} className="font-bold">{overallGrade}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button type="submit" className="mt-4">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddResult;
