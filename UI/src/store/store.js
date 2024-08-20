import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import TeacherApi from "../services/apis/Teacher";

const store = configureStore({
  reducer: {
    [TeacherApi.reducerPath]: TeacherApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(TeacherApi.middleware),
});

setupListeners(store.dispatch);

export default store;
