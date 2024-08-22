import { api } from "@/config/axios.config";

interface ClassroomData {
  id?: number;
  name: string;
  description?: string;
}

export const fetchClasses = async (): Promise<ClassroomData[]> => {
  try {
    const response = await api.get<ClassroomData[]>("/classroom");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchClassById = async (id: number): Promise<ClassroomData> => {
  try {
    const response = await api.get<ClassroomData>(`/classroom/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addClass = async (classroomData: ClassroomData): Promise<ClassroomData> => {
  try {
    const response = await api.post<ClassroomData>("/classroom", classroomData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateClass = async (id: number, classroomData: ClassroomData): Promise<ClassroomData> => {
  try {
    const response = await api.put<ClassroomData>(`/classroom/${id}`, classroomData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteClass = async (id: number): Promise<void> => {
  try {
    await api.delete(`/classroom/${id}`);
  } catch (error) {
    throw error;
  }
};
