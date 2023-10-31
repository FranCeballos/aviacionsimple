import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { adminClassroomsApi } from "./services/admin/adminClassroomsApi";
import { adminStudentsApi } from "./services/admin/adminStudentsApi";
import { adminSubjectsApi } from "./services/admin/adminSubjectsApi";
import { platformStudentsApi } from "./services/students/platformStudentsApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [adminClassroomsApi.reducerPath]: adminClassroomsApi.reducer,
    [adminStudentsApi.reducerPath]: adminStudentsApi.reducer,
    [adminSubjectsApi.reducerPath]: adminSubjectsApi.reducer,
    [platformStudentsApi.reducerPath]: platformStudentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(adminClassroomsApi.middleware)
      .concat(adminStudentsApi.middleware)
      .concat(adminSubjectsApi.middleware)
      .concat(platformStudentsApi.middleware),
});

setupListeners(store.dispatch);
