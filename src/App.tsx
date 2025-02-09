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



function App() {
  const { Manager, Parent, Psychologist } = UserRole;
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
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
          element: <ManageEffectConsult/>,
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
        }
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
          path: "manage-student",
          element: <ManageStudentPsy />,
        },
        {
          path: "manage-survey",
          element: <ManageSurvey />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
