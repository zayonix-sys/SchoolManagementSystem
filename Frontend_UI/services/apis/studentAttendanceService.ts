import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "./apiResponse";

export interface StudentAttendanceData{ 

  attendanceId?: number;
  attendanceDate?: Date;
  attendanceStatus?: string;
  studentName?: string;
  className?: string;
  sectionName?: string;
  studentId?: number | null;
  grNo?: number;
  classId?: number;
  campusId?: number;
  sectionId?: number;
  createdBy?: number;
  createdAt?: Date;
  updatedBy?: number;
  updatedAt?: Date
  isActive?: boolean;



}

export const studentAttendanceApi = createApi({
  reducerPath: "studentAttendanceApi",
  baseQuery: fetchBaseQuery({
    baseUrl:  'http://localhost:5282/api/StudentAttendance/',
    prepareHeaders: (headers) => {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        headers.set("Authorization", `Bearer ${authToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchStudentAttendance: builder.query<ApiResponse<StudentAttendanceData[]>, void>({
      query: () => "GetStudentAttendance",
    }),
    fetchStudentAttendanceById: builder.query<ApiResponse<StudentAttendanceData>, number>({
      query: (id) => `GetStudentAttendanceById/${id}`,
    }),
    fetchStudentAttendanceByClassSectionId: builder.query<ApiResponse<StudentAttendanceData[]>, { classId: number; sectionId: number}>({
      query: ({ classId, sectionId }) => `GetStudentAttendanceByClassSectionId?classId=${classId}&sectionId=${sectionId}`,
    }),
    addStudentAttendance: builder.mutation<ApiResponse<StudentAttendanceData>, StudentAttendanceData>({
      query: (studentAttendanceData) => ({
        url: "AddStudentAttendance",
        method: "POST",
        body: studentAttendanceData,
      }),
    }),
    updateStudentAttendance: builder.mutation<ApiResponse<void>, StudentAttendanceData>({
      query: (studentAttendanceData) => ({
        url: "UpdateStudentAttendance",
        method: "PUT",
        body: studentAttendanceData,
      }),
    }),
    deleteStudentAttendance: builder.mutation<ApiResponse<void>, number>({
      query: (id) => ({
        url: `DeleteStudentAttendance?attendanceId=${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
useAddStudentAttendanceMutation, useFetchStudentAttendanceQuery,useDeleteStudentAttendanceMutation,useUpdateStudentAttendanceMutation, useFetchStudentAttendanceByIdQuery,
useFetchStudentAttendanceByClassSectionIdQuery,
} = studentAttendanceApi;

export default studentAttendanceApi;
