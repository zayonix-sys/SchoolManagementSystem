"use client";
import { api } from "@/config/axios.config";
import { ApiResponse } from "./apiResponse";

export interface AssignClassData {
  assignmentId?: number;
  campusId: number;
  classId: number; // Corresponds to ClassId in the entity
  classroomId: number; // Corresponds to ClassName in the entity
  sectionId: number; // Corresponds to ClassDescription in the entity
  isActive?: boolean;
}

const BASE_URL = "/ClassSectionAssignment";

export const assignClasses = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get<ApiResponse>(`${BASE_URL}/GetAllClassAssignments`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch class assignments:", error);
    throw new Error("Failed to fetch class assignments");
  }
};

export const addClassSectionAssignment = async (AssignClassData: AssignClassData): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(
      `${BASE_URL}/AddClassSectionAssignment`,
      AssignClassData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to assign class:", error);
    throw new Error("Failed to assign class");
  }
};

export const updateClassAssignment = async (
  classAssignmentData: AssignClassData
): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>(
      `${BASE_URL}/UpdateClassSectionAssignment`,
      classAssignmentData
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to update class Assignment`, error);
    throw new Error(`Failed to update class Assignment`);
  }
};

export const deleteClassassignment = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await api.delete<ApiResponse>(
      `${BASE_URL}/DeleteClassSectionAssignment?assignmentId=${id}`
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to delete class assignment `, error);
    throw new Error(`Failed to delete class assignment`);
  }
};
