import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "./apiResponse";

export interface ExamResultData {
  examDetails?: ExamDetailsResultData[];
  subjectName?: string;
  className?: string;
  firstName?: string;
  lastName?: string;
  totalMarks?: number;
  isActive?: boolean;
}

export interface ExamDetailsResultData {
  examResultId?: number;
  studentId?: number;
  examPaperId?: number;
  marksObtained?: number;
  totalMarksObtained?: number;
  percentage?: number;
  grade?: string;
  }

export const examResultApi = createApi({
  reducerPath: "examResultApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7242/api/ExamResults/",
    prepareHeaders: (headers) => {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        headers.set("Authorization", `Bearer ${authToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchExamResults: builder.query<ApiResponse<ExamResultData[]>, void>({
      query: () => "GetAllExamsResults",
    }),
    addExamResult: builder.mutation<ApiResponse<ExamResultData>, ExamResultData>({
      query: (examResultData) => ({
        url: "AddExamResults",
        method: "POST",
        body: examResultData,
      }),
    }),
    updateExamResult: builder.mutation<ApiResponse<void>, ExamResultData>({
      query: (examResultData) => ({
        url: "UpdateExamResult",
        method: "PUT",
        body: examResultData,
      }),
    }),
    deleteResultExam: builder.mutation<ApiResponse<void>, number>({
      query: (id) => ({
        url: `DeleteExamResult?examResultId=${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
useFetchExamResultsQuery,
useAddExamResultMutation,
useUpdateExamResultMutation,
useDeleteResultExamMutation
} = examResultApi;

export default examResultApi;
