"use client";
import { api } from "@/config/axios.config";
import { ApiResponse } from "./apiResponse";

export interface ClassData {
  classId?: number; 
  className: string;
  classDescription?: string;
  capacity: number;
  createdAt?: Date; 
  createdBy?: number;
  updatedBy?: number;
  updatedAt?: Date; 
  isActive?: boolean;
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
