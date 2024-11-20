"use client";
import { api } from "@/config/axios.config";
import { ApiResponse } from "./apis/apiResponse";

export interface PeriodsData {
  periodId?: number;
  periodName: string;
  startTime: string;
  endTime: string;
  isActive?: boolean;
}

const BASE_URL = "/Period";

export const fetchPeriods = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get<ApiResponse>(`${BASE_URL}/GetAllPeriods`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Periods:", error);
    throw new Error("Failed to fetch Periods");
  }
};

export const addPeriod = async (
  PeriodsData: PeriodsData
): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(
      `${BASE_URL}/AddPeriod`,
      PeriodsData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add Period:", error);
    throw new Error("Failed to add new Period");
  }
};

export const updatePeriod = async (
  PeriodsData: PeriodsData
): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>(
      `${BASE_URL}/UpdatePeriod`,
      PeriodsData
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to update Period`, error);
    throw new Error(`Failed to update Period`);
  }
};

export const deletePeriod = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await api.delete<ApiResponse>(
      `${BASE_URL}/DeletePeriod?periodId=${id}`
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to delete Period `, error);
    throw new Error(`Failed to delete Period`);
  }
};
