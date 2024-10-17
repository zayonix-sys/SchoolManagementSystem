"use client";
import { api } from "@/config/axios.config";
import { ApiResponse } from "./apiResponse";

export interface ExamScheduleData {
  examId?: number;
  examPaperId: number;
  campusId: number;
  classId: number;
  subjectId: number;
  passingMarks: number;
  campusName?: string;
  className?: string;
  subjectName?: string;
  termName?: string;
  examDate: string;
  startTime: string;
  endTime: string;
  isActive?: boolean;
}

const BASE_URL = "/Exams";

export const fetchExamsSchedule = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get<ApiResponse>(`${BASE_URL}/GetAllExams`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Exams:", error);
    throw new Error("Failed to fetch Exams");
  }
};

export const addExams = async (ExamsData: ExamScheduleData): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(
      `${BASE_URL}/AddExams`,
      ExamsData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add Exams:", error);
    throw new Error("Failed to add Exams");
  }
};

export const updateExam = async (
  ExamsData: ExamScheduleData
): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>(
      `${BASE_URL}/UpdateExam`,
      ExamsData
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to update Exam`, error);
    throw new Error(`Failed to update Exam`);
  }
};

export const deleteExam = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await api.delete<ApiResponse>(
      `${BASE_URL}/DeleteExam?examId=${id}`
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to delete Exam`, error);
    throw new Error(`Failed to delete Exam`);
  }
};
