import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectPath?: string;
}

export const ProtectedRoute = ({ children, redirectPath = "/login" }: ProtectedRouteProps) => {
  const { user, loading } = useUser();

  if (loading) return <p>Loading...</p>; 
  if (!user) return <Navigate to={redirectPath} replace />;

  return <>{children}</>;
};
