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
import paymentApi from "./sponsorPaymentService";
import sponsorshipApi from "./sponsorshipService";
import studentApi from "./studentService";
import userApi from "./userService";
import userRoleApi from "./userRoleService";
import userPermissionApi from "./userPermissionService";
import applicantApi from "./applicantService";

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
  [sponsorshipApi.reducerPath]: sponsorshipApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [studentApi.reducerPath]: studentApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [userRoleApi.reducerPath]: userRoleApi.reducer,
  [userPermissionApi.reducerPath]: userPermissionApi.reducer,
  [applicantApi.reducerPath]: applicantApi.reducer,
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
      .concat(sponsorshipApi.middleware)
      .concat(dashboardApi.middleware)
      .concat(paymentApi.middleware)
      .concat(classroomApi.middleware)
      .concat(studentApi.middleware)
      .concat(userApi.middleware)
      .concat(userRoleApi.middleware)
      .concat(userPermissionApi.middleware)
      .concat(applicantApi.middleware),
});

export const persistor = persistStore(store);

export default store;
