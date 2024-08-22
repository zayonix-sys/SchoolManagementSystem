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

const BASE_URL = "/campuses";

export const addCampus = async (campusData: CampusData): Promise<CampusData> => {
  try
  {
    const response = await api.post<CampusData>(BASE_URL+"/AddCampus", campusData);
    return response.data;
  }
  catch (error)
  {
    throw error;
  }
};

export const getCampuses = async (): Promise<CampusData[]> => {
  try {
    const response = await api.get<CampusData[]>(BASE_URL+"/GetCampuses");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCampusById = async (id: number | undefined) => {
  try {
    const response = await api.get<CampusData>(`${BASE_URL}/GetCampusById/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch campus by ID:", error);
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
