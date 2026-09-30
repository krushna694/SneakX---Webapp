import { useEffect, useState } from "react";
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
import {
    getProductByIdApi,
} from "../../api/productApi";

function ProductDetails() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const loadProduct = async () => {
            try {
                setIsLoading(true);
                setError("");

                const response =
                    await getProductByIdApi(id);

                if (!response?.success) {
                    throw new Error(
                        response?.message ||
                        "Failed to load product."
                    );
                }

                if (isMounted) {
                    setProduct(response.data);
                }
            } catch (error) {
                if (isMounted) {
                    setError(
                        error.response?.data?.message ||
                        error.message ||
                        "Unable to load product."
                    );
                    setProduct(null);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        if (id) {
            loadProduct();
        }

        return () => {
            isMounted = false;
        };
    }, [id]);

    // ==========================================
    // LOADING
    // ==========================================

    if (isLoading) {
        return (
            <main
                className="min-vh-100 d-flex align-items-center justify-content-center"
                style={{
                    background: "#f7f7f5",
                }}
            >
                <div
                    className="text-center"
                    style={{
                        color: "#777",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                    }}
                >
                    Loading product...
                </div>
            </main>
        );
    }

    // ==========================================
    // PRODUCT NOT FOUND / ERROR
    // ==========================================

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
                        Unable to Load Product
                    </h2>

                    <p
                        className="mb-4"
                        style={{
                            color: "#777",
                        }}
                    >
                        {error ||
                            "The product you are looking for does not exist."}
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

                    {/* PRODUCT GALLERY */}

                    <div className="col-lg-7">
                        <ProductGallery
                            product={product}
                        />
                    </div>

                    {/* PRODUCT INFORMATION */}

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
                                    fontSize: "0.7rem",
                                    fontWeight: 800,
                                    letterSpacing: "0.1em",
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

                                {product.categoryName}
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
                                    {Number(
                                        product.discountedPrice ??
                                        product.price ??
                                        0
                                    ).toLocaleString(
                                        "en-IN"
                                    )}
                                </span>

                                {Number(
                                    product.discountPercentage ??
                                    0
                                ) > 0 && (
                                        <span
                                            style={{
                                                color: "#999",
                                                fontSize:
                                                    "0.72rem",
                                                paddingBottom:
                                                    "5px",
                                            }}
                                        >
                                            {product.discountPercentage}% OFF
                                        </span>
                                    )}
                            </div>

                            {/* PRODUCT INFO */}

                            <ProductInfo
                                product={product}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* BACK TO COLLECTION */}

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