"use client";
import { api } from "@/config/axios.config";
import { ApiResponse } from "./apiResponse";

export interface StudentData {
  studentId: number;
  grNo: number;
  firstName?: string;
  lastName?: string;
  profileImage?: string | null;
  email?: string;
  gender?: string;
  phoneNumber?: string;
  dateOfBirth: string | Date;
  enrollmentDate: Date;
  className?: string;
  classId?: number;
  campusId?: number;
  isActive: boolean;
}

const BASE_URL = "/Students";

export const getStudentByClassWise = async (
  Id: number | null
): Promise<ApiResponse> => {
  try {
    const response = await api.get<ApiResponse>(
      `${BASE_URL}/GetStudentsClassWise?classId=${Id}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Student of Class:", error);
    throw new Error("Failed to fetch Class wise Student");
  }
};


export const updateStudent = async (StudentData: StudentData): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>(
      `${BASE_URL}/UpdateStudentData`,
      StudentData
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to update Student`, error);
    throw new Error(`Failed to update Student`);
  }
};

export const deleteStudent = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await api.delete<ApiResponse>(
      `${BASE_URL}/DeleteStudent?studentId=${id}`
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to delete Student`, error);
    throw new Error(`Failed to delete Student`);
  }
};