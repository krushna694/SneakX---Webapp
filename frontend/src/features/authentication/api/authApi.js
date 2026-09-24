import apiClient from "../../../api/apiClient";

export const loginApi = async (email, password) => {
  const response = await apiClient.post("/api/auth/login", {
    email: email.trim().toLowerCase(),
    password,
  });

  return response.data;
};

export const registerApi = async ({
  firstName,
  lastName,
  email,
  password,
  phone,
}) => {
  const response = await apiClient.post("/api/auth/register", {
    firstName: firstName.trim(),
    lastName: lastName?.trim() || null,
    email: email.trim().toLowerCase(),
    password,
    phone: phone?.trim() || null,
  });

  return response.data;
};

export const forgotPasswordApi = async (email) => {
  const response = await apiClient.post("/api/auth/forgot-password", {
    email: email.trim().toLowerCase(),
  });

  return response.data;
};

export const verifyResetOtpApi = async (email, otp) => {
  const response = await apiClient.post("/api/auth/verify-reset-otp", {
    email: email.trim().toLowerCase(),
    otp: otp.trim(),
  });

  return response.data;
};

export const resetPasswordApi = async (resetToken, newPassword) => {
  const response = await apiClient.post("/api/auth/reset-password", {
    resetToken,
    newPassword,
  });

  return response.data;
};
