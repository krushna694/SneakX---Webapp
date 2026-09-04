import { motion } from "framer-motion";
import {
    User,
    Heart,
    Package,
    MapPin,
    Settings,
    ShoppingCart,
    ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../features/authentication/hooks/useAuth";
import { useWishlist } from "../../hooks/useWishlist";
import { useCart } from "../../hooks/useCart";

function Profile() {
    const { user } = useAuth();
    const { wishlistCount } = useWishlist();
    const { cartCount } = useCart();

    const cardAnimation = {
        whileHover: {
            y: -5,
            scale: 1.02
        },
        transition: {
            duration: 0.2
        }
    };

    return (
        <div className="container py-5">

            {/* Page Header */}
            <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h1>My Profile</h1>

                <p className="text-muted">
                    Manage your account and shopping activity.
                </p>
            </motion.div>


            {/* User Information */}
            <motion.div
                className="card shadow-sm mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="card-body">

                    {/* User Header */}
                    <div className="d-flex align-items-center mb-4">

                        <div
                            className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center me-3"
                            style={{
                                width: "60px",
                                height: "60px"
                            }}
                        >
                            <User
                                size={28}
                                strokeWidth={1.7}
                            />
                        </div>

                        <div>
                            <h4 className="mb-1">
                                {user?.name}
                            </h4>

                            <p className="text-muted mb-0">
                                {user?.email}
                            </p>
                        </div>

                    </div>


                    {/* User Details */}
                    <div className="row">

                        <div className="col-md-4 mb-3">
                            <strong>Name</strong>

                            <p className="text-muted mb-0">
                                {user?.name}
                            </p>
                        </div>

                        <div className="col-md-4 mb-3">
                            <strong>Email</strong>

                            <p className="text-muted mb-0">
                                {user?.email}
                            </p>
                        </div>

                        <div className="col-md-4 mb-3">
                            <strong>Account Type</strong>

                            <p className="text-muted mb-0">
                                {user?.role}
                            </p>
                        </div>

                    </div>


                    {/* Update Information */}
                    <Link
                        to="/profile/account"
                        className="btn btn-dark d-inline-flex align-items-center gap-2"
                    >
                        Update Information
                        <ArrowRight size={17} />
                    </Link>

                </div>
            </motion.div>


            {/* Account Sections */}
            <div className="row g-4">


                {/* Wishlist */}
                <div className="col-md-6 col-lg-3">

                    <Link
                        to="/wishlist"
                        className="text-decoration-none text-dark"
                    >

                        <motion.div
                            className="card h-100 shadow-sm"
                            {...cardAnimation}
                        >

                            <div className="card-body text-center">

                                <Heart
                                    size={40}
                                    strokeWidth={1.7}
                                    className="mb-3"
                                />

                                <h5>
                                    Wishlist
                                </h5>

                                <p className="text-muted mb-0">
                                    {wishlistCount} item
                                    {wishlistCount !== 1 ? "s" : ""}
                                </p>

                            </div>

                        </motion.div>

                    </Link>

                </div>


                {/* Orders */}
                <div className="col-md-6 col-lg-3">

                    <Link
                        to="/orders"
                        className="text-decoration-none text-dark"
                    >

                        <motion.div
                            className="card h-100 shadow-sm"
                            {...cardAnimation}
                        >

                            <div className="card-body text-center">

                                <Package
                                    size={40}
                                    strokeWidth={1.7}
                                    className="mb-3"
                                />

                                <h5>
                                    My Orders
                                </h5>

                                <p className="text-muted mb-0">
                                    View your orders
                                </p>

                            </div>

                        </motion.div>

                    </Link>

                </div>


                {/* Addresses */}
                <div className="col-md-6 col-lg-3">

                    <Link
                        to="/profile/addresses"
                        className="text-decoration-none text-dark"
                    >

                        <motion.div
                            className="card h-100 shadow-sm"
                            {...cardAnimation}
                        >

                            <div className="card-body text-center">

                                <MapPin
                                    size={40}
                                    strokeWidth={1.7}
                                    className="mb-3"
                                />

                                <h5>
                                    Addresses
                                </h5>

                                <p className="text-muted mb-0">
                                    Manage addresses
                                </p>

                            </div>

                        </motion.div>

                    </Link>

                </div>


                {/* Account */}
                <div className="col-md-6 col-lg-3">

                    <Link
                        to="/profile/account"
                        className="text-decoration-none text-dark"
                    >

                        <motion.div
                            className="card h-100 shadow-sm"
                            {...cardAnimation}
                        >

                            <div className="card-body text-center">

                                <Settings
                                    size={40}
                                    strokeWidth={1.7}
                                    className="mb-3"
                                />

                                <h5>
                                    Account
                                </h5>

                                <p className="text-muted mb-0">
                                    Account settings
                                </p>

                            </div>

                        </motion.div>

                    </Link>

                </div>

            </div>


            {/* Cart Summary */}
            <motion.div
                className="card shadow-sm mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.4,
                    delay: 0.2
                }}
            >

                <div className="card-body d-flex justify-content-between align-items-center">

                    <div className="d-flex align-items-center gap-3">

                        <ShoppingCart
                            size={26}
                            strokeWidth={1.7}
                        />

                        <div>

                            <h5 className="mb-1">
                                Shopping Cart
                            </h5>

                            <p className="text-muted mb-0">
                                {cartCount} item
                                {cartCount !== 1 ? "s" : ""} in your cart
                            </p>

                        </div>

                    </div>


                    <Link
                        to="/cart"
                        className="btn btn-outline-dark d-flex align-items-center gap-2"
                    >
                        View Cart
                        <ArrowRight size={17} />
                    </Link>

                </div>

            </motion.div>

        </div>
    );
}

export default Profile;