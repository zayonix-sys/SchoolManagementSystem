"use client";
import { api } from "@/config/axios.config";
import { ApiResponse } from "./apiResponse";

export interface ExamPDFData {
  examPaperId?: number;
  classId: number;
  subjectId: number;
  questionIds: number[];
  subjectName?: string;
  className?: string;
  totalMarks: number;
  writtenMarks?: number;
  dictationMarks?: number;
  oralMarks?: number;
  copyMarks?: number;
  termName: string;
  isActive?: boolean;
}

const BASE_URL = "/ExamPaperPDF";

export const fetchExamPaperPDF = async (classId: number, subjectId: number): Promise<ArrayBuffer> => {
  try {
    const response = await api.get<ApiResponse>(`${BASE_URL}/GeneratePdf`, {
      params: {
        classId,
        subjectId
      },
      responseType: 'arraybuffer',
    });
    return response.data as unknown as ArrayBuffer;

  } catch (error) {
    console.error("Failed to fetch Exam Paper PDF:", error);
    throw new Error("Failed to fetch Exam Paper PDF");
  }
};


// export const deleteExamPaper = async (id: number): Promise<ApiResponse> => {
//   try {
//     const response = await api.delete<ApiResponse>(
//       `${BASE_URL}/DeleteExamPaper?exampaperId=${id}`
//     );
//     return response.data;
//   } catch (error: any) {
//     console.error(`Failed to delete Exam Paper `, error);
//     throw new Error(`Failed to delete Exam Paper`);
//   }
// };
