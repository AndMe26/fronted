import axios, { AxiosError,type AxiosInstance } from "axios";
import { ApiError, type ApiErrorType } from "../interfaces/types";

const BASE_URL = "http://localhost:3000";

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Inyecta token en cada request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Reacciona al 401 limpiando sesión
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

function classifyError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const raw = (error.response?.data as { message?: string | string[] })?.message;
    const message = Array.isArray(raw) ? raw.join(", ") : raw ?? error.message ?? "Error desconocido";

    let type: ApiErrorType = "unknown";
    if (!error.response) type = "network";
    else if (status === 400) type = "validation";
    else if (status === 401) type = "unauthorized";
    else if (status === 403) type = "forbidden";
    else if (status === 404) type = "not_found";
    else if (status === 409) type = "conflict";

    return new ApiError(message, type, status, error.response?.data);
  }
  if (error instanceof Error) return new ApiError(error.message, "unknown");
  return new ApiError("Error desconocido", "unknown");
}

export async function request<T>(
  method: "get" | "post" | "patch" | "delete",
  url: string,
  data?: unknown,
  params?: Record<string, unknown>
): Promise<T> {
  try {
    const response = await apiClient.request<T>({ method, url, data, params });
    return response.data;
  } catch (error) {
    throw classifyError(error);
  } finally {
    // punto de extensión: logging
  }
}