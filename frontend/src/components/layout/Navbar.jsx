import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";
import UserMenu from "./UserMenu";

function Navbar() {
    const { cartCount } = useCart();
    const { wishlistCount } = useWishlist();

    return (
        <nav
            className="navbar navbar-expand-lg bg-dark navbar-dark"
            style={{
                position: "relative",
                zIndex: 1055,
                overflow: "visible",
            }}
        >
            <div
                className="container"
                style={{
                    overflow: "visible",
                }}
            >
                {/* Brand */}
                <Link
                    className="navbar-brand fw-bold"
                    to="/"
                >
                    SneakX
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navigation Links */}
                <div
                    className="collapse navbar-collapse"
                    id="navbarContent"
                    style={{
                        overflow: "visible",
                    }}
                >
                    <ul
                        className="navbar-nav ms-auto"
                        style={{
                            overflow: "visible",
                        }}
                    >
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/"
                            >
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/products"
                            >
                                Products
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/wishlist"
                            >
                                Wishlist ({wishlistCount})
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/cart"
                            >
                                Cart ({cartCount})
                            </Link>
                        </li>

                        <UserMenu />
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;