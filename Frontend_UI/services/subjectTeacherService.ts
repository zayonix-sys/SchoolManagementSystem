import { api } from "@/config/axios.config";
import { ApiResponse } from "./apiResponse";

export interface SubjectTeacherData {
  subjectTeacherId?: number | undefined; 
  employeeId: number;
  employeeRoleName?:string;
  employeeName?:string;
  subjectIds: number[]; 
  subjects?: string[];
  isActive?: boolean; 
}

const BASE_URL = "/SubjectTeacherAssignment";

export const getSubjectTeacher = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get<ApiResponse>(`${BASE_URL}/GetAllSubjectTeacher`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Subject Teacher:", error);
    throw new Error("Failed to fetch Subject Teacher");
  }
};

// export const fetchSubjectById = async (id: number): Promise<ApiResponse> => {
//   try {
//     const response = await api.get<ApiResponse>(`${BASE_URL}/GetSubjectTeacherById/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Failed to fetch Subject with ID ${id}:`, error);
//     throw new Error(`Failed to fetch Subject with ID ${id}`);
//   }
// };

export const addSubjectTeacher = async (subjectTeacherData: SubjectTeacherData): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(
      `${BASE_URL}/AddSubjectTeacher`,
      subjectTeacherData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add Subject Teacher:", error);
    throw new Error("Failed to add Subject Teacher");
  }
};

export const updateSubjectTeacher = async (
  subjectTeacherData: SubjectTeacherData
): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>(
      `${BASE_URL}/UpdateSubjectTeacher`,
      subjectTeacherData
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to update Subject Teacher`, error);
    throw new Error(`Failed to update Subject Teacher`);
  }
};

export const deleteSubjectTeacher = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await api.delete<ApiResponse>(
      `${BASE_URL}/DeleteSubjectTeacher?employeeId=${id}`
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to delete Subject Teacher`, error);
    throw new Error(`Failed to delete Subject Teacher`);
  }
};

