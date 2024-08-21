import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const TeacherApi = createApi({
  reducerPath: "TeacherApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7176/api/" }),
  endpoints: (builder) => ({
    getTeacherById: builder.query({
      query: (teacherId) => `Teacher/GetTeacherById?teacherId=${teacherId}`,
    }),
    getTeacherList: builder.query({
      query: () => `Teacher/GetTeacherList`,
    }),
  }),
});

export const { useGetTeacherByIdQuery, useGetTeacherListQuery } = TeacherApi;

export default TeacherApi;
