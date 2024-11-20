"use client";
import { api } from "@/config/axios.config";
import { ApiResponse } from "./apis/apiResponse";

export interface QuestionsData {
  questionBankId?: number;
  classId: number;
  subjectId: number;
  subjectName?: string;
  className?: string;
  questionType: string;
  questions?: string;
  marks: number;
  isActive?: boolean;
}

const BASE_URL = "/Questions";

export const fetchQuestions = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get<ApiResponse>(`${BASE_URL}/GetAllQuestions`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    throw new Error("Failed to fetch questions");
  }
};

export const addQuestions = async (
  QuestionsData: QuestionsData
): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(
      `${BASE_URL}/AddQuestions`,
      QuestionsData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add Questions:", error);
    throw new Error("Failed to add Questions to bank");
  }
};

export const updateQuestion = async (
  QuestionsData: QuestionsData
): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>(
      `${BASE_URL}/UpdateQuestion`,
      QuestionsData
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to update Question`, error);
    throw new Error(`Failed to update Question`);
  }
};

export const deleteQuestion = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await api.delete<ApiResponse>(
      `${BASE_URL}/DeleteQuestion?questionId=${id}`
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to delete Question `, error);
    throw new Error(`Failed to delete Question`);
  }
};
