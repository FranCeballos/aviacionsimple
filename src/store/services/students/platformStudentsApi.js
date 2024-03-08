const { createApi, fetchBaseQuery } = require("@reduxjs/toolkit/query/react");

export const platformStudentsApi = createApi({
  reducerPath: "platformStudentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/students/",
  }),
  endpoints: (build) => ({
    getSubjects: build.query({
      query: () => ({
        url: "/subjects",
      }),
    }),
    getNotifications: build.query({
      query: () => ({
        url: "/notifications",
      }),
    }),
  }),
});

export const { useLazyGetSubjectsQuery, useLazyGetNotificationsQuery } =
  platformStudentsApi;
