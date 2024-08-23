import { api } from "@/config/axios.config";
import { CampusData } from "./campusService";

export interface DepartmentData {
  departmentId?: number | undefined | null
  campusId?: number
  departmentName: string
  description?: string
  isActive?: true 
  campus?: CampusData;
}

const BASE_URL = "/Departments";

export const addDepartment = async (departmentData: DepartmentData): Promise<DepartmentData> => {
  try
  {
    const response = await api.post<DepartmentData>(BASE_URL+"/AddDepartment", departmentData);
    return response.data;
  }
  catch (error)
  {
    throw error;
  }
};

export const getDepartments = async (campusId: number): Promise<DepartmentData[]> => {
  try {
    const response = await api.get<DepartmentData[]>(BASE_URL+`/GetDepartments/${campusId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDepartmentById = async (id: number | undefined) => {
  try {
    const response = await api.get<DepartmentData>(`${BASE_URL}/GetDepartmentById/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Department by ID:", error);
    throw error;
  }
};

