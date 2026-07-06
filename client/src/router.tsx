import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "./ui/Layout";
import { ProtectedRoute } from "./ui/ProtectedRoute";
import { AdminRoute } from "./ui/AdminRoute";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { AccountPage } from "./pages/AccountPage";
import { BookPage } from "./pages/BookPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { ContactPage } from "./pages/ContactPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "reset-password", element: <ResetPasswordPage /> },
      {
        path: "account",
        element: (
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        )
      },
      {
        path: "book",
        element: (
          <ProtectedRoute>
            <BookPage />
          </ProtectedRoute>
        )
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDashboardPage />
          </AdminRoute>
        )
      },
      { path: "*", element: <Navigate to="/" replace /> }
    ]
  }
]);
