import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminNotificationsApi = createApi({
  reducerPath: "adminNotificationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin/notifications",
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (build) => ({
    getNotificationsByClassroomId: build.query({
      query: (classroomId) => ({ url: `/classrooms/${classroomId}` }),
    }),
    postNotification: build.mutation({
      query: ({ ...body }) => ({
        url: "",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLazyGetNotificationsByClassroomIdQuery,
  usePostNotificationMutation,
} = adminNotificationsApi;
