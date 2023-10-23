import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { classroomsApi } from "./services/classroomsApi";
import { studentsApi } from "./services/studentsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { subjectsApi } from "./services/subjectsApi";

export const store = configureStore({
  reducer: {
    [classroomsApi.reducerPath]: classroomsApi.reducer,
    [studentsApi.reducerPath]: studentsApi.reducer,
    [subjectsApi.reducerPath]: subjectsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(classroomsApi.middleware)
      .concat(studentsApi.middleware)
      .concat(subjectsApi.middleware),
});

setupListeners(store.dispatch);
