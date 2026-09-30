import apiClient from "./apiClient";

export const getCategoriesApi = async () => {
  const response = await apiClient.get("/api/categories");

  return response.data;
};

export const getCategoryByIdApi = async (id) => {
  const response = await apiClient.get(`/api/categories/${id}`);

  return response.data;
};

export const getCategoryBySlugApi = async (slug) => {
  const response = await apiClient.get(
    `/api/categories/slug/${encodeURIComponent(slug)}`,
  );

  return response.data;
};
