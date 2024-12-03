import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "./apiResponse";
export interface StudentData {
  studentId: number;
  grNo: number;
  firstName?: string;
  lastName?: string;
  profileImage?: string | null;
  email?: string;
  gender?: string;
  phoneNumber?: string;
  dateOfBirth: string | Date;
  enrollmentDate: Date | string;
  className?: string;
  classId?: number | null;
  campusId?: number;
  isActive: boolean;
}

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7242/api/Students/",
    prepareHeaders: (headers) => {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        headers.set("Authorization", `Bearer ${authToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchStudent: builder.query<ApiResponse<StudentData[]>, void>({
      query: () => "GetAllStudents",
    }),
    fetchStudentByClassWise: builder.query<ApiResponse<StudentData>, number>({
      query: (id) => `GetStudentsClassWise?classId=${id}`,
    }),
    
    updateStudent: builder.mutation<ApiResponse<void>, StudentData>({
      query: (studentData) => ({
        url: "UpdateStudentData",
        method: "PUT",
        body: studentData,
      }),
    }),
    deleteStudent: builder.mutation<ApiResponse<void>, number>({
      query: (id) => ({
        url: `DeleteStudent?studentId=${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchStudentQuery,
  useFetchStudentByClassWiseQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;

export default studentApi;
