import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export const GuestRoute = () => {

    const { user, loading } = useAuth();
    if (loading) return <p>Chargement...</p>; 
    if (user) return <Navigate to="/admin" replace />;

    return <Outlet />;
};
