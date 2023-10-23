import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentsApi = createApi({
  reducerPath: "studentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin/students/",
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
    patchStudent: build.mutation({
      query: ({ ...body }) => ({
        url: "",
        method: "PATCH",
        body,
      }),
    }),
    transferStudent: build.mutation({
      query: ({ ...body }) => ({
        url: "transfer",
        method: "PATCH",
        body,
      }),
    }),
    copyStudentToClassroom: build.mutation({
      query: ({ ...body }) => ({
        url: "copy",
        method: "POST",
        body,
      }),
    }),
    postResetPassword: build.mutation({
      query: ({ ...body }) => ({
        url: "reset-password",
        method: "POST",
        body,
      }),
    }),
    postDeleteStudent: build.mutation({
      query: ({ ...body }) => ({
        url: "delete",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  usePostStudentMutation,
  usePatchStudentMutation,
  useTransferStudentMutation,
  useCopyStudentToClassroomMutation,
  usePostResetPasswordMutation,
  usePostDeleteStudentMutation,
} = studentsApi;
