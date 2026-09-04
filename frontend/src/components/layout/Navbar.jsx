import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container">

                {/* Brand */}
                <Link className="navbar-brand fw-bold" to="/">
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
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/products">
                                Products
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/wishlist">
                                Wishlist
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">
                                Cart
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/login">
                                Login
                            </Link>
                        </li>

                    </ul>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;