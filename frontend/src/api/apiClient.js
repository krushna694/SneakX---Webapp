import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const apiClient = axios.create({
  baseURL: API_BASE_URL,

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  timeout: 15000,
});

// -----------------------------------------
// REQUEST INTERCEPTOR
// -----------------------------------------

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("sneakx_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

// -----------------------------------------
// RESPONSE INTERCEPTOR
// -----------------------------------------

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("sneakx_token");

      localStorage.removeItem("sneakx_user");

      localStorage.removeItem("sneakx_isAuthenticated");
    }

    return Promise.reject(error);
  },
);

export default apiClient;
