import { motion } from "framer-motion";
import {
    ArrowLeft,
    ChevronRight,
} from "lucide-react";
import {
    Link,
    useParams,
} from "react-router-dom";

import ProductGallery from "../../components/product/ProductGallery";
import ProductInfo from "../../components/product/ProductInfo";

const products = [
    {
        id: 1,
        name: "Air Runner",
        price: 4999,
        category: "Running",
        description:
            "Comfortable running sneakers designed for everyday performance.",
    },
    {
        id: 2,
        name: "Street Force",
        price: 5999,
        category: "Lifestyle",
        description:
            "A stylish sneaker designed for everyday streetwear.",
    },
    {
        id: 3,
        name: "Urban Classic",
        price: 4499,
        category: "Lifestyle",
        description:
            "A classic design that fits perfectly into your everyday wardrobe.",
    },
    {
        id: 4,
        name: "Sport Max",
        price: 6999,
        category: "Sports",
        description:
            "Performance-focused sneakers built for active lifestyles.",
    },
    {
        id: 5,
        name: "Velocity X",
        price: 5499,
        category: "Running",
        description:
            "Lightweight sneakers designed for speed and everyday comfort.",
    },
    {
        id: 6,
        name: "Street Runner",
        price: 4799,
        category: "Lifestyle",
        description:
            "Modern streetwear sneakers with a comfortable everyday design.",
    },
    {
        id: 7,
        name: "Air Motion",
        price: 6299,
        category: "Sports",
        description:
            "Performance sneakers designed for an active lifestyle.",
    },
    {
        id: 8,
        name: "Classic Low",
        price: 3999,
        category: "Lifestyle",
        description:
            "A clean and simple sneaker for everyday wear.",
    },
];

function ProductDetails() {
    const { id } = useParams();

    const product = products.find(
        (item) => item.id === Number(id)
    );

    /*
     * =========================================
     * PRODUCT NOT FOUND
     * =========================================
     */

    if (!product) {
        return (
            <main
                className="min-vh-100 d-flex align-items-center justify-content-center"
                style={{
                    background: "#f7f7f5",
                }}
            >
                <motion.div
                    className="text-center px-4"
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                >
                    <div
                        className="mx-auto mb-4 d-flex align-items-center justify-content-center"
                        style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "20px",
                            background: "#111111",
                            color: "#ffffff",
                            fontSize: "1.4rem",
                            fontWeight: 800,
                        }}
                    >
                        !
                    </div>

                    <h2
                        className="fw-bold mb-2"
                        style={{
                            letterSpacing: "-0.035em",
                        }}
                    >
                        Product Not Found
                    </h2>

                    <p
                        className="mb-4"
                        style={{
                            color: "#777",
                        }}
                    >
                        The product you are looking
                        for does not exist.
                    </p>

                    <Link
                        to="/products"
                        className="btn text-white px-4 py-2 text-decoration-none"
                        style={{
                            background: "#111111",
                            borderRadius: "10px",
                            fontWeight: 700,
                        }}
                    >
                        Browse Sneakers
                    </Link>
                </motion.div>
            </main>
        );
    }

    return (
        <main
            style={{
                background: "#fafaf8",
                minHeight: "100vh",
            }}
        >
            {/* =========================================
                BREADCRUMB
            ========================================== */}

            <div className="container pt-4">

                <motion.div
                    className="d-flex align-items-center gap-2"
                    initial={{
                        opacity: 0,
                        x: -10,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    transition={{
                        duration: 0.4,
                    }}
                    style={{
                        fontSize: "0.72rem",
                    }}
                >
                    <Link
                        to="/products"
                        className="text-decoration-none"
                        style={{
                            color: "#777",
                            fontWeight: 600,
                        }}
                    >
                        Collection
                    </Link>

                    <ChevronRight
                        size={14}
                        color="#aaa"
                    />

                    <span
                        style={{
                            color: "#222",
                            fontWeight: 700,
                        }}
                    >
                        {product.name}
                    </span>
                </motion.div>

            </div>

            {/* =========================================
                PRODUCT
            ========================================== */}

            <section className="container py-4 py-lg-5">

                <div className="row g-4 g-xl-5 align-items-start">

                    {/* =====================================
                        PRODUCT GALLERY
                    ====================================== */}

                    <div className="col-lg-7">

                        <ProductGallery
                            product={product}
                        />

                    </div>

                    {/* =====================================
                        PRODUCT INFORMATION
                    ====================================== */}

                    <div className="col-lg-5">

                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 25,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            transition={{
                                duration: 0.65,
                                delay: 0.1,
                                ease: [
                                    0.22,
                                    1,
                                    0.36,
                                    1,
                                ],
                            }}
                            style={{
                                position: "sticky",
                                top: "110px",
                            }}
                        >

                            {/* Category */}

                            <div
                                className="d-flex align-items-center gap-2 mb-3"
                                style={{
                                    color:
                                        "var(--sx-accent)",
                                    fontSize:
                                        "0.7rem",
                                    fontWeight: 800,
                                    letterSpacing:
                                        "0.1em",
                                    textTransform:
                                        "uppercase",
                                }}
                            >
                                <span
                                    style={{
                                        width: "25px",
                                        height: "2px",
                                        background:
                                            "var(--sx-accent)",
                                    }}
                                />

                                {product.category}
                            </div>

                            {/* Product Title */}

                            <h1
                                className="fw-bold mb-3"
                                style={{
                                    color: "#111113",
                                    fontSize:
                                        "clamp(2.4rem, 5vw, 4rem)",
                                    lineHeight: 0.98,
                                    letterSpacing:
                                        "-0.055em",
                                }}
                            >
                                {product.name}

                                <span
                                    style={{
                                        color:
                                            "var(--sx-accent)",
                                    }}
                                >
                                    .
                                </span>
                            </h1>

                            {/* Description */}

                            <p
                                className="mb-4"
                                style={{
                                    color: "#77777b",
                                    fontSize: "0.95rem",
                                    lineHeight: 1.75,
                                    maxWidth: "500px",
                                }}
                            >
                                {product.description}
                            </p>

                            {/* Price */}

                            <div
                                className="d-flex align-items-end gap-3 mb-4 pb-4"
                                style={{
                                    borderBottom:
                                        "1px solid #e5e5e2",
                                }}
                            >
                                <span
                                    style={{
                                        color: "#111113",
                                        fontSize: "1.8rem",
                                        fontWeight: 850,
                                        letterSpacing:
                                            "-0.035em",
                                    }}
                                >
                                    ₹
                                    {product.price.toLocaleString(
                                        "en-IN"
                                    )}
                                </span>

                                <span
                                    style={{
                                        color: "#999",
                                        fontSize: "0.72rem",
                                        paddingBottom: "5px",
                                    }}
                                >
                                    Inclusive of taxes
                                </span>
                            </div>

                            {/* =====================================
                                EXISTING PRODUCT INFO
                                Contains:
                                - Size
                                - Quantity
                                - Add to Cart
                                - Wishlist
                                - Delivery
                                - Secure Checkout
                            ====================================== */}

                            <ProductInfo
                                product={product}
                            />

                        </motion.div>

                    </div>

                </div>

            </section>

            {/* =========================================
                BACK TO COLLECTION
            ========================================== */}

            <div className="container pb-5">

                <Link
                    to="/products"
                    className="d-inline-flex align-items-center gap-2 text-decoration-none"
                    style={{
                        color: "#555",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                    }}
                >
                    <ArrowLeft size={15} />

                    Back to collection
                </Link>

            </div>

        </main>
    );
}

export default ProductDetails;