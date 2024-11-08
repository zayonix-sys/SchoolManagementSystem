"use client";
import { api } from "@/config/axios.config";
import { ApiResponse } from "./apiResponse";

export interface UserData {
  userId: number;
  userName: string;
  passwordHash?: string;
  roleId?: number;
  roleName?: string;
  campusId?: number;
  createdAt: Date;
}

const BASE_URL = "/UserAccount";

export const addUser = async (userData: UserData): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(`${BASE_URL}/Register`, userData);
    return response.data;
  } catch (error) {
    console.error("Failed to Register:", error);
    throw new Error("Failed to register");
  }
};
export const updateUser = async (userData: UserData): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>(
      `${BASE_URL}/UpdateUser`,
      userData
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to update user`, error);
    throw new Error(`Failed to update user`);
  }
};

export const deleteUser = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await api.delete<ApiResponse>(
      `${BASE_URL}/DeleteUser?userId=${id}`
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to delete user `, error);
    throw new Error(`Failed to delete user`);
  }
};

export const Login = async (userData: UserData): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(`${BASE_URL}/Login`, userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to login:", error);
    throw new Error("Failed to login");
  }
};

export const fetchAllUser = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get<ApiResponse>(`${BASE_URL}/GetAllUsers`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Users:", error);
    throw new Error("Failed to fetch Users");
  }
};
