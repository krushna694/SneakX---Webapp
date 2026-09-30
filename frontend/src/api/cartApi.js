import apiClient from "./apiClient";

export const getCartApi = async () => {
  const response = await apiClient.get("/api/cart");

  return response.data;
};

export const addToCartApi = async ({ productVariantId, quantity = 1 }) => {
  const response = await apiClient.post("/api/cart/items", {
    variantId: productVariantId,
    quantity,
  });

  return response.data;
};

export const updateCartItemApi = async (cartItemId, quantity) => {
  const response = await apiClient.put(`/api/cart/items/${cartItemId}`, {
    quantity,
  });

  return response.data;
};

export const removeCartItemApi = async (cartItemId) => {
  const response = await apiClient.delete(`/api/cart/items/${cartItemId}`);

  return response.data;
};

export const clearCartApi = async () => {
  const response = await apiClient.delete("/api/cart");

  return response.data;
};
