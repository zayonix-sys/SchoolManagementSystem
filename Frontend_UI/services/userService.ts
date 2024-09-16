"use client";
import { api } from "@/config/axios.config";
import { ApiResponse } from "./apiResponse";

export interface UserData {
  userId?: number;
  userName: string;
  password: string;
}

const BASE_URL = "/UserAccount";

export const register = async (userData: UserData): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(
      `${BASE_URL}/Register`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to Register:", error);
    throw new Error("Failed to register");
  }
};

export const Login = async (userData: UserData): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(
      `${BASE_URL}/Login`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to login:", error);
    throw new Error("Failed to login");
  }
};
