import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
    loginApi,
    registerApi,
} from "../api/authApi";

function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {
        const savedUser =
            localStorage.getItem("sneakx_user");

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    });

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return Boolean(
            localStorage.getItem("sneakx_token")
        );
    });

    // -----------------------------------------
    // PERSIST USER
    // -----------------------------------------

    useEffect(() => {
        if (user) {
            localStorage.setItem(
                "sneakx_user",
                JSON.stringify(user)
            );
        } else {
            localStorage.removeItem(
                "sneakx_user"
            );
        }
    }, [user]);

    // -----------------------------------------
    // LOGIN
    // -----------------------------------------

    const login = async (email, password) => {

        if (!email || !password) {
            return {
                success: false,
                message:
                    "Email and password are required.",
            };
        }

        try {

            const response =
                await loginApi(
                    email,
                    password
                );

            if (
                !response?.success ||
                !response?.data
            ) {
                return {
                    success: false,
                    message:
                        response?.message ||
                        "Login failed.",
                };
            }

            const authData =
                response.data;

            const loggedInUser = {
                id: authData.userId,

                firstName:
                    authData.firstName,

                lastName:
                    authData.lastName,

                name: [
                    authData.firstName,
                    authData.lastName,
                ]
                    .filter(Boolean)
                    .join(" "),

                email:
                    authData.email,

                roles:
                    authData.roles || [],

                role:
                    authData.roles?.[0] ||
                    "CUSTOMER",
            };

            // Store JWT
            localStorage.setItem(
                "sneakx_token",
                authData.token
            );

            setUser(
                loggedInUser
            );

            setIsAuthenticated(
                true
            );

            return {
                success: true,
                user: loggedInUser,
            };

        } catch (error) {

            const message =
                error.response?.data?.message ||
                "Invalid email or password.";

            return {
                success: false,
                message,
            };
        }
    };

    // -----------------------------------------
    // REGISTER
    // -----------------------------------------

    const register = async ({
        name,
        email,
        password,
        phone,
    }) => {

        if (
            !name ||
            !email ||
            !password
        ) {
            return {
                success: false,
                message:
                    "All fields are required.",
            };
        }

        try {

            // Split full name into
            // first name + last name.
            const nameParts =
                name
                    .trim()
                    .split(/\s+/);

            const firstName =
                nameParts.shift();

            const lastName =
                nameParts.length > 0
                    ? nameParts.join(" ")
                    : null;

            const response =
                await registerApi({
                    firstName,
                    lastName,
                    email,
                    password,
                    phone,
                });

            if (
                !response?.success ||
                !response?.data
            ) {
                return {
                    success: false,
                    message:
                        response?.message ||
                        "Registration failed.",
                };
            }

            /*
             * Registration does NOT automatically
             * log the user in.
             *
             * The Register page redirects the user
             * to Login after successful registration.
             *
             * Therefore:
             * - Do not store JWT
             * - Do not set user
             * - Do not set isAuthenticated
             */

            return {
                success: true,
                message:
                    response.message ||
                    "Registration successful.",
            };

        } catch (error) {

            const message =
                error.response?.data?.message ||
                "Registration failed.";

            return {
                success: false,
                message,
            };
        }
    };

    // -----------------------------------------
    // UPDATE USER
    // -----------------------------------------

    const updateUser = (updatedData) => {

        if (!user) {
            return {
                success: false,
                message:
                    "No user is currently logged in.",
            };
        }

        const updatedUser = {
            ...user,
            ...updatedData,
        };

        setUser(
            updatedUser
        );

        return {
            success: true,
            message:
                "Profile updated successfully.",
        };
    };

    // -----------------------------------------
    // LOGOUT
    // -----------------------------------------

    const logout = () => {

        setUser(null);

        setIsAuthenticated(
            false
        );

        localStorage.removeItem(
            "sneakx_token"
        );

        localStorage.removeItem(
            "sneakx_user"
        );

        // Remove legacy authentication flag
        localStorage.removeItem(
            "sneakx_isAuthenticated"
        );
    };

    // -----------------------------------------
    // CONTEXT
    // -----------------------------------------

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                register,
                updateUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;