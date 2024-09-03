import { api } from "@/config/axios.config";
import { ApiResponse } from "./apiResponse";

export interface EmployeesData {
  employeeId?: number;
  roleId?: number;
  roleName?: string;
  campusId?: number;
  campusName?: string;
  departmentId?: number;
  departmentName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  hireDate?: string; // or Date if you want to use Date objects
  address?: string;
  emergencyContact?: string;
  qualifications?: string;
  createdAt?: string; // or Date
  createdBy?: string;
  updatedAt?: string; // or Date
  updatedBy?: string;
  isActive?: boolean;
}

const BASE_URL = "/Employee";

export const fetchEmployees = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get<ApiResponse>(`${BASE_URL}/GetEmployees`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Employees:", error);
    throw new Error("Failed to fetch Employees");
  }
};

export const fetchEmployeeById = async (id: number): Promise<EmployeesData> => {
  try {
    const response = await api.get<EmployeesData>(
      `${BASE_URL}/GetEmployeeById/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Employee with ID ${id}:`, error);
    throw new Error(`Failed to fetch Employee with ID ${id}`);
  }
};

export const addEmployee = async (
  EmployeeData: EmployeesData
): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(
      `${BASE_URL}/AddEmployee`,
      EmployeeData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add Employee:", error);
    throw new Error("Failed to add Employee");
  }
};

export const updateEmployee = async (
  EmployeeData: EmployeesData
): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>(
      `${BASE_URL}/UpdateEmployee`,
      EmployeeData
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to update Employee`, error);
    throw new Error(`Failed to update Employee`);
  }
};

export const deleteEmployee = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await api.delete<ApiResponse>(
      `${BASE_URL}/DeleteEmployee?employeeId=${id}`
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to delete Employee `, error);
    throw new Error(`Failed to delete Employee`);
  }
};
