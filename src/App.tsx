import { ConfigProvider } from "antd";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Layout from "./components/layout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { UserRole } from "./models/enum";
import NotFound from "./pages/404";
import ManageDashboard from "./pages/admin/ManageDashboard";
import ManageEffectConsult from "./pages/admin/ManageEffectConsult";
import ManageProgram from "./pages/admin/ManageProgram";
import ManageCreateProgram from "./pages/admin/ManageProgram/CreateProgram";
import ManageSurveyStudent from "./pages/admin/ManageSurveyStudent";
import ManageUser from "./pages/admin/ManageUser";
import UserDetail from "./pages/admin/ManageUser/UserDetail";
import ChatApp from "./pages/Deepseek";
import Login from "./pages/login";
import ManageStudent from "./pages/parent/ManageStudent";
import CreateBlog from "./pages/psychologist/CreateBlog";
import ManageBlog from "./pages/psychologist/ManageBlog";
import ManageReport from "./pages/psychologist/ManageReport";
import ManageStudentPsy from "./pages/psychologist/ManageStudent";
import StudentDetail from "./pages/psychologist/ManageStudent/[id]";
import ManageSurvey from "./pages/psychologist/ManageSurvey";
import ManageTimeslot from "./pages/psychologist/ManageTimeslot";
import AiChatBot from "./pages/student/AiChatBot";
import Blog from "./pages/student/blog";
import BlogDetail from "./pages/student/blog/[id]";
import Contact from "./pages/student/contact";
import Doctors from "./pages/student/doctors";
import Home from "./pages/student/home";
import ProgramDetail from "./pages/student/program/[id]";
import Program from "./pages/student/program/index";
import PsychologistDetail from "./pages/student/PsychologistDetail";
import SurveyQuestion from "./pages/student/survey/[id]";
import SurveyList from "./pages/student/survey/index";
import UserProfile from "./pages/student/userProfile";
import ManageCreateSurvey from "./pages/admin/ManageSurveyStudent/CreateSurvey";
import ManageFormSurvey from "./pages/admin/ManageSurveyStudent/CreateSurvey/SurveyForm";
import PsyProfile from "./pages/psychologist/psyProfile";
import Cart from "./pages/student/cart";
import ManageAdminSurvey from "./pages/admin/ManageSurveyStudent/SurveyViewDetail";
import ManageCreateAcc from "./pages/admin/ManageUser/CreateAccount";
import DetailReport from "./pages/psychologist/ManageSurvey/[id]";

function App() {
  const { Manager, Parent, Psychologist } = UserRole;
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/chat_app",
      element: <ChatApp />,
    },
    {
      path: "/404",
      element: <NotFound />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "psychologist-detail/:id",
          element: <PsychologistDetail />,
        },
        {
          path: "ai-agent",
          element: <AiChatBot />,
        },
        {
          path: "survey",
          element: <SurveyList />,
        },
        {
          path: "survey/:id",
          element: <SurveyQuestion />,
        },
        {
          path: "/program",
          element: <Program />,
        },
        {
          path: "/program/:id",
          element: <ProgramDetail />,
        },
        {
          path: "/user-profile",
          element: <UserProfile />,
        },
        {
          path: "/user-cart",
          element: <Cart />,
        },
        {
          path: "/doctors",
          element: <Doctors />,
        },
        {
          path: "/blog",
          element: <Blog />,
        },
        {
          path: "/blog/:id",
          element: <BlogDetail />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
      ],
    },
    {
      path: "/manager",
      element: (
        <ConfigProvider>
          <ProtectedRoute allowedRoles={Manager}>
            <Dashboard />
          </ProtectedRoute>
        </ConfigProvider>
      ),
      children: [
        {
          path: "dashboard",
          element: <ManageDashboard />,
        },
        {
          path: "detail-effect-consult",
          element: <ManageEffectConsult />,
        },
        {
          path: "list-support-program",
          element: <ManageProgram />,
        },
        {
          path: "list-support-program/create-program",
          element: <ManageCreateProgram />,
        },
        {
          path: "list-support-program/view/:programId",
          element: <ProgramDetail />,
        },
        {
          path: "manage-survey",
          element: <ManageSurveyStudent />,
        },
        {
          path: "manage-survey/create-survey",
          element: <ManageCreateSurvey />,
        },
        {
          path: "manage-survey/create-survey/form/:id",
          element: <ManageFormSurvey />,
        },
        {
          path: "manage-survey/view/:surveyId",
          element: <ManageAdminSurvey />,
        },
        {
          path: "manage-user",
          element: <ManageUser />,
        },
        {
          path: "manage-user/create-account",
          element: <ManageCreateAcc />,
        },
        {
          path: ":section/detail/:id",
          element: <UserDetail />,
        },
      ],
    },
    {
      path: "/parent",
      element: (
        <ConfigProvider
          theme={{
            components: {
              Layout: {
                siderBg: "#001529",
              },
            },
          }}
        >
          <ProtectedRoute allowedRoles={Parent}>
            <Dashboard />
          </ProtectedRoute>
        </ConfigProvider>
      ),
      children: [
        {
          path: "manage-student",
          element: <ManageStudent />,
        },
      ],
    },
    {
      path: "/psychologist",
      element: (
        <ConfigProvider
          theme={{
            components: {
              Layout: {
                siderBg: "#001529",
              },
            },
          }}
        >
          <ProtectedRoute allowedRoles={Psychologist}>
            <Dashboard />
          </ProtectedRoute>
        </ConfigProvider>
      ),
      children: [
        {
          path: "manage-timeslot",
          element: <ManageTimeslot />,
        },
        {
          path: "manage-blog",
          element: <ManageBlog />,
        },
        {
          path: "manage-blog/create-blog",
          element: <CreateBlog />,
        },
        {
          path: "manage-student",
          element: <ManageStudentPsy />,
        },
        {
          path: "manage-student/:id",
          element: <StudentDetail />,
        },
        {
          path: "manage-survey",
          element: <ManageSurvey />,
        },
        {
          path: "manage-report",
          element: <ManageReport />,
        },
        {
          path: "manage-survey/:id",
          element: <DetailReport />,
        },
        {
          path: "psy-profile",
          element: <PsyProfile />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
