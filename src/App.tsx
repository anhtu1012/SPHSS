import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Dashboard from "./components/dashboard";
import Home from "./pages/home";
import Login from "./pages/login";
import { ConfigProvider } from "antd";
import ManageUser from "./pages/admin/ManageUser";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { UserRole } from "./models/enum";
import ManageStudent from "./pages/parent/ManageStudent";
import ManageSurvey from "./pages/psychologist/ManageSurvey";
import ManageStudentPsy from "./pages/psychologist/ManageStudent";
import NotFound from "./pages/404";
import ManageDashboard from "./pages/admin/ManageDashboard";
import ManageEffectConsult from "./pages/admin/ManageEffectConsult";
import ManageProgram from "./pages/admin/ManageProgram";
import ManageSurveyStudent from "./pages/admin/ManageSurveyStudent";
import ChatApp from "./pages/Deepseek";
import StudentDetail from "./pages/psychologist/ManageStudent/[id]";
import ManageTimeslot from "./pages/psychologist/ManageTimeslot";
import ManageBlog from "./pages/psychologist/ManageBlog";
import ManageReport from "./pages/psychologist/ManageReport";
import ReportDetail from "./pages/psychologist/ManageReport/[id]";
import UserDetail from "./pages/admin/ManageUser/UserDetail";
import PsychologistDetail from "./pages/student/PsychologistDetail";
import AiChatBot from "./pages/student/AiChatBot";
import CreateBlog from "./pages/psychologist/CreateBlog";

function App() {
  const { Manager, Parent, Psychologist, Student } = UserRole;
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
          path: "manage-survey",
          element: <ManageSurveyStudent />,
        },
        {
          path: "manage-user",
          element: <ManageUser />,
        },
        {
          path: "manage-user/detail",
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
          path: "manage-report/:id",
          element: <ReportDetail />,
        },
      ],
    },
    {
      path: "/student",
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
          <ProtectedRoute allowedRoles={Student}>
            <Layout />
          </ProtectedRoute>
        </ConfigProvider>
      ),
      children: [
        {
          path: "psychologist-detail/:id",
          element: <PsychologistDetail />,
        },
        {
          path: "ai-agent",
          element: <AiChatBot />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
