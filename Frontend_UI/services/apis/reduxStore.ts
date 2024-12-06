import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
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
import timetableApi from "./timetableService";
import periodApi from "./periodService";
import examResultPDFApi from "./examResultPDFService";
import examResultApi from "./examResultService";

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
  [examResultApi.reducerPath]: examResultApi.reducer,
  [examResultPDFApi.reducerPath]: examResultPDFApi.reducer,
  [timetableApi.reducerPath]: timetableApi.reducer,
  [periodApi.reducerPath]: periodApi.reducer,
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
      .concat(applicantApi.middleware)
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
      .concat(examPaperPDFApi.middleware)
      .concat(examResultApi.middleware)
      .concat(examResultPDFApi.middleware)
      .concat(timetableApi.middleware)
      .concat(periodApi.middleware),
});

export const persistor = persistStore(store);

export default store;
