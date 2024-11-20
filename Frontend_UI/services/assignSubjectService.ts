"use client";
import { api } from "@/config/axios.config";
import { ApiResponse } from "./apis/apiResponse";

export interface AssignSubjectData {
  classSubjectId?: number;
  classId?: number;
  subjectIds?: number[]; 
  isActive?: boolean;
  subjectName?: string;
  subjects?: string[];
}

const BASE_URL = "/ClassSubjectAssignment";

export const fetchAssignSubject = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get<ApiResponse>(
      `${BASE_URL}/GetAllClassSubjectAssignment`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch class subject assignments:", error);
    throw new Error("Failed to fetch class subject assignments");
  }
};

export const addClassSubjectAssignment = async (
  AssignSubjectData: AssignSubjectData
): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(
      `${BASE_URL}/AddClassSubjectAssignment`,
      AssignSubjectData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to assign subjects to class:", error);
    throw new Error("Failed to assign subjects to class");
  }
};

export const updateClassSubjectAssignment = async (
  AssignSubjectData: AssignSubjectData
): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>(
      `${BASE_URL}/UpdateClassSubjectAssignment`,
      AssignSubjectData
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to update class subject Assignment`, error);
    throw new Error(`Failed to update class subject Assignment`);
  }
};

export const deleteClassSubjectAssignment = async (
  id: number
): Promise<ApiResponse> => {
  try {
    const response = await api.delete<ApiResponse>(
      `${BASE_URL}/DeleteClassSubjectAssignment?classId=${id}`
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to delete class subject assignment `, error);
    throw new Error(`Failed to delete class subject assignment`);
  }
};
