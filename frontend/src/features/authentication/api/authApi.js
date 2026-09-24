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
