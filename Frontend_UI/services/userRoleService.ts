"use client";
import { api } from "@/config/axios.config";
import { ApiResponse } from "./apiResponse";

export interface UserRoleData {
  roleId?: number; 
  roleName: string;
  roleDescription?: string;
  createdAt?: Date; 
  createdBy?: number;
  updatedBy?: number;
  updatedAt?: Date; 
  isActive?: boolean; 
}

const BASE_URL = "/UserRoles";

export const getUserRoles = async (): Promise<ApiResponse> => {
  try {
    // const authToken = localStorage.getItem("authToken");

    // if (!authToken) {
    //   throw new Error("No authentication token found. Please log in.");
    // }
    const response = await api.get<ApiResponse>(`${BASE_URL}/GetUserRoles`);
    //   {headers: {
    //     Authorization: `Bearer ${authToken}`,
    //   },}
    // );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Roles:", error);
    throw new Error("Failed to fetch roles");
  }
};

export const getUserRoleById = async (id: number): Promise<UserRoleData> => {
  try {
    const response = await api.get<UserRoleData>(`${BASE_URL}/GetRoleById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch role with ID ${id}:`, error);
    throw new Error(`Failed to fetch role with ID ${id}`);
  }
};

export const addUserRole = async (userRoleData: UserRoleData): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(
      `${BASE_URL}/AddUserRole`,
      userRoleData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add role:", error);
    throw new Error("Failed to add role");
  }
};

export const updateUserRole = async (
  userRoleData: UserRoleData
): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>(
      `${BASE_URL}/UpdateUserRoles`,
      userRoleData
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to update role`, error);
    throw new Error(`Failed to update role`);
  }
};

export const deleteUserRole = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await api.delete<ApiResponse>(
      `${BASE_URL}/DeleteUserRole?roleId=${id}`
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to delete role `, error);
    throw new Error(`Failed to delete role`);
  }
};
