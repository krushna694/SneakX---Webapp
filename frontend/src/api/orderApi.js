import apiClient from "./apiClient";

export const getOrdersApi = async () => {
  const response = await apiClient.get("/api/orders");
  return response.data;
};

export const getOrderByIdApi = async (orderId) => {
  const response = await apiClient.get(`/api/orders/${orderId}`);
  return response.data;
};

export const createOrderApi = async (orderData) => {
  const response = await apiClient.post("/api/orders", orderData);
  return response.data;
};

export const cancelOrderApi = async (orderId) => {
  const response = await apiClient.patch(`/api/orders/${orderId}/cancel`);

  return response.data;
};
