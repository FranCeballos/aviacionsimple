import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const classroomsApi = createApi({
  reducerPath: "classroomsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin/classrooms",
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (build) => ({
    getClassrooms: build.query({
      query: () => ({ url: "" }),
    }),
    postClassroom: build.mutation({
      query: ({ ...body }) => ({
        url: "",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetClassroomsQuery, usePostClassroomMutation } =
  classroomsApi;
