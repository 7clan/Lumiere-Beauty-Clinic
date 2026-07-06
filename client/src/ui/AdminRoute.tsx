import { Navigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="mx-auto max-w-7xl px-4 py-24">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "ADMIN") return <Navigate to="/account" replace />;
  return children;
}
