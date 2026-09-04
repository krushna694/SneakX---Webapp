import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("sneakx_user");

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    });

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return (
            localStorage.getItem(
                "sneakx_isAuthenticated"
            ) === "true"
        );
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem(
                "sneakx_user",
                JSON.stringify(user)
            );
        } else {
            localStorage.removeItem("sneakx_user");
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem(
            "sneakx_isAuthenticated",
            isAuthenticated.toString()
        );
    }, [isAuthenticated]);

    // -----------------------------------------
    // LOGIN
    // -----------------------------------------

    const login = (email, password) => {

        if (!email || !password) {
            return {
                success: false,
                message:
                    "Email and password are required."
            };
        }

        const normalizedEmail =
            email.trim().toLowerCase();

        const savedUsers =
            localStorage.getItem("sneakx_users");

        const users = savedUsers
            ? JSON.parse(savedUsers)
            : [];

        const existingUser = users.find(
            (registeredUser) =>
                registeredUser.email ===
                normalizedEmail &&
                registeredUser.password === password
        );

        if (!existingUser) {
            return {
                success: false,
                message:
                    "Invalid email or password."
            };
        }

        const loggedInUser = {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role
        };

        setUser(loggedInUser);
        setIsAuthenticated(true);

        return {
            success: true,
            user: loggedInUser
        };
    };

    // -----------------------------------------
    // REGISTER
    // -----------------------------------------

    const register = ({
        name,
        email,
        password
    }) => {

        if (!name || !email || !password) {
            return {
                success: false,
                message:
                    "All fields are required."
            };
        }

        const normalizedEmail =
            email.trim().toLowerCase();

        const savedUsers =
            localStorage.getItem("sneakx_users");

        const users = savedUsers
            ? JSON.parse(savedUsers)
            : [];

        const existingUser = users.find(
            (registeredUser) =>
                registeredUser.email ===
                normalizedEmail
        );

        if (existingUser) {
            return {
                success: false,
                message:
                    "An account with this email already exists."
            };
        }

        const newUser = {
            id: Date.now(),
            name: name.trim(),
            email: normalizedEmail,
            password: password,
            role: "USER"
        };

        const updatedUsers = [
            ...users,
            newUser
        ];

        localStorage.setItem(
            "sneakx_users",
            JSON.stringify(updatedUsers)
        );

        return {
            success: true,
            message:
                "Registration successful."
        };
    };

    // -----------------------------------------
    // UPDATE USER
    // -----------------------------------------

    const updateUser = (updatedData) => {

        if (!user) {
            return {
                success: false,
                message:
                    "No user is currently logged in."
            };
        }

        const updatedUser = {
            ...user,
            ...updatedData
        };

        setUser(updatedUser);

        /*
         * Also update the registered user's
         * information inside sneakx_users.
         */
        const savedUsers =
            localStorage.getItem("sneakx_users");

        const users = savedUsers
            ? JSON.parse(savedUsers)
            : [];

        const updatedUsers = users.map(
            (registeredUser) =>
                registeredUser.id === user.id
                    ? {
                        ...registeredUser,
                        ...updatedData
                    }
                    : registeredUser
        );

        localStorage.setItem(
            "sneakx_users",
            JSON.stringify(updatedUsers)
        );

        return {
            success: true,
            message:
                "Profile updated successfully."
        };
    };

    // -----------------------------------------
    // LOGOUT
    // -----------------------------------------

    const logout = () => {

        setUser(null);
        setIsAuthenticated(false);

        localStorage.removeItem(
            "sneakx_user"
        );

        localStorage.removeItem(
            "sneakx_isAuthenticated"
        );
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                register,
                updateUser,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;