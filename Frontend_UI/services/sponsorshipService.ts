"use client";
import { api } from "@/config/axios.config";
import { ApiResponse } from "./apiResponse";

export interface SponsorshipData {
  sponsorshipId: number;
  sponsorId:number;
  studentId:number;
  classId:number;
  className?:string;
  studentName?:string;
  sponsorName?:string;
  gender?:string;
  phoneNumber?: string;
  amount?:string;
  frequency?:string;
  startDate?: string;
  isActive?: boolean;      
}

const BASE_URL = "/Sponsorship";

export const fetchSponsorship = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get<ApiResponse>(`${BASE_URL}/GetAllSponsorships`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Sponsorships:", error);
    throw new Error("Failed to fetch Sponsorships");
  }
};

export const addSponsorship = async (SponsorshipData: SponsorshipData): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(
      `${BASE_URL}/AddSponsorship`,
      SponsorshipData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add Sponsorship:", error);
    throw new Error("Failed to add Sponsorship");
  }
};

export const updateSponsorship = async (
  SponsorshipData: SponsorshipData
): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>(
      `${BASE_URL}/UpdateSponsorship`,
      SponsorshipData
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to update Sponsorship`, error);
    throw new Error(`Failed to update Sponsorship`);
  }
};

export const deleteSponsorship = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await api.delete<ApiResponse>(
      `${BASE_URL}/DeleteSponsorship?sponsorshipId=${id}`
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to delete Sponsorship`, error);
    throw new Error(`Failed to delete Sponsorship`);
  }
};
