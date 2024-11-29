"use client";
import { api } from "@/config/axios.config";
import { ApiResponse } from "./apis/apiResponse";

export interface PaymentData {
  paymentId: number;
  sponsorshipId?: number;
  sponsorId: number;
  sponsorName?: string;
  firstName?: string;
  lastName?: string;
  sponsorshipAmount?: number;
  paymentDate?: string;
  amountPaid?: number;
  paymentMethod?: string;
  isActive?: boolean;
}

const BASE_URL = "/Payment";

export const fetchSponsorPayment = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get<ApiResponse>(`${BASE_URL}/GetAllPayments`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Sponsors Payments:", error);
    throw new Error("Failed to fetch Sponsors Payments");
  }
};

export const addSponsorPayment = async (
  PaymentData: PaymentData
): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(
      `${BASE_URL}/AddPayment`,
      PaymentData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add Sponsor Payment:", error);
    throw new Error("Failed to add Sponsor Payment");
  }
};

export const updateSponsorPayment = async (
  PaymentData: PaymentData
): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>(
      `${BASE_URL}/UpdatePayment`,
      PaymentData
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to update Sponsor`, error);
    throw new Error(`Failed to update Sponsor`);
  }
};

export const deleteSponsorPayment = async (
  id: number
): Promise<ApiResponse> => {
  try {
    const response = await api.delete<ApiResponse>(
      `${BASE_URL}/DeletePayment?paymentId=${id}`
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to delete Sponsor Payment`, error);
    throw new Error(`Failed to delete Sponsor Payment`);
  }
};
