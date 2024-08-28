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
    applicationDate: string;
    lastClassId: number;
    admissionClassId: number;
    languages: string;
    residenceStatus: string;
    states: string;
    city: string;
    phoneNumber: string;
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
  applicantData: ApplicantData
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
