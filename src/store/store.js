import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { adminClassroomsApi } from "./services/admin/adminClassroomsApi";
import { adminStudentsApi } from "./services/admin/adminStudentsApi";
import { adminSubjectsApi } from "./services/admin/adminSubjectsApi";
import { adminNotificationsApi } from "./services/admin/adminNotificationsApi";
import { platformStudentsApi } from "./services/students/platformStudentsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import navbarStoreReducer from "./features/navbarStore";

export const store = configureStore({
  reducer: {
    navbarStore: navbarStoreReducer,
    [adminClassroomsApi.reducerPath]: adminClassroomsApi.reducer,
    [adminStudentsApi.reducerPath]: adminStudentsApi.reducer,
    [adminSubjectsApi.reducerPath]: adminSubjectsApi.reducer,
    [adminNotificationsApi.reducerPath]: adminNotificationsApi.reducer,
    [platformStudentsApi.reducerPath]: platformStudentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(adminClassroomsApi.middleware)
      .concat(adminStudentsApi.middleware)
      .concat(adminSubjectsApi.middleware)
      .concat(adminNotificationsApi.middleware)
      .concat(platformStudentsApi.middleware),
});

setupListeners(store.dispatch);
