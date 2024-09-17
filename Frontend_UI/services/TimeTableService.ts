"use client";
import { api } from "@/config/axios.config";
import { ApiResponse } from "./apiResponse";

export interface TimeTableData {
  timetableId?: number;
  campusId: number;
  classId: number;
  subjectId: number;
  periodId: number;
  dayOfWeek: string;
  periodName?: string;
  startTime?: string;
  endTime?: string;
  subjectName?: string;
  campusName?: string;
  className?: string;                    
}

const BASE_URL = "/TimeTable";

export const fetchTimeTable = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get<ApiResponse>(`${BASE_URL}/GetTimeTables`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch time tables:", error);
    throw new Error("Failed to fetch time tables");
  }
};

export const addTimeTable = async (TimeTableData: TimeTableData): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(
      `${BASE_URL}/AddTimeTable`,
      TimeTableData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add Time Table:", error);
    throw new Error("Failed to Time Table to class");
  }
};

export const updateTimeTable = async (
  TimeTableData: TimeTableData
): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>(
      `${BASE_URL}/UpdateTimeTable`,
      TimeTableData
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to update Time Table`, error);
    throw new Error(`Failed to update Time Table`);
  }
};

export const deleteTimeTable = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await api.delete<ApiResponse>(
      `${BASE_URL}/DeleteTimeTable?timetableId=${id}`
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to delete Class Time Table `, error);
    throw new Error(`Failed to delete Class Time Table`);
  }
};
