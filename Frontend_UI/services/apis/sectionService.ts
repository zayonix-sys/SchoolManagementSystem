import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SectionData } from "../types/sectionDataTypes";


export const sectionApi = createApi({
  reducerPath: "sectionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7242/api/Section/",
    prepareHeaders: (headers) => {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        headers.set("Authorization", `Bearer ${authToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchSection: builder.query<SectionData[], void>({
      query: () => "GetSection",
    }),
    fetchSectionById: builder.query<SectionData, number>({
      query: (id) => `GetSectionById/${id}`,
    }),
    addSection: builder.mutation<void, SectionData>({
      query: (sectionData) => ({
        url: "AddSection",
        method: "POST",
        body: sectionData,
      }),
    }),
    updateSection: builder.mutation<void, SectionData>({
      query: (sectionData) => ({
        url: "UpdateSection",
        method: "PUT",
        body: sectionData,
      }),
    }),
    deleteSection: builder.mutation<void, number>({
      query: (id) => ({
        url: `DeleteSection?sectionId=${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchSectionQuery,
  useFetchSectionByIdQuery,
  useAddSectionMutation,
  useUpdateSectionMutation,
  useDeleteSectionMutation,
} = sectionApi;

export default sectionApi;
