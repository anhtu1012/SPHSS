// src/components/ProtectedRoute/ProtectedRoute.tsx

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { User } from "../../models/user";
import { selectUser } from "../../redux/features/userSlice";
import { UserRole } from "../../models/enum";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const user = useSelector(selectUser) as User | null;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.roleCode)) {
    return <Navigate to="/404" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
