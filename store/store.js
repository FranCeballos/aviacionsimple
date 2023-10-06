import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { classroomsApi } from "./services/classroomsApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [classroomsApi.reducerPath]: classroomsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(classroomsApi.middleware),
});

setupListeners(store.dispatch);
