import { Navigate, Outlet } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";


export const ProtectedRoute = () => {
  const token = localStorage.getItem(AUTH_TOKEN);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Outlet rend toutes les routes enfants
  return <Outlet />;
};
