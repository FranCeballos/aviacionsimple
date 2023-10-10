import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { classroomsApi } from "./services/classroomsApi";
import { studentsApi } from "./services/studentsApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [classroomsApi.reducerPath]: classroomsApi.reducer,
    [studentsApi.reducerPath]: studentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(classroomsApi.middleware)
      .concat(studentsApi.middleware),
});

setupListeners(store.dispatch);
