import { api } from "@/config/axios.config";
import { ApiResponse } from "./apiResponse";
import { DepartmentData } from "./departmentService";

export interface CampusData {
  campusId?: number;
  campusName: string;
  address: string;
  country?: string;
  state?: string;
  city?: string;
  postalCode?: string;
  phoneNumber?: string;
  email?: string;

  departments?: DepartmentData[] | null;
}

const BASE_URL = "/campuses";

export const getCampuses = async (): Promise<ApiResponse> => {
  try {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      throw new Error("No authentication token found. Please log in.");
    }
    const response = await api.get<ApiResponse>(BASE_URL + "/GetCampuses"
      , {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },}
  );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching campuses:", error);
    throw error;
  }
};

export const addCampus = async (
  campusData: CampusData
): Promise<ApiResponse> => {
  try {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      throw new Error("No authentication token found. Please log in.");
    }
    const response = await api.post<ApiResponse>(
      BASE_URL + "/AddCampus",
      campusData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error adding campus:", error);
    throw error;
  }
};

export const updateCampus = async (
  campusData: CampusData
): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>(
      `${BASE_URL}/UpdateCampus`,
      campusData
    );
    return response.data;
  } catch (error: any) {
    console.error("Error updating campus:", error);
    throw error;
  }
};

// export const fetchClassById = async (id: number): Promise<ClassroomData> => {
//   try {
//     const response = await api.get<ClassroomData>(`/classroom/${id}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateClass = async (id: number, classroomData: ClassroomData): Promise<ClassroomData> => {
//   try {
//     const response = await api.put<ClassroomData>(`/classroom/${id}`, classroomData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const deleteCampus = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await api.delete<ApiResponse>(`${BASE_URL}/DeleteCampus/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error deleting campus:", error);
    throw error;
  }
};