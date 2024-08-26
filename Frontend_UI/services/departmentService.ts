import { api } from "@/config/axios.config";
import { CampusData } from "./campusService";
import { ApiResponse } from "./apiResponse";

export interface DepartmentData {
  departmentId?: number | null;
  campusId?: number;
  campusName?: string | undefined;
  departmentName: string;
  description?: string;
  isActive?: true;
  campus?: CampusData;
}

const BASE_URL = "/Departments";

export const addDepartment = async (
  departmentData: DepartmentData
): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(
      BASE_URL + "/AddDepartment",
      departmentData
    );
    return response.data;
  } catch (error: any) {
    console.error("Error adding department:", error);
    throw error;
  }
};

export const updateDepartment = async (
  DepartmentData: DepartmentData
): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>(
      `${BASE_URL}/UpdateDepartment`,
      DepartmentData
    );
    return response.data;
  } catch (error: any) {
    console.error("Error updating department:", error);
    throw error;
  }
};

// export const getDepartments = async (
//   campusId: number
// ): Promise<ApiResponse> => {
//   try {
//     const response = await api.get<ApiResponse>(
//       BASE_URL + `/GetDepartments/${campusId}`
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const getDepartmentById = async (id: number | undefined) => {
  try {
    const response = await api.get<DepartmentData>(
      `${BASE_URL}/GetDepartmentById/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Department by ID:", error);
    throw error;
  }
};

export const deleteDepartment = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await api.delete<ApiResponse>(`${BASE_URL}/DeleteDepartment/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error deleting department:", error);
    throw error;
  }
};
