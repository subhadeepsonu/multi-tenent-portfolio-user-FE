import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const location = useLocation();
    const token = localStorage.getItem("token");

    const publicRoutes = ["/login", "/register", "/"];


    if (token && publicRoutes.includes(location.pathname)) {
        return <Navigate to="/dashboard/projects" replace />;
    }

    if (!token && !publicRoutes.includes(location.pathname)) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
