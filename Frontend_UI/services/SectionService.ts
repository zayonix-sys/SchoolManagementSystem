import { api } from "@/config/axios.config";
import { ApiResponse } from "./apiResponse";

export interface SectionData {
  sectionId?: number; // Corresponds to SectionId in the entity
  sectionName: string; // Corresponds to Section Name in the entity
  capacity: number; // Corresponds to Capacity in the entity
  classId?: number; // Corresponds to ClassId in the entity
  className?: string; // Corresponds to ClassName in the entity
  createdAt?: Date; // Corresponds to CreatedAt in the entity
  createdBy?: number; // Corresponds to CreatedBy in the entity
  updatedBy?: number; // Corresponds to UpdatedBy in the entity
  updatedAt?: Date; // Corresponds to UpdatedAt in the entity
  isActive?: boolean; // Corrected typo from 'isActice' to 'isActive'
}

const BASE_URL = "/Section";

export const fetchSection = async (): Promise<ApiResponse> => {
  try {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      throw new Error("No authentication token found. Please log in.");
    }
    const response = await api.get<ApiResponse>(`${BASE_URL}/GetSection`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Section:", error);
    throw new Error("Failed to fetch Section");
  }
};

export const fetchSectionById = async (id: number): Promise<SectionData> => {
  try {
    const response = await api.get<SectionData>(`${BASE_URL}/GetSectionById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch section with ID ${id}:`, error);
    throw new Error(`Failed to fetch section with ID ${id}`);
  }
};

export const addSection = async (sectionData: SectionData): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(
      `${BASE_URL}/AddSection`,
      sectionData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add section:", error);
    throw new Error("Failed to add section");
  }
};

export const updateSection = async (
  sectionData: SectionData
): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>(
      `${BASE_URL}/UpdateSection`,
      sectionData
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to update class`, error);
    throw new Error(`Failed to update class`);
  }
};

export const deleteSection = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await api.delete<ApiResponse>(
      `${BASE_URL}/DeleteSection?sectionId=${id}`
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to delete section `, error);
    throw new Error(`Failed to delete section`);
  }
};

