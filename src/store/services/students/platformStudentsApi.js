const { createApi, fetchBaseQuery } = require("@reduxjs/toolkit/query/react");

export const platformStudentsApi = createApi({
  reducerPath: "platformStudentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/students/",
  }),
  endpoints: (build) => ({
    getSubjects: build.query({
      query: ({ customStudentId }) => ({
        url: `${customStudentId}/subjects`,
      }),
    }),
  }),
});

export const { useLazyGetSubjectsQuery } = platformStudentsApi;
