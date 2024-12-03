import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import classroomApi from "./classroomService";
import sectionApi from "./sectionService";
import examApi from "./examService";
import classApi from "./classService";
import classAssignApi from "./assignClassService";
import departmentApi from "./departmentService";
import campusApi from "./campusService";
import subjectApi from "./subjectService";
import assignClassSubjectApi from "./assignClassSubjectService";
import assignSubjectTeacherApi from "./assignSubjectTeacherService";
import questionBankApi from "./qBankService";
import examPaperApi from "./examPaperService";
import examPaperPDFApi from "./examPaperPDFService";

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
  [classApi.reducerPath]: classApi.reducer,
  [classAssignApi.reducerPath]: classAssignApi.reducer,
  [departmentApi.reducerPath]: departmentApi.reducer,
  [campusApi.reducerPath]: campusApi.reducer,
  [subjectApi.reducerPath]: subjectApi.reducer,
  [assignClassSubjectApi.reducerPath]: assignClassSubjectApi.reducer,
  [assignSubjectTeacherApi.reducerPath]: assignSubjectTeacherApi.reducer,
  [questionBankApi.reducerPath]: questionBankApi.reducer,
  [examApi.reducerPath]: examApi.reducer,
  [examPaperApi.reducerPath]: examPaperApi.reducer,
  [examPaperPDFApi.reducerPath]: examPaperPDFApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(sectionApi.middleware)
      .concat(classroomApi.middleware)
      .concat(classApi.middleware)
      .concat(classAssignApi.middleware)
      .concat(departmentApi.middleware)
      .concat(campusApi.middleware)
      .concat(subjectApi.middleware)
      .concat(assignClassSubjectApi.middleware)
      .concat(assignSubjectTeacherApi.middleware)
      .concat(questionBankApi.middleware)
      .concat(examApi.middleware)
      .concat(examPaperApi.middleware)
      .concat(examPaperPDFApi.middleware),
});

export const persistor = persistStore(store);

export default store;
