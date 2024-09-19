"use client";
import { api } from "@/config/axios.config";
import { ApiResponse } from "./apiResponse";

export interface ClassData {
  classId?: number; // Corresponds to ClassId in the entity
  className: string; // Corresponds to ClassName in the entity
  classDescription?: string; // Corresponds to ClassDescription in the entity
  capacity: number; // Corresponds to Capacity in the entity
  createdAt?: Date; // Corresponds to CreatedAt in the entity
  createdBy?: number; // Corresponds to CreatedBy in the entity
  updatedBy?: number; // Corresponds to UpdatedBy in the entity
  updatedAt?: Date; // Corresponds to UpdatedAt in the entity
  isActive?: boolean; // Corrected typo from 'isActice' to 'isActive'
}

const BASE_URL = "/Class";

export const fetchClasses = async (): Promise<ApiResponse> => {
  try {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      throw new Error("No authentication token found. Please log in.");
    }
    const response = await api.get<ApiResponse>(`${BASE_URL}/GetClass`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch classes:", error);
    throw new Error("Failed to fetch classes");
  }
};

export const fetchClassById = async (id: number): Promise<ClassData> => {
  try {
    const response = await api.get<ClassData>(`${BASE_URL}/GetClassById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch class with ID ${id}:`, error);
    throw new Error(`Failed to fetch class with ID ${id}`);
  }
};

export const addClass = async (classData: ClassData): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(
      `${BASE_URL}/AddClass`,
      classData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add class:", error);
    throw new Error("Failed to add class");
  }
};

export const updateClass = async (
  classData: ClassData
): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>(
      `${BASE_URL}/UpdateClass`,
      classData
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to update class`, error);
    throw new Error(`Failed to update class`);
  }
};

export const deleteClass = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await api.delete<ApiResponse>(
      `${BASE_URL}/DeleteClass?classId=${id}`
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to delete class `, error);
    throw new Error(`Failed to delete class`);
  }
};
