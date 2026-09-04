import { Link } from "react-router-dom";
import {
    User,
    Package,
    Heart,
    MapPin,
    Settings,
    LogOut
} from "lucide-react";
import { useAuth } from "../../features/authentication/hooks/useAuth";

function UserMenu() {
    const { user, isAuthenticated, logout } = useAuth();

    if (!isAuthenticated) {
        return (
            <li className="nav-item">
                <Link className="nav-link" to="/login">
                    Login
                </Link>
            </li>
        );
    }

    return (
        <li className="nav-item dropdown">

            <button
                className="btn btn-link nav-link dropdown-toggle d-flex align-items-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                title="Account"
            >
                <User size={21} strokeWidth={1.8} />
            </button>

            <ul className="dropdown-menu dropdown-menu-end">

                {/* User Information */}
                <li>
                    <div className="dropdown-header">
                        <strong>{user?.name}</strong>

                        <br />

                        <small className="text-muted">
                            {user?.email}
                        </small>
                    </div>
                </li>

                <li>
                    <hr className="dropdown-divider" />
                </li>

                {/* Profile */}
                <li>
                    <Link
                        className="dropdown-item d-flex align-items-center gap-2"
                        to="/profile"
                    >
                        <User size={17} />
                        My Profile
                    </Link>
                </li>

                {/* Orders */}
                <li>
                    <Link
                        className="dropdown-item d-flex align-items-center gap-2"
                        to="/orders"
                    >
                        <Package size={17} />
                        My Orders
                    </Link>
                </li>

                {/* Wishlist */}
                <li>
                    <Link
                        className="dropdown-item d-flex align-items-center gap-2"
                        to="/wishlist"
                    >
                        <Heart size={17} />
                        Wishlist
                    </Link>
                </li>

                {/* Addresses */}
                <li>
                    <Link
                        className="dropdown-item d-flex align-items-center gap-2"
                        to="/profile/addresses"
                    >
                        <MapPin size={17} />
                        Addresses
                    </Link>
                </li>

                {/* Account */}
                <li>
                    <Link
                        className="dropdown-item d-flex align-items-center gap-2"
                        to="/profile/account"
                    >
                        <Settings size={17} />
                        Account Settings
                    </Link>
                </li>

                <li>
                    <hr className="dropdown-divider" />
                </li>

                {/* Logout */}
                <li>
                    <button
                        className="dropdown-item text-danger d-flex align-items-center gap-2"
                        onClick={logout}
                    >
                        <LogOut size={17} />
                        Logout
                    </button>
                </li>

            </ul>
        </li>
    );
}

export default UserMenu;