import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("sneakx_user");

        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem("sneakx_isAuthenticated") === "true";
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

    // Temporary frontend login
    const login = (email, password) => {

        if (!email || !password) {
            return {
                success: false,
                message: "Email and password are required."
            };
        }

        const loggedInUser = {
            id: 1,
            name: "SneakX User",
            email: email,
            role: "USER"
        };

        setUser(loggedInUser);
        setIsAuthenticated(true);

        return {
            success: true,
            user: loggedInUser
        };
    };
    const updateUser = (updatedData) => {
        setUser((currentUser) => {
            const updatedUser = {
                ...currentUser,
                ...updatedData,
            };

            return updatedUser;
        });

        return {
            success: true,
            message: "Profile updated successfully.",
        };
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);

        localStorage.removeItem("sneakx_user");
        localStorage.removeItem("sneakx_isAuthenticated");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                updateUser,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;