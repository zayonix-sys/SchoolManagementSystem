"use client";
import { api } from "@/config/axios.config";
import { ApiResponse } from "./apis/apiResponse";

export interface SponsorData {
  sponsorId?: number;
  sponsorName?: string;
  email?: string;
  gender?: string;
  phoneNumber?: string;
  country?: string;
  state?: string;
  city?: string;
  occupation?: string;
  postalCode?: number;
  address?: string;
  isActive?: boolean;
}

const BASE_URL = "/Sponsors";

export const fetchSponsor = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get<ApiResponse>(`${BASE_URL}/GetAllSponsors`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Sponsors:", error);
    throw new Error("Failed to fetch Sponsors");
  }
};

export const addSponsor = async (
  SponsorData: SponsorData
): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(
      `${BASE_URL}/AddSponsor`,
      SponsorData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add Sponsor:", error);
    throw new Error("Failed to add Sponsor");
  }
};

export const updateSponsor = async (
  SponsorData: SponsorData
): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>(
      `${BASE_URL}/UpdateSponsor`,
      SponsorData
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to update Sponsor`, error);
    throw new Error(`Failed to update Sponsor`);
  }
};

export const deleteSponsor = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await api.delete<ApiResponse>(
      `${BASE_URL}/DeleteSponsor?sponsorId=${id}`
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to delete Sponsor`, error);
    throw new Error(`Failed to delete Sponsor`);
  }
};
