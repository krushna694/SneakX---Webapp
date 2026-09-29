import apiClient from "./apiClient";

/**
 * Fetch paginated active products.
 *
 * @param {Object} params
 * @param {number} params.page - Zero-based page number
 * @param {number} params.size - Number of products per page
 * @param {string} params.sort - Spring Data sort expression
 */
export const getProductsApi = async ({
  page = 0,
  size = 20,
  sort = "createdAt,desc",
} = {}) => {
  const response = await apiClient.get("/api/products", {
    params: {
      page,
      size,
      sort,
    },
  });

  return response.data;
};

/**
 * Fetch a single product by ID.
 *
 * @param {number|string} id
 */
export const getProductByIdApi = async (id) => {
  const response = await apiClient.get(`/api/products/${id}`);

  return response.data;
};

/**
 * Fetch a single product by slug.
 *
 * @param {string} slug
 */
export const getProductBySlugApi = async (slug) => {
  const response = await apiClient.get(
    `/api/products/slug/${encodeURIComponent(slug)}`,
  );

  return response.data;
};

/**
 * Fetch products belonging to a category.
 *
 * @param {number|string} categoryId
 * @param {Object} params
 */
export const getProductsByCategoryApi = async (
  categoryId,
  { page = 0, size = 20, sort = "createdAt,desc" } = {},
) => {
  const response = await apiClient.get(`/api/products/category/${categoryId}`, {
    params: {
      page,
      size,
      sort,
    },
  });

  return response.data;
};

/**
 * Fetch products belonging to a brand.
 *
 * @param {string} brand
 * @param {Object} params
 */
export const getProductsByBrandApi = async (
  brand,
  { page = 0, size = 20, sort = "createdAt,desc" } = {},
) => {
  const response = await apiClient.get(
    `/api/products/brand/${encodeURIComponent(brand)}`,
    {
      params: {
        page,
        size,
        sort,
      },
    },
  );

  return response.data;
};
