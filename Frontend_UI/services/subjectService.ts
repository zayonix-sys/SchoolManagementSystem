import { api } from "@/config/axios.config";
import { ApiResponse } from "./apiResponse";

export interface SubjectData {
  subjectId?: number; 
  subjectName: string; 
  subjectDescription?: string; 
  isActive?: boolean; 
}

const BASE_URL = "/Subject";

export const fetchSubject = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get<ApiResponse>(`${BASE_URL}/GetSubject`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Subject:", error);
    throw new Error("Failed to fetch Subject");
  }
};

export const fetchSubjectById = async (id: number): Promise<SubjectData> => {
  try {
    const response = await api.get<SubjectData>(`${BASE_URL}/GetSubjectById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Subject with ID ${id}:`, error);
    throw new Error(`Failed to fetch Subject with ID ${id}`);
  }
};

export const addSubject = async (subjectData: SubjectData): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(
      `${BASE_URL}/AddSubject`,
      subjectData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add Subject:", error);
    throw new Error("Failed to add Subject");
  }
};

export const updateSubject = async (
  SubjectData: SubjectData
): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>(
      `${BASE_URL}/UpdateSubject`,
      SubjectData
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to update Subject`, error);
    throw new Error(`Failed to update Subject`);
  }
};

export const deleteSubject = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await api.delete<ApiResponse>(
      `${BASE_URL}/DeleteSubject?subjectId=${id}`
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to delete Subject `, error);
    throw new Error(`Failed to delete Subject`);
  }
};

