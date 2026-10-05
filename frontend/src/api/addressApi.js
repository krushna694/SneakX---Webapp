import apiClient from "./apiClient";

/**
 * Fetch all addresses for the authenticated user.
 */
export const getAddressesApi = async () => {
  const response = await apiClient.get("/api/addresses");
  return response.data;
};

/**
 * Fetch a single address by ID.
 */
export const getAddressByIdApi = async (addressId) => {
  const response = await apiClient.get(`/api/addresses/${addressId}`);
  return response.data;
};

/**
 * Create a new address.
 */
export const createAddressApi = async (addressData) => {
  const response = await apiClient.post("/api/addresses", addressData);
  return response.data;
};

/**
 * Update an existing address.
 */
export const updateAddressApi = async (addressId, addressData) => {
  const response = await apiClient.put(
    `/api/addresses/${addressId}`,
    addressData,
  );
  return response.data;
};

/**
 * Delete an address.
 */
export const deleteAddressApi = async (addressId) => {
  const response = await apiClient.delete(`/api/addresses/${addressId}`);
  return response.data;
};

/**
 * Set an address as the default address.
 */
export const setDefaultAddressApi = async (addressId) => {
  const response = await apiClient.patch(`/api/addresses/${addressId}/default`);
  return response.data;
};
