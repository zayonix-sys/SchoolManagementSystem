"use client";
import { api } from "@/config/axios.config";
import { ApiResponse } from "./apiResponse";

export interface RoleData {
  roleId?: number; // Corresponds to ClassId in the entity
  roleName: string; // Corresponds to ClassName in the entity
  roleDescription?: string; // Corresponds to ClassDescription in the entity
  createdAt?: Date; // Corresponds to CreatedAt in the entity
  createdBy?: number; // Corresponds to CreatedBy in the entity
  updatedBy?: number; // Corresponds to UpdatedBy in the entity
  updatedAt?: Date; // Corresponds to UpdatedAt in the entity
  isActive?: boolean; // Corrected typo from 'isActice' to 'isActive'
}

const BASE_URL = "/EmployeeRoles";

export const getRoles = async (): Promise<ApiResponse> => {
  try {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      throw new Error("No authentication token found. Please log in.");
    }
    const response = await api.get<ApiResponse>(`${BASE_URL}/GetRoles`,
      {headers: {
        Authorization: `Bearer ${authToken}`,
      },}
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Roles:", error);
    throw new Error("Failed to fetch roles");
  }
};

export const getRoleById = async (id: number): Promise<RoleData> => {
  try {
    const response = await api.get<RoleData>(`${BASE_URL}/GetRoleById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch role with ID ${id}:`, error);
    throw new Error(`Failed to fetch role with ID ${id}`);
  }
};

export const addRole = async (roleData: RoleData): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(
      `${BASE_URL}/AddRole`,
      roleData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add role:", error);
    throw new Error("Failed to add role");
  }
};

export const updateRole = async (
  roleData: RoleData
): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>(
      `${BASE_URL}/UpdateRoles`,
      roleData
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to update role`, error);
    throw new Error(`Failed to update role`);
  }
};

export const deleteRole = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await api.delete<ApiResponse>(
      `${BASE_URL}/DeleteRole?roleId=${id}`
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to delete role `, error);
    throw new Error(`Failed to delete role`);
  }
};
