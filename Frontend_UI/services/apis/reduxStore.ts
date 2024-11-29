import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import classroomApi from "./classroomService";
import sectionApi from "./sectionService";
import studentAttendanceApi from "./studentAttendanceService";
import { empRoleApi } from "./employeeRoleService";
import employeeApi from "./employeeService";
import sponsorApi from "./sponsorService";
import dashboardApi from "./dashboardService";

// Import or define your auth reducer
// import authReducer from "./authSlice"; // Assuming your auth reducer is in authSlice.js

// const authPersistConfig = {
//   key: "auth",
//   storage,
// };

const rootReducer = combineReducers({
  // auth: persistReducer(authPersistConfig, authReducer),

  [sectionApi.reducerPath]: sectionApi.reducer,
  [studentAttendanceApi.reducerPath]: studentAttendanceApi.reducer,
  [classroomApi.reducerPath]: classroomApi.reducer,
  [employeeApi.reducerPath]: employeeApi.reducer,
  [empRoleApi.reducerPath]: empRoleApi.reducer,
  [sponsorApi.reducerPath]: sponsorApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(sectionApi.middleware)
      .concat(classroomApi.middleware)
      .concat(studentAttendanceApi.middleware)
      .concat(employeeApi.middleware)
      .concat(empRoleApi.middleware)
      .concat(sponsorApi.middleware)
      .concat(dashboardApi.middleware)

      ,
});

export const persistor = persistStore(store);

export default store;
