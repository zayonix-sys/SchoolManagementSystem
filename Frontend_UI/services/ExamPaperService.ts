"use client";
import { api } from "@/config/axios.config";
import { ApiResponse } from "./apis/apiResponse";

export interface ExamData {
  examPaperId?: number;
  examPaperIds?: number[];
  classId: number;
  subjectId: number;
  questionIds: number[];
  questions?: string;
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

const BASE_URL = "/ExamPapers";

export const fetchExamPapers = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get<ApiResponse>(`${BASE_URL}/GetAllExamPapers`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch exam papers:", error);
    throw new Error("Failed to fetch exam papers");
  }
};

export const addExamPaper = async (
  ExamData: ExamData
): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(
      `${BASE_URL}/AddExamPapers`,
      ExamData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add Exam Paper:", error);
    throw new Error("Failed to add Exam Paper");
  }
};

export const updateExamPaper = async (
  ExamData: ExamData
): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>(
      `${BASE_URL}/UpdateExamPaper`,
      ExamData
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to update Exam Paper`, error);
    throw new Error(`Failed to update Exam Paper`);
  }
};

export const deleteExamPaper = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await api.delete<ApiResponse>(
      `${BASE_URL}/DeleteExamPaper?exampaperId=${id}`
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to delete Exam Paper `, error);
    throw new Error(`Failed to delete Exam Paper`);
  }
};
