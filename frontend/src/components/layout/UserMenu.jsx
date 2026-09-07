import { motion } from "framer-motion";
import {
    ChevronDown,
    Heart,
    LogOut,
    MapPin,
    Package,
    Settings,
    User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../features/authentication/hooks/useAuth";
import "./UserMenu.css";

function UserMenu() {
    const { user, isAuthenticated, logout } = useAuth();

    if (!isAuthenticated) {
        return (
            <li className="sx-user-menu-item">
                <Link
                    className="sx-login-button"
                    to="/login"
                >
                    <User size={17} />
                    <span>Login</span>
                </Link>
            </li>
        );
    }

    return (
        <li className="sx-user-menu-item dropdown">

            <button
                className="sx-account-trigger dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                title="Account"
            >
                <span className="sx-account-avatar">
                    <User size={17} />
                </span>

                <span className="sx-account-name">
                    {user?.name?.split(" ")[0] || "Account"}
                </span>

                <ChevronDown
                    className="sx-account-chevron"
                    size={15}
                />
            </button>

            <ul
                className="dropdown-menu dropdown-menu-end sx-account-dropdown"
            >

                {/* User Header */}
                <li>
                    <div className="sx-account-header">

                        <div className="sx-account-large-avatar">
                            <User size={22} />
                        </div>

                        <div className="sx-account-user-info">
                            <strong>
                                {user?.name}
                            </strong>

                            <span>
                                {user?.email}
                            </span>
                        </div>

                    </div>
                </li>

                <li>
                    <div className="sx-dropdown-divider" />
                </li>

                {/* Profile */}
                <li>
                    <Link
                        className="sx-dropdown-item"
                        to="/profile"
                    >
                        <span className="sx-dropdown-icon">
                            <User size={17} />
                        </span>

                        <span>My Profile</span>
                    </Link>
                </li>

                {/* Orders */}
                <li>
                    <Link
                        className="sx-dropdown-item"
                        to="/orders"
                    >
                        <span className="sx-dropdown-icon">
                            <Package size={17} />
                        </span>

                        <span>My Orders</span>
                    </Link>
                </li>

                {/* Wishlist */}
                <li>
                    <Link
                        className="sx-dropdown-item"
                        to="/wishlist"
                    >
                        <span className="sx-dropdown-icon">
                            <Heart size={17} />
                        </span>

                        <span>Wishlist</span>
                    </Link>
                </li>

                {/* Addresses */}
                <li>
                    <Link
                        className="sx-dropdown-item"
                        to="/profile/addresses"
                    >
                        <span className="sx-dropdown-icon">
                            <MapPin size={17} />
                        </span>

                        <span>Addresses</span>
                    </Link>
                </li>

                {/* Account Settings */}
                <li>
                    <Link
                        className="sx-dropdown-item"
                        to="/profile/account"
                    >
                        <span className="sx-dropdown-icon">
                            <Settings size={17} />
                        </span>

                        <span>Account Settings</span>
                    </Link>
                </li>

                <li>
                    <div className="sx-dropdown-divider" />
                </li>

                {/* Logout */}
                <li>
                    <motion.button
                        type="button"
                        className="sx-dropdown-item sx-logout-item"
                        onClick={logout}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="sx-dropdown-icon">
                            <LogOut size={17} />
                        </span>

                        <span>Logout</span>
                    </motion.button>
                </li>

            </ul>
        </li>
    );
}

export default UserMenu;