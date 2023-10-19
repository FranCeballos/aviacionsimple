import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const classroomsApi = createApi({
  reducerPath: "classroomsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin/classrooms",
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (build) => ({
    getAllClassrooms: build.query({
      query: () => ({ url: "" }),
    }),
    getClassroom: build.query({
      query: ({ customId }) => ({ url: `/${customId}` }),
    }),
    postClassroom: build.mutation({
      query: ({ ...body }) => ({
        url: "",
        method: "POST",
        body,
      }),
    }),
    transferClassroom: build.mutation({
      query: ({ ...body }) => ({
        url: "/transfer",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllClassroomsQuery,
  useLazyGetClassroomQuery,
  usePostClassroomMutation,
  useTransferClassroomMutation,
} = classroomsApi;
