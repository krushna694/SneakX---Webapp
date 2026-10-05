import apiClient from "./apiClient";

// ==========================================
// GET WISHLIST
// ==========================================

export const getWishlistApi = async () => {
  const response = await apiClient.get("/api/wishlist");

  return response.data;
};

// ==========================================
// ADD PRODUCT TO WISHLIST
// ==========================================

export const addToWishlistApi = async (productId) => {
  const response = await apiClient.post(`/api/wishlist/items/${productId}`);

  return response.data;
};

// ==========================================
// REMOVE PRODUCT FROM WISHLIST
// ==========================================

export const removeFromWishlistApi = async (productId) => {
  const response = await apiClient.delete(`/api/wishlist/items/${productId}`);

  return response.data;
};
