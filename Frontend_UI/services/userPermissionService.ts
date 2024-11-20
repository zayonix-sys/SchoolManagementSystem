"use client";
import { api } from "@/config/axios.config";
import { ApiResponse } from "./apiResponse";

export interface UserPermissionData {
  permissionId?: number;
  roleId?: number ;
  roleName?: string;
  userId?: number;
  userName?: string;
  entity?: string;
  entities?: any[];
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  createdBy?: number;
  updatedBy?: number;
  isActive?: boolean;
}

const BASE_URL = "/UserPermission";

export const addUserPermission = async (userPermissionData: UserPermissionData): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(`${BASE_URL}/AddUserPermission`, userPermissionData);
    return response.data;
  } catch (error) {
    console.error("Failed to Add User permission:", error);
    throw new Error("Failed to Add User permission");
  }
};

export const getUserPermission = async (): Promise<ApiResponse> => {
  try {
    // const authToken = localStorage.getItem("authToken");

    // if (!authToken) {
    //   throw new Error("No authentication token found. Please log in.");
    // }
    const response = await api.get<ApiResponse>(`${BASE_URL}/GetUserPermissions`,
      {
        // headers: {
        //   Authorization: `Bearer ${authToken}`,
        // },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Permissions:", error);
    throw new Error("Failed to fetch Permissions");
  }
};

export const fetchPermissionByUserId = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await api.get<ApiResponse>(
      `${BASE_URL}/GetUserPermissionByUserId?userId=${id}`
    );    
    return response.data;
  } catch (error: any) {
    console.error(`Failed to fetch user permission by userId`, error);
    throw new Error(`Failed to delete user permission by userId`);
  }
};
