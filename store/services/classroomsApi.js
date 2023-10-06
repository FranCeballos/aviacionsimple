import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const classroomsApi = createApi({
  reducerPath: "classroomsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin/classrooms",
  }),
  endpoints: (build) => ({
    getClassrooms: build.query({
      query: () => ({ url: "" }),
    }),
  }),
});

export const { useGetClassroomsQuery } = classroomsApi;
