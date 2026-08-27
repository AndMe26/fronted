import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { Role } from "../interfaces/types";

interface Props { requiredRole?: Role; }

export function ProtectedRoute({ requiredRole }: Props) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) return <div style={{ padding: "2rem" }}>Cargando...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (requiredRole === "admin" && !isAdmin) return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
}