import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentsApi = createApi({
  reducerPath: "studentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin/students",
  }),
  refetchOnReconnect: true,
  endpoints: (build) => ({
    postStudent: build.mutation({
      query: ({ ...body }) => ({
        url: "",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { usePostStudentMutation } = studentsApi;
