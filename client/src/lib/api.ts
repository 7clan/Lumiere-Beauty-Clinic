import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true
});

let csrfToken: string | null = null;

export async function ensureCsrfToken() {
  if (!csrfToken) {
    const { data } = await api.get<{ csrfToken: string }>("/csrf-token");
    csrfToken = data.csrfToken;
  }
  return csrfToken;
}

api.interceptors.request.use(async (config) => {
  const unsafeMethod = config.method && !["get", "head", "options"].includes(config.method.toLowerCase());
  if (unsafeMethod) {
    config.headers["x-csrf-token"] = await ensureCsrfToken();
  }
  return config;
});

export function clearCsrfToken() {
  csrfToken = null;
}
