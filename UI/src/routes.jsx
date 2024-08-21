import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Wrapper from "./components/common/Wrapper";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import TeacherList from "./components/teacher/TeacherList";
import StudentList from "./components/student/StudentList";
import ErrorPage from "./pages/Error";
import ApplicationForm from "./components/student/ApplicationForm";
import Academic from "./pages/Academic";
import Adminstration from "./pages/Adminstration";
import RegisterUser from "./pages/RegisterUser";
import SignIn from "./pages/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
    ],
  },
  {
    path: "/register-user",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <RegisterUser />,
      },
    ],
  },

  {
    path: "/teacher-list",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <TeacherList />,
      },
    ],
  },
  {
    path: "/student-list",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <StudentList />,
      },
    ],
  },
  {
    path: "/application-form",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <ApplicationForm />,
      },
    ],
  },
  {
    path: "/user-profile",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "/academic",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <Academic />,
      },
    ],
  },
  {
    path: "/adminstration",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <Adminstration />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;
