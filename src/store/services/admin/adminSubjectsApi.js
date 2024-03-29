import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminSubjectsApi = createApi({
  reducerPath: "adminSubjectsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin/subjects/",
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (build) => ({
    getAllSubjectsTitles: build.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
    getSubject: build.query({
      query: ({ subjectId }) => ({
        url: `/${subjectId}`,
        method: "GET",
      }),
    }),
    postCreateSubject: build.mutation({
      query: ({ ...body }) => ({
        url: "",
        method: "POST",
        body,
      }),
    }),
    postEditSubject: build.mutation({
      query: ({ ...body }) => ({
        url: "",
        method: "PUT",
        body,
      }),
    }),
    postDeleteSubject: build.mutation({
      query: ({ subjectId }) => ({
        url: `/${subjectId}/delete`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAllSubjectsTitlesQuery,
  useGetSubjectQuery,
  useLazyGetSubjectQuery,
  usePostCreateSubjectMutation,
  usePostEditSubjectMutation,
  usePostDeleteSubjectMutation,
} = adminSubjectsApi;
