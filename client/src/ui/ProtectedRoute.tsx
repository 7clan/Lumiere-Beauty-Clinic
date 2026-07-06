import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../state/AuthContext";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="mx-auto max-w-7xl px-4 py-24">Loading...</div>;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return children;
}
