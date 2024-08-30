import { api } from "@/config/axios.config";
import { ApiResponse } from "./apiResponse";

export interface ApplicantData {
  firstName: string;
  lastName: string;
  formBNumber: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  applicantAddress: string;
  nationality: string;
  lastClassId: number;
  admissionClassId: number;
  campusId: number;
  motherTounge: string;
  residenceStatus: string;
  states: string;
  city: string;
  phoneNumber: string;
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

const BASE_URL = "/applicant";

// export const getCampuses = async (): Promise<ApiResponse> => {
//   try {
//     const response = await api.get<ApiResponse>(BASE_URL + "/GetCampuses");
//     return response.data;
//   } catch (error: any) {
//     console.error("Error fetching campuses:", error);
//     throw error;
//   }
// };

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

// export const updateCampus = async (
//   campusData: CampusData
// ): Promise<ApiResponse> => {
//   try {
//     const response = await api.put<ApiResponse>(
//       `${BASE_URL}/UpdateCampus`,
//       campusData
//     );
//     return response.data;
//   } catch (error: any) {
//     console.error("Error updating campus:", error);
//     throw error;
//   }
// };

// Other commits

// export const fetchClassById = async (id: number): Promise<ClassroomData> => {
//   try {
//     const response = await api.get<ClassroomData>(`/classroom/${id}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateClass = async (id: number, classroomData: ClassroomData): Promise<ClassroomData> => {
//   try {
//     const response = await api.put<ClassroomData>(`/classroom/${id}`, classroomData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const deleteClass = async (id: number): Promise<void> => {
//   try {
//     await api.delete(`/classroom/${id}`);
//   } catch (error) {
//     throw error;
//   }
// };
