import React from "react";
import { Navigate } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectPath?: string;
}

export const ProtectedRoute = ({
  children,
  redirectPath = "/login",
}: ProtectedRouteProps) => {
  const token = localStorage.getItem(AUTH_TOKEN);

  if (!token) {
    // Pas de token : redirection vers login
    return <Navigate to={redirectPath} replace />;
  }

  // Token existant : on rend le composant enfant
  return <>{children}</>;
};
