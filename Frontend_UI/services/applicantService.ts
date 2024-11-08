import { api } from "@/config/axios.config";
import { ApiResponse } from "./apiResponse";

export interface ApplicantApplicationDetail {
  // Application Details
  applicationId: number;
  applicantId: number;
  applicationStatus: string;
  campusId: number;
  campusName: string;
  admissionDecisionDate?: string; // DateOnly in C#, use string or Date in TypeScript
  remarks?: string;

  // Applied Class Details
  appliedClassId: number;
  appliedClassName: string;

  // Last Attended Class Details
  lastClassId: number;
  lastAttendedClassName: string;

  // Applicant Personal Details
  firstName: string;
  lastName: string;
  formBNumber: string;
  dateOfBirth: string | Date; // Use string or Date based on your needs
  email: string;
  gender: string;
  motherTounge: string;
  applicantAddress: string;
  phoneNumber: string;
  residenceStatus: string;
  city: string;
  states: string;
}

// Mapping function to create DTO
const mapFormDataToDto = (data: any) => {
  const applicantData = {
    firstName: data.firstName,
    lastName: data.lastName,
    formBNumber: data.formBNumber,
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
    email: data.email,
    applicantAddress: data.applicantAddress,
    residenceStatus: data.residenceStatus,
    city: data.city,
    motherTounge: data.motherTounge,
    states: data.states,
    lastClassId: data.lastClassId,
    phoneNumber: data.phoneNumber,
  };

  const applicationData = {
    campusId: data.campusId,
    admissionClassId: data.admissionClassId,
    applicationId: data.applicationId,
    applicationStatus: data.applicationStatus,
    admissionDecisionDate: data.admissionDecisionDate,
    remarks: data.remarks,
    isActive: data.isActive,
  };

  // Create the DTO object with separate Applicant and Application data
  const dto = {
    Applicant: applicantData,
    Application: applicationData,
  };

  return dto;
};
//export interface ApplicantAdmissionDTO extends ApplicantData, ApplicationData {}

const BASE_URL = "/Applicant";

export const getApplicants = async (): Promise<ApiResponse> => {
  try {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      throw new Error("No authentication token found. Please log in.");
    }
    const response = await api.get<ApiResponse>(BASE_URL + "/GetAllApplicants",
      {headers: {
        Authorization: `Bearer ${authToken}`,
      },}
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching Applicants:", error);
    throw error;
  }
};

export const addApplicant = async (dto: any): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(
      BASE_URL + "/AddApplicant",
      mapFormDataToDto(dto)
    );
    return response.data;
  } catch (error: any) {
    console.error("Error adding applicant:", error);
    throw error;
  }
};
export const updateApplicant = async (
  dto: any
): Promise<ApiResponse> => {
  try {
    console.log(dto);
    
    const response = await api.put<ApiResponse>(
      `${BASE_URL}/UpdateApplicant`,
      mapFormDataToDto(dto)
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

export const applicationStatus = async (id: number, status: string): Promise<ApiResponse> => {
  try {
    const app = {
      applicationId: id,
      applicationStatus: status
    }
    const response = await api.put<ApiResponse>(
      `${BASE_URL}/ApplicationStatus`,
      app
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to Update Application Status`);
  }
}