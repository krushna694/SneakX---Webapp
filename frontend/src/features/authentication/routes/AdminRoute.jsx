
import { Navigate, Outlet, useLocation } from "react-router-dom";

function AdminRoute() {
    const location = useLocation();
    const token = localStorage.getItem("sneakx_token");

    let user;

    try {
        user = JSON.parse(localStorage.getItem("sneakx_user") || "null");
    } catch {
        user = null;
    }

    const storedRoles = Array.isArray(user?.roles)
        ? user.roles
        : user?.role
            ? [user.role]
            : [];

    const roles = storedRoles
        .map((role) => (typeof role === "string" ? role : role?.name))
        .filter(Boolean);

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!roles.includes("ADMIN")) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default AdminRoute;
