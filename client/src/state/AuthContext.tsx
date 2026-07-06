import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api, clearCsrfToken } from "../lib/api";
import type { LoginForm, ProfileForm, SignupForm } from "../lib/validation";
import type { User } from "../types";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (data: LoginForm) => Promise<void>;
  signup: (data: SignupForm) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: ProfileForm) => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const { data } = await api.get<{ user: User }>("/auth/me");
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refreshUser();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      login: async (payload) => {
        const { data } = await api.post<{ user: User }>("/auth/login", payload);
        setUser(data.user);
      },
      signup: async (payload) => {
        const { data } = await api.post<{ user: User }>("/auth/signup", payload);
        setUser(data.user);
      },
      logout: async () => {
        await api.post("/auth/logout");
        clearCsrfToken();
        setUser(null);
      },
      updateProfile: async (payload) => {
        const { data } = await api.patch<{ user: User }>("/auth/profile", payload);
        setUser(data.user);
      },
      refreshUser
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
