import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "./apiResponse";

export interface InventoryItemData {
  itemId?: number,
  categoryId?: number,
  itemName: string,
  categoryName?: string,
  unitPrice: number,
  totalQuantity: number,
  reorderLevel?: number,
  description?: string,
  isActive?: boolean,
  createdBy?: number,
  createdAt?: Date,
}

export const inventoryItemApi = createApi({
  reducerPath: "inventoryItemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7242/api/InventoryItem/",
    prepareHeaders: (headers) => {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        headers.set("Authorization", `Bearer ${authToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Item"],

  endpoints: (builder) => ({
    fetchInventoryItems: builder.query<ApiResponse<InventoryItemData[]>, void>({
      query: () => "GetInventoryItems",
      providesTags: ["Item"],
    }),
    
    fetchInventoryItemById: builder.query<ApiResponse<InventoryItemData>, number>({
      query: (id) => `GetInventoryItemById?id=${id}`,
    }),
    addInventoryItem: builder.mutation<ApiResponse<InventoryItemData>, InventoryItemData>({
      query: (inventoryItemData) => ({
        url: "AddInventoryItem",
        method: "POST",
        body: inventoryItemData,
      }),
      invalidatesTags: ["Item"],
    }),
    updateInventoryItem: builder.mutation<ApiResponse<void>, InventoryItemData>({
      query: (inventoryItemData) => ({
        url: "UpdateInventoryItem",
        method: "PUT",
        body: inventoryItemData,
      }),
      invalidatesTags: ["Item"],
    }),
    deleteInventoryItem: builder.mutation<ApiResponse<void>, number>({
      query: (id) => ({
        url: `DeleteInventoryItem?inventoryItemId=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Item"],
    }),
  }),
});

export const {
useFetchInventoryItemsQuery,
useFetchInventoryItemByIdQuery,
useAddInventoryItemMutation,
useUpdateInventoryItemMutation,
useDeleteInventoryItemMutation,
} = inventoryItemApi;

export default inventoryItemApi;
