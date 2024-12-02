import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import classroomApi from "./classroomService";
import sectionApi from "./sectionService";
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
  [classroomApi.reducerPath]: classroomApi.reducer,
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
      .concat(studentApi.middleware)
      .concat(userApi.middleware)
      .concat(userRoleApi.middleware)
      .concat(userPermissionApi.middleware)
      .concat(applicantApi.middleware),
});

export const persistor = persistStore(store);

export default store;
