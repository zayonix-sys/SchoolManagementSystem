import { api } from "@/config/axios.config";

export interface CampusData {
  campusId?: number
  campusName: string
  address: string
  country?: string
  state?: string
  city?: string
  postalCode?: string
  phoneNumber?: string
  email?: string
}

interface ApiResponse
{
  success: boolean
  data: CampusData | CampusData[]
  errors:[]
  message: string
}

const BASE_URL = "/campuses";

export const getCampuses = async (): Promise<ApiResponse> => {
  try
  {
    const response = await api.get<ApiResponse>(BASE_URL + "/GetCampuses");
    return response.data; 
  }
  catch (error: any)
  {
    console.error("Error fetching campuses:", error);
    throw error;
  }
};

export const addCampus = async (campusData: CampusData): Promise<ApiResponse> => {
  try
  {
    const response = await api.post<ApiResponse>(BASE_URL+"/AddCampus", campusData);
    return response.data;
  }
  catch (error: any)
  {
    console.error("Error adding campus:", error);
    throw error;
  }
};

export const updateCampus = async (campusData: CampusData): Promise<ApiResponse> => {
  try
  {
    const response = await api.put<ApiResponse>(`${BASE_URL}/UpdateCampus`, campusData);
    return response.data;
  }
  catch (error: any)
  {
    console.error("Error updating campus:", error);
    throw error;
  }
};


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
