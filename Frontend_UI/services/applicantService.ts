import { api } from "@/config/axios.config";
import { ApiResponse } from "./apiResponse";

export interface ApplicantData {
  applicantId?:number;
  firstName: string;
  lastName: string;
  formBNumber: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  applicantAddress: string;
  nationality?: string;
  lastClassId?: number;
  admissionClassId?: number;
  campusId?: number;
  motherTounge: string;
  residenceStatus: string;
  states: string;
  city: string;
  phoneNumber: string;
  applicationStatus:string;
  campusName: string;
  className: string;
  
  createdAt?: Date; // Corresponds to CreatedAt in the entity
  createdBy?: number; // Corresponds to CreatedBy in the entity
  updatedBy?: number; // Corresponds to UpdatedBy in the entity
  updatedAt?: Date; // Corresponds to UpdatedAt in the entity
  isActive?: boolean; // Corrected typo from 'isActice' to 'isActive'
}

export interface ApplicantAdmissionDTO {
  // Applicant Details
  lastClassId?: number;
  admissionClassId?: number;
  firstName: string;
  lastName: string;
  formBNumber: string;
  dateOfBirth?: Date;
  gender: string;
  email: string;
  phoneNumber: string;
  applicantAddress: string;
  residenceStatus: string;
  city: string;
  motherTounge: string;
  states: string;

  // Application Details
  campusId?: number;
  classId?: number;
  applicationStatus?: string;
  admissionDecisionDate?: string;
  remarks?: string;

  // Common Fields
  //createdAt?: Date;
  //createdBy?: number;
  //updatedAt?: Date;
  //updatedBy?: number;
  //isActive?: boolean;
}

const BASE_URL = "/Applicant";

export const getApplicants = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get<ApiResponse>(BASE_URL + "/GetAllApplicants");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching Applicants:", error);
    throw error;
  }
};

export const addApplicant = async (
  applicantData: ApplicantAdmissionDTO
): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(
      BASE_URL + "/AddApplicant",
      applicantData
    );
    return response.data;
  } catch (error: any) {
    console.error("Error adding applicant:", error);
    throw error;
  }
};
export const updateApplicant = async (
  applicantData: ApplicantData
): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>(
      `${BASE_URL}/UpdateApplicant`,
      applicantData
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to update applicant`, error);
    throw new Error(`Failed to update applicant`);
  }
};
export const deleteApplicant = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await api.delete<ApiResponse>(
      `${BASE_URL}/DeleteApplicant?appId=${id}`
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to delete applicant `, error);
    throw new Error(`Failed to delete applicant`);
  }
};
