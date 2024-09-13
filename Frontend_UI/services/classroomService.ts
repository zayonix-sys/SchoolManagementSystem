"use client";
import { api } from "@/config/axios.config";
import { ApiResponse } from "./apiResponse";

export interface ClassroomData {
  classroomId?: number; // Corresponds to ClassId in the entity
  campusId?: number;
  roomNumber: string; // Corresponds to ClassName in the entity
  building: string; // Corresponds to ClassDescription in the entity
  capacity: number; // Corresponds to Capacity in the entity
  createdAt?: Date; // Corresponds to CreatedAt in the entity
  createdBy?: number; // Corresponds to CreatedBy in the entity
  updatedBy?: number; // Corresponds to UpdatedBy in the entity
  updatedAt?: Date; // Corresponds to UpdatedAt in the entity
  isActive?: boolean; // Corrected typo from 'isActice' to 'isActive'
}

const BASE_URL = "/Classroom";

export const fetchClassrooms = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get<ApiResponse>(`${BASE_URL}/GetClassroom`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch classroom:", error);
    throw new Error("Failed to fetch classroom");
  }
};

export const fetchClassroomById = async (id: number): Promise<ClassroomData> => {
  try {
    const response = await api.get<ClassroomData>(`${BASE_URL}/GetClassroomById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch classroom with ID ${id}:`, error);
    throw new Error(`Failed to fetch classroom with ID ${id}`);
  }
};

export const addClassroom = async (classroomData: ClassroomData): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(
      `${BASE_URL}/AddClassroom`,
      classroomData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add classroom:", error);
    throw new Error("Failed to add classroom");
  }
};

export const updateClassroom = async (
  classroomData: ClassroomData
): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>(
      `${BASE_URL}/UpdateClassroom`,
      classroomData
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to update classroom`, error);
    throw new Error(`Failed to update classroom`);
  }
};

export const deleteClassroom = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await api.delete<ApiResponse>(
      `${BASE_URL}/DeleteClassroom?classroomId=${id}`
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to delete classroom `, error);
    throw new Error(`Failed to delete classroom`);
  }
};
