import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subjectsApi = createApi({
  reducerPath: "subjectsApi",
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
    postCreateSubject: build.mutation({
      query: ({ ...body }) => ({
        url: "",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetAllSubjectsTitlesQuery, usePostCreateSubjectMutation } =
  subjectsApi;
