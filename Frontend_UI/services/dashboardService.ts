"use client";
import { api } from "@/config/axios.config";
import { ApiResponse } from "./apis/apiResponse";

export interface DashboardData {
  totalSponsors: number;
  totalEmployees: number;
  totalStudents: number;
  newSponsorsThisMonth: number;
  newEmployeesThisMonth: number;
  newStudentsThisMonth: number;
  sponsorStudent: number;
  maleStudents: number;
  femaleStudents: number;
}

const BASE_URL = "/DashboardCountView";

export const fetchDashobardCount = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get<ApiResponse>(
      `${BASE_URL}/GetDashboardCounts`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch count:", error);
    throw new Error("Failed to fetch count");
  }
};
