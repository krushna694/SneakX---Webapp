import apiClient from "./apiClient";

const adminApi = {
  getDashboard: async () => {
    const response = await apiClient.get("/api/admin/dashboard");
    return response.data;
  },
};

export default adminApi;
