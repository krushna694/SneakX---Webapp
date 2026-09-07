import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    ChevronRight,
    Heart,
    LogOut,
    MapPin,
    Package,
    ShoppingBag,
    ShoppingCart,
    User,
    WalletCards,
    X,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "../../features/authentication/hooks/useAuth";
import { useWishlist } from "../../hooks/useWishlist";
import { useCart } from "../../hooks/useCart";

function Profile() {
    const { user, logout } = useAuth();
    const { wishlistCount } = useWishlist();
    const { cartCount } = useCart();

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        logout();
    };

    const menuSections = [
        {
            title: "ACCOUNT SETTINGS",
            icon: User,
            items: [
                {
                    label: "Profile Information",
                    path: "/profile/account",
                },
                {
                    label: "Manage Addresses",
                    path: "/profile/addresses",
                },
            ],
        },
        {
            title: "PAYMENTS",
            icon: WalletCards,
            items: [
                {
                    label: "Gift Cards",
                    path: "/profile/gift-cards",
                    value: "₹0",
                },
                {
                    label: "Saved UPI",
                    path: "/profile/upi",
                },
                {
                    label: "Saved Cards",
                    path: "/profile/cards",
                },
            ],
        },
        {
            title: "MY STUFF",
            icon: ShoppingBag,
            items: [
                {
                    label: "My Wishlist",
                    path: "/wishlist",
                    value:
                        wishlistCount > 0
                            ? wishlistCount
                            : null,
                },
                {
                    label: "Notifications",
                    path: "/profile/notifications",
                },
            ],
        },
    ];

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#f5f6f8",
                padding: "32px 0 60px",
            }}
        >
            <div className="container">
                {/* PAGE HEADER */}
                <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <p
                        className="text-uppercase fw-semibold mb-1"
                        style={{
                            fontSize: "10px",
                            letterSpacing: "2px",
                            color: "#ff5a1f",
                        }}
                    >
                        My Account
                    </p>

                    <h1
                        className="fw-bold mb-1"
                        style={{
                            fontSize: "30px",
                            color: "#111111",
                        }}
                    >
                        Account Dashboard
                    </h1>

                    <p
                        className="mb-0"
                        style={{
                            color: "#777777",
                            fontSize: "13px",
                        }}
                    >
                        Manage your profile, orders and shopping
                        preferences.
                    </p>
                </motion.div>

                <div className="row g-4">
                    {/* LEFT SIDEBAR */}
                    <div className="col-lg-4 col-xl-3">
                        <motion.div
                            initial={{
                                opacity: 0,
                                x: -20,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            transition={{
                                duration: 0.45,
                            }}
                        >
                            {/* USER CARD */}
                            <div
                                className="bg-white mb-3"
                                style={{
                                    borderRadius: "6px",
                                    border: "1px solid #e8e8e8",
                                    boxShadow:
                                        "0 3px 12px rgba(0,0,0,0.045)",
                                }}
                            >
                                <div
                                    className="p-4 d-flex align-items-center gap-3"
                                >
                                    {/* AVATAR */}
                                    <div
                                        className="d-flex align-items-center justify-content-center flex-shrink-0"
                                        style={{
                                            width: "58px",
                                            height: "58px",
                                            borderRadius: "50%",
                                            background:
                                                "#fff1eb",
                                            color: "#ff5a1f",
                                        }}
                                    >
                                        <User
                                            size={27}
                                            strokeWidth={1.8}
                                        />
                                    </div>

                                    <div
                                        style={{
                                            minWidth: 0,
                                        }}
                                    >
                                        <p
                                            className="mb-1"
                                            style={{
                                                fontSize: "11px",
                                                color: "#888888",
                                            }}
                                        >
                                            Hello,
                                        </p>

                                        <h5
                                            className="fw-bold mb-1 text-truncate"
                                            style={{
                                                fontSize: "16px",
                                                color: "#111111",
                                            }}
                                        >
                                            {user?.name ||
                                                "SneakX Member"}
                                        </h5>

                                        <p
                                            className="mb-0 text-truncate"
                                            style={{
                                                fontSize: "10px",
                                                color: "#999999",
                                            }}
                                        >
                                            {user?.email ||
                                                "Welcome to SneakX"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* ORDERS */}
                            <Link
                                to="/orders"
                                className="text-decoration-none"
                            >
                                <motion.div
                                    className="bg-white mb-3 d-flex align-items-center justify-content-between"
                                    whileHover={{
                                        x: 3,
                                    }}
                                    style={{
                                        minHeight: "62px",
                                        padding:
                                            "0 20px",
                                        borderRadius:
                                            "6px",
                                        border: "1px solid #e8e8e8",
                                        boxShadow:
                                            "0 3px 12px rgba(0,0,0,0.04)",
                                        cursor: "pointer",
                                    }}
                                >
                                    <div className="d-flex align-items-center gap-3">
                                        <Package
                                            size={20}
                                            color="#ff5a1f"
                                        />

                                        <span
                                            className="fw-semibold"
                                            style={{
                                                fontSize: "13px",
                                                color: "#555555",
                                                letterSpacing:
                                                    "0.3px",
                                            }}
                                        >
                                            MY ORDERS
                                        </span>
                                    </div>

                                    <ChevronRight
                                        size={20}
                                        color="#999999"
                                    />
                                </motion.div>
                            </Link>

                            {/* MENU SECTIONS */}
                            <div
                                className="bg-white"
                                style={{
                                    borderRadius: "6px",
                                    border: "1px solid #e8e8e8",
                                    boxShadow:
                                        "0 3px 12px rgba(0,0,0,0.045)",
                                    overflow:
                                        "hidden",
                                }}
                            >
                                {menuSections.map(
                                    (
                                        section,
                                        sectionIndex
                                    ) => {
                                        const SectionIcon =
                                            section.icon;

                                        return (
                                            <div
                                                key={
                                                    section.title
                                                }
                                                style={{
                                                    borderTop:
                                                        sectionIndex !==
                                                            0
                                                            ? "1px solid #eeeeee"
                                                            : "none",
                                                }}
                                            >
                                                {/* SECTION HEADER */}
                                                <div
                                                    className="d-flex align-items-center gap-3 px-4"
                                                    style={{
                                                        height: "60px",
                                                    }}
                                                >
                                                    <SectionIcon
                                                        size={
                                                            19
                                                        }
                                                        color="#ff5a1f"
                                                        strokeWidth={
                                                            2
                                                        }
                                                    />

                                                    <span
                                                        className="fw-semibold"
                                                        style={{
                                                            fontSize:
                                                                "12px",
                                                            color:
                                                                "#666666",
                                                            letterSpacing:
                                                                "0.5px",
                                                        }}
                                                    >
                                                        {
                                                            section.title
                                                        }
                                                    </span>
                                                </div>

                                                {/* SECTION ITEMS */}
                                                <div
                                                    style={{
                                                        paddingBottom:
                                                            "8px",
                                                    }}
                                                >
                                                    {section.items.map(
                                                        (
                                                            item
                                                        ) => (
                                                            <Link
                                                                key={
                                                                    item.label
                                                                }
                                                                to={
                                                                    item.path
                                                                }
                                                                className="text-decoration-none"
                                                            >
                                                                <motion.div
                                                                    className="d-flex align-items-center justify-content-between"
                                                                    whileHover={{
                                                                        backgroundColor:
                                                                            "#fff8f4",
                                                                        paddingLeft:
                                                                            "30px",
                                                                    }}
                                                                    style={{
                                                                        minHeight:
                                                                            "44px",
                                                                        padding:
                                                                            "0 24px 0 28px",
                                                                        color:
                                                                            "#333333",
                                                                        transition:
                                                                            "background-color 0.2s ease",
                                                                    }}
                                                                >
                                                                    <span
                                                                        style={{
                                                                            fontSize:
                                                                                "12px",
                                                                        }}
                                                                    >
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </span>

                                                                    {item.value !==
                                                                        null &&
                                                                        item.value !==
                                                                        undefined && (
                                                                            <span
                                                                                style={{
                                                                                    fontSize:
                                                                                        "11px",
                                                                                    fontWeight:
                                                                                        "700",
                                                                                    color:
                                                                                        item.label ===
                                                                                            "Gift Cards"
                                                                                            ? "#239b45"
                                                                                            : "#ff5a1f",
                                                                                }}
                                                                            >
                                                                                {
                                                                                    item.value
                                                                                }
                                                                            </span>
                                                                        )}
                                                                </motion.div>
                                                            </Link>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    }
                                )}

                                {/* LOGOUT */}
                                <motion.button
                                    type="button"
                                    className="w-100 border-0 bg-white d-flex align-items-center gap-3"
                                    onClick={() =>
                                        setShowLogoutModal(
                                            true
                                        )
                                    }
                                    whileHover={{
                                        backgroundColor:
                                            "#fff8f4",
                                    }}
                                    style={{
                                        minHeight:
                                            "62px",
                                        padding:
                                            "0 24px",
                                        borderTop:
                                            "1px solid #eeeeee",
                                        color: "#666666",
                                        fontSize:
                                            "12px",
                                        fontWeight:
                                            "600",
                                        textAlign:
                                            "left",
                                    }}
                                >
                                    <LogOut
                                        size={19}
                                        color="#ff5a1f"
                                    />

                                    Logout
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="col-lg-8 col-xl-9">
                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 20,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            transition={{
                                duration: 0.45,
                                delay: 0.05,
                            }}
                        >
                            {/* WELCOME PANEL */}
                            <div
                                className="bg-white mb-4"
                                style={{
                                    borderRadius: "6px",
                                    border: "1px solid #e8e8e8",
                                    boxShadow:
                                        "0 3px 12px rgba(0,0,0,0.045)",
                                    overflow:
                                        "hidden",
                                }}
                            >
                                <div
                                    className="p-4 p-md-5"
                                    style={{
                                        borderLeft:
                                            "4px solid #ff5a1f",
                                    }}
                                >
                                    <p
                                        className="text-uppercase fw-semibold mb-2"
                                        style={{
                                            fontSize: "9px",
                                            letterSpacing:
                                                "2px",
                                            color: "#999999",
                                        }}
                                    >
                                        SneakX Account
                                    </p>

                                    <h2
                                        className="fw-bold mb-2"
                                        style={{
                                            fontSize:
                                                "24px",
                                            color: "#111111",
                                        }}
                                    >
                                        Welcome back,{" "}
                                        {user?.name ||
                                            "SneakX Member"}
                                    </h2>

                                    <p
                                        className="mb-0"
                                        style={{
                                            maxWidth:
                                                "650px",
                                            fontSize:
                                                "13px",
                                            lineHeight:
                                                "1.7",
                                            color: "#777777",
                                        }}
                                    >
                                        Manage your
                                        orders,
                                        addresses,
                                        wishlist and
                                        account
                                        preferences
                                        from one place.
                                    </p>
                                </div>
                            </div>

                            {/* QUICK ACCESS */}
                            <div className="mb-4">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div>
                                        <p
                                            className="text-uppercase fw-semibold mb-1"
                                            style={{
                                                fontSize:
                                                    "9px",
                                                letterSpacing:
                                                    "1.8px",
                                                color:
                                                    "#999999",
                                            }}
                                        >
                                            Quick Access
                                        </p>

                                        <h4
                                            className="fw-bold mb-0"
                                            style={{
                                                fontSize:
                                                    "19px",
                                            }}
                                        >
                                            Your Shopping
                                            Activity
                                        </h4>
                                    </div>
                                </div>

                                <div className="row g-3">
                                    {/* ORDERS */}
                                    <div className="col-md-4">
                                        <DashboardCard
                                            icon={
                                                <Package
                                                    size={
                                                        21
                                                    }
                                                />
                                            }
                                            title="My Orders"
                                            description="View and track your orders."
                                            link="/orders"
                                        />
                                    </div>

                                    {/* WISHLIST */}
                                    <div className="col-md-4">
                                        <DashboardCard
                                            icon={
                                                <Heart
                                                    size={
                                                        21
                                                    }
                                                />
                                            }
                                            title="Wishlist"
                                            description={
                                                wishlistCount >
                                                    0
                                                    ? `${wishlistCount} item${wishlistCount >
                                                        1
                                                        ? "s"
                                                        : ""
                                                    } saved`
                                                    : "Your saved products"
                                            }
                                            link="/wishlist"
                                            count={
                                                wishlistCount >
                                                    0
                                                    ? wishlistCount
                                                    : null
                                            }
                                        />
                                    </div>

                                    {/* ADDRESSES */}
                                    <div className="col-md-4">
                                        <DashboardCard
                                            icon={
                                                <MapPin
                                                    size={
                                                        21
                                                    }
                                                />
                                            }
                                            title="Addresses"
                                            description="Manage delivery addresses."
                                            link="/profile/addresses"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* ACCOUNT INFORMATION */}
                            <div className="mb-4">
                                <p
                                    className="text-uppercase fw-semibold mb-1"
                                    style={{
                                        fontSize: "9px",
                                        letterSpacing:
                                            "1.8px",
                                        color: "#999999",
                                    }}
                                >
                                    Account
                                </p>

                                <h4
                                    className="fw-bold mb-3"
                                    style={{
                                        fontSize: "19px",
                                    }}
                                >
                                    Account Information
                                </h4>

                                <div
                                    className="bg-white"
                                    style={{
                                        borderRadius: "6px",
                                        border: "1px solid #e8e8e8",
                                        boxShadow:
                                            "0 3px 12px rgba(0,0,0,0.04)",
                                    }}
                                >
                                    <div className="row g-0">
                                        {/* NAME */}
                                        <InfoItem
                                            label="Full Name"
                                            value={
                                                user?.name ||
                                                "Not available"
                                            }
                                        />

                                        {/* EMAIL */}
                                        <InfoItem
                                            label="Email Address"
                                            value={
                                                user?.email ||
                                                "Not available"
                                            }
                                        />

                                        {/* ACCOUNT TYPE */}
                                        <InfoItem
                                            label="Account Type"
                                            value={
                                                user?.role ||
                                                "USER"
                                            }
                                        />

                                        {/* STATUS */}
                                        <InfoItem
                                            label="Account Status"
                                            value="Active"
                                            valueColor="#239b45"
                                        />
                                    </div>

                                    <div
                                        style={{
                                            borderTop:
                                                "1px solid #eeeeee",
                                        }}
                                    >
                                        <Link
                                            to="/profile/account"
                                            className="text-decoration-none"
                                        >
                                            <motion.div
                                                className="d-flex align-items-center justify-content-between"
                                                whileHover={{
                                                    backgroundColor:
                                                        "#fff8f4",
                                                }}
                                                style={{
                                                    padding:
                                                        "16px 20px",
                                                    color: "#ff5a1f",
                                                    fontSize:
                                                        "12px",
                                                    fontWeight:
                                                        "600",
                                                }}
                                            >
                                                <span>
                                                    Update
                                                    Profile
                                                    Information
                                                </span>

                                                <ArrowRight
                                                    size={
                                                        16
                                                    }
                                                />
                                            </motion.div>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* SHOPPING CART */}
                            <div>
                                <p
                                    className="text-uppercase fw-semibold mb-1"
                                    style={{
                                        fontSize: "9px",
                                        letterSpacing:
                                            "1.8px",
                                        color: "#999999",
                                    }}
                                >
                                    Shopping
                                </p>

                                <h4
                                    className="fw-bold mb-3"
                                    style={{
                                        fontSize: "19px",
                                    }}
                                >
                                    Shopping Cart
                                </h4>

                                <div
                                    className="bg-white d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3"
                                    style={{
                                        padding:
                                            "22px 24px",
                                        borderRadius: "6px",
                                        border: "1px solid #e8e8e8",
                                        boxShadow:
                                            "0 3px 12px rgba(0,0,0,0.04)",
                                    }}
                                >
                                    <div className="d-flex align-items-center gap-3">
                                        <div
                                            className="d-flex align-items-center justify-content-center"
                                            style={{
                                                width:
                                                    "44px",
                                                height:
                                                    "44px",
                                                borderRadius:
                                                    "10px",
                                                background:
                                                    "#fff1eb",
                                                color: "#ff5a1f",
                                            }}
                                        >
                                            <ShoppingCart
                                                size={
                                                    20
                                                }
                                            />
                                        </div>

                                        <div>
                                            <h6
                                                className="fw-bold mb-1"
                                                style={{
                                                    fontSize:
                                                        "13px",
                                                }}
                                            >
                                                {cartCount >
                                                    0
                                                    ? `${cartCount} item${cartCount >
                                                        1
                                                        ? "s"
                                                        : ""
                                                    } in your cart`
                                                    : "Your cart is empty"}
                                            </h6>

                                            <p
                                                className="mb-0"
                                                style={{
                                                    fontSize:
                                                        "11px",
                                                    color:
                                                        "#888888",
                                                }}
                                            >
                                                {cartCount >
                                                    0
                                                    ? "Review your items before checkout."
                                                    : "Explore our latest sneaker collection."}
                                            </p>
                                        </div>
                                    </div>

                                    <Link
                                        to="/cart"
                                        className="text-decoration-none"
                                    >
                                        <motion.button
                                            type="button"
                                            className="btn d-inline-flex align-items-center justify-content-center gap-2"
                                            whileHover={{
                                                scale: 1.02,
                                            }}
                                            whileTap={{
                                                scale: 0.97,
                                            }}
                                            style={{
                                                minWidth:
                                                    "125px",
                                                padding:
                                                    "10px 16px",
                                                borderRadius:
                                                    "8px",
                                                background:
                                                    "#111111",
                                                color: "#ffffff",
                                                border: "none",
                                                fontSize:
                                                    "11px",
                                                fontWeight:
                                                    "600",
                                            }}
                                        >
                                            View Cart
                                            <ArrowRight
                                                size={
                                                    14
                                                }
                                            />
                                        </motion.button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* LOGOUT MODAL */}
            <AnimatePresence>
                {showLogoutModal && (
                    <motion.div
                        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        style={{
                            zIndex: 3000,
                            background:
                                "rgba(0,0,0,0.48)",
                            backdropFilter:
                                "blur(6px)",
                            padding: "20px",
                        }}
                        onClick={() =>
                            setShowLogoutModal(
                                false
                            )
                        }
                    >
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.94,
                                y: 15,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.94,
                                y: 15,
                            }}
                            transition={{
                                duration: 0.25,
                            }}
                            className="bg-white position-relative"
                            style={{
                                width: "100%",
                                maxWidth:
                                    "420px",
                                borderRadius:
                                    "16px",
                                boxShadow:
                                    "0 25px 70px rgba(0,0,0,0.2)",
                            }}
                            onClick={(event) =>
                                event.stopPropagation()
                            }
                        >
                            <button
                                type="button"
                                className="btn position-absolute top-0 end-0 mt-3 me-3 d-flex align-items-center justify-content-center"
                                onClick={() =>
                                    setShowLogoutModal(
                                        false
                                    )
                                }
                                style={{
                                    width: "32px",
                                    height: "32px",
                                    borderRadius:
                                        "50%",
                                    border: "1px solid #eeeeee",
                                    background:
                                        "#ffffff",
                                    color: "#777777",
                                }}
                            >
                                <X size={15} />
                            </button>

                            <div className="p-4 p-md-5">
                                <div
                                    className="d-flex align-items-center justify-content-center mb-4"
                                    style={{
                                        width: "52px",
                                        height: "52px",
                                        borderRadius:
                                            "14px",
                                        background:
                                            "#fff1eb",
                                        color: "#ff5a1f",
                                    }}
                                >
                                    <LogOut
                                        size={22}
                                    />
                                </div>

                                <h4
                                    className="fw-bold mb-2"
                                    style={{
                                        fontSize:
                                            "20px",
                                    }}
                                >
                                    Logout from SneakX?
                                </h4>

                                <p
                                    className="mb-4"
                                    style={{
                                        fontSize:
                                            "12px",
                                        lineHeight:
                                            "1.7",
                                        color: "#777777",
                                    }}
                                >
                                    You will be
                                    signed out of
                                    your current
                                    SneakX account.
                                </p>

                                <div className="d-flex gap-2">
                                    <motion.button
                                        type="button"
                                        className="btn flex-grow-1"
                                        onClick={() =>
                                            setShowLogoutModal(
                                                false
                                            )
                                        }
                                        whileTap={{
                                            scale: 0.97,
                                        }}
                                        style={{
                                            border:
                                                "1px solid #eeeeee",
                                            background:
                                                "#ffffff",
                                            borderRadius:
                                                "9px",
                                            padding:
                                                "11px",
                                            fontSize:
                                                "11px",
                                            fontWeight:
                                                "600",
                                            color:
                                                "#555555",
                                        }}
                                    >
                                        Cancel
                                    </motion.button>

                                    <motion.button
                                        type="button"
                                        className="btn flex-grow-1"
                                        onClick={
                                            handleLogout
                                        }
                                        whileHover={{
                                            backgroundColor:
                                                "#e94e16",
                                        }}
                                        whileTap={{
                                            scale: 0.97,
                                        }}
                                        style={{
                                            border: "none",
                                            background:
                                                "#ff5a1f",
                                            borderRadius:
                                                "9px",
                                            padding:
                                                "11px",
                                            fontSize:
                                                "11px",
                                            fontWeight:
                                                "600",
                                            color:
                                                "#ffffff",
                                        }}
                                    >
                                        Logout
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* -------------------------------------------------------
   DASHBOARD CARD
------------------------------------------------------- */

function DashboardCard({
    icon,
    title,
    description,
    link,
    count,
}) {
    return (
        <Link
            to={link}
            className="text-decoration-none"
        >
            <motion.div
                className="bg-white h-100 position-relative overflow-hidden"
                whileHover={{
                    y: -4,
                    boxShadow:
                        "0 12px 30px rgba(0,0,0,0.08)",
                }}
                whileTap={{
                    scale: 0.98,
                }}
                style={{
                    minHeight: "145px",
                    padding: "20px",
                    borderRadius: "6px",
                    border: "1px solid #e8e8e8",
                    boxShadow:
                        "0 3px 12px rgba(0,0,0,0.04)",
                    transition:
                        "box-shadow 0.25s ease",
                }}
            >
                {/* ORANGE TOP LINE */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background:
                            "#ff5a1f",
                    }}
                />

                <div className="d-flex align-items-start justify-content-between">
                    <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                            width: "42px",
                            height: "42px",
                            borderRadius:
                                "10px",
                            background:
                                "#fff1eb",
                            color: "#ff5a1f",
                        }}
                    >
                        {icon}
                    </div>

                    {count !== null &&
                        count !== undefined && (
                            <span
                                className="d-flex align-items-center justify-content-center"
                                style={{
                                    minWidth: "24px",
                                    height: "24px",
                                    padding:
                                        "0 7px",
                                    borderRadius:
                                        "20px",
                                    background:
                                        "#111111",
                                    color: "#ffffff",
                                    fontSize:
                                        "10px",
                                    fontWeight:
                                        "700",
                                }}
                            >
                                {count}
                            </span>
                        )}
                </div>

                <div className="mt-3">
                    <h6
                        className="fw-bold mb-1"
                        style={{
                            fontSize: "13px",
                            color: "#111111",
                        }}
                    >
                        {title}
                    </h6>

                    <p
                        className="mb-0"
                        style={{
                            fontSize: "10px",
                            color: "#888888",
                            lineHeight:
                                "1.5",
                        }}
                    >
                        {description}
                    </p>
                </div>
            </motion.div>
        </Link>
    );
}

/* -------------------------------------------------------
   ACCOUNT INFO ITEM
------------------------------------------------------- */

function InfoItem({
    label,
    value,
    valueColor,
}) {
    return (
        <div className="col-md-6">
            <div
                style={{
                    padding:
                        "20px 22px",
                    borderBottom:
                        "1px solid #eeeeee",
                }}
            >
                <p
                    className="mb-1"
                    style={{
                        fontSize: "9px",
                        color: "#999999",
                        textTransform:
                            "uppercase",
                        letterSpacing:
                            "1px",
                        fontWeight:
                            "600",
                    }}
                >
                    {label}
                </p>

                <p
                    className="mb-0 fw-semibold text-break"
                    style={{
                        fontSize: "13px",
                        color:
                            valueColor ||
                            "#333333",
                    }}
                >
                    {value}
                </p>
            </div>
        </div>
    );
}

export default Profile;