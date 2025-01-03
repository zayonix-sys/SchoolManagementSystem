import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
// Define DTO mapping function (reused from service)
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

  return {
    Applicant: applicantData,
    Application: applicationData,
  };
};

export const applicantApi = createApi({
  reducerPath: "applicantApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7242/api/Applicant/",
    prepareHeaders: (headers) => {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        headers.set("Authorization", `Bearer ${authToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getApplicants: builder.query<ApiResponse<ApplicantApplicationDetail[]>, void>({
      query: () => "GetAllApplicants",
    }),
    addApplicant: builder.mutation<ApiResponse<void>, any>({
      query: (dto) => ({
        url: "AddApplicant",
        method: "POST",
        body: mapFormDataToDto(dto),
      }),
    }),
    updateApplicant: builder.mutation<ApiResponse<void>, any>({
      query: (dto) => ({
        url: "UpdateApplicant",
        method: "PUT",
        body: mapFormDataToDto(dto),
      }),
    }),
    deleteApplicant: builder.mutation<ApiResponse<void>, number>({
      query: (id) => ({
        url: `DeleteApplicant?appId=${id}`,
        method: "DELETE",
      }),
    }),
    applicationStatus: builder.mutation<ApiResponse<void>, { id: number; status: string, sectionId: number }>({
        query: ({ id, status, sectionId }) => ({
          url: "ApplicationStatus",
          method: "PUT",
          body: { applicationId: id, applicationStatus: status, sectionId: sectionId},
        }),
      })
  }),
});

export const {
  useGetApplicantsQuery,
  useAddApplicantMutation,
  useUpdateApplicantMutation,
  useDeleteApplicantMutation,
  useApplicationStatusMutation,
} = applicantApi;

export default applicantApi;
